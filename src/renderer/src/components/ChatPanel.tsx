import React, { useState, useRef, useEffect } from 'react'
import { Plus, History, Trash2, Paperclip, Send, Zap, Copy, FilePlus, FileDiff, CheckCircle2, RotateCcw, X, Bot, ClipboardList, Bug, Layers, MessageCircleQuestion, Database } from 'lucide-react'
import { filterMcpToolsForIntent } from './mcpToolFiltering'
import { buildMcpToolGuidance } from './mcpToolGuidance'
import { parsePlainTextToolCalls } from './ollamaToolCallParsing'

interface ExecuteAction {
  command: string
  status: 'pending' | 'running' | 'completed' | 'error'
  output?: string
  error?: string
}

interface Message {
  role: 'user' | 'assistant' | 'tool'
  content: string
  writes?: WriteAction[]
  executes?: ExecuteAction[]
  elapsed?: number
  promptTokens?: number
  responseTokens?: number
  model?: string
  images?: string[]
  isToolOutput?: boolean
  tool_calls?: any[]
  tool_call_id?: string
  name?: string
  toolStatus?: 'pending' | 'running' | 'completed' | 'error'
}

interface WriteAction {
  path: string
  content: string
  accepted: boolean | null
  prevContent?: string
  error?: string
}

interface Session {
  id: string
  name: string
  messages: Message[]
  mode: 'agent' | 'plan' | 'debug' | 'multitask' | 'ask'
  createdAt: number
  lastActive: number
  isDeleted?: boolean
  workspace?: string | null
  tabs?: string[]
  openFile?: string | null
}

const AGENT_MODES = ['agent', 'plan', 'debug', 'multitask', 'ask'] as const
type AgentMode = typeof AGENT_MODES[number]

declare global {
  interface Window {
    api: {
      writeFile: (p: string, content: string) => Promise<boolean>
      readFile: (p: string) => Promise<string>
      listFiles: (p: string) => Promise<string[]>
      loadSessions: () => Promise<Session[] | null>
      saveSessions: (data: string) => Promise<void>
      listBackups: () => Promise<string[]>
      restoreBackup: (name: string) => Promise<Session[] | null>
      getHistoricalSessions: () => Promise<Session[]>
      ollamaTags: () => Promise<string[]>
      ollamaChat: (payload: object) => Promise<string>
      execCommand: (cwd: string, command: string) => Promise<{ success: boolean; stdout?: string; stderr?: string; error?: string }>
      mcpGetConfig: () => Promise<any>
      mcpSaveConfig: (config: any) => Promise<boolean>
      mcpGetServers: () => Promise<any[]>
      mcpRestartServer: (name: string) => Promise<void>
      mcpCallTool: (serverName: string, toolName: string, args: any) => Promise<any>
      memory: {
        store: (item: any) => Promise<any>
        query: (q: string, scope?: string, limit?: number) => Promise<any[]>
        all: () => Promise<any[]>
      }
      modelRouterSelect?: (prompt: string, installedModels?: string[], fallbackModel?: string) => Promise<{
        taskCategory: string
        confidence: number
        selectedModel: string
        suitabilityScore: number
        isOptimal: boolean
      recommendedModelToPull?: string
      reason: string
      usedLlmRouter?: boolean
      routerModel?: string
      recommendedRouterModel?: string
      }>
      ollamaPullModel?: (modelName: string) => Promise<{ success: boolean; message?: string }>
    }
  }
}

interface Props {
  model: string
  models: string[]
  onModelChange: (m: string) => void
  onModelsChange?: (models: string[]) => void
  rootPath: string | null
  openFile: string | null
  fileContent: string
  onWriteFile: (content: string) => void
  onRefreshTree: () => void
  onOpenFile?: (path: string) => void
  onOpenDiff?: (filename: string, original: string, current: string) => void
  onSessionsChange?: (sessions: Session[]) => void
  activeId?: string
  onActiveIdChange?: (id: string) => void
  openFiles?: string[]
  activeFile?: string | null
}

function newSession(count: number, mode: AgentMode = 'agent', workspace: string | null = null): Session {
  const now = Date.now()
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
  return { 
    id,
    name: `Session ${count}`, 
    messages: [], 
    mode,
    createdAt: now,
    lastActive: now,
    workspace
  }
}

function Markdown({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  const lines = text.split('\n')
  
  let currentBlock: string[] = []
  let mode: 'p' | 'code' | 'list' | 'tree' = 'p'
  let codeLang = ''

  const flush = (key: number) => {
    if (currentBlock.length === 0 && mode !== 'code') return
    const content = currentBlock.join('\n')
    
    if (mode === 'code') {
      parts.push(
        <div key={key} className="md-code-block">
          <div className="md-code-header">
            <span className="md-code-lang">{codeLang || 'text'}</span>
            <button className="md-code-copy" onClick={() => navigator.clipboard.writeText(content)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/></svg>
            </button>
          </div>
          <pre className="md-code-content"><code>{content}</code></pre>
        </div>
      )
    } else if (mode === 'tree') {
      parts.push(
        <div key={key} className="md-tree-block">
          {currentBlock.map((line, idx) => (
            <div key={idx} className="md-tree-line">
              {line.split('').map((char, ci) => {
                const isTreeChar = ['├', '─', '└', '│', ' ', '.'].includes(char)
                return <span key={ci} className={isTreeChar ? 'md-tree-glyph' : 'md-tree-text'}>{char}</span>
              })}
            </div>
          ))}
        </div>
      )
    } else if (mode === 'list') {
      parts.push(<ul key={key} className="md-list">{currentBlock.map((li, idx) => <li key={`${key}-li-${idx}`}>{parseInline(li, `${key}-li-${idx}`)}</li>)}</ul>)
    } else {
      // Group consecutive text lines into paragraphs; blank lines and headings split groups
      const paraLines: string[] = []
      const flushPara = (k: string) => {
        if (paraLines.length === 0) return
        const nodes: React.ReactNode[] = []
          paraLines.forEach((l, li) => {
            if (li > 0) nodes.push(<br key={`br-${li}`} />)
            nodes.push(...(parseInline(l, `${k}-line-${li}`) as React.ReactNode[]))
        })
        parts.push(<p key={k} className="md-p">{nodes}</p>)
        paraLines.length = 0
      }

      currentBlock.forEach((line, idx) => {
        if (line.startsWith('### ')) {
          flushPara(`${key}-para-${idx}`)
          parts.push(<h3 key={`${key}-${idx}`} className="md-h3">{parseInline(line.slice(4))}</h3>)
        } else if (line.startsWith('## ')) {
          flushPara(`${key}-para-${idx}`)
          parts.push(<h2 key={`${key}-${idx}`} className="md-h2">{parseInline(line.slice(3))}</h2>)
        } else if (line.startsWith('# ')) {
          flushPara(`${key}-para-${idx}`)
          parts.push(<h1 key={`${key}-${idx}`} className="md-h1">{parseInline(line.slice(2))}</h1>)
        } else if (line.trim() === '') {
          flushPara(`${key}-para-${idx}`)
          parts.push(<div key={`${key}-${idx}`} className="md-spacer" />)
        } else {
          paraLines.push(line)
        }
      })
      flushPara(`${key}-para-end`)
    }
    currentBlock = []
  }

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    
    // Code block toggle
    if (trimmed.startsWith('```')) {
      if (mode === 'code') {
        flush(i)
        mode = 'p'
      } else {
        flush(i)
        mode = 'code'
        codeLang = trimmed.slice(3).toLowerCase()
      }
      return
    }

    if (mode === 'code') {
      currentBlock.push(line)
      return
    }

    // Tree detection
    const isTreeLine = trimmed.match(/^[├└│].*[├──└──│]/) || (mode === 'tree' && (trimmed.startsWith('.') || line.includes('├──') || line.includes('└──')))
    if (isTreeLine) {
      if (mode !== 'tree') { flush(i); mode = 'tree' }
      currentBlock.push(line)
      return
    } else if (mode === 'tree') {
      flush(i); mode = 'p'
    }

    // List detection
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (mode !== 'list') { flush(i); mode = 'list' }
      currentBlock.push(trimmed.slice(2))
      return
    } else if (mode === 'list') {
      flush(i); mode = 'p'
    }

    currentBlock.push(line)
  })

  flush(9999)

  function parseInline(t: string, keyPrefix?: string) {
    const tokens: React.ReactNode[] = []
    let i = 0
    let tokenIndex = 0
    while (i < t.length) {
      // Bold **
      if (t.startsWith('**', i)) {
        const end = t.indexOf('**', i + 2)
        if (end !== -1) {
          tokens.push(<b key={`${keyPrefix ?? 'tok'}-bold-${tokenIndex++}`}>{t.slice(i + 2, end)}</b>)
          i = end + 2
          continue
        } else {
          tokens.push('**')
          i += 2
          continue
        }
      }
      // Inline Code `
      if (t[i] === '`') {
        const end = t.indexOf('`', i + 1)
        if (end !== -1) {
          tokens.push(<code key={`${keyPrefix ?? 'tok'}-code-${tokenIndex++}`} className="md-inline-code">{t.slice(i + 1, end)}</code>)
          i = end + 1
          continue
        } else {
          tokens.push('`')
          i += 1
          continue
        }
      }
      
      // Text
      let nextSpecial = -1
      const nextBold = t.indexOf('**', i)
      const nextCode = t.indexOf('`', i)
      if (nextBold !== -1 && (nextCode === -1 || nextBold < nextCode)) nextSpecial = nextBold
      else if (nextCode !== -1) nextSpecial = nextCode
      
      if (nextSpecial === -1) {
        tokens.push(t.slice(i))
        break
      } else {
        tokens.push(t.slice(i, nextSpecial))
        i = nextSpecial
      }
    }
    return tokens
  }

  return <div className="markdown-body">{parts}</div>
}

function MessageContent({ content, writes, executes, onAccept, onRevert, onOpenDiff, onExecuteAllow, onExecuteAlwaysAllow, onExecuteCancel }: {
  content: string
  writes?: WriteAction[]
  executes?: ExecuteAction[]
  onAccept: (path: string) => void
  onRevert: (path: string) => void
  onOpenDiff?: (filename: string, original: string, current: string) => void
  onExecuteAllow?: (command: string, always: boolean) => void
  onExecuteCancel?: (command: string) => void
}) {
  const blockRe = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g
  const parts: React.ReactNode[] = []
  let last = 0
  let match

  while ((match = blockRe.exec(content)) !== null) {
    if (match.index > last) {
      parts.push(<Markdown key={`text-${last}`} text={content.slice(last, match.index)} />)
    }
    const type = match[1]
    const filePath = match[2] ? decodeURIComponent(match[2].trim()) : ''
    const blockContent = match[3]
    const write = writes?.find(w => w.path.endsWith(filePath) || w.path === filePath)
    const fileName = filePath.split('/').pop()

    function handleFileClick() {
      if (type === 'replace' && write) {
        // Open diff: original vs proposed
        onOpenDiff?.(filePath, write.prevContent ?? '', write.content)
      } else if (type === 'write' && write) {
        // Open proposed new file as diff with empty original
        onOpenDiff?.(filePath, '', write.content)
      }
    }

    if (type === 'execute') {
      const command = blockContent.trim()
      const exec = executes?.find(e => e.command === command)
      
      // If no matching exec (blocked in ask/plan modes), show as a suggestion
      if (!exec) {
        parts.push(
          <div key={match.index} style={{ margin: '8px 0', padding: '10px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: '#a8a29e' }}>
              <Zap size={12} strokeWidth={2} />
              <span>Suggested command:</span>
            </div>
            <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>{command}</code>
            <div style={{ marginTop: '6px', fontSize: '11px', color: '#888' }}>
              Switch to <strong style={{ color: '#60a5fa' }}>Agent</strong> mode to execute this command.
            </div>
          </div>
        )
        last = blockRe.lastIndex
        continue
      }

      if (exec.status !== 'pending') {
        parts.push(
          <div key={match.index} style={{ margin: '8px 0', fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {exec.status === 'completed' ? <CheckCircle2 size={12} color="#10b981" /> : 
             exec.status === 'error' ? <RotateCcw size={12} color="#ef4444" /> : 
             <div className="toolbar-spinner" style={{width: 10, height: 10, borderBottomColor: 'transparent'}} />}
            <span>{exec.status === 'completed' ? 'Executed:' : exec.status === 'error' ? 'Failed:' : 'Running:'} <code style={{background: 'transparent', padding: 0}}>{command}</code></span>
          </div>
        )
        last = blockRe.lastIndex
        continue
      }

      parts.push(
        <div key={match.index} className="write-block">
          <div className="write-block-header">
            <div className="write-block-info">
              <span className="write-block-icon"><Zap size={13} strokeWidth={2} /></span>
              <span className="write-block-file">{command}</span>
              <span className="write-block-type">execute</span>
            </div>
            <div className="write-block-actions">
              <div className="write-pending-actions">
                <button className="write-btn write-btn--revert" onClick={() => onExecuteCancel?.(command)}>Cancel</button>
                <button className="write-btn write-btn--accept" onClick={() => onExecuteAllow?.(command, false)}>Allow</button>
                <button className="write-btn write-btn--accept" onClick={() => onExecuteAllow?.(command, true)}>Always</button>
              </div>
            </div>
          </div>
        </div>
      )
      last = blockRe.lastIndex
      continue
    }

    parts.push(
      <div key={match.index} className="write-block">
        <div className="write-block-header">
          <div className="write-block-info">
            <span className="write-block-icon">{type === 'replace' ? <FileDiff size={13} strokeWidth={2} /> : <FilePlus size={13} strokeWidth={2} />}</span>
            <button
              className="write-block-file write-block-file--clickable"
              onClick={handleFileClick}
              title={type === 'replace' ? 'View diff' : 'Preview file'}
            >
              {fileName}
            </button>
            <span className="write-block-type">{type === 'replace' ? 'patch' : 'write'}</span>
          </div>
          <div className="write-block-actions">
            {write && write.accepted !== null ? (
              <div className={`write-status-pill ${write.accepted ? 'pill--accepted' : 'pill--reverted'}`}>
                {write.accepted ? <><CheckCircle2 size={10} strokeWidth={2.5} /> Accepted</> : <><RotateCcw size={10} strokeWidth={2.5} /> Reverted</>}
              </div>
            ) : (
              <div className="write-pending-actions">
                <button className="write-btn write-btn--revert" onClick={() => onRevert(filePath)}>Discard</button>
                <button className="write-btn write-btn--accept" onClick={() => onAccept(filePath)}>Apply</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
    last = blockRe.lastIndex
  }
  if (last < content.length) {
    parts.push(<Markdown key={`text-${last}`} text={content.slice(last)} />)
  }

  return <div className="msg-content-inner">{parts}</div>
}

function ModeIcon({ mode }: { mode: AgentMode }) {
  if (mode === 'agent')     return <Bot size={13} strokeWidth={1.8} />
  if (mode === 'plan')      return <ClipboardList size={13} strokeWidth={1.8} />
  if (mode === 'debug')     return <Bug size={13} strokeWidth={1.8} />
  if (mode === 'multitask') return <Layers size={13} strokeWidth={1.8} />
  if (mode === 'ask')       return <MessageCircleQuestion size={13} strokeWidth={1.8} />
  return null
}

export default function ChatPanel({
  model, models, onModelChange, onModelsChange,
  rootPath, openFile, fileContent,
  onWriteFile, onRefreshTree, onOpenFile,
  onOpenDiff,
  onSessionsChange,
  activeId: activeIdProp, onActiveIdChange, openFiles, activeFile
}: Props) {
  const _dbg = (m: string) => console.debug && console.debug(`ChatPanel.effect: ${m}`)
  const [sessions, setSessions] = useState<Session[]>(() => [newSession(1, 'agent', rootPath)])
  const [activeId, setActiveId] = useState<string>(sessions[0].id)

  const skipNextActiveSyncRef = useRef(false)

  // Bi-directional sync for activeId
  useEffect(() => {
    _dbg('sync -> onActiveIdChange')
    if (skipNextActiveSyncRef.current) {
      skipNextActiveSyncRef.current = false
      return
    }
    if (activeId && onActiveIdChange) {
      onActiveIdChange(activeId);
    }
  }, [activeId, onActiveIdChange]);

  useEffect(() => {
    _dbg('prop activeIdProp -> setActiveId')
    if (activeIdProp && activeIdProp !== activeId) {
      // Mark that the next local activeId change was caused by prop sync
      skipNextActiveSyncRef.current = true
      setActiveId(activeIdProp);
    }
  }, [activeIdProp, activeId]);

  // Save open tabs and active file dynamically into the active session.
  // Only sync into sessions that already have messages — a brand-new session
  // should start clean and not inherit the previous session's editor state.
  useEffect(() => {
    _dbg('sync openFiles/activeFile -> session tabs')
    if (activeId && (openFiles || activeFile)) {
      setSessions(prev => {
        const current = prev.find(s => s.id === activeId);
        if (!current) return prev;

        // Don't overwrite a fresh session with the previous session's editor state
        if (current.messages.length === 0 && current.tabs === undefined && current.openFile === undefined) {
          return prev;
        }

        const isTabsEqual = JSON.stringify(current.tabs || []) === JSON.stringify(openFiles || []);
        const isFileEqual = current.openFile === activeFile;
        
        if (isTabsEqual && isFileEqual) return prev;
        
        return prev.map(s => s.id === activeId ? { ...s, tabs: openFiles, openFile: activeFile } : s);
      });
    }
  }, [openFiles, activeFile, activeId]);

  // Keep active session's workspace in sync with rootPath changes
  useEffect(() => {
    _dbg('sync rootPath -> session.workspace')
    if (activeId && rootPath) {
      setSessions(prev => {
        const current = prev.find(s => s.id === activeId);
        if (current && current.workspace !== rootPath) {
          return prev.map(s => s.id === activeId ? { ...s, workspace: rootPath } : s);
        }
        return prev;
      });
    }
  }, [rootPath, activeId]);
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusText, setStatusText] = useState('Generando ideas...')
  const [showHistory, setShowHistory] = useState(false)
  const [autopilot, setAutopilot] = useState(true)
  const autopilotRef = useRef(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  // Keep a ref to the latest model value so async send() always uses the current selection
  const modelRef = useRef(model)
  useEffect(() => { modelRef.current = model }, [model])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [historySearch, setHistorySearch] = useState('')
  const [showDeleted, setShowDeleted] = useState(false)
  const [showForensics, setShowForensics] = useState(false)
  const [showModeMenu, setShowModeMenu] = useState(false)
  const [backups, setBackups] = useState<any[]>([])
  const [attachments, setAttachments] = useState<{ name: string; base64: string; type: string }[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const hasLoadedRef = useRef(false)
  const startTimeRef = useRef<number>(0)
  const [alwaysAllowedCommands, setAlwaysAllowedCommands] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('alwaysAllowedCommands')
      if (stored) return new Set(JSON.parse(stored))
    } catch {}
    return new Set()
  })

  const [routerRec, setRouterRec] = useState<{
    taskCategory: string
    selectedModel: string
    suitabilityScore: number
    isOptimal: boolean
    recommendedModelToPull?: string
    reason: string
    usedLlmRouter?: boolean
    routerModel?: string
    recommendedRouterModel?: string
  } | null>(null)
  const [pullingModel, setPullingModel] = useState<string | null>(null)
  const [pullStatus, setPullStatus] = useState<string | null>(null)

  const handlePullModel = async (modelName: string) => {
    setPullingModel(modelName)
    setPullStatus(`Pulling free open model '${modelName}' from Ollama library...`)
    try {
      if (window.api?.ollamaPullModel) {
        await window.api.ollamaPullModel(modelName)
        setPullStatus(`Successfully pulled '${modelName}'!`)
        if (window.api?.ollamaTags) {
          const updated = await window.api.ollamaTags()
          if (updated && updated.length > 0) {
            onModelsChange?.(updated)
            onModelChange(modelName)
          }
        }
      }
    } catch (err: any) {
      setPullStatus(`Pull failed: ${err.message}`)
    } finally {
      setTimeout(() => {
        setPullingModel(null)
        setPullStatus(null)
      }, 5000)
    }
  }

  useEffect(() => {
    _dbg('alwaysAllowedCommands -> save')
    localStorage.setItem('alwaysAllowedCommands', JSON.stringify(Array.from(alwaysAllowedCommands)))
  }, [alwaysAllowedCommands])

  useEffect(() => {
    const loadStoredSessions = async () => {
      try {
        const stored = await window.api.loadSessions()
        if (Array.isArray(stored) && stored.length > 0) {
          // Sanitize loaded sessions — strip any messages with corrupt tool_call arguments
          // (malformed JSON in arguments causes Ollama 400 errors on every subsequent send)
          const sanitizeSessions = (sessions: Session[]): Session[] => {
            return sessions.map(s => ({
              ...s,
              messages: (s.messages || []).filter((msg: any) => {
                if (!msg.tool_calls) return true
                return msg.tool_calls.every((tc: any) => {
                  try {
                    if (tc.function?.arguments && typeof tc.function.arguments === 'string') {
                      JSON.parse(tc.function.arguments)
                    }
                    return true
                  } catch {
                    return false // drop messages with corrupt tool_call arguments
                  }
                })
              })
            }))
          }
          setSessions(sanitizeSessions(stored))
          setActiveId(stored[0].id)
        }
      } catch (e) {
        console.warn('Failed to load stored sessions:', e)
      }
      // Set the guard AFTER the async load completes so the save effect
      // never fires before sessions are restored from disk
      hasLoadedRef.current = true
    }
    loadStoredSessions()
  }, [])

  useEffect(() => {
    _dbg('sessions changed -> persistence (compare ignoring lastActive)')
    if (!hasLoadedRef.current) return

    // Helper to remove ephemeral metadata that shouldn't trigger parent syncs
    const stripMeta = (s: Session) => {
      const { lastActive, ...rest } = s as any
      return rest
    }

    try {
      const forCompare = sessions.map(stripMeta)
      const jsonNoMeta = JSON.stringify(forCompare)

      if ((ChatPanel as any)._lastSentSessionsNoMeta !== jsonNoMeta) {
        // Persist full sessions (including lastActive) to disk
        try {
          window.api.saveSessions(JSON.stringify(sessions))
        } catch (e) {
          console.warn('Failed to save sessions:', e)
        }

        // Only notify parent when non-meta parts actually changed
        if (onSessionsChange) {
          try {
            onSessionsChange(sessions)
          } catch (e) {
            console.warn('onSessionsChange threw:', e)
          }
        }

        ;(ChatPanel as any)._lastSentSessionsNoMeta = jsonNoMeta
      } else {
        _dbg('sessions change only in meta; skipping parent update')
      }
    } catch (e) {
      // Fallback: if anything goes wrong, behave conservatively and still save
      try { window.api.saveSessions(JSON.stringify(sessions)) } catch {}
      if (onSessionsChange) onSessionsChange(sessions)
    }
  }, [sessions])

  useEffect(() => {
    if (rootPath && sessions.length > 0) {
      const hasEmptyWorkspace = sessions.some(s => !s.workspace);
      if (hasEmptyWorkspace) {
        setSessions(prev => prev.map(s => s.workspace ? s : { ...s, workspace: rootPath }));
      }
    }
  }, [rootPath, sessions.length]);

  useEffect(() => {
    const STATUS_MESSAGES = [
      'Generando ideas...',
      'Pensando...',
      'Uniendo conceptos...',
      'Analizando contexto...',
      'Estructurando respuesta...',
      'Refinando detalles...'
    ];
    let intervalId: NodeJS.Timeout | null = null;
    if (loading) {
      let index = 0;
      setStatusText(STATUS_MESSAGES[0]);
      intervalId = setInterval(() => {
        index = (index + 1) % STATUS_MESSAGES.length;
        setStatusText(STATUS_MESSAGES[index]);
      }, 3000);
    } else {
      setStatusText(STATUS_MESSAGES[0]);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loading]);

  const activeSession = sessions.find(s => s.id === activeId) ?? sessions[0]
  const messages = Array.isArray(activeSession?.messages) ? activeSession.messages : []
  const lastMsg = messages.length > 0 ? messages[messages.length - 1] : undefined
  const isWaitingFirstToken = lastMsg && lastMsg.role === 'assistant' && !lastMsg.content

  useEffect(() => {
    _dbg('activeId -> update lastActive')
    const now = Date.now()
    setSessions(prev => prev.map(s => {
      if (s.id !== activeId) return s
      const last = s.lastActive || 0
      // avoid updating lastActive too frequently
      if (now - last < 2000) return s
      return { ...s, lastActive: now }
    }))
  }, [activeId])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function setMessages(updater: (prev: Message[]) => Message[]) {
    setSessions(prev => prev.map(s => {
      if (s.id !== activeId) return s
      const prevMsgs = Array.isArray(s.messages) ? s.messages : []
      return { ...s, messages: updater(prevMsgs), lastActive: Date.now() }
    }))
  }

  function setMode(mode: AgentMode) {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, mode, lastActive: Date.now() } : s))
    setShowModeMenu(false)
  }

  function addSession() {
    const nextNum = sessions.length + 1
    const s = newSession(nextNum, 'agent', rootPath); 
    setSessions(prev => [...prev, s]); 
    setActiveId(s.id); 
    setInput('')
  }

  function restoreSession(id: string) {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, isDeleted: false, lastActive: Date.now() } : s))
    setActiveId(id)
  }

  async function openForensics() {
    const list = await window.api.listBackups()
    setBackups(list)
    setShowForensics(true)
  }

  async function applyBackup(name: string) {
    if (!confirm(`Restore history from ${name}? This will overwrite your current active sessions.`)) return
    const restored = await window.api.restoreBackup(name)
    if (restored) {
      setSessions(restored)
      setActiveId(restored[0].id)
      setShowForensics(false)
      setShowHistory(false)
    }
  }

  function closeSession(id: string) {
    setSessions(prev => {
      const next = prev.map(s => s.id === id ? { ...s, isDeleted: true } : s)
      const visible = next.filter(s => !s.isDeleted)
      if (visible.length === 0) { 
        const s = newSession(prev.length + 1)
        setActiveId(s.id)
        return [...next, s] 
      }
      if (id === activeId) {
        setActiveId(visible[visible.length - 1].id)
      }
      return next
    })
  }

  function clearSession() {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, messages: [], lastActive: Date.now() } : s))
  }

  function startRename(id: string, name: string) {
    setEditingId(id); setEditingName(name)
  }

  function saveRename() {
    if (!editingId) return
    setSessions(prev => prev.map(s => s.id === editingId ? { ...s, name: editingName.trim() || s.name } : s))
    setEditingId(null)
  }

  const filteredHistory = sessions
    .filter(s => (showDeleted || !s.isDeleted) && s.name.toLowerCase().includes(historySearch.toLowerCase()))
    .sort((a, b) => b.lastActive - a.lastActive)

  async function buildSystemPrompt(activeMcpTools: any[], mode?: AgentMode): Promise<string> {
    const sessionMode = mode ?? activeSession.mode
    let sys = `You are an expert agentic coding assistant.`

    if (sessionMode === 'ask') {
      sys += `\n\n[MODE: ASK]\nYou are in Q&A mode. Your goal is to explain concepts, answer questions, and help the user understand their code.

⛔ STRICTLY FORBIDDEN in ASK mode:
- Do NOT output any file modifications (no write: or replace: blocks)
- Do NOT execute any commands (no execute blocks)
- Do NOT perform any actions on the project

If you detect that the user's request involves making changes, running commands, or performing tasks:
1. Explain what would need to be done conceptually
2. Explicitly suggest: "Switch to **Agent** mode to implement these changes" or "Switch to **Plan** mode to create a detailed plan first"

If you provide code examples, use standard markdown code blocks (e.g., \`\`\`js) without any 'write:', 'replace:', or 'execute' prefixes.`
    } else if (sessionMode === 'plan') {
      // Plan mode: forbid all code implementation, only allow writing the plan document
      const planFile = `plans/PLAN-${new Date().toISOString().slice(0,10)}.md`
      sys += ` You are in PLANNING mode. Your ONLY output must be a structured requirements and implementation plan written to a markdown file.

⛔ STRICTLY FORBIDDEN:
- Do NOT write, modify, or replace ANY source code files (.ts, .tsx, .js, .py, .css, etc.)
- Do NOT use replace: blocks under any circumstance
- Do NOT execute any commands (no execute blocks)
- Do NOT suggest the user manually make changes
- Do NOT implement anything

✅ YOUR ONLY ALLOWED OUTPUT:
Write the complete plan to a single markdown file using this exact format:
\`\`\`write:${planFile}
# Plan: [Feature/Task Name]

## Overview
[2-3 sentence summary of what will be built and why]

## Requirements
### Functional Requirements
- FR-1: ...
- FR-2: ...

### Non-Functional Requirements
- NFR-1: ...

## Technical Approach
[Architecture decisions, technology choices, patterns to use]

## Implementation Steps
1. **Step name** — description, files affected: \`path/to/file.ts\`
2. **Step name** — description, files affected: \`path/to/file.ts\`
...

## Edge Cases & Risks
- Risk 1: description + mitigation

## Open Questions
- [ ] Question that needs clarification before implementation
\`\`\`

After writing the plan file, briefly summarize what you've planned in 1-2 sentences. The user can then review PLAN.md and switch to Agent mode to implement it.`
    } else {
      sys += ` You have DIRECT WRITE ACCESS to the user's project files. You are NOT a chatbot — you are an autonomous coding agent that writes files.`
      if (sessionMode === 'agent') {
        sys += `\n\n[MODE: AGENT]\nIn AGENT mode, when asked to implement changes, you MUST produce file edits using only action blocks like write:, replace:, or execute:. Do NOT answer with plain text suggestions alone.`
      } else if (sessionMode === 'debug') {
        sys += `\n\n[MODE: DEBUG]\nIn DEBUG mode, analyze logs, diagnose the issue, and provide clear hypotheses. Do NOT make direct file edits unless explicitly instructed.`
      } else if (sessionMode === 'multitask') {
        sys += `\n\n[MODE: MULTITASK]\nIn MULTITASK mode, coordinate changes across multiple files while still using exact action block syntax for edits.`
      }
      sys += `\n\n⚠️ When making code changes in AGENT mode, always output actionable file operations using exact action blocks:
- write:path/to/file for new files
- replace:path/to/file for edits
- execute for shell commands

⚠️ CRITICAL OUTPUT RULES — YOU MUST FOLLOW THESE EXACTLY:

1. NEVER use standard markdown code blocks like \`\`\`python or \`\`\`js to show code. Those do NOTHING.
2. To CREATE a new file, you MUST use this EXACT format (the file will be written to disk automatically):

\`\`\`write:path/to/file.py
# full file content here
\`\`\`

3. To EDIT an existing file, you MUST use this EXACT format:

\`\`\`replace:path/to/file.py
<<<<
exact lines to remove
====
new lines to insert
>>>>
\`\`\`

EXAMPLE — if asked to create app.py:
\`\`\`write:app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World'
\`\`\`

EXAMPLE — if asked to add a route to existing app.py:
\`\`\`replace:app.py
<<<<
@app.route('/')
def hello():
    return 'Hello World'
====
@app.route('/')
def hello():
    return 'Hello World'

@app.route('/health')
def health():
    return 'OK'
>>>>
\`\`\`

4. To EXECUTE a background terminal command, use this EXACT format:

\`\`\`execute
npm install
\`\`\`

⚠️ CRITICAL EXECUTION RULES:
- You may only emit ONE execute block per response. After emitting it, STOP and wait for the result.
- Do NOT list multiple execute blocks in the same message.
- After receiving the command result, you may then emit the next execute block if needed.
- This is a sequential workflow: propose one action → wait for approval/result → propose the next.

Rules:
- Use RELATIVE paths from the project root.
- Write ALL files immediately — do not ask for permission.
- The <<<< section must match the existing file content EXACTLY.
- After writing files, briefly explain what you did.`
    }

    if (sessionMode === 'debug') {
      sys += `\n\n[MODE: DEBUG] Analyze logs and hypothesize root causes.`
    } else if (sessionMode === 'multitask') {
      sys += `\n\n[MODE: MULTITASK] Optimized for many file changes at once.`
    }

    if (!rootPath) {
      if (openFile) sys += `\n\nOpen file: ${openFile}\n\`\`\`\n${fileContent.slice(0, 4000)}\n\`\`\``
      return sys
    }

    sys += `\n\n⚠️ PROJECT ROOT (all file paths MUST be relative to this directory): ${rootPath}`
    sys += `\n✅ CORRECT: \`\`\`write:src/app.py  — resolves to ${rootPath}/src/app.py`
    sys += `\n❌ WRONG: absolute paths, paths starting with /tmp, or paths outside the project root`
    sys += buildMcpToolGuidance(activeMcpTools)

    try {
      const IGNORE = ['node_modules', '.git', 'dist', 'out', '.next', '__pycache__', '.venv', 'venv']
      const files = await window.api.listFiles(rootPath)
      const filtered = files.filter(f => !IGNORE.some(ig => f.includes(`/${ig}/`) || f.includes(`/${ig}`)))
      sys += `\n\nProject files:\n${filtered.map(f => f.replace(rootPath + '/', '')).slice(0, 150).join('\n')}`
    } catch {}

    if (openFile) {
      const rel = openFile.replace(rootPath + '/', '')
      sys += `\n\nCurrently open file (${rel}):\n\`\`\`\n${fileContent.slice(0, 3000)}\n\`\`\``
    }
    // Attach small local memory context (repo + user recent items)
    try {
      const repoMems = rootPath ? await window.api.memory.query('', 'repo', 5) : []
      const userMems = await window.api.memory.query('', 'user', 5)
      const merged = [...(repoMems || []), ...(userMems || [])].slice(0, 8)
      if (merged.length > 0) {
        const lines = merged.map((m: any) => `- ${String(m.text || m.content || '').replace(/\s+/g, ' ').slice(0,200)}`)
        sys += `\n\n[MEMORY]\n${lines.join('\n')}`
      }
    } catch (e) {}
    return sys
  }

  async function executeAndReply(command: string, getMsgIdx: (msgs: Message[]) => number, execIdx: number) {
    if (!rootPath) return
    const res = await window.api.execCommand(rootPath, command)
    
    setMessages(prev => {
      const idx = getMsgIdx(prev)
      let updatedMsgs = prev
      if (idx !== -1) {
        updatedMsgs = prev.map((m, i) => i === idx ? {
          ...m, executes: m.executes?.map((ex, j) => j === execIdx ? { 
            ...ex, 
            status: res.success ? 'completed' : 'error', 
            output: res.stdout,
            error: res.error || res.stderr 
          } : ex)
        } : m)
      }

      const outputText = res.success 
        ? (res.stdout?.trim() 
          ? `Command \`${command}\` executed successfully.\n\nOutput:\n\`\`\`\n${res.stdout.trim()}\n\`\`\``
          : `Command \`${command}\` executed successfully without output.`)
        : `Command \`${command}\` failed.\n\nError: ${res.error}\n\nStderr:\n\`\`\`\n${res.stderr?.trim() || '(no output)'}\n\`\`\``

      const newHistory = [...updatedMsgs, { role: 'user', content: outputText, isToolOutput: true } as Message]
      setTimeout(() => send(newHistory), 0)
      return updatedMsgs
    })
  }

  async function send(overrideHistory?: Message[]) {
    let currentModel = modelRef.current || model
    if (!overrideHistory && (!input.trim() || loading || !currentModel)) return
    
    let history: Message[]
    if (overrideHistory) {
      history = overrideHistory
      setMessages(() => history)
    } else {
      const userMsg: Message = { 
        role: 'user', 
        content: input.trim(),
        images: attachments.length > 0 ? attachments.map(a => a.base64) : undefined
      }
      history = [...messages, userMsg]
      setMessages(() => history)
      console.debug && console.debug('ChatPanel.send: queued history', history)
      setInput('')
      setAttachments([])
        // Store user message into local memory (repo-scoped if project open)
        try {
          const scope = rootPath ? 'repo' : 'user'
          window.api.memory.store({ scope, text: userMsg.content, meta: { sessionId: activeId } }).catch(() => {})
        } catch (e) { /* ignore */ }
    }
    setLoading(true)
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, workspace: s.workspace || rootPath } : s))
    startTimeRef.current = Date.now()

    // 1. Fetch active MCP tools
    let activeMcpTools: any[] = []
    try {
      const servers = await window.api.mcpGetServers()
      activeMcpTools = servers
        .filter(s => s.status === 'connected')
        .flatMap(s => (s.tools || []).map((t: any) => ({
          serverName: s.name,
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema
        })))
    } catch (e) {
      console.warn('Failed to retrieve MCP tools:', e)
    }

    const latestUserText = [...history].reverse().find(msg => msg.role === 'user')?.content || ''
    
    // Dynamic Model Router & Task Evaluation
    if ((currentModel === 'auto' || !currentModel) && window.api?.modelRouterSelect) {
      try {
        const fallback = currentModel === 'auto' ? models[0] : currentModel
        const rec = await window.api.modelRouterSelect(latestUserText, models, fallback)
        if (rec) {
          setRouterRec(rec)
          if (currentModel === 'auto' || !currentModel) {
            currentModel = rec.selectedModel || fallback || 'llama3.1:latest'
          }
        }
      } catch (e) {
        console.warn('Model router error:', e)
      }
    }
    if (currentModel === 'auto') currentModel = models[0] || 'llama3.1:latest'

    const { tools: filteredMcpTools } = filterMcpToolsForIntent(activeMcpTools, latestUserText)

    const ollamaTools = filteredMcpTools.map(t => ({
      type: 'function',
      function: {
        name: `mcp__${t.serverName}__${t.name}`,
        description: t.description,
        parameters: t.inputSchema
      }
    }))

    try {
      const systemPrompt = await buildSystemPrompt(filteredMcpTools)
      // Build clean message history — strip any messages with corrupt tool_call arguments
      // (malformed JSON in arguments causes Ollama 400 "can't find closing '}'" errors)
      const sanitizeMessages = (msgs: any[]): any[] => {
        return msgs.filter(msg => {
          if (!msg.tool_calls) return true
          // Validate every tool_call argument is parseable JSON
          return msg.tool_calls.every((tc: any) => {
            try {
              if (tc.function?.arguments) {
                const args = tc.function.arguments
                if (typeof args === 'string') JSON.parse(args)
              }
              return true
            } catch {
              return false // drop messages with corrupt tool_calls
            }
          })
        }).map(msg => {
          // Also sanitize content — ensure no raw control characters
          if (msg.content && typeof msg.content === 'string') {
            return { ...msg, content: msg.content.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, '') }
          }
          return msg
        })
      }

      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...sanitizeMessages(history.map(msg => {
          if (msg.role === 'user') {
            if (msg.images) {
              return {
                role: msg.role,
                content: msg.content,
                images: msg.images.map(img => img.includes(',') ? img.split(',')[1] : img)
              }
            }
            return { role: msg.role, content: msg.content }
          }
          if (msg.role === 'assistant') {
            const out: any = { role: msg.role, content: msg.content }
            if (msg.tool_calls) out.tool_calls = msg.tool_calls
            return out
          }
          if (msg.role === 'tool') {
            return {
              role: 'tool',
              name: msg.name,
              tool_call_id: msg.tool_call_id,
              content: msg.content
            }
          }
          return { role: msg.role, content: msg.content }
        }))
      ]

      let assistantText = ''
      const activeIdAtSend = activeId
      let processedUpTo = 0
      const streamWrites: WriteAction[] = []
      const streamExecutes: ExecuteAction[] = []
      let promptTokens = 0
      let responseTokens = 0
      let toolCalls: any[] = []

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      const normalizeStreamLine = (rawLine: string) => {
        const line = rawLine.replace(/\r$/, '').trim()
        if (!line) return ''
        if (line === '[DONE]') return ''
        if (line.startsWith('data:')) {
          return line.slice(5).trim()
        }
        return line
      }

      const getChatContent = (json: any): string | undefined => {
        if (json.message?.content) return json.message.content
        if (Array.isArray(json.choices) && json.choices.length > 0) {
          const first = json.choices[0]
          if (first.delta?.content) return first.delta.content
          if (first.message?.content) return first.message.content
          if (typeof first.text === 'string') return first.text
        }
        if (typeof json.text === 'string') return json.text
        if (typeof json.content === 'string') return json.content
        return undefined
      }

      const processOllamaJson = async (json: any) => {
        if (json.prompt_eval_count) promptTokens = json.prompt_eval_count
        if (json.eval_count) responseTokens = json.eval_count
        
        // Accumulate tool calls if present
        const deltaToolCalls = json.choices?.[0]?.delta?.tool_calls || json.message?.tool_calls
        if (deltaToolCalls) {
          for (const tc of deltaToolCalls) {
            const idx = tc.index ?? toolCalls.length
            if (!toolCalls[idx]) {
              toolCalls[idx] = { id: tc.id, type: 'function', function: { name: '', arguments: '' } }
            }
            if (tc.id) toolCalls[idx].id = tc.id
            if (tc.function?.name) toolCalls[idx].function.name += tc.function.name
            if (tc.function?.arguments) {
              if (typeof tc.function.arguments === 'string') {
                toolCalls[idx].function.arguments += tc.function.arguments
              } else {
                toolCalls[idx].function.arguments = JSON.stringify(tc.function.arguments)
              }
            }
          }
        }

        const content = getChatContent(json)
        if (!content) return
        assistantText += content
        setSessions(prev => prev.map(s => {
          if (s.id !== activeIdAtSend) return s
          const msgs = [...s.messages]
          msgs[msgs.length - 1] = { role: 'assistant', content: assistantText }
          return { ...s, messages: msgs }
        }))

        const blockRe = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g
        blockRe.lastIndex = processedUpTo
        let m
        while ((m = blockRe.exec(assistantText)) !== null) {
          processedUpTo = m.index + m[0].length
          const type = m[1]
          const filePath = m[2] ? decodeURIComponent(m[2].trim()) : ''
          const blockContent = m[3]
          if (!rootPath) continue

          if (type === 'execute') {
            if (activeSession.mode === 'ask' || activeSession.mode === 'plan') continue
            if (streamExecutes.length > 0) continue
            const command = blockContent.trim()
            if (command && rootPath) {
              let status: 'pending' | 'running' | 'completed' | 'error' = 'pending'
              if (alwaysAllowedCommands.has(command)) status = 'running'
              streamExecutes.push({ command, status })
            }
            continue
          }

          if (activeSession.mode === 'ask') continue

          const isPlanMode = activeSession.mode === 'plan'
          const isPlanFile = filePath.endsWith('.md') && (filePath.startsWith('plans/') || filePath.includes('PLAN'))
          if (isPlanMode && !isPlanFile) continue
          if (isPlanMode && type === 'replace') continue

          const abs = filePath.startsWith(rootPath) ? filePath : joinPath(rootPath, filePath.replace(/^\//, ''))
          let prevContent: string | undefined
          try { prevContent = await window.api.readFile(abs) } catch {}

          let finalContent = blockContent
          if (type === 'replace' && prevContent) {
            const parts = blockContent.split('====')
            if (parts.length === 2) {
              const target = parts[0].replace('<<<<\n', '').replace('<<<<\r\n', '').trimEnd()
              const replacement = parts[1].replace('\n>>>>', '').replace('\r\n>>>>', '').replace('>>>>', '').trimStart()
              const normalizedPrev = prevContent.replace(/\r\n/g, '\n')
              const normalizedTarget = target.replace(/\r\n/g, '\n')
              const normalizedReplacement = replacement.replace(/\r\n/g, '\n')
              if (normalizedPrev.includes(normalizedTarget)) {
                finalContent = normalizedPrev.replace(normalizedTarget, normalizedReplacement)
              } else {
                finalContent = prevContent.replace(target, replacement)
              }
            }
          }

          if (autopilotRef.current) {
            await window.api.writeFile(abs, finalContent)
            if (openFile && abs === openFile) onWriteFile(finalContent)
            onRefreshTree()
            if (isPlanMode && isPlanFile && onOpenFile) onOpenFile(abs)
          }
          streamWrites.push({ path: abs, content: finalContent, accepted: autopilotRef.current ? null : null, prevContent })
        }
      }

      const processBodyLines = async (body: string) => {
        const lines = body.split(/\r?\n/)
        for (const rawLine of lines) {
          const line = normalizeStreamLine(rawLine)
          if (!line) continue
          try {
            const json = JSON.parse(line)
            await processOllamaJson(json)
          } catch {
            // ignore non-json stream metadata
          }
        }
      }

      const tryParseFullJson = async (body: string) => {
        try {
          const json = JSON.parse(body)
          await processOllamaJson(json)
          return true
        } catch {
          return false
        }
      }

      const chatPayload: any = {
        model: currentModel,
        stream: true,
        messages: chatMessages
      }
      if (ollamaTools.length > 0) {
        chatPayload.tools = ollamaTools
      }

      if (window.api && typeof window.api.ollamaChat === 'function') {
        const body = await ollamaChatWithTimeout(chatPayload, 120000)
        const text = String(body || '')
        await processBodyLines(text)

        if (!assistantText) {
          await tryParseFullJson(text)
        }
      } else {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 120000)
        const res = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chatPayload),
          signal: controller.signal
        })
        clearTimeout(timeout)
        if (!res.ok) throw new Error(`Ollama error: ${res.status}`)

        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          let newlineIndex = buffer.indexOf('\n')
          while (newlineIndex !== -1) {
            const line = buffer.slice(0, newlineIndex)
            buffer = buffer.slice(newlineIndex + 1)
            const normalized = normalizeStreamLine(line)
            if (normalized) {
              try {
                const json = JSON.parse(normalized)
                await processOllamaJson(json)
              } catch {
                // ignore non-json stream metadata
              }
            }
            newlineIndex = buffer.indexOf('\n')
          }
        }
        if (buffer.trim()) {
          const normalized = normalizeStreamLine(buffer)
          if (normalized) {
            try {
              const json = JSON.parse(normalized)
              await processOllamaJson(json)
            } catch {
              // ignore non-json trailing partial content
            }
          }
        }
      }

      // Some Ollama models emit tool calls as plain-text JSON instead of
      // structured `tool_calls`, often only after the stream finishes.
      if (toolCalls.length === 0) {
        const plainTextToolCalls = parsePlainTextToolCalls(assistantText)
        if (plainTextToolCalls.length > 0) {
          toolCalls.push(...plainTextToolCalls.map(tc => ({
            id: `call_${Math.random().toString(36).substr(2, 9)}`,
            type: 'function',
            function: {
              name: tc.name,
              arguments: tc.arguments
            }
          })))
          assistantText = ''
        }
      }

      if (toolCalls.length > 0) {
        const resolvedToolCalls = toolCalls.map(tc => {
          let parsedArgs = {}
          try {
            if (tc.function.arguments) {
              parsedArgs = typeof tc.function.arguments === 'string'
                ? JSON.parse(tc.function.arguments)
                : tc.function.arguments
            }
          } catch (e) {
            console.error('Failed to parse tool arguments:', tc.function.arguments, e)
          }
          return {
            id: tc.id || `call_${Math.random().toString(36).substr(2, 9)}`,
            type: 'function',
            function: {
              name: tc.function.name,
              arguments: JSON.stringify(parsedArgs)
            }
          }
        })

        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role: 'assistant',
            content: assistantText || `Using ${resolvedToolCalls.length} tool${resolvedToolCalls.length === 1 ? '' : 's'}...`,
            tool_calls: resolvedToolCalls,
            model: currentModel,
            elapsed: Math.round((Date.now() - startTimeRef.current) / 1000)
          }
          return updated
        })

        const nextMessages = [...history, {
          role: 'assistant',
          content: assistantText || `Using ${resolvedToolCalls.length} tool${resolvedToolCalls.length === 1 ? '' : 's'}...`,
          tool_calls: resolvedToolCalls
        } as Message]

        for (const tc of resolvedToolCalls) {
          const match = tc.function.name.match(/^mcp__([a-zA-Z0-9_-]+)__(.+)$/)
          let resultText = ''
          
          if (match) {
            const serverName = match[1]
            const toolName = match[2]
            const args = JSON.parse(tc.function.arguments || '{}')
            
            setMessages(prev => [...prev, {
              role: 'tool',
              name: tc.function.name,
              content: `Executing ${serverName}.${toolName}...`,
              tool_call_id: tc.id,
              toolStatus: 'running'
            } as Message])

            try {
              const res = await callMcpToolWithTimeout(serverName, toolName, args)
              resultText = typeof res === 'string' ? res : JSON.stringify(res, null, 2)
              try {
                const parsedRes = typeof res === 'string' ? JSON.parse(res) : res
                if (parsedRes && Array.isArray(parsedRes.content)) {
                  resultText = parsedRes.content
                    .map((c: any) => c.text || c.value || '')
                    .filter(Boolean)
                    .join('\n')
                } else if (parsedRes && typeof parsedRes.text === 'string') {
                  resultText = parsedRes.text
                }
              } catch {}
              // Truncate very large tool results to avoid overwhelming the model context
              const MAX_TOOL_RESULT = 12000
              if (resultText.length > MAX_TOOL_RESULT) {
                resultText = resultText.slice(0, MAX_TOOL_RESULT) + `\n\n[... truncated ${resultText.length - MAX_TOOL_RESULT} chars ...]`
              }
            } catch (err: any) {
              resultText = `Error calling tool: ${err.message || String(err)}`
            }
          } else {
            resultText = `Error: Tool name format invalid. Expected prefix mcp__`
          }

          const toolMsg: Message = {
            role: 'tool',
            name: tc.function.name,
            content: resultText,
            tool_call_id: tc.id,
            toolStatus: 'completed'
          }
          nextMessages.push(toolMsg)
        }

        setMessages(() => nextMessages)
        setLoading(false)
        setTimeout(() => send(nextMessages), 500)
        return
      }

      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      if (!assistantText.trim() && streamWrites.length === 0 && streamExecutes.length === 0) {
        assistantText = 'The model returned no visible text output.'
      }
      const blocks = (streamWrites.length > 0 || streamExecutes.length > 0) 
        ? { writes: streamWrites, executes: streamExecutes } 
        : await processBlocks(assistantText)

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          writes: blocks.writes,
          executes: blocks.executes,
          elapsed,
          promptTokens,
          responseTokens,
          model: currentModel
        }
        return updated
      })

      // Auto-reply logic for auto-executed commands
      blocks.executes.forEach((ex, idx) => {
        if (ex.status === 'running' && rootPath) {
          executeAndReply(ex.command, updated => updated.length - 1, idx)
        }
      })

      if (activeSession.name.startsWith('Session ') && history.length >= 1) {
        generateSessionTitle(activeIdAtSend, [...history, { role: 'assistant', content: assistantText }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${String(err)}` }])
    } finally {
      setLoading(false)
    }
  }

  async function generateSessionTitle(sessionId: string, msgs: Message[]) {
    const normalizeStreamLine = (rawLine: string) => {
      const line = rawLine.replace(/\r$/, '').trim()
      if (!line || line === '[DONE]') return ''
      if (line.startsWith('data:')) return line.slice(5).trim()
      return line
    }

    const getChatContent = (json: any): string | undefined => {
      if (json.message?.content) return json.message.content
      if (Array.isArray(json.choices) && json.choices.length > 0) {
        const first = json.choices[0]
        if (first.delta?.content) return first.delta.content
        if (first.message?.content) return first.message.content
        if (typeof first.text === 'string') return first.text
      }
      if (typeof json.text === 'string') return json.text
      if (typeof json.content === 'string') return json.content
      return undefined
    }

    const extractTitle = (text: string) => {
      try {
        const json = JSON.parse(text)
        return getChatContent(json)?.trim() ?? null
      } catch {
        return null
      }
    }

    const findTitleInBody = (body: string) => {
      const lines = body.split(/\r?\n/)
      for (const rawLine of lines) {
        const line = normalizeStreamLine(rawLine)
        if (!line) continue
        const maybe = extractTitle(line)
        if (maybe) return maybe
      }
      return null
    }

    try {
      if (window.api && typeof window.api.ollamaChat === 'function') {
        const body = await window.api.ollamaChat({ model, stream: false, messages: [ { role: 'system', content: 'Summarize the conversation into a 3-5 word title. ONLY the title. No quotes, no markdown, no prefixes.' }, ...msgs.slice(-2) ] })
        const text = String(body || '')
        const rawTitle = findTitleInBody(text) ?? extractTitle(text)
        if (rawTitle) {
          const title = rawTitle.replace(/^['"]|['"]$/g, '').replace(/\*/g, '')
          setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, name: title } : s))
          return
        }
      }

      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, stream: false, messages: [ { role: 'system', content: 'Summarize the conversation into a 3-5 word title. ONLY the title. No quotes, no markdown, no prefixes.' }, ...msgs.slice(-2) ] })
      })
      if (!res.ok) throw new Error('API failed')
      const text = await res.text()
      const rawTitle = findTitleInBody(text) ?? extractTitle(text)
      if (rawTitle) {
        const title = rawTitle.replace(/^['"]|['"]$/g, '').replace(/\*/g, '')
        setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, name: title } : s))
        return
      }
    } catch (err) {
      console.error('Auto-naming failed:', err)
    }
    
    // Fallback: Use the first few words of the user's prompt
    const userMsg = msgs.find(m => m.role === 'user')
    if (userMsg) {
      const words = userMsg.content.trim().split(/\s+/).slice(0, 4).join(' ')
      const fallbackTitle = words + (userMsg.content.length > words.length ? '...' : '')
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, name: fallbackTitle } : s))
    }
  }

  function joinPath(base: string, rel: string): string {
    return base.replace(/\/$/, '') + '/' + rel.replace(/^\//, '')
  }

  async function processBlocks(text: string): Promise<{ writes: WriteAction[]; executes: ExecuteAction[] }> {
    const re = /```(write|replace|execute)(?::\s*([^\n]*?))?\s*\n([\s\S]*?)```/g
    let match
    const writes: WriteAction[] = []
    const executes: ExecuteAction[] = []
    const isPlanMode = activeSession.mode === 'plan'
    while ((match = re.exec(text)) !== null) {
      const type = match[1]
      const filePath = match[2] ? decodeURIComponent(match[2].trim()) : ''
      const blockContent = match[3]

      if (type === 'execute') {
        // Block execute in ask and plan modes
        if (activeSession.mode === 'ask' || activeSession.mode === 'plan') continue
        // In agent mode, only allow ONE execute block
        if (executes.length > 0) continue
        const command = blockContent.trim()
        if (command && rootPath) {
          let status: 'pending' | 'running' | 'completed' | 'error' = 'pending'
          if (alwaysAllowedCommands.has(command)) status = 'running'
          executes.push({ command, status })
        }
        continue
      }

      if (!rootPath) continue

      // In ask mode, block all writes completely
      if (activeSession.mode === 'ask') continue

      // Plan mode: only allow .md plan files, block replace blocks
      const isPlanFile = filePath.endsWith('.md') && (filePath.startsWith('plans/') || filePath.includes('PLAN'))
      if (isPlanMode && !isPlanFile) continue
      if (isPlanMode && type === 'replace') continue

      const abs = filePath.startsWith(rootPath) ? filePath : joinPath(rootPath, filePath.replace(/^\//, ''))
      let prevContent: string | undefined
      try { prevContent = await window.api.readFile(abs) } catch {}
      
      let finalContent = blockContent
      if (type === 'replace' && prevContent) {
        const parts = blockContent.split('====')
        if (parts.length === 2) {
          const target = parts[0].replace('<<<<\n', '').replace('<<<<\r\n', '').trimEnd()
          const replacement = parts[1].replace('\n>>>>', '').replace('\r\n>>>>', '').replace('>>>>', '').trimStart()
          
          const normalizedPrev = prevContent.replace(/\r\n/g, '\n')
          const normalizedTarget = target.replace(/\r\n/g, '\n')
          const normalizedReplacement = replacement.replace(/\r\n/g, '\n')
          
          if (normalizedPrev.includes(normalizedTarget)) {
            finalContent = normalizedPrev.replace(normalizedTarget, normalizedReplacement)
          } else {
            finalContent = prevContent.replace(target, replacement)
          }
        }
      }

      if (autopilotRef.current) {
        await window.api.writeFile(abs, finalContent)
        if (openFile && abs === openFile) onWriteFile(finalContent)
        if (isPlanMode && isPlanFile && onOpenFile) onOpenFile(abs)
      }
      writes.push({ path: abs, content: finalContent, accepted: null, prevContent })
    }
    if (writes.length > 0) onRefreshTree()
    return { writes, executes }
  }

  async function handleAccept(msgIdx: number, filePath: string) {
    const write = messages[msgIdx].writes?.find(w => w.path.endsWith(filePath) || w.path === filePath)
    if (!write) return
    if (!autopilot) {
      await window.api.writeFile(write.path, write.content)
      if (openFile && write.path === openFile) onWriteFile(write.content)
      onRefreshTree()
    }
    setMessages(prev => prev.map((m, i) => i === msgIdx ? {
      ...m, writes: m.writes?.map(w => w.path === write.path ? { ...w, accepted: true } : w)
    } : m))
  }

  async function handleRevert(msgIdx: number, filePath: string) {
    const write = messages[msgIdx].writes?.find(w => w.path.endsWith(filePath) || w.path === filePath)
    if (!write || write.prevContent === undefined) return
    await window.api.writeFile(write.path, write.prevContent)
    if (openFile && write.path === openFile) onWriteFile(write.prevContent)
    onRefreshTree()
    setMessages(prev => prev.map((m, i) => i === msgIdx ? {
      ...m, writes: m.writes?.map(w => w.path === write.path ? { ...w, accepted: false } : w)
    } : m))
  }

  function handleExecuteAllow(msgIdx: number, execIdx: number, command: string, always: boolean) {
    if (always) {
      setAlwaysAllowedCommands(prev => new Set([...prev, command]))
    }
    
    // Set status to running
    setMessages(prev => prev.map((m, i) => i === msgIdx ? {
      ...m, executes: m.executes?.map((ex, j) => j === execIdx ? { ...ex, status: 'running' } : ex)
    } : m))
    
    // Then call executeAndReply
    executeAndReply(command, msgs => msgIdx, execIdx)
  }

  function handleExecuteCancel(msgIdx: number, execIdx: number) {
    setMessages(prev => prev.map((m, i) => i === msgIdx ? {
      ...m, executes: m.executes?.map((ex, j) => j === execIdx ? { ...ex, status: 'error', error: 'Cancelled by user' } : ex)
    } : m))
  }

  function processFile(file: File) {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = ev => {
        const base64 = ev.target?.result as string
        setAttachments(prev => [...prev, { name: file.name, base64, type: file.type }])
      }
      reader.readAsDataURL(file)
    } else {
      const reader = new FileReader()
      reader.onload = ev => {
        setInput(prev => prev + `\n\`\`\`${file.name}\n${ev.target?.result as string}\n\`\`\``)
      }
      reader.readAsText(file)
    }
  }

  function handleFileAttach(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    processFile(file)
    e.target.value = ''
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        processFile(files[i])
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const items = e.clipboardData.items
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile()
        if (file) {
          processFile(file)
        }
      }
    }
  }

  function removeAttachment(index: number) {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  function injectQuickPrompt(prompt: string) {
    setInput(prompt)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  async function callMcpToolWithTimeout(serverName: string, toolName: string, args: any, timeoutMs = 90000) {
    return await Promise.race([
      window.api.mcpCallTool(serverName, toolName, args),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Tool ${serverName}.${toolName} timed out after ${Math.round(timeoutMs / 1000)}s`)), timeoutMs)
      })
    ])
  }

  async function ollamaChatWithTimeout(chatPayload: any, timeoutMs = 120000) {
    if (!window.api || typeof window.api.ollamaChat !== 'function') return ''
    return await Promise.race([
      window.api.ollamaChat(chatPayload),
      new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error(`Ollama request timed out after ${Math.round(timeoutMs / 1000)}s`)),
          timeoutMs
        )
      })
    ])
  }

  function buildVisualPrompt(kind: 'diagram' | 'screen' | 'current-file') {
    if (kind === 'diagram') {
      if (openFile && rootPath) {
        const rel = openFile.replace(rootPath + '/', '')
        return `Generate a diagram directly from my IDE using Figma. Prefer the Figma diagram-generation workflow, not raw file data tools.\n\nUse the current file \`${rel}\` as context and create a user flow or architecture-style diagram based on its functionality. Summarize the result briefly after creating it.`
      }
      return `Generate a diagram directly from my IDE using Figma. Prefer the Figma diagram-generation workflow, not raw file data tools.\n\nCreate a user flow or architecture-style diagram from the current project context, and summarize the result briefly after creating it.`
    }

    if (kind === 'screen') {
      if (openFile && rootPath) {
        const rel = openFile.replace(rootPath + '/', '')
        return `Create a screen directly from my IDE using Figma. Prefer Figma screen/design-generation tools, not raw file data tools.\n\nUse the current file \`${rel}\` as the source of truth. Reuse the design system if available, then generate the most appropriate screen or component and summarize what you created.`
      }
      return `Create a screen directly from my IDE using Figma. Prefer Figma screen/design-generation tools, not raw file data tools.\n\nUse the current workspace context, reuse the design system if available, and summarize what you created.`
    }

    if (openFile && rootPath) {
      const rel = openFile.replace(rootPath + '/', '')
      return `Send the current file to Figma from my IDE.\n\nUse \`${rel}\` as the source and decide whether it should become a screen or a diagram. Prefer the correct Figma generation workflow, reuse the design system if available, and summarize the result briefly.`
    }

    return `Send the current project context to Figma from my IDE.\n\nDecide whether the best output is a screen or a diagram, use the correct Figma generation workflow, and summarize the result briefly.`
  }

  function isModelMultimodal(name: string): boolean {
    if (!name) return false
    const n = name.toLowerCase()
    return n.includes('llava') || 
           n.includes('vision') || 
           n.includes('vl') || 
           n.includes('moondream') || 
           n.includes('minicpm')
  }

  return (
    <div 
      className="chat-panel"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="chat-dropzone-overlay">
          <div className="chat-dropzone-box">
            <Paperclip size={32} className="chat-dropzone-icon" />
            <span className="chat-dropzone-text">
              Drop images or text files here
              {!isModelMultimodal(model) && (
                <div style={{ color: '#ffd685', marginTop: '6px', fontSize: '11px', fontWeight: 'normal' }}>
                  ⚠️ Model {model} may not support images
                </div>
              )}
            </span>
          </div>
        </div>
      )}
      <div className="session-bar">
        <div className="session-tabs">
          {sessions.filter(s => !s.isDeleted).map(s => (
            <div 
              key={s.id} 
              className={`session-tab ${s.id === activeId ? 'session-tab--active' : ''}`} 
              onClick={() => setActiveId(s.id)}
              onDoubleClick={() => startRename(s.id, s.name)}
            >
              {editingId === s.id ? (
                <input autoFocus className="session-tab-input" value={editingName} onChange={e => setEditingName(e.target.value)} onBlur={saveRename} onKeyDown={e => e.key === 'Enter' && saveRename()} />
              ) : (
                <span className="session-tab-name" title={s.name}>{s.name}</span>
              )}
              <button className="session-tab-close" onClick={e => { e.stopPropagation(); closeSession(s.id) }}>
                <X size={10} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
        <div className="session-actions">
          <button className="chat-action-btn" onClick={addSession} data-tooltip="New Session: Start a clean chat conversation">
            <Plus size={14} strokeWidth={2} />
          </button>
          <button className="chat-action-btn" onClick={() => setShowHistory(h => !h)} data-tooltip="Session History: Browse and restore past chat sessions" data-tooltip-align="right">
            <History size={14} strokeWidth={1.8} />
          </button>
          <button className="chat-action-btn" onClick={clearSession} data-tooltip="Clear Chat: Reset message history in current session" data-tooltip-align="right">
            <Trash2 size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {activeSession.mode === 'plan' && (
        <div className="planning-banner">
          <ClipboardList size={14} className="planning-banner-icon" />
          <span className="planning-banner-text">
            <strong>Planning Mode Active:</strong> The agent will design a high-level requirements plan inside <code>plans/PLAN-[date].md</code>. Source code modifications are disabled.
          </span>
        </div>
      )}

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map((m, i) => {
          if (m.role === 'tool') {
            const cleanName = m.name?.replace(/^mcp__([a-zA-Z0-9_-]+)__/, '') || m.name || 'tool'
            const serverName = m.name?.match(/^mcp__([a-zA-Z0-9_-]+)__/)?.[1] || 'mcp'
            return (
              <div key={`msg-${activeId}-${i}`} className="chat-msg chat-msg--tool">
                <div className="chat-msg-header">
                  <span className="chat-role" style={{ color: '#4ec9b0' }}>
                    TOOL ({serverName.toUpperCase()})
                  </span>
                  <span className="chat-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="chat-msg-bubble chat-msg-bubble--tool" style={{ backgroundColor: 'rgba(78, 201, 176, 0.04)', border: '1px solid rgba(78, 201, 176, 0.15)', color: '#ccc' }}>
                  <div className="mcp-tool-call-header" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', width: '100%' }}>
                    <Database size={12} className="mcp-tool-call-icon" style={{ color: '#4ec9b0', flexShrink: 0 }} />
                    <span style={{ color: '#aaa' }}>Called <code>{cleanName}</code></span>
                    {m.toolStatus === 'running' && <span className="mcp-tool-status mcp-tool-status--running" style={{ marginLeft: 'auto', background: 'rgba(206,145,120,0.1)', color: '#ce9178', padding: '1px 5px', borderRadius: '3px', fontSize: '9px' }}>Executing...</span>}
                    {m.toolStatus === 'completed' && <span className="mcp-tool-status mcp-tool-status--completed" style={{ marginLeft: 'auto', background: 'rgba(78,201,176,0.1)', color: '#4ec9b0', padding: '1px 5px', borderRadius: '3px', fontSize: '9px' }}>Success</span>}
                  </div>
                  <pre className="mcp-tool-output-pre" style={{ margin: 0, overflowX: 'auto', maxHeight: '250px', fontSize: '11px', fontFamily: 'monospace', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <code>{m.content}</code>
                  </pre>
                </div>
              </div>
            )
          }

          return (
            <div key={`msg-${activeId}-${i}`} className={`chat-msg chat-msg--${m.role} ${m.isToolOutput ? 'chat-msg--tool-output' : ''}`}>
              <div className="chat-msg-header">
                <span className="chat-role" style={m.isToolOutput ? { color: '#a8a29e' } : {}}>{m.isToolOutput ? 'TERMINAL' : m.role.toUpperCase()}</span>
                <span className="chat-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="chat-msg-bubble" style={m.isToolOutput ? { backgroundColor: '#2d2d2d', border: '1px solid #444', color: '#ccc' } : {}}>
                <MessageContent 
                  content={m.content} 
                  writes={m.writes}
                  executes={m.executes}
                  onAccept={p => handleAccept(i, p)}
                  onRevert={p => handleRevert(i, p)}
                  onOpenDiff={onOpenDiff}
                  onExecuteAllow={(cmd, always) => handleExecuteAllow(i, m.executes?.findIndex(e => e.command === cmd) ?? -1, cmd, always)}
                  onExecuteCancel={(cmd) => handleExecuteCancel(i, m.executes?.findIndex(e => e.command === cmd) ?? -1)}
                />
                {m.tool_calls && m.tool_calls.length > 0 && (
                  <div className="mcp-tool-calls-container" style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                    {m.tool_calls.map((tc: any, tcIdx: number) => {
                      const match = tc.function.name.match(/^mcp__([a-zA-Z0-9_-]+)__(.+)$/)
                      const server = match ? match[1] : 'mcp'
                      const tool = match ? match[2] : tc.function.name
                      return (
                        <div key={tcIdx} className="mcp-tool-call-indicator" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '5px 8px', borderRadius: '4px', color: '#ccc' }}>
                          <Database size={11} style={{ color: '#4ec9b0', flexShrink: 0 }} />
                          <span>Using tool: <strong style={{ color: '#4fc1ff' }}>{server}.{tool}</strong></span>
                        </div>
                      )
                    })}
                  </div>
                )}
                {m.images && m.images.length > 0 && (
                  <div className="chat-msg-images">
                    {m.images.map((img, idx) => (
                      <img key={idx} src={img} className="chat-msg-image" alt="attachment" onClick={() => window.open(img)} />
                    ))}
                  </div>
                )}
                {(m.writes || m.elapsed) && (
                  <div className="msg-meta">
                    {m.writes && <span className="msg-writes">{m.writes.length} patches</span>}
                    {m.elapsed && <span className="msg-elapsed">{m.elapsed.toFixed(1)}s</span>}
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {loading && (
          <div className="chat-msg chat-msg--assistant">
            <div className="chat-msg-header">
              <span className="chat-role">AGENT</span>
              <div className="toolbar-spinner" style={{ marginLeft: 8 }} />
              {isWaitingFirstToken && (
                <span className="agent-loading-status" style={{ fontSize: '11px', color: '#888', fontStyle: 'italic', marginLeft: '12px', opacity: 0.8 }}>
                  {statusText}
                </span>
              )}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        {routerRec && !routerRec.isOptimal && routerRec.recommendedModelToPull && (
          <div style={{
            background: 'rgba(255, 170, 0, 0.1)',
            border: '1px solid rgba(255, 170, 0, 0.3)',
            borderRadius: '8px',
            padding: '8px 12px',
            margin: '8px 12px 0 12px',
            fontSize: '12px',
            color: '#ffcc00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}>
            <span>
              💡 <strong>Task Router ({routerRec.taskCategory}):</strong> Installed models scored {routerRec.suitabilityScore}/100. Recommended free open model: <code>{routerRec.recommendedModelToPull}</code>
            </span>
            <button
              onClick={() => handlePullModel(routerRec.recommendedModelToPull!)}
              disabled={pullingModel !== null}
              style={{
                background: '#007acc',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {pullingModel === routerRec.recommendedModelToPull ? 'Pulling...' : `Pull ${routerRec.recommendedModelToPull}`}
            </button>
          </div>
        )}
        {pullStatus && (
          <div style={{
            background: 'rgba(0, 122, 204, 0.15)',
            border: '1px solid rgba(0, 122, 204, 0.3)',
            borderRadius: '6px',
            padding: '6px 12px',
            margin: '4px 12px 0 12px',
            fontSize: '11px',
            color: '#4fc3f7'
          }}>
            ℹ️ {pullStatus}
          </div>
        )}
        {rootPath && (
          <div className="chat-workspace-indicator">
            <span className="chat-workspace-dot" />
            <span className="chat-workspace-path" title={rootPath}>
              {rootPath.split('/').pop()}
            </span>
          </div>
        )}
        {!rootPath && (
          <div className="chat-workspace-indicator chat-workspace-indicator--none">
            <span>⚠️ No project folder open — files will not be written</span>
          </div>
        )}
        <div className="chat-input-wrapper">
          {attachments.length > 0 && (
            <div className="chat-attachments-preview">
              {attachments.map((att, idx) => (
                <div key={idx} className="chat-attachment-card">
                  <img src={att.base64} alt={att.name} className="chat-attachment-thumbnail" />
                  <span className="chat-attachment-name" title={att.name}>{att.name}</span>
                  <button className="chat-attachment-remove" onClick={() => removeAttachment(idx)}>
                    <X size={10} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
              {!isModelMultimodal(model) && (
                <div className="chat-attachment-warning">
                  <span>⚠️ Model {model} may not support images</span>
                </div>
              )}
            </div>
          )}
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask anything, @ to mention..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            onPaste={handlePaste}
            rows={Math.min(10, input.split('\n').length || 1)}
            style={{ height: 'auto' }}
          />
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
            <button
              className="chat-action-btn"
              onClick={() => injectQuickPrompt(buildVisualPrompt('diagram'))}
              data-tooltip="Generate Diagram: Create a flow or architecture diagram in Figma"
              data-tooltip-position="top"
              type="button"
              style={{ width: 'auto', padding: '0 10px', gap: '6px' }}
            >
              <Layers size={13} strokeWidth={1.8} />
              <span>Diagram</span>
            </button>
            <button
              className="chat-action-btn"
              onClick={() => injectQuickPrompt(buildVisualPrompt('screen'))}
              data-tooltip="Create Screen: Generate a screen or component in Figma"
              data-tooltip-position="top"
              type="button"
              style={{ width: 'auto', padding: '0 10px', gap: '6px' }}
            >
              <FilePlus size={13} strokeWidth={1.8} />
              <span>Screen</span>
            </button>
            <button
              className="chat-action-btn"
              onClick={() => injectQuickPrompt(buildVisualPrompt('current-file'))}
              data-tooltip="Send Current File: Use the open file as the source for a Figma visual"
              data-tooltip-position="top"
              type="button"
              style={{ width: 'auto', padding: '0 10px', gap: '6px' }}
            >
              <FileDiff size={13} strokeWidth={1.8} />
              <span>{openFile ? 'From Current File' : 'From Workspace'}</span>
            </button>
          </div>
          <div className="chat-input-footer">
            <button className="chat-action-btn" onClick={() => fileInputRef.current?.click()} data-tooltip="Attach File: Select and upload a file or image" data-tooltip-position="top">
              <Paperclip size={14} strokeWidth={1.8} />
            </button>
            <input type="file" ref={fileInputRef} style={{display:'none'}} onChange={handleFileAttach} />

            <select 
              className="chat-select chat-select--mode"
              value={activeSession.mode}
              onChange={(e) => setMode(e.target.value as any)}
            >
              {AGENT_MODES.map(m => (
                <option key={m} value={m}>{m.toUpperCase()}</option>
              ))}
            </select>

            <select 
              className="chat-select chat-select--model"
              value={model}
              onChange={(e) => onModelChange(e.target.value)}
            >
              <option value="auto">Auto</option>
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <button 
              className={`chat-action-btn ${autopilot ? 'active' : ''}`} 
              onClick={() => { const next = !autopilot; setAutopilot(next); autopilotRef.current = next }}
              data-tooltip={autopilot ? 'Disable Autopilot: Approve agent actions manually' : 'Enable Autopilot: Let the agent execute actions autonomously'}
              data-tooltip-position="top"
              data-tooltip-align="right"
            >
              <Zap size={14} strokeWidth={1.8} />
            </button>

            <button className="send-btn" onClick={send} disabled={loading || !input.trim() || !model}>
              <Send size={13} strokeWidth={2} />
              Send
            </button>
          </div>
        </div>
      </div>

      {showHistory && (
        <div className="session-history-overlay" onClick={() => setShowHistory(false)}>
          <div className="session-history" onClick={e => e.stopPropagation()}>
            <div className="session-history-header">
              <input 
                autoFocus
                placeholder="Search history..." 
                value={historySearch} 
                onChange={e => setHistorySearch(e.target.value)} 
                className="history-search" 
              />
              <div className="history-header-actions">
                <button className="history-action-link" onClick={openForensics}>
                  Time Machine
                </button>
                <button className="history-action-link" onClick={() => setShowDeleted(!showDeleted)}>
                  {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
                </button>
                <button className="chat-action-btn" onClick={() => setShowHistory(false)}>×</button>
              </div>
            </div>
            <div className="history-list">
              {filteredHistory.map(s => (
                <div key={s.id} className="history-item" onClick={() => { setActiveId(s.id); setShowHistory(false) }}>
                  <div className="history-item-left">
                    <span className="history-name">{s.name}</span>
                    <span className="history-path">{new Date(s.lastActive).toLocaleString()}</span>
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    color: '#888', 
                    marginLeft: 'auto',
                    marginRight: '8px',
                    fontFamily: 'monospace',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '120px'
                  }} title={s.workspace || 'No Project'}>
                    {s.workspace ? s.workspace.split(/[\\/]/).pop() : 'No Project'}
                  </span>
                  {s.isDeleted && (
                    <div className="history-item-status">
                      <span className="history-tag">Deleted</span>
                      <button 
                        className="history-restore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessions(prev => prev.map(sess => sess.id === s.id ? { ...sess, isDeleted: false } : sess));
                          setActiveId(s.id);
                          setShowHistory(false);
                        }}
                      >Restore</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showForensics && (
        <div className="session-history-overlay" onClick={() => setShowForensics(false)}>
          <div className="session-history" onClick={e => e.stopPropagation()}>
            <div className="session-history-header" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="history-name" style={{fontWeight:700, fontSize:'13px'}}>Time Machine (Backups)</span>
              <button 
                className="history-action-link" 
                onClick={() => setShowForensics(false)}
                style={{ fontSize: '16px', padding: '0 6px', border: 'none' }}
              >×</button>
            </div>
            <div style={{ padding: '10px 14px', fontSize: '11px', color: '#888', borderBottom: '1px solid #333', lineHeight: '1.4' }}>
              Restore your entire workspace to a previous point in time.
              <br />
              <span style={{ color: '#d4d4d4' }}>Warning: Restoring a snapshot will completely overwrite your current active sessions.</span>
            </div>
            <div className="history-list">
              {backups.map((b, index) => {
                const isObj = b && typeof b === 'object';
                const filename = isObj ? b.filename : b;
                const workspaces = isObj ? b.workspaces : [];
                const summary = isObj ? b.summary : 'Project snapshot';
                
                const cleanName = filename ? filename.replace('sessions.', '').replace('.json', '') : '';
                const activeProject = rootPath ? rootPath.split(/[\\/]/).pop() : '';
                const pathText = workspaces && workspaces.length > 0
                  ? `${workspaces.join(', ')} • ${summary}`
                  : (activeProject ? `${activeProject} • ${summary}` : summary);

                return (
                  <div key={filename} className="history-item" onClick={() => applyBackup(filename)}>
                    <div className="history-item-left">
                      <span className="history-name">{cleanName}</span>
                      <span className="history-path" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px' }} title={pathText}>
                        {pathText}
                      </span>
                    </div>
                    {index === 0 && (
                      <span className="history-tag" style={{ background: '#0e639c', color: '#fff', marginLeft: 'auto' }}>
                        Latest
                      </span>
                    )}
                  </div>
                );
              })}
              {backups.length === 0 && <div style={{padding:20, textAlign:'center', color:'#666'}}>No backups found</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
