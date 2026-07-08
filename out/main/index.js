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
            if (msg.id !== void 0) {
              const pending = this.pendingRequests.get(msg.id);
              if (pending) {
                this.pendingRequests.delete(msg.id);
                if (msg.error) {
                  pending.reject(msg.error);
                } else {
                  pending.resolve(msg.result);
                }
              }
            } else if (msg.method === "workspace/roots" || msg.method === "roots/list") {
              const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null;
              const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path__namespace.basename(rootPath) }] : [];
              const response = {
                jsonrpc: "2.0",
                id: msg.id,
                result: { roots }
              };
              this.sendRaw(response);
            }
          } catch (err) {
            this.log(`[Error Parsing JSON-RPC] ${err.message}`);
          }
        });
        this.process.on("exit", (code, signal) => {
          this.connectionStatus = "disconnected";
          this.log(`Server process exited. Code: ${code}, Signal: ${signal}`);
          for (const pending of this.pendingRequests.values()) {
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
            this.log(`Received initialize response. Protocol Version: ${initResult.protocolVersion}`);
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
  sendRequest(method, params) {
    return new Promise((resolve, reject) => {
      if (this.connectionStatus === "error" && !this.process) {
        return reject(new Error(`Server is in error state: ${this.errorMsg}`));
      }
      if (!this.process) {
        return reject(new Error(`Server is not running`));
      }
      const id = this.nextId++;
      const payload = { jsonrpc: "2.0", id, method, params };
      this.pendingRequests.set(id, { resolve, reject });
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
        this.log(`Received initialize response. Protocol Version: ${initResult.protocolVersion}`);
        this.sendNotification("notifications/initialized", {});
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
        if (msg.id !== void 0) {
          const pending = this.pendingRequests.get(msg.id);
          if (pending) {
            this.pendingRequests.delete(msg.id);
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
  async sendRequest(method, params) {
    if (!this.postUrl) {
      throw new Error("Message endpoint not established yet");
    }
    const id = this.nextId++;
    const payload = { jsonrpc: "2.0", id, method, params };
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.postMessage(payload).catch((err) => {
        this.pendingRequests.delete(id);
        reject(err);
      });
    });
  }
  sendNotification(method, params) {
    if (!this.postUrl) return;
    const payload = { jsonrpc: "2.0", method, params };
    this.postMessage(payload).catch((err) => {
      this.log(`[Error sending notification] ${err.message}`);
    });
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
  sendRequest(method, params) {
    const id = this.nextId++;
    const payload = { jsonrpc: "2.0", id, method, params };
    return this.post(payload, id);
  }
  async sendNotification(method, params) {
    const payload = { jsonrpc: "2.0", method, params };
    await this.post(payload, null);
  }
  post(payload, requestId) {
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
      this.log(`[POST] ${body}`);
      this.log(`[Headers] ${JSON.stringify(this.extraHeaders)}`);
      const req = requestModule.request(parsedUrl, { method: "POST", headers }, (res) => {
        if (!this.sessionId && res.headers["mcp-session-id"]) {
          this.sessionId = res.headers["mcp-session-id"];
          this.log(`Session ID: ${this.sessionId}`);
        }
        if (res.statusCode && res.statusCode >= 400) {
          let errBody = "";
          res.on("data", (c) => {
            errBody += c.toString();
          });
          res.on("end", () => {
            const hint = res.statusCode === 405 ? " — wrong endpoint or method; verify the URL is the Streamable HTTP MCP endpoint." : res.statusCode === 400 ? " — payload rejected; check JSON-RPC structure." : "";
            reject(new Error(`HTTP ${res.statusCode}${hint} Body: ${errBody.slice(0, 200)}`));
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
                    if (msg.error) reject(msg.error);
                    else resolve(msg.result);
                  } else if (msg.id !== void 0) {
                    const pending = this.pendingRequests.get(msg.id);
                    if (pending) {
                      this.pendingRequests.delete(msg.id);
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
            if (requestId === null) resolve(void 0);
          });
        } else {
          let raw = "";
          res.on("data", (c) => {
            raw += c.toString();
          });
          res.on("end", () => {
            this.log(`[Response] ${raw.slice(0, 500)}`);
            if (requestId === null) {
              resolve(void 0);
              return;
            }
            try {
              const msg = JSON.parse(raw);
              if (msg.error) reject(msg.error);
              else resolve(msg.result);
            } catch (e) {
              reject(new Error(`Failed to parse response: ${e.message}. Body: ${raw.slice(0, 200)}`));
            }
          });
        }
      });
      req.on("error", reject);
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
          // ----------------------------------------------------------------
          // Figma MCP Bridge
          // Runs a local stdio bridge that translates MCP tool calls into
          // Figma REST API requests.
          //
          // Setup:
          //   1. Get a personal access token from Figma account settings.
          //   2. Replace YOUR_FIGMA_ACCESS_TOKEN below with that value.
          //   3. Set "disabled": false to activate.
          //
          // Bridge used: @modelcontextprotocol/server-figma (community)
          // Docs: https://github.com/GLips/Figma-Context-MCP
          // ----------------------------------------------------------------
          "figma": {
            command: "npx",
            args: ["-y", "figma-developer-mcp", "--figma-api-key", "YOUR_FIGMA_ACCESS_TOKEN", "--stdio"],
            env: {},
            disabled: true
          },
          // ----------------------------------------------------------------
          // Penpot MCP Bridge
          // Runs a local stdio bridge that translates MCP tool calls into
          // Penpot REST API requests.
          //
          // Setup:
          //   1. Start a Penpot instance (local or cloud: https://penpot.app).
          //   2. Generate an access token in your Penpot profile settings.
          //   3. Replace the env values below and set "disabled": false.
          //
          // Bridge used: penpot-mcp (community)
          // Docs: https://github.com/montevive/penpot-mcp
          // ----------------------------------------------------------------
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
});
electron.ipcMain.handle("open-folder", async () => {
  const result = await electron.dialog.showOpenDialog({ properties: ["openDirectory"] });
  if (result.canceled) return null;
  const dirPath = result.filePaths[0];
  mcpManager.setWorkspaceRoot(dirPath);
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
electron.ipcMain.handle("ollama-chat", async (_e, payload) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: "127.0.0.1",
      port: 11434,
      path: "/api/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      },
      timeout: 12e4
    };
    const req = http__namespace.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Ollama request timed out"));
    });
    req.write(body);
    req.end();
  });
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
    const now = Date.now();
    if (fs__namespace.existsSync(sessionsPath) && now - lastBackupTime >= BACKUP_THROTTLE_MS) {
      const backupDir = path__namespace.join(dataDir, "backups");
      if (!fs__namespace.existsSync(backupDir)) fs__namespace.mkdirSync(backupDir);
      const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-");
      const backupPath = path__namespace.join(backupDir, `sessions.${timestamp}.json`);
      await fs__namespace.promises.copyFile(sessionsPath, backupPath);
      lastBackupTime = now;
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
