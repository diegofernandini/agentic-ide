import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  readDir: (p: string) => ipcRenderer.invoke('read-dir', p),
  readFile: (p: string) => ipcRenderer.invoke('read-file', p),
  writeFile: (p: string, content: string) => ipcRenderer.invoke('write-file', p, content),
  listFiles: (p: string) => ipcRenderer.invoke('list-files', p),
  getGitStatus: (p: string) => ipcRenderer.invoke('git-status', p),
  gitCommit: (p: string, msg: string) => ipcRenderer.invoke('git-commit', p, msg),
  gitStage: (p: string, f: string) => ipcRenderer.invoke('git-stage', p, f),
  gitUnstage: (p: string, f: string) => ipcRenderer.invoke('git-unstage', p, f),
  gitPush: (p: string) => ipcRenderer.invoke('git-push', p),
  gitPull: (p: string) => ipcRenderer.invoke('git-pull', p),
  gitFetch: (p: string) => ipcRenderer.invoke('git-fetch', p),
  gitLog: (p: string) => ipcRenderer.invoke('git-log', p),
  githubLogin: () => ipcRenderer.invoke('github-login'),
  loadSessions: () => ipcRenderer.invoke('load-sessions'),
  saveSessions: (data: string) => ipcRenderer.invoke('save-sessions', data),
  terminalCreate: (id: string, cwd: string) => ipcRenderer.invoke('terminal-create', id, cwd),
  terminalWrite: (id: string, data: string) => ipcRenderer.invoke('terminal-write', id, data),
  terminalResize: (id: string, cols: number, rows: number) => ipcRenderer.invoke('terminal-resize', id, cols, rows),
  terminalKill: (id: string) => ipcRenderer.invoke('terminal-kill', id),
  onTerminalData: (id: string, cb: (data: string) => void) => {
    ipcRenderer.on(`terminal-data-${id}`, (_e, data) => cb(data))
  },
  onTerminalExit: (id: string, cb: () => void) => {
    ipcRenderer.once(`terminal-exit-${id}`, () => cb())
  },
  offTerminalData: (id: string) => {
    ipcRenderer.removeAllListeners(`terminal-data-${id}`)
  }
})
