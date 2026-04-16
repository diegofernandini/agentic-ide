import React, { useState, useEffect, useRef } from 'react'
import FileTree from './components/FileTree'
import Editor from './components/Editor'
import ChatPanel from './components/ChatPanel'
import TerminalPanel from './components/Terminal'

interface Session {
  id: string
  name: string
  messages: { role: 'user' | 'assistant'; content: string }[]
}

function getBreadcrumbs(path: string): string[] {
  return path.split('/').slice(-3)
}

export interface FileNode {
  name: string
  path: string
  isDir: boolean
  children: FileNode[]
}

declare global {
  interface Window {
    api: {
      openFolder: () => Promise<string | null>
      readDir: (p: string) => Promise<FileNode[]>
      readFile: (p: string) => Promise<string>
      writeFile: (p: string, content: string) => Promise<boolean>
      listFiles: (p: string) => Promise<string[]>
      loadSessions: () => Promise<Session[] | null>
      saveSessions: (data: string) => Promise<void>
    }
  }
}

export default function App() {
  const [rootPath, setRootPath] = useState<string | null>(null)
  const [tree, setTree] = useState<FileNode[]>([])
  const [openDirs, setOpenDirs] = useState<Set<string>>(new Set())
  const [openFile, setOpenFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])

  const [terminalOpen, setTerminalOpen] = useState(true)
  // Navigation history
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  // Quick open
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickQuery, setQuickQuery] = useState('')
  const [allFiles, setAllFiles] = useState<string[]>([])
  const quickRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('http://localhost:11434/api/tags')
      .then(r => r.json())
      .then(data => {
        const names: string[] = (data.models || []).map((m: { name: string }) => m.name)
        setModels(names)
        if (names.length > 0) setModel(names[0])
      })
      .catch(() => {})
  }, [])

  // Cmd+P to open quick open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault()
        setQuickOpen(o => !o)
        setQuickQuery('')
      }
      if (e.key === 'Escape') setQuickOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (quickOpen) setTimeout(() => quickRef.current?.focus(), 50)
  }, [quickOpen])

  async function openFolder() {
    const p = await window.api.openFolder()
    if (!p) return
    setRootPath(p)
    const t = await window.api.readDir(p)
    setTree(t)
    setOpenDirs(new Set())
    const files = await window.api.listFiles(p)
    setAllFiles(files)
  }

  async function selectFile(path: string, fromHistory = false) {
    const content = await window.api.readFile(path)
    setOpenFile(path)
    setFileContent(content)
    setQuickOpen(false)
    if (!fromHistory) {
      setHistory(prev => {
        const trimmed = prev.slice(0, historyIdx + 1)
        const next = [...trimmed, path]
        setHistoryIdx(next.length - 1)
        return next
      })
    }
  }

  function goBack() {
    if (historyIdx > 0) {
      const idx = historyIdx - 1
      setHistoryIdx(idx)
      selectFile(history[idx], true)
    }
  }

  function goForward() {
    if (historyIdx < history.length - 1) {
      const idx = historyIdx + 1
      setHistoryIdx(idx)
      selectFile(history[idx], true)
    }
  }

  async function saveFile(content: string) {
    if (!openFile) return
    await window.api.writeFile(openFile, content)
    setFileContent(content)
  }

  async function refreshTree() {
    if (rootPath) setTree(await window.api.readDir(rootPath))
  }

  function toggleDir(path: string) {
    setOpenDirs(prev => {
      const next = new Set(prev)
      next.has(path) ? next.delete(path) : next.add(path)
      return next
    })
  }

  const filteredFiles = quickQuery
    ? allFiles.filter(f => f.toLowerCase().includes(quickQuery.toLowerCase())).slice(0, 12)
    : allFiles.slice(0, 12)

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-nav">
          <button className="nav-btn" onClick={goBack} disabled={historyIdx <= 0} title="Go Back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11 2L5 8l6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-btn" onClick={goForward} disabled={historyIdx >= history.length - 1} title="Go Forward">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="topbar-center">
          <button className="quick-open-trigger" onClick={() => { setQuickOpen(true); setQuickQuery('') }}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5 }}>
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
            </svg>
            <span className="quick-open-label">
              {openFile ? getBreadcrumbs(openFile).join(' › ') : 'Open file... (⌘P)'}
            </span>
          </button>
        </div>

        <div className="topbar-right">
          <button
            className={`nav-btn${terminalOpen ? ' nav-btn--active' : ''}`}
            onClick={() => setTerminalOpen(o => !o)}
            title="Toggle Terminal"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/>
              <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/>
            </svg>
          </button>
          <span className="topbar-model">{model}</span>
        </div>
      </div>

      {/* Quick open overlay */}
      {quickOpen && (
        <div className="quick-overlay" onClick={() => setQuickOpen(false)}>
          <div className="quick-panel" onClick={e => e.stopPropagation()}>
            <div className="quick-input-wrap">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.5, flexShrink: 0 }}>
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
              </svg>
              <input
                ref={quickRef}
                className="quick-input"
                placeholder="Search files..."
                value={quickQuery}
                onChange={e => setQuickQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && filteredFiles.length > 0) selectFile(filteredFiles[0])
                  if (e.key === 'Escape') setQuickOpen(false)
                }}
              />
            </div>
            <ul className="quick-results">
              {filteredFiles.map(f => {
                const parts = f.split('/')
                const name = parts.pop() || f
                const dir = parts.slice(-2).join('/')
                return (
                  <li key={f} className="quick-result" onClick={() => selectFile(f)}>
                    <span className="qr-name">{name}</span>
                    <span className="qr-dir">{dir}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}

      {/* Main 3-column layout */}
      <div className="main-layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="sidebar-btn" onClick={openFolder}>Open Folder</button>
            {rootPath && <span className="sidebar-root">{rootPath.split('/').pop()}</span>}
          </div>
          <FileTree nodes={tree} onSelect={selectFile} openDirs={openDirs} onToggleDir={toggleDir} />
        </div>
        <div className="center-column">
          <div className="editor-area">
            <Editor
              path={openFile}
              content={fileContent}
              onChange={setFileContent}
              onSave={saveFile}
            />
          </div>
          {terminalOpen && (
            <TerminalPanel cwd={rootPath} />
          )}
        </div>
        <ChatPanel
          model={model}
          models={models}
          onModelChange={setModel}
          rootPath={rootPath}
          openFile={openFile}
          fileContent={fileContent}
          onWriteFile={saveFile}
          onRefreshTree={refreshTree}
        />
      </div>
    </div>
  )
}
