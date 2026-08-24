export interface ParsedPlainTextToolCall {
  name: string
  arguments: string
}

function hasOwn(obj: unknown, key: string): boolean {
  return !!obj && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, key)
}

function normalizeToolCallItem(item: any): ParsedPlainTextToolCall | null {
  if (!item || typeof item !== 'object') return null

  let name: unknown
  let args: unknown

  if (item.type === 'function' && item.function && typeof item.function === 'object') {
    name = item.function.name
    if (hasOwn(item.function, 'arguments')) args = item.function.arguments
  } else {
    name = item.name
    if (hasOwn(item, 'arguments')) args = item.arguments
  }

  if (typeof name !== 'string' || !name.startsWith('mcp__')) return null
  if (args === undefined) return null

  return {
    name,
    arguments: typeof args === 'string' ? args : JSON.stringify(args)
  }
}

function tryParseCandidate(candidate: string): ParsedPlainTextToolCall[] {
  const parsed = JSON.parse(candidate)
  const items = Array.isArray(parsed) ? parsed : [parsed]
  return items
    .map(normalizeToolCallItem)
    .filter((item): item is ParsedPlainTextToolCall => item !== null)
}

function getJsonCandidates(text: string): string[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  const candidates = new Set<string>([trimmed])
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i)
  if (fenced?.[1]) candidates.add(fenced[1].trim())

  const firstBrace = trimmed.indexOf('{')
  const lastBrace = trimmed.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    candidates.add(trimmed.slice(firstBrace, lastBrace + 1).trim())
  }

  const firstBracket = trimmed.indexOf('[')
  const lastBracket = trimmed.lastIndexOf(']')
  if (firstBracket !== -1 && lastBracket > firstBracket) {
    candidates.add(trimmed.slice(firstBracket, lastBracket + 1).trim())
  }

  return [...candidates]
}

export function parsePlainTextToolCalls(text: string): ParsedPlainTextToolCall[] {
  for (const candidate of getJsonCandidates(text)) {
    try {
      const parsed = tryParseCandidate(candidate)
      if (parsed.length > 0) return parsed
    } catch {
      // Try the next candidate shape.
    }
  }
  return []
}
