import React from 'react'

interface Props {
  filename: string
  original: string
  current: string
}

export default function DiffView({ filename, original, current }: Props) {
  const originalLines = original.split('\n')
  const currentLines = current.split('\n')

  // Simple line-by-line diff logic
  // In a real app, you'd use jsdiff or similar
  const maxLines = Math.max(originalLines.length, currentLines.length)

  return (
    <div className="diff-view">
      <div className="diff-header">
        <span className="diff-title">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
          {filename} (Diff)
        </span>
      </div>
      <div className="diff-container">
        <div className="diff-side diff-side--original">
          <div className="diff-side-header">Original (HEAD)</div>
          <div className="diff-content">
            {originalLines.map((line, i) => (
              <div key={i} className="diff-line">
                <span className="diff-line-number">{i + 1}</span>
                <pre className="diff-line-content">{line || ' '}</pre>
              </div>
            ))}
          </div>
        </div>
        <div className="diff-side diff-side--current">
          <div className="diff-side-header">Modified (Working Tree)</div>
          <div className="diff-content">
            {currentLines.map((line, i) => {
              const isDifferent = originalLines[i] !== currentLines[i]
              return (
                <div key={i} className={`diff-line ${isDifferent ? 'diff-line--changed' : ''}`}>
                  <span className="diff-line-number">{i + 1}</span>
                  <pre className="diff-line-content">{line || ' '}</pre>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
