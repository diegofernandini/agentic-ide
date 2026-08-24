import { describe, expect, it } from 'vitest'
import { parsePlainTextToolCalls } from './ollamaToolCallParsing'

describe('parsePlainTextToolCalls', () => {
  it('parses qwen-style single tool call JSON streamed as plain text', () => {
    const text = `{
  "name": "mcp__Figma__get_figma_data",
  "arguments": {
    "fileKey": "GJLkTNBBXtekV4rCN5ULBe",
    "nodeId": "16223:50"
  }
}`

    expect(parsePlainTextToolCalls(text)).toEqual([
      {
        name: 'mcp__Figma__get_figma_data',
        arguments: '{"fileKey":"GJLkTNBBXtekV4rCN5ULBe","nodeId":"16223:50"}'
      }
    ])
  })

  it('accepts empty argument objects', () => {
    const text = '{"name":"mcp__server__ping","arguments":{}}'

    expect(parsePlainTextToolCalls(text)).toEqual([
      {
        name: 'mcp__server__ping',
        arguments: '{}'
      }
    ])
  })

  it('parses OpenAI-style function wrappers inside fenced json', () => {
    const text = [
      '```json',
      '[',
      '  {',
      '    "type": "function",',
      '    "function": {',
      '      "name": "mcp__demo__lookup",',
      '      "arguments": {"id": "123"}',
      '    }',
      '  }',
      ']',
      '```'
    ].join('\n')

    expect(parsePlainTextToolCalls(text)).toEqual([
      {
        name: 'mcp__demo__lookup',
        arguments: '{"id":"123"}'
      }
    ])
  })

  it('ignores non-tool JSON payloads', () => {
    expect(parsePlainTextToolCalls('{"message":"hello"}')).toEqual([])
  })
})
