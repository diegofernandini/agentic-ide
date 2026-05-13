import React, { useState, useRef, useEffect } from 'react'

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
  mode: 'planning' | 'questions' | 'default'
}

const AGENT_MODES = ['planning', 'questions', 'default'] as const
type AgentMode = typeof AGENT_MODES[number]

declare global {
  interface Window {
    api: {
      writeFile: (p: string, content: string) => Promise<boolean>
      readFile: (p: string) => Promise<string>
      listFiles: (p: string) => Promise<string[]>
      loadSessions: () => Promise<Session[] | null>
      saveSessions: (data: string) => Promise<void>
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
}

let sessionCounter = 1
function newSession(mode: AgentMode = 'default'): Session {
  return { id: crypto.randomUUID(), name: `Session ${sessionCounter++}`, messages: [], mode }
}

function MessageContent({ content, writes, onAccept, onRevert }: {
  content: string
  writes?: WriteAction[]
  onAccept: (path: string) => void
  onRevert: (path: string) => void
}) {
  const writeRe = /```write:([^\n]+)\n([\s\S]*?)```/g
  const parts: React.ReactNode[] = []
  let last = 0
  let match

  while ((match = writeRe.exec(content)) !== null) {
    if (match.index > last) parts.push(<span key={last}>{content.slice(last, match.index)}</span>)
    const filePath = match[1].trim()
    const fileContent = match[2]
    const write = writes?.find(w => w.path.endsWith(filePath) || w.path === filePath)
    const fileName = filePath.split('/').pop()

    parts.push(
      <div key={match.index} className="write-block">
        <div className="write-block-header">
          <span className="write-block-chevron">›</span>
          <span className="write-block-count">{fileContent.split('\n').length} edits to file</span>
          <span className="write-block-file">
            <span className="write-block-dot" />{fileName}
          </span>
          <div className="write-block-actions">
            <button className="write-action-btn" title="Copy" onClick={() => navigator.clipboard.writeText(fileContent)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z"/>
              </svg>
            </button>
          </div>
          {write && write.accepted !== null && (
            <span className={`write-status ${write.accepted ? 'write-status--accepted' : 'write-status--reverted'}`}>
              {write.accepted ? '✓ Accepted' : write.error ? `⚠ ${write.error}` : '↩ Reverted'}
            </span>
          )}
        </div>
        {(!write || write.accepted === null) && (
          <div className="write-block-footer">
            <button className="write-revert-btn" onClick={() => onRevert(filePath)}>Revert</button>
            <button className="write-close-btn" onClick={() => onAccept(filePath)}>×</button>
          </div>
        )}
      </div>
    )
    last = match.index + match[0].length
  }

  if (last < content.length) parts.push(<span key={last}>{content.slice(last)}</span>)
  return <div className="chat-content">{parts}</div>
}

export default function ChatPanel({
  model, models, onModelChange,
  rootPath, openFile, fileContent,
  onWriteFile, onRefreshTree
}: Props) {
  const [sessions, setSessions] = useState<Session[]>([newSession()])
  const [activeId, setActiveId] = useState<string>(sessions[0].id)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [autopilot, setAutopilot] = useState(true)
  const autopilotRef = useRef(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    window.api.loadSessions().then(saved => {
      if (saved && saved.length > 0) { setSessions(saved); setActiveId(saved[0].id) }
    })
  }, [])

  useEffect(() => { window.api.saveSessions(JSON.stringify(sessions)) }, [sessions])

  const activeSession = sessions.find(s => s.id === activeId) ?? sessions[0]
  const messages = activeSession.messages

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function setMessages(updater: (prev: Message[]) => Message[]) {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, messages: updater(s.messages) } : s))
  }

  function addSession() {
    const s = newSession(); setSessions(prev => [...prev, s]); setActiveId(s.id); setInput('')
  }

  function closeSession(id: string) {
    setSessions(prev => {
      const next = prev.filter(s => s.id !== id)
      if (next.length === 0) { const s = newSession(); setActiveId(s.id); return [s] }
      if (id === activeId) setActiveId(next[next.length - 1].id)
      return next
    })
  }

  function clearSession() {
    setSessions(prev => prev.map(s => s.id === activeId ? { ...s, messages: [] } : s))
  }

  // Build system prompt with real project context
  async function buildSystemPrompt(mode?: AgentMode): Promise<string> {
    const sessionMode = mode ?? activeSession.mode
    let sys = `You are an agentic coding assistant with direct write access to the user's project files.

When you need to create or modify files, you MUST use this exact format:
\`\`\`write:relative/path/to/file.ext
file content here
\`\`\`

Rules:
- ALWAYS use write blocks to create or edit files. Never give manual instructions like "run this command" or "create this file yourself".
- ALWAYS use relative paths (e.g. src/main.py, index.html). Never absolute paths.
- Write ALL necessary files immediately without asking for confirmation.
- If asked to create a project, write ALL files in one response.

Example — if the user says "create a hello world python script", you respond:
I'll create that for you.
\`\`\`write:hello.py
print("Hello, world!")
\`\`\`

Example — if the user says "create a flask app", you respond:
\`\`\`write:app.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello!'

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`
\`\`\`write:requirements.txt
flask
\`\`\``

    // Add mode-specific instructions
    if (sessionMode === 'planning') {
      sys += `\n\n[MODE: PLANNING]
IMPORTANT: In this mode, you MUST create a detailed, structured plan BEFORE implementing anything.
1. First, break down the task into clear steps with dependencies and verification points.
2. Outline key decisions, potential edge cases, and constraints.
3. Use markdown sections (##, ###) for clarity.
4. ONLY after creating the plan, offer to implement it if the user confirms.
5. Do NOT write code or files until explicitly asked to implement.`
    } else if (sessionMode === 'questions') {
      sys += `\n\n[MODE: QUESTIONS]
IMPORTANT: In this mode, you MUST ask clarifying questions BEFORE proposing a solution.
1. Ask 3-5 focused questions about requirements, constraints, preferences, and edge cases.
2. Wait for the user's answers before proposing any approach.
3. Once you have clarity, explain your proposed approach and ask for confirmation.
4. Only then write code/files if confirmed.
5. Be conversational and thorough in understanding the user's needs.`
    }

    if (!rootPath) {
      if (openFile) sys += `\n\nOpen file: ${openFile}\n\`\`\`\n${fileContent.slice(0, 4000)}\n\`\`\``
      return sys
    }

    sys += `\n\nProject root: ${rootPath}`

    try {
      const IGNORE = ['node_modules', '.git', 'dist', 'out', '.next', '__pycache__', '.venv', 'venv', 'build', 'coverage']
      const files = await window.api.listFiles(rootPath)
      const filtered = files.filter(f => !IGNORE.some(ig => f.includes(`/${ig}/`) || f.includes(`/${ig}`)))
      const relative = filtered.map(f => f.replace(rootPath + '/', ''))
      sys += `\n\nProject files:\n${relative.slice(0, 150).join('\n')}`

      // Only read README and package.json — keep prompt small
      const priority = ['README.md', 'readme.md', 'package.json', 'pyproject.toml', 'requirements.txt']
      const toRead = filtered.filter(f => priority.some(p => f.endsWith('/' + p) || f === rootPath + '/' + p)).slice(0, 3)

      for (const fp of toRead) {
        try {
          const c = await window.api.readFile(fp)
          if (c.length < 2000) sys += `\n\n--- ${fp.replace(rootPath + '/', '')} ---\n${c}`
        } catch {}
      }
    } catch (e) {
      console.warn('listFiles failed:', e)
    }

    if (openFile) {
      const rel = openFile.replace(rootPath + '/', '')
      if (!sys.includes(`--- ${rel} ---`)) {
        const snippet = fileContent.length > 3000 ? fileContent.slice(0, 3000) + '\n...(truncated)' : fileContent
        sys += `\n\nCurrently open file (${rel}):\n\`\`\`\n${snippet}\n\`\`\``
      }
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
      let systemPrompt = ''
      try {
        systemPrompt = await buildSystemPrompt()
      } catch (e) {
        console.warn('buildSystemPrompt error, using fallback:', e)
        systemPrompt = `You are a coding assistant. Project root: ${rootPath ?? 'unknown'}`
        if (openFile) systemPrompt += `\n\nOpen file: ${openFile}\n${fileContent}`
      }
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

              // Detect completed write blocks during streaming and write immediately
              // Only scan the new portion of text to avoid re-processing old blocks
              const blockRe = /```write:\s*([^\n]+?)\s*\n([\s\S]*?)```/g
              blockRe.lastIndex = processedUpTo
              let m
              while ((m = blockRe.exec(assistantText)) !== null) {
                processedUpTo = m.index + m[0].length
                const filePath = decodeURIComponent(m[1].trim())
                const content = m[2]
                if (!rootPath && !filePath.startsWith('/')) {
                  streamWrites.push({ path: filePath, content, accepted: false, error: 'No workspace folder open' })
                  continue
                }
                const abs = filePath.startsWith('/') ? filePath : joinPath(rootPath!, filePath)
                let prevContent: string | undefined
                try { prevContent = await window.api.readFile(abs) } catch {}
                if (autopilotRef.current) {
                  await window.api.writeFile(abs, content)
                  if (openFile && abs === openFile) onWriteFile(content)
                  onRefreshTree()
                }
                streamWrites.push({ path: abs, content, accepted: autopilotRef.current ? null : null, prevContent })
              }
            }
          } catch {}
        }
      }

      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000)
      console.log('[send] stream done, assistantText length:', assistantText.length)
      // Pick up any blocks that weren't caught during streaming (edge cases)
      const writes = streamWrites.length > 0 ? streamWrites : await processWrites(assistantText)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { ...updated[updated.length - 1], writes, elapsed }
        return updated
      })
    } catch (err) {
      console.error('[send] error:', err)
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${String(err)}` }])
    } finally {
      setLoading(false)
    }
  }

  function joinPath(base: string, rel: string): string {
    return base.replace(/\/$/, '') + '/' + rel.replace(/^\//, '')
  }

  async function processWrites(text: string): Promise<WriteAction[]> {
    const re = /```write:\s*([^\n]+?)\s*\n([\s\S]*?)```/g
    let match
    const actions: WriteAction[] = []
    console.log('[processWrites] text length:', text.length)
    console.log('[processWrites] has write block:', text.includes('```write:'))
    while ((match = re.exec(text)) !== null) {
      const filePath = decodeURIComponent(match[1].trim())
      const content = match[2]
      console.log('[processWrites] found write:', filePath, 'rootPath:', rootPath)
      if (!rootPath && !filePath.startsWith('/')) {
        actions.push({ path: filePath, content, accepted: false, error: 'No workspace folder open' })
        continue
      }
      const abs = filePath.startsWith('/') ? filePath : joinPath(rootPath!, filePath)
      console.log('[processWrites] writing to:', abs)
      let prevContent: string | undefined
      try { prevContent = await window.api.readFile(abs) } catch {}
      if (autopilotRef.current) {
        const ok = await window.api.writeFile(abs, content)
        console.log('[processWrites] writeFile result:', ok)
        if (openFile && abs === openFile) onWriteFile(content)
      }
      actions.push({ path: abs, content, accepted: null, prevContent })
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
          {sessions.map(s => (
            <div key={s.id} className={`session-tab ${s.id === activeId ? 'session-tab--active' : ''}`} onClick={() => setActiveId(s.id)}>
              <span className="session-tab-name">{s.name}</span>
              <button className="session-tab-close" onClick={e => { e.stopPropagation(); closeSession(s.id) }}>×</button>
            </div>
          ))}
        </div>
        <div className="session-actions">
          <button className="session-action-btn" onClick={addSession} title="New Session">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/></svg>
          </button>
          <button className="session-action-btn" onClick={() => setShowHistory(h => !h)} title="History">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-3.5a.5.5 0 0 1 .5.5v3.25l2.5 1.5a.5.5 0 0 1-.5.866L7.75 9.25A.5.5 0 0 1 7.5 8.8V5a.5.5 0 0 1 .5-.5z"/></svg>
          </button>
          <button className="session-action-btn" onClick={clearSession} title="Clear">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3h11V2h-11v1z"/></svg>
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="session-history">
          <div className="session-history-title">Sessions</div>
          {sessions.map(s => (
            <div key={s.id} className={`session-history-item ${s.id === activeId ? 'session-history-item--active' : ''}`} onClick={() => { setActiveId(s.id); setShowHistory(false) }}>
              <span>{s.name}</span>
              <span className="session-history-count">{s.messages.length} msgs</span>
            </div>
          ))}
        </div>
      )}

      <div className="chat-header">
        <span>Agent</span>
        <select value={model} onChange={e => onModelChange(e.target.value)} className="model-select">
          {models.length === 0 ? <option value="">No models found</option> : models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg chat-msg--${m.role}`}>
            <span className="chat-role">{m.role === 'user' ? 'You' : 'Agent'}</span>
            {m.role === 'assistant' ? (
              <>
                <MessageContent content={m.content} writes={m.writes} onAccept={p => handleAccept(i, p)} onRevert={p => handleRevert(i, p)} />
                {m.elapsed !== undefined && (
                  <div className="msg-meta">
                    {m.writes && m.writes.length > 0 && <span className="msg-writes">{m.writes.length} file{m.writes.length > 1 ? 's' : ''} changed</span>}
                    <span className="msg-elapsed">Elapsed: {m.elapsed}s</span>
                  </div>
                )}
              </>
            ) : (
              <pre className="chat-content">{m.content}</pre>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-msg chat-msg--assistant">
            <span className="chat-role">Agent</span>
            <span className="typing">▌</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-toolbar">
        <div className="chat-input-wrap">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={model ? 'Ask a question or describe a task...' : 'Start Ollama first: ollama serve'}
            rows={2}
            disabled={loading}
            className="chat-textarea"
          />
        </div>
        <div className="chat-toolbar-bar">
          <div className="chat-toolbar-left">
            <button className="toolbar-icon-btn" title="Add context (#)" onClick={() => setInput(i => i + '#')}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>#</span>
            </button>
            <button className="toolbar-icon-btn" title="Attach file" onClick={() => fileInputRef.current?.click()}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
              </svg>
            </button>
            <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileAttach} />
            {loading && <span className="toolbar-spinner" />}
          </div>
          <div className="chat-toolbar-right">
            <span className="toolbar-model-label">{model.split(':')[0]}</span>
            <div className="autopilot-toggle">
              <span className="autopilot-label">Autopilot</span>
              <button className={`toggle-btn ${autopilot ? 'toggle-btn--on' : ''}`} onClick={() => { setAutopilot(a => { autopilotRef.current = !a; return !a }) }}>
                <span className="toggle-thumb" />
              </button>
            </div>
            <button className="send-btn" onClick={send} disabled={loading || !input.trim() || !model}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
