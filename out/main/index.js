"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const util = require("util");
const pty = require("node-pty");
const os = require("os");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
const pty__namespace = /* @__PURE__ */ _interopNamespaceDefault(pty);
const os__namespace = /* @__PURE__ */ _interopNamespaceDefault(os);
const execFileAsync = util.promisify(child_process.execFile);
let currentWatcher = null;
const forensicsLogPath = path__namespace.join(electron.app.getPath("userData"), "forensics.log");
async function logActivity(type, details) {
  const entry = JSON.stringify({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), type, ...details }) + "\n";
  try {
    await fs__namespace.promises.appendFile(forensicsLogPath, entry, "utf-8");
  } catch {
  }
}
function createWindow() {
  const win = new electron.BrowserWindow({
    width: 1400,
    height: 900,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => electron.app.quit());
electron.app.on("before-quit", () => {
  if (currentWatcher) {
    currentWatcher.close();
  }
  for (const term of terminals.values()) {
    try {
      term.kill();
    } catch {
    }
  }
});
electron.ipcMain.handle("open-folder", async () => {
  const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled) return null;
  const dirPath = result.filePaths[0];
  const chokidar = await import("chokidar");
  if (currentWatcher) currentWatcher.close();
  currentWatcher = chokidar.watch(dirPath, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
  });
  currentWatcher.on("all", (event, path2) => {
    electron.BrowserWindow.getAllWindows()[0]?.webContents.send("file-changed", { event, path: path2 });
  });
  return dirPath;
});
electron.ipcMain.handle("read-dir", async (_e, dirPath) => {
  async function walk(dir) {
    try {
      const entries = await fs__namespace.promises.readdir(dir, { withFileTypes: true });
      return await Promise.all(entries.map(async (entry) => {
        const full = path__namespace.join(dir, entry.name);
        const isDir = entry.isDirectory();
        return { name: entry.name, path: full, isDir, children: isDir ? await walk(full) : [] };
      }));
    } catch {
      return [];
    }
  }
  return walk(dirPath);
});
electron.ipcMain.handle("read-file", async (_e, filePath) => {
  try {
    return await fs__namespace.promises.readFile(filePath, "utf-8");
  } catch {
    return "";
  }
});
electron.ipcMain.handle("save-dialog", async (_e, defaultPath, content) => {
  const result = await electron.dialog.showSaveDialog({
    defaultPath,
    filters: [
      { name: "All Files", extensions: ["*"] },
      { name: "TypeScript", extensions: ["ts", "tsx"] },
      { name: "JavaScript", extensions: ["js", "jsx"] },
      { name: "Python", extensions: ["py"] },
      { name: "Markdown", extensions: ["md"] },
      { name: "JSON", extensions: ["json"] },
      { name: "CSS", extensions: ["css"] },
      { name: "HTML", extensions: ["html"] }
    ]
  });
  if (result.canceled || !result.filePath) return null;
  await fs__namespace.promises.mkdir(path__namespace.dirname(result.filePath), { recursive: true });
  await fs__namespace.promises.writeFile(result.filePath, content, "utf-8");
  await logActivity("file-save-as", { path: result.filePath, length: content.length });
  return result.filePath;
});
electron.ipcMain.handle("write-file", async (_e, filePath, content) => {
  await fs__namespace.promises.mkdir(path__namespace.dirname(filePath), { recursive: true });
  await fs__namespace.promises.writeFile(filePath, content, "utf-8");
  await logActivity("file-write", { path: filePath, length: content.length });
  return true;
});
electron.ipcMain.handle("delete-file", async (_e, p) => {
  try {
    await fs__namespace.promises.rm(p, { recursive: true, force: true });
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("rename-file", async (_e, oldPath, newPath) => {
  try {
    await fs__namespace.promises.rename(oldPath, newPath);
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("show-context-menu", async (_e, itemPath, isDir) => {
  return new Promise((resolve) => {
    const template = [
      { label: "Rename", click: () => resolve("rename") },
      { label: "Delete", click: () => resolve("delete") }
    ];
    if (isDir) {
      template.unshift(
        { label: "New File", click: () => resolve("new-file") },
        { label: "New Folder", click: () => resolve("new-folder") },
        { type: "separator" }
      );
    }
    const menu = electron.Menu.buildFromTemplate(template);
    menu.once("menu-will-close", () => setTimeout(() => resolve(null), 100));
    menu.popup({ window: electron.BrowserWindow.getAllWindows()[0] });
  });
});
electron.ipcMain.handle("list-files", async (_e, dirPath) => {
  const IGNORE = /* @__PURE__ */ new Set(["node_modules", ".git", "dist", "out", ".next", "__pycache__", ".venv", "venv", "build", "coverage", ".DS_Store"]);
  const results = [];
  async function walk(dir) {
    try {
      const entries = await fs__namespace.promises.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (IGNORE.has(entry.name)) continue;
        const full = path__namespace.join(dir, entry.name);
        if (entry.isDirectory()) await walk(full);
        else results.push(full);
      }
    } catch {
    }
  }
  await walk(dirPath);
  return results;
});
electron.ipcMain.handle("git-status", async (_e, dirPath) => {
  try {
    const { stdout } = await execFileAsync("git", ["status", "--porcelain"], { cwd: dirPath, encoding: "utf-8" });
    const { stdout: branchOut } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: dirPath, encoding: "utf-8" });
    const branch = branchOut.trim();
    let ahead = 0;
    let behind = 0;
    try {
      const { stdout: syncStatus } = await execFileAsync("git", ["rev-list", "--count", "--left-right", "HEAD...@{u}"], { cwd: dirPath, encoding: "utf-8" });
      const parts = syncStatus.trim().split("	");
      if (parts.length === 2) {
        ahead = parseInt(parts[0]);
        behind = parseInt(parts[1]);
      }
    } catch {
    }
    const changes = stdout.split("\n").filter(Boolean).map((line) => {
      const status = line.slice(0, 2);
      const path2 = line.slice(3);
      return { status, path: path2 };
    });
    return { branch, ahead, behind, changes };
  } catch (e) {
    return { branch: "", ahead: 0, behind: 0, changes: [] };
  }
});
electron.ipcMain.handle("git-stage", async (_e, dirPath, filePath) => {
  try {
    await execFileAsync("git", ["add", filePath], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-unstage", async (_e, dirPath, filePath) => {
  try {
    await execFileAsync("git", ["reset", "HEAD", filePath], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-commit", async (_e, dirPath, message) => {
  try {
    await execFileAsync("git", ["commit", "-m", message], { cwd: dirPath });
    await logActivity("git-commit", { dir: dirPath, message });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-get-staged-diff", async (_e, dirPath) => {
  try {
    const { stdout } = await execFileAsync("git", ["diff", "--staged"], { cwd: dirPath });
    return stdout;
  } catch {
    return "";
  }
});
electron.ipcMain.handle("git-get-file-diff", async (_e, dirPath, filePath) => {
  try {
    let original = "";
    try {
      const { stdout } = await execFileAsync("git", ["show", `HEAD:${filePath}`], { cwd: dirPath });
      original = stdout;
    } catch {
    }
    const current = await fs__namespace.promises.readFile(path__namespace.join(dirPath, filePath), "utf-8");
    return { original, current };
  } catch (e) {
    return { original: "", current: "", error: e.message };
  }
});
electron.ipcMain.handle("git-push", async (_e, dirPath) => {
  try {
    await execFileAsync("git", ["push"], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-pull", async (_e, dirPath) => {
  try {
    await execFileAsync("git", ["pull"], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-fetch", async (_e, dirPath) => {
  try {
    await execFileAsync("git", ["fetch"], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-log", async (_e, dirPath) => {
  try {
    const { stdout } = await execFileAsync("git", ["log", "--oneline", "-n", "20"], { cwd: dirPath, encoding: "utf-8" });
    return stdout.split("\n").filter(Boolean).map((line) => {
      const hash = line.slice(0, 7);
      const message = line.slice(8);
      return { hash, message };
    });
  } catch (e) {
    return [];
  }
});
electron.ipcMain.handle("github-login", async () => {
  const { shell } = require("electron");
  const CLIENT_ID = "your_client_id_here";
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
  shell.openExternal(GITHUB_AUTH_URL);
  return true;
});
const sessionsPath = path__namespace.join(electron.app.getPath("userData"), "sessions.json");
electron.ipcMain.handle("load-sessions", async () => {
  try {
    const data = await fs__namespace.promises.readFile(sessionsPath, "utf-8");
    return JSON.parse(data);
  } catch {
  }
  return null;
});
electron.ipcMain.handle("list-backups", async () => {
  try {
    const backupDir = path__namespace.join(electron.app.getPath("userData"), "backups");
    if (!fs__namespace.existsSync(backupDir)) return [];
    const files = await fs__namespace.promises.readdir(backupDir);
    const backupFiles = files.filter((f) => f.startsWith("sessions.")).sort().reverse();
    const backupsWithDetails = await Promise.all(backupFiles.map(async (file) => {
      try {
        const filePath = path__namespace.join(backupDir, file);
        const content = await fs__namespace.promises.readFile(filePath, "utf-8");
        const sessions = JSON.parse(content);
        const workspaces = /* @__PURE__ */ new Set();
        let summary = "No active chats";
        if (Array.isArray(sessions)) {
          sessions.forEach((s) => {
            if (s.workspace) {
              const name = s.workspace.split(/[\\/]/).pop();
              if (name) workspaces.add(name);
            }
          });
          if (sessions.length > 0) {
            const activeSess = [...sessions].sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))[0];
            if (activeSess) {
              if (activeSess.messages && activeSess.messages.length > 0) {
                const userMsgs = activeSess.messages.filter((m) => m.role === "user");
                const lastUserMsg = userMsgs[userMsgs.length - 1];
                if (lastUserMsg && lastUserMsg.content) {
                  const text = lastUserMsg.content.trim().replace(/\s+/g, " ");
                  const preview = text.length > 30 ? text.slice(0, 30) + "..." : text;
                  summary = `Prompt: "${preview}"`;
                } else {
                  const lastMsg = activeSess.messages[activeSess.messages.length - 1];
                  const text = (lastMsg.content || "").trim().replace(/\s+/g, " ");
                  const preview = text.length > 30 ? text.slice(0, 30) + "..." : text;
                  summary = `Msg: "${preview}"`;
                }
              } else {
                summary = `Created "${activeSess.name}"`;
              }
            }
          }
        }
        return {
          filename: file,
          workspaces: Array.from(workspaces),
          summary
        };
      } catch {
        return { filename: file, workspaces: [], summary: "Corrupted backup file" };
      }
    }));
    return backupsWithDetails;
  } catch {
    return [];
  }
});
electron.ipcMain.handle("restore-backup", async (_e, backupFileName) => {
  try {
    const backupPath = path__namespace.join(electron.app.getPath("userData"), "backups", backupFileName);
    await fs__namespace.promises.copyFile(backupPath, sessionsPath);
    await logActivity("snapshot-restore", { snapshot: backupFileName });
    const data = await fs__namespace.promises.readFile(sessionsPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
});
electron.ipcMain.handle("save-sessions", async (_e, data) => {
  try {
    if (fs__namespace.existsSync(sessionsPath)) {
      const backupDir = path__namespace.join(electron.app.getPath("userData"), "backups");
      if (!fs__namespace.existsSync(backupDir)) fs__namespace.mkdirSync(backupDir);
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
      const backupPath = path__namespace.join(backupDir, `sessions.${timestamp}.json`);
      await fs__namespace.promises.copyFile(sessionsPath, backupPath);
      const backups = (await fs__namespace.promises.readdir(backupDir)).filter((f) => f.startsWith("sessions.")).sort().reverse();
      if (backups.length > 10) {
        for (const old of backups.slice(10)) {
          try {
            await fs__namespace.promises.unlink(path__namespace.join(backupDir, old));
          } catch (err) {
            if (err.code !== "ENOENT") console.error("Failed to unlink backup:", err);
          }
        }
      }
    }
    await fs__namespace.promises.writeFile(sessionsPath, data, "utf-8");
    await logActivity("sessions-save", { size: data.length });
  } catch (e) {
    console.error("Failed to save sessions:", e);
  }
});
const terminals = /* @__PURE__ */ new Map();
electron.ipcMain.handle("terminal-create", (_e, id, cwd) => {
  const shell = process.env.SHELL || (os__namespace.platform() === "win32" ? "cmd.exe" : "bash");
  const term = pty__namespace.spawn(shell, [], {
    name: "xterm-256color",
    cols: 80,
    rows: 24,
    cwd: cwd || os__namespace.homedir(),
    env: process.env
  });
  terminals.set(id, term);
  term.onData((data) => {
    electron.BrowserWindow.getAllWindows()[0]?.webContents.send(`terminal-data-${id}`, data);
  });
  term.onExit(() => {
    terminals.delete(id);
    electron.BrowserWindow.getAllWindows()[0]?.webContents.send(`terminal-exit-${id}`);
  });
  return id;
});
electron.ipcMain.handle("terminal-write", (_e, id, data) => {
  terminals.get(id)?.write(data);
});
electron.ipcMain.handle("terminal-resize", (_e, id, cols, rows) => {
  terminals.get(id)?.resize(cols, rows);
});
electron.ipcMain.handle("terminal-kill", (_e, id) => {
  terminals.get(id)?.kill();
  terminals.delete(id);
});
electron.ipcMain.handle("get-historical-sessions", async () => {
  const sessionMap = /* @__PURE__ */ new Map();
  try {
    if (fs__namespace.existsSync(sessionsPath)) {
      const data = await fs__namespace.promises.readFile(sessionsPath, "utf-8");
      const current = JSON.parse(data);
      if (Array.isArray(current)) {
        current.forEach((s) => {
          if (s && s.id) {
            sessionMap.set(s.id, s);
          }
        });
      } else if (current && typeof current === "object" && Array.isArray(current.sessions)) {
        current.sessions.forEach((s) => {
          if (s && s.id) sessionMap.set(s.id, s);
        });
      }
    }
  } catch (err) {
    console.error("Error reading current sessions:", err);
  }
  try {
    const backupDir = path__namespace.join(electron.app.getPath("userData"), "backups");
    if (fs__namespace.existsSync(backupDir)) {
      const files = await fs__namespace.promises.readdir(backupDir);
      const backupFiles = files.filter((f) => f.startsWith("sessions.") && f.endsWith(".json"));
      await Promise.all(backupFiles.map(async (file) => {
        try {
          const filePath = path__namespace.join(backupDir, file);
          const data = await fs__namespace.promises.readFile(filePath, "utf-8");
          const sessions = JSON.parse(data);
          if (Array.isArray(sessions)) {
            sessions.forEach((s) => {
              if (s && s.id) {
                const existing = sessionMap.get(s.id);
                if (!existing || s.lastActive > existing.lastActive) {
                  sessionMap.set(s.id, s);
                }
              }
            });
          }
        } catch {
        }
      }));
    }
  } catch (err) {
    console.error("Error reading backup sessions:", err);
  }
  return Array.from(sessionMap.values());
});
