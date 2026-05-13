"use strict";
const electron = require("electron");
const fs = require("fs");
const path = require("path");
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
electron.ipcMain.handle("open-folder", async () => {
  const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled) return null;
  return result.filePaths[0];
});
electron.ipcMain.handle("read-dir", (_e, dirPath) => {
  function walk(dir) {
    try {
      return fs__namespace.readdirSync(dir).map((name) => {
        const full = path__namespace.join(dir, name);
        const isDir = fs__namespace.statSync(full).isDirectory();
        return { name, path: full, isDir, children: isDir ? walk(full) : [] };
      });
    } catch {
      return [];
    }
  }
  return walk(dirPath);
});
electron.ipcMain.handle("read-file", (_e, filePath) => {
  return fs__namespace.readFileSync(filePath, "utf-8");
});
electron.ipcMain.handle("write-file", (_e, filePath, content) => {
  fs__namespace.mkdirSync(path__namespace.dirname(filePath), { recursive: true });
  fs__namespace.writeFileSync(filePath, content, "utf-8");
  return true;
});
electron.ipcMain.handle("list-files", (_e, dirPath) => {
  const IGNORE = /* @__PURE__ */ new Set(["node_modules", ".git", "dist", "out", ".next", "__pycache__", ".venv", "venv", "build", "coverage", ".DS_Store"]);
  const results = [];
  function walk(dir) {
    try {
      for (const name of fs__namespace.readdirSync(dir)) {
        if (IGNORE.has(name)) continue;
        const full = path__namespace.join(dir, name);
        if (fs__namespace.statSync(full).isDirectory()) walk(full);
        else results.push(full);
      }
    } catch {
    }
  }
  walk(dirPath);
  return results;
});
electron.ipcMain.handle("git-status", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    const stdout = execSync("git status --porcelain", { cwd: dirPath, encoding: "utf-8" });
    const branch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: dirPath, encoding: "utf-8" }).trim();
    let ahead = 0;
    let behind = 0;
    try {
      const syncStatus = execSync("git rev-list --count --left-right HEAD...@{u}", { cwd: dirPath, encoding: "utf-8" }).trim();
      const parts = syncStatus.split("	");
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
  const { execSync } = require("child_process");
  try {
    execSync(`git add "${filePath}"`, { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-unstage", async (_e, dirPath, filePath) => {
  const { execSync } = require("child_process");
  try {
    execSync(`git reset HEAD "${filePath}"`, { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-commit", async (_e, dirPath, message) => {
  const { execSync } = require("child_process");
  try {
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-get-staged-diff", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    const diff = execSync(`git diff --staged`, { cwd: dirPath }).toString();
    return diff;
  } catch {
    return "";
  }
});
electron.ipcMain.handle("git-get-file-diff", async (_e, dirPath, filePath) => {
  const { execSync } = require("child_process");
  try {
    let original = "";
    try {
      original = execSync(`git show HEAD:"${filePath}"`, { cwd: dirPath }).toString();
    } catch {
    }
    const current = fs__namespace.readFileSync(path__namespace.join(dirPath, filePath), "utf-8");
    return { original, current };
  } catch (e) {
    return { original: "", current: "", error: e.message };
  }
});
electron.ipcMain.handle("git-push", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    execSync("git push", { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-pull", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    execSync("git pull", { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-fetch", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    execSync("git fetch", { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-log", async (_e, dirPath) => {
  const { execSync } = require("child_process");
  try {
    const stdout = execSync("git log --oneline -n 20", { cwd: dirPath, encoding: "utf-8" });
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
electron.ipcMain.handle("load-sessions", () => {
  try {
    if (fs__namespace.existsSync(sessionsPath)) {
      return JSON.parse(fs__namespace.readFileSync(sessionsPath, "utf-8"));
    }
  } catch {
  }
  return null;
});
electron.ipcMain.handle("save-sessions", (_e, data) => {
  try {
    fs__namespace.writeFileSync(sessionsPath, data, "utf-8");
  } catch {
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
