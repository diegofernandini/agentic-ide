import { describe, expect, it } from 'vitest'
import { filterMcpToolsForIntent } from './mcpToolFiltering'

const tools = [
  { serverName: 'Figma', name: 'generate_diagram' },
  { serverName: 'Figma', name: 'use_figma' },
  { serverName: 'Figma', name: 'generate_figma_design' },
  { serverName: 'Figma', name: 'search_design_system' },
  { serverName: 'Figma', name: 'get_figma_data' },
  { serverName: 'sqlite-demo', name: 'query' },
]

describe('filterMcpToolsForIntent', () => {
  it('keeps only diagram tools for diagram intent', () => {
    const result = filterMcpToolsForIntent(tools, 'Generate a user flow diagram in Figma')

    expect(result.intent).toBe('diagram')
    expect(result.tools.map(t => `${t.serverName}:${t.name}`)).toEqual([
      'sqlite-demo:query',
      'Figma:generate_diagram',
    ])
  })

  it('keeps screen generation tools for screen intent', () => {
    const result = filterMcpToolsForIntent(tools, 'Create a settings screen in Figma')

    expect(result.intent).toBe('screen')
    expect(result.tools.map(t => t.name)).toEqual([
      'query',
      'use_figma',
      'generate_figma_design',
      'search_design_system',
    ])
  })

  it('filters out raw figma read tools for broad visual intent', () => {
    const result = filterMcpToolsForIntent(tools, 'Generate something visual in Figma')

    expect(result.intent).toBe('visual')
    expect(result.tools.map(t => t.name)).not.toContain('get_figma_data')
    expect(result.tools.map(t => t.name)).toContain('generate_diagram')
    expect(result.tools.map(t => t.name)).toContain('use_figma')
  })

  it('keeps all tools for non-visual requests', () => {
    const result = filterMcpToolsForIntent(tools, 'Query the database for users')

    expect(result.intent).toBe('general')
    expect(result.tools).toEqual(tools)
  })
})
