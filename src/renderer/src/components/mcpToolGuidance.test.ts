import { describe, expect, it } from 'vitest'
import { buildMcpToolGuidance } from './mcpToolGuidance'

describe('buildMcpToolGuidance', () => {
  it('returns empty guidance when no tools are connected', () => {
    expect(buildMcpToolGuidance([])).toBe('')
  })

  it('adds diagram and screen guidance for connected Figma tools', () => {
    const guidance = buildMcpToolGuidance([
      { serverName: 'Figma', name: 'generate_diagram' },
      { serverName: 'Figma', name: 'use_figma' },
      { serverName: 'Figma', name: 'search_design_system' },
      { serverName: 'Figma', name: 'get_figma_data' },
    ])

    expect(guidance).toContain('generate_diagram')
    expect(guidance).toContain('use_figma')
    expect(guidance).toContain('search the design system first')
    expect(guidance).toContain('Do NOT use raw Figma read tools like `get_figma_data`')
  })

  it('includes figma URL handling guidance', () => {
    const guidance = buildMcpToolGuidance([
      { serverName: 'plugin-figma-figma', name: 'generate_figma_design' },
    ])

    expect(guidance).toContain('extract the file key and node id')
  })
})
