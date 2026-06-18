import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  openFolder: () => ipcRenderer.invoke('open-folder'),
  readDir: (p: string) => ipcRenderer.invoke('read-dir', p),
  readFile: (p: string) => ipcRenderer.invoke('read-file', p),
  writeFile: (p: string, content: string) => ipcRenderer.invoke('write-file', p, content),
  saveDialog: (defaultPath: string, content: string) => ipcRenderer.invoke('save-dialog', defaultPath, content),
  listFiles: (p: string) => ipcRenderer.invoke('list-files', p),
  deleteFile: (p: string) => ipcRenderer.invoke('delete-file', p),
  renameFile: (oldP: string, newP: string) => ipcRenderer.invoke('rename-file', oldP, newP),
  showContextMenu: (p: string, isDir: boolean) => ipcRenderer.invoke('show-context-menu', p, isDir),
  getGitStatus: (p: string) => ipcRenderer.invoke('git-status', p),
  gitCommit: (p: string, msg: string) => ipcRenderer.invoke('git-commit', p, msg),
  gitGetStagedDiff: (p: string) => ipcRenderer.invoke('git-get-staged-diff', p),
  gitGetFileDiff: (p: string, f: string) => ipcRenderer.invoke('git-get-file-diff', p, f),
  gitStage: (p: string, f: string) => ipcRenderer.invoke('git-stage', p, f),
  gitUnstage: (p: string, f: string) => ipcRenderer.invoke('git-unstage', p, f),
  gitPush: (p: string) => ipcRenderer.invoke('git-push', p),
  gitPull: (p: string) => ipcRenderer.invoke('git-pull', p),
  gitFetch: (p: string) => ipcRenderer.invoke('git-fetch', p),
  gitLog: (p: string) => ipcRenderer.invoke('git-log', p),
  githubLogin: () => ipcRenderer.invoke('github-login'),
  gitIsRepo: (p: string) => ipcRenderer.invoke('git-is-repo', p),
  gitInit: (p: string) => ipcRenderer.invoke('git-init', p),
  gitRemoteAdd: (p: string, name: string, url: string) => ipcRenderer.invoke('git-remote-add', p, name, url),
  gitGetRemote: (p: string) => ipcRenderer.invoke('git-get-remote', p),
  gitPushUpstream: (p: string, branch: string) => ipcRenderer.invoke('git-push-upstream', p, branch),
  githubCreateRepo: (token: string, name: string, isPrivate: boolean, desc: string) => ipcRenderer.invoke('github-create-repo', token, name, isPrivate, desc),
  loadSessions: () => ipcRenderer.invoke('load-sessions'),
  saveSessions: (data: string) => ipcRenderer.invoke('save-sessions', data),
  listBackups: () => ipcRenderer.invoke('list-backups'),
  restoreBackup: (name: string) => ipcRenderer.invoke('restore-backup', name),
  execCommand: (cwd: string, command: string) => ipcRenderer.invoke('exec-command', cwd, command),
  terminalCreate: (id: string, cwd: string) => ipcRenderer.invoke('terminal-create', id, cwd),
  terminalWrite: (id: string, data: string) => ipcRenderer.invoke('terminal-write', id, data),
  terminalResize: (id: string, cols: number, rows: number) => ipcRenderer.invoke('terminal-resize', id, cols, rows),
  terminalKill: (id: string) => ipcRenderer.invoke('terminal-kill', id),
  getHistoricalSessions: () => ipcRenderer.invoke('get-historical-sessions'),
  ollamaTags: () => ipcRenderer.invoke('ollama-tags'),
  ollamaChat: (payload: object) => ipcRenderer.invoke('ollama-chat', payload),
  memory: {
    store: (item: any) => ipcRenderer.invoke('memory-store', item),
    query: (q: string, scope?: string, limit?: number) => ipcRenderer.invoke('memory-query', q, scope, limit),
    all: () => ipcRenderer.invoke('memory-all')
  },
  onTerminalData: (id: string, cb: (data: string) => void) => {
    ipcRenderer.on(`terminal-data-${id}`, (_e, data) => cb(data))
  },
  onTerminalExit: (id: string, cb: () => void) => {
    ipcRenderer.once(`terminal-exit-${id}`, () => cb())
  },
  offTerminalData: (id: string) => {
    ipcRenderer.removeAllListeners(`terminal-data-${id}`)
  },
  onFileChanged: (cb: (data: { event: string, path: string }) => void) => {
    ipcRenderer.on('file-changed', (_e, data) => cb(data))
  },
  offFileChanged: () => {
    ipcRenderer.removeAllListeners('file-changed')
  }
})
