import React from 'react'
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
    <ul className="file-tree" style={{ paddingLeft: depth * 12 }}>
      {nodes.map(node => (
        <TreeNode key={node.path} node={node} onSelect={onSelect} openDirs={openDirs} onToggleDir={onToggleDir} onContextMenu={onContextMenu} depth={depth} />
      ))}
    </ul>
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
          {open ? '▾' : '▸'} {node.name}
        </span>
        {open && <FileTree nodes={node.children} onSelect={onSelect} openDirs={openDirs} onToggleDir={onToggleDir} onContextMenu={onContextMenu} depth={depth + 1} />}
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
        {'  '}{node.name}
      </span>
    </li>
  )
}
