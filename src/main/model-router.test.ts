import { describe, it, expect } from 'vitest'
import { ModelRouter, FREE_OPEN_MODEL_CATALOG } from './model-router'

describe('ModelRouter Engine', () => {
  const router = new ModelRouter()

  it('classifies code-generation prompts accurately', () => {
    const result = router.classifyPrompt('Write a React component for a login form in TSX')
    expect(result.category).toBe('code-generation')
    expect(result.confidence).toBeGreaterThan(0.5)
  })

  it('classifies debugging prompts accurately', () => {
    const result = router.classifyPrompt('Fix this TypeError: Cannot read properties of undefined (reading "map")')
    expect(result.category).toBe('debugging')
  })

  it('classifies reasoning prompts accurately', () => {
    const result = router.classifyPrompt('Explain the step-by-step logic and algorithm behind Dijkstra graph search')
    expect(result.category).toBe('reasoning')
  })

  it('classifies planning prompts accurately', () => {
    const result = router.classifyPrompt('Plan the system architecture and roadmap for user authentication')
    expect(result.category).toBe('planning')
  })

  it('scores coder models higher for code-generation tasks', () => {
    const scoreCoder = router.scoreModelForTask('qwen2.5-coder:14b', 'code-generation')
    const scoreGeneral = router.scoreModelForTask('llama3.1:8b', 'code-generation')
    expect(scoreCoder).toBeGreaterThan(scoreGeneral)
  })

  it('scores reasoning models higher for reasoning/debugging tasks', () => {
    const scoreReasoning = router.scoreModelForTask('deepseek-r1:14b', 'reasoning')
    const scoreGeneral = router.scoreModelForTask('gemma:2b', 'reasoning')
    expect(scoreReasoning).toBeGreaterThan(scoreGeneral)
  })

  it('recommends free open model pull when installed models fall below suitability threshold', () => {
    const installed = ['tiny-general-model:1b']
    const rec = router.selectModel('Write a complex React TypeScript web app with state management', installed, 'tiny-general-model:1b')
    expect(rec.isOptimal).toBe(false)
    expect(rec.recommendedModelToPull).toBe(FREE_OPEN_MODEL_CATALOG['code-generation'].primary)
  })

  it('selects optimal installed model when available', () => {
    const installed = ['llama3.1:8b', 'qwen2.5-coder:14b', 'deepseek-r1:8b']
    const rec = router.selectModel('Implement a fast sorting algorithm in C++', installed)
    expect(rec.selectedModel).toBe('qwen2.5-coder:14b')
    expect(rec.isOptimal).toBe(true)
  })
})
