import * as http from 'http'

export type TaskCategory =
  | 'code-generation'
  | 'code-review'
  | 'debugging'
  | 'planning'
  | 'reasoning'
  | 'general-chat'

export interface ModelRecommendation {
  taskCategory: TaskCategory
  confidence: number
  selectedModel: string
  suitabilityScore: number
  isOptimal: boolean
  recommendedModelToPull?: string
  reason: string
  /** True when Qwen3.6 made the selection instead of the deterministic fallback. */
  usedLlmRouter?: boolean
  routerModel?: string
  recommendedRouterModel?: string
  deviceProfile?: DeviceProfile
}

export interface DeviceProfile {
  platform: string
  architecture: string
  cpuCores: number
  memoryGiB: number
  /** Conservative amount of memory reserved for a quantized Ollama model. */
  modelMemoryBudgetGiB: number
  tier: 'compact' | 'standard' | 'performance' | 'workstation'
}

// ─── Free Open Models Catalog (Ollama Library Open-Weights Models) ────────────
export const FREE_OPEN_MODEL_CATALOG: Record<TaskCategory, { primary: string; alternatives: string[] }> = {
  'code-generation': {
    primary: 'qwen2.5-coder:14b',
    alternatives: ['qwen2.5-coder:7b', 'codellama:13b', 'starcoder2:7b', 'deepseek-coder-v2:16b']
  },
  'code-review': {
    primary: 'qwen2.5-coder:14b',
    alternatives: ['qwen2.5-coder:7b', 'codellama:13b', 'deepseek-coder:6.7b']
  },
  'debugging': {
    primary: 'deepseek-r1:14b',
    alternatives: ['deepseek-r1:8b', 'qwen2.5-coder:14b', 'llama3.1:8b']
  },
  'reasoning': {
    primary: 'deepseek-r1:14b',
    alternatives: ['deepseek-r1:8b', 'qwq:32b', 'llama3.3:70b']
  },
  'planning': {
    primary: 'llama3.1:8b',
    alternatives: ['llama3.3:70b', 'mistral-nemo:12b', 'phi4:14b']
  },
  'general-chat': {
    primary: 'llama3.1:8b',
    alternatives: ['mistral:7b', 'gemma2:9b', 'phi4:14b']
  }
}

/** Pick download recommendations that leave room for the OS, editor, and context. */
export function getCatalogForDevice(profile?: DeviceProfile): Record<TaskCategory, { primary: string; alternatives: string[] }> {
  if (!profile) return FREE_OPEN_MODEL_CATALOG
  if (profile.memoryGiB >= 48) {
    return {
      'code-generation': { primary: 'qwen3-coder:30b', alternatives: ['devstral:24b', 'qwen2.5-coder:14b'] },
      'code-review': { primary: 'qwen3-coder:30b', alternatives: ['devstral:24b', 'qwen2.5-coder:14b'] },
      debugging: { primary: 'deepseek-r1:32b', alternatives: ['qwen3-coder:30b', 'deepseek-r1:14b'] },
      reasoning: { primary: 'deepseek-r1:32b', alternatives: ['qwen3.6:35b', 'deepseek-r1:14b'] },
      planning: { primary: 'qwen3.6:35b', alternatives: ['llama3.3:70b', 'phi4:14b'] },
      'general-chat': { primary: 'qwen3.6:35b', alternatives: ['llama3.3:70b', 'phi4:14b'] }
    }
  }
  if (profile.memoryGiB >= 32) {
    return {
      'code-generation': { primary: 'qwen3-coder:30b', alternatives: ['devstral:24b', 'qwen2.5-coder:14b'] },
      'code-review': { primary: 'devstral:24b', alternatives: ['qwen2.5-coder:14b', 'qwen2.5-coder:7b'] },
      debugging: { primary: 'deepseek-r1:14b', alternatives: ['qwen2.5-coder:14b', 'deepseek-r1:8b'] },
      reasoning: { primary: 'deepseek-r1:14b', alternatives: ['qwen3.6:27b', 'deepseek-r1:8b'] },
      planning: { primary: 'qwen3.6:27b', alternatives: ['phi4:14b', 'llama3.1:8b'] },
      'general-chat': { primary: 'qwen3.6:27b', alternatives: ['phi4:14b', 'llama3.1:8b'] }
    }
  }
  if (profile.memoryGiB >= 16) {
    return {
      'code-generation': { primary: 'qwen2.5-coder:14b', alternatives: ['qwen2.5-coder:7b', 'deepseek-coder:6.7b'] },
      'code-review': { primary: 'qwen2.5-coder:14b', alternatives: ['qwen2.5-coder:7b', 'deepseek-coder:6.7b'] },
      debugging: { primary: 'deepseek-r1:14b', alternatives: ['deepseek-r1:8b', 'qwen2.5-coder:7b'] },
      reasoning: { primary: 'deepseek-r1:14b', alternatives: ['deepseek-r1:8b', 'llama3.1:8b'] },
      planning: { primary: 'phi4:14b', alternatives: ['llama3.1:8b', 'qwen2.5-coder:7b'] },
      'general-chat': { primary: 'llama3.1:8b', alternatives: ['phi4:14b', 'gemma2:9b'] }
    }
  }
  return {
    'code-generation': { primary: 'qwen2.5-coder:7b', alternatives: ['qwen2.5-coder:3b', 'deepseek-coder:1.3b'] },
    'code-review': { primary: 'qwen2.5-coder:7b', alternatives: ['qwen2.5-coder:3b', 'deepseek-coder:1.3b'] },
    debugging: { primary: 'deepseek-r1:8b', alternatives: ['qwen2.5-coder:7b', 'llama3.2:3b'] },
    reasoning: { primary: 'deepseek-r1:8b', alternatives: ['llama3.2:3b', 'qwen2.5-coder:3b'] },
    planning: { primary: 'llama3.2:3b', alternatives: ['qwen2.5-coder:3b', 'gemma2:2b'] },
    'general-chat': { primary: 'llama3.2:3b', alternatives: ['gemma2:2b', 'qwen2.5-coder:3b'] }
  }
}

// Keywords for prompt intent inference
const INTENT_PATTERNS: Record<TaskCategory, RegExp[]> = {
  'code-generation': [
    /\b(write|create|implement|build|generate|code|function|class|component|script|html|css|tsx?|jsx?|python|java|rust|golang|c\+\+)\b/i,
    /```[a-z0-9]*/i
  ],
  'code-review': [
    /\b(review|audit|refactor|optimize|clean up|best practice|security|vulnerability|lint)\b/i
  ],
  'debugging': [
    /\b(fix|bug|error|exception|stacktrace|crash|failing|issue|unexpected|typeerror|nullpointer)\b/i,
    /Error:|Exception:|Traceback/i
  ],
  'reasoning': [
    /\b(explain why|logic|math|algorithm|proof|deepseek|step-by-step|evaluate|analyze|why does)\b/i
  ],
  'planning': [
    /\b(plan|design|architecture|roadmap|break down|steps|approach|schema|structure)\b/i
  ],
  'general-chat': [
    /\b(hi|hello|what is|tell me|explain|summary|summarize|documentation|help)\b/i
  ]
}

export class ModelRouter {
  /**
   * Classify user prompt intent into a TaskCategory
   */
  classifyPrompt(prompt: string): { category: TaskCategory; confidence: number } {
    if (!prompt || !prompt.trim()) {
      return { category: 'general-chat', confidence: 0.5 }
    }

    const scores: Record<TaskCategory, number> = {
      'code-generation': 0,
      'code-review': 0,
      'debugging': 0,
      'reasoning': 0,
      'planning': 0,
      'general-chat': 0
    }

    for (const [category, patterns] of Object.entries(INTENT_PATTERNS) as [TaskCategory, RegExp[]][]) {
      for (const pattern of patterns) {
        const matches = prompt.match(pattern)
        if (matches) {
          scores[category] += matches.length * 2
        }
      }
    }

    // Boost code-generation if code fences exist
    if (/```[a-z0-9]*/i.test(prompt)) {
      scores['code-generation'] += 3
    }

    // Boost debugging if error keywords present
    if (/error|exception|fail/i.test(prompt)) {
      scores['debugging'] += 3
    }

    let topCategory: TaskCategory = 'general-chat'
    let maxScore = 0

    for (const [cat, score] of Object.entries(scores) as [TaskCategory, number][]) {
      if (score > maxScore) {
        maxScore = score
        topCategory = cat
      }
    }

    const confidence = maxScore > 0 ? Math.min(1.0, 0.5 + maxScore * 0.1) : 0.5
    return { category: topCategory, confidence }
  }

  /**
   * Score an installed model name against a target task category (0 - 100)
   */
  scoreModelForTask(modelName: string, category: TaskCategory, device?: DeviceProfile): number {
    const name = modelName.toLowerCase()
    let score = 50 // baseline for any installed Ollama model

    if (category === 'code-generation' || category === 'code-review') {
      if (name.includes('coder') || name.includes('codellama') || name.includes('starcoder')) {
        score += 40
      } else if (name.includes('qwen2.5') || name.includes('deepseek')) {
        score += 25
      } else if (name.includes('llama3') || name.includes('mistral')) {
        score += 15
      }
    } else if (category === 'debugging' || category === 'reasoning') {
      if (name.includes('deepseek-r1') || name.includes('qwq') || name.includes('r1')) {
        score += 45
      } else if (name.includes('coder')) {
        score += 30
      } else if (name.includes('llama3.3') || name.includes('llama3.1')) {
        score += 20
      }
    } else if (category === 'planning') {
      if (name.includes('llama3.3') || name.includes('llama3.1') || name.includes('mistral-nemo')) {
        score += 35
      } else if (name.includes('qwen2.5')) {
        score += 25
      }
    } else {
      // General chat
      if (name.includes('llama3.1') || name.includes('mistral') || name.includes('gemma')) {
        score += 35
      }
    }

    // Size bonus
    if (name.includes('14b') || name.includes('13b') || name.includes('16b') || name.includes('32b') || name.includes('70b')) {
      score += 10
    }

    const parameters = name.match(/(?:^|:|-)(\d+(?:\.\d+)?)b(?:$|[-:])/i)
    if (parameters && device) {
      // Q4 Ollama weights typically need ~0.63 GiB per billion parameters plus
      // runtime/context overhead. Rejecting oversized models is preferable to
      // suggesting a download that will make the editor unusable.
      const estimatedGiB = Number(parameters[1]) * 0.63
      if (estimatedGiB > device.modelMemoryBudgetGiB) score -= 75
    }

    return Math.max(0, Math.min(100, score))
  }

  isModelSuitableForDevice(modelName: string, device?: DeviceProfile): boolean {
    if (!device) return true
    const match = modelName.toLowerCase().match(/(?:^|:|-)(\d+(?:\.\d+)?)b(?:$|[-:])/i)
    return !match || Number(match[1]) * 0.63 <= device.modelMemoryBudgetGiB
  }

  /**
   * Select the best model from installed models for a prompt,
   * evaluating suitability threshold (>= 60) and catalog recommendations.
   */
  selectModel(
    prompt: string,
    installedModels: string[],
    fallbackModel: string = 'llama3.1:latest',
    device?: DeviceProfile
  ): ModelRecommendation {
    const { category, confidence } = this.classifyPrompt(prompt)

    if (!installedModels || installedModels.length === 0) {
      const catalog = getCatalogForDevice(device)[category]
      return {
        taskCategory: category,
        confidence,
        selectedModel: fallbackModel,
        suitabilityScore: 30,
        isOptimal: false,
        recommendedModelToPull: catalog.primary,
        deviceProfile: device,
        reason: `No installed models found. Recommended for this ${device?.tier || 'default'} device: ${catalog.primary}`
      }
    }

    let bestModel = installedModels[0]
    let bestScore = -1

    for (const model of installedModels) {
      const score = this.scoreModelForTask(model, category, device)
      if (score > bestScore) {
        bestScore = score
        bestModel = model
      }
    }

    // If installed fallback is equal or better, ensure it's considered
    if (installedModels.includes(fallbackModel)) {
      const fallbackScore = this.scoreModelForTask(fallbackModel, category, device)
      if (fallbackScore > bestScore) {
        bestScore = fallbackScore
        bestModel = fallbackModel
      }
    }

    const SUITABILITY_THRESHOLD = 60
    const isOptimal = bestScore >= SUITABILITY_THRESHOLD
    const catalog = getCatalogForDevice(device)[category]
    const recommendedModelToPull = isOptimal ? undefined : catalog.primary

    let reason = `Selected '${bestModel}' for ${category} (suitability score: ${bestScore}/100)`
    if (device) reason += ` on this ${device.tier} ${device.memoryGiB} GiB device`
    if (!isOptimal) {
      reason += `. Installed models fall below suitability threshold. Consider pulling free open model '${catalog.primary}'.`
    }

    return {
      taskCategory: category,
      confidence,
      selectedModel: bestModel,
      suitabilityScore: bestScore,
      isOptimal,
      recommendedModelToPull,
      reason,
      deviceProfile: device
    }
  }
}
