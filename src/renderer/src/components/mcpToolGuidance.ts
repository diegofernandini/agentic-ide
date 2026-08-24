type McpToolDescriptor = {
  serverName: string
  name: string
  description?: string
}

function hasTool(tools: McpToolDescriptor[], predicate: (tool: McpToolDescriptor) => boolean): boolean {
  return tools.some(predicate)
}

function fromServer(tools: McpToolDescriptor[], serverPattern: RegExp): McpToolDescriptor[] {
  return tools.filter(tool => serverPattern.test(tool.serverName))
}

export function buildMcpToolGuidance(activeMcpTools: McpToolDescriptor[]): string {
  if (activeMcpTools.length === 0) return ''

  const lines: string[] = []
  const figmaTools = fromServer(activeMcpTools, /figma/i)

  if (figmaTools.length > 0) {
    const hasDiagramTool = hasTool(figmaTools, t => /generate_diagram/i.test(t.name))
    const hasUseFigmaTool = hasTool(figmaTools, t => /use_figma/i.test(t.name))
    const hasGenerateDesignTool = hasTool(figmaTools, t => /generate_figma_design/i.test(t.name))
    const hasSearchDesignSystemTool = hasTool(figmaTools, t => /search_design_system/i.test(t.name))
    const hasReadOnlyDataTool = hasTool(figmaTools, t => /get_figma_data|get_design_context|get_screenshot|get_metadata/i.test(t.name))

    lines.push('[CONNECTED MCP GUIDANCE]')
    lines.push('Figma tools are connected. When the user asks to create or update visuals directly from the IDE, prefer MCP tool calls over plain-text advice.')

    if (hasDiagramTool) {
      lines.push('- For diagrams, user flows, flowcharts, architecture diagrams, sequence diagrams, timelines, or FigJam-style visuals, call the Figma `generate_diagram` tool.')
    }

    if (hasUseFigmaTool || hasGenerateDesignTool) {
      lines.push('- For screens, pages, mockups, components, or layouts, call Figma visual-generation tools such as `use_figma` or `generate_figma_design`.')
    }

    if (hasSearchDesignSystemTool) {
      lines.push('- If creating a screen in Figma, search the design system first and reuse existing components/tokens when possible.')
    }

    if (hasReadOnlyDataTool) {
      lines.push('- Do NOT use raw Figma read tools like `get_figma_data` as the primary action when the user wants a diagram or screen generated. Reserve read tools for extracting context from an existing file or node before generating/updating a visual.')
    }

    lines.push('- If the user provides a Figma URL, extract the file key and node id and use them as tool arguments.')
    lines.push('- After tool execution, summarize the result briefly instead of dumping raw tool output.')
  }

  return lines.length > 0 ? `\n\n${lines.join('\n')}` : ''
}
