import React, { useRef, useState } from 'react'
import MonacoEditor, { type Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'

interface Props {
  path: string | null
  content: string
  onChange: (v: string) => void
  onSave: (v: string) => void
}

function getLanguage(path: string | null): string {
  if (!path) return 'plaintext'
  const ext = path.split('.').pop() || ''
  const map: Record<string, string> = {
    ts: 'typescript', tsx: 'typescript', js: 'javascript', jsx: 'javascript',
    py: 'python', md: 'markdown', json: 'json', css: 'css', html: 'html',
    sh: 'shell', yaml: 'yaml', yml: 'yaml', rs: 'rust', go: 'go'
  }
  return map[ext] || 'plaintext'
}

function getBreadcrumbs(path: string | null): string[] {
  if (!path) return []
  // Show last 3 segments for brevity
  const parts = path.split('/')
  return parts.slice(-3)
}

export default function Editor({ path, content, onChange, onSave }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on')

  function handleMount(ed: editor.IStandaloneCodeEditor, monaco: Monaco) {
    editorRef.current = ed

    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSave(ed.getValue())
    })
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      ed.getAction('actions.find')?.run()
    })
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
      ed.getAction('editor.action.startFindReplaceAction')?.run()
    })
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => {
      ed.getAction('editor.action.nextMatchFindAction')?.run()
    })
    ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyG, () => {
      ed.getAction('editor.action.previousMatchFindAction')?.run()
    })
  }

  function triggerFind() {
    editorRef.current?.getAction('actions.find')?.run()
    editorRef.current?.focus()
  }

  function triggerReplace() {
    editorRef.current?.getAction('editor.action.startFindReplaceAction')?.run()
    editorRef.current?.focus()
  }

  function toggleWordWrap() {
    const next = wordWrap === 'on' ? 'off' : 'on'
    setWordWrap(next)
    editorRef.current?.updateOptions({ wordWrap: next })
  }

  function formatDocument() {
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }

  return (
    <div className="editor-container">
      {path ? (
        <>
          {/* Action bar */}
          <div className="editor-breadcrumb">
            <div className="breadcrumb-actions">
              <button title="Find (⌘F)" onClick={triggerFind} className="bc-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
              </button>
              <button title="Find & Replace (⌘H)" onClick={triggerReplace} className="bc-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </button>
              <button title="Format Document" onClick={formatDocument} className="bc-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2h12v1.5H2V2zm0 4h8v1.5H2V6zm0 4h10v1.5H2V10zm0 4h6v1.5H2V14z"/>
                </svg>
              </button>
              <button
                title={`Word Wrap: ${wordWrap === 'on' ? 'On' : 'Off'}`}
                onClick={toggleWordWrap}
                className={`bc-btn ${wordWrap === 'on' ? 'bc-btn--active' : ''}`}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2h12v1.5H2V2zm0 4h9.5v1.5H2V6zm9.5 0h1a2 2 0 0 1 0 4h-1v1.5l-2-2.25L11.5 7V8.5h1a.5.5 0 0 0 0-1h-1V6zM2 10h6v1.5H2V10zm0 4h8v1.5H2V14z"/>
                </svg>
              </button>
              <button title="Save (⌘S)" onClick={() => onSave(editorRef.current?.getValue() || content)} className="bc-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4.5L10.5 1H2zm0 1h8v3h3v9H2V2zm2 8v3h6v-3H4zm1-5h4v1H5V5z"/>
                </svg>
              </button>
            </div>
          </div>

          <MonacoEditor
            height="calc(100vh - 36px)"
            language={getLanguage(path)}
            value={content}
            theme="vs-dark"
            onChange={v => onChange(v || '')}
            onMount={handleMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap,
              find: {
                addExtraSpaceOnTop: false,
                autoFindInSelection: 'never',
                seedSearchStringFromSelection: 'always'
              }
            }}
          />
        </>
      ) : (
        <div className="editor-empty">Open a folder and select a file</div>
      )}
    </div>
  )
}
