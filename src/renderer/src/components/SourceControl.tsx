import React, { useEffect, useState, useCallback } from 'react'

interface GitChange {
  status: string
  path: string
}

interface GitInfo {
  branch: string
  ahead: number
  behind: number
  changes: GitChange[]
}

interface Commit {
  hash: string
  message: string
}

interface User {
  name: string
  login: string
  avatar: string
  token?: string
}

interface Props {
  rootPath: string | null
  model: string
  onSelectFile: (path: string) => void
  onSelectDiff: (path: string) => void
  user?: User | null
}

// ── tiny modal ──────────────────────────────────────────────────────────────
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="sc-modal-overlay" onClick={onClose}>
      <div className="sc-modal" onClick={e => e.stopPropagation()}>
        <div className="sc-modal-header">
          <span className="sc-modal-title">{title}</span>
          <button className="sc-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="sc-modal-body">{children}</div>
      </div>
    </div>
  )
}

const FileIcon = ({ path }: { path: string }) => {
  const ext = path.split('.').pop()?.toLowerCase()
  if (ext === 'js') return <span className="sc-file-icon sc-file-icon--js">JS</span>
  if (ext === 'ts') return <span className="sc-file-icon sc-file-icon--ts">TS</span>
  if (ext === 'tsx' || ext === 'jsx') return <span className="sc-file-icon sc-file-icon--react">⚛</span>
  if (ext === 'css') return <span className="sc-file-icon sc-file-icon--css">CSS</span>
  return <span className="sc-file-icon">{}</span>
}

export default function SourceControl({ rootPath, model, onSelectFile, onSelectDiff, user }: Props) {
  const [gitInfo, setGitInfo] = useState<GitInfo>({ branch: '', ahead: 0, behind: 0, changes: [] })
  const [history, setHistory] = useState<Commit[]>([])
  const [loading, setLoading] = useState(false)
  const [genLoading, setGenLoading] = useState(false)
  const [commitMsg, setCommitMsg] = useState('')
  const [isChangesExpanded, setIsChangesExpanded] = useState(true)
  const [isStagedExpanded, setIsStagedExpanded] = useState(true)
  const [isGraphExpanded, setIsGraphExpanded] = useState(true)
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [remoteUrl, setRemoteUrl] = useState<string | null>(null)
  const [isGitRepo, setIsGitRepo] = useState(true)

  // Publish modal state
  const [showPublish, setShowPublish] = useState(false)
  const [publishName, setPublishName] = useState('')
  const [publishDesc, setPublishDesc] = useState('')
  const [publishPrivate, setPublishPrivate] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')

  const flash = (text: string, ok = true) => {
    setStatusMsg({ text, ok })
    setTimeout(() => setStatusMsg(null), 4000)
  }

  const refreshGit = useCallback(async () => {
    if (!rootPath) return
    setLoading(true)
    try {
      // Use the dedicated check — most reliable way to detect a git repo
      const isRepo = await window.api.gitIsRepo(rootPath)
      if (!isRepo) {
        setIsGitRepo(false)
        setLoading(false)
        return
      }
      setIsGitRepo(true)
      // Fetch status, log, remote in parallel; each is individually guarded
      const [info, log, remote] = await Promise.all([
        window.api.getGitStatus(rootPath).catch(() => ({ branch: 'main', ahead: 0, behind: 0, changes: [] })),
        window.api.gitLog(rootPath).catch(() => [] as { hash: string; message: string }[]),
        window.api.gitGetRemote(rootPath).catch(() => null),
      ])
      setGitInfo({ ...info, branch: info.branch || 'main' })
      setHistory(log)
      setRemoteUrl(remote)
    } catch {
      setIsGitRepo(false)
    } finally {
      setLoading(false)
    }
  }, [rootPath])

  useEffect(() => {
    refreshGit()
    const interval = setInterval(refreshGit, 30000)
    return () => clearInterval(interval)
  }, [refreshGit])

  // ── Init repo locally ────────────────────────────────────────────────────
  const handleInit = async () => {
    if (!rootPath) return
    setLoading(true)
    try {
      const res = await window.api.gitInit(rootPath)
      if (res.success) {
        flash('Repository initialized on main branch')
        await refreshGit()
      } else {
        flash('Init failed: ' + res.error, false)
      }
    } catch (e: any) {
      flash('Init error: ' + (e?.message || 'unknown'), false)
    } finally {
      setLoading(false)
    }
  }

  // ── Open publish modal ───────────────────────────────────────────────────
  const openPublish = () => {
    if (!user?.token) {
      flash('Sign in with a GitHub token first (Account panel)', false)
      return
    }
    setPublishName(rootPath?.split(/[\\/]/).pop() || '')
    setPublishDesc('')
    setPublishPrivate(false)
    setPublishError('')
    setShowPublish(true)
  }

  // ── Create GitHub repo + set remote + push ───────────────────────────────
  const handlePublish = async () => {
    if (!rootPath || !user?.token) return
    setPublishing(true)
    setPublishError('')
    try {
      // 1. Create GitHub repo
      const created = await window.api.githubCreateRepo(user.token, publishName, publishPrivate, publishDesc)
      if (!created.success || !created.cloneUrl) {
        setPublishError(created.error || 'Failed to create repository on GitHub')
        return
      }
      // 2. Set remote origin (inject token for seamless authentication)
      const authUrl = created.cloneUrl.replace('https://', `https://${encodeURIComponent(user.token)}@`)
      await window.api.gitRemoteAdd(rootPath, 'origin', authUrl)
      // 3. Stage all and commit if no commits yet
      if (history.length === 0) {
        await window.api.gitStage(rootPath, '.')
        await window.api.gitCommit(rootPath, 'Initial commit')
      }
      // 4. Push with upstream
      const pushed = await window.api.gitPushUpstream(rootPath, gitInfo.branch || 'main')
      if (!pushed.success) {
        setPublishError('Repo created but push failed: ' + pushed.error)
        return
      }
      setShowPublish(false)
      flash(`Published to github.com/${user.login}/${publishName}`)
      refreshGit()
    } finally {
      setPublishing(false)
    }
  }

  // ── Commit ───────────────────────────────────────────────────────────────
  const handleCommit = async () => {
    if (!rootPath || !commitMsg.trim()) return
    const stagedCount = gitInfo.changes.filter(c => c.status[0] !== ' ' && c.status[0] !== '?').length
    if (stagedCount === 0) { flash('No staged changes to commit', false); return }
    setLoading(true)
    const res = await window.api.gitCommit(rootPath, commitMsg)
    if (res.success) { setCommitMsg(''); refreshGit(); flash('Committed successfully') }
    else flash('Commit failed: ' + res.error, false)
    setLoading(false)
  }

  // ── AI commit message ────────────────────────────────────────────────────
  const handleGenerateMessage = async () => {
    if (!rootPath || !model) return
    const diff = await window.api.gitGetStagedDiff(rootPath)
    if (!diff.trim()) { flash('Stage some changes first', false); return }
    setGenLoading(true)
    try {
      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model, stream: false,
          prompt: `Generate a concise git commit message (Conventional Commits) for:\n${diff.slice(0, 4000)}`,
          system: 'Return ONLY the commit message. No quotes, no prefix.'
        })
      })
      if (!res.ok) throw new Error('AI service unavailable')
      const data = await res.json()
      setCommitMsg(data.response.trim().replace(/^[\"']|[\"']$/g, ''))
    } catch {
      flash('AI unavailable — is Ollama running?', false)
    } finally {
      setGenLoading(false)
    }
  }

  const handleStage   = async (path: string) => { if (!rootPath) return; await window.api.gitStage(rootPath, path);   refreshGit() }
  const handleUnstage = async (path: string) => { if (!rootPath) return; await window.api.gitUnstage(rootPath, path); refreshGit() }

  // ── Push — smart: set upstream if no remote configured ───────────────────
  const handlePush = async () => {
    if (!rootPath) return
    setLoading(true)
    // First try a normal push
    const res = await window.api.gitPush(rootPath)
    if (res.success) { refreshGit(); flash('Pushed successfully'); setLoading(false); return }

    // No remote configured → offer to publish
    if (res.error?.includes('No configured push destination') || res.error?.includes('no upstream')) {
      setLoading(false)
      openPublish()
      return
    }
    // Try with upstream flag
    const res2 = await window.api.gitPushUpstream(rootPath, gitInfo.branch || 'main')
    if (res2.success) { refreshGit(); flash('Pushed and set upstream'); }
    else flash('Push failed: ' + res2.error, false)
    setLoading(false)
  }

  // ── Pull ─────────────────────────────────────────────────────────────────
  const handlePull = async () => {
    if (!rootPath) return
    if (!remoteUrl) { flash('No remote configured. Publish the project first.', false); return }
    setLoading(true)
    const res = await window.api.gitPull(rootPath)
    if (res.success) { refreshGit(); flash('Pulled successfully') }
    else flash('Pull failed: ' + res.error, false)
    setLoading(false)
  }

  const stagedChanges   = gitInfo.changes.filter(c => c.status[0] !== ' ' && c.status[0] !== '?')
  const unstagedChanges = gitInfo.changes.filter(c => c.status[1] !== ' ' || c.status === '??')

  // ── No folder open ────────────────────────────────────────────────────────
  if (!rootPath) {
    return (
      <div className="source-control-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>Open a folder to see source control</span>
      </div>
    )
  }

  // ── Not a git repo ────────────────────────────────────────────────────────
  if (!isGitRepo) {
    return (
      <div className="source-control-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>Not a Git repository</span>
        <button className="sc-init-btn" onClick={handleInit} disabled={loading}>
          {loading ? 'Initializing…' : 'Initialize Repository'}
        </button>
        {user?.token && (
          <p className="sc-init-hint">After init you can publish to your GitHub account.</p>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Publish modal */}
      {showPublish && (
        <Modal title="Publish to GitHub" onClose={() => setShowPublish(false)}>
          {!user?.token ? (
            <p className="sc-modal-warn">Please sign in with a GitHub token in the Account panel first.</p>
          ) : (
            <>
              <div className="sc-modal-field">
                <label>Repository Name</label>
                <input
                  className="login-input"
                  value={publishName}
                  onChange={e => setPublishName(e.target.value)}
                  placeholder="my-project"
                />
              </div>
              <div className="sc-modal-field">
                <label>Description (optional)</label>
                <input
                  className="login-input"
                  value={publishDesc}
                  onChange={e => setPublishDesc(e.target.value)}
                  placeholder="Short description…"
                />
              </div>
              <label className="sc-modal-check">
                <input type="checkbox" checked={publishPrivate} onChange={e => setPublishPrivate(e.target.checked)} />
                Private repository
              </label>
              {publishError && <div className="login-error">{publishError}</div>}
              <button className="sc-publish-btn" onClick={handlePublish} disabled={publishing || !publishName.trim()}>
                {publishing ? 'Publishing…' : `Publish to github.com/${user.login}`}
              </button>
            </>
          )}
        </Modal>
      )}

      <div className="source-control-view">
        {/* Header */}
        <div className="sc-header">
          <span>Source Control</span>
          <div className="sc-header-actions">
            {statusMsg && (
              <span className={`sc-status-flash ${statusMsg.ok ? 'sc-status-flash--ok' : 'sc-status-flash--err'}`}>
                {statusMsg.text}
              </span>
            )}
            <button className="sc-action-btn" onClick={refreshGit} title="Refresh">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={loading ? 'spinning' : ''}>
                <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Repo info row */}
        <div className="sc-section">
          <div className="sc-repo-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"/>
            </svg>
            <div className="sc-repo-info">
              <span className="sc-repo-name">{rootPath.split(/[\\/]/).pop()}</span>
              <span className="sc-repo-branch">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M10 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2-1V4.5a1.5 1.5 0 1 1 1 0v7a1.5 1.5 0 0 1-1 0zm2-8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
                {gitInfo.branch || 'main'}
                {gitInfo.ahead > 0 && <span>↑{gitInfo.ahead}</span>}
                {gitInfo.behind > 0 && <span>↓{gitInfo.behind}</span>}
                {remoteUrl && (
                  <span className="sc-remote-badge" title={remoteUrl}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z"/></svg>
                    GitHub
                  </span>
                )}
              </span>
            </div>
            {!remoteUrl && (
              <button className="sc-publish-small-btn" onClick={openPublish} title="Publish to GitHub">
                ↑ Publish
              </button>
            )}
          </div>
        </div>

        {/* Commit box */}
        <div className="sc-section sc-section--changes">
          <div className="sc-commit-box">
            <div className="sc-input-wrapper">
              <textarea
                placeholder="Commit message (⌘Enter to commit)"
                rows={2}
                value={commitMsg}
                onChange={e => setCommitMsg(e.target.value)}
                onKeyDown={e => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleCommit() }}
              />
              <button
                className={`sc-generate-btn ${genLoading ? 'spinning' : ''}`}
                onClick={handleGenerateMessage}
                disabled={genLoading}
                title="Generate Message with AI"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0L6.5 4.5L2 6L6.5 7.5L8 12L9.5 7.5L14 6L9.5 4.5L8 0Z"/>
                </svg>
              </button>
            </div>
            <div className="sc-commit-group">
              <button className="sc-commit-btn" onClick={handleCommit}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M13.854 3.646l-8 8-3.5-3.5a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l8.5-8.5a.5.5 0 1 0-.708-.708z"/></svg>
                Commit
              </button>
              <button className="sc-commit-dropdown" onClick={openPublish} title="Commit & Publish">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 6l4 4 4-4H4z"/></svg>
              </button>
            </div>
          </div>

          {/* Changes list */}
          <div className="sc-changes-list">
            {stagedChanges.length > 0 && (
              <div className="sc-group">
                <div className="sc-section-header" onClick={() => setIsStagedExpanded(!isStagedExpanded)}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ transform: isStagedExpanded ? 'rotate(90deg)' : 'none' }}>
                    <path d="M6 4l4 4-4 4V4z"/>
                  </svg>
                  <span className="sc-section-title">Staged Changes</span>
                  <span className="sc-section-count">{stagedChanges.length}</span>
                </div>
                {isStagedExpanded && stagedChanges.map((change, i) => (
                  <div key={i} className="sc-change-item" onClick={() => onSelectDiff(change.path)}>
                    <FileIcon path={change.path} />
                    <div className="sc-path-info">
                      <span className="sc-filename">{change.path.split(/[\\/]/).pop()}</span>
                      <span className="sc-filepath">{change.path.split(/[\\/]/).slice(0, -1).join('/')}</span>
                    </div>
                    <div className="sc-item-actions">
                      <button className="sc-item-btn" onClick={e => { e.stopPropagation(); handleUnstage(change.path) }} title="Unstage">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>
                      </button>
                    </div>
                    <span className="sc-status-badge sc-status-badge--A">{change.status[0].trim()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="sc-group">
              <div className="sc-section-header" onClick={() => setIsChangesExpanded(!isChangesExpanded)}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ transform: isChangesExpanded ? 'rotate(90deg)' : 'none' }}>
                  <path d="M6 4l4 4-4 4V4z"/>
                </svg>
                <span className="sc-section-title">Changes</span>
                {unstagedChanges.length > 0 && <span className="sc-section-count">{unstagedChanges.length}</span>}
              </div>
              {isChangesExpanded && (
                unstagedChanges.length === 0 && stagedChanges.length === 0
                  ? <div className="sc-no-changes">No changes detected</div>
                  : unstagedChanges.map((change, i) => {
                      const s = change.status === '??' ? 'U' : change.status[1].trim()
                      return (
                        <div key={i} className="sc-change-item" onClick={() => onSelectDiff(change.path)}>
                          <FileIcon path={change.path} />
                          <div className="sc-path-info">
                            <span className="sc-filename">{change.path.split(/[\\/]/).pop()}</span>
                            <span className="sc-filepath">{change.path.split(/[\\/]/).slice(0, -1).join('/')}</span>
                          </div>
                          <div className="sc-item-actions">
                            <button className="sc-item-btn" onClick={e => { e.stopPropagation(); handleStage(change.path) }} title="Stage">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4a.5.5 0 0 1 .5.5v3H11a.5.5 0 0 1 0 1H8.5v3a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5v-3A.5.5 0 0 1 8 4z"/></svg>
                            </button>
                          </div>
                          <span className={`sc-status-badge sc-status-badge--${s}`}>{s}</span>
                        </div>
                      )
                    })
              )}
            </div>
          </div>
        </div>

        {/* History + push/pull */}
        <div className="sc-graph-view">
          <div className="sc-graph-header">
            <div className="sc-graph-header-left" onClick={() => setIsGraphExpanded(!isGraphExpanded)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ transform: isGraphExpanded ? 'rotate(90deg)' : 'none' }}>
                <path d="M6 4l4 4-4 4V4z"/>
              </svg>
              <span>History</span>
            </div>
            <div className="sc-graph-header-actions">
              <button className="sc-action-btn" onClick={handlePull} title="Pull from remote" disabled={loading}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M13 5h-3V1h-4v4h-3l5 5 5-5zM0 14h16v1H0v-1z"/></svg>
              </button>
              <button className="sc-action-btn" onClick={handlePush} title="Push to remote" disabled={loading}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3 11h3v4h4v-4h3l-5-5-5 5zM16 2H0V1h16v1z"/></svg>
              </button>
            </div>
          </div>
          {isGraphExpanded && (
            <div className="sc-graph-content">
              {gitInfo.ahead > 0 && (
                <div className="sc-commit-item sc-commit-item--outgoing">
                  <div className="sc-commit-dot sc-commit-dot--outgoing"></div>
                  <span className="sc-commit-msg">Outgoing Changes</span>
                  <span className="sc-commit-branch-label">{gitInfo.branch}</span>
                </div>
              )}
              {history.map((commit, i) => {
                const isActual = i === 0
                return (
                  <div key={i} className={`sc-commit-item ${isActual ? 'sc-commit-item--actual' : ''}`}>
                    <div className={`sc-commit-dot ${isActual ? 'sc-commit-dot--actual' : 'sc-commit-dot--past'}`}></div>
                    <span className="sc-commit-msg">{commit.message}</span>
                    {isActual && <span className="sc-commit-branch-tag">{gitInfo.branch}</span>}
                    <span className="sc-commit-hash">{commit.hash}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
