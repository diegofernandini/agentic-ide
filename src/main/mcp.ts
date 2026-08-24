import { spawn, ChildProcess } from 'child_process'
import * as readline from 'readline'
import * as path from 'path'
import * as fs from 'fs'
import * as http from 'http'
import * as https from 'https'
import { URL } from 'url'

export interface McpServerConfig {
  command?: string
  args?: string[]
  env?: Record<string, string>
  url?: string
  transport?: 'sse' | 'streamable-http'  // for URL-based servers; defaults to 'sse'
  headers?: Record<string, string>  // extra HTTP headers (e.g. Authorization)
  disabled?: boolean
}

export interface McpConfig {
  mcpServers: Record<string, McpServerConfig>
}

export interface McpServerStatus {
  name: string
  status: 'connected' | 'connecting' | 'disconnected' | 'error'
  type: 'stdio' | 'sse' | 'streamable-http'
  tools: any[]
  logs: string[]
  error?: string
}

// ============================================================================
// STDIO CLIENT
// ============================================================================
export class StdioMcpClient {
  private process: ChildProcess | null = null
  private nextId = 1
  private pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void; timeout?: NodeJS.Timeout }>()
  public logs: string[] = []
  public connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected'
  public tools: any[] = []
  public errorMsg: string = ''
  private rl: any = null

  constructor(
    public name: string,
    private command: string,
    private args: string[],
    private envVariables?: Record<string, string>,
    private getWorkspaceRoot?: () => string | null
  ) {}

  private log(msg: string) {
    const timestamp = new Date().toLocaleTimeString()
    this.logs.push(`[${timestamp}] ${msg}`)
    if (this.logs.length > 500) this.logs.shift()
  }

  async connect(): Promise<void> {
    this.connectionStatus = 'connecting'
    this.errorMsg = ''
    this.tools = []
    this.log(`Starting stdio server: ${this.command} ${this.args.join(' ')}`)

    return new Promise<void>((resolve, reject) => {
      try {
        const env = { ...process.env, ...(this.envVariables || {}) }
        const paths = [
          '/opt/homebrew/bin',
          '/usr/local/bin',
          '/usr/bin',
          '/bin',
          '/usr/sbin',
          '/sbin'
        ]
        if (process.env.HOME) {
          paths.push(path.join(process.env.HOME, '.nvm/versions/node', process.version, 'bin'))
        }
        const currentPath = process.env.PATH || ''
        env.PATH = Array.from(new Set([...currentPath.split(':'), ...paths])).filter(Boolean).join(':')

        this.process = spawn(this.command, this.args, { env, shell: true })

        this.process.on('error', (err) => {
          this.connectionStatus = 'error'
          this.errorMsg = err.message
          this.log(`[Process Error] ${err.message}`)
          reject(err)
        })

        this.process.stderr?.on('data', (data) => {
          const str = data.toString().trim()
          if (str) {
            this.log(`[Stderr] ${str}`)
          }
        })

        this.rl = readline.createInterface({
          input: this.process.stdout!,
          terminal: false
        })

        let initialized = false

        this.rl.on('line', async (line: string) => {
          this.log(`[Received] ${line}`)
          try {
            const msg = JSON.parse(line)
            if (msg.method) {
              if (msg.method === 'workspace/roots' || msg.method === 'roots/list') {
                const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null
                const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path.basename(rootPath) }] : []
                if (msg.id !== undefined) {
                  this.sendRaw({
                    jsonrpc: '2.0',
                    id: msg.id,
                    result: { roots }
                  })
                }
              } else if (msg.method === 'ping') {
                if (msg.id !== undefined) {
                  this.sendRaw({
                    jsonrpc: '2.0',
                    id: msg.id,
                    result: {}
                  })
                }
              } else if (msg.id !== undefined) {
                this.sendRaw({
                  jsonrpc: '2.0',
                  id: msg.id,
                  error: { code: -32601, message: `Method not found: ${msg.method}` }
                })
              }
            } else if (msg.id !== undefined) {
              const pending = this.pendingRequests.get(msg.id)
              if (pending) {
                this.pendingRequests.delete(msg.id)
                if (pending.timeout) clearTimeout(pending.timeout)
                if (msg.error) {
                  pending.reject(msg.error)
                } else {
                  pending.resolve(msg.result)
                }
              }
            }
          } catch (err: any) {
            this.log(`[Error Parsing JSON-RPC] ${err.message}`)
          }
        })

        this.process.on('exit', (code, signal) => {
          this.connectionStatus = 'disconnected'
          this.log(`Server process exited. Code: ${code}, Signal: ${signal}`)
          for (const pending of this.pendingRequests.values()) {
            if (pending.timeout) clearTimeout(pending.timeout)
            pending.reject(new Error(`Server process exited with code ${code}`))
          }
          this.pendingRequests.clear()
          this.process = null
          if (!initialized) {
            reject(new Error(`Server exited during handshake (code ${code})`))
          }
        })

        // MCP handshake loop
        const handshake = async () => {
          try {
            this.log(`Sending initialize request...`)
            const initResult = await this.sendRequest('initialize', {
              protocolVersion: '2024-11-05',
              capabilities: {
                roots: { listChanged: true }
              },
              clientInfo: { name: 'agentic-ide', version: '1.0.0' }
            })

            this.log(`Received initialize response. Protocol Version: ${initResult?.protocolVersion}`)
            this.sendNotification('notifications/initialized', {})
            this.log(`Sent initialized notification. Fetching tools...`)

            const toolsResult = await this.sendRequest('tools/list', {})
            this.tools = toolsResult?.tools || []
            this.log(`Success! Server connected. Found ${this.tools.length} tools.`)
            this.connectionStatus = 'connected'
            initialized = true
            resolve()
          } catch (err: any) {
            this.log(`Handshake failed: ${err.message || String(err)}`)
            this.disconnect()
            reject(err)
          }
        }

        handshake()

      } catch (err: any) {
        this.connectionStatus = 'error'
        this.errorMsg = err.message || String(err)
        this.log(`Connection failed: ${this.errorMsg}`)
        this.disconnect()
        reject(err)
      }
    })
  }

  private sendRaw(payload: any) {
    if (!this.process || !this.process.stdin || this.process.stdin.writableEnded) {
      this.log(`[Error] Cannot write to stdin, process is not running.`)
      return
    }
    const str = JSON.stringify(payload)
    this.log(`[Sending] ${str}`)
    this.process.stdin.write(str + '\n')
  }

  sendRequest(method: string, params: any, timeoutMs: number = 30000): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connectionStatus === 'error' && !this.process) {
        return reject(new Error(`Server is in error state: ${this.errorMsg}`))
      }
      if (!this.process) {
        return reject(new Error(`Server is not running`))
      }
      const id = this.nextId++
      const payload = { jsonrpc: '2.0', id, method, params }

      const timer = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id)
          reject(new Error(`Request ${method} (id ${id}) timed out after ${timeoutMs}ms`))
        }
      }, timeoutMs)

      this.pendingRequests.set(id, { resolve, reject, timeout: timer })
      this.sendRaw(payload)
    })
  }

  sendNotification(method: string, params: any) {
    const payload = { jsonrpc: '2.0', method, params }
    this.sendRaw(payload)
  }

  disconnect() {
    this.log('Disconnecting from server...')
    if (this.rl) {
      try { this.rl.close() } catch {}
      this.rl = null
    }
    if (this.process) {
      try { this.process.kill() } catch {}
      this.process = null
    }
    this.connectionStatus = 'disconnected'
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout)
      pending.reject(new Error(`Client disconnected`))
    }
    this.pendingRequests.clear()
  }
}

// ============================================================================
// SSE CLIENT
// ============================================================================
export class SseMcpClient {
  private nextId = 1
  private pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void; timeout?: NodeJS.Timeout }>()
  public logs: string[] = []
  public connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected'
  public tools: any[] = []
  public errorMsg: string = ''
  private sseRequest: any = null
  private postUrl: string | null = null
  private extraHeaders: Record<string, string> = {}

  constructor(
    public name: string,
    private url: string,
    private getWorkspaceRoot?: () => string | null,
    headers?: Record<string, string>
  ) {
    this.extraHeaders = headers || {}
  }

  private log(msg: string) {
    const timestamp = new Date().toLocaleTimeString()
    this.logs.push(`[${timestamp}] ${msg}`)
    if (this.logs.length > 500) this.logs.shift()
  }

  async connect(): Promise<void> {
    this.connectionStatus = 'connecting'
    this.errorMsg = ''
    this.tools = []
    this.postUrl = null
    this.log(`Connecting to SSE server: ${this.url}`)

    return new Promise<void>((resolve, reject) => {
      try {
        const parsedUrl = new URL(this.url)
        const requestModule = parsedUrl.protocol === 'https:' ? https : http

        const options = {
          headers: {
            'Accept': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            ...this.extraHeaders
          }
        }

        this.sseRequest = requestModule.get(this.url, options, (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            const err = new Error(`Server returned status code ${res.statusCode}`)
            this.handleError(err)
            reject(err)
            return
          }

          this.log(`SSE connection established. Parsing stream...`)
          
          let buffer = ''
          let currentEvent = 'message'

          res.on('data', async (chunk) => {
            buffer += chunk.toString()
            let index
            while ((index = buffer.indexOf('\n')) !== -1) {
              const line = buffer.slice(0, index).trim()
              buffer = buffer.slice(index + 1)
              
              if (line.startsWith('event:')) {
                currentEvent = line.slice(6).trim()
              } else if (line.startsWith('data:')) {
                const data = line.slice(5).trim()
                await this.handleEvent(currentEvent, data, resolve, reject)
              } else if (line === '') {
                currentEvent = 'message'
              }
            }
          })

          res.on('end', () => {
            this.log('SSE stream ended by server')
            this.disconnect()
          })
        })

        this.sseRequest.on('error', (err: any) => {
          this.handleError(err)
          reject(err)
        })
      } catch (err: any) {
        this.handleError(err)
        reject(err)
      }
    })
  }

  private handleError(err: any) {
    this.connectionStatus = 'error'
    this.errorMsg = err.message || String(err)
    this.log(`[Error] ${this.errorMsg}`)
    this.disconnect()
  }

  private sendNotificationResponse(id: any, result: any) {
    if (!this.postUrl) return
    this.postMessage({ jsonrpc: '2.0', id, result }).catch((err) => {
      this.log(`[Error sending RPC response] ${err.message}`)
    })
  }

  private sendNotificationError(id: any, code: number, message: string) {
    if (!this.postUrl) return
    this.postMessage({ jsonrpc: '2.0', id, error: { code, message } }).catch((err) => {
      this.log(`[Error sending RPC error] ${err.message}`)
    })
  }

  private async handleEvent(event: string, data: string, resolveConnect: () => void, rejectConnect: (err: any) => void) {
    this.log(`[Event: ${event}] ${data}`)
    if (event === 'endpoint') {
      try {
        const resolved = new URL(data, this.url).toString()
        this.postUrl = resolved
        this.log(`POST message endpoint resolved to: ${this.postUrl}`)
        
        this.log('Sending initialize request...')
        const initResult = await this.sendRequest('initialize', {
          protocolVersion: '2024-11-05',
          capabilities: {
            roots: { listChanged: true }
          },
          clientInfo: { name: 'agentic-ide', version: '1.0.0' }
        })

        this.log(`Received initialize response. Protocol Version: ${initResult?.protocolVersion}`)
        await this.sendNotification('notifications/initialized', {})
        this.log('Sent initialized notification. Fetching tools...')

        const toolsResult = await this.sendRequest('tools/list', {})
        this.tools = toolsResult?.tools || []
        this.log(`Success! SSE server connected. Found ${this.tools.length} tools.`)
        this.connectionStatus = 'connected'
        resolveConnect()
      } catch (err: any) {
        rejectConnect(err)
      }
    } else if (event === 'message') {
      try {
        const msg = JSON.parse(data)
        if (msg.method) {
          if (msg.method === 'workspace/roots' || msg.method === 'roots/list') {
            const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null
            const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path.basename(rootPath) }] : []
            if (msg.id !== undefined) {
              this.sendNotificationResponse(msg.id, { roots })
            }
          } else if (msg.method === 'ping') {
            if (msg.id !== undefined) {
              this.sendNotificationResponse(msg.id, {})
            }
          } else if (msg.id !== undefined) {
            this.sendNotificationError(msg.id, -32601, `Method not found: ${msg.method}`)
          }
        } else if (msg.id !== undefined) {
          const pending = this.pendingRequests.get(msg.id)
          if (pending) {
            this.pendingRequests.delete(msg.id)
            if (pending.timeout) clearTimeout(pending.timeout)
            if (msg.error) {
              pending.reject(msg.error)
            } else {
              pending.resolve(msg.result)
            }
          }
        }
      } catch (err: any) {
        this.log(`[Error parsing message JSON] ${err.message}`)
      }
    }
  }

  sendRequest(method: string, params: any, timeoutMs: number = 30000): Promise<any> {
    if (!this.postUrl) {
      return Promise.reject(new Error('Message endpoint not established yet'))
    }
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id)
          reject(new Error(`Request ${method} (id ${id}) timed out after ${timeoutMs}ms`))
        }
      }, timeoutMs)

      this.pendingRequests.set(id, { resolve, reject, timeout: timer })
      this.postMessage(payload).catch((err) => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id)
          clearTimeout(timer)
        }
        reject(err)
      })
    })
  }

  async sendNotification(method: string, params: any): Promise<void> {
    if (!this.postUrl) return
    const payload = { jsonrpc: '2.0', method, params }
    try {
      await this.postMessage(payload)
    } catch (err: any) {
      this.log(`[Error sending notification] ${err.message}`)
    }
  }

  private async postMessage(payload: any): Promise<void> {
    if (!this.postUrl) return
    const url = new URL(this.postUrl)
    const body = JSON.stringify(payload)
    const requestModule = url.protocol === 'https:' ? https : http

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...this.extraHeaders
      }
    }

    return new Promise<void>((resolve, reject) => {
      const req = requestModule.request(url, options, (res) => {
        let responseBody = ''
        res.on('data', (chunk) => { responseBody += chunk.toString() })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            const method = res.statusCode === 405 ? 'HTTP 405 Method Not Allowed' : `HTTP ${res.statusCode}`
            const hint = res.statusCode === 405
              ? ' — The endpoint does not accept POST. Verify your MCP server URL points to the correct SSE/message endpoint, not a generic REST route.'
              : res.statusCode === 400
              ? ' — The server rejected the payload. Ensure the endpoint speaks JSON-RPC 2.0 MCP protocol.'
              : ''
            reject(new Error(`${method}${hint} Body: ${responseBody.slice(0, 200)}`))
          } else {
            resolve()
          }
        })
      })
      req.on('error', (err) => reject(err))
      req.write(body)
      req.end()
    })
  }

  disconnect() {
    this.log('Disconnecting from SSE server...')
    if (this.sseRequest) {
      try { this.sseRequest.destroy() } catch {}
      this.sseRequest = null
    }
    this.connectionStatus = 'disconnected'
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout)
      pending.reject(new Error('Client disconnected'))
    }
    this.pendingRequests.clear()
  }
}

// ============================================================================
// STREAMABLE HTTP CLIENT (MCP spec 2025-03-26)
// Used by modern hosted servers like Penpot (/mcp/stream) and Figma (/mcp).
//
// Protocol:
//   - All requests are POST to the single endpoint URL.
//   - Accept: application/json, text/event-stream  (server may respond with
//     either a plain JSON object for simple responses, or an SSE stream for
//     server-initiated messages / long responses).
//   - Session negotiated via Mcp-Session-Id response header; sent back on
//     every subsequent request.
//   - No separate "connect" step — the session starts with the initialize POST.
// ============================================================================
export class StreamableHttpMcpClient {
  private nextId = 1
  private pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void; timeout?: NodeJS.Timeout }>()
  public logs: string[] = []
  public connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected'
  public tools: any[] = []
  public errorMsg: string = ''
  private sessionId: string | null = null
  private extraHeaders: Record<string, string> = {}

  constructor(
    public name: string,
    private url: string,
    headers?: Record<string, string>
  ) {
    this.extraHeaders = headers || {}
  }

  private log(msg: string) {
    const timestamp = new Date().toLocaleTimeString()
    this.logs.push(`[${timestamp}] ${msg}`)
    if (this.logs.length > 500) this.logs.shift()
  }

  async connect(): Promise<void> {
    this.connectionStatus = 'connecting'
    this.errorMsg = ''
    this.tools = []
    this.sessionId = null
    this.log(`Connecting via Streamable HTTP: ${this.url}`)

    try {
      // Step 1: initialize — server may return a session ID in the response header
      const initResult = await this.sendRequest('initialize', {
        protocolVersion: '2025-03-26',
        capabilities: { roots: { listChanged: true } },
        clientInfo: { name: 'agentic-ide', version: '1.0.0' }
      })
      this.log(`Initialize OK. Protocol: ${initResult?.protocolVersion}. Session: ${this.sessionId || 'none'}`)

      // Step 2: notify server we're ready
      await this.sendNotification('notifications/initialized', {})

      // Step 3: discover tools
      const toolsResult = await this.sendRequest('tools/list', {})
      this.tools = toolsResult?.tools || []
      this.log(`Connected. Found ${this.tools.length} tools.`)
      this.connectionStatus = 'connected'
    } catch (err: any) {
      this.connectionStatus = 'error'
      this.errorMsg = err.message || String(err)
      this.log(`[Error] Connection failed: ${this.errorMsg}`)
      throw err
    }
  }

  sendRequest(method: string, params: any, timeoutMs: number = 30000): Promise<any> {
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }
    return this.post(payload, id, timeoutMs)
  }

  async sendNotification(method: string, params: any): Promise<void> {
    const payload = { jsonrpc: '2.0', method, params }
    await this.post(payload, null)
  }

  private post(payload: any, requestId: number | null, timeoutMs: number = 30000): Promise<any> {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(this.url)
      const requestModule = parsedUrl.protocol === 'https:' ? https : http
      const body = JSON.stringify(payload)

      const headers: Record<string, string | number> = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        // Accept both a plain JSON response (stateless) and an SSE stream
        'Accept': 'application/json, text/event-stream',
        ...this.extraHeaders
      }
      if (this.sessionId) {
        headers['Mcp-Session-Id'] = this.sessionId
      }

      let settled = false
      const timer = requestId !== null ? setTimeout(() => {
        if (!settled) {
          settled = true
          try { req.destroy() } catch {}
          reject(new Error(`Request timed out after ${timeoutMs}ms`))
        }
      }, timeoutMs) : null

      const done = (err?: any, result?: any) => {
        if (settled) return
        settled = true
        if (timer) clearTimeout(timer)
        if (err) reject(err)
        else resolve(result)
      }

      this.log(`[POST] ${body}`)
      this.log(`[Headers] ${JSON.stringify(this.extraHeaders)}`)

      const req = requestModule.request(parsedUrl, { method: 'POST', headers }, (res) => {
        // Capture session ID (case-insensitive search)
        const sessionHeaderKey = Object.keys(res.headers).find(k => k.toLowerCase() === 'mcp-session-id')
        if (sessionHeaderKey && res.headers[sessionHeaderKey]) {
          this.sessionId = res.headers[sessionHeaderKey] as string
          this.log(`Session ID: ${this.sessionId}`)
        }

        if (res.statusCode && res.statusCode >= 400) {
          let errBody = ''
          res.on('data', (c) => { errBody += c.toString() })
          res.on('end', () => {
            const hint = res.statusCode === 405
              ? ' — wrong endpoint or method; verify the URL is the Streamable HTTP MCP endpoint.'
              : res.statusCode === 400
              ? ' — payload rejected; check JSON-RPC structure.'
              : ''
            done(new Error(`HTTP ${res.statusCode}${hint} Body: ${errBody.slice(0, 200)}`))
          })
          return
        }

        const ct = res.headers['content-type'] || ''

        if (ct.includes('text/event-stream')) {
          // Server chose to respond with an SSE stream — parse it
          let buffer = ''
          res.on('data', (chunk) => {
            buffer += chunk.toString()
            let idx
            while ((idx = buffer.indexOf('\n')) !== -1) {
              const line = buffer.slice(0, idx).trim()
              buffer = buffer.slice(idx + 1)
              if (line.startsWith('data:')) {
                const data = line.slice(5).trim()
                try {
                  const msg = JSON.parse(data)
                  this.log(`[SSE data] ${data}`)
                  if (requestId !== null && msg.id === requestId) {
                    if (msg.error) done(msg.error)
                    else done(null, msg.result)
                  } else if (msg.id !== undefined) {
                    const pending = this.pendingRequests.get(msg.id)
                    if (pending) {
                      this.pendingRequests.delete(msg.id)
                      if (pending.timeout) clearTimeout(pending.timeout)
                      if (msg.error) pending.reject(msg.error)
                      else pending.resolve(msg.result)
                    }
                  }
                } catch {}
              }
            }
          })
          res.on('end', () => {
            if (requestId === null) done()
            else if (!settled) done(new Error('SSE stream ended before response was received'))
          })
        } else {
          // Plain JSON response or empty body
          let raw = ''
          res.on('data', (c) => { raw += c.toString() })
          res.on('end', () => {
            this.log(`[Response] ${raw.slice(0, 500)}`)
            if (requestId === null) { done(); return }
            if (!raw || raw.trim() === '') {
              done(null, undefined)
              return
            }
            try {
              const msg = JSON.parse(raw)
              if (msg.error) done(msg.error)
              else done(null, msg.result)
            } catch (e: any) {
              done(new Error(`Failed to parse response: ${e.message}. Body: ${raw.slice(0, 200)}`))
            }
          })
        }
      })

      req.on('error', (err) => done(err))
      req.write(body)
      req.end()
    })
  }

  disconnect() {
    this.log('Disconnecting Streamable HTTP client...')
    // Send DELETE to close the session server-side if we have a session ID
    if (this.sessionId) {
      try {
        const parsedUrl = new URL(this.url)
        const requestModule = parsedUrl.protocol === 'https:' ? https : http
        const headers: Record<string, string> = { ...this.extraHeaders, 'Mcp-Session-Id': this.sessionId }
        const req = requestModule.request(parsedUrl, { method: 'DELETE', headers }, (res) => {
          res.resume()
        })
        req.on('error', () => {})
        req.end()
      } catch {}
    }
    this.connectionStatus = 'disconnected'
    this.sessionId = null
    for (const pending of this.pendingRequests.values()) {
      if (pending.timeout) clearTimeout(pending.timeout)
      pending.reject(new Error('Client disconnected'))
    }
    this.pendingRequests.clear()
  }
}

// ============================================================================
// MCP MANAGER
// ============================================================================
export class McpManager {
  private configPath: string
  private servers = new Map<string, StdioMcpClient | SseMcpClient | StreamableHttpMcpClient>()
  private workspaceRoot: string | null = null

  constructor(private dataDir: string) {
    this.configPath = path.join(this.dataDir, 'mcp-config.json')
    this.ensureConfigExists()
  }

  setWorkspaceRoot(root: string | null) {
    this.workspaceRoot = root
    this.logGlobal(`Workspace root updated to: ${root}`)
  }

  getWorkspaceRoot() {
    return this.workspaceRoot
  }

  private ensureConfigExists() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true })
    }
    if (!fs.existsSync(this.configPath)) {
      const defaultConfig: McpConfig = {
        mcpServers: {
          "sqlite-demo": {
            command: "npx",
            args: ["-y", "@modelcontextprotocol/server-sqlite", "--db", path.join(this.dataDir, "demo.db")],
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
      }
      fs.writeFileSync(this.configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8')
    }
  }

  getConfig(): McpConfig {
    this.ensureConfigExists()
    try {
      const content = fs.readFileSync(this.configPath, 'utf-8')
      return JSON.parse(content)
    } catch (e) {
      return { mcpServers: {} }
    }
  }

  saveConfig(config: McpConfig) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf-8')
    this.reloadServers()
  }

  async startAll() {
    const config = this.getConfig()
    for (const [name, srvConfig] of Object.entries(config.mcpServers)) {
      if (srvConfig.disabled) {
        continue
      }
      try {
        await this.startServer(name, srvConfig)
      } catch (err) {
        console.error(`Failed to start MCP server ${name}:`, err)
      }
    }
  }

  private async startServer(name: string, srvConfig: McpServerConfig) {
    this.stopServer(name)

    let client: StdioMcpClient | SseMcpClient | StreamableHttpMcpClient
    if (srvConfig.url) {
      const transport = srvConfig.transport || 'sse'
      console.log(`[MCP] Starting ${name}: transport=${transport} headers=${JSON.stringify(srvConfig.headers || {})}`)
      if (transport === 'streamable-http') {
        client = new StreamableHttpMcpClient(name, srvConfig.url, srvConfig.headers)
      } else {
        client = new SseMcpClient(name, srvConfig.url, () => this.workspaceRoot, srvConfig.headers)
      }
    } else if (srvConfig.command) {
      client = new StdioMcpClient(name, srvConfig.command, srvConfig.args || [], srvConfig.env, () => this.workspaceRoot)
    } else {
      throw new Error(`Invalid server configuration for ${name}: must have either "url" (SSE/Streamable-HTTP) or "command" (stdio)`)
    }

    this.servers.set(name, client)
    client.connect().catch(() => {})
  }

  private stopServer(name: string) {
    const client = this.servers.get(name)
    if (client) {
      client.disconnect()
      this.servers.delete(name)
    }
  }

  stopAll() {
    for (const name of this.servers.keys()) {
      this.stopServer(name)
    }
  }

  async reloadServers() {
    this.stopAll()
    await this.startAll()
  }

  async restartServer(name: string) {
    const config = this.getConfig()
    const srvConfig = config.mcpServers[name]
    if (!srvConfig) {
      throw new Error(`Server ${name} not found in configuration`)
    }
    await this.startServer(name, srvConfig)
  }

  getServersStatus(): McpServerStatus[] {
    const config = this.getConfig()
    const statuses: McpServerStatus[] = []

    for (const [name, srvConfig] of Object.entries(config.mcpServers)) {
      const activeClient = this.servers.get(name)
      if (activeClient) {
        statuses.push({
          name,
          status: activeClient.connectionStatus,
          type: activeClient instanceof SseMcpClient
            ? 'sse'
            : activeClient instanceof StreamableHttpMcpClient
            ? 'streamable-http'
            : 'stdio',
          tools: activeClient.tools,
          logs: activeClient.logs,
          error: activeClient.errorMsg
        })
      } else {
        let type: 'stdio' | 'sse' | 'streamable-http' = 'stdio'
        if (srvConfig.url) {
          type = srvConfig.transport === 'streamable-http' ? 'streamable-http' : 'sse'
        }
        statuses.push({
          name,
          status: 'disconnected',
          type,
          tools: [],
          logs: srvConfig.disabled ? [`[SYSTEM] Server is disabled in configuration.`] : [],
          error: srvConfig.disabled ? 'Disabled' : undefined
        })
      }
    }
    return statuses
  }

  async callTool(serverName: string, toolName: string, args: any) {
    const client = this.servers.get(serverName)
    if (!client) {
      throw new Error(`MCP Server ${serverName} is not running or connected`)
    }
    if (client.connectionStatus !== 'connected') {
      throw new Error(`MCP Server ${serverName} is not connected (status: ${client.connectionStatus})`)
    }
    return client.sendRequest('tools/call', { name: toolName, arguments: args })
  }

  private logGlobal(msg: string) {
    for (const client of this.servers.values()) {
      if (client instanceof StdioMcpClient || client instanceof SseMcpClient || client instanceof StreamableHttpMcpClient) {
        const timestamp = new Date().toLocaleTimeString()
        client.logs.push(`[${timestamp}] [IDE] ${msg}`)
      }
    }
  }
}
