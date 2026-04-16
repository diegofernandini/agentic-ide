"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  openFolder: () => electron.ipcRenderer.invoke("open-folder"),
  readDir: (p) => electron.ipcRenderer.invoke("read-dir", p),
  readFile: (p) => electron.ipcRenderer.invoke("read-file", p),
  writeFile: (p, content) => electron.ipcRenderer.invoke("write-file", p, content),
  listFiles: (p) => electron.ipcRenderer.invoke("list-files", p),
  loadSessions: () => electron.ipcRenderer.invoke("load-sessions"),
  saveSessions: (data) => electron.ipcRenderer.invoke("save-sessions", data),
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
  }
});
