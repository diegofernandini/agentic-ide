import { app, BrowserWindow, ipcMain, dialog, Menu, MenuItemConstructorOptions } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { join } from 'path'
import { execFile, exec } from 'child_process'
import { promisify } from 'util'
import * as http from 'http'
import type { FSWatcher } from 'chokidar'
import { McpManager } from './mcp'

const execFileAsync = promisify(execFile)
const execAsync = promisify(exec)
let currentWatcher: FSWatcher | null = null

const forensicsLogPath = path.join(app.getPath('userData'), 'forensics.log')
async function logActivity(type: string, details: any) {
  const entry = JSON.stringify({ timestamp: new Date().toISOString(), type, ...details }) + '\n'
  try { await fs.promises.appendFile(forensicsLogPath, entry, 'utf-8') } catch {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: false  // allow renderer to fetch localhost (Ollama) from file:// context
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
  mcpManager.startAll().catch(console.error)
})
app.on('window-all-closed', () => app.quit())

app.on('before-quit', () => {
  if (currentWatcher) {
    currentWatcher.close()
  }
  // Kill all terminals
  for (const term of terminals.values()) {
    try { term.kill() } catch {}
  }
  mcpManager.stopAll()
})

interface FileNode {
  name: string
  path: string
  isDir: boolean
  children: FileNode[]
}

ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (result.canceled) return null
  const dirPath = result.filePaths[0]
  mcpManager.setWorkspaceRoot(dirPath)
  
  const chokidar = await import('chokidar')
  if (currentWatcher) currentWatcher.close()
  currentWatcher = chokidar.watch(dirPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
  })
  
  currentWatcher.on('all', (event, path) => {
    BrowserWindow.getAllWindows()[0]?.webContents.send('file-changed', { event, path })
  })

  return dirPath
})

ipcMain.handle('read-dir', async (_e, dirPath: string) => {
  async function walk(dir: string): Promise<FileNode[]> {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true })
      return await Promise.all(entries.map(async entry => {
        const full = path.join(dir, entry.name)
        const isDir = entry.isDirectory()
        return { name: entry.name, path: full, isDir, children: isDir ? await walk(full) : [] }
      }))
    } catch { return [] }
  }
  return walk(dirPath)
})

ipcMain.handle('read-file', async (_e, filePath: string) => {
  try {
    return await fs.promises.readFile(filePath, 'utf-8')
  } catch {
    return ''
  }
})

ipcMain.handle('save-dialog', async (_e, defaultPath: string, content: string) => {
  const result = await dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: 'All Files', extensions: ['*'] },
      { name: 'TypeScript', extensions: ['ts', 'tsx'] },
      { name: 'JavaScript', extensions: ['js', 'jsx'] },
      { name: 'Python', extensions: ['py'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: 'JSON', extensions: ['json'] },
      { name: 'CSS', extensions: ['css'] },
      { name: 'HTML', extensions: ['html'] },
    ]
  })
  if (result.canceled || !result.filePath) return null
  await fs.promises.mkdir(path.dirname(result.filePath), { recursive: true })
  await fs.promises.writeFile(result.filePath, content, 'utf-8')
  await logActivity('file-save-as', { path: result.filePath, length: content.length })
  return result.filePath
})

ipcMain.handle('write-file', async (_e, filePath: string, content: string) => {
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
  await fs.promises.writeFile(filePath, content, 'utf-8')
  await logActivity('file-write', { path: filePath, length: content.length })
  return true
})

ipcMain.handle('delete-file', async (_e, p: string) => {
  try {
    await fs.promises.rm(p, { recursive: true, force: true })
    return true
  } catch { return false }
})

ipcMain.handle('rename-file', async (_e, oldPath: string, newPath: string) => {
  try {
    await fs.promises.rename(oldPath, newPath)
    return true
  } catch { return false }
})

ipcMain.handle('show-context-menu', async (_e, itemPath: string, isDir: boolean) => {
  return new Promise<string | null>((resolve) => {
    const template: MenuItemConstructorOptions[] = [
      { label: 'Rename', click: () => resolve('rename') },
      { label: 'Delete', click: () => resolve('delete') }
    ]
    if (isDir) {
      template.unshift(
        { label: 'New File', click: () => resolve('new-file') },
        { label: 'New Folder', click: () => resolve('new-folder') },
        { type: 'separator' }
      )
    }
    const menu = Menu.buildFromTemplate(template)
    menu.once('menu-will-close', () => setTimeout(() => resolve(null), 100))
    menu.popup({ window: BrowserWindow.getAllWindows()[0] })
  })
})

ipcMain.handle('list-files', async (_e, dirPath: string) => {
  const IGNORE = new Set(['node_modules', '.git', 'dist', 'out', '.next', '__pycache__', '.venv', 'venv', 'build', 'coverage', '.DS_Store'])
  const results: string[] = []
  async function walk(dir: string) {
    try {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        if (IGNORE.has(entry.name)) continue
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) await walk(full)
        else results.push(full)
      }
    } catch {}
  }
  await walk(dirPath)
  return results
})

ipcMain.handle('git-status', async (_e, dirPath: string) => {
  try {
    const { stdout } = await execFileAsync('git', ['status', '--porcelain'], { cwd: dirPath, encoding: 'utf-8' })
    
    let branch = 'main'
    try {
      const { stdout: branchOut } = await execFileAsync('git', ['symbolic-ref', '--short', 'HEAD'], { cwd: dirPath, encoding: 'utf-8' })
      branch = branchOut.trim()
    } catch {
      try {
        const { stdout: branchOut } = await execFileAsync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: dirPath, encoding: 'utf-8' })
        branch = branchOut.trim()
      } catch {}
    }
    
    let ahead = 0
    let behind = 0
    try {
      const { stdout: syncStatus } = await execFileAsync('git', ['rev-list', '--count', '--left-right', 'HEAD...@{u}'], { cwd: dirPath, encoding: 'utf-8' })
      const parts = syncStatus.trim().split('\t')
      if (parts.length === 2) {
        ahead = parseInt(parts[0])
        behind = parseInt(parts[1])
      }
    } catch {}

    const changes = stdout.split('\n').filter(Boolean).map(line => {
      const status = line.slice(0, 2)
      const path = line.slice(3)
      return { status, path }
    })
    
    return { branch, ahead, behind, changes }
  } catch (e) {
    return { branch: '', ahead: 0, behind: 0, changes: [] }
  }
})

ipcMain.handle('git-stage', async (_e, dirPath: string, filePath: string) => {
  try {
    await execFileAsync('git', ['add', filePath], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-unstage', async (_e, dirPath: string, filePath: string) => {
  try {
    await execFileAsync('git', ['reset', 'HEAD', filePath], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-commit', async (_e, dirPath: string, message: string) => {
  try {
    await execFileAsync('git', ['commit', '-m', message], { cwd: dirPath })
    await logActivity('git-commit', { dir: dirPath, message })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-get-staged-diff', async (_e, dirPath: string) => {
  try {
    const { stdout } = await execFileAsync('git', ['diff', '--staged'], { cwd: dirPath })
    return stdout
  } catch {
    return ''
  }
})

ipcMain.handle('git-get-file-diff', async (_e, dirPath: string, filePath: string) => {
  try {
    let original = ''
    try {
      const { stdout } = await execFileAsync('git', ['show', `HEAD:${filePath}`], { cwd: dirPath })
      original = stdout
    } catch {}
    const current = await fs.promises.readFile(path.join(dirPath, filePath), 'utf-8')
    return { original, current }
  } catch (e: any) {
    return { original: '', current: '', error: e.message }
  }
})

ipcMain.handle('git-push', async (_e, dirPath: string) => {
  try {
    await execFileAsync('git', ['push'], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-pull', async (_e, dirPath: string) => {
  try {
    await execFileAsync('git', ['pull'], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-fetch', async (_e, dirPath: string) => {
  try {
    await execFileAsync('git', ['fetch'], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-log', async (_e, dirPath: string) => {
  try {
    const { stdout } = await execFileAsync('git', ['log', '--oneline', '-n', '20'], { cwd: dirPath, encoding: 'utf-8' })
    return stdout.split('\n').filter(Boolean).map(line => {
      const hash = line.slice(0, 7)
      const message = line.slice(8)
      return { hash, message }
    })
  } catch (e) {
    return []
  }
})

ipcMain.handle('exec-command', async (_e, dirPath: string, command: string) => {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: dirPath, encoding: 'utf-8', timeout: 60000 })
    return { success: true, stdout, stderr }
  } catch (e: any) {
    return { success: false, error: e.message, stdout: e.stdout, stderr: e.stderr }
  }
})

ipcMain.handle('github-login', async () => {
  return true
})

ipcMain.handle('git-is-repo', async (_e, dirPath: string) => {
  try {
    await execFileAsync('git', ['rev-parse', '--is-inside-work-tree'], { cwd: dirPath })
    return true
  } catch {
    return false
  }
})

ipcMain.handle('git-init', async (_e, dirPath: string) => {
  try {
    await execFileAsync('git', ['init'], { cwd: dirPath })
    await execFileAsync('git', ['checkout', '-b', 'main'], { cwd: dirPath }).catch(() => {})
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-remote-add', async (_e, dirPath: string, name: string, url: string) => {
  try {
    // Remove existing remote with same name if it exists
    await execFileAsync('git', ['remote', 'remove', name], { cwd: dirPath }).catch(() => {})
    await execFileAsync('git', ['remote', 'add', name, url], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-get-remote', async (_e, dirPath: string) => {
  try {
    const { stdout } = await execFileAsync('git', ['remote', 'get-url', 'origin'], { cwd: dirPath, encoding: 'utf-8' })
    const url = stdout.trim()
    return url.replace(/https:\/\/[^@]+@github.com/, 'https://github.com')
  } catch {
    return null
  }
})

ipcMain.handle('git-push-upstream', async (_e, dirPath: string, branch: string) => {
  try {
    await execFileAsync('git', ['push', '-u', 'origin', branch], { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('github-create-repo', async (_e, token: string, repoName: string, isPrivate: boolean, description: string) => {
  return new Promise<{ success: boolean; cloneUrl?: string; error?: string }>((resolve) => {
    const body = JSON.stringify({ name: repoName, private: isPrivate, description, auto_init: false })
    const options = {
      hostname: 'api.github.com',
      path: '/user/repos',
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent': 'agentic-ide'
      }
    }
    const https = require('https')
    const req = https.request(options, (res: any) => {
      let data = ''
      res.on('data', (chunk: any) => { data += chunk })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.clone_url) {
            resolve({ success: true, cloneUrl: json.clone_url })
          } else {
            resolve({ success: false, error: json.message || 'Unknown error' })
          }
        } catch (e: any) {
          resolve({ success: false, error: e.message })
        }
      })
    })
    req.on('error', (e: any) => resolve({ success: false, error: e.message }))
    req.write(body)
    req.end()
  })
})

// Sessions persistence
// Normalize storage directory to a canonical `agentic-ide` folder under
// Application Support to avoid mixing different folder names/casing.
// Directories are created lazily when sessions are saved (not at startup).
const appSupportDir = path.dirname(app.getPath('userData'))
const dataDir = path.join(appSupportDir, 'agentic-ide')
const sessionsPath = path.join(dataDir, 'sessions.json')

const mcpManager = new McpManager(dataDir)

// Ollama proxy — runs in main process (Node.js) to avoid renderer CORS/security restrictions
ipcMain.handle('ollama-tags', async () => {
  return new Promise<string[]>((resolve) => {
    const req = http.get('http://127.0.0.1:11434/api/tags', { timeout: 5000 }, (res) => {
      let body = ''
      res.on('data', chunk => { body += chunk })
      res.on('end', () => {
        try {
          const data = JSON.parse(body)
          const names: string[] = (data.models || []).map((m: { name: string }) => m.name)
          resolve(names)
        } catch {
          resolve([])
        }
      })
    })
    req.on('error', () => resolve([]))
    req.on('timeout', () => { req.destroy(); resolve([]) })
  })
})

ipcMain.handle('ollama-chat', async (_e, payload: object) => {
  return new Promise<string>((resolve, reject) => {
    const body = JSON.stringify(payload)
    const options = {
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 120000
    }
    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Ollama request timed out')) })
    req.write(body)
    req.end()
  })
})

// Memory service (simple file-backed)
import * as memory from './memory'

ipcMain.handle('memory-store', async (_e, item: any) => {
  try { return await memory.store(item) } catch (e) { return null }
})

ipcMain.handle('memory-query', async (_e, q: string, scope?: string, limit?: number) => {
  try { return await memory.query(q, scope, limit || 5) } catch (e) { return [] }
})

ipcMain.handle('memory-all', async () => {
  try { return await memory.all() } catch (e) { return [] }
})

ipcMain.handle('load-sessions', async () => {
  try {
    const data = await fs.promises.readFile(sessionsPath, 'utf-8')
    const parsed = JSON.parse(data)
    let ws: string | null = null
    if (parsed) {
      if (Array.isArray(parsed) && parsed.length > 0) {
        ws = parsed[0].workspace || null
      } else if (typeof parsed === 'object') {
        const sessions = (parsed as any).sessions
        if (Array.isArray(sessions) && sessions.length > 0) {
          ws = sessions[0].workspace || null
        }
      }
    }
    if (ws) {
      mcpManager.setWorkspaceRoot(ws)
    }
    return parsed
  } catch {}
  return null
})

ipcMain.handle('list-backups', async () => {
  try {
    const backupDir = path.join(dataDir, 'backups')
    if (!fs.existsSync(backupDir)) return []
    const files = await fs.promises.readdir(backupDir)
    const backupFiles = files.filter(f => f.startsWith('sessions.')).sort().reverse()
    
    // Only process the 50 most recent backups to avoid OOM with thousands of files
    const recentBackups = backupFiles.slice(0, 50)
    
    const backupsWithDetails = await Promise.all(recentBackups.map(async file => {
      try {
        const filePath = path.join(backupDir, file)
        const content = await fs.promises.readFile(filePath, 'utf-8')
        const sessions = JSON.parse(content)
        const workspaces = new Set<string>()
        let summary = 'No active chats'
        
        if (Array.isArray(sessions)) {
          sessions.forEach((s: any) => {
            if (s.workspace) {
              const name = s.workspace.split(/[\\/]/).pop()
              if (name) workspaces.add(name)
            }
          })
          
          if (sessions.length > 0) {
            // Find the most recently active session
            const activeSess = [...sessions].sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))[0]
            if (activeSess) {
              if (activeSess.messages && activeSess.messages.length > 0) {
                const userMsgs = activeSess.messages.filter((m: any) => m.role === 'user')
                const lastUserMsg = userMsgs[userMsgs.length - 1]
                if (lastUserMsg && lastUserMsg.content) {
                  const text = lastUserMsg.content.trim().replace(/\s+/g, ' ')
                  const preview = text.length > 30 ? text.slice(0, 30) + '...' : text
                  summary = `Prompt: "${preview}"`
                } else {
                  const lastMsg = activeSess.messages[activeSess.messages.length - 1]
                  const text = (lastMsg.content || '').trim().replace(/\s+/g, ' ')
                  const preview = text.length > 30 ? text.slice(0, 30) + '...' : text
                  summary = `Msg: "${preview}"`
                }
              } else {
                summary = `Created "${activeSess.name}"`
              }
            }
          }
        }
        return {
          filename: file,
          workspaces: Array.from(workspaces),
          summary
        }
      } catch {
        return { filename: file, workspaces: [], summary: 'Corrupted backup file' }
      }
    }))
    return backupsWithDetails
  } catch { return [] }
})

ipcMain.handle('restore-backup', async (_e, backupFileName: string) => {
  try {
    const backupPath = path.join(dataDir, 'backups', backupFileName)
    await fs.promises.copyFile(backupPath, sessionsPath)
    await logActivity('snapshot-restore', { snapshot: backupFileName })
    const data = await fs.promises.readFile(sessionsPath, 'utf-8')
    return JSON.parse(data)
  } catch { return null }
})

let lastBackupTime = 0
const BACKUP_THROTTLE_MS = 60_000 // One backup per minute at most
const MAX_BACKUPS = 100

ipcMain.handle('save-sessions', async (_e, data: string) => {
  try {
    // Ensure data dir exists (create lazily when saving sessions).
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

    // Before overwriting, create a throttled timestamped backup copy.
    const now = Date.now()
    if (fs.existsSync(sessionsPath) && (now - lastBackupTime) >= BACKUP_THROTTLE_MS) {
      const backupDir = path.join(dataDir, 'backups')
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir)

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = path.join(backupDir, `sessions.${timestamp}.json`)
      await fs.promises.copyFile(sessionsPath, backupPath)
      lastBackupTime = now

      // Rotate: keep only the most recent MAX_BACKUPS files
      try {
        const files = await fs.promises.readdir(backupDir)
        const backupFiles = files.filter(f => f.startsWith('sessions.')).sort()
        if (backupFiles.length > MAX_BACKUPS) {
          const toDelete = backupFiles.slice(0, backupFiles.length - MAX_BACKUPS)
          await Promise.all(toDelete.map(f => fs.promises.unlink(path.join(backupDir, f)).catch(() => {})))
        }
      } catch {}
    }
    await fs.promises.writeFile(sessionsPath, data, 'utf-8')
    await logActivity('sessions-save', { size: data.length })
  } catch (e) {
    console.error('Failed to save sessions:', e)
  }
})

// Terminal (node-pty)
import * as pty from 'node-pty'
import * as os from 'os'

const terminals = new Map<string, ReturnType<typeof pty.spawn>>()

ipcMain.handle('terminal-create', (_e, id: string, cwd: string) => {
  const shell = process.env.SHELL || (os.platform() === 'win32' ? 'cmd.exe' : 'bash')
  const term = pty.spawn(shell, [], {
    name: 'xterm-256color',
    cols: 80,
    rows: 24,
    cwd: cwd || os.homedir(),
    env: process.env as Record<string, string>
  })
  terminals.set(id, term)
  term.onData(data => {
    BrowserWindow.getAllWindows()[0]?.webContents.send(`terminal-data-${id}`, data)
  })
  term.onExit(() => {
    terminals.delete(id)
    BrowserWindow.getAllWindows()[0]?.webContents.send(`terminal-exit-${id}`)
  })
  return id
})

ipcMain.handle('terminal-write', (_e, id: string, data: string) => {
  terminals.get(id)?.write(data)
})

ipcMain.handle('terminal-resize', (_e, id: string, cols: number, rows: number) => {
  terminals.get(id)?.resize(cols, rows)
})

ipcMain.handle('terminal-kill', (_e, id: string) => {
  terminals.get(id)?.kill()
  terminals.delete(id)
})

ipcMain.handle('get-historical-sessions', async () => {
  const sessionMap = new Map<string, any>()
  
  // 1. Read current active/deleted sessions
  try {
    if (fs.existsSync(sessionsPath)) {
      const data = await fs.promises.readFile(sessionsPath, 'utf-8')
      const current = JSON.parse(data)
      if (Array.isArray(current)) {
        current.forEach(s => {
          if (s && s.id) {
            sessionMap.set(s.id, s)
          }
        })
      } else if (current && typeof current === 'object' && Array.isArray((current as any).sessions)) {
        // Handle case if saved as wrapper object
        (current as any).sessions.forEach((s: any) => {
          if (s && s.id) sessionMap.set(s.id, s)
        })
      }
    }
  } catch (err) {
    console.error('Error reading current sessions:', err)
  }

  // 2. Read backups
  try {
    const backupDir = path.join(dataDir, 'backups')
    if (fs.existsSync(backupDir)) {
      const files = await fs.promises.readdir(backupDir)
      const backupFiles = files.filter(f => f.startsWith('sessions.') && f.endsWith('.json')).sort().reverse()
      
      // Only process the 50 most recent backups to avoid OOM
      const recentBackups = backupFiles.slice(0, 50)
      
      await Promise.all(recentBackups.map(async file => {
        try {
          const filePath = path.join(backupDir, file)
          const data = await fs.promises.readFile(filePath, 'utf-8')
          const sessions = JSON.parse(data)
          if (Array.isArray(sessions)) {
            sessions.forEach(s => {
              if (s && s.id) {
                const existing = sessionMap.get(s.id)
                if (!existing || (s.lastActive > existing.lastActive)) {
                  sessionMap.set(s.id, s)
                }
              }
            })
          }
        } catch {}
      }))
    }
  } catch (err) {
    console.error('Error reading backup sessions:', err)
  }

  return Array.from(sessionMap.values())
})

// MCP Event Handlers
ipcMain.handle('mcp-get-config', () => {
  return mcpManager.getConfig()
})

ipcMain.handle('mcp-save-config', (_e, config) => {
  mcpManager.saveConfig(config)
  return true
})

ipcMain.handle('mcp-get-servers', () => {
  return mcpManager.getServersStatus()
})

ipcMain.handle('mcp-restart-server', (_e, name) => {
  return mcpManager.restartServer(name)
})

ipcMain.handle('mcp-call-tool', (_e, serverName, toolName, args) => {
  return mcpManager.callTool(serverName, toolName, args)
})
