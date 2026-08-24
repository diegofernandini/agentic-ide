import { describe, it, expect } from 'vitest'
import * as path from 'path'
import { StdioMcpClient, SseMcpClient, StreamableHttpMcpClient, McpManager } from './mcp'

describe('MCP Clients & Manager', () => {
  it('StdioMcpClient initializes and handles properties cleanly', () => {
    const client = new StdioMcpClient('test-stdio', 'node', ['-v'])
    expect(client.name).toBe('test-stdio')
    expect(client.connectionStatus).toBe('disconnected')
    expect(client.tools).toEqual([])
  })

  it('SseMcpClient initializes cleanly', () => {
    const client = new SseMcpClient('test-sse', 'http://localhost:3000/sse')
    expect(client.name).toBe('test-sse')
    expect(client.connectionStatus).toBe('disconnected')
  })

  it('StreamableHttpMcpClient initializes cleanly', () => {
    const client = new StreamableHttpMcpClient('test-streamable', 'http://localhost:3000/mcp')
    expect(client.name).toBe('test-streamable')
    expect(client.connectionStatus).toBe('disconnected')
  })

  it('McpManager initializes config and getServersStatus cleanly', () => {
    const tmpDir = path.join(__dirname, '../../scratch/test-mcp-dir')
    const manager = new McpManager(tmpDir)
    expect(manager.getWorkspaceRoot()).toBeNull()
    const statuses = manager.getServersStatus()
    expect(Array.isArray(statuses)).toBe(true)
  })
})
