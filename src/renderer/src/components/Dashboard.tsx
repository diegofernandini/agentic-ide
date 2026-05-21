import React, { useState, useEffect } from 'react'
import { Folder, HardDrive, History, BarChart3, Database } from 'lucide-react'

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
}

interface DashboardProps {
  models: string[]
  sessions: Session[]
  rootPath: string | null
}

export default function Dashboard({ models, sessions = [], rootPath }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'historical'>('project')
  const [historicalSessions, setHistoricalSessions] = useState<Session[]>([])
  const [loadingHistorical, setLoadingHistorical] = useState(false)

  // Fetch all-time deduplicated sessions when switching to historical
  useEffect(() => {
    if (activeTab === 'historical') {
      setLoadingHistorical(true)
      window.api.getHistoricalSessions()
        .then(data => {
          setHistoricalSessions(data || [])
        })
        .catch(err => {
          console.error('Error fetching historical sessions:', err)
        })
        .finally(() => {
          setLoadingHistorical(false)
        })
    }
  }, [activeTab])

  // Helper to format token counts
  function formatTokens(count: number): string {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(2) + 'M'
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  // ==========================================
  // VIEW 1: CURRENT PROJECT ANALYTICS
  // ==========================================
  
  // Filter active (non-deleted) sessions belonging to current project rootPath
  const projectSessions = sessions.filter(s => {
    if (s.isDeleted) return false
    // If rootPath is null, we show all active sessions as fallback
    if (!rootPath) return true
    return s.workspace === rootPath
  })

  let pTotalTokens = 0
  const pTokensByModel: Record<string, number> = {}
  const pTokensByMode: Record<string, number> = {
    agent: 0,
    plan: 0,
    debug: 0,
    multitask: 0,
    ask: 0
  }

  projectSessions.forEach(session => {
    session.messages.forEach(msg => {
      if (msg.role === 'assistant') {
        const pTokens = msg.promptTokens || 0
        const rTokens = msg.responseTokens || 0
        const msgTotal = pTokens + rTokens
        
        pTotalTokens += msgTotal
        
        const modelName = msg.model || 'Unknown Model'
        pTokensByModel[modelName] = (pTokensByModel[modelName] || 0) + msgTotal
        
        const modeName = session.mode || 'agent'
        pTokensByMode[modeName] = (pTokensByMode[modeName] || 0) + msgTotal
      }
    })
  })

  const pCostNumber = pTotalTokens * 0.000002
  const pFormattedCost = pCostNumber === 0 ? '$0.00' : pCostNumber < 0.01 ? `$${pCostNumber.toFixed(4)}` : `$${pCostNumber.toFixed(2)}`
  const pProjectedCost = (pCostNumber * 30).toFixed(2)

  // Current project model stats
  const pModelStats = Object.entries(pTokensByModel).map(([name, tokens]) => {
    const percentage = pTotalTokens > 0 ? Math.round((tokens / pTotalTokens) * 100) : 0
    return { name, tokens, percentage }
  })

  if (pModelStats.length === 0) {
    if (models.length > 0) {
      models.forEach(m => {
        pModelStats.push({ name: m, tokens: 0, percentage: 0 })
      })
    } else {
      pModelStats.push({ name: 'No Models Detected', tokens: 0, percentage: 0 })
    }
  }
  pModelStats.sort((a, b) => b.tokens - a.tokens)

  const colors = ['#4ec9b0', '#007acc', '#ce9178', '#dcdcaa', '#c586c0', '#4fc1ff']
  const pModelStatsWithColors = pModelStats.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  }))

  // Current project mode breakdown
  const pTotalModeTokens = Object.values(pTokensByMode).reduce((a, b) => a + b, 0)
  const modeColors: Record<string, string> = {
    agent: '#4ec9b0',
    plan: '#007acc',
    ask: '#dcdcaa',
    debug: '#f44747',
    multitask: '#c586c0'
  }

  const pModeStats = Object.entries(pTokensByMode).map(([name, tokens]) => {
    const percentage = pTotalModeTokens > 0 ? Math.round((tokens / pTotalModeTokens) * 100) : 0
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      tokens,
      percentage,
      color: modeColors[name] || '#ce9178'
    }
  }).sort((a, b) => b.tokens - a.tokens)


  // ==========================================
  // VIEW 2: TIME MACHINE (HISTORICAL) ANALYTICS
  // ==========================================
  
  // Historical calculations (includes all-time deduplicated active, deleted, and backup sessions)
  let hTotalTokens = 0
  const hTokensByModel: Record<string, number> = {}
  
  // Projects map grouping tokens by their folder/workspace path
  interface ProjectSummary {
    path: string
    name: string
    tokens: number
    sessionsCount: number
    models: Set<string>
  }
  
  const projectsMap: Record<string, ProjectSummary> = {}

  historicalSessions.forEach(session => {
    const wsPath = session.workspace || 'No Project Folder Associated'
    const folderName = wsPath.split(/[\\/]/).pop() || wsPath

    if (!projectsMap[wsPath]) {
      projectsMap[wsPath] = {
        path: wsPath,
        name: folderName,
        tokens: 0,
        sessionsCount: 0,
        models: new Set<string>()
      }
    }

    let sessionTokens = 0
    session.messages.forEach(msg => {
      if (msg.role === 'assistant') {
        const pTokens = msg.promptTokens || 0
        const rTokens = msg.responseTokens || 0
        const msgTotal = pTokens + rTokens
        
        sessionTokens += msgTotal
        hTotalTokens += msgTotal
        
        const modelName = msg.model || 'Unknown Model'
        hTokensByModel[modelName] = (hTokensByModel[modelName] || 0) + msgTotal
        
        if (msg.model) {
          projectsMap[wsPath].models.add(msg.model)
        }
      }
    })

    projectsMap[wsPath].tokens += sessionTokens
    projectsMap[wsPath].sessionsCount += 1
  })

  const hCostNumber = hTotalTokens * 0.000002
  const hFormattedCost = hCostNumber === 0 ? '$0.00' : hCostNumber < 0.01 ? `$${hCostNumber.toFixed(4)}` : `$${hCostNumber.toFixed(2)}`

  // Sort historical project summaries by token count descending
  const projectsList = Object.values(projectsMap).sort((a, b) => b.tokens - a.tokens)

  // Historical model usage stats
  const hModelStats = Object.entries(hTokensByModel).map(([name, tokens]) => {
    const percentage = hTotalTokens > 0 ? Math.round((tokens / hTotalTokens) * 100) : 0
    return { name, tokens, percentage }
  }).sort((a, b) => b.tokens - a.tokens)

  return (
    <div className="dashboard-container" style={{ 
      padding: '40px', 
      color: '#d4d4d4', 
      overflowY: 'auto', 
      height: '100%',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #141414 100%)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px', fontWeight: 300, letterSpacing: '-0.5px' }}>
              System <span style={{ fontWeight: 600 }}>Analytics</span>
            </h1>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6 }}>
              {activeTab === 'project' 
                ? 'Real-time administrative overview of performance and token usage for the current workspace folder.'
                : 'Aggregated analytics and deduplicated historical usage including Time Machine backups across all workspace projects.'
              }
            </p>
          </div>

          {/* Premium Segmented Tab Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '4px', 
            background: 'rgba(255, 255, 255, 0.03)', 
            padding: '4px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            <button 
              onClick={() => setActiveTab('project')}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontSize: '13px', 
                fontWeight: 500, 
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
                border: 'none', 
                background: activeTab === 'project' ? '#007acc' : 'transparent', 
                color: activeTab === 'project' ? '#fff' : '#888', 
                cursor: 'pointer' 
              }}
            >
              <Folder size={14} />
              Current Project
            </button>
            <button 
              onClick={() => setActiveTab('historical')}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontSize: '13px', 
                fontWeight: 500, 
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', 
                border: 'none', 
                background: activeTab === 'historical' ? '#007acc' : 'transparent', 
                color: activeTab === 'historical' ? '#fff' : '#888', 
                cursor: 'pointer' 
              }}
            >
              <History size={14} />
              Time Machine (Historical)
            </button>
          </div>
        </header>

        {/* Current Folder Path Sub-banner */}
        {activeTab === 'project' && rootPath && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(0, 122, 204, 0.05)',
            border: '1px solid rgba(0, 122, 204, 0.15)',
            padding: '10px 16px', 
            borderRadius: '8px', 
            marginBottom: '32px',
            fontSize: '12px',
            color: '#a0a0a0'
          }}>
            <span style={{ color: '#007acc', fontWeight: 600 }}>WORKSPACE ROOT:</span>
            <code style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px', color: '#ddd' }}>{rootPath}</code>
          </div>
        )}

        {/* Loading Spinner for Historical Time Machine data */}
        {loadingHistorical && activeTab === 'historical' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '60px 0' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              border: '2px solid rgba(255,255,255,0.05)', 
              borderTopColor: '#007acc', 
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ fontSize: '13px', color: '#888' }}>Reading all Time Machine backups and active sessions...</span>
          </div>
        )}

        {/* ==================================================== */}
        {/* RENDER VIEW 1: CURRENT PROJECT                       */}
        {/* ==================================================== */}
        {activeTab === 'project' && (
          <>
            {pTotalTokens === 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '40px 32px',
                textAlign: 'center',
                marginBottom: '48px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ color: '#fff', marginBottom: '8px', fontWeight: 500 }}>No Workspace Activity Recorded</h3>
                <p style={{ color: '#888', fontSize: '13px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
                  No LLM interactions have been logged inside the current project directory. Open the Chat Panel on the right and prompt a model to start logging performance stats!
                </p>
              </div>
            )}

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '48px' }}>
              <div className="stat-card">
                <label>Workspace Tokens</label>
                <value style={{ color: '#4ec9b0' }}>{formatTokens(pTotalTokens)}</value>
                <div className="stat-trend">Current folder only</div>
              </div>
              <div className="stat-card">
                <label>Estimated Project Cost</label>
                <value style={{ color: '#007acc' }}>{pFormattedCost}</value>
                <div className="stat-trend">Projected: ${pProjectedCost}/mo</div>
              </div>
              <div className="stat-card">
                <label>Active Local Models</label>
                <value style={{ color: '#ce9178' }}>{models.length}</value>
                <div className="stat-trend">Ollama service connected</div>
              </div>
            </div>

            {/* Visual Charts */}
            {pTotalTokens > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                <section className="usage-section">
                  <h2 className="section-title">Model Distribution (Current Workspace)</h2>
                  <div className="usage-list">
                    {pModelStatsWithColors.map(m => (
                      <div key={m.name} className="usage-item">
                        <div className="usage-info">
                          <span className="usage-name">{m.name}</span>
                          <span className="usage-value">{m.tokens.toLocaleString()} tkns ({m.percentage}%)</span>
                        </div>
                        <div className="bar-wrapper">
                          <div className="bar-fill" style={{ width: (m.percentage || 0) + '%', backgroundColor: m.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="usage-section">
                  <h2 className="section-title">Agent Mode Breakdown</h2>
                  <div className="usage-list">
                    {pModeStats.map(m => (
                      <div key={m.name} className="usage-item">
                        <div className="usage-info">
                          <span className="usage-name">{m.name}</span>
                          <span className="usage-value">{m.tokens.toLocaleString()} tkns ({m.percentage}%)</span>
                        </div>
                        <div className="bar-wrapper">
                          <div className="bar-fill" style={{ width: (m.percentage || 0) + '%', backgroundColor: m.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </>
        )}

        {/* ==================================================== */}
        {/* RENDER VIEW 2: TIME MACHINE (HISTORICAL)             */}
        {/* ==================================================== */}
        {activeTab === 'historical' && !loadingHistorical && (
          <>
            {hTotalTokens === 0 ? (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '40px 32px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ color: '#fff', marginBottom: '8px', fontWeight: 500 }}>No Historical Logs Found</h3>
                <p style={{ color: '#888', fontSize: '13px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
                  No historical sessions or backup files exist on this machine yet. Cumulative statistics will appear once backups are generated or chats are performed across directories.
                </p>
              </div>
            ) : (
              <>
                {/* Historical Summary Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                  <div className="stat-card">
                    <label>All-Time Tokens Consumed</label>
                    <value style={{ color: '#4ec9b0' }}>{formatTokens(hTotalTokens)}</value>
                    <div className="stat-trend" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Database size={11} /> Deduplicated Time Machine archives
                    </div>
                  </div>
                  <div className="stat-card">
                    <label>All-Time Estimated Value</label>
                    <value style={{ color: '#007acc' }}>{hFormattedCost}</value>
                    <div className="stat-trend">Standard commercial equivalents</div>
                  </div>
                  <div className="stat-card">
                    <label>Workspace Folder Count</label>
                    <value style={{ color: '#ce9178' }}>{projectsList.length}</value>
                    <div className="stat-trend">Different projects registered</div>
                  </div>
                </div>

                {/* Main Content Areas */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                  
                  {/* PROJECT DIRECTORY BREAKDOWN (THE KEY REQUEST) */}
                  <section className="usage-section">
                    <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Folder size={16} style={{ color: '#007acc' }} />
                      Token Footprint by Project Folder
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {projectsList.map(proj => {
                        const projectPercent = hTotalTokens > 0 ? Math.round((proj.tokens / hTotalTokens) * 100) : 0;
                        return (
                          <div key={proj.path} style={{
                            background: 'rgba(255,255,255,0.01)',
                            border: '1px solid rgba(255,255,255,0.03)',
                            borderRadius: '8px',
                            padding: '16px 20px',
                            transition: 'all 0.2s',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.15)'
                          }} className="project-card-hover">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                              <div>
                                <h3 style={{ fontSize: '15px', color: '#fff', fontWeight: 600, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <Folder size={14} style={{ color: '#dcdcaa' }} />
                                  {proj.name}
                                </h3>
                                <code style={{ fontSize: '11px', color: '#666', fontFamily: 'monospace' }}>{proj.path}</code>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '15px', color: '#4ec9b0', fontWeight: 'bold' }}>{proj.tokens.toLocaleString()} tokens</span>
                                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{proj.sessionsCount} session{proj.sessionsCount === 1 ? '' : 's'}</div>
                              </div>
                            </div>
                            
                            {/* Models used in this project */}
                            {proj.models.size > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                                {Array.from(proj.models).map(m => (
                                  <span key={m} style={{
                                    fontSize: '10px',
                                    background: 'rgba(0,122,204,0.1)',
                                    color: '#4fc1ff',
                                    border: '1px solid rgba(0,122,204,0.2)',
                                    padding: '2px 8px',
                                    borderRadius: '4px'
                                  }}>
                                    {m}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Bar footprint */}
                            <div className="bar-wrapper" style={{ height: '5px' }}>
                              <div className="bar-fill" style={{ width: projectPercent + '%', backgroundColor: '#007acc' }} />
                            </div>
                            <div style={{ fontSize: '10px', color: '#555', marginTop: '6px', textAlign: 'right' }}>
                              Represents {projectPercent}% of all-time usage
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  {/* ALL-TIME MODELS */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                    <section className="usage-section">
                      <h2 className="section-title">All-Time Cumulative Models</h2>
                      <div className="usage-list">
                        {hModelStats.map((m, index) => (
                          <div key={m.name} className="usage-item">
                            <div className="usage-info">
                              <span className="usage-name">{m.name}</span>
                              <span className="usage-value">{m.tokens.toLocaleString()} tkns ({m.percentage}%)</span>
                            </div>
                            <div className="bar-wrapper">
                              <div className="bar-fill" style={{ width: (m.percentage || 0) + '%', backgroundColor: colors[index % colors.length] }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="usage-section">
                      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <History size={16} />
                        Historical Sessions Log
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '350px', overflowY: 'auto', paddingRight: '6px' }}>
                        {historicalSessions.slice(0, 30).map(s => {
                          let sTokens = 0
                          s.messages.forEach(msg => {
                            if (msg.role === 'assistant') {
                              sTokens += (msg.promptTokens || 0) + (msg.responseTokens || 0)
                            }
                          })
                          return (
                            <div key={s.id} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              background: 'rgba(255,255,255,0.01)',
                              border: '1px solid rgba(255,255,255,0.03)',
                              padding: '10px 14px',
                              borderRadius: '6px',
                              fontSize: '12px'
                            }}>
                              <div>
                                <div style={{ fontWeight: 600, color: s.isDeleted ? '#888' : '#eee', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  {s.name}
                                  {s.isDeleted && <span style={{ fontSize: '9px', background: 'rgba(244,71,71,0.1)', color: '#f44747', border: '1px solid rgba(244,71,71,0.2)', padding: '1px 4px', borderRadius: '3px' }}>Deleted</span>}
                                </div>
                                <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>
                                  {s.workspace ? s.workspace.split(/[\\/]/).pop() : 'No Project'} • {new Date(s.lastActive || Date.now()).toLocaleDateString()}
                                </div>
                              </div>
                              <span style={{ fontFamily: 'monospace', color: '#4ec9b0' }}>{sTokens.toLocaleString()} tkns</span>
                            </div>
                          )
                        })}
                        {historicalSessions.length > 30 && (
                          <div style={{ textAlign: 'center', fontSize: '11px', color: '#555', padding: '8px' }}>
                            ...and {historicalSessions.length - 30} more historical sessions
                          </div>
                        )}
                      </div>
                    </section>
                  </div>

                </div>
              </>
            )}
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .stat-card {
          background: rgba(37, 37, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 24px;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s;
        }
        .stat-card:hover {
          border-color: rgba(0, 122, 204, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .stat-card label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          color: #777;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 12px;
        }
        .stat-card value {
          display: block;
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .stat-trend {
          font-size: 11px;
          color: #555;
        }
        .usage-section {
          background: rgba(30, 30, 30, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 32px;
        }
        .section-title {
          font-size: 14px;
          color: #eee;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .usage-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .usage-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 8px;
        }
        .usage-name { color: #ccc; }
        .usage-value { color: #888; font-family: monospace; }
        .bar-wrapper {
          height: 4px;
          width: 100%;
          position: relative;
          background: rgba(255,255,255,0.03);
          border-radius: 2px;
        }
        .bar-fill {
          height: 100%;
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(0,0,0,0.4);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card-hover:hover {
          background: rgba(255,255,255,0.02) !important;
          border-color: rgba(0, 122, 204, 0.2) !important;
          transform: translateX(4px);
        }
      `}} />
    </div>
  )
}
