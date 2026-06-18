import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  ChevronLeft, ChevronRight, Search, TerminalSquare,
  Files, GitBranch, User, LayoutDashboard, Settings2,
  Plus, X, ArrowLeftRight, RefreshCw, LogOut,
  FileCode, FileText, FileImage, FileKey, File
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
  token?: string
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
      saveDialog: (defaultPath: string, content: string) => Promise<string | null>
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
      gitIsRepo: (p: string) => Promise<boolean>
      gitInit: (p: string) => Promise<{ success: boolean; error?: string }>
      gitRemoteAdd: (p: string, name: string, url: string) => Promise<{ success: boolean; error?: string }>
      gitGetRemote: (p: string) => Promise<string | null>
      gitPushUpstream: (p: string, branch: string) => Promise<{ success: boolean; error?: string }>
      githubCreateRepo: (token: string, name: string, isPrivate: boolean, desc: string) => Promise<{ success: boolean; cloneUrl?: string; error?: string }>
      onFileChanged: (cb: (data: { event: string; path: string }) => void) => void
      offFileChanged: () => void
      ollamaTags: () => Promise<string[]>
      ollamaChat: (payload: object) => Promise<string>
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

  // Wrapper to avoid re-applying identical sessions objects and causing update loops
  const handleSessionsChange = useCallback((next: Session[]) => {
    try {
      // Strip ephemeral metadata (like lastActive) before comparing
      const normalize = (s: Session) => {
        const { lastActive, ...rest } = s as any
        return rest
      }
      const normalized = next.map(normalize)
      const json = JSON.stringify(normalized)
      if ((App as any)._lastSessionsJson !== json) {
        setSessions(next)
        ;(App as any)._lastSessionsJson = json
      }
    } catch (e) {
      setSessions(next)
    }
  }, [])

  const handleActiveIdChange = useCallback((id: string) => {
    if (!id) return
    setActiveId(prev => prev === id ? prev : id)
  }, [])

  const [terminalOpen, setTerminalOpen] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginToken, setLoginToken] = useState('')
  const [loginError, setLoginError] = useState('')

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
    // Try fetching models directly; fall back to IPC proxy if that fails
    // (IPC proxy is needed when webSecurity blocks localhost from file:// context)
    const loadModels = async () => {
      try {
        const r = await fetch('http://127.0.0.1:11434/api/tags')
        if (!r.ok) throw new Error('bad status')
        const data = await r.json()
        const names: string[] = (data.models || []).map((m: { name: string }) => m.name)
        if (names.length > 0) {
          setModels(names)
          setModel(names[0])
          return
        }
      } catch {}
      // Fallback: go through main process
      try {
        const names = await window.api.ollamaTags()
        setModels(names)
        if (names.length > 0) setModel(names[0])
      } catch {}
    }
    loadModels()

    // Load saved sessions and optional user info
    window.api.loadSessions().then(data => {
      try {
        if (!data) return
        if ((data as any).user) setUser((data as any).user)
        if (Array.isArray(data)) {
          setSessions(data as any)
          if ((data as any).length > 0) setActiveId((data as any)[0].id)
        } else if ((data as any).sessions && Array.isArray((data as any).sessions)) {
          setSessions((data as any).sessions)
          if ((data as any).sessions.length > 0) setActiveId((data as any).sessions[0].id)
        }
      } catch (e) {}
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

        // Only restore state for sessions that have previously saved state.
        // A brand-new session has no tabs and no openFile — don't clobber the
        // current editor state with empty values in that case.
        const savedTabs = activeSession.tabs;
        const savedOpenFile = activeSession.openFile;
        const savedWorkspace = activeSession.workspace || null;
        const hasPersistedState = savedTabs !== undefined || savedOpenFile !== undefined;

        if (!hasPersistedState) {
          // New session: just switch workspace if it differs, leave editor as-is.
          if (savedWorkspace && savedWorkspace !== rootPath) {
            setRootPath(savedWorkspace);
            window.api.readDir(savedWorkspace).then(t => setTree(t)).catch(console.error);
            setOpenDirs(new Set());
            window.api.listFiles(savedWorkspace).then(files => setAllFiles(files)).catch(console.error);
          }
          return;
        }

        const resolvedTabs = savedTabs || [];
        const resolvedOpenFile = savedOpenFile || null;

        if (savedWorkspace && savedWorkspace !== rootPath) {
          setRootPath(savedWorkspace);
          window.api.readDir(savedWorkspace).then(t => setTree(t)).catch(console.error);
          setOpenDirs(new Set());
          window.api.listFiles(savedWorkspace).then(files => setAllFiles(files)).catch(console.error);
        }

        if (JSON.stringify(tabs) !== JSON.stringify(resolvedTabs)) {
          setTabs(resolvedTabs);
        }
        if (openFile !== resolvedOpenFile) {
          setOpenFile(resolvedOpenFile);
          if (resolvedOpenFile) {
            window.api.readFile(resolvedOpenFile).then(content => {
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

  const selectFile = useCallback(async (path: string, fromHistory = false) => {
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
  }, [tabs, historyIdx])

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

  const refreshTree = useCallback(async () => {
    if (rootPath) setTree(await window.api.readDir(rootPath))
  }, [rootPath])

  const saveFileAs = useCallback(async (content: string) => {
    const defaultPath = rootPath ? rootPath + '/untitled' : 'untitled'
    const savedPath = await window.api.saveDialog(defaultPath, content)
    if (!savedPath) return
    // Open the newly saved file as a tab
    if (!tabs.includes(savedPath)) {
      setTabs(prev => [...prev, savedPath])
    }
    setOpenFile(savedPath)
    setFileContent(content)
    setDirtyTabs(prev => {
      const next = new Set(prev)
      next.delete(savedPath)
      return next
    })
    await refreshTree()
  }, [rootPath, tabs, refreshTree])

  const saveFile = useCallback(async (content: string) => {
    if (!openFile) {
      // No path yet — open Save As dialog
      await saveFileAs(content)
      return
    }
    await window.api.writeFile(openFile, content)
    setFileContent(content)
    setDirtyTabs(prev => {
      const next = new Set(prev)
      next.delete(openFile)
      return next
    })
  }, [openFile, saveFileAs])

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
    setLoginError('')
    const name = loginName.trim()
    const username = loginUsername.trim()
    const token = loginToken.trim()
    if (!name) { setLoginError('Please enter a display name.'); return }
    if (!username) { setLoginError('Please enter a GitHub username.'); return }
    if (!token) { setLoginError('Please enter a GitHub Personal Access Token.'); return }
    setLoginLoading(true)
    try {
      const newUser: User = {
        name,
        login: username,
        avatar: `https://github.com/${encodeURIComponent(username)}.png`,
        token
      }
      await new Promise(r => setTimeout(r, 400))
      setUser(newUser)
      setShowLoginForm(false)
      setLoginName('')
      setLoginUsername('')
      setLoginToken('')
      // Save user (omit token from disk for security — keep only in memory)
      const userToSave = { name: newUser.name, login: newUser.login, avatar: newUser.avatar }
      const existing = await window.api.loadSessions() || {}
      await window.api.saveSessions(JSON.stringify({ ...existing, user: userToSave }))
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

  const handleOpenFile = useCallback((path: string) => selectFile(path, true), [selectFile])

  const handleOpenDiff = useCallback((filename: string, original: string, current: string) => {
    setDiffInfo({ filename, original, current })
    setOpenFile(null)
  }, [])

  const filteredFiles = quickQuery
    ? allFiles.filter(f => f.toLowerCase().includes(quickQuery.toLowerCase())).slice(0, 12)
    : allFiles.slice(0, 12)

  function getFileIcon(filePath: string) {
    const ext = filePath.split('.').pop()?.toLowerCase() ?? ''
    const colors: Record<string, string> = {
      ts: '#3178c6', tsx: '#61dafb', js: '#f1e05a', jsx: '#61dafb',
      json: '#cbcb41', md: '#b0bec5', css: '#a06ccd', html: '#e34c26',
      py: '#4b8bbe',  rs: '#dea584', go: '#00ADD8', sh: '#89e051',
      svg: '#ffb13b', png: '#90a4ae', jpg: '#90a4ae', gif: '#90a4ae',
      lock: '#777',   yml: '#cbcb41', yaml: '#cbcb41', env: '#aaa',
      toml: '#9c4221', sql: '#e38d40', graphql: '#e535ab',
    }
    const color = colors[ext] ?? '#9cdcfe'

    let IconComponent = File
    if (['ts', 'tsx', 'js', 'jsx', 'json', 'py', 'rs', 'go', 'sh', 'html', 'css', 'yml', 'yaml', 'toml', 'sql', 'graphql'].includes(ext)) {
      IconComponent = FileCode
    } else if (['md', 'txt', 'log', 'env'].includes(ext)) {
      IconComponent = FileText
    } else if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'].includes(ext)) {
      IconComponent = FileImage
    } else if (['lock', 'key'].includes(ext)) {
      IconComponent = FileKey
    }

    return (
      <IconComponent 
        size={14} 
        strokeWidth={1.8} 
        style={{ color, display: 'block' }} 
      />
    )
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
            data-tooltip="Explorer"
            data-tooltip-position="right"
          >
            <Files size={22} strokeWidth={1.6} />
          </button>
          <button 
            className={`activity-btn ${activeSidebar === 'git' && sidebarOpen ? 'activity-btn--active' : ''}`}
            onClick={() => {
              if (activeSidebar === 'git') setSidebarOpen(!sidebarOpen)
              else { setActiveSidebar('git'); setSidebarOpen(true) }
            }}
            data-tooltip="Source Control"
            data-tooltip-position="right"
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
              data-tooltip="Accounts"
              data-tooltip-position="right"
            >
              <User size={22} strokeWidth={1.6} />
            </button>
            <button 
              className={`activity-btn ${activeSidebar === 'dashboard' ? 'activity-btn--active' : ''}`}
              onClick={() => setActiveSidebar('dashboard')}
              data-tooltip="Dashboard"
              data-tooltip-position="right"
            >
              <LayoutDashboard size={22} strokeWidth={1.6} />
            </button>
            <button 
              className="activity-btn" 
              data-tooltip="Settings"
              data-tooltip-position="right"
            >
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
              user={user}
            />
          ) : (
            <div className="account-view">
              <h2>Account</h2>
              {!user ? (
                <>
                  <div className="account-info">
                    Sign in with any account to sync your settings and workspace.
                  </div>
                  {!showLoginForm ? (
                    <button
                      className="github-login-btn"
                      onClick={() => { setShowLoginForm(true); setLoginError('') }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                      Sign In
                    </button>
                  ) : (
                    <div className="login-form">
                      <div className="login-field">
                        <label className="login-label">Display Name</label>
                        <input
                          className="login-input"
                          type="text"
                          placeholder="e.g. John Doe"
                          value={loginName}
                          onChange={e => setLoginName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleLogin()}
                          autoFocus
                        />
                      </div>
                      <div className="login-field">
                        <label className="login-label">GitHub Username</label>
                        <input
                          className="login-input"
                          type="text"
                          placeholder="e.g. octocat"
                          value={loginUsername}
                          onChange={e => setLoginUsername(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        />
                        <span className="login-hint">Your avatar will be fetched automatically.</span>
                      </div>
                      <div className="login-field">
                        <label className="login-label">Personal Access Token</label>
                        <input
                          className="login-input"
                          type="password"
                          placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                          value={loginToken}
                          onChange={e => setLoginToken(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        />
                        <span className="login-hint">
                          Needs <code>repo</code> scope.{' '}
                          <a href="https://github.com/settings/tokens/new" target="_blank" rel="noreferrer" className="login-link">
                            Create token →
                          </a>
                        </span>
                      </div>
                      {loginError && <div className="login-error">{loginError}</div>}
                      <div className="login-actions">
                        <button
                          className="github-login-btn"
                          onClick={handleLogin}
                          disabled={loginLoading}
                        >
                          {loginLoading ? <div className="toolbar-spinner" /> : null}
                          {loginLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                        <button
                          className="profile-btn"
                          onClick={() => { setShowLoginForm(false); setLoginError('') }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
                      <span className="stat-value" style={{ fontSize: 12, color: user.token ? '#4ec9b0' : '#f48771' }}>
                        {user.token ? '✓ Active' : '✗ None'}
                      </span>
                      <span className="stat-label">Token</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">@{user.login}</span>
                      <span className="stat-label">GitHub</span>
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
                onSaveAs={saveFileAs}
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
          onOpenFile={handleOpenFile}
          onOpenDiff={handleOpenDiff}
          onSessionsChange={handleSessionsChange}
          activeId={activeId}
          onActiveIdChange={handleActiveIdChange}
          openFiles={tabs}
          activeFile={openFile}
        />
      </div>
    </div>
  )
}
