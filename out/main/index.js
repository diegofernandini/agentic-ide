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
const http = require("http");
const readline = require("readline");
const https = require("https");
const url = require("url");
const events = require("events");
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
const http__namespace = /* @__PURE__ */ _interopNamespaceDefault(http);
const readline__namespace = /* @__PURE__ */ _interopNamespaceDefault(readline);
const https__namespace = /* @__PURE__ */ _interopNamespaceDefault(https);
const pty__namespace = /* @__PURE__ */ _interopNamespaceDefault(pty);
const os__namespace = /* @__PURE__ */ _interopNamespaceDefault(os);
class StdioMcpClient {
  constructor(name, command, args, envVariables, getWorkspaceRoot) {
    this.name = name;
    this.command = command;
    this.args = args;
    this.envVariables = envVariables;
    this.getWorkspaceRoot = getWorkspaceRoot;
  }
  process = null;
  nextId = 1;
  pendingRequests = /* @__PURE__ */ new Map();
  logs = [];
  connectionStatus = "disconnected";
  tools = [];
  errorMsg = "";
  rl = null;
  log(msg) {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${msg}`);
    if (this.logs.length > 500) this.logs.shift();
  }
  async connect() {
    this.connectionStatus = "connecting";
    this.errorMsg = "";
    this.tools = [];
    this.log(`Starting stdio server: ${this.command} ${this.args.join(" ")}`);
    return new Promise((resolve, reject) => {
      try {
        const env = { ...process.env, ...this.envVariables || {} };
        const paths = [
          "/opt/homebrew/bin",
          "/usr/local/bin",
          "/usr/bin",
          "/bin",
          "/usr/sbin",
          "/sbin"
        ];
        if (process.env.HOME) {
          paths.push(path__namespace.join(process.env.HOME, ".nvm/versions/node", process.version, "bin"));
        }
        const currentPath = process.env.PATH || "";
        env.PATH = Array.from(/* @__PURE__ */ new Set([...currentPath.split(":"), ...paths])).filter(Boolean).join(":");
        this.process = child_process.spawn(this.command, this.args, { env, shell: true });
        this.process.on("error", (err) => {
          this.connectionStatus = "error";
          this.errorMsg = err.message;
          this.log(`[Process Error] ${err.message}`);
          reject(err);
        });
        this.process.stderr?.on("data", (data) => {
          const str = data.toString().trim();
          if (str) {
            this.log(`[Stderr] ${str}`);
          }
        });
        this.rl = readline__namespace.createInterface({
          input: this.process.stdout,
          terminal: false
        });
        let initialized = false;
        this.rl.on("line", async (line) => {
          this.log(`[Received] ${line}`);
          try {
            const msg = JSON.parse(line);
            if (msg.method) {
              if (msg.method === "workspace/roots" || msg.method === "roots/list") {
                const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null;
                const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path__namespace.basename(rootPath) }] : [];
                if (msg.id !== void 0) {
                  this.sendRaw({
                    jsonrpc: "2.0",
                    id: msg.id,
                    result: { roots }
                  });
                }
              } else if (msg.method === "ping") {
                if (msg.id !== void 0) {
                  this.sendRaw({
                    jsonrpc: "2.0",
                    id: msg.id,
                    result: {}
                  });
                }
              } else if (msg.id !== void 0) {
                this.sendRaw({
                  jsonrpc: "2.0",
                  id: msg.id,
                  error: { code: -32601, message: `Method not found: ${msg.method}` }
                });
              }
            } else if (msg.id !== void 0) {
              const pending = this.pendingRequests.get(msg.id);
              if (pending) {
                this.pendingRequests.delete(msg.id);
                if (pending.timeout) clearTimeout(pending.timeout);
                if (msg.error) {
                  pending.reject(msg.error);
                } else {
                  pending.resolve(msg.result);
                }
              }
            }
          } catch (err) {
            this.log(`[Error Parsing JSON-RPC] ${err.message}`);
          }
        });
        this.process.on("exit", (code, signal) => {
          this.connectionStatus = "disconnected";
          this.log(`Server process exited. Code: ${code}, Signal: ${signal}`);
          for (const pending of this.pendingRequests.values()) {
            if (pending.timeout) clearTimeout(pending.timeout);
            pending.reject(new Error(`Server process exited with code ${code}`));
          }
          this.pendingRequests.clear();
          this.process = null;
          if (!initialized) {
            reject(new Error(`Server exited during handshake (code ${code})`));
          }
        });
        const handshake = async () => {
          try {
            this.log(`Sending initialize request...`);
            const initResult = await this.sendRequest("initialize", {
              protocolVersion: "2024-11-05",
              capabilities: {
                roots: { listChanged: true }
              },
              clientInfo: { name: "agentic-ide", version: "1.0.0" }
            });
            this.log(`Received initialize response. Protocol Version: ${initResult?.protocolVersion}`);
            this.sendNotification("notifications/initialized", {});
            this.log(`Sent initialized notification. Fetching tools...`);
            const toolsResult = await this.sendRequest("tools/list", {});
            this.tools = toolsResult?.tools || [];
            this.log(`Success! Server connected. Found ${this.tools.length} tools.`);
            this.connectionStatus = "connected";
            initialized = true;
            resolve();
          } catch (err) {
            this.log(`Handshake failed: ${err.message || String(err)}`);
            this.disconnect();
            reject(err);
          }
        };
        handshake();
      } catch (err) {
        this.connectionStatus = "error";
        this.errorMsg = err.message || String(err);
        this.log(`Connection failed: ${this.errorMsg}`);
        this.disconnect();
        reject(err);
      }
    });
  }
  sendRaw(payload) {
    if (!this.process || !this.process.stdin || this.process.stdin.writableEnded) {
      this.log(`[Error] Cannot write to stdin, process is not running.`);
      return;
    }
    const str = JSON.stringify(payload);
    this.log(`[Sending] ${str}`);
    this.process.stdin.write(str + "\n");
  }
  sendRequest(method, params, timeoutMs = 3e4) {
    return new Promise((resolve, reject) => {
      if (this.connectionStatus === "error" && !this.process) {
        return reject(new Error(`Server is in error state: ${this.errorMsg}`));
      }
      if (!this.process) {
        return reject(new Error(`Server is not running`));
      }
      const id = this.nextId++;
      const payload = { jsonrpc: "2.0", id, method, params };
      const timer = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error(`Request ${method} (id ${id}) timed out after ${timeoutMs}ms`));
        }
      }, timeoutMs);
      this.pendingRequests.set(id, { resolve, reject, timeout: timer });
      this.sendRaw(payload);
    });
  }
  sendNotification(method, params) {
    const payload = { jsonrpc: "2.0", method, params };
    this.sendRaw(payload);
  }
  disconnect() {
    this.log("Disconnecting from server...");
    if (this.rl) {
      try {
        this.rl.close();
      } catch {
      }
      this.rl = null;
    }
    if (this.process) {
      try {
        this.process.kill();
      } catch {
      }
      this.process = null;
    }
    this.connectionStatus = "disconnected";
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout);
      pending.reject(new Error(`Client disconnected`));
    }
    this.pendingRequests.clear();
  }
}
class SseMcpClient {
  constructor(name, url2, getWorkspaceRoot, headers) {
    this.name = name;
    this.url = url2;
    this.getWorkspaceRoot = getWorkspaceRoot;
    this.extraHeaders = headers || {};
  }
  nextId = 1;
  pendingRequests = /* @__PURE__ */ new Map();
  logs = [];
  connectionStatus = "disconnected";
  tools = [];
  errorMsg = "";
  sseRequest = null;
  postUrl = null;
  extraHeaders = {};
  log(msg) {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${msg}`);
    if (this.logs.length > 500) this.logs.shift();
  }
  async connect() {
    this.connectionStatus = "connecting";
    this.errorMsg = "";
    this.tools = [];
    this.postUrl = null;
    this.log(`Connecting to SSE server: ${this.url}`);
    return new Promise((resolve, reject) => {
      try {
        const parsedUrl = new url.URL(this.url);
        const requestModule = parsedUrl.protocol === "https:" ? https__namespace : http__namespace;
        const options = {
          headers: {
            "Accept": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            ...this.extraHeaders
          }
        };
        this.sseRequest = requestModule.get(this.url, options, (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            const err = new Error(`Server returned status code ${res.statusCode}`);
            this.handleError(err);
            reject(err);
            return;
          }
          this.log(`SSE connection established. Parsing stream...`);
          let buffer = "";
          let currentEvent = "message";
          res.on("data", async (chunk) => {
            buffer += chunk.toString();
            let index;
            while ((index = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, index).trim();
              buffer = buffer.slice(index + 1);
              if (line.startsWith("event:")) {
                currentEvent = line.slice(6).trim();
              } else if (line.startsWith("data:")) {
                const data = line.slice(5).trim();
                await this.handleEvent(currentEvent, data, resolve, reject);
              } else if (line === "") {
                currentEvent = "message";
              }
            }
          });
          res.on("end", () => {
            this.log("SSE stream ended by server");
            this.disconnect();
          });
        });
        this.sseRequest.on("error", (err) => {
          this.handleError(err);
          reject(err);
        });
      } catch (err) {
        this.handleError(err);
        reject(err);
      }
    });
  }
  handleError(err) {
    this.connectionStatus = "error";
    this.errorMsg = err.message || String(err);
    this.log(`[Error] ${this.errorMsg}`);
    this.disconnect();
  }
  sendNotificationResponse(id, result) {
    if (!this.postUrl) return;
    this.postMessage({ jsonrpc: "2.0", id, result }).catch((err) => {
      this.log(`[Error sending RPC response] ${err.message}`);
    });
  }
  sendNotificationError(id, code, message) {
    if (!this.postUrl) return;
    this.postMessage({ jsonrpc: "2.0", id, error: { code, message } }).catch((err) => {
      this.log(`[Error sending RPC error] ${err.message}`);
    });
  }
  async handleEvent(event, data, resolveConnect, rejectConnect) {
    this.log(`[Event: ${event}] ${data}`);
    if (event === "endpoint") {
      try {
        const resolved = new url.URL(data, this.url).toString();
        this.postUrl = resolved;
        this.log(`POST message endpoint resolved to: ${this.postUrl}`);
        this.log("Sending initialize request...");
        const initResult = await this.sendRequest("initialize", {
          protocolVersion: "2024-11-05",
          capabilities: {
            roots: { listChanged: true }
          },
          clientInfo: { name: "agentic-ide", version: "1.0.0" }
        });
        this.log(`Received initialize response. Protocol Version: ${initResult?.protocolVersion}`);
        await this.sendNotification("notifications/initialized", {});
        this.log("Sent initialized notification. Fetching tools...");
        const toolsResult = await this.sendRequest("tools/list", {});
        this.tools = toolsResult?.tools || [];
        this.log(`Success! SSE server connected. Found ${this.tools.length} tools.`);
        this.connectionStatus = "connected";
        resolveConnect();
      } catch (err) {
        rejectConnect(err);
      }
    } else if (event === "message") {
      try {
        const msg = JSON.parse(data);
        if (msg.method) {
          if (msg.method === "workspace/roots" || msg.method === "roots/list") {
            const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null;
            const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path__namespace.basename(rootPath) }] : [];
            if (msg.id !== void 0) {
              this.sendNotificationResponse(msg.id, { roots });
            }
          } else if (msg.method === "ping") {
            if (msg.id !== void 0) {
              this.sendNotificationResponse(msg.id, {});
            }
          } else if (msg.id !== void 0) {
            this.sendNotificationError(msg.id, -32601, `Method not found: ${msg.method}`);
          }
        } else if (msg.id !== void 0) {
          const pending = this.pendingRequests.get(msg.id);
          if (pending) {
            this.pendingRequests.delete(msg.id);
            if (pending.timeout) clearTimeout(pending.timeout);
            if (msg.error) {
              pending.reject(msg.error);
            } else {
              pending.resolve(msg.result);
            }
          }
        }
      } catch (err) {
        this.log(`[Error parsing message JSON] ${err.message}`);
      }
    }
  }
  sendRequest(method, params, timeoutMs = 3e4) {
    if (!this.postUrl) {
      return Promise.reject(new Error("Message endpoint not established yet"));
    }
    const id = this.nextId++;
    const payload = { jsonrpc: "2.0", id, method, params };
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error(`Request ${method} (id ${id}) timed out after ${timeoutMs}ms`));
        }
      }, timeoutMs);
      this.pendingRequests.set(id, { resolve, reject, timeout: timer });
      this.postMessage(payload).catch((err) => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          clearTimeout(timer);
        }
        reject(err);
      });
    });
  }
  async sendNotification(method, params) {
    if (!this.postUrl) return;
    const payload = { jsonrpc: "2.0", method, params };
    try {
      await this.postMessage(payload);
    } catch (err) {
      this.log(`[Error sending notification] ${err.message}`);
    }
  }
  async postMessage(payload) {
    if (!this.postUrl) return;
    const url$1 = new url.URL(this.postUrl);
    const body = JSON.stringify(payload);
    const requestModule = url$1.protocol === "https:" ? https__namespace : http__namespace;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        ...this.extraHeaders
      }
    };
    return new Promise((resolve, reject) => {
      const req = requestModule.request(url$1, options, (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk.toString();
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            const method = res.statusCode === 405 ? "HTTP 405 Method Not Allowed" : `HTTP ${res.statusCode}`;
            const hint = res.statusCode === 405 ? " — The endpoint does not accept POST. Verify your MCP server URL points to the correct SSE/message endpoint, not a generic REST route." : res.statusCode === 400 ? " — The server rejected the payload. Ensure the endpoint speaks JSON-RPC 2.0 MCP protocol." : "";
            reject(new Error(`${method}${hint} Body: ${responseBody.slice(0, 200)}`));
          } else {
            resolve();
          }
        });
      });
      req.on("error", (err) => reject(err));
      req.write(body);
      req.end();
    });
  }
  disconnect() {
    this.log("Disconnecting from SSE server...");
    if (this.sseRequest) {
      try {
        this.sseRequest.destroy();
      } catch {
      }
      this.sseRequest = null;
    }
    this.connectionStatus = "disconnected";
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout);
      pending.reject(new Error("Client disconnected"));
    }
    this.pendingRequests.clear();
  }
}
class StreamableHttpMcpClient {
  constructor(name, url2, headers) {
    this.name = name;
    this.url = url2;
    this.extraHeaders = headers || {};
  }
  nextId = 1;
  pendingRequests = /* @__PURE__ */ new Map();
  logs = [];
  connectionStatus = "disconnected";
  tools = [];
  errorMsg = "";
  sessionId = null;
  extraHeaders = {};
  log(msg) {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${msg}`);
    if (this.logs.length > 500) this.logs.shift();
  }
  async connect() {
    this.connectionStatus = "connecting";
    this.errorMsg = "";
    this.tools = [];
    this.sessionId = null;
    this.log(`Connecting via Streamable HTTP: ${this.url}`);
    try {
      const initResult = await this.sendRequest("initialize", {
        protocolVersion: "2025-03-26",
        capabilities: { roots: { listChanged: true } },
        clientInfo: { name: "agentic-ide", version: "1.0.0" }
      });
      this.log(`Initialize OK. Protocol: ${initResult?.protocolVersion}. Session: ${this.sessionId || "none"}`);
      await this.sendNotification("notifications/initialized", {});
      const toolsResult = await this.sendRequest("tools/list", {});
      this.tools = toolsResult?.tools || [];
      this.log(`Connected. Found ${this.tools.length} tools.`);
      this.connectionStatus = "connected";
    } catch (err) {
      this.connectionStatus = "error";
      this.errorMsg = err.message || String(err);
      this.log(`[Error] Connection failed: ${this.errorMsg}`);
      throw err;
    }
  }
  sendRequest(method, params, timeoutMs = 3e4) {
    const id = this.nextId++;
    const payload = { jsonrpc: "2.0", id, method, params };
    return this.post(payload, id, timeoutMs);
  }
  async sendNotification(method, params) {
    const payload = { jsonrpc: "2.0", method, params };
    await this.post(payload, null);
  }
  post(payload, requestId, timeoutMs = 3e4) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new url.URL(this.url);
      const requestModule = parsedUrl.protocol === "https:" ? https__namespace : http__namespace;
      const body = JSON.stringify(payload);
      const headers = {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        // Accept both a plain JSON response (stateless) and an SSE stream
        "Accept": "application/json, text/event-stream",
        ...this.extraHeaders
      };
      if (this.sessionId) {
        headers["Mcp-Session-Id"] = this.sessionId;
      }
      let settled = false;
      const timer = requestId !== null ? setTimeout(() => {
        if (!settled) {
          settled = true;
          try {
            req.destroy();
          } catch {
          }
          reject(new Error(`Request timed out after ${timeoutMs}ms`));
        }
      }, timeoutMs) : null;
      const done = (err, result) => {
        if (settled) return;
        settled = true;
        if (timer) clearTimeout(timer);
        if (err) reject(err);
        else resolve(result);
      };
      this.log(`[POST] ${body}`);
      this.log(`[Headers] ${JSON.stringify(this.extraHeaders)}`);
      const req = requestModule.request(parsedUrl, { method: "POST", headers }, (res) => {
        const sessionHeaderKey = Object.keys(res.headers).find((k) => k.toLowerCase() === "mcp-session-id");
        if (sessionHeaderKey && res.headers[sessionHeaderKey]) {
          this.sessionId = res.headers[sessionHeaderKey];
          this.log(`Session ID: ${this.sessionId}`);
        }
        if (res.statusCode && res.statusCode >= 400) {
          let errBody = "";
          res.on("data", (c) => {
            errBody += c.toString();
          });
          res.on("end", () => {
            const hint = res.statusCode === 405 ? " — wrong endpoint or method; verify the URL is the Streamable HTTP MCP endpoint." : res.statusCode === 400 ? " — payload rejected; check JSON-RPC structure." : "";
            done(new Error(`HTTP ${res.statusCode}${hint} Body: ${errBody.slice(0, 200)}`));
          });
          return;
        }
        const ct = res.headers["content-type"] || "";
        if (ct.includes("text/event-stream")) {
          let buffer = "";
          res.on("data", (chunk) => {
            buffer += chunk.toString();
            let idx;
            while ((idx = buffer.indexOf("\n")) !== -1) {
              const line = buffer.slice(0, idx).trim();
              buffer = buffer.slice(idx + 1);
              if (line.startsWith("data:")) {
                const data = line.slice(5).trim();
                try {
                  const msg = JSON.parse(data);
                  this.log(`[SSE data] ${data}`);
                  if (requestId !== null && msg.id === requestId) {
                    if (msg.error) done(msg.error);
                    else done(null, msg.result);
                  } else if (msg.id !== void 0) {
                    const pending = this.pendingRequests.get(msg.id);
                    if (pending) {
                      this.pendingRequests.delete(msg.id);
                      if (pending.timeout) clearTimeout(pending.timeout);
                      if (msg.error) pending.reject(msg.error);
                      else pending.resolve(msg.result);
                    }
                  }
                } catch {
                }
              }
            }
          });
          res.on("end", () => {
            if (requestId === null) done();
            else if (!settled) done(new Error("SSE stream ended before response was received"));
          });
        } else {
          let raw = "";
          res.on("data", (c) => {
            raw += c.toString();
          });
          res.on("end", () => {
            this.log(`[Response] ${raw.slice(0, 500)}`);
            if (requestId === null) {
              done();
              return;
            }
            if (!raw || raw.trim() === "") {
              done(null, void 0);
              return;
            }
            try {
              const msg = JSON.parse(raw);
              if (msg.error) done(msg.error);
              else done(null, msg.result);
            } catch (e) {
              done(new Error(`Failed to parse response: ${e.message}. Body: ${raw.slice(0, 200)}`));
            }
          });
        }
      });
      req.on("error", (err) => done(err));
      req.write(body);
      req.end();
    });
  }
  disconnect() {
    this.log("Disconnecting Streamable HTTP client...");
    if (this.sessionId) {
      try {
        const parsedUrl = new url.URL(this.url);
        const requestModule = parsedUrl.protocol === "https:" ? https__namespace : http__namespace;
        const headers = { ...this.extraHeaders, "Mcp-Session-Id": this.sessionId };
        const req = requestModule.request(parsedUrl, { method: "DELETE", headers }, (res) => {
          res.resume();
        });
        req.on("error", () => {
        });
        req.end();
      } catch {
      }
    }
    this.connectionStatus = "disconnected";
    this.sessionId = null;
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout);
      pending.reject(new Error("Client disconnected"));
    }
    this.pendingRequests.clear();
  }
}
class McpManager {
  constructor(dataDir2) {
    this.dataDir = dataDir2;
    this.configPath = path__namespace.join(this.dataDir, "mcp-config.json");
    this.ensureConfigExists();
  }
  configPath;
  servers = /* @__PURE__ */ new Map();
  workspaceRoot = null;
  setWorkspaceRoot(root) {
    this.workspaceRoot = root;
    this.logGlobal(`Workspace root updated to: ${root}`);
  }
  getWorkspaceRoot() {
    return this.workspaceRoot;
  }
  ensureConfigExists() {
    if (!fs__namespace.existsSync(this.dataDir)) {
      fs__namespace.mkdirSync(this.dataDir, { recursive: true });
    }
    if (!fs__namespace.existsSync(this.configPath)) {
      const defaultConfig = {
        mcpServers: {
          "sqlite-demo": {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-sqlite", "--db", path__namespace.join(this.dataDir, "demo.db")],
            disabled: true
          },
          "figma": {
            command: "npx",
            args: ["-y", "figma-developer-mcp", "--figma-api-key", "YOUR_FIGMA_ACCESS_TOKEN", "--stdio"],
            env: {},
            disabled: true
          },
          "penpot": {
            command: "npx",
            args: ["-y", "penpot-mcp"],
            env: {
              "PENPOT_BASE_URL": "https://design.penpot.app",
              "PENPOT_ACCESS_TOKEN": "YOUR_PENPOT_ACCESS_TOKEN"
            },
            disabled: true
          }
        }
      };
      fs__namespace.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");
    }
  }
  getConfig() {
    this.ensureConfigExists();
    try {
      const content = fs__namespace.readFileSync(this.configPath, "utf-8");
      return JSON.parse(content);
    } catch (e) {
      return { mcpServers: {} };
    }
  }
  saveConfig(config) {
    fs__namespace.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
    this.reloadServers();
  }
  async startAll() {
    const config = this.getConfig();
    for (const [name, srvConfig] of Object.entries(config.mcpServers)) {
      if (srvConfig.disabled) {
        continue;
      }
      try {
        await this.startServer(name, srvConfig);
      } catch (err) {
        console.error(`Failed to start MCP server ${name}:`, err);
      }
    }
  }
  async startServer(name, srvConfig) {
    this.stopServer(name);
    let client;
    if (srvConfig.url) {
      const transport = srvConfig.transport || "sse";
      console.log(`[MCP] Starting ${name}: transport=${transport} headers=${JSON.stringify(srvConfig.headers || {})}`);
      if (transport === "streamable-http") {
        client = new StreamableHttpMcpClient(name, srvConfig.url, srvConfig.headers);
      } else {
        client = new SseMcpClient(name, srvConfig.url, () => this.workspaceRoot, srvConfig.headers);
      }
    } else if (srvConfig.command) {
      client = new StdioMcpClient(name, srvConfig.command, srvConfig.args || [], srvConfig.env, () => this.workspaceRoot);
    } else {
      throw new Error(`Invalid server configuration for ${name}: must have either "url" (SSE/Streamable-HTTP) or "command" (stdio)`);
    }
    this.servers.set(name, client);
    client.connect().catch(() => {
    });
  }
  stopServer(name) {
    const client = this.servers.get(name);
    if (client) {
      client.disconnect();
      this.servers.delete(name);
    }
  }
  stopAll() {
    for (const name of this.servers.keys()) {
      this.stopServer(name);
    }
  }
  async reloadServers() {
    this.stopAll();
    await this.startAll();
  }
  async restartServer(name) {
    const config = this.getConfig();
    const srvConfig = config.mcpServers[name];
    if (!srvConfig) {
      throw new Error(`Server ${name} not found in configuration`);
    }
    await this.startServer(name, srvConfig);
  }
  getServersStatus() {
    const config = this.getConfig();
    const statuses = [];
    for (const [name, srvConfig] of Object.entries(config.mcpServers)) {
      const activeClient = this.servers.get(name);
      if (activeClient) {
        statuses.push({
          name,
          status: activeClient.connectionStatus,
          type: activeClient instanceof SseMcpClient ? "sse" : activeClient instanceof StreamableHttpMcpClient ? "streamable-http" : "stdio",
          tools: activeClient.tools,
          logs: activeClient.logs,
          error: activeClient.errorMsg
        });
      } else {
        let type = "stdio";
        if (srvConfig.url) {
          type = srvConfig.transport === "streamable-http" ? "streamable-http" : "sse";
        }
        statuses.push({
          name,
          status: "disconnected",
          type,
          tools: [],
          logs: srvConfig.disabled ? [`[SYSTEM] Server is disabled in configuration.`] : [],
          error: srvConfig.disabled ? "Disabled" : void 0
        });
      }
    }
    return statuses;
  }
  async callTool(serverName, toolName, args) {
    const client = this.servers.get(serverName);
    if (!client) {
      throw new Error(`MCP Server ${serverName} is not running or connected`);
    }
    if (client.connectionStatus !== "connected") {
      throw new Error(`MCP Server ${serverName} is not connected (status: ${client.connectionStatus})`);
    }
    return client.sendRequest("tools/call", { name: toolName, arguments: args });
  }
  logGlobal(msg) {
    for (const client of this.servers.values()) {
      if (client instanceof StdioMcpClient || client instanceof SseMcpClient || client instanceof StreamableHttpMcpClient) {
        const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
        client.logs.push(`[${timestamp}] [IDE] ${msg}`);
      }
    }
  }
}
const FREE_OPEN_MODEL_CATALOG = {
  "code-generation": {
    primary: "qwen2.5-coder:14b",
    alternatives: ["qwen2.5-coder:7b", "codellama:13b", "starcoder2:7b", "deepseek-coder-v2:16b"]
  },
  "code-review": {
    primary: "qwen2.5-coder:14b",
    alternatives: ["qwen2.5-coder:7b", "codellama:13b", "deepseek-coder:6.7b"]
  },
  "debugging": {
    primary: "deepseek-r1:14b",
    alternatives: ["deepseek-r1:8b", "qwen2.5-coder:14b", "llama3.1:8b"]
  },
  "reasoning": {
    primary: "deepseek-r1:14b",
    alternatives: ["deepseek-r1:8b", "qwq:32b", "llama3.3:70b"]
  },
  "planning": {
    primary: "llama3.1:8b",
    alternatives: ["llama3.3:70b", "mistral-nemo:12b", "phi4:14b"]
  },
  "general-chat": {
    primary: "llama3.1:8b",
    alternatives: ["mistral:7b", "gemma2:9b", "phi4:14b"]
  }
};
function getCatalogForDevice(profile) {
  if (!profile) return FREE_OPEN_MODEL_CATALOG;
  if (profile.memoryGiB >= 48) {
    return {
      "code-generation": { primary: "qwen3-coder:30b", alternatives: ["devstral:24b", "qwen2.5-coder:14b"] },
      "code-review": { primary: "qwen3-coder:30b", alternatives: ["devstral:24b", "qwen2.5-coder:14b"] },
      debugging: { primary: "deepseek-r1:32b", alternatives: ["qwen3-coder:30b", "deepseek-r1:14b"] },
      reasoning: { primary: "deepseek-r1:32b", alternatives: ["qwen3.6:35b", "deepseek-r1:14b"] },
      planning: { primary: "qwen3.6:35b", alternatives: ["llama3.3:70b", "phi4:14b"] },
      "general-chat": { primary: "qwen3.6:35b", alternatives: ["llama3.3:70b", "phi4:14b"] }
    };
  }
  if (profile.memoryGiB >= 32) {
    return {
      "code-generation": { primary: "qwen3-coder:30b", alternatives: ["devstral:24b", "qwen2.5-coder:14b"] },
      "code-review": { primary: "devstral:24b", alternatives: ["qwen2.5-coder:14b", "qwen2.5-coder:7b"] },
      debugging: { primary: "deepseek-r1:14b", alternatives: ["qwen2.5-coder:14b", "deepseek-r1:8b"] },
      reasoning: { primary: "deepseek-r1:14b", alternatives: ["qwen3.6:27b", "deepseek-r1:8b"] },
      planning: { primary: "qwen3.6:27b", alternatives: ["phi4:14b", "llama3.1:8b"] },
      "general-chat": { primary: "qwen3.6:27b", alternatives: ["phi4:14b", "llama3.1:8b"] }
    };
  }
  if (profile.memoryGiB >= 16) {
    return {
      "code-generation": { primary: "qwen2.5-coder:14b", alternatives: ["qwen2.5-coder:7b", "deepseek-coder:6.7b"] },
      "code-review": { primary: "qwen2.5-coder:14b", alternatives: ["qwen2.5-coder:7b", "deepseek-coder:6.7b"] },
      debugging: { primary: "deepseek-r1:14b", alternatives: ["deepseek-r1:8b", "qwen2.5-coder:7b"] },
      reasoning: { primary: "deepseek-r1:14b", alternatives: ["deepseek-r1:8b", "llama3.1:8b"] },
      planning: { primary: "phi4:14b", alternatives: ["llama3.1:8b", "qwen2.5-coder:7b"] },
      "general-chat": { primary: "llama3.1:8b", alternatives: ["phi4:14b", "gemma2:9b"] }
    };
  }
  return {
    "code-generation": { primary: "qwen2.5-coder:7b", alternatives: ["qwen2.5-coder:3b", "deepseek-coder:1.3b"] },
    "code-review": { primary: "qwen2.5-coder:7b", alternatives: ["qwen2.5-coder:3b", "deepseek-coder:1.3b"] },
    debugging: { primary: "deepseek-r1:8b", alternatives: ["qwen2.5-coder:7b", "llama3.2:3b"] },
    reasoning: { primary: "deepseek-r1:8b", alternatives: ["llama3.2:3b", "qwen2.5-coder:3b"] },
    planning: { primary: "llama3.2:3b", alternatives: ["qwen2.5-coder:3b", "gemma2:2b"] },
    "general-chat": { primary: "llama3.2:3b", alternatives: ["gemma2:2b", "qwen2.5-coder:3b"] }
  };
}
const INTENT_PATTERNS = {
  "code-generation": [
    /\b(write|create|implement|build|generate|code|function|class|component|script|html|css|tsx?|jsx?|python|java|rust|golang|c\+\+)\b/i,
    /```[a-z0-9]*/i
  ],
  "code-review": [
    /\b(review|audit|refactor|optimize|clean up|best practice|security|vulnerability|lint)\b/i
  ],
  "debugging": [
    /\b(fix|bug|error|exception|stacktrace|crash|failing|issue|unexpected|typeerror|nullpointer)\b/i,
    /Error:|Exception:|Traceback/i
  ],
  "reasoning": [
    /\b(explain why|logic|math|algorithm|proof|deepseek|step-by-step|evaluate|analyze|why does)\b/i
  ],
  "planning": [
    /\b(plan|design|architecture|roadmap|break down|steps|approach|schema|structure)\b/i
  ],
  "general-chat": [
    /\b(hi|hello|what is|tell me|explain|summary|summarize|documentation|help)\b/i
  ]
};
class ModelRouter {
  /**
   * Classify user prompt intent into a TaskCategory
   */
  classifyPrompt(prompt) {
    if (!prompt || !prompt.trim()) {
      return { category: "general-chat", confidence: 0.5 };
    }
    const scores = {
      "code-generation": 0,
      "code-review": 0,
      "debugging": 0,
      "reasoning": 0,
      "planning": 0,
      "general-chat": 0
    };
    for (const [category, patterns] of Object.entries(INTENT_PATTERNS)) {
      for (const pattern of patterns) {
        const matches = prompt.match(pattern);
        if (matches) {
          scores[category] += matches.length * 2;
        }
      }
    }
    if (/```[a-z0-9]*/i.test(prompt)) {
      scores["code-generation"] += 3;
    }
    if (/error|exception|fail/i.test(prompt)) {
      scores["debugging"] += 3;
    }
    let topCategory = "general-chat";
    let maxScore = 0;
    for (const [cat, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        topCategory = cat;
      }
    }
    const confidence = maxScore > 0 ? Math.min(1, 0.5 + maxScore * 0.1) : 0.5;
    return { category: topCategory, confidence };
  }
  /**
   * Score an installed model name against a target task category (0 - 100)
   */
  scoreModelForTask(modelName, category, device) {
    const name = modelName.toLowerCase();
    let score = 50;
    if (category === "code-generation" || category === "code-review") {
      if (name.includes("coder") || name.includes("codellama") || name.includes("starcoder")) {
        score += 40;
      } else if (name.includes("qwen2.5") || name.includes("deepseek")) {
        score += 25;
      } else if (name.includes("llama3") || name.includes("mistral")) {
        score += 15;
      }
    } else if (category === "debugging" || category === "reasoning") {
      if (name.includes("deepseek-r1") || name.includes("qwq") || name.includes("r1")) {
        score += 45;
      } else if (name.includes("coder")) {
        score += 30;
      } else if (name.includes("llama3.3") || name.includes("llama3.1")) {
        score += 20;
      }
    } else if (category === "planning") {
      if (name.includes("llama3.3") || name.includes("llama3.1") || name.includes("mistral-nemo")) {
        score += 35;
      } else if (name.includes("qwen2.5")) {
        score += 25;
      }
    } else {
      if (name.includes("llama3.1") || name.includes("mistral") || name.includes("gemma")) {
        score += 35;
      }
    }
    if (name.includes("14b") || name.includes("13b") || name.includes("16b") || name.includes("32b") || name.includes("70b")) {
      score += 10;
    }
    const parameters = name.match(/(?:^|:|-)(\d+(?:\.\d+)?)b(?:$|[-:])/i);
    if (parameters && device) {
      const estimatedGiB = Number(parameters[1]) * 0.63;
      if (estimatedGiB > device.modelMemoryBudgetGiB) score -= 75;
    }
    return Math.max(0, Math.min(100, score));
  }
  isModelSuitableForDevice(modelName, device) {
    if (!device) return true;
    const match = modelName.toLowerCase().match(/(?:^|:|-)(\d+(?:\.\d+)?)b(?:$|[-:])/i);
    return !match || Number(match[1]) * 0.63 <= device.modelMemoryBudgetGiB;
  }
  /**
   * Select the best model from installed models for a prompt,
   * evaluating suitability threshold (>= 60) and catalog recommendations.
   */
  selectModel(prompt, installedModels, fallbackModel = "llama3.1:latest", device) {
    const { category, confidence } = this.classifyPrompt(prompt);
    if (!installedModels || installedModels.length === 0) {
      const catalog2 = getCatalogForDevice(device)[category];
      return {
        taskCategory: category,
        confidence,
        selectedModel: fallbackModel,
        suitabilityScore: 30,
        isOptimal: false,
        recommendedModelToPull: catalog2.primary,
        deviceProfile: device,
        reason: `No installed models found. Recommended for this ${device?.tier || "default"} device: ${catalog2.primary}`
      };
    }
    let bestModel = installedModels[0];
    let bestScore = -1;
    for (const model of installedModels) {
      const score = this.scoreModelForTask(model, category, device);
      if (score > bestScore) {
        bestScore = score;
        bestModel = model;
      }
    }
    if (installedModels.includes(fallbackModel)) {
      const fallbackScore = this.scoreModelForTask(fallbackModel, category, device);
      if (fallbackScore > bestScore) {
        bestScore = fallbackScore;
        bestModel = fallbackModel;
      }
    }
    const SUITABILITY_THRESHOLD = 60;
    const isOptimal = bestScore >= SUITABILITY_THRESHOLD;
    const catalog = getCatalogForDevice(device)[category];
    const recommendedModelToPull = isOptimal ? void 0 : catalog.primary;
    let reason = `Selected '${bestModel}' for ${category} (suitability score: ${bestScore}/100)`;
    if (device) reason += ` on this ${device.tier} ${device.memoryGiB} GiB device`;
    if (!isOptimal) {
      reason += `. Installed models fall below suitability threshold. Consider pulling free open model '${catalog.primary}'.`;
    }
    return {
      taskCategory: category,
      confidence,
      selectedModel: bestModel,
      suitabilityScore: bestScore,
      isOptimal,
      recommendedModelToPull,
      reason,
      deviceProfile: device
    };
  }
}
const modelRouter$2 = new ModelRouter();
const DEFAULT_SKILL_MODEL_MAP = {
  "code-generation": "qwen2.5-coder:14b",
  "code-review": "qwen2.5-coder:14b",
  "analysis": "qwen2.5:14b",
  "chat": "llama3.1:latest",
  "planning": "llama3.1:latest",
  "design": "llama3.1:latest",
  "default": "llama3.1:latest"
};
const AGENT_SKILLS = [
  {
    id: "code-generation",
    name: "Code Generation",
    description: "Generate, edit, and refactor code across languages and frameworks.",
    tags: ["code", "programming", "refactor"],
    examples: ["Write a React component for a login form", "Refactor this Python function to be async"]
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Review code for bugs, security issues, and best practices.",
    tags: ["review", "security", "quality"],
    examples: ["Review this PR for security vulnerabilities", "Check this function for edge cases"]
  },
  {
    id: "analysis",
    name: "Project Analysis",
    description: "Analyse codebases, explain architecture, and answer questions about a project.",
    tags: ["analysis", "architecture", "explain"],
    examples: ["Explain the architecture of this project", "What does this module do?"]
  },
  {
    id: "planning",
    name: "Task Planning",
    description: "Break down features into implementation steps and create development plans.",
    tags: ["planning", "tasks", "breakdown"],
    examples: ["Plan the implementation of a user auth system", "Break this feature into subtasks"]
  }
];
function makeId$1() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function now() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function jsonResponse(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(json),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(json);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (c) => {
      body += c.toString();
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}
async function ollamaChat$1(model, prompt) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model,
      stream: false,
      messages: [{ role: "user", content: prompt }]
    });
    const options = {
      hostname: "127.0.0.1",
      port: 11434,
      path: "/api/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(payload)
      },
      timeout: 6e5
      // 10 min for large models
    };
    const req = http__namespace.request(options, (res) => {
      let data = "";
      res.on("data", (c) => {
        data += c;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.message?.content || json.error || data);
        } catch {
          resolve(data);
        }
      });
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama timed out"));
    });
    req.write(payload);
    req.end();
  });
}
class A2AServer extends events.EventEmitter {
  constructor(config, dataDir2) {
    super();
    this.config = config;
    this.dataDir = dataDir2;
  }
  server = null;
  tasks = /* @__PURE__ */ new Map();
  logs = [];
  log(entry) {
    const record = { id: makeId$1(), ...entry };
    this.logs.unshift(record);
    if (this.logs.length > 200) this.logs.pop();
    this.emit("log", record);
    return record;
  }
  resolveModel(prompt, metadata) {
    const skill = metadata?.skill || "";
    if (skill && this.config.skillModelMap[skill]) {
      return this.config.skillModelMap[skill];
    }
    if (prompt && prompt.trim()) {
      const rec = modelRouter$2.selectModel(prompt, [], this.config.defaultModel);
      if (rec.selectedModel) return rec.selectedModel;
    }
    return this.config.skillModelMap["default"] || this.config.defaultModel;
  }
  buildAgentCard() {
    return {
      name: "Agentic IDE",
      description: "A local AI-powered development environment with code generation, review, analysis, and planning capabilities.",
      url: `http://localhost:${this.config.port}`,
      version: "1.0.0",
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: true
      },
      skills: AGENT_SKILLS,
      defaultInputModes: ["text"],
      defaultOutputModes: ["text"]
    };
  }
  async handleRequest(req, res) {
    const url$1 = new url.URL(req.url || "/", `http://localhost:${this.config.port}`);
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      res.end();
      return;
    }
    if (req.method === "GET" && url$1.pathname === "/.well-known/agent.json") {
      jsonResponse(res, 200, this.buildAgentCard());
      return;
    }
    if (req.method === "POST" && url$1.pathname === "/a2a") {
      let body;
      try {
        body = JSON.parse(await readBody(req));
      } catch {
        jsonResponse(res, 400, { jsonrpc: "2.0", error: { code: -32700, message: "Parse error" }, id: null });
        return;
      }
      const { method, params, id } = body;
      try {
        let result;
        if (method === "tasks/send") {
          result = await this.handleTaskSend(params);
        } else if (method === "tasks/get") {
          result = await this.handleTaskGet(params);
        } else if (method === "tasks/cancel") {
          result = await this.handleTaskCancel(params);
        } else {
          jsonResponse(res, 200, { jsonrpc: "2.0", error: { code: -32601, message: "Method not found" }, id });
          return;
        }
        jsonResponse(res, 200, { jsonrpc: "2.0", result, id });
      } catch (err) {
        jsonResponse(res, 200, { jsonrpc: "2.0", error: { code: -32e3, message: err.message || String(err) }, id });
      }
      return;
    }
    jsonResponse(res, 404, { error: "Not found" });
  }
  async handleTaskSend(params) {
    const taskId = params?.id || makeId$1();
    const userMessage = params?.message || { role: "user", parts: [{ type: "text", text: "" }] };
    const metadata = params?.metadata || {};
    const prompt = userMessage.parts.map((p) => p.text).join("\n");
    const model = this.resolveModel(metadata);
    const skill = metadata?.skill || "default";
    const task = {
      id: taskId,
      sessionId: params?.sessionId,
      status: { state: "working", timestamp: now() },
      history: [userMessage],
      metadata
    };
    this.tasks.set(taskId, task);
    const logEntry = this.log({
      direction: "inbound",
      skill,
      model,
      prompt,
      status: "working",
      startedAt: now()
    });
    setImmediate(async () => {
      try {
        const result = await ollamaChat$1(model, prompt);
        const agentMessage = {
          role: "agent",
          parts: [{ type: "text", text: result }]
        };
        task.status = { state: "completed", message: agentMessage, timestamp: now() };
        task.history = [...task.history || [], agentMessage];
        task.artifacts = [{ index: 0, parts: [{ type: "text", text: result }] }];
        logEntry.status = "completed";
        logEntry.result = result.slice(0, 500);
        logEntry.finishedAt = now();
        this.emit("taskComplete", task);
        this.emit("log", logEntry);
      } catch (err) {
        task.status = { state: "failed", timestamp: now() };
        logEntry.status = "failed";
        logEntry.error = err.message;
        logEntry.finishedAt = now();
        this.emit("taskFailed", task);
        this.emit("log", logEntry);
      }
    });
    return task;
  }
  async handleTaskGet(params) {
    const task = this.tasks.get(params?.id);
    if (!task) throw new Error(`Task ${params?.id} not found`);
    return task;
  }
  async handleTaskCancel(params) {
    const task = this.tasks.get(params?.id);
    if (!task) throw new Error(`Task ${params?.id} not found`);
    task.status = { state: "canceled", timestamp: now() };
    return task;
  }
  start() {
    return new Promise((resolve, reject) => {
      this.server = http__namespace.createServer((req, res) => {
        this.handleRequest(req, res).catch((err) => {
          jsonResponse(res, 500, { error: err.message });
        });
      });
      this.server.on("error", reject);
      this.server.listen(this.config.port, "0.0.0.0", () => {
        resolve();
      });
    });
  }
  stop() {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
        this.server = null;
      } else {
        resolve();
      }
    });
  }
  isRunning() {
    return this.server !== null && this.server.listening;
  }
}
class A2AClient {
  constructor(config) {
    this.config = config;
  }
  /** Fetch the Agent Card from a remote agent */
  async discoverAgent(baseUrl) {
    const url$1 = new url.URL("/.well-known/agent.json", baseUrl);
    const mod = url$1.protocol === "https:" ? https__namespace : http__namespace;
    return new Promise((resolve, reject) => {
      mod.get(url$1.toString(), (res) => {
        let data = "";
        res.on("data", (c) => {
          data += c;
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Agent card fetch failed: HTTP ${res.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid agent card JSON"));
          }
        });
      }).on("error", reject);
    });
  }
  /** Send a task to a remote A2A agent and poll until complete */
  async sendTask(agentUrl, prompt, skill, onStatusUpdate) {
    const taskId = makeId$1();
    const payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "tasks/send",
      params: {
        id: taskId,
        message: { role: "user", parts: [{ type: "text", text: prompt }] },
        metadata: skill ? { skill } : {}
      }
    };
    const sendResult = await this.postRpc(agentUrl, payload);
    let task = sendResult.result;
    const POLL_INTERVAL = 1500;
    const MAX_POLLS = 400;
    let polls = 0;
    while ((task.status.state === "working" || task.status.state === "submitted") && polls < MAX_POLLS) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL));
      const getResult = await this.postRpc(agentUrl, {
        jsonrpc: "2.0",
        id: 2,
        method: "tasks/get",
        params: { id: taskId }
      });
      task = getResult.result;
      if (onStatusUpdate) onStatusUpdate(task);
      polls++;
    }
    return task;
  }
  postRpc(baseUrl, payload) {
    const url$1 = new url.URL("/a2a", baseUrl);
    const mod = url$1.protocol === "https:" ? https__namespace : http__namespace;
    const body = JSON.stringify(payload);
    return new Promise((resolve, reject) => {
      const req = mod.request(url$1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body)
        },
        timeout: 3e4
      }, (res) => {
        let data = "";
        res.on("data", (c) => {
          data += c;
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`A2A RPC error: HTTP ${res.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON-RPC response"));
          }
        });
      });
      req.on("error", reject);
      req.on("timeout", () => {
        req.destroy();
        reject(new Error("A2A request timed out"));
      });
      req.write(body);
      req.end();
    });
  }
}
class A2AManager extends events.EventEmitter {
  constructor(dataDir2) {
    super();
    this.dataDir = dataDir2;
    this.configPath = path__namespace.join(dataDir2, "a2a-config.json");
    this.config = this.loadConfig();
    this.server = new A2AServer(this.config, dataDir2);
    this.client = new A2AClient(this.config);
    this.server.on("log", (entry) => this.emit("log", entry));
    this.server.on("taskComplete", (task) => this.emit("taskComplete", task));
  }
  server;
  client;
  configPath;
  config;
  outboundLogs = [];
  loadConfig() {
    if (!fs__namespace.existsSync(this.dataDir)) fs__namespace.mkdirSync(this.dataDir, { recursive: true });
    if (fs__namespace.existsSync(this.configPath)) {
      try {
        return JSON.parse(fs__namespace.readFileSync(this.configPath, "utf-8"));
      } catch {
      }
    }
    const defaults = {
      port: 3100,
      defaultModel: "llama3.1:latest",
      skillModelMap: DEFAULT_SKILL_MODEL_MAP,
      remoteAgents: [],
      enabled: true
    };
    fs__namespace.writeFileSync(this.configPath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  saveConfig(config) {
    this.config = config;
    fs__namespace.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
    if (this.server.isRunning()) {
      this.server.stop().then(() => {
        this.server = new A2AServer(this.config, this.dataDir);
        this.server.on("log", (e) => this.emit("log", e));
        if (this.config.enabled) this.server.start().catch(console.error);
      });
    }
  }
  async start() {
    if (!this.config.enabled) return;
    await this.server.start();
  }
  async stop() {
    await this.server.stop();
  }
  getStatus() {
    return {
      running: this.server.isRunning(),
      port: this.config.port,
      defaultModel: this.config.defaultModel,
      skillModelMap: this.config.skillModelMap,
      remoteAgents: this.config.remoteAgents,
      enabled: this.config.enabled
    };
  }
  getLogs() {
    return [...this.server.logs, ...this.outboundLogs].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    ).slice(0, 200);
  }
  /** Discover a remote agent's Agent Card */
  async discoverAgent(url2) {
    return this.client.discoverAgent(url2);
  }
  /** Delegate a task to a named remote agent */
  async delegateTask(agentName, prompt, skill, onStatusUpdate) {
    const agentConfig = this.config.remoteAgents.find(
      (a) => a.name === agentName && !a.disabled
    );
    if (!agentConfig) throw new Error(`Remote agent "${agentName}" not found or disabled`);
    const logEntry = {
      id: makeId$1(),
      direction: "outbound",
      remoteAgent: agentName,
      skill,
      prompt,
      status: "working",
      startedAt: now()
    };
    this.outboundLogs.unshift(logEntry);
    if (this.outboundLogs.length > 200) this.outboundLogs.pop();
    this.emit("log", logEntry);
    try {
      const task = await this.client.sendTask(agentConfig.url, prompt, skill, onStatusUpdate);
      logEntry.status = task.status.state;
      logEntry.result = task.artifacts?.[0]?.parts?.[0]?.text?.slice(0, 500);
      logEntry.finishedAt = now();
      this.emit("log", logEntry);
      return task;
    } catch (err) {
      logEntry.status = "failed";
      logEntry.error = err.message;
      logEntry.finishedAt = now();
      this.emit("log", logEntry);
      throw err;
    }
  }
}
const modelRouter$1 = new ModelRouter();
const execAsync$1 = util.promisify(child_process.exec);
const TOOLS = [
  {
    name: "read_file",
    description: "Read the contents of a file in the currently open project.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: 'File path relative to the project root, e.g. "src/app.ts"' }
      },
      required: ["path"]
    }
  },
  {
    name: "write_file",
    description: "Create or overwrite a file in the currently open project.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "File path relative to the project root" },
        content: { type: "string", description: "Full file contents to write" }
      },
      required: ["path", "content"]
    }
  },
  {
    name: "list_files",
    description: "List all tracked files in the currently open project.",
    inputSchema: {
      type: "object",
      properties: {
        filter: { type: "string", description: 'Optional glob-style substring filter, e.g. ".ts"' }
      },
      required: []
    }
  },
  {
    name: "run_command",
    description: "Run a shell command in the project root directory and return stdout/stderr.",
    inputSchema: {
      type: "object",
      properties: {
        command: { type: "string", description: 'Shell command to execute, e.g. "npm test"' },
        timeout: { type: "string", description: "Optional timeout in milliseconds (default 60000)" }
      },
      required: ["command"]
    }
  },
  {
    name: "ask_agent",
    description: "Send a prompt to the local Ollama agent (same model selected in the IDE) and return its reply.",
    inputSchema: {
      type: "object",
      properties: {
        prompt: { type: "string", description: "The prompt to send to the agent" },
        model: { type: "string", description: "Optional Ollama model name override" }
      },
      required: ["prompt"]
    }
  },
  {
    name: "get_project_info",
    description: "Return information about the currently open project: workspace root, open file, and active model.",
    inputSchema: {
      type: "object",
      properties: {},
      required: []
    }
  }
];
function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function jsonRpcResult(id, result) {
  return JSON.stringify({ jsonrpc: "2.0", id, result });
}
function jsonRpcError(id, code, message) {
  return JSON.stringify({ jsonrpc: "2.0", id, error: { code, message } });
}
function sseEvent(event, data) {
  return `event: ${event}
data: ${data}

`;
}
function walkDir(dir) {
  const IGNORE = /* @__PURE__ */ new Set(["node_modules", ".git", "dist", "out", ".next", "__pycache__", ".venv", "venv", ".DS_Store"]);
  const results = [];
  const walk = (d) => {
    let entries;
    try {
      entries = fs__namespace.readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (IGNORE.has(e.name)) continue;
      const full = path__namespace.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else results.push(full);
    }
  };
  walk(dir);
  return results;
}
async function ollamaChat(model, prompt) {
  const httpModule = require("http");
  const payload = JSON.stringify({ model, stream: false, messages: [{ role: "user", content: prompt }] });
  return new Promise((resolve, reject) => {
    const req = httpModule.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/chat",
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) },
        timeout: 6e5
      },
      (res) => {
        let data = "";
        res.on("data", (c) => {
          data += c;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data).message?.content || data);
          } catch {
            resolve(data);
          }
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama timed out"));
    });
    req.write(payload);
    req.end();
  });
}
class McpHostServer extends events.EventEmitter {
  constructor(config) {
    super();
    this.config = config;
  }
  server = null;
  sessions = /* @__PURE__ */ new Map();
  // State callbacks — set by index.ts after construction
  getWorkspaceRoot = () => null;
  getOpenFile = () => null;
  getActiveModel = () => "llama3.1:latest";
  // ── Request handler ────────────────────────────────────────────────────────
  async handle(req, res) {
    const url2 = new URL(req.url || "/", `http://localhost:${this.config.port}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
    if (req.method === "GET" && url2.pathname === "/sse") {
      const sessionId = makeId();
      const postPath = `/message?sessionId=${sessionId}`;
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });
      res.write(sseEvent("endpoint", postPath));
      const session = {
        id: sessionId,
        res,
        postUrl: postPath,
        connectedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.sessions.set(sessionId, session);
      this.emit("clientConnected", sessionId);
      req.on("close", () => {
        this.sessions.delete(sessionId);
        this.emit("clientDisconnected", sessionId);
      });
      return;
    }
    if (req.method === "POST" && url2.pathname === "/message") {
      const sessionId = url2.searchParams.get("sessionId") || "";
      const session = this.sessions.get(sessionId);
      if (!session) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Session not found" }));
        return;
      }
      let body;
      try {
        const raw = await new Promise((resolve, reject) => {
          let d = "";
          req.on("data", (c) => {
            d += c;
          });
          req.on("end", () => resolve(d));
          req.on("error", reject);
        });
        body = JSON.parse(raw);
      } catch {
        res.writeHead(400);
        res.end();
        return;
      }
      res.writeHead(202);
      res.end();
      const response = await this.handleJsonRpc(body);
      if (response && session.res.writable) {
        session.res.write(sseEvent("message", response));
      }
      return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
  // ── JSON-RPC dispatcher ───────────────────────────────────────────────────
  async handleJsonRpc(body) {
    const { method, params, id } = body;
    try {
      if (method === "initialize") {
        return jsonRpcResult(id, {
          protocolVersion: "2024-11-05",
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: "agentic-ide", version: "1.0.0" }
        });
      }
      if (method === "notifications/initialized") return null;
      if (method === "tools/list") {
        return jsonRpcResult(id, { tools: TOOLS });
      }
      if (method === "tools/call") {
        const toolName = params?.name || "";
        const args = params?.arguments || {};
        const result = await this.executeTool(toolName, args);
        return jsonRpcResult(id, {
          content: [{ type: "text", text: result }]
        });
      }
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
    } catch (err) {
      return jsonRpcError(id, -32e3, err.message || String(err));
    }
  }
  // ── Tool execution ────────────────────────────────────────────────────────
  async executeTool(name, args) {
    const root = this.getWorkspaceRoot();
    switch (name) {
      case "read_file": {
        if (!root) throw new Error("No project folder is open in the IDE");
        const filePath = args.path;
        const abs = path__namespace.isAbsolute(filePath) ? filePath : path__namespace.join(root, filePath);
        if (!abs.startsWith(root)) throw new Error("Path must be within the project root");
        return fs__namespace.readFileSync(abs, "utf-8");
      }
      case "write_file": {
        if (!root) throw new Error("No project folder is open in the IDE");
        const filePath = args.path;
        const abs = path__namespace.isAbsolute(filePath) ? filePath : path__namespace.join(root, filePath);
        if (!abs.startsWith(root)) throw new Error("Path must be within the project root");
        fs__namespace.mkdirSync(path__namespace.dirname(abs), { recursive: true });
        fs__namespace.writeFileSync(abs, args.content, "utf-8");
        this.emit("fileWritten", abs);
        return `File written: ${filePath}`;
      }
      case "list_files": {
        if (!root) throw new Error("No project folder is open in the IDE");
        const filter = args.filter || "";
        const files = walkDir(root).map((f) => f.replace(root + path__namespace.sep, "").replace(/\\/g, "/")).filter((f) => !filter || f.includes(filter));
        return files.join("\n");
      }
      case "run_command": {
        if (!root) throw new Error("No project folder is open in the IDE");
        const command = args.command;
        const timeout = parseInt(args.timeout) || 6e4;
        try {
          const { stdout, stderr } = await execAsync$1(command, { cwd: root, timeout, encoding: "utf-8" });
          const out = [stdout?.trim(), stderr?.trim()].filter(Boolean).join("\n--- stderr ---\n");
          return out || "(no output)";
        } catch (err) {
          return `Command failed: ${err.message}
${err.stderr || ""}`;
        }
      }
      case "ask_agent": {
        const prompt = args.prompt;
        let model = args.model;
        if (!model) {
          const rec = modelRouter$1.selectModel(prompt, [], this.getActiveModel());
          model = rec.selectedModel || this.getActiveModel();
        }
        return await ollamaChat(model, prompt);
      }
      case "get_project_info": {
        return JSON.stringify({
          workspaceRoot: this.getWorkspaceRoot() || null,
          openFile: this.getOpenFile() || null,
          activeModel: this.getActiveModel(),
          connectedClients: this.sessions.size,
          tools: TOOLS.map((t) => t.name)
        }, null, 2);
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  start() {
    return new Promise((resolve, reject) => {
      this.server = http__namespace.createServer((req, res) => {
        this.handle(req, res).catch((err) => {
          res.writeHead(500);
          res.end(JSON.stringify({ error: err.message }));
        });
      });
      this.server.on("error", reject);
      this.server.listen(this.config.port, "0.0.0.0", () => resolve());
    });
  }
  stop() {
    return new Promise((resolve) => {
      for (const session of this.sessions.values()) {
        try {
          session.res.end();
        } catch {
        }
      }
      this.sessions.clear();
      if (this.server) {
        this.server.close(() => resolve());
        this.server = null;
      } else {
        resolve();
      }
    });
  }
  isRunning() {
    return this.server !== null && this.server.listening;
  }
  getStatus() {
    return {
      running: this.isRunning(),
      port: this.config.port,
      connectedClients: this.sessions.size,
      enabled: this.config.enabled,
      tools: TOOLS
    };
  }
}
class McpHostManager extends events.EventEmitter {
  constructor(dataDir2) {
    super();
    this.dataDir = dataDir2;
    this.configPath = path__namespace.join(dataDir2, "mcp-host-config.json");
    this.config = this.loadConfig();
    this.server = new McpHostServer(this.config);
    this.server.on("clientConnected", (id) => this.emit("clientConnected", id));
    this.server.on("clientDisconnected", (id) => this.emit("clientDisconnected", id));
    this.server.on("fileWritten", (p) => this.emit("fileWritten", p));
  }
  server;
  configPath;
  config;
  loadConfig() {
    if (!fs__namespace.existsSync(this.dataDir)) fs__namespace.mkdirSync(this.dataDir, { recursive: true });
    if (fs__namespace.existsSync(this.configPath)) {
      try {
        return JSON.parse(fs__namespace.readFileSync(this.configPath, "utf-8"));
      } catch {
      }
    }
    const defaults = { port: 3101, enabled: true };
    fs__namespace.writeFileSync(this.configPath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  saveConfig(cfg) {
    this.config = cfg;
    fs__namespace.writeFileSync(this.configPath, JSON.stringify(cfg, null, 2));
    if (this.server.isRunning()) {
      this.server.stop().then(() => {
        this.server = this.buildServer();
        if (cfg.enabled) this.server.start().catch(console.error);
      });
    }
  }
  buildServer() {
    const s = new McpHostServer(this.config);
    s.on("clientConnected", (id) => this.emit("clientConnected", id));
    s.on("clientDisconnected", (id) => this.emit("clientDisconnected", id));
    s.on("fileWritten", (p) => this.emit("fileWritten", p));
    s.getWorkspaceRoot = this.server.getWorkspaceRoot;
    s.getOpenFile = this.server.getOpenFile;
    s.getActiveModel = this.server.getActiveModel;
    return s;
  }
  // Called by index.ts to keep the server aware of IDE state
  setWorkspaceRoot(root) {
    this.server.getWorkspaceRoot = () => root;
  }
  setOpenFile(file) {
    this.server.getOpenFile = () => file;
  }
  setActiveModel(model) {
    this.server.getActiveModel = () => model;
  }
  async start() {
    if (!this.config.enabled) return;
    await this.server.start();
  }
  async stop() {
    await this.server.stop();
  }
  getStatus() {
    return this.server.getStatus();
  }
}
const appSupportDir$1 = path__namespace.dirname(electron.app.getPath("userData"));
const dataDir$1 = path__namespace.join(appSupportDir$1, "agentic-ide");
const memoryDir = path__namespace.join(dataDir$1, "memory");
const itemsPath = path__namespace.join(memoryDir, "items.json");
let items = [];
function load() {
  try {
    if (!fs__namespace.existsSync(memoryDir)) return;
    const raw = fs__namespace.readFileSync(itemsPath, "utf-8");
    items = JSON.parse(raw || "[]");
  } catch (e) {
    items = [];
  }
}
function saveToDisk() {
  try {
    if (!fs__namespace.existsSync(memoryDir)) fs__namespace.mkdirSync(memoryDir, { recursive: true });
    fs__namespace.writeFileSync(itemsPath, JSON.stringify(items, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write memory items:", e);
  }
}
async function store(item) {
  const id = item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const mi = { id, scope: item.scope, text: item.text, meta: item.meta || {}, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  items.push(mi);
  saveToDisk();
  return mi;
}
async function query(q, scope, limit = 5) {
  const candidates = scope ? items.filter((i) => i.scope === scope) : items.slice();
  if (!q || q.trim() === "") {
    return candidates.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
  }
  const tokens = q.toLowerCase().split(/\W+/).filter(Boolean);
  function score(text) {
    const t = text.toLowerCase();
    let s = 0;
    for (const tok of tokens) if (t.includes(tok)) s += 1;
    return s;
  }
  const scored = candidates.map((c) => ({ c, s: score(c.text) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s || b.c.createdAt.localeCompare(a.c.createdAt)).slice(0, limit).map((x) => x.c);
  return scored;
}
async function all() {
  return items.slice();
}
load();
const execFileAsync = util.promisify(child_process.execFile);
const execAsync = util.promisify(child_process.exec);
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
      sandbox: false,
      webSecurity: false
      // allow renderer to fetch localhost (Ollama) from file:// context
    }
  });
  if (process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  createWindow();
  mcpManager.startAll().catch(console.error);
  a2aManager.start().catch(console.error);
  mcpHostManager.start().catch(console.error);
});
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
  mcpManager.stopAll();
  a2aManager.stop().catch(console.error);
  mcpHostManager.stop().catch(console.error);
});
electron.ipcMain.handle("open-folder", async () => {
  const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled) return null;
  const dirPath = result.filePaths[0];
  mcpManager.setWorkspaceRoot(dirPath);
  mcpHostManager.setWorkspaceRoot(dirPath);
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
    mcpHostManager.setOpenFile(filePath);
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
    let branch = "main";
    try {
      const { stdout: branchOut } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], { cwd: dirPath, encoding: "utf-8" });
      branch = branchOut.trim();
    } catch {
      try {
        const { stdout: branchOut } = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: dirPath, encoding: "utf-8" });
        branch = branchOut.trim();
      } catch {
      }
    }
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
electron.ipcMain.handle("exec-command", async (_e, dirPath, command) => {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: dirPath, encoding: "utf-8", timeout: 6e4 });
    return { success: true, stdout, stderr };
  } catch (e) {
    return { success: false, error: e.message, stdout: e.stdout, stderr: e.stderr };
  }
});
electron.ipcMain.handle("github-login", async () => {
  return true;
});
electron.ipcMain.handle("git-is-repo", async (_e, dirPath) => {
  try {
    await execFileAsync("git", ["rev-parse", "--is-inside-work-tree"], { cwd: dirPath });
    return true;
  } catch {
    return false;
  }
});
electron.ipcMain.handle("git-init", async (_e, dirPath) => {
  try {
    await execFileAsync("git", ["init"], { cwd: dirPath });
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: dirPath }).catch(() => {
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-remote-add", async (_e, dirPath, name, url2) => {
  try {
    await execFileAsync("git", ["remote", "remove", name], { cwd: dirPath }).catch(() => {
    });
    await execFileAsync("git", ["remote", "add", name, url2], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("git-get-remote", async (_e, dirPath) => {
  try {
    const { stdout } = await execFileAsync("git", ["remote", "get-url", "origin"], { cwd: dirPath, encoding: "utf-8" });
    const url2 = stdout.trim();
    return url2.replace(/https:\/\/[^@]+@github.com/, "https://github.com");
  } catch {
    return null;
  }
});
electron.ipcMain.handle("git-push-upstream", async (_e, dirPath, branch) => {
  try {
    await execFileAsync("git", ["push", "-u", "origin", branch], { cwd: dirPath });
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
electron.ipcMain.handle("github-create-repo", async (_e, token, repoName, isPrivate, description) => {
  return new Promise((resolve) => {
    const body = JSON.stringify({ name: repoName, private: isPrivate, description, auto_init: false });
    const options = {
      hostname: "api.github.com",
      path: "/user/repos",
      method: "POST",
      headers: {
        "Authorization": `token ${token}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
        "User-Agent": "agentic-ide"
      }
    };
    const https2 = require("https");
    const req = https2.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.clone_url) {
            resolve({ success: true, cloneUrl: json.clone_url });
          } else {
            resolve({ success: false, error: json.message || "Unknown error" });
          }
        } catch (e) {
          resolve({ success: false, error: e.message });
        }
      });
    });
    req.on("error", (e) => resolve({ success: false, error: e.message }));
    req.write(body);
    req.end();
  });
});
const appSupportDir = path__namespace.dirname(electron.app.getPath("userData"));
const dataDir = path__namespace.join(appSupportDir, "agentic-ide");
const sessionsPath = path__namespace.join(dataDir, "sessions.json");
const mcpManager = new McpManager(dataDir);
const a2aManager = new A2AManager(dataDir);
const mcpHostManager = new McpHostManager(dataDir);
electron.ipcMain.handle("ollama-tags", async () => {
  return new Promise((resolve) => {
    const req = http__namespace.get("http://127.0.0.1:11434/api/tags", { timeout: 5e3 }, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          const names = (data.models || []).map((m) => m.name);
          resolve(names);
        } catch {
          resolve([]);
        }
      });
    });
    req.on("error", () => resolve([]));
    req.on("timeout", () => {
      req.destroy();
      resolve([]);
    });
  });
});
function performOllamaChat(payload) {
  return new Promise((resolve, reject) => {
    let body;
    try {
      body = JSON.stringify(payload);
    } catch (err) {
      return reject(new Error(`Failed to serialize payload: ${err.message}`));
    }
    const logPath = path__namespace.join(electron.app.getPath("userData"), "chat-debug.log");
    const entry = JSON.stringify({
      ts: (/* @__PURE__ */ new Date()).toISOString(),
      model: payload.model,
      messageCount: payload.messages?.length,
      toolCount: payload.tools?.length || 0,
      payloadBytes: Buffer.byteLength(body),
      messages: payload.messages,
      tools: payload.tools
    }, null, 2) + "\n---\n";
    fs__namespace.promises.appendFile(logPath, entry).catch(() => {
    });
    const options = {
      hostname: "127.0.0.1",
      port: 11434,
      path: "/api/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      },
      timeout: 6e5
      // 10 minutes
    };
    const req = http__namespace.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => resolve({ statusCode: res.statusCode || 200, data }));
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama request timed out"));
    });
    req.write(body);
    req.end();
  });
}
electron.ipcMain.handle("ollama-chat", async (_e, payload) => {
  if (payload?.model) mcpHostManager.setActiveModel(payload.model);
  try {
    let result = await performOllamaChat(payload);
    if (result.statusCode === 400 && payload && payload.tools) {
      const shouldRetry = (() => {
        try {
          const parsed = JSON.parse(result.data);
          const msg = parsed.error || "";
          return msg.includes("does not support tools") || msg.includes("does not support tool") || msg.includes("find closing '}'") || msg.includes("looks like object") || msg.includes("parse");
        } catch {
          return true;
        }
      })();
      if (shouldRetry) {
        const fallbackPayload = { ...payload };
        delete fallbackPayload.tools;
        const logPath = path__namespace.join(electron.app.getPath("userData"), "chat-debug.log");
        fs__namespace.promises.appendFile(logPath, `[RETRY without tools at ${(/* @__PURE__ */ new Date()).toISOString()}] original error: ${result.data.slice(0, 200)}
`).catch(() => {
        });
        result = await performOllamaChat(fallbackPayload);
      }
    }
    if (result.statusCode >= 400) {
      throw new Error(`Ollama error (${result.statusCode}): ${result.data}`);
    }
    return result.data;
  } catch (err) {
    throw new Error(err.message || String(err));
  }
});
electron.ipcMain.handle("memory-store", async (_e, item) => {
  try {
    return await store(item);
  } catch (e) {
    return null;
  }
});
electron.ipcMain.handle("memory-query", async (_e, q, scope, limit) => {
  try {
    return await query(q, scope, limit || 5);
  } catch (e) {
    return [];
  }
});
electron.ipcMain.handle("memory-all", async () => {
  try {
    return await all();
  } catch (e) {
    return [];
  }
});
electron.ipcMain.handle("load-sessions", async () => {
  try {
    const data = await fs__namespace.promises.readFile(sessionsPath, "utf-8");
    const parsed = JSON.parse(data);
    let ws = null;
    if (parsed) {
      if (Array.isArray(parsed) && parsed.length > 0) {
        ws = parsed[0].workspace || null;
      } else if (typeof parsed === "object") {
        const sessions = parsed.sessions;
        if (Array.isArray(sessions) && sessions.length > 0) {
          ws = sessions[0].workspace || null;
        }
      }
    }
    if (ws) {
      mcpManager.setWorkspaceRoot(ws);
      mcpHostManager.setWorkspaceRoot(ws);
    }
    return parsed;
  } catch {
  }
  return null;
});
electron.ipcMain.handle("list-backups", async () => {
  try {
    const backupDir = path__namespace.join(dataDir, "backups");
    if (!fs__namespace.existsSync(backupDir)) return [];
    const files = await fs__namespace.promises.readdir(backupDir);
    const backupFiles = files.filter((f) => f.startsWith("sessions.")).sort().reverse();
    const recentBackups = backupFiles.slice(0, 50);
    const backupsWithDetails = await Promise.all(recentBackups.map(async (file) => {
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
    const backupPath = path__namespace.join(dataDir, "backups", backupFileName);
    await fs__namespace.promises.copyFile(backupPath, sessionsPath);
    await logActivity("snapshot-restore", { snapshot: backupFileName });
    const data = await fs__namespace.promises.readFile(sessionsPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
});
let lastBackupTime = 0;
const BACKUP_THROTTLE_MS = 6e4;
const MAX_BACKUPS = 100;
electron.ipcMain.handle("save-sessions", async (_e, data) => {
  try {
    if (!fs__namespace.existsSync(dataDir)) fs__namespace.mkdirSync(dataDir, { recursive: true });
    const now2 = Date.now();
    if (fs__namespace.existsSync(sessionsPath) && now2 - lastBackupTime >= BACKUP_THROTTLE_MS) {
      const backupDir = path__namespace.join(dataDir, "backups");
      if (!fs__namespace.existsSync(backupDir)) fs__namespace.mkdirSync(backupDir);
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
      const backupPath = path__namespace.join(backupDir, `sessions.${timestamp}.json`);
      await fs__namespace.promises.copyFile(sessionsPath, backupPath);
      lastBackupTime = now2;
      try {
        const files = await fs__namespace.promises.readdir(backupDir);
        const backupFiles = files.filter((f) => f.startsWith("sessions.")).sort();
        if (backupFiles.length > MAX_BACKUPS) {
          const toDelete = backupFiles.slice(0, backupFiles.length - MAX_BACKUPS);
          await Promise.all(toDelete.map((f) => fs__namespace.promises.unlink(path__namespace.join(backupDir, f)).catch(() => {
          })));
        }
      } catch {
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
    const backupDir = path__namespace.join(dataDir, "backups");
    if (fs__namespace.existsSync(backupDir)) {
      const files = await fs__namespace.promises.readdir(backupDir);
      const backupFiles = files.filter((f) => f.startsWith("sessions.") && f.endsWith(".json")).sort().reverse();
      const recentBackups = backupFiles.slice(0, 50);
      await Promise.all(recentBackups.map(async (file) => {
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
electron.ipcMain.handle("mcp-get-config", () => {
  return mcpManager.getConfig();
});
electron.ipcMain.handle("mcp-save-config", (_e, config) => {
  mcpManager.saveConfig(config);
  return true;
});
electron.ipcMain.handle("mcp-get-servers", () => {
  return mcpManager.getServersStatus();
});
electron.ipcMain.handle("mcp-restart-server", (_e, name) => {
  return mcpManager.restartServer(name);
});
electron.ipcMain.handle("mcp-call-tool", (_e, serverName, toolName, args) => {
  return mcpManager.callTool(serverName, toolName, args);
});
electron.ipcMain.handle("a2a-get-status", () => {
  return a2aManager.getStatus();
});
electron.ipcMain.handle("a2a-get-config", () => {
  return a2aManager.config;
});
electron.ipcMain.handle("a2a-save-config", (_e, config) => {
  a2aManager.saveConfig(config);
  return true;
});
electron.ipcMain.handle("a2a-get-logs", () => {
  return a2aManager.getLogs();
});
electron.ipcMain.handle("a2a-discover-agent", async (_e, url2) => {
  return a2aManager.discoverAgent(url2);
});
electron.ipcMain.handle("a2a-delegate-task", async (_e, agentName, prompt, skill) => {
  return a2aManager.delegateTask(agentName, prompt, skill);
});
electron.ipcMain.handle("mcp-host-get-status", () => {
  return mcpHostManager.getStatus();
});
electron.ipcMain.handle("mcp-host-get-config", () => {
  return mcpHostManager.config;
});
electron.ipcMain.handle("mcp-host-save-config", (_e, config) => {
  mcpHostManager.saveConfig(config);
  return true;
});
const modelRouter = new ModelRouter();
function getDeviceProfile() {
  const memoryGiB = Math.max(1, Math.floor(os__namespace.totalmem() / 1024 ** 3));
  const tier = memoryGiB >= 48 ? "workstation" : memoryGiB >= 32 ? "performance" : memoryGiB >= 16 ? "standard" : "compact";
  return {
    platform: process.platform,
    architecture: process.arch,
    cpuCores: os__namespace.cpus().length,
    memoryGiB,
    modelMemoryBudgetGiB: Math.max(2, Math.floor(memoryGiB * 0.65)),
    tier
  };
}
async function getInstalledOllamaModels() {
  return new Promise((resolve) => {
    const req = http__namespace.get("http://127.0.0.1:11434/api/tags", { timeout: 5e3 }, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          const data = JSON.parse(body);
          const names = (data.models || []).map((m) => m.name);
          resolve(names);
        } catch {
          resolve([]);
        }
      });
    });
    req.on("error", () => resolve([]));
    req.on("timeout", () => {
      req.destroy();
      resolve([]);
    });
  });
}
electron.ipcMain.handle("model-router-select", async (_e, prompt, installedModels, fallbackModel) => {
  const models = installedModels && installedModels.length > 0 ? installedModels : await getInstalledOllamaModels();
  const device = getDeviceProfile();
  const fallback = modelRouter.selectModel(prompt, models, fallbackModel, device);
  const recommendedRouterModel = device.memoryGiB >= 48 ? "qwen3.6:35b" : device.memoryGiB >= 32 ? "qwen3.6:27b" : device.memoryGiB >= 16 ? "qwen3.6:9b" : "qwen3.6:4b";
  const compatibleModels = models.filter((name) => modelRouter.isModelSuitableForDevice(name, device));
  const routerModel = compatibleModels.find((name) => name.startsWith("qwen3.6:35b")) || compatibleModels.find((name) => name.startsWith("qwen3.6:"));
  if (!routerModel || models.length === 0) {
    return {
      ...fallback,
      usedLlmRouter: false,
      recommendedRouterModel,
      reason: routerModel ? fallback.reason : `${fallback.reason} Pull ${recommendedRouterModel} to enable LLM-powered Auto routing.`
    };
  }
  const routingPrompt = [
    "You are the model router for a local coding IDE. Select the best installed model for this request.",
    'Return JSON only: {"taskCategory":"code-generation|code-review|debugging|planning|reasoning|general-chat","selectedModel":"exact installed model name","confidence":0-1,"reason":"short explanation"}.',
    "Choose only a value from INSTALLED_MODELS. Prefer coding and tool-capable models for implementation, debugging, review, and repository tasks; prefer general/reasoning models for discussion and planning.",
    `DEVICE: ${device.platform} ${device.architecture}, ${device.memoryGiB} GiB RAM, ${device.cpuCores} CPU cores. Maximum recommended model footprint: ${device.modelMemoryBudgetGiB} GiB.`,
    `INSTALLED_MODELS_SAFE_FOR_DEVICE: ${JSON.stringify(compatibleModels)}`,
    `USER_REQUEST: ${prompt.slice(0, 12e3)}`
  ].join("\n");
  try {
    const result = await performOllamaChat({
      model: routerModel,
      stream: false,
      format: "json",
      options: { temperature: 0, num_predict: 180 },
      messages: [{ role: "user", content: routingPrompt }]
    });
    if (result.statusCode >= 400) throw new Error(`Router returned ${result.statusCode}`);
    const payload = JSON.parse(result.data);
    const content = String(payload?.message?.content || "").trim();
    const decision = JSON.parse(content.replace(/^```json\s*|\s*```$/g, ""));
    if (!compatibleModels.includes(decision.selectedModel)) throw new Error("Router chose a model that is not compatible with this device");
    return {
      ...fallback,
      taskCategory: typeof decision.taskCategory === "string" ? decision.taskCategory : fallback.taskCategory,
      selectedModel: decision.selectedModel,
      confidence: typeof decision.confidence === "number" ? Math.max(0, Math.min(1, decision.confidence)) : fallback.confidence,
      reason: typeof decision.reason === "string" ? decision.reason.slice(0, 240) : fallback.reason,
      suitabilityScore: 100,
      isOptimal: true,
      recommendedModelToPull: void 0,
      usedLlmRouter: true,
      routerModel
    };
  } catch (error) {
    console.warn("LLM model router failed; using deterministic fallback:", error);
    return { ...fallback, usedLlmRouter: false, routerModel, recommendedRouterModel };
  }
});
electron.ipcMain.handle("ollama-pull-model", async (_e, modelName) => {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ name: modelName, stream: false });
    const req = http__namespace.request(
      {
        hostname: "127.0.0.1",
        port: 11434,
        path: "/api/pull",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        },
        timeout: 6e5
        // 10 min for model download
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Pull failed with status ${res.statusCode}: ${body}`));
          } else {
            resolve({ success: true });
          }
        });
      }
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Model pull timed out"));
    });
    req.write(payload);
    req.end();
  });
});
