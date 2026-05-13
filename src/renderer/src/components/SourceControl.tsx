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

interface Props {
  rootPath: string | null
  model: string
  onSelectFile: (path: string) => void
  onSelectDiff: (path: string) => void
}

const FileIcon = ({ path }: { path: string }) => {
  const ext = path.split('.').pop()?.toLowerCase()
  if (ext === 'js') return <span className="sc-file-icon sc-file-icon--js">JS</span>
  if (ext === 'ts') return <span className="sc-file-icon sc-file-icon--ts">TS</span>
  if (ext === 'tsx' || ext === 'jsx') return <span className="sc-file-icon sc-file-icon--react">⚛</span>
  if (ext === 'css') return <span className="sc-file-icon sc-file-icon--css">CSS</span>
  return <span className="sc-file-icon">{}</span>
}

export default function SourceControl({ rootPath, model, onSelectFile, onSelectDiff }: Props) {
  const [gitInfo, setGitInfo] = useState<GitInfo>({ branch: '', ahead: 0, behind: 0, changes: [] })
  const [history, setHistory] = useState<Commit[]>([])
  const [loading, setLoading] = useState(false)
  const [genLoading, setGenLoading] = useState(false)
  const [commitMsg, setCommitMsg] = useState('')
  const [isChangesExpanded, setIsChangesExpanded] = useState(true)
  const [isStagedExpanded, setIsStagedExpanded] = useState(true)
  const [isGraphExpanded, setIsGraphExpanded] = useState(true)

  const refreshGit = useCallback(async () => {
    if (!rootPath) return
    setLoading(true)
    try {
      const info = await window.api.getGitStatus(rootPath)
      setGitInfo(info)
      const log = await window.api.gitLog(rootPath)
      setHistory(log)
    } catch (e) {
      console.error('Failed to get git info', e)
    } finally {
      setLoading(false)
    }
  }, [rootPath])

  useEffect(() => {
    refreshGit()
    const interval = setInterval(refreshGit, 30000)
    return () => clearInterval(interval)
  }, [refreshGit])

  const handleCommit = async () => {
    if (!rootPath || !commitMsg.trim()) return
    const stagedCount = gitInfo.changes.filter(c => c.status[0] !== ' ' && c.status[0] !== '?').length
    if (stagedCount === 0) {
      alert('There are no staged changes to commit.')
      return
    }
    setLoading(true)
    const res = await window.api.gitCommit(rootPath, commitMsg)
    if (res.success) {
      setCommitMsg('')
      refreshGit()
    } else {
      alert('Commit failed: ' + res.error)
    }
    setLoading(false)
  }

  const handleGenerateMessage = async () => {
    if (!rootPath || !model) return
    const diff = await window.api.gitGetStagedDiff(rootPath)
    if (!diff.trim()) {
      alert('Stage some changes first to generate a message.')
      return
    }

    setGenLoading(true)
    try {
      const prompt = `Generate a concise, professional git commit message for the following staged changes.
Return ONLY the message, no quotes or prefix.
Diff:
${diff.slice(0, 4000)}`

      const res = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          system: "You are an expert developer. You write concise and meaningful commit messages following Conventional Commits format if possible (e.g. feat: ..., fix: ...)."
        })
      })

      if (!res.ok) throw new Error('AI service failed')
      const data = await res.json()
      setCommitMsg(data.response.trim().replace(/^["']|["']$/g, ''))
    } catch (e) {
      console.error('Failed to generate message', e)
      alert('Failed to generate message. Is Ollama running?')
    } finally {
      setGenLoading(false)
    }
  }

  const handleStage = async (path: string) => {
    if (!rootPath) return
    await window.api.gitStage(rootPath, path)
    refreshGit()
  }

  const handleUnstage = async (path: string) => {
    if (!rootPath) return
    await window.api.gitUnstage(rootPath, path)
    refreshGit()
  }

  const handlePush = async () => {
    if (!rootPath) return
    setLoading(true)
    const res = await window.api.gitPush(rootPath)
    if (res.success) refreshGit()
    else alert('Push failed: ' + res.error)
    setLoading(false)
  }

  const handlePull = async () => {
    if (!rootPath) return
    setLoading(true)
    const res = await window.api.gitPull(rootPath)
    if (res.success) refreshGit()
    else alert('Pull failed: ' + res.error)
    setLoading(false)
  }

  const stagedChanges = gitInfo.changes.filter(c => c.status[0] !== ' ' && c.status[0] !== '?')
  const unstagedChanges = gitInfo.changes.filter(c => c.status[1] !== ' ' || c.status === '??')

  if (!rootPath) {
    return (
      <div className="source-control-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <span>Open a git repository to see source control</span>
      </div>
    )
  }

  return (
    <div className="source-control-view">
      <div className="sc-header">
        <span>Source Control</span>
        <div className="sc-header-actions">
          <button className="sc-action-btn" onClick={refreshGit} title="Refresh">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={loading ? 'spinning' : ''}>
              <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
          <button className="sc-action-btn" title="More Actions">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
          </button>
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-repo-item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ opacity: 0.6 }}>
            <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm0 1h12a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1zm13 4v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6h14z"/>
          </svg>
          <div className="sc-repo-info">
            <span className="sc-repo-name">{rootPath.split(/[\\/]/).pop()}</span>
            <span className="sc-repo-branch">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor"><path d="M10 12.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-2-1V4.5a1.5 1.5 0 1 1 1 0v7a1.5 1.5 0 0 1-1 0zm2-8.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>
              {gitInfo.branch}
              {gitInfo.ahead > 0 && <span>↑{gitInfo.ahead}</span>}
              {gitInfo.behind > 0 && <span>↓{gitInfo.behind}</span>}
            </span>
          </div>
        </div>
      </div>

      <div className="sc-section sc-section--changes">
        <div className="sc-commit-box">
          <div className="sc-input-wrapper">
            <textarea 
              placeholder="Message (Ctrl+Enter to commit)" 
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
            <button className="sc-commit-dropdown">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M4 6l4 4 4-4H4z"/></svg>
            </button>
          </div>
        </div>

        <div className="sc-changes-list">
          {/* Staged Changes */}
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
                    <button className="sc-item-btn" onClick={(e) => { e.stopPropagation(); handleUnstage(change.path); }} title="Unstage">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>
                    </button>
                  </div>
                  <span className="sc-status-badge sc-status-badge--A">{change.status[0].trim()}</span>
                </div>
              ))}
            </div>
          )}

          {/* Changes (Unstaged) */}
          <div className="sc-group">
            <div className="sc-section-header" onClick={() => setIsChangesExpanded(!isChangesExpanded)}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ transform: isChangesExpanded ? 'rotate(90deg)' : 'none' }}>
                <path d="M6 4l4 4-4 4V4z"/>
              </svg>
              <span className="sc-section-title">Changes</span>
              {unstagedChanges.length > 0 && <span className="sc-section-count">{unstagedChanges.length}</span>}
            </div>
            {isChangesExpanded && (
              unstagedChanges.length === 0 && stagedChanges.length === 0 ? (
                <div className="sc-no-changes">No changes detected</div>
              ) : (
                unstagedChanges.map((change, i) => {
                  const s = change.status === '??' ? 'U' : change.status[1].trim()
                  return (
                    <div key={i} className="sc-change-item" onClick={() => onSelectDiff(change.path)}>
                      <FileIcon path={change.path} />
                      <div className="sc-path-info">
                        <span className="sc-filename">{change.path.split(/[\\/]/).pop()}</span>
                        <span className="sc-filepath">{change.path.split(/[\\/]/).slice(0, -1).join('/')}</span>
                      </div>
                      <div className="sc-item-actions">
                        <button className="sc-item-btn" onClick={(e) => { e.stopPropagation(); handleStage(change.path); }} title="Stage">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 4a.5.5 0 0 1 .5.5v3H11a.5.5 0 0 1 0 1H8.5v3a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5v-3A.5.5 0 0 1 8 4z"/></svg>
                        </button>
                      </div>
                      <span className={`sc-status-badge sc-status-badge--${s}`}>{s}</span>
                    </div>
                  )
                })
              )
            )}
          </div>
        </div>
      </div>

      <div className="sc-graph-view">
        <div className="sc-graph-header">
          <div className="sc-graph-header-left" onClick={() => setIsGraphExpanded(!isGraphExpanded)}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" style={{ transform: isGraphExpanded ? 'rotate(90deg)' : 'none' }}>
              <path d="M6 4l4 4-4 4V4z"/>
            </svg>
            <span>History</span>
          </div>
          <div className="sc-graph-header-actions">
            <button className="sc-action-btn" onClick={handlePull} title="Pull">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M13 5h-3V1h-4v4h-3l5 5 5-5zM0 14h16v1H0v-1z"/></svg>
            </button>
            <button className="sc-action-btn" onClick={handlePush} title="Push">
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
  )
}
