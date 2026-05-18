import React from 'react'
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react'
import { FileNode } from '../App'

interface Props {
  nodes: FileNode[]
  onSelect: (path: string) => void
  openDirs: Set<string>
  onToggleDir: (path: string) => void
  onContextMenu?: (path: string, isDir: boolean) => void
  depth?: number
}

export default function FileTree({ nodes, onSelect, openDirs, onToggleDir, onContextMenu, depth = 0 }: Props) {
  return (
    <ul className="file-tree" style={{ paddingLeft: depth === 0 ? 0 : 10 }}>
      {nodes.map(node => (
        <TreeNode
          key={node.path}
          node={node}
          onSelect={onSelect}
          openDirs={openDirs}
          onToggleDir={onToggleDir}
          onContextMenu={onContextMenu}
          depth={depth}
        />
      ))}
    </ul>
  )
}

const FILE_COLORS: Record<string, string> = {
  ts: '#3178c6', tsx: '#61dafb', js: '#f1e05a', jsx: '#61dafb',
  json: '#cbcb41', md: '#b0bec5', css: '#a06ccd', html: '#e34c26',
  py: '#4b8bbe',  rs: '#dea584', go: '#00ADD8', sh: '#89e051',
  svg: '#ffb13b', png: '#90a4ae', jpg: '#90a4ae', gif: '#90a4ae',
  lock: '#777',   yml: '#cbcb41', yaml: '#cbcb41', env: '#aaa',
  toml: '#9c4221', sql: '#e38d40', graphql: '#e535ab',
}

const FILE_LABELS: Record<string, string> = {
  ts: 'ts', tsx: 'tsx', js: 'js', jsx: 'jsx',
  json: '{}', css: 'css', html: 'htm', py: 'py',
  rs: 'rs', go: 'go', md: 'md', sh: 'sh',
  sql: 'sql', toml: 'tml', yml: 'yml', yaml: 'yml',
}

function FileTypeIcon({ name }: { name: string }) {
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  const color = FILE_COLORS[ext] ?? '#9cdcfe'
  const label = FILE_LABELS[ext]

  return (
    <span className="tree-file-badge" style={{ color, borderColor: `${color}40`, background: `${color}10` }}>
      {label ?? '·'}
    </span>
  )
}

function TreeNode({ node, onSelect, openDirs, onToggleDir, onContextMenu, depth }: {
  node: FileNode
  onSelect: (p: string) => void
  openDirs: Set<string>
  onToggleDir: (path: string) => void
  onContextMenu?: (path: string, isDir: boolean) => void
  depth: number
}) {
  const open = openDirs.has(node.path)

  if (node.isDir) {
    return (
      <li>
        <span
          className="tree-dir"
          onClick={() => onToggleDir(node.path)}
          onContextMenu={(e) => { e.preventDefault(); onContextMenu?.(node.path, true) }}
        >
          <span className="tree-chevron">
            {open
              ? <ChevronDown size={11} strokeWidth={2.2} />
              : <ChevronRight size={11} strokeWidth={2.2} />}
          </span>
          <span className="tree-folder-icon">
            {open
              ? <FolderOpen size={14} strokeWidth={1.6} />
              : <Folder size={14} strokeWidth={1.6} />}
          </span>
          <span className="tree-label">{node.name}</span>
        </span>
        {open && (
          <FileTree
            nodes={node.children}
            onSelect={onSelect}
            openDirs={openDirs}
            onToggleDir={onToggleDir}
            onContextMenu={onContextMenu}
            depth={depth + 1}
          />
        )}
      </li>
    )
  }

  return (
    <li>
      <span
        className="tree-file"
        onClick={() => onSelect(node.path)}
        onContextMenu={(e) => { e.preventDefault(); onContextMenu?.(node.path, false) }}
      >
        <span className="tree-chevron" />
        <FileTypeIcon name={node.name} />
        <span className="tree-label">{node.name}</span>
      </span>
    </li>
  )
}
