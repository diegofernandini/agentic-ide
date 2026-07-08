import React, { useState, useEffect } from 'react'
import { Folder, HardDrive, History, BarChart3, Database, Play, Square, Trash2, Edit3, Plus, Check, AlertCircle, Terminal, Settings, RefreshCw } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'project' | 'historical' | 'mcp'>('project')
  const [historicalSessions, setHistoricalSessions] = useState<Session[]>([])
  const [loadingHistorical, setLoadingHistorical] = useState(false)
  const [mcpServers, setMcpServers] = useState<any[]>([])
  const [config, setConfig] = useState<any>({ mcpServers: {} })
  const [editingServer, setEditingServer] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [srvName, setSrvName] = useState('')
  const [srvType, setSrvType] = useState<'stdio' | 'sse'>('stdio')
  const [srvCommand, setSrvCommand] = useState('')
  const [srvArgs, setSrvArgs] = useState('')
  const [srvEnv, setSrvEnv] = useState('')
  const [srvUrl, setSrvUrl] = useState('')
  const [expandedLogs, setExpandedLogs] = useState<Record<string, boolean>>({})
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({})

  // Periodically fetch MCP status
  useEffect(() => {
    if (activeTab === 'mcp') {
      const fetchConfig = async () => {
        try {
          const cfg = await window.api.mcpGetConfig()
          setConfig(cfg || { mcpServers: {} })
        } catch (e) {
          console.warn('Failed to load MCP config:', e)
        }
      }
      fetchConfig()

      const fetchServers = async () => {
        try {
          const svrs = await window.api.mcpGetServers()
          setMcpServers(svrs || [])
        } catch (e) {
          console.warn('Failed to load MCP servers:', e)
        }
      }
      fetchServers()
      const interval = setInterval(fetchServers, 2000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [activeTab])

  const handleEditServer = (name: string, srvConfig: any) => {
    setEditingServer(name)
    setSrvName(name)
    if (srvConfig.url) {
      setSrvType('sse')
      setSrvUrl(srvConfig.url)
      setSrvCommand('')
      setSrvArgs('')
      setSrvEnv('')
    } else {
      setSrvType('stdio')
      setSrvUrl('')
      setSrvCommand(srvConfig.command || '')
      setSrvArgs(Array.isArray(srvConfig.args) ? srvConfig.args.join(' ') : '')
      setSrvEnv(srvConfig.env ? JSON.stringify(srvConfig.env, null, 2) : '')
    }
    setShowForm(true)
  }

  const handleToggleServer = async (name: string) => {
    const newMcpServers = { ...config.mcpServers }
    if (newMcpServers[name]) {
      newMcpServers[name].disabled = !newMcpServers[name].disabled
      const newConfig = { ...config, mcpServers: newMcpServers }
      setConfig(newConfig)
      try {
        await window.api.mcpSaveConfig(newConfig)
      } catch (e) {
        console.error('Failed to save config:', e)
      }
    }
  }

  const handleDeleteServer = async (name: string) => {
    if (!confirm(`Are you sure you want to delete the MCP server configuration for "${name}"?`)) return
    const newMcpServers = { ...config.mcpServers }
    delete newMcpServers[name]
    const newConfig = { ...config, mcpServers: newMcpServers }
    setConfig(newConfig)
    try {
      await window.api.mcpSaveConfig(newConfig)
    } catch (e) {
      console.error('Failed to delete server:', e)
    }
  }

  const handleRestartServer = async (name: string) => {
    try {
      await window.api.mcpRestartServer(name)
    } catch (e) {
      console.error('Failed to restart server:', e)
    }
  }

  const handleSaveServer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!srvName.trim()) return

    const newMcpServers = { ...config.mcpServers }

    if (editingServer && editingServer !== srvName.trim()) {
      delete newMcpServers[editingServer]
    }

    let parsedEnv = {}
    try {
      if (srvEnv.trim()) {
        parsedEnv = JSON.parse(srvEnv)
      }
    } catch (err) {
      alert('Invalid JSON in Environment Variables field. Please enter a valid JSON object or leave it empty.')
      return
    }

    const srvConfig: any = {
      disabled: config.mcpServers[editingServer || srvName.trim()]?.disabled || false
    }

    if (srvType === 'sse') {
      srvConfig.url = srvUrl.trim()
    } else {
      srvConfig.command = srvCommand.trim()
      const matches = srvArgs.match(/"[^"]+"|'[^']+'|\S+/g) || []
      srvConfig.args = matches.map(m => m.replace(/^['"]|['"]$/g, ''))
      if (Object.keys(parsedEnv).length > 0) {
        srvConfig.env = parsedEnv
      }
    }

    newMcpServers[srvName.trim()] = srvConfig

    const newConfig = { ...config, mcpServers: newMcpServers }
    setConfig(newConfig)
    try {
      await window.api.mcpSaveConfig(newConfig)
    } catch (e) {
      console.error('Failed to save config:', e)
    }

    setShowForm(false)
    setEditingServer(null)
    setSrvName('')
    setSrvCommand('')
    setSrvArgs('')
    setSrvEnv('')
    setSrvUrl('')
  }


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
                : activeTab === 'historical'
                ? 'Aggregated analytics and deduplicated historical usage including Time Machine backups across all workspace projects.'
                : 'Connect and manage Model Context Protocol (MCP) servers to extend the agent with custom database, search, and browser tools.'
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
            <button 
              onClick={() => setActiveTab('mcp')}
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
                background: activeTab === 'mcp' ? '#007acc' : 'transparent', 
                color: activeTab === 'mcp' ? '#fff' : '#888', 
                cursor: 'pointer' 
              }}
            >
              <Database size={14} />
              MCP Connections
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

        {activeTab === 'mcp' && (
          <>
            {/* Presets Market / Suggestions */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '15px', color: '#fff', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Settings size={15} style={{ color: '#007acc' }} />
                MCP Preset Market
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {[
                  {
                    name: 'Brave Search',
                    description: 'Enables web search for the agent using the Brave API',
                    preset: { type: 'stdio', command: 'npx', args: '-y @modelcontextprotocol/server-brave-search', env: '{"BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"}' }
                  },
                  {
                    name: 'SQLite Database',
                    description: 'Allows reading and querying local SQLite databases',
                    preset: { type: 'stdio', command: 'npx', args: '-y @modelcontextprotocol/server-sqlite --db /absolute/path/to/db.sqlite', env: '{}' }
                  },
                  {
                    name: 'PostgreSQL Database',
                    description: 'Enables querying PostgreSQL database schemas and data',
                    preset: { type: 'stdio', command: 'npx', args: '-y @modelcontextprotocol/server-postgres --db-url postgresql://localhost/mydb', env: '{}' }
                  },
                  {
                    name: 'Puppeteer Browser',
                    description: 'Enables browser automation and web page screenshots',
                    preset: { type: 'stdio', command: 'npx', args: '-y @modelcontextprotocol/server-puppeteer', env: '{}' }
                  },
                  {
                    name: 'Filesystem Access',
                    description: 'Exposes directories to the agent for reading and writing',
                    preset: { type: 'stdio', command: 'npx', args: `-y @modelcontextprotocol/server-filesystem ${rootPath || '/path/to/directory'}`, env: '{}' }
                  },
                  {
                    name: 'GitHub API',
                    description: 'Enables repository querying, PR listing, and issue creation',
                    preset: { type: 'stdio', command: 'npx', args: '-y @modelcontextprotocol/server-github', env: '{"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN"}' }
                  }
                ].map(p => (
                  <div key={p.name} style={{
                    background: 'rgba(30, 30, 30, 0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }} className="preset-card-hover">
                    <div>
                      <h3 style={{ fontSize: '13px', color: '#fff', fontWeight: 600, margin: '0 0 6px 0' }}>{p.name}</h3>
                      <p style={{ fontSize: '11px', color: '#888', margin: '0 0 12px 0', lineHeight: '1.4' }}>{p.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingServer(null)
                        setSrvName(p.name.toLowerCase().replace(/\s+/g, '-'))
                        setSrvType(p.preset.type as any)
                        setSrvCommand(p.preset.command)
                        setSrvArgs(p.preset.args)
                        setSrvEnv(p.preset.env)
                        setSrvUrl('')
                        setShowForm(true)
                        setTimeout(() => {
                          document.getElementById('mcp-config-form-section')?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                      style={{
                        padding: '6px 12px',
                        background: 'rgba(0, 122, 204, 0.1)',
                        border: '1px solid rgba(0, 122, 204, 0.2)',
                        borderRadius: '4px',
                        color: '#4fc1ff',
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      <Plus size={12} /> Configure Preset
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Section */}
            {showForm && (
              <div id="mcp-config-form-section" style={{
                background: 'rgba(37, 37, 38, 0.4)',
                border: '1px solid rgba(0, 122, 204, 0.3)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '32px',
                animation: 'fadeIn 0.25s ease-out'
              }}>
                <h2 style={{ fontSize: '15px', color: '#fff', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Settings size={15} style={{ color: '#007acc' }} />
                  {editingServer ? `Edit Server: ${editingServer}` : 'Add New MCP Server'}
                </h2>
                <form onSubmit={handleSaveServer} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Server Name</label>
                      <input
                        type="text"
                        placeholder="e.g. postgres-db"
                        value={srvName}
                        onChange={e => setSrvName(e.target.value)}
                        required
                        disabled={!!editingServer}
                        style={{
                          padding: '8px 12px',
                          background: 'rgba(0,0,0,0.2)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Connection Type</label>
                      <select
                        value={srvType}
                        onChange={e => setSrvType(e.target.value as any)}
                        style={{
                          padding: '8px 12px',
                          background: 'rgba(30,30,30,0.9)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '13px',
                          height: '35px'
                        }}
                      >
                        <option value="stdio">Stdio (Local Process)</option>
                        <option value="sse">SSE (Server-Sent Events)</option>
                      </select>
                    </div>
                  </div>

                  {srvType === 'stdio' ? (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Command</label>
                          <input
                            type="text"
                            placeholder="e.g. npx, node, python"
                            value={srvCommand}
                            onChange={e => setSrvCommand(e.target.value)}
                            required
                            style={{
                              padding: '8px 12px',
                              background: 'rgba(0,0,0,0.2)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px',
                              color: '#fff',
                              fontSize: '13px'
                            }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Arguments</label>
                          <input
                            type="text"
                            placeholder="e.g. -y @modelcontextprotocol/server-postgres --db-url ..."
                            value={srvArgs}
                            onChange={e => setSrvArgs(e.target.value)}
                            style={{
                              padding: '8px 12px',
                              background: 'rgba(0,0,0,0.2)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '6px',
                              color: '#fff',
                              fontSize: '13px'
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Environment Variables (JSON)</label>
                        <textarea
                          rows={3}
                          placeholder='e.g. { "API_KEY": "secret" }'
                          value={srvEnv}
                          onChange={e => setSrvEnv(e.target.value)}
                          style={{
                            padding: '8px 12px',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '6px',
                            color: '#fff',
                            fontSize: '13px',
                            fontFamily: 'monospace'
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <label style={{ fontSize: '11px', color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>SSE Endpoint URL</label>
                      <input
                        type="url"
                        placeholder="e.g. http://localhost:3012/sse"
                        value={srvUrl}
                        onChange={e => setSrvUrl(e.target.value)}
                        required
                        style={{
                          padding: '8px 12px',
                          background: 'rgba(0,0,0,0.2)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '13px'
                        }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setEditingServer(null) }}
                      style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        color: '#aaa',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '8px 20px',
                        background: '#007acc',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#fff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {editingServer ? 'Save Changes' : 'Create Connection'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Configured Connections List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '15px', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={15} style={{ color: '#4ec9b0' }} />
                  Active Connections ({mcpServers.length})
                </h2>
                {!showForm && (
                  <button
                    onClick={() => {
                      setEditingServer(null)
                      setSrvName('')
                      setSrvType('stdio')
                      setSrvCommand('')
                      setSrvArgs('')
                      setSrvEnv('')
                      setSrvUrl('')
                      setShowForm(true)
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#007acc',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={13} /> Add Connection
                  </button>
                )}
              </div>

              {mcpServers.length === 0 ? (
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  padding: '48px 24px',
                  textAlign: 'center'
                }}>
                  <Database size={32} style={{ color: '#555', marginBottom: '16px' }} />
                  <h3 style={{ color: '#eee', fontSize: '14px', margin: '0 0 6px 0', fontWeight: 500 }}>No MCP Servers Configured</h3>
                  <p style={{ color: '#777', fontSize: '12px', maxWidth: '420px', margin: '0 auto', lineHeight: '1.5' }}>
                    Model Context Protocol connections are empty. Use a preset above or click "Add Connection" to connect your agent with databases, browsers, and other services.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {mcpServers.map(svr => {
                    const isEnabled = !config.mcpServers[svr.name]?.disabled
                    const isLogsOpen = !!expandedLogs[svr.name]
                    const isToolsOpen = !!expandedTools[svr.name]

                    let statusColor = '#888'
                    let statusBg = 'rgba(128,128,128,0.1)'
                    if (svr.status === 'connected') {
                      statusColor = '#4ec9b0'
                      statusBg = 'rgba(78, 201, 176, 0.08)'
                    } else if (svr.status === 'connecting') {
                      statusColor = '#ce9178'
                      statusBg = 'rgba(206, 145, 120, 0.08)'
                    } else if (svr.status === 'error') {
                      statusColor = '#f44747'
                      statusBg = 'rgba(244, 71, 71, 0.08)'
                    }

                    return (
                      <div key={svr.name} style={{
                        background: 'rgba(30, 30, 30, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.03)',
                        borderRadius: '8px',
                        padding: '16px 20px',
                        transition: 'all 0.2s'
                      }} className="project-card-hover">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                              <h3 style={{ fontSize: '15px', color: '#fff', fontWeight: 600, margin: 0 }}>{svr.name}</h3>
                              <span style={{
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                color: '#aaa',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontFamily: 'monospace'
                              }}>{svr.type}</span>
                              <span style={{
                                fontSize: '10px',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                color: statusColor,
                                border: `1px solid ${statusColor}`,
                                background: statusBg,
                                fontWeight: 600
                              }}>{svr.status.toUpperCase()}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#777', fontFamily: 'monospace' }}>
                              {svr.type === 'sse' ? (
                                <span>URL: {config.mcpServers[svr.name]?.url}</span>
                              ) : (
                                <span>Cmd: {config.mcpServers[svr.name]?.command} {config.mcpServers[svr.name]?.args?.join(' ')}</span>
                              )}
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: 'auto' }}>
                            <button
                              type="button"
                              onClick={() => setExpandedTools(prev => ({ ...prev, [svr.name]: !isToolsOpen }))}
                              disabled={svr.status !== 'connected'}
                              style={{
                                padding: '5px 10px',
                                background: isToolsOpen ? 'rgba(0,122,204,0.1)' : 'transparent',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '4px',
                                color: isToolsOpen ? '#4fc1ff' : '#aaa',
                                fontSize: '11px',
                                cursor: svr.status === 'connected' ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s',
                                opacity: svr.status === 'connected' ? 1 : 0.5
                              }}
                            >
                              Tools ({svr.tools?.length || 0})
                            </button>
                            <button
                              type="button"
                              onClick={() => setExpandedLogs(prev => ({ ...prev, [svr.name]: !isLogsOpen }))}
                              style={{
                                padding: '5px 10px',
                                background: isLogsOpen ? 'rgba(0,122,204,0.1)' : 'transparent',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '4px',
                                color: isLogsOpen ? '#4fc1ff' : '#aaa',
                                fontSize: '11px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              Logs
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRestartServer(svr.name)}
                              style={{
                                padding: '5px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '4px',
                                color: '#aaa',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Restart Connection"
                            >
                              <RefreshCw size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditServer(svr.name, config.mcpServers[svr.name])}
                              style={{
                                padding: '5px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '4px',
                                color: '#aaa',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Edit Configuration"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteServer(svr.name)}
                              style={{
                                padding: '5px',
                                background: 'transparent',
                                border: '1px solid rgba(244, 71, 71, 0.1)',
                                borderRadius: '4px',
                                color: '#f44747',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Delete Server"
                            >
                              <Trash2 size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleServer(svr.name)}
                              style={{
                                padding: '5px 8px',
                                background: isEnabled ? 'rgba(78,201,176,0.1)' : 'rgba(255,255,255,0.05)',
                                border: isEnabled ? '1px solid rgba(78,201,176,0.2)' : '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: isEnabled ? '#4ec9b0' : '#888',
                                fontSize: '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}
                            >
                              {isEnabled ? 'ENABLED' : 'DISABLED'}
                            </button>
                          </div>
                        </div>

                        {/* Collapsible Tools List */}
                        {isToolsOpen && svr.status === 'connected' && (
                          <div style={{
                            marginTop: '16px',
                            background: 'rgba(0,0,0,0.15)',
                            border: '1px solid rgba(255,255,255,0.03)',
                            borderRadius: '6px',
                            padding: '16px',
                            animation: 'fadeIn 0.2s ease-out'
                          }}>
                            <h4 style={{ fontSize: '12px', color: '#eee', fontWeight: 600, margin: '0 0 12px 0' }}>Available Tools</h4>
                            {svr.tools && svr.tools.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {svr.tools.map((t: any) => (
                                  <div key={t.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0' }}>
                                      <code style={{ fontSize: '12px', color: '#4fc1ff', fontWeight: 600 }}>{t.name}</code>
                                      <span style={{ fontSize: '10px', color: '#777' }}>({Object.keys(t.inputSchema?.properties || {}).length} params)</span>
                                    </div>
                                    <p style={{ fontSize: '11px', color: '#aaa', margin: '0 0 6px 0', lineHeight: 1.4 }}>{t.description}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div style={{ fontSize: '11px', color: '#777', fontStyle: 'italic' }}>No tools provided by this server</div>
                            )}
                          </div>
                        )}

                        {/* Collapsible Log Console */}
                        {isLogsOpen && (
                          <div style={{
                            marginTop: '16px',
                            animation: 'fadeIn 0.2s ease-out'
                          }}>
                            <h4 style={{ fontSize: '12px', color: '#eee', fontWeight: 600, margin: '0 0 8px 0' }}>Stdout/Stderr Output Logs</h4>
                            <div style={{
                              background: '#0a0a0a',
                              border: '1px solid rgba(255,255,255,0.05)',
                              borderRadius: '6px',
                              padding: '12px',
                              fontFamily: 'monospace',
                              fontSize: '11px',
                              color: '#4ec9b0',
                              maxHeight: '220px',
                              overflowY: 'auto',
                              whiteSpace: 'pre-wrap',
                              lineHeight: '1.4'
                            }}>
                              {svr.logs && svr.logs.length > 0 ? (
                                svr.logs.join('\n')
                              ) : (
                                <span style={{ color: '#555', fontStyle: 'italic' }}>Console log is empty. Waiting for events...</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
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
