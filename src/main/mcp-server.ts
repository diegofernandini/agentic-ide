/**
 * MCP Server — exposes this IDE as an MCP tool provider
 *
 * External MCP clients (Claude Desktop, Cursor, other agents) can connect to:
 *   SSE transport:  http://localhost:3101/sse
 *   Config snippet for Claude Desktop / mcp.json:
 *     { "url": "http://localhost:3101/sse" }
 *
 * Tools exposed:
 *   read_file        — read a file from the open project
 *   write_file       — write/create a file in the open project
 *   list_files       — list all files in the open project
 *   run_command      — execute a shell command in the project root
 *   ask_agent        — send a prompt through the local Ollama agent and return the reply
 *   get_project_info — return current workspace root, open file, and model
 */

import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'
import { EventEmitter } from 'events'
import { ModelRouter } from './model-router'

const modelRouter = new ModelRouter()
const execAsync = promisify(exec)

// ─── Types ────────────────────────────────────────────────────────────────────

export interface McpServerHostConfig {
  port: number
  enabled: boolean
}

export interface McpHostStatus {
  running: boolean
  port: number
  connectedClients: number
  enabled: boolean
  tools: ToolDefinition[]
}

export interface ToolDefinition {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, { type: string; description: string }>
    required: string[]
  }
}

interface SseSession {
  id: string
  res: http.ServerResponse
  postUrl: string
  connectedAt: string
}

// ─── Tool definitions ─────────────────────────────────────────────────────────

const TOOLS: ToolDefinition[] = [
  {
    name: 'read_file',
    description: 'Read the contents of a file in the currently open project.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path relative to the project root, e.g. "src/app.ts"' }
      },
      required: ['path']
    }
  },
  {
    name: 'write_file',
    description: 'Create or overwrite a file in the currently open project.',
    inputSchema: {
      type: 'object',
      properties: {
        path:    { type: 'string', description: 'File path relative to the project root' },
        content: { type: 'string', description: 'Full file contents to write' }
      },
      required: ['path', 'content']
    }
  },
  {
    name: 'list_files',
    description: 'List all tracked files in the currently open project.',
    inputSchema: {
      type: 'object',
      properties: {
        filter: { type: 'string', description: 'Optional glob-style substring filter, e.g. ".ts"' }
      },
      required: []
    }
  },
  {
    name: 'run_command',
    description: 'Run a shell command in the project root directory and return stdout/stderr.',
    inputSchema: {
      type: 'object',
      properties: {
        command: { type: 'string', description: 'Shell command to execute, e.g. "npm test"' },
        timeout: { type: 'string', description: 'Optional timeout in milliseconds (default 60000)' }
      },
      required: ['command']
    }
  },
  {
    name: 'ask_agent',
    description: 'Send a prompt to the local Ollama agent (same model selected in the IDE) and return its reply.',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'The prompt to send to the agent' },
        model:  { type: 'string', description: 'Optional Ollama model name override' }
      },
      required: ['prompt']
    }
  },
  {
    name: 'get_project_info',
    description: 'Return information about the currently open project: workspace root, open file, and active model.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function jsonRpcResult(id: any, result: any) {
  return JSON.stringify({ jsonrpc: '2.0', id, result })
}

function jsonRpcError(id: any, code: number, message: string) {
  return JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } })
}

function sseEvent(event: string, data: string): string {
  return `event: ${event}\ndata: ${data}\n\n`
}

function walkDir(dir: string): string[] {
  const IGNORE = new Set(['node_modules', '.git', 'dist', 'out', '.next', '__pycache__', '.venv', 'venv', '.DS_Store'])
  const results: string[] = []
  const walk = (d: string) => {
    let entries: fs.Dirent[]
    try { entries = fs.readdirSync(d, { withFileTypes: true }) } catch { return }
    for (const e of entries) {
      if (IGNORE.has(e.name)) continue
      const full = path.join(d, e.name)
      if (e.isDirectory()) walk(full)
      else results.push(full)
    }
  }
  walk(dir)
  return results
}

async function ollamaChat(model: string, prompt: string): Promise<string> {
  const httpModule = require('http') as typeof http
  const payload = JSON.stringify({ model, stream: false, messages: [{ role: 'user', content: prompt }] })
  return new Promise((resolve, reject) => {
    const req = httpModule.request(
      { hostname: '127.0.0.1', port: 11434, path: '/api/chat', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
        timeout: 600000 },
      res => {
        let data = ''
        res.on('data', (c: Buffer) => { data += c })
        res.on('end', () => {
          try { resolve(JSON.parse(data).message?.content || data) }
          catch { resolve(data) }
        })
      }
    )
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Ollama timed out')) })
    req.write(payload)
    req.end()
  })
}

// ─── MCP Host Server ──────────────────────────────────────────────────────────

export class McpHostServer extends EventEmitter {
  private server: http.Server | null = null
  private sessions = new Map<string, SseSession>()

  // State callbacks — set by index.ts after construction
  public getWorkspaceRoot: () => string | null = () => null
  public getOpenFile: () => string | null = () => null
  public getActiveModel: () => string = () => 'llama3.1:latest'

  constructor(private config: McpServerHostConfig) {
    super()
  }

  // ── Request handler ────────────────────────────────────────────────────────

  private async handle(req: http.IncomingMessage, res: http.ServerResponse) {
    const url = new URL(req.url || '/', `http://localhost:${this.config.port}`)

    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

    // ── SSE stream (client connects here first) ──────────────────────────────
    if (req.method === 'GET' && url.pathname === '/sse') {
      const sessionId = makeId()
      const postPath = `/message?sessionId=${sessionId}`

      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      })

      // Send the endpoint event so the client knows where to POST messages
      res.write(sseEvent('endpoint', postPath))

      const session: SseSession = {
        id: sessionId,
        res,
        postUrl: postPath,
        connectedAt: new Date().toISOString()
      }
      this.sessions.set(sessionId, session)
      this.emit('clientConnected', sessionId)

      req.on('close', () => {
        this.sessions.delete(sessionId)
        this.emit('clientDisconnected', sessionId)
      })
      return
    }

    // ── Message POST (JSON-RPC from client) ──────────────────────────────────
    if (req.method === 'POST' && url.pathname === '/message') {
      const sessionId = url.searchParams.get('sessionId') || ''
      const session = this.sessions.get(sessionId)
      if (!session) {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Session not found' }))
        return
      }

      let body: any
      try {
        const raw = await new Promise<string>((resolve, reject) => {
          let d = ''
          req.on('data', c => { d += c })
          req.on('end', () => resolve(d))
          req.on('error', reject)
        })
        body = JSON.parse(raw)
      } catch {
        res.writeHead(400); res.end(); return
      }

      // Acknowledge the POST immediately
      res.writeHead(202); res.end()

      // Process and push the response back over SSE
      const response = await this.handleJsonRpc(body)
      if (response && session.res.writable) {
        session.res.write(sseEvent('message', response))
      }
      return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  }

  // ── JSON-RPC dispatcher ───────────────────────────────────────────────────

  private async handleJsonRpc(body: any): Promise<string | null> {
    const { method, params, id } = body

    try {
      if (method === 'initialize') {
        return jsonRpcResult(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: 'agentic-ide', version: '1.0.0' }
        })
      }

      if (method === 'notifications/initialized') return null

      if (method === 'tools/list') {
        return jsonRpcResult(id, { tools: TOOLS })
      }

      if (method === 'tools/call') {
        const toolName: string = params?.name || ''
        const args: Record<string, any> = params?.arguments || {}
        const result = await this.executeTool(toolName, args)
        return jsonRpcResult(id, {
          content: [{ type: 'text', text: result }]
        })
      }

      return jsonRpcError(id, -32601, `Method not found: ${method}`)
    } catch (err: any) {
      return jsonRpcError(id, -32000, err.message || String(err))
    }
  }

  // ── Tool execution ────────────────────────────────────────────────────────

  private async executeTool(name: string, args: Record<string, any>): Promise<string> {
    const root = this.getWorkspaceRoot()

    switch (name) {

      case 'read_file': {
        if (!root) throw new Error('No project folder is open in the IDE')
        const filePath = args.path as string
        const abs = path.isAbsolute(filePath) ? filePath : path.join(root, filePath)
        if (!abs.startsWith(root)) throw new Error('Path must be within the project root')
        return fs.readFileSync(abs, 'utf-8')
      }

      case 'write_file': {
        if (!root) throw new Error('No project folder is open in the IDE')
        const filePath = args.path as string
        const abs = path.isAbsolute(filePath) ? filePath : path.join(root, filePath)
        if (!abs.startsWith(root)) throw new Error('Path must be within the project root')
        fs.mkdirSync(path.dirname(abs), { recursive: true })
        fs.writeFileSync(abs, args.content as string, 'utf-8')
        this.emit('fileWritten', abs)
        return `File written: ${filePath}`
      }

      case 'list_files': {
        if (!root) throw new Error('No project folder is open in the IDE')
        const filter = (args.filter as string) || ''
        const files = walkDir(root)
          .map(f => f.replace(root + path.sep, '').replace(/\\/g, '/'))
          .filter(f => !filter || f.includes(filter))
        return files.join('\n')
      }

      case 'run_command': {
        if (!root) throw new Error('No project folder is open in the IDE')
        const command = args.command as string
        const timeout = parseInt(args.timeout as string) || 60000
        try {
          const { stdout, stderr } = await execAsync(command, { cwd: root, timeout, encoding: 'utf-8' })
          const out = [stdout?.trim(), stderr?.trim()].filter(Boolean).join('\n--- stderr ---\n')
          return out || '(no output)'
        } catch (err: any) {
          return `Command failed: ${err.message}\n${err.stderr || ''}`
        }
      }

      case 'ask_agent': {
        const prompt = args.prompt as string
        let model = args.model as string
        if (!model) {
          const rec = modelRouter.selectModel(prompt, [], this.getActiveModel())
          model = rec.selectedModel || this.getActiveModel()
        }
        return await ollamaChat(model, prompt)
      }

      case 'get_project_info': {
        return JSON.stringify({
          workspaceRoot: this.getWorkspaceRoot() || null,
          openFile: this.getOpenFile() || null,
          activeModel: this.getActiveModel(),
          connectedClients: this.sessions.size,
          tools: TOOLS.map(t => t.name)
        }, null, 2)
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        this.handle(req, res).catch(err => {
          res.writeHead(500); res.end(JSON.stringify({ error: err.message }))
        })
      })
      this.server.on('error', reject)
      this.server.listen(this.config.port, '0.0.0.0', () => resolve())
    })
  }

  stop(): Promise<void> {
    return new Promise(resolve => {
      // Close all SSE connections cleanly
      for (const session of this.sessions.values()) {
        try { session.res.end() } catch {}
      }
      this.sessions.clear()
      if (this.server) {
        this.server.close(() => resolve())
        this.server = null
      } else {
        resolve()
      }
    })
  }

  isRunning(): boolean {
    return this.server !== null && this.server.listening
  }

  getStatus(): McpHostStatus {
    return {
      running: this.isRunning(),
      port: this.config.port,
      connectedClients: this.sessions.size,
      enabled: this.config.enabled,
      tools: TOOLS
    }
  }
}

// ─── Manager ─────────────────────────────────────────────────────────────────

export class McpHostManager extends EventEmitter {
  private server: McpHostServer
  private configPath: string
  public config: McpServerHostConfig

  constructor(private dataDir: string) {
    super()
    this.configPath = path.join(dataDir, 'mcp-host-config.json')
    this.config = this.loadConfig()
    this.server = new McpHostServer(this.config)
    this.server.on('clientConnected',    (id) => this.emit('clientConnected', id))
    this.server.on('clientDisconnected', (id) => this.emit('clientDisconnected', id))
    this.server.on('fileWritten',        (p)  => this.emit('fileWritten', p))
  }

  private loadConfig(): McpServerHostConfig {
    if (!fs.existsSync(this.dataDir)) fs.mkdirSync(this.dataDir, { recursive: true })
    if (fs.existsSync(this.configPath)) {
      try { return JSON.parse(fs.readFileSync(this.configPath, 'utf-8')) } catch {}
    }
    const defaults: McpServerHostConfig = { port: 3101, enabled: true }
    fs.writeFileSync(this.configPath, JSON.stringify(defaults, null, 2))
    return defaults
  }

  saveConfig(cfg: McpServerHostConfig) {
    this.config = cfg
    fs.writeFileSync(this.configPath, JSON.stringify(cfg, null, 2))
    if (this.server.isRunning()) {
      this.server.stop().then(() => {
        this.server = this.buildServer()
        if (cfg.enabled) this.server.start().catch(console.error)
      })
    }
  }

  private buildServer(): McpHostServer {
    const s = new McpHostServer(this.config)
    s.on('clientConnected',    (id) => this.emit('clientConnected', id))
    s.on('clientDisconnected', (id) => this.emit('clientDisconnected', id))
    s.on('fileWritten',        (p)  => this.emit('fileWritten', p))
    // Restore state callbacks
    s.getWorkspaceRoot = this.server.getWorkspaceRoot
    s.getOpenFile      = this.server.getOpenFile
    s.getActiveModel   = this.server.getActiveModel
    return s
  }

  // Called by index.ts to keep the server aware of IDE state
  setWorkspaceRoot(root: string | null) { this.server.getWorkspaceRoot = () => root }
  setOpenFile(file: string | null)      { this.server.getOpenFile      = () => file }
  setActiveModel(model: string)         { this.server.getActiveModel   = () => model }

  async start() {
    if (!this.config.enabled) return
    await this.server.start()
  }

  async stop() { await this.server.stop() }

  getStatus(): McpHostStatus { return this.server.getStatus() }
}
