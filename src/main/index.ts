import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import * as fs from 'fs'
import * as path from 'path'
import { join } from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => app.quit())

interface FileNode {
  name: string
  path: string
  isDir: boolean
  children: FileNode[]
}

ipcMain.handle('open-folder', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (result.canceled) return null
  return result.filePaths[0]
})

ipcMain.handle('read-dir', (_e, dirPath: string) => {
  function walk(dir: string): FileNode[] {
    try {
      return fs.readdirSync(dir).map(name => {
        const full = path.join(dir, name)
        const isDir = fs.statSync(full).isDirectory()
        return { name, path: full, isDir, children: isDir ? walk(full) : [] }
      })
    } catch { return [] }
  }
  return walk(dirPath)
})

ipcMain.handle('read-file', (_e, filePath: string) => {
  return fs.readFileSync(filePath, 'utf-8')
})

ipcMain.handle('write-file', (_e, filePath: string, content: string) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content, 'utf-8')
  return true
})

ipcMain.handle('list-files', (_e, dirPath: string) => {
  const IGNORE = new Set(['node_modules', '.git', 'dist', 'out', '.next', '__pycache__', '.venv', 'venv', 'build', 'coverage', '.DS_Store'])
  const results: string[] = []
  function walk(dir: string) {
    try {
      for (const name of fs.readdirSync(dir)) {
        if (IGNORE.has(name)) continue
        const full = path.join(dir, name)
        if (fs.statSync(full).isDirectory()) walk(full)
        else results.push(full)
      }
    } catch {}
  }
  walk(dirPath)
  return results
})

ipcMain.handle('git-status', async (_e, dirPath: string) => {
  const { execSync } = require('child_process')
  try {
    const stdout = execSync('git status --porcelain', { cwd: dirPath, encoding: 'utf-8' })
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: dirPath, encoding: 'utf-8' }).trim()
    
    let ahead = 0
    let behind = 0
    try {
      const syncStatus = execSync('git rev-list --count --left-right HEAD...@{u}', { cwd: dirPath, encoding: 'utf-8' }).trim()
      const parts = syncStatus.split('\t')
      if (parts.length === 2) {
        ahead = parseInt(parts[0])
        behind = parseInt(parts[1])
      }
    } catch {}

    const changes = stdout.split('\n').filter(Boolean).map(line => {
      const status = line.slice(0, 2) // Keep both characters for staging info
      const path = line.slice(3)
      return { status, path }
    })
    
    return { branch, ahead, behind, changes }
  } catch (e) {
    return { branch: '', ahead: 0, behind: 0, changes: [] }
  }
})

ipcMain.handle('git-stage', async (_e, dirPath: string, filePath: string) => {
  const { execSync } = require('child_process')
  try {
    execSync(`git add "${filePath}"`, { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-unstage', async (_e, dirPath: string, filePath: string) => {
  const { execSync } = require('child_process')
  try {
    // If it's a new file (status A), we might need to use reset
    execSync(`git reset HEAD "${filePath}"`, { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-commit', async (_e, dirPath: string, message: string) => {
  const { execSync } = require('child_process')
  try {
    // Only commit staged changes
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-push', async (_e, dirPath: string) => {
  const { execSync } = require('child_process')
  try {
    execSync('git push', { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-pull', async (_e, dirPath: string) => {
  const { execSync } = require('child_process')
  try {
    execSync('git pull', { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-fetch', async (_e, dirPath: string) => {
  const { execSync } = require('child_process')
  try {
    execSync('git fetch', { cwd: dirPath })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
})

ipcMain.handle('git-log', async (_e, dirPath: string) => {
  const { execSync } = require('child_process')
  try {
    const stdout = execSync('git log --oneline -n 20', { cwd: dirPath, encoding: 'utf-8' })
    return stdout.split('\n').filter(Boolean).map(line => {
      const hash = line.slice(0, 7)
      const message = line.slice(8)
      return { hash, message }
    })
  } catch (e) {
    return []
  }
})

ipcMain.handle('github-login', async () => {
  const { shell } = require('electron')
  const CLIENT_ID = 'your_client_id_here' // Placeholder
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`
  shell.openExternal(GITHUB_AUTH_URL)
  return true
})

// Sessions persistence
const sessionsPath = path.join(app.getPath('userData'), 'sessions.json')

ipcMain.handle('load-sessions', () => {
  try {
    if (fs.existsSync(sessionsPath)) {
      return JSON.parse(fs.readFileSync(sessionsPath, 'utf-8'))
    }
  } catch {}
  return null
})

ipcMain.handle('save-sessions', (_e, data: string) => {
  try {
    fs.writeFileSync(sessionsPath, data, 'utf-8')
  } catch {}
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
