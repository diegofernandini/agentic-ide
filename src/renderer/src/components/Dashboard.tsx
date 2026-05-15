import React from 'react'

const MOCK_DATA = {
  totalTokens: 1245000,
  cost: '$12.45',
  byModel: [
    { name: 'qwen3-coder:latest', tokens: 850000, percentage: 68, color: '#4ec9b0' },
    { name: 'llama3:8b', tokens: 245000, percentage: 20, color: '#007acc' },
    { name: 'gemini-3.1-pro', tokens: 150000, percentage: 12, color: '#ce9178' },
  ],
  byMode: [
    { name: 'Agent', tokens: 950000, percentage: 76, color: '#4ec9b0' },
    { name: 'Plan', tokens: 180000, percentage: 14, color: '#007acc' },
    { name: 'Ask', tokens: 115000, percentage: 10, color: '#dcdcaa' },
  ]
}

export default function Dashboard() {
  return (
    <div className="dashboard-container" style={{ 
      padding: '40px', 
      color: '#d4d4d4', 
      overflowY: 'auto', 
      height: '100%',
      background: 'linear-gradient(135deg, #1e1e1e 0%, #141414 100%)'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '48px' }}>
          <h1 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px', fontWeight: 300, letterSpacing: '-0.5px' }}>
            System <span style={{ fontWeight: 600 }}>Analytics</span>
          </h1>
          <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.6 }}>
            Real-time administrative overview of LLM performance, token consumption, and projected infrastructure costs.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="stat-card">
            <label>Total Tokens Consumed</label>
            <value style={{ color: '#4ec9b0' }}>{(MOCK_DATA.totalTokens / 1000000).toFixed(2)}M</value>
            <div className="stat-trend">+12% from last session</div>
          </div>
          <div className="stat-card">
            <label>Estimated Session Cost</label>
            <value style={{ color: '#007acc' }}>{MOCK_DATA.cost}</value>
            <div className="stat-trend">Projected: $45.00/mo</div>
          </div>
          <div className="stat-card">
            <label>Active LLM Instances</label>
            <value style={{ color: '#ce9178' }}>{MOCK_DATA.byModel.length}</value>
            <div className="stat-trend">Ollama / Gemini Hybrid</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* By Model Section */}
          <section className="usage-section">
            <h2 className="section-title">Resource Distribution (Models)</h2>
            <div className="usage-list">
              {MOCK_DATA.byModel.map(m => (
                <div key={m.name} className="usage-item">
                  <div className="usage-info">
                    <span className="usage-name">{m.name}</span>
                    <span className="usage-value">{m.tokens.toLocaleString()} tkns</span>
                  </div>
                  <div className="bar-wrapper">
                    <div className="bar-fill" style={{ width: m.percentage + '%', backgroundColor: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* By Mode Section */}
          <section className="usage-section">
            <h2 className="section-title">Activity Breakdown (Modes)</h2>
            <div className="usage-list">
              {MOCK_DATA.byMode.map(m => (
                <div key={m.name} className="usage-item">
                  <div className="usage-info">
                    <span className="usage-name">{m.name}</span>
                    <span className="usage-value">{m.percentage}% volume</span>
                  </div>
                  <div className="bar-wrapper">
                    <div className="bar-fill" style={{ width: m.percentage + '%', backgroundColor: m.color }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stat-card {
          background: rgba(37, 37, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 24px;
          transition: transform 0.2s, border-color 0.2s;
        }
        .stat-card:hover {
          border-color: rgba(0, 122, 204, 0.3);
          transform: translateY(-2px);
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
        }
        .bar-fill {
          height: 100%;
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(0,0,0,0.4);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}} />
    </div>
  )
}
