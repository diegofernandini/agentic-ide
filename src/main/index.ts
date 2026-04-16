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
