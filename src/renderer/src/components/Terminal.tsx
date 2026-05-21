import React, { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import '@xterm/xterm/css/xterm.css'

interface TermTab {
  id: string
  name: string
}

interface Props {
  cwd: string | null
}

let tabCounter = 1

export default function TerminalPanel({ cwd }: Props) {
  const [tabs, setTabs] = useState<TermTab[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const instances = useRef<Map<string, { xterm: XTerm; fit: FitAddon }>>(new Map())

  function createTab() {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
    const name = `bash ${tabCounter++}`
    setTabs(prev => [...prev, { id, name }])
    setActiveId(id)
    // Spawn after render
    setTimeout(() => spawnTerminal(id), 50)
  }

  async function spawnTerminal(id: string) {
    const el = document.getElementById(`xterm-${id}`)
    if (!el) return

    const xterm = new XTerm({
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#d4d4d4',
        selectionBackground: '#264f78',
        black: '#1e1e1e', brightBlack: '#555',
        red: '#f44747', brightRed: '#f44747',
        green: '#4ec9b0', brightGreen: '#4ec9b0',
        yellow: '#dcdcaa', brightYellow: '#dcdcaa',
        blue: '#569cd6', brightBlue: '#569cd6',
        magenta: '#c586c0', brightMagenta: '#c586c0',
        cyan: '#9cdcfe', brightCyan: '#9cdcfe',
        white: '#d4d4d4', brightWhite: '#ffffff',
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 13,
      lineHeight: 1.4,
      cursorBlink: true,
      scrollback: 5000,
    })

    const fit = new FitAddon()
    xterm.loadAddon(fit)
    xterm.loadAddon(new WebLinksAddon())
    xterm.open(el)
    fit.fit()

    instances.current.set(id, { xterm, fit })

    await window.api.terminalCreate(id, cwd || '')

    window.api.onTerminalData(id, data => xterm.write(data))
    window.api.onTerminalExit(id, () => {
      xterm.write('\r\n\x1b[31m[Process exited]\x1b[0m\r\n')
    })

    xterm.onData(data => window.api.terminalWrite(id, data))

    // Resize observer
    const ro = new ResizeObserver(() => {
      fit.fit()
      const { cols, rows } = xterm
      window.api.terminalResize(id, cols, rows)
    })
    ro.observe(el)
  }

  function closeTab(id: string) {
    window.api.terminalKill(id)
    window.api.offTerminalData(id)
    instances.current.get(id)?.xterm.dispose()
    instances.current.delete(id)
    setTabs(prev => {
      const next = prev.filter(t => t.id !== id)
      if (id === activeId) setActiveId(next.length > 0 ? next[next.length - 1].id : null)
      return next
    })
  }

  // Show/hide xterm divs based on active tab
  useEffect(() => {
    tabs.forEach(t => {
      const el = document.getElementById(`xterm-${t.id}`)
      if (el) el.style.display = t.id === activeId ? 'block' : 'none'
    })
    // Refit active
    if (activeId) {
      setTimeout(() => instances.current.get(activeId)?.fit.fit(), 30)
    }
  }, [activeId, tabs])

  // Create first tab on mount and cleanup on unmount
  useEffect(() => {
    tabCounter = 1
    createTab()
    return () => {
      instances.current.forEach((value, id) => {
        window.api.terminalKill(id)
        window.api.offTerminalData(id)
        value.xterm.dispose()
      })
      instances.current.clear()
    }
  }, [])

  return (
    <div className="terminal-panel">
      <div className="terminal-tabbar">
        <div className="terminal-tabs">
          {tabs.map(t => (
            <div
              key={t.id}
              className={`terminal-tab ${t.id === activeId ? 'terminal-tab--active' : ''}`}
              onClick={() => setActiveId(t.id)}
            >
              <span>{t.name}</span>
              <button
                className="terminal-tab-close"
                onClick={e => { e.stopPropagation(); closeTab(t.id) }}
              >×</button>
            </div>
          ))}
        </div>
        <div className="terminal-tabbar-actions">
          <button className="terminal-action-btn" onClick={createTab} title="New Terminal">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2z"/>
            </svg>
          </button>
          {activeId && (
            <button className="terminal-action-btn" onClick={() => closeTab(activeId)} title="Kill Terminal">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="terminal-body" ref={containerRef}>
        {tabs.map(t => (
          <div
            key={t.id}
            id={`xterm-${t.id}`}
            className="terminal-xterm"
            style={{ display: t.id === activeId ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  )
}
