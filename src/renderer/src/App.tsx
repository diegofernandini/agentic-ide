import React, { useState, useEffect, useRef } from 'react'
import FileTree from './components/FileTree'
import Editor from './components/Editor'
import ChatPanel from './components/ChatPanel'
import TerminalPanel from './components/Terminal'
import SourceControl from './components/SourceControl'
import DiffView from './components/DiffView'

interface Session {
  id: string
  name: string
  messages: { role: 'user' | 'assistant'; content: string }[]
}

interface User {
  name: string
  login: string
  avatar: string
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
      getGitStatus: (p: string) => Promise<{ branch: string; ahead: number; behind: number; changes: { status: string; path: string }[] }>
      gitCommit: (p: string, msg: string) => Promise<{ success: boolean; error?: string }>
      gitGetStagedDiff: (p: string) => Promise<string>
      gitGetFileDiff: (p: string, filePath: string) => Promise<{ original: string; current: string; error?: string }>
      gitStage: (p: string, filePath: string) => Promise<{ success: boolean; error?: string }>
      gitUnstage: (p: string, filePath: string) => Promise<{ success: boolean; error?: string }>
      gitPush: (p: string) => Promise<{ success: boolean; error?: string }>
      gitPull: (p: string) => Promise<{ success: boolean; error?: string }>
      gitFetch: (p: string) => Promise<{ success: boolean; error?: string }>
      gitLog: (p: string) => Promise<{ hash: string; message: string }[]>
      githubLogin: () => Promise<boolean>
    }
  }
}

export default function App() {
  const [rootPath, setRootPath] = useState<string | null>(null)
  const [tree, setTree] = useState<FileNode[]>([])
  const [openDirs, setOpenDirs] = useState<Set<string>>(new Set())
  const [openFile, setOpenFile] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState('')
  const [diffInfo, setDiffInfo] = useState<{ filename: string; original: string; current: string } | null>(null)
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])

  const [terminalOpen, setTerminalOpen] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSidebar, setActiveSidebar] = useState<'explorer' | 'git' | 'account'>('explorer')

  // Navigation history
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  // Quick open
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickQuery, setQuickQuery] = useState('')
  const [allFiles, setAllFiles] = useState<string[]>([])
  const quickRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load models
    fetch('http://localhost:11434/api/tags')
      .then(r => r.json())
      .then(data => {
        const names: string[] = (data.models || []).map((m: { name: string }) => m.name)
        setModels(names)
        if (names.length > 0) setModel(names[0])
      })
      .catch(() => {})

    // Load user session
    window.api.loadSessions().then(sessions => {
      if (sessions && (sessions as any).user) {
        setUser((sessions as any).user)
      }
    })
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
    setDiffInfo(null)
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

  async function handleSelectDiff(relPath: string) {
    if (!rootPath) return
    const res = await window.api.gitGetFileDiff(rootPath, relPath)
    setDiffInfo({ filename: relPath, original: res.original, current: res.current })
    setOpenFile(null)
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

  async function handleLogin() {
    setLoginLoading(true)
    try {
      const mockUser = {
        name: 'Diego Fernandini',
        login: 'fernandini2007',
        avatar: 'https://github.com/fernandini2007.png'
      }
      // Simulate real login delay
      await new Promise(r => setTimeout(r, 1500))
      setUser(mockUser)
      // Save user to session
      const existing = await window.api.loadSessions() || {}
      await window.api.saveSessions(JSON.stringify({ ...existing, user: mockUser }))
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleLogout() {
    setUser(null)
    const existing = await window.api.loadSessions() || {}
    delete (existing as any).user
    await window.api.saveSessions(JSON.stringify(existing))
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

      {/* Main 4-column layout */}
      <div className="main-layout" style={{ '--sidebar-width': sidebarOpen ? '220px' : '0px' } as React.CSSProperties}>
        <div className="activity-bar">
          <button 
            className={`activity-btn ${activeSidebar === 'explorer' && sidebarOpen ? 'activity-btn--active' : ''}`}
            onClick={() => {
              if (activeSidebar === 'explorer') setSidebarOpen(!sidebarOpen)
              else { setActiveSidebar('explorer'); setSidebarOpen(true) }
            }}
            title="Explorer"
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8.187 1.01l.445.511L13.19 6.2a.5.5 0 0 1 .127.324V14.5a.5.5 0 0 1-.5.5H3.18a.5.5 0 0 1-.5-.5V6.524a.5.5 0 0 1 .127-.323l4.558-4.678.446-.512a.25.25 0 0 1 .376 0zM3.68 7.037V14h9.133V7.037L8.187 2.25 3.68 7.037z"/>
            </svg>
          </button>
          <button 
            className={`activity-btn ${activeSidebar === 'git' && sidebarOpen ? 'activity-btn--active' : ''}`}
            onClick={() => {
              if (activeSidebar === 'git') setSidebarOpen(!sidebarOpen)
              else { setActiveSidebar('git'); setSidebarOpen(true) }
            }}
            title="Source Control"
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
              <path d="M15.55 8.12l-6.8-6.8a1 1 0 0 0-1.41 0l-.88.88 1.6 1.6a1.5 1.5 0 1 1-1 1l-1.6-1.6-3.8 3.8a1 1 0 0 0 0 1.41l6.8 6.8a1 1 0 0 0 1.41 0l6.8-6.8a1 1 0 0 0 0-1.41zM8.5 11.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1.5-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </button>

          <div className="activity-bar-bottom">
            <button 
              className={`activity-btn ${activeSidebar === 'account' && sidebarOpen ? 'activity-btn--active' : ''}`}
              onClick={() => {
                if (activeSidebar === 'account') setSidebarOpen(!sidebarOpen)
                else { setActiveSidebar('account'); setSidebarOpen(true) }
              }}
              title="Accounts"
            >
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
            </button>
            <button className="activity-btn" title="Settings">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M9.1 1.9L9 0H7l-.1 1.9c-.3.1-.6.2-.9.4L3.3.9l-1.4 1.4 1.4 1.7c-.2.3-.3.6-.4.9L1 5v2l1.9.1c.1.3.2.6.4.9l-1.4 1.7 1.4 1.4 1.7-1.4c.3.2.6.3.9.4L7 12h2l.1-1.9c.3-.1.6-.2.9-.4l1.7 1.4 1.4-1.4-1.4-1.7c.2-.3.3-.6.4-.9l1.9-.1V5l-1.9-.1c-.1-.3-.2-.6-.4-.9l1.4-1.7-1.4-1.4-1.7 1.4c-.3-.2-.6-.3-.9-.4zM8 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar" style={{ display: sidebarOpen ? 'flex' : 'none' }}>
          {activeSidebar === 'explorer' ? (
            <>
              <div className="sidebar-header">
                <button className="sidebar-btn" onClick={openFolder}>Open Folder</button>
                {rootPath && <span className="sidebar-root">{rootPath.split('/').pop()}</span>}
              </div>
              <FileTree nodes={tree} onSelect={selectFile} openDirs={openDirs} onToggleDir={toggleDir} />
            </>
          ) : activeSidebar === 'git' ? (
            <SourceControl 
              rootPath={rootPath} 
              model={model} 
              onSelectFile={selectFile} 
              onSelectDiff={handleSelectDiff} 
            />
          ) : (
            <div className="account-view">
              <h2>Account</h2>
              {!user ? (
                <>
                  <div className="account-info">
                    Sign in to your GitHub account to access your repositories and sync your settings.
                  </div>
                  <button 
                    className="github-login-btn" 
                    onClick={handleLogin}
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <div className="toolbar-spinner" />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                      </svg>
                    )}
                    {loginLoading ? 'Signing in...' : 'Sign in with GitHub'}
                  </button>
                </>
              ) : (
                <div className="user-profile">
                  <div className="profile-card">
                    <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                    <div className="profile-details">
                      <span className="profile-name">{user.name}</span>
                      <span className="profile-login">@{user.login}</span>
                    </div>
                  </div>
                  
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-value">12</span>
                      <span className="stat-label">Repos</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">158</span>
                      <span className="stat-label">Stars</span>
                    </div>
                  </div>

                  <div className="profile-actions">
                    <button className="profile-btn profile-btn--primary">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V7H3.5a.5.5 0 0 0 0 1H7v3.5a.5.5 0 0 0 1 0V8h3.5a.5.5 0 0 0 0-1H8V3.5z"/>
                      </svg>
                      Sync Settings
                    </button>
                    <button className="profile-btn" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="center-column">
          <div className="editor-area">
            {diffInfo ? (
              <DiffView 
                filename={diffInfo.filename} 
                original={diffInfo.original} 
                current={diffInfo.current} 
              />
            ) : (
              <Editor
                path={openFile}
                content={fileContent}
                onChange={setFileContent}
                onSave={saveFile}
              />
            )}
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
