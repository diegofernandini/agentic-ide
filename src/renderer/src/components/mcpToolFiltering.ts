export type McpToolDescriptor = {
  serverName: string
  name: string
  description?: string
  inputSchema?: any
}

export type McpIntent = 'diagram' | 'screen' | 'visual' | 'general'

function isFigmaTool(tool: McpToolDescriptor): boolean {
  return /figma/i.test(tool.serverName)
}

function detectIntent(text: string): McpIntent {
  const value = text.toLowerCase()

  const diagramIntent = /\b(diagram|flowchart|flow chart|user flow|workflow|architecture|sequence diagram|erd|entity relationship|timeline|figjam)\b/.test(value)
  const screenIntent = /\b(screen|mockup|mock-up|ui|page|layout|component|modal|dialog|sidebar|dashboard|landing page|wireframe)\b/.test(value)
  const visualIntent = /\b(figma|figjam|design|visual)\b/.test(value)

  if (diagramIntent) return 'diagram'
  if (screenIntent) return 'screen'
  if (visualIntent) return 'visual'
  return 'general'
}

function allowDiagramTool(tool: McpToolDescriptor): boolean {
  return /generate_diagram/i.test(tool.name)
}

function allowScreenTool(tool: McpToolDescriptor): boolean {
  return /use_figma|generate_figma_design|search_design_system|get_libraries|create_new_file/i.test(tool.name)
}

function allowVisualTool(tool: McpToolDescriptor): boolean {
  return allowDiagramTool(tool) || allowScreenTool(tool)
}

export function filterMcpToolsForIntent(tools: McpToolDescriptor[], userText: string): { intent: McpIntent; tools: McpToolDescriptor[] } {
  const intent = detectIntent(userText)
  if (intent === 'general') return { intent, tools }

  const nonFigmaTools = tools.filter(tool => !isFigmaTool(tool))
  const figmaTools = tools.filter(isFigmaTool)

  let allowedFigmaTools: McpToolDescriptor[]
  if (intent === 'diagram') {
    allowedFigmaTools = figmaTools.filter(allowDiagramTool)
  } else if (intent === 'screen') {
    allowedFigmaTools = figmaTools.filter(allowScreenTool)
  } else {
    allowedFigmaTools = figmaTools.filter(allowVisualTool)
  }

  if (allowedFigmaTools.length === 0) {
    return { intent, tools }
  }

  return {
    intent,
    tools: [...nonFigmaTools, ...allowedFigmaTools]
  }
}
