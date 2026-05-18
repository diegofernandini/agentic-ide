import React, { useState, useRef, useEffect } from 'react'
import { Plus, History, Trash2, Paperclip, Send, Zap, Copy, FilePlus, FileDiff, CheckCircle2, RotateCcw, X, Bot, ClipboardList, Bug, Layers, MessageCircleQuestion } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  writes?: WriteAction[]
  elapsed?: number
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
    }
  }
}

interface Props {
  model: string
  models: string[]
  onModelChange: (m: string) => void
  rootPath: string | null
  openFile: string | null
  fileContent: string
  onWriteFile: (content: string) => void
  onRefreshTree: () => void
  onOpenFile?: (path: string) => void
}

function newSession(count: number, mode: AgentMode = 'agent'): Session {
  const now = Date.now()
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
  return { 
    id,
    name: `Session ${count}`, 
    messages: [], 
    mode,
    createdAt: now,
    lastActive: now
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
      parts.push(<ul key={key} className="md-list">{currentBlock.map((li, idx) => <li key={idx}>{parseInline(li)}</li>)}</ul>)
    } else {
      // Paragraphs and headers
      currentBlock.forEach((line, idx) => {
        if (line.startsWith('### ')) parts.push(<h3 key={`${key}-${idx}`} className="md-h3">{parseInline(line.slice(4))}</h3>)
        else if (line.startsWith('## ')) parts.push(<h2 key={`${key}-${idx}`} className="md-h2">{parseInline(line.slice(3))}</h2>)
        else if (line.startsWith('# ')) parts.push(<h1 key={`${key}-${idx}`} className="md-h1">{parseInline(line.slice(2))}</h1>)
        else if (line.trim() === '') parts.push(<div key={`${key}-${idx}`} className="md-spacer" />)
        else parts.push(<p key={`${key}-${idx}`} className="md-p">{parseInline(line)}</p>)
      })
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

  function parseInline(t: string) {
    const tokens: React.ReactNode[] = []
    let i = 0
    while (i < t.length) {
      // Bold **
      if (t.startsWith('**', i)) {
        const end = t.indexOf('**', i + 2)
        if (end !== -1) {
          tokens.push(<b key={i}>{t.slice(i + 2, end)}</b>)
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
          tokens.push(<code key={i} className="md-inline-code">{t.slice(i + 1, end)}</code>)
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

function MessageContent({ content, writes, onAccept, onRevert }: {
  content: string
  writes?: WriteAction[]
  onAccept: (path: string) => void
  onRevert: (path: string) => void
}) {
  const blockRe = /```(write|replace):([^\n]+)\n([\s\S]*?)```/g
  const parts: React.ReactNode[] = []
  let last = 0
  let match

  while ((match = blockRe.exec(content)) !== null) {
    if (match.index > last) {
      parts.push(<Markdown key={`text-${last}`} text={content.slice(last, match.index)} />)
    }
    const type = match[1]
    const filePath = match[2].trim()
    const blockContent = match[3]
    const write = writes?.find(w => w.path.endsWith(filePath) || w.path === filePath)
    const fileName = filePath.split('/').pop()

    parts.push(
      <div key={match.index} className="write-block">
        <div className="write-block-header">
          <div className="write-block-info">
            <span className="write-block-icon">{type === 'replace' ? <FileDiff size={13} strokeWidth={2} /> : <FilePlus size={13} strokeWidth={2} />}</span>
            <span className="write-block-file">{fileName}</span>
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
            <button className="write-icon-btn" onClick={() => navigator.clipboard.writeText(blockContent)} title="Copy">
              <Copy size={12} strokeWidth={1.8} />
            </button>
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
  model, models, onModelChange,
  rootPath, openFile, fileContent,
  onWriteFile, onRefreshTree, onOpenFile
}: Props) {
  const [sessions, setSessions] = useState<Session[]>([newSession(1)])
  const [activeId, setActiveId] = useState<string>(sessions[0].id)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [autopilot, setAutopilot] = useState(true)
  const autopilotRef = useRef(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [historySearch, setHistorySearch] = useState('')
  const [showDeleted, setShowDeleted] = useState(false)
  const [showForensics, setShowForensics] = useState(false)
  const [showModeMenu, setShowModeMenu] = useState(false)
  const [backups, setBackups] = useState<string[]>([])
  const hasLoadedRef = useRef(false)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    window.api.loadSessions().then(saved => {
      if (saved && saved.length > 0) { 
        const migrated = saved.map((s: any) => ({
          ...s,
          createdAt: s.createdAt || Date.now(),
          lastActive: s.lastActive || Date.now()
        }))
        setSessions(migrated)
        setActiveId(migrated[0].id) 
      }
      hasLoadedRef.current = true
    })
  }, [])

  useEffect(() => { 
    if (hasLoadedRef.current) {
      window.api.saveSessions(JSON.stringify(sessions)) 
    }
  }, [sessions])

  const activeSession = sessions.find(s => s.id === activeId) ?? sessions[0]
  const messages = activeSession.messages

  useEffect(() => {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, lastActive: Date.now() } : s))
  }, [activeId])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function setMessages(updater: (prev: Message[]) => Message[]) {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, messages: updater(s.messages), lastActive: Date.now() } : s))
  }

  function setMode(mode: AgentMode) {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, mode, lastActive: Date.now() } : s))
    setShowModeMenu(false)
  }

  function addSession() {
    const nextNum = sessions.length + 1
    const s = newSession(nextNum); 
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

  async function buildSystemPrompt(mode?: AgentMode): Promise<string> {
    const sessionMode = mode ?? activeSession.mode
    let sys = `You are an expert agentic coding assistant.`

    if (sessionMode === 'ask') {
      sys += `\n\n[MODE: ASK]\nYou are in Q&A mode. Your goal is to explain concepts, answer questions, and help the user understand their code. DO NOT output any file modifications. If you provide code examples, use standard markdown code blocks (e.g., \`\`\`js) without any 'write:' or 'replace:' prefixes. If you detect a possible improvement or a code change that should be applied, explicitly prompt the user to switch to 'Agent' mode so you can implement it for them, or offer related subjects to clear up any doubts.`
    } else if (sessionMode === 'plan') {
      // Plan mode: forbid all code implementation, only allow writing the plan document
      const planFile = `plans/PLAN-${new Date().toISOString().slice(0,10)}.md`
      sys += ` You are in PLANNING mode. Your ONLY output must be a structured requirements and implementation plan written to a markdown file.

⛔ STRICTLY FORBIDDEN:
- Do NOT write, modify, or replace ANY source code files (.ts, .tsx, .js, .py, .css, etc.)
- Do NOT use replace: blocks under any circumstance
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
      sys += ` You have direct write access to the user's project files.

When you need to modify existing files, you MUST use this exact format:
\`\`\`replace:relative/path/to/file.ext
<<<<
existing code to replace
====
new code to insert
>>>>
\`\`\`

When you need to create NEW files, use:
\`\`\`write:relative/path/to/file.ext
full content
\`\`\`

Rules:
- ALWAYS use replace blocks for edits.
- The <<<< section must match exactly.
- ALWAYS use relative paths.
- Write ALL necessary files immediately.`
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

    sys += `\n\nProject root: ${rootPath}`
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
    return sys
  }

  async function send() {
    if (!input.trim() || loading || !model) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const history: Message[] = [...messages, userMsg]
    setMessages(() => history)
    setInput('')
    setLoading(true)
    startTimeRef.current = Date.now()

    try {
      const systemPrompt = await buildSystemPrompt()
      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model, stream: true,
          messages: [{ role: 'system', content: systemPrompt }, ...history]
        })
      })
      if (!res.ok) throw new Error(`Ollama error: ${res.status}`)

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantText = ''
      const activeIdAtSend = activeId
      let processedUpTo = 0
      const streamWrites: WriteAction[] = []
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        for (const line of decoder.decode(value).split('\n')) {
          if (!line.trim()) continue
          try {
            const json = JSON.parse(line)
            if (json.message?.content) {
              assistantText += json.message.content
              setSessions(prev => prev.map(s => {
                if (s.id !== activeIdAtSend) return s
                const msgs = [...s.messages]
                msgs[msgs.length - 1] = { role: 'assistant', content: assistantText }
                return { ...s, messages: msgs }
              }))

              const blockRe = /```(write|replace):\s*([^\n]+?)\s*\n([\s\S]*?)```/g
              blockRe.lastIndex = processedUpTo
              let m
              while ((m = blockRe.exec(assistantText)) !== null) {
                processedUpTo = m.index + m[0].length
                const type = m[1]
                const filePath = decodeURIComponent(m[2].trim())
                const blockContent = m[3]
                if (!rootPath) continue

                // In plan mode, ONLY allow writing .md plan files — block all source code writes
                const isPlanMode = activeSession.mode === 'plan'
                const isPlanFile = filePath.endsWith('.md') && (filePath.startsWith('plans/') || filePath.includes('PLAN'))
                if (isPlanMode && !isPlanFile) continue
                // Also block replace blocks in plan mode entirely
                if (isPlanMode && type === 'replace') continue

                const abs = filePath.startsWith('/') ? filePath : joinPath(rootPath, filePath)
                let prevContent: string | undefined
                try { prevContent = await window.api.readFile(abs) } catch {}
                
                let finalContent = blockContent
                if (type === 'replace' && prevContent) {
                  const parts = blockContent.split('====')
                  if (parts.length === 2) {
                    const target = parts[0].replace('<<<<\n', '').trimEnd()
                    const replacement = parts[1].replace('\n>>>>', '').replace('>>>>', '').trimStart()
                    finalContent = prevContent.replace(target, replacement)
                  }
                }

                if (autopilotRef.current) {
                  await window.api.writeFile(abs, finalContent)
                  if (openFile && abs === openFile) onWriteFile(finalContent)
                  onRefreshTree()
                  // In plan mode, auto-open the written plan file
                  if (isPlanMode && isPlanFile && onOpenFile) {
                    onOpenFile(abs)
                  }
                }
                streamWrites.push({ path: abs, content: finalContent, accepted: autopilotRef.current ? null : null, prevContent })
              }
            }
          } catch {}
        }
      }

      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      const writes = streamWrites.length > 0 ? streamWrites : await processWrites(assistantText)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { ...updated[updated.length - 1], writes, elapsed }
        return updated
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
    try {
      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model, stream: false,
          messages: [
            { role: 'system', content: 'Summarize the conversation into a 3-5 word title. ONLY the title. No quotes, no markdown, no prefixes.' },
            ...msgs.slice(-2)
          ]
        })
      })
      if (!res.ok) throw new Error('API failed')
      const json = await res.json()
      const rawTitle = json.message?.content?.trim()
      if (rawTitle) {
        const title = rawTitle.replace(/^["']|["']$/g, '').replace(/\*/g, '')
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

  async function processWrites(text: string): Promise<WriteAction[]> {
    const re = /```(write|replace):\s*([^\n]+?)\s*\n([\s\S]*?)```/g
    let match
    const actions: WriteAction[] = []
    const isPlanMode = activeSession.mode === 'plan'
    while ((match = re.exec(text)) !== null) {
      const type = match[1]
      const filePath = decodeURIComponent(match[2].trim())
      const blockContent = match[3]
      if (!rootPath) continue

      // Plan mode: only allow .md plan files, block replace blocks
      const isPlanFile = filePath.endsWith('.md') && (filePath.startsWith('plans/') || filePath.includes('PLAN'))
      if (isPlanMode && !isPlanFile) continue
      if (isPlanMode && type === 'replace') continue

      const abs = filePath.startsWith('/') ? filePath : joinPath(rootPath, filePath)
      let prevContent: string | undefined
      try { prevContent = await window.api.readFile(abs) } catch {}
      
      let finalContent = blockContent
      if (type === 'replace' && prevContent) {
        const parts = blockContent.split('====')
        if (parts.length === 2) {
          const target = parts[0].replace('<<<<\n', '').trimEnd()
          const replacement = parts[1].replace('\n>>>>', '').replace('>>>>', '').trimStart()
          finalContent = prevContent.replace(target, replacement)
        }
      }

      if (autopilotRef.current) {
        await window.api.writeFile(abs, finalContent)
        if (openFile && abs === openFile) onWriteFile(finalContent)
        if (isPlanMode && isPlanFile && onOpenFile) onOpenFile(abs)
      }
      actions.push({ path: abs, content: finalContent, accepted: null, prevContent })
    }
    if (actions.length > 0) onRefreshTree()
    return actions
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

  function handleFileAttach(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setInput(prev => prev + `\n\`\`\`${file.name}\n${ev.target?.result as string}\n\`\`\``)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="chat-panel">
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
          <button className="chat-action-btn" onClick={addSession} title="New Session">
            <Plus size={14} strokeWidth={2} />
          </button>
          <button className="chat-action-btn" onClick={() => setShowHistory(h => !h)} title="History">
            <History size={14} strokeWidth={1.8} />
          </button>
          <button className="chat-action-btn" onClick={clearSession} title="Clear Session">
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
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg chat-msg--${m.role}`}>
            <div className="chat-msg-header">
              <span className="chat-role">{m.role.toUpperCase()}</span>
              <span className="chat-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="chat-msg-bubble">
              <MessageContent 
                content={m.content} 
                writes={m.writes}
                onAccept={p => handleAccept(i, p)}
                onRevert={p => handleRevert(i, p)}
              />
              {(m.writes || m.elapsed) && (
                <div className="msg-meta">
                  {m.writes && <span className="msg-writes">{m.writes.length} patches</span>}
                  {m.elapsed && <span className="msg-elapsed">{m.elapsed.toFixed(1)}s</span>}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-msg chat-msg--assistant">
            <div className="chat-msg-header">
              <span className="chat-role">AGENT</span>
              <div className="toolbar-spinner" style={{ marginLeft: 8 }} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            placeholder="Ask anything, @ to mention..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={Math.min(10, input.split('\n').length || 1)}
            style={{ height: 'auto' }}
          />
          <div className="chat-input-footer">
            <button className="chat-action-btn" onClick={() => fileInputRef.current?.click()} title="Attach File">
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
              {models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <button 
              className={`chat-action-btn ${autopilot ? 'active' : ''}`} 
              onClick={() => { const next = !autopilot; setAutopilot(next); autopilotRef.current = next }}
              title={autopilot ? 'Autopilot ON' : 'Autopilot OFF'}
            >
              <Zap size={14} strokeWidth={1.8} />
            </button>

            <button className="send-btn" onClick={send} disabled={loading || !input.trim()}>
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
                const cleanName = b.replace('sessions.', '').replace('.json', '');
                return (
                  <div key={b} className="history-item" onClick={() => applyBackup(b)}>
                    <div className="history-item-left">
                      <span className="history-name">{cleanName}</span>
                      <span className="history-path">Project snapshot</span>
                    </div>
                    {index === 0 && <span className="history-tag" style={{ background: '#0e639c', color: '#fff' }}>Latest</span>}
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
