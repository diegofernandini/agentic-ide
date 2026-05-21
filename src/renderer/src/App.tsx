import React, { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft, ChevronRight, Search, TerminalSquare,
  Files, GitBranch, User, LayoutDashboard, Settings2,
  Plus, X, ArrowLeftRight, RefreshCw, LogOut
} from 'lucide-react'
import FileTree from './components/FileTree'
import Editor from './components/Editor'
import ChatPanel from './components/ChatPanel'
import TerminalPanel from './components/Terminal'
import SourceControl from './components/SourceControl'
import DiffView from './components/DiffView'
import Dashboard from './components/Dashboard'

interface Message {
  role: 'user' | 'assistant'
  content: string
  writes?: any[]
  elapsed?: number
  promptTokens?: number
  responseTokens?: number
  model?: string
}

interface Session {
  id: string
  name: string
  messages: Message[]
  mode?: 'agent' | 'plan' | 'debug' | 'multitask' | 'ask'
  createdAt?: number
  lastActive?: number
  isDeleted?: boolean
  workspace?: string | null
  tabs?: string[]
  openFile?: string | null
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
      deleteFile: (p: string) => Promise<boolean>
      renameFile: (oldP: string, newP: string) => Promise<boolean>
      showContextMenu: (p: string, isDir: boolean) => Promise<string | null>
      loadSessions: () => Promise<Session[] | null>
      saveSessions: (data: string) => Promise<void>
      getHistoricalSessions: () => Promise<Session[]>
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
      onFileChanged: (cb: (data: { event: string; path: string }) => void) => void
      offFileChanged: () => void
    }
  }
}

export default function App() {
  const [rootPath, setRootPath] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [tree, setTree] = useState<FileNode[]>([])
  const [openDirs, setOpenDirs] = useState<Set<string>>(new Set())
  const [openFile, setOpenFile] = useState<string | null>(null)
  const [tabs, setTabs] = useState<string[]>([])
  const [dirtyTabs, setDirtyTabs] = useState<Set<string>>(new Set())
  const [fileContent, setFileContent] = useState('')
  const [diffInfo, setDiffInfo] = useState<{ filename: string; original: string; current: string } | null>(null)
  const [model, setModel] = useState('')
  const [models, setModels] = useState<string[]>([])

  const [terminalOpen, setTerminalOpen] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSidebar, setActiveSidebar] = useState<'explorer' | 'git' | 'account' | 'dashboard'>('explorer')

  // Navigation history
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  // Quick open
  const [quickOpen, setQuickOpen] = useState(false)
  const [quickQuery, setQuickQuery] = useState('')
  const [allFiles, setAllFiles] = useState<string[]>([])
  const quickRef = useRef<HTMLInputElement>(null)
  const lastRestoredSessionIdRef = useRef<string>('')

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

  useEffect(() => {
    if (rootPath) {
      window.api.onFileChanged(() => {
        refreshTree()
      })
    }
    return () => {
      window.api.offFileChanged()
    }
  }, [rootPath])

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

  useEffect(() => {
    if (activeId && sessions.length > 0) {
      if (lastRestoredSessionIdRef.current === activeId) {
        return;
      }
      const activeSession = sessions.find(s => s.id === activeId);
      if (activeSession) {
        lastRestoredSessionIdRef.current = activeId;
        const savedTabs = activeSession.tabs || [];
        const savedOpenFile = activeSession.openFile || null;
        const savedWorkspace = activeSession.workspace || null;
        
        if (savedWorkspace && savedWorkspace !== rootPath) {
          setRootPath(savedWorkspace);
          window.api.readDir(savedWorkspace).then(t => setTree(t)).catch(console.error);
          setOpenDirs(new Set());
          window.api.listFiles(savedWorkspace).then(files => setAllFiles(files)).catch(console.error);
        }

        if (JSON.stringify(tabs) !== JSON.stringify(savedTabs)) {
          setTabs(savedTabs);
        }
        if (openFile !== savedOpenFile) {
          setOpenFile(savedOpenFile);
          if (savedOpenFile) {
            window.api.readFile(savedOpenFile).then(content => {
              setFileContent(content);
            }).catch(() => {
              setFileContent('');
            });
          } else {
            setFileContent('');
          }
        }
      }
    }
  }, [activeId, sessions]);

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
    if (!tabs.includes(path)) {
      setTabs(prev => [...prev, path])
    }
    
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

  function closeTab(path: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation()
    
    if (dirtyTabs.has(path)) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to close this tab?')) {
        return
      }
    }

    const newTabs = tabs.filter(t => t !== path)
    setTabs(newTabs)
    setDirtyTabs(prev => {
      const next = new Set(prev)
      next.delete(path)
      return next
    })
    
    if (openFile === path) {
      if (newTabs.length > 0) {
        selectFile(newTabs[newTabs.length - 1], true)
      } else {
        setOpenFile(null)
        setFileContent('')
      }
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
    setDirtyTabs(prev => {
      const next = new Set(prev)
      next.delete(openFile)
      return next
    })
  }

  async function refreshTree() {
    if (rootPath) setTree(await window.api.readDir(rootPath))
  }

  async function handleContextMenu(path: string, isDir: boolean) {
    const action = await window.api.showContextMenu(path, isDir)
    if (!action) return
    
    if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${path.split('/').pop()}?`)) {
        await window.api.deleteFile(path)
        refreshTree()
      }
    } else if (action === 'rename') {
      const newName = window.prompt('Enter new name:', path.split('/').pop())
      if (newName) {
        const newPath = path.substring(0, path.lastIndexOf('/')) + '/' + newName
        await window.api.renameFile(path, newPath)
        refreshTree()
      }
    } else if (action === 'new-file') {
      const newName = window.prompt('Enter file name:')
      if (newName) {
        await window.api.writeFile(path + '/' + newName, '')
        refreshTree()
      }
    } else if (action === 'new-folder') {
      const newName = window.prompt('Enter folder name:')
      if (newName) {
        // Create an empty file to force directory creation
        await window.api.writeFile(path + '/' + newName + '/.gitkeep', '')
        refreshTree()
      }
    }
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

  function getFileIcon(filePath: string) {
    const ext = filePath.split('.').pop()?.toLowerCase() ?? ''
    const icons: Record<string, string> = {
      ts: '󰛦', tsx: '󰜈', js: '󰌞', jsx: '󰜈',
      json: '󰘦', md: '󰍔', css: '󰌜', html: '󰌝',
      py: '󰌠', rs: '󱘗', go: '󰟓', sh: '󰆍',
      svg: '󰜡', png: '󰋩', jpg: '󰋩', gif: '󰋩',
      lock: '󰌾', yml: '󰬴', yaml: '󰬴', env: '󰒓',
    }
    return <span style={{ fontFamily: 'monospace', fontSize: '11px', opacity: 0.7 }}>{icons[ext] ?? '󰈙'}</span>
  }

  return (
    <div className="app">
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-nav">
          <button className="nav-btn" onClick={goBack} disabled={historyIdx <= 0} title="Go Back">
            <ChevronLeft size={16} strokeWidth={1.8} />
          </button>
          <button className="nav-btn" onClick={goForward} disabled={historyIdx >= history.length - 1} title="Go Forward">
            <ChevronRight size={16} strokeWidth={1.8} />
          </button>
        </div>

        <div className="topbar-center">
          <button className="quick-open-trigger" onClick={() => { setQuickOpen(true); setQuickQuery('') }}>
            <Search size={13} strokeWidth={1.8} style={{ opacity: 0.5, flexShrink: 0 }} />
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
            <TerminalSquare size={16} strokeWidth={1.8} />
          </button>
          <span className="topbar-model">{model}</span>
        </div>
      </div>

      {/* Quick open overlay */}
      {quickOpen && (
        <div className="quick-overlay" onClick={() => setQuickOpen(false)}>
          <div className="quick-panel" onClick={e => e.stopPropagation()}>
            <div className="quick-input-wrap">
              <Search size={14} strokeWidth={1.8} style={{ opacity: 0.5, flexShrink: 0 }} />
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
      <div 
        className="main-layout" 
        style={{ 
          gridTemplateColumns: (sidebarOpen && activeSidebar !== 'dashboard') ? '48px 220px 1fr 400px' : '48px 1fr 400px' 
        } as React.CSSProperties}
      >
        <div className="activity-bar">
          <button 
            className={`activity-btn ${activeSidebar === 'explorer' && sidebarOpen ? 'activity-btn--active' : ''}`}
            onClick={() => {
              if (activeSidebar === 'explorer') setSidebarOpen(!sidebarOpen)
              else { setActiveSidebar('explorer'); setSidebarOpen(true) }
            }}
            title="Explorer"
          >
            <Files size={22} strokeWidth={1.6} />
          </button>
          <button 
            className={`activity-btn ${activeSidebar === 'git' && sidebarOpen ? 'activity-btn--active' : ''}`}
            onClick={() => {
              if (activeSidebar === 'git') setSidebarOpen(!sidebarOpen)
              else { setActiveSidebar('git'); setSidebarOpen(true) }
            }}
            title="Source Control"
          >
            <GitBranch size={22} strokeWidth={1.6} />
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
              <User size={22} strokeWidth={1.6} />
            </button>
            <button 
              className={`activity-btn ${activeSidebar === 'dashboard' ? 'activity-btn--active' : ''}`}
              onClick={() => setActiveSidebar('dashboard')}
              title="Dashboard"
            >
              <LayoutDashboard size={22} strokeWidth={1.6} />
            </button>
            <button className="activity-btn" title="Settings">
              <Settings2 size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <div className="sidebar" style={{ display: (sidebarOpen && activeSidebar !== 'dashboard') ? 'flex' : 'none' }}>
          {activeSidebar === 'explorer' ? (
            <>
              <div className="sidebar-header">
                <button className="sidebar-btn" onClick={openFolder}>Open Folder</button>
                {rootPath && <span className="sidebar-root">{rootPath.split('/').pop()}</span>}
              </div>
              <FileTree nodes={tree} onSelect={selectFile} openDirs={openDirs} onToggleDir={toggleDir} onContextMenu={handleContextMenu} />
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
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
                      <RefreshCw size={13} strokeWidth={2} />
                      Sync Settings
                    </button>
                    <button className="profile-btn" onClick={handleLogout}>
                      <LogOut size={13} strokeWidth={2} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="center-column">
          {activeSidebar === 'dashboard' ? (
            <Dashboard models={models} sessions={sessions} rootPath={rootPath} />
          ) : (
            <>
              <div className="tab-container">
            {tabs.map(t => (
              <div 
                key={t} 
                className={`tab ${openFile === t ? 'tab--active' : ''}`}
                onClick={() => selectFile(t, true)}
              >
                <span className="tab-icon">{getFileIcon(t)}</span>
                <span className="tab-label">{t.split(/[\\/]/).pop()}</span>
                {dirtyTabs.has(t) && <span className="tab-dirty">●</span>}
                <button className="tab-close" onClick={(e) => closeTab(t, e)}>
                  <X size={10} strokeWidth={2.5} />
                </button>
              </div>
            ))}
            {diffInfo && (
              <div className="tab tab--active tab--diff">
                <span className="tab-icon"><ArrowLeftRight size={12} strokeWidth={2} /></span>
                <span className="tab-label">{diffInfo.filename} (Diff)</span>
                <button className="tab-close" onClick={() => setDiffInfo(null)}>
                  <X size={10} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
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
                onChange={(val) => {
                  setFileContent(val)
                  if (openFile) {
                    setDirtyTabs(prev => new Set(prev).add(openFile))
                  }
                }}
                onSave={saveFile}
                sessions={sessions}
                onRestoreSession={setActiveId}
                onOpenFolder={openFolder}
              />
            )}
          </div>
          {terminalOpen && activeSidebar !== 'dashboard' && (
            <TerminalPanel key={rootPath || 'empty'} cwd={rootPath} />
          )}
            </>
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
          onOpenFile={(path) => selectFile(path, true)}
          onSessionsChange={setSessions}
          activeId={activeId}
          onActiveIdChange={setActiveId}
          openFiles={tabs}
          activeFile={openFile}
        />
      </div>
    </div>
  )
}
