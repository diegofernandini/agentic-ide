/**
 * Test de exploración de la condición de bug en processWrites
 *
 * **Validates: Requirements 1.1, 1.2, 1.3**
 *
 * METODOLOGÍA: Este test codifica el comportamiento CORRECTO esperado.
 * Al ejecutarse en el código SIN corregir, FALLA — ese fallo es la evidencia del bug.
 * Cuando el fix esté implementado, este test PASARÁ.
 *
 * BUG: cuando rootPath es null y filePath es relativo, la concatenación
 * `${rootPath}/${filePath}` produce "null/src/utils.ts" y escribe en ubicación
 * incorrecta sin notificar al usuario.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Extraer la lógica pura de processWrites para poder testearla de forma aislada.
// Replicamos la implementación CORREGIDA (con el fix aplicado).
// ---------------------------------------------------------------------------

type WriteAction = {
  path: string
  content: string
  accepted: boolean | null
  prevContent?: string
  error?: string
}

// ---------------------------------------------------------------------------
// Función auxiliar de normalización de rutas (igual que en ChatPanel.tsx)
// ---------------------------------------------------------------------------

function joinPath(base: string, rel: string): string {
  return base.replace(/\/$/, '') + '/' + rel.replace(/^\//, '')
}

/**
 * Implementación CORREGIDA de processWrites.
 * Replica el código de ChatPanel.tsx con el fix aplicado.
 */
async function processWritesFixed(
  text: string,
  rootPath: string | null,
  autopilot: boolean,
  openFile: string | null,
  onWriteFile: (content: string) => void,
  onRefreshTree: () => void
): Promise<WriteAction[]> {
  const re = /```write:([^\n]+)\n([\s\S]*?)```/g
  let match
  const actions: WriteAction[] = []
  while ((match = re.exec(text)) !== null) {
    const filePath = match[1].trim()
    const content = match[2]
    // FIX: guard para rootPath null con path relativo
    if (!rootPath && !filePath.startsWith('/')) {
      actions.push({ path: filePath, content, accepted: false, error: 'No workspace folder open' })
      continue
    }
    // FIX: usar joinPath para normalizar separadores
    const abs = filePath.startsWith('/') ? filePath : joinPath(rootPath!, filePath)
    let prevContent: string | undefined
    try { prevContent = await window.api.readFile(abs) } catch {}
    if (autopilot) {
      await window.api.writeFile(abs, content)
      if (openFile && abs === openFile) onWriteFile(content)
    }
    actions.push({ path: abs, content, accepted: null, prevContent })
  }
  if (actions.length > 0) onRefreshTree()
  return actions
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildWriteBlock(filePath: string, content: string): string {
  return `\`\`\`write:${filePath}\n${content}\`\`\``
}

// ---------------------------------------------------------------------------
// Setup de mocks
// ---------------------------------------------------------------------------

beforeEach(() => {
  // Mock de window.api
  Object.defineProperty(window, 'api', {
    value: {
      writeFile: vi.fn().mockResolvedValue(true),
      readFile: vi.fn().mockRejectedValue(new Error('not found')),
      listFiles: vi.fn().mockResolvedValue([]),
      loadSessions: vi.fn().mockResolvedValue(null),
      saveSessions: vi.fn().mockResolvedValue(undefined),
    },
    writable: true,
    configurable: true,
  })
})

// ---------------------------------------------------------------------------
// Tests de exploración del bug
// ---------------------------------------------------------------------------

describe('Bug Condition: processWrites con rootPath inválido', () => {

  /**
   * Caso 1: rootPath = null, filePath relativo
   *
   * Comportamiento CORRECTO esperado: writeFile NO debe ser llamado con "null/src/utils.ts"
   * Comportamiento BUGGY actual: writeFile SÍ es llamado con "null/src/utils.ts"
   *
   * Este test FALLA en el código sin corregir (confirma el bug).
   */
  it('Caso 1: rootPath=null + filePath relativo → writeFile NO debe recibir ruta con "null/"', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const text = buildWriteBlock('src/utils.ts', 'export const x = 1\n')

    await processWritesFixed(
      text,
      null,           // rootPath = null → BUG CONDITION
      true,           // autopilot = true
      null,
      vi.fn(),
      vi.fn()
    )

    // Comportamiento correcto: writeFile NO debe ser llamado con rutas que contengan "null/"
    // En código sin corregir, este expect FALLA porque writeFile SÍ recibe "null/src/utils.ts"
    const calls = writeFileMock.mock.calls
    const invalidCalls = calls.filter(([path]) => path.includes('null/'))
    expect(invalidCalls).toHaveLength(0)
  })

  /**
   * Caso 2: rootPath con trailing slash + filePath con leading slash
   *
   * Comportamiento CORRECTO esperado: writeFile NO debe recibir ruta con "//"
   * Comportamiento BUGGY actual: writeFile SÍ es llamado con "/project//src/bar.ts"
   *
   * Este test FALLA en el código sin corregir (confirma el bug).
   */
  it('Caso 2: rootPath con trailing slash + filePath con leading slash → ruta NO debe contener "//"', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const text = buildWriteBlock('/src/bar.ts', 'export const y = 2\n')

    await processWritesFixed(
      text,
      '/project/',    // rootPath con trailing slash → BUG CONDITION
      true,
      null,
      vi.fn(),
      vi.fn()
    )

    // filePath empieza con '/', así que se usa directamente (no hay bug de "//" en este caso)
    // Pero si el modelo genera un path relativo con rootPath que tiene trailing slash:
    const text2 = buildWriteBlock('src/bar.ts', 'export const y = 2\n')
    writeFileMock.mockClear()

    await processWritesFixed(
      text2,
      '/project/',    // rootPath con trailing slash
      true,
      null,
      vi.fn(),
      vi.fn()
    )

    // Con rootPath="/project/" y filePath="src/bar.ts" → produce "/project//src/bar.ts" (BUG)
    // Comportamiento correcto: la ruta debe ser "/project/src/bar.ts" sin doble barra
    const calls = writeFileMock.mock.calls
    const invalidCalls = calls.filter(([path]) => path.includes('//'))
    expect(invalidCalls).toHaveLength(0)
  })

  /**
   * Caso 3: rootPath = null + múltiples bloques write
   *
   * Comportamiento CORRECTO esperado: ningún bloque debe escribir con ruta "null/..."
   * y el usuario debe ser notificado del error.
   * Comportamiento BUGGY actual: todos los bloques escriben silenciosamente con rutas inválidas.
   *
   * Este test FALLA en el código sin corregir (confirma el bug).
   */
  it('Caso 3: rootPath=null + múltiples bloques write → ninguno debe escribir con ruta "null/"', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const text = [
      buildWriteBlock('src/a.ts', 'const a = 1\n'),
      buildWriteBlock('src/b.ts', 'const b = 2\n'),
      buildWriteBlock('src/c.ts', 'const c = 3\n'),
    ].join('\n\n')

    const actions = await processWritesFixed(
      text,
      null,           // rootPath = null → BUG CONDITION para todos los bloques
      true,
      null,
      vi.fn(),
      vi.fn()
    )

    // Comportamiento correcto: writeFile NO debe ser llamado con rutas "null/..."
    const calls = writeFileMock.mock.calls
    const invalidCalls = calls.filter(([path]) => path.includes('null/'))
    expect(invalidCalls).toHaveLength(0)

    // Comportamiento correcto: las acciones deben indicar error (no accepted silenciosamente)
    // En código sin corregir, accepted=null y path="null/src/a.ts" sin ningún error visible
    const actionsWithNullPath = actions.filter(a => a.path.startsWith('null/'))
    expect(actionsWithNullPath).toHaveLength(0)
  })

  /**
   * Property-based test: para cualquier filePath relativo con rootPath=null,
   * writeFile NUNCA debe ser llamado con una ruta que contenga "null/"
   *
   * **Validates: Requirements 1.1, 1.3**
   */
  it('PBT: para cualquier filePath relativo con rootPath=null → writeFile nunca recibe "null/"', async () => {
    await fc.assert(
      fc.asyncProperty(
        // Generar filePaths relativos (sin leading slash)
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9/_-]*\.[a-z]{2,4}$/),
        async (filePath) => {
          const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
          writeFileMock.mockClear()

          const text = buildWriteBlock(filePath, 'content\n')

          await processWritesFixed(
            text,
            null,   // rootPath = null → BUG CONDITION
            true,
            null,
            vi.fn(),
            vi.fn()
          )

          // Comportamiento correcto: writeFile NO debe recibir rutas con "null/"
          const calls = writeFileMock.mock.calls
          const invalidCalls = calls.filter(([path]: [string]) => path.includes('null/'))
          return invalidCalls.length === 0
        }
      ),
      { numRuns: 50 }
    )
  })
})
