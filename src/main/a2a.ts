/**
 * A2A (Agent-to-Agent) Protocol Implementation
 * Spec: https://google.github.io/A2A
 *
 * This module provides:
 *   - A2AServer  : HTTP server that exposes this IDE as an A2A-compatible agent
 *   - A2AClient  : Client that delegates tasks to remote A2A agents
 *   - A2AManager : Lifecycle manager wired into the Electron main process
 *
 * Model selection (capability routing):
 *   incoming tasks carry an optional `skill` tag.  The skill→model map below
 *   routes each skill category to the best local Ollama model.  Falls back to
 *   the configured defaultModel (llama3.1 by default).
 *
 * Ports / endpoints exposed by the server:
 *   GET  /.well-known/agent.json  → Agent Card
 *   POST /a2a                     → JSON-RPC 2.0 task endpoint
 */

import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import { URL } from 'url'
import { EventEmitter } from 'events'
import { ModelRouter } from './model-router'

const modelRouter = new ModelRouter()

// ─── Types ────────────────────────────────────────────────────────────────────

export interface A2AConfig {
  port: number
  defaultModel: string                         // Ollama model for incoming tasks
  skillModelMap: Record<string, string>        // skill tag → Ollama model name
  remoteAgents: RemoteAgentConfig[]            // known remote agents to delegate to
  enabled: boolean
}

export interface RemoteAgentConfig {
  name: string
  url: string                                  // base URL, e.g. http://192.168.1.5:3100
  description?: string
  disabled?: boolean
}

export interface AgentCard {
  name: string
  description: string
  url: string
  version: string
  capabilities: {
    streaming: boolean
    pushNotifications: boolean
    stateTransitionHistory: boolean
  }
  skills: AgentSkill[]
  defaultInputModes: string[]
  defaultOutputModes: string[]
}

export interface AgentSkill {
  id: string
  name: string
  description: string
  tags: string[]
  examples: string[]
}

export type TaskStatus = 'submitted' | 'working' | 'completed' | 'failed' | 'canceled'

export interface A2ATask {
  id: string
  sessionId?: string
  status: { state: TaskStatus; message?: Message; timestamp: string }
  history?: Message[]
  artifacts?: Artifact[]
  metadata?: Record<string, any>
}

export interface Message {
  role: 'user' | 'agent'
  parts: Part[]
}

export interface Part {
  type: 'text'
  text: string
}

export interface Artifact {
  name?: string
  parts: Part[]
  index: number
}

export interface A2ATaskLog {
  id: string
  direction: 'inbound' | 'outbound'
  remoteAgent?: string
  skill?: string
  model?: string
  prompt: string
  result?: string
  status: TaskStatus
  startedAt: string
  finishedAt?: string
  error?: string
}

// ─── Skill → Model routing table ─────────────────────────────────────────────

const DEFAULT_SKILL_MODEL_MAP: Record<string, string> = {
  'code-generation': 'qwen2.5-coder:14b',
  'code-review':     'qwen2.5-coder:14b',
  'analysis':        'qwen2.5:14b',
  'chat':            'llama3.1:latest',
  'planning':        'llama3.1:latest',
  'design':          'llama3.1:latest',
  'default':         'llama3.1:latest'
}

// ─── Default Agent Card skills ────────────────────────────────────────────────

const AGENT_SKILLS: AgentSkill[] = [
  {
    id: 'code-generation',
    name: 'Code Generation',
    description: 'Generate, edit, and refactor code across languages and frameworks.',
    tags: ['code', 'programming', 'refactor'],
    examples: ['Write a React component for a login form', 'Refactor this Python function to be async']
  },
  {
    id: 'code-review',
    name: 'Code Review',
    description: 'Review code for bugs, security issues, and best practices.',
    tags: ['review', 'security', 'quality'],
    examples: ['Review this PR for security vulnerabilities', 'Check this function for edge cases']
  },
  {
    id: 'analysis',
    name: 'Project Analysis',
    description: 'Analyse codebases, explain architecture, and answer questions about a project.',
    tags: ['analysis', 'architecture', 'explain'],
    examples: ['Explain the architecture of this project', 'What does this module do?']
  },
  {
    id: 'planning',
    name: 'Task Planning',
    description: 'Break down features into implementation steps and create development plans.',
    tags: ['planning', 'tasks', 'breakdown'],
    examples: ['Plan the implementation of a user auth system', 'Break this feature into subtasks']
  }
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function now(): string {
  return new Date().toISOString()
}

function jsonResponse(res: http.ServerResponse, status: number, body: any) {
  const json = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(json),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
  res.end(json)
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', c => { body += c.toString() })
    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

// ─── Ollama chat helper ───────────────────────────────────────────────────────

async function ollamaChat(model: string, prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model,
      stream: false,
      messages: [{ role: 'user', content: prompt }]
    })
    const options: http.RequestOptions = {
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 600000 // 10 min for large models
    }
    const req = http.request(options, res => {
      let data = ''
      res.on('data', c => { data += c })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json.message?.content || json.error || data)
        } catch {
          resolve(data)
        }
      })
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Ollama timed out')) })
    req.write(payload)
    req.end()
  })
}

// ─── A2A Server ───────────────────────────────────────────────────────────────

export class A2AServer extends EventEmitter {
  private server: http.Server | null = null
  private tasks = new Map<string, A2ATask>()
  public logs: A2ATaskLog[] = []

  constructor(
    private config: A2AConfig,
    private dataDir: string
  ) {
    super()
  }

  private log(entry: Omit<A2ATaskLog, 'id'>): A2ATaskLog {
    const record: A2ATaskLog = { id: makeId(), ...entry }
    this.logs.unshift(record)
    if (this.logs.length > 200) this.logs.pop()
    this.emit('log', record)
    return record
  }

  private resolveModel(prompt?: string, metadata?: Record<string, any>): string {
    const skill: string = metadata?.skill || ''
    if (skill && this.config.skillModelMap[skill]) {
      return this.config.skillModelMap[skill]
    }
    if (prompt && prompt.trim()) {
      const rec = modelRouter.selectModel(prompt, [], this.config.defaultModel)
      if (rec.selectedModel) return rec.selectedModel
    }
    return (
      this.config.skillModelMap['default'] ||
      this.config.defaultModel
    )
  }

  private buildAgentCard(): AgentCard {
    return {
      name: 'Agentic IDE',
      description: 'A local AI-powered development environment with code generation, review, analysis, and planning capabilities.',
      url: `http://localhost:${this.config.port}`,
      version: '1.0.0',
      capabilities: {
        streaming: false,
        pushNotifications: false,
        stateTransitionHistory: true
      },
      skills: AGENT_SKILLS,
      defaultInputModes: ['text'],
      defaultOutputModes: ['text']
    }
  }

  private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    const url = new URL(req.url || '/', `http://localhost:${this.config.port}`)

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
      res.end()
      return
    }

    // Agent Card discovery
    if (req.method === 'GET' && url.pathname === '/.well-known/agent.json') {
      jsonResponse(res, 200, this.buildAgentCard())
      return
    }

    // A2A JSON-RPC endpoint
    if (req.method === 'POST' && url.pathname === '/a2a') {
      let body: any
      try {
        body = JSON.parse(await readBody(req))
      } catch {
        jsonResponse(res, 400, { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null })
        return
      }

      const { method, params, id } = body

      try {
        let result: any

        if (method === 'tasks/send') {
          result = await this.handleTaskSend(params)
        } else if (method === 'tasks/get') {
          result = await this.handleTaskGet(params)
        } else if (method === 'tasks/cancel') {
          result = await this.handleTaskCancel(params)
        } else {
          jsonResponse(res, 200, { jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id })
          return
        }

        jsonResponse(res, 200, { jsonrpc: '2.0', result, id })
      } catch (err: any) {
        jsonResponse(res, 200, { jsonrpc: '2.0', error: { code: -32000, message: err.message || String(err) }, id })
      }
      return
    }

    jsonResponse(res, 404, { error: 'Not found' })
  }

  private async handleTaskSend(params: any): Promise<A2ATask> {
    const taskId = params?.id || makeId()
    const userMessage: Message = params?.message || { role: 'user', parts: [{ type: 'text', text: '' }] }
    const metadata: Record<string, any> = params?.metadata || {}
    const prompt = userMessage.parts.map((p: Part) => p.text).join('\n')
    const model = this.resolveModel(metadata)
    const skill = metadata?.skill || 'default'

    // Create task in working state
    const task: A2ATask = {
      id: taskId,
      sessionId: params?.sessionId,
      status: { state: 'working', timestamp: now() },
      history: [userMessage],
      metadata
    }
    this.tasks.set(taskId, task)

    const logEntry = this.log({
      direction: 'inbound',
      skill,
      model,
      prompt,
      status: 'working',
      startedAt: now()
    })

    // Run inference asynchronously — return task immediately in working state,
    // then update when done (clients can poll via tasks/get)
    setImmediate(async () => {
      try {
        const result = await ollamaChat(model, prompt)
        const agentMessage: Message = {
          role: 'agent',
          parts: [{ type: 'text', text: result }]
        }
        task.status = { state: 'completed', message: agentMessage, timestamp: now() }
        task.history = [...(task.history || []), agentMessage]
        task.artifacts = [{ index: 0, parts: [{ type: 'text', text: result }] }]

        logEntry.status = 'completed'
        logEntry.result = result.slice(0, 500)
        logEntry.finishedAt = now()
        this.emit('taskComplete', task)
        this.emit('log', logEntry)
      } catch (err: any) {
        task.status = { state: 'failed', timestamp: now() }
        logEntry.status = 'failed'
        logEntry.error = err.message
        logEntry.finishedAt = now()
        this.emit('taskFailed', task)
        this.emit('log', logEntry)
      }
    })

    return task
  }

  private async handleTaskGet(params: any): Promise<A2ATask> {
    const task = this.tasks.get(params?.id)
    if (!task) throw new Error(`Task ${params?.id} not found`)
    return task
  }

  private async handleTaskCancel(params: any): Promise<A2ATask> {
    const task = this.tasks.get(params?.id)
    if (!task) throw new Error(`Task ${params?.id} not found`)
    task.status = { state: 'canceled', timestamp: now() }
    return task
  }

  start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = http.createServer((req, res) => {
        this.handleRequest(req, res).catch(err => {
          jsonResponse(res, 500, { error: err.message })
        })
      })
      this.server.on('error', reject)
      this.server.listen(this.config.port, '0.0.0.0', () => {
        resolve()
      })
    })
  }

  stop(): Promise<void> {
    return new Promise(resolve => {
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
}

// ─── A2A Client ───────────────────────────────────────────────────────────────

export class A2AClient {
  constructor(private config: A2AConfig) {}

  /** Fetch the Agent Card from a remote agent */
  async discoverAgent(baseUrl: string): Promise<AgentCard> {
    const url = new URL('/.well-known/agent.json', baseUrl)
    const mod = url.protocol === 'https:' ? https : http
    return new Promise((resolve, reject) => {
      mod.get(url.toString(), res => {
        let data = ''
        res.on('data', c => { data += c })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Agent card fetch failed: HTTP ${res.statusCode}`))
            return
          }
          try { resolve(JSON.parse(data)) }
          catch { reject(new Error('Invalid agent card JSON')) }
        })
      }).on('error', reject)
    })
  }

  /** Send a task to a remote A2A agent and poll until complete */
  async sendTask(
    agentUrl: string,
    prompt: string,
    skill?: string,
    onStatusUpdate?: (task: A2ATask) => void
  ): Promise<A2ATask> {
    const taskId = makeId()
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tasks/send',
      params: {
        id: taskId,
        message: { role: 'user', parts: [{ type: 'text', text: prompt }] },
        metadata: skill ? { skill } : {}
      }
    }

    // Send task
    const sendResult = await this.postRpc(agentUrl, payload)
    let task: A2ATask = sendResult.result

    // Poll until terminal state
    const POLL_INTERVAL = 1500
    const MAX_POLLS = 400 // 10 min at 1.5s
    let polls = 0

    while (
      (task.status.state === 'working' || task.status.state === 'submitted') &&
      polls < MAX_POLLS
    ) {
      await new Promise(r => setTimeout(r, POLL_INTERVAL))
      const getResult = await this.postRpc(agentUrl, {
        jsonrpc: '2.0', id: 2, method: 'tasks/get', params: { id: taskId }
      })
      task = getResult.result
      if (onStatusUpdate) onStatusUpdate(task)
      polls++
    }

    return task
  }

  private postRpc(baseUrl: string, payload: any): Promise<any> {
    const url = new URL('/a2a', baseUrl)
    const mod = url.protocol === 'https:' ? https : http
    const body = JSON.stringify(payload)

    return new Promise((resolve, reject) => {
      const req = mod.request(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        },
        timeout: 30000
      }, res => {
        let data = ''
        res.on('data', c => { data += c })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`A2A RPC error: HTTP ${res.statusCode}`))
            return
          }
          try { resolve(JSON.parse(data)) }
          catch { reject(new Error('Invalid JSON-RPC response')) }
        })
      })
      req.on('error', reject)
      req.on('timeout', () => { req.destroy(); reject(new Error('A2A request timed out')) })
      req.write(body)
      req.end()
    })
  }
}

// ─── A2A Manager ─────────────────────────────────────────────────────────────

export class A2AManager extends EventEmitter {
  private server: A2AServer
  private client: A2AClient
  private configPath: string
  public config: A2AConfig
  private outboundLogs: A2ATaskLog[] = []

  constructor(private dataDir: string) {
    super()
    this.configPath = path.join(dataDir, 'a2a-config.json')
    this.config = this.loadConfig()
    this.server = new A2AServer(this.config, dataDir)
    this.client = new A2AClient(this.config)

    this.server.on('log', (entry: A2ATaskLog) => this.emit('log', entry))
    this.server.on('taskComplete', (task: A2ATask) => this.emit('taskComplete', task))
  }

  private loadConfig(): A2AConfig {
    if (!fs.existsSync(this.dataDir)) fs.mkdirSync(this.dataDir, { recursive: true })
    if (fs.existsSync(this.configPath)) {
      try { return JSON.parse(fs.readFileSync(this.configPath, 'utf-8')) } catch {}
    }
    const defaults: A2AConfig = {
      port: 3100,
      defaultModel: 'llama3.1:latest',
      skillModelMap: DEFAULT_SKILL_MODEL_MAP,
      remoteAgents: [],
      enabled: true
    }
    fs.writeFileSync(this.configPath, JSON.stringify(defaults, null, 2))
    return defaults
  }

  saveConfig(config: A2AConfig) {
    this.config = config
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2))
    // Restart server if running to pick up new port/model settings
    if (this.server.isRunning()) {
      this.server.stop().then(() => {
        this.server = new A2AServer(this.config, this.dataDir)
        this.server.on('log', (e: A2ATaskLog) => this.emit('log', e))
        if (this.config.enabled) this.server.start().catch(console.error)
      })
    }
  }

  async start() {
    if (!this.config.enabled) return
    await this.server.start()
  }

  async stop() {
    await this.server.stop()
  }

  getStatus() {
    return {
      running: this.server.isRunning(),
      port: this.config.port,
      defaultModel: this.config.defaultModel,
      skillModelMap: this.config.skillModelMap,
      remoteAgents: this.config.remoteAgents,
      enabled: this.config.enabled
    }
  }

  getLogs(): A2ATaskLog[] {
    return [...this.server.logs, ...this.outboundLogs].sort(
      (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    ).slice(0, 200)
  }

  /** Discover a remote agent's Agent Card */
  async discoverAgent(url: string): Promise<AgentCard> {
    return this.client.discoverAgent(url)
  }

  /** Delegate a task to a named remote agent */
  async delegateTask(
    agentName: string,
    prompt: string,
    skill?: string,
    onStatusUpdate?: (task: A2ATask) => void
  ): Promise<A2ATask> {
    const agentConfig = this.config.remoteAgents.find(
      a => a.name === agentName && !a.disabled
    )
    if (!agentConfig) throw new Error(`Remote agent "${agentName}" not found or disabled`)

    const logEntry: A2ATaskLog = {
      id: makeId(),
      direction: 'outbound',
      remoteAgent: agentName,
      skill,
      prompt,
      status: 'working',
      startedAt: now()
    }
    this.outboundLogs.unshift(logEntry)
    if (this.outboundLogs.length > 200) this.outboundLogs.pop()
    this.emit('log', logEntry)

    try {
      const task = await this.client.sendTask(agentConfig.url, prompt, skill, onStatusUpdate)
      logEntry.status = task.status.state as TaskStatus
      logEntry.result = task.artifacts?.[0]?.parts?.[0]?.text?.slice(0, 500)
      logEntry.finishedAt = now()
      this.emit('log', logEntry)
      return task
    } catch (err: any) {
      logEntry.status = 'failed'
      logEntry.error = err.message
      logEntry.finishedAt = now()
      this.emit('log', logEntry)
      throw err
    }
  }
}
