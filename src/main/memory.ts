import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'

interface MemoryItem {
  id: string
  scope: 'user' | 'repo' | 'session'
  text: string
  meta?: any
  createdAt: string
}

const appSupportDir = path.dirname(app.getPath('userData'))
const dataDir = path.join(appSupportDir, 'agentic-ide')
const memoryDir = path.join(dataDir, 'memory')
const itemsPath = path.join(memoryDir, 'items.json')

let items: MemoryItem[] = []

function load() {
  try {
    if (!fs.existsSync(memoryDir)) return
    const raw = fs.readFileSync(itemsPath, 'utf-8')
    items = JSON.parse(raw || '[]')
  } catch (e) {
    items = []
  }
}

function saveToDisk() {
  try {
    if (!fs.existsSync(memoryDir)) fs.mkdirSync(memoryDir, { recursive: true })
    fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf-8')
  } catch (e) {
    console.error('Failed to write memory items:', e)
  }
}

async function store(item: { id?: string; scope: MemoryItem['scope']; text: string; meta?: any }) {
  const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2,9)}`
  const mi: MemoryItem = { id, scope: item.scope, text: item.text, meta: item.meta || {}, createdAt: new Date().toISOString() }
  items.push(mi)
  saveToDisk()
  return mi
}

async function query(q: string, scope?: string, limit = 5) {
  // If empty query, return most recent items in scope
  const candidates = scope ? items.filter(i => i.scope === scope) : items.slice()
  if (!q || q.trim() === '') {
    return candidates.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit)
  }

  const tokens = q.toLowerCase().split(/\W+/).filter(Boolean)
  function score(text: string) {
    const t = text.toLowerCase()
    let s = 0
    for (const tok of tokens) if (t.includes(tok)) s += 1
    return s
  }

  const scored = candidates.map(c => ({ c, s: score(c.text) }))
    .filter(x => x.s > 0)
    .sort((a,b) => b.s - a.s || b.c.createdAt.localeCompare(a.c.createdAt))
    .slice(0, limit)
    .map(x => x.c)
  return scored
}

async function all() {
  return items.slice()
}

// initialize
load()

export { store, query, all }
