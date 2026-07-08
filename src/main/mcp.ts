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
  disabled?: boolean
}

export interface McpConfig {
  mcpServers: Record<string, McpServerConfig>
}

export interface McpServerStatus {
  name: string
  status: 'connected' | 'connecting' | 'disconnected' | 'error'
  type: 'stdio' | 'sse'
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
  private pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>()
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
            if (msg.id !== undefined) {
              const pending = this.pendingRequests.get(msg.id)
              if (pending) {
                this.pendingRequests.delete(msg.id)
                if (msg.error) {
                  pending.reject(msg.error)
                } else {
                  pending.resolve(msg.result)
                }
              }
            } else if (msg.method === 'workspace/roots' || msg.method === 'roots/list') {
              const rootPath = this.getWorkspaceRoot ? this.getWorkspaceRoot() : null
              const roots = rootPath ? [{ uri: `file://${rootPath}`, name: path.basename(rootPath) }] : []
              const response = {
                jsonrpc: '2.0',
                id: msg.id,
                result: { roots }
              }
              this.sendRaw(response)
            }
          } catch (err: any) {
            this.log(`[Error Parsing JSON-RPC] ${err.message}`)
          }
        })

        this.process.on('exit', (code, signal) => {
          this.connectionStatus = 'disconnected'
          this.log(`Server process exited. Code: ${code}, Signal: ${signal}`)
          for (const pending of this.pendingRequests.values()) {
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

            this.log(`Received initialize response. Protocol Version: ${initResult.protocolVersion}`)
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

  sendRequest(method: string, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connectionStatus === 'error' && !this.process) {
        return reject(new Error(`Server is in error state: ${this.errorMsg}`))
      }
      if (!this.process) {
        return reject(new Error(`Server is not running`))
      }
      const id = this.nextId++
      const payload = { jsonrpc: '2.0', id, method, params }
      this.pendingRequests.set(id, { resolve, reject })
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
  private pendingRequests = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>()
  public logs: string[] = []
  public connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error' = 'disconnected'
  public tools: any[] = []
  public errorMsg: string = ''
  private sseRequest: any = null
  private postUrl: string | null = null

  constructor(
    public name: string,
    private url: string,
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
            'Connection': 'keep-alive'
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

        this.log(`Received initialize response. Protocol Version: ${initResult.protocolVersion}`)
        this.sendNotification('notifications/initialized', {})
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
        if (msg.id !== undefined) {
          const pending = this.pendingRequests.get(msg.id)
          if (pending) {
            this.pendingRequests.delete(msg.id)
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

  async sendRequest(method: string, params: any): Promise<any> {
    if (!this.postUrl) {
      throw new Error('Message endpoint not established yet')
    }
    const id = this.nextId++
    const payload = { jsonrpc: '2.0', id, method, params }

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject })
      this.postMessage(payload).catch((err) => {
        this.pendingRequests.delete(id)
        reject(err)
      })
    })
  }

  sendNotification(method: string, params: any) {
    if (!this.postUrl) return
    const payload = { jsonrpc: '2.0', method, params }
    this.postMessage(payload).catch((err) => {
      this.log(`[Error sending notification] ${err.message}`)
    })
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
        'Content-Length': Buffer.byteLength(body)
      }
    }

    return new Promise<void>((resolve, reject) => {
      const req = requestModule.request(url, options, (res) => {
        res.on('data', () => {})
        res.on('end', () => resolve())
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
  private servers = new Map<string, StdioMcpClient | SseMcpClient>()
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

    let client: StdioMcpClient | SseMcpClient
    if (srvConfig.url) {
      client = new SseMcpClient(name, srvConfig.url, () => this.workspaceRoot)
    } else if (srvConfig.command && srvConfig.args) {
      client = new StdioMcpClient(name, srvConfig.command, srvConfig.args, srvConfig.env, () => this.workspaceRoot)
    } else {
      throw new Error(`Invalid server configuration for ${name}`)
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
          type: activeClient instanceof SseMcpClient ? 'sse' : 'stdio',
          tools: activeClient.tools,
          logs: activeClient.logs,
          error: activeClient.errorMsg
        })
      } else {
        statuses.push({
          name,
          status: 'disconnected',
          type: srvConfig.url ? 'sse' : 'stdio',
          tools: [],
          logs: srvConfig.disabled ? [`[SYSTEM] Server is disabled in configuration.` ] : [],
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
    return client.sendRequest('tools/call', { name: toolName, arguments: args })
  }

  private logGlobal(msg: string) {
    for (const client of this.servers.values()) {
      if (client instanceof StdioMcpClient || client instanceof SseMcpClient) {
        const timestamp = new Date().toLocaleTimeString()
        client.logs.push(`[${timestamp}] [IDE] ${msg}`)
      }
    }
  }
}
