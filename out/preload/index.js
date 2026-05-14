"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  openFolder: () => electron.ipcRenderer.invoke("open-folder"),
  readDir: (p) => electron.ipcRenderer.invoke("read-dir", p),
  readFile: (p) => electron.ipcRenderer.invoke("read-file", p),
  writeFile: (p, content) => electron.ipcRenderer.invoke("write-file", p, content),
  listFiles: (p) => electron.ipcRenderer.invoke("list-files", p),
  deleteFile: (p) => electron.ipcRenderer.invoke("delete-file", p),
  renameFile: (oldP, newP) => electron.ipcRenderer.invoke("rename-file", oldP, newP),
  showContextMenu: (p, isDir) => electron.ipcRenderer.invoke("show-context-menu", p, isDir),
  getGitStatus: (p) => electron.ipcRenderer.invoke("git-status", p),
  gitCommit: (p, msg) => electron.ipcRenderer.invoke("git-commit", p, msg),
  gitGetStagedDiff: (p) => electron.ipcRenderer.invoke("git-get-staged-diff", p),
  gitGetFileDiff: (p, f) => electron.ipcRenderer.invoke("git-get-file-diff", p, f),
  gitStage: (p, f) => electron.ipcRenderer.invoke("git-stage", p, f),
  gitUnstage: (p, f) => electron.ipcRenderer.invoke("git-unstage", p, f),
  gitPush: (p) => electron.ipcRenderer.invoke("git-push", p),
  gitPull: (p) => electron.ipcRenderer.invoke("git-pull", p),
  gitFetch: (p) => electron.ipcRenderer.invoke("git-fetch", p),
  gitLog: (p) => electron.ipcRenderer.invoke("git-log", p),
  githubLogin: () => electron.ipcRenderer.invoke("github-login"),
  loadSessions: () => electron.ipcRenderer.invoke("load-sessions"),
  saveSessions: (data) => electron.ipcRenderer.invoke("save-sessions", data),
  listBackups: () => electron.ipcRenderer.invoke("list-backups"),
  restoreBackup: (name) => electron.ipcRenderer.invoke("restore-backup", name),
  terminalCreate: (id, cwd) => electron.ipcRenderer.invoke("terminal-create", id, cwd),
  terminalWrite: (id, data) => electron.ipcRenderer.invoke("terminal-write", id, data),
  terminalResize: (id, cols, rows) => electron.ipcRenderer.invoke("terminal-resize", id, cols, rows),
  terminalKill: (id) => electron.ipcRenderer.invoke("terminal-kill", id),
  onTerminalData: (id, cb) => {
    electron.ipcRenderer.on(`terminal-data-${id}`, (_e, data) => cb(data));
  },
  onTerminalExit: (id, cb) => {
    electron.ipcRenderer.once(`terminal-exit-${id}`, () => cb());
  },
  offTerminalData: (id) => {
    electron.ipcRenderer.removeAllListeners(`terminal-data-${id}`);
  },
  onFileChanged: (cb) => {
    electron.ipcRenderer.on("file-changed", (_e, data) => cb(data));
  },
  offFileChanged: () => {
    electron.ipcRenderer.removeAllListeners("file-changed");
  }
});
