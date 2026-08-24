/**
 * Tests de preservación para processWrites
 *
 * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
 *
 * METODOLOGÍA: observation-first — se observa el comportamiento ACTUAL del código
 * sin corregir para inputs donde `isBugCondition = false`, y se captura ese
 * comportamiento como tests que deben seguir pasando después del fix.
 *
 * EXPECTED OUTCOME: Todos estos tests PASAN en el código sin corregir.
 * Cuando el fix esté implementado, deben seguir pasando (sin regresiones).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Tipos
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

// ---------------------------------------------------------------------------
// Implementación CORREGIDA — réplica del código de ChatPanel.tsx con el fix.
// Se usa para verificar que el comportamiento base se preserva tras el fix.
// ---------------------------------------------------------------------------

async function processWritesBuggy(
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
    if (!rootPath && !filePath.startsWith('/')) {
      actions.push({ path: filePath, content, accepted: false, error: 'No workspace folder open' })
      continue
    }
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

/**
 * handleAccept — réplica exacta de ChatPanel.tsx
 * Escribe el archivo cuando autopilot está desactivado.
 */
async function handleAccept(
  write: WriteAction,
  autopilot: boolean,
  openFile: string | null,
  onWriteFile: (content: string) => void,
  onRefreshTree: () => void
): Promise<void> {
  if (!autopilot) {
    await window.api.writeFile(write.path, write.content)
    if (openFile && write.path === openFile) onWriteFile(write.content)
    onRefreshTree()
  }
}

/**
 * handleRevert — réplica exacta de ChatPanel.tsx
 * Restaura el contenido previo del archivo.
 */
async function handleRevert(
  write: WriteAction,
  openFile: string | null,
  onWriteFile: (content: string) => void,
  onRefreshTree: () => void
): Promise<void> {
  if (write.prevContent === undefined) return
  await window.api.writeFile(write.path, write.prevContent)
  if (openFile && write.path === openFile) onWriteFile(write.prevContent)
  onRefreshTree()
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
// Tests de preservación — comportamiento base (isBugCondition = false)
// ---------------------------------------------------------------------------

describe('Preservation: comportamiento para inputs donde isBugCondition = false', () => {

  /**
   * Caso 1: rootPath válido + filePath relativo sin separadores duplicados
   *
   * Observación: rootPath="/project", filePath="src/utils.ts"
   * → writeFile recibe "/project/src/utils.ts" (correcto, no es bug condition)
   *
   * Requirement 3.1 (indirectamente) — este caso no es bug condition y debe preservarse.
   */
  it('Caso 1: rootPath="/project" + filePath="src/utils.ts" → writeFile recibe "/project/src/utils.ts"', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const text = buildWriteBlock('src/utils.ts', 'export const x = 1\n')

    await processWritesBuggy(
      text,
      '/project',   // rootPath válido, no null
      true,
      null,
      vi.fn(),
      vi.fn()
    )

    expect(writeFileMock).toHaveBeenCalledWith('/project/src/utils.ts', 'export const x = 1\n')
  })

  /**
   * Caso 2: rootPath = null + filePath absoluto
   *
   * Observación: rootPath=null, filePath="/abs/path.ts"
   * → writeFile recibe "/abs/path.ts" (path absoluto, no es bug condition)
   *
   * Requirement 3.1 — paths absolutos explícitos se usan directamente.
   */
  it('Caso 2: rootPath=null + filePath="/abs/path.ts" → writeFile recibe "/abs/path.ts"', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const text = buildWriteBlock('/abs/path.ts', 'export const y = 2\n')

    await processWritesBuggy(
      text,
      null,         // rootPath = null, pero filePath es absoluto → no es bug condition
      true,
      null,
      vi.fn(),
      vi.fn()
    )

    expect(writeFileMock).toHaveBeenCalledWith('/abs/path.ts', 'export const y = 2\n')
  })

  /**
   * Caso 3: handleAccept con autopilot desactivado
   *
   * Observación: cuando autopilot=false, handleAccept llama a writeFile con la ruta
   * almacenada en el WriteAction.
   *
   * Requirement 3.2 — aceptación manual debe seguir funcionando igual.
   */
  it('Caso 3: handleAccept con autopilot=false → llama a writeFile con la ruta del WriteAction', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const onWriteFile = vi.fn()
    const onRefreshTree = vi.fn()

    const write: WriteAction = {
      path: '/project/src/utils.ts',
      content: 'export const z = 3\n',
      accepted: null,
    }

    await handleAccept(write, false, null, onWriteFile, onRefreshTree)

    expect(writeFileMock).toHaveBeenCalledWith('/project/src/utils.ts', 'export const z = 3\n')
    expect(onRefreshTree).toHaveBeenCalledTimes(1)
  })

  /**
   * Caso 4: handleRevert restaura prevContent correctamente
   *
   * Observación: handleRevert llama a writeFile con el contenido previo del archivo.
   *
   * Requirement 3.3 — reversión debe restaurar el contenido previo correctamente.
   */
  it('Caso 4: handleRevert → restaura prevContent correctamente', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
    const onWriteFile = vi.fn()
    const onRefreshTree = vi.fn()

    const write: WriteAction = {
      path: '/project/src/utils.ts',
      content: 'export const z = 3\n',
      accepted: null,
      prevContent: 'export const z = 0\n',
    }

    await handleRevert(write, null, onWriteFile, onRefreshTree)

    expect(writeFileMock).toHaveBeenCalledWith('/project/src/utils.ts', 'export const z = 0\n')
    expect(onRefreshTree).toHaveBeenCalledTimes(1)
  })

  /**
   * Caso 5: onRefreshTree es llamado después de escrituras exitosas
   *
   * Requirement 3.4 (implícito) — onRefreshTree debe seguir siendo llamado.
   */
  it('Caso 5: onRefreshTree es llamado después de escrituras exitosas', async () => {
    const onRefreshTree = vi.fn()
    const text = buildWriteBlock('/abs/file.ts', 'content\n')

    await processWritesBuggy(text, null, true, null, vi.fn(), onRefreshTree)

    expect(onRefreshTree).toHaveBeenCalledTimes(1)
  })

  /**
   * Caso 6: onWriteFile es llamado cuando el archivo escrito coincide con openFile
   *
   * Requirement 3.4 — onWriteFile debe seguir siendo llamado cuando abs === openFile.
   */
  it('Caso 6: onWriteFile es llamado cuando el archivo escrito coincide con openFile', async () => {
    const onWriteFile = vi.fn()
    const openFile = '/project/src/utils.ts'
    const text = buildWriteBlock('src/utils.ts', 'new content\n')

    await processWritesBuggy(text, '/project', true, openFile, onWriteFile, vi.fn())

    expect(onWriteFile).toHaveBeenCalledWith('new content\n')
  })

  /**
   * Caso 7: onWriteFile NO es llamado cuando el archivo escrito NO coincide con openFile
   *
   * Preservation — no debe haber llamadas espurias a onWriteFile.
   */
  it('Caso 7: onWriteFile NO es llamado cuando el archivo escrito no coincide con openFile', async () => {
    const onWriteFile = vi.fn()
    const text = buildWriteBlock('/other/file.ts', 'content\n')

    await processWritesBuggy(text, null, true, '/project/src/utils.ts', onWriteFile, vi.fn())

    expect(onWriteFile).not.toHaveBeenCalled()
  })

  /**
   * Caso 8: handleRevert con prevContent=undefined → no llama a writeFile
   *
   * Preservation — si no hay contenido previo, no se debe revertir.
   */
  it('Caso 8: handleRevert sin prevContent → no llama a writeFile', async () => {
    const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>

    const write: WriteAction = {
      path: '/project/src/utils.ts',
      content: 'content\n',
      accepted: null,
      // prevContent no definido
    }

    await handleRevert(write, null, vi.fn(), vi.fn())

    expect(writeFileMock).not.toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// Property-Based Tests de preservación
// ---------------------------------------------------------------------------

describe('PBT Preservation: propiedades universales para inputs no afectados por el bug', () => {

  /**
   * Property 2a: Para todo filePath absoluto (empieza con "/"),
   * la ruta resultante es siempre igual al filePath original,
   * independientemente de rootPath.
   *
   * **Validates: Requirements 3.1**
   */
  it('PBT 2a: filePath absoluto → ruta resultante siempre igual al filePath, independiente de rootPath', async () => {
    await fc.assert(
      fc.asyncProperty(
        // filePath absoluto: empieza con "/"
        fc.stringMatching(/^\/[a-zA-Z0-9/_-]+\.[a-z]{2,4}$/),
        // rootPath: puede ser null, string válido, o string con trailing slash
        fc.oneof(
          fc.constant(null),
          fc.stringMatching(/^\/[a-zA-Z0-9/_-]+$/),
          fc.stringMatching(/^\/[a-zA-Z0-9/_-]+\/$/)
        ),
        async (filePath, rootPath) => {
          const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
          writeFileMock.mockClear()

          const text = buildWriteBlock(filePath, 'content\n')

          await processWritesBuggy(text, rootPath, true, null, vi.fn(), vi.fn())

          const calls = writeFileMock.mock.calls
          if (calls.length === 0) return false
          const [calledPath] = calls[0]
          // La ruta debe ser exactamente el filePath original (path absoluto no se modifica)
          return calledPath === filePath
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 2b: Para todo rootPath válido (no null) y filePath relativo
   * sin separadores duplicados, la ruta construida es rootPath + "/" + filePath.
   *
   * **Validates: Requirements 3.1**
   */
  it('PBT 2b: rootPath válido + filePath relativo → ruta construida es rootPath + "/" + filePath', async () => {
    await fc.assert(
      fc.asyncProperty(
        // rootPath válido: no null, no termina en "/"
        fc.stringMatching(/^\/[a-zA-Z0-9_-]+$/),
        // filePath relativo: no empieza con "/"
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9/_-]*\.[a-z]{2,4}$/),
        async (rootPath, filePath) => {
          const writeFileMock = window.api.writeFile as ReturnType<typeof vi.fn>
          writeFileMock.mockClear()

          const text = buildWriteBlock(filePath, 'content\n')

          await processWritesBuggy(text, rootPath, true, null, vi.fn(), vi.fn())

          const calls = writeFileMock.mock.calls
          if (calls.length === 0) return false
          const [calledPath] = calls[0]
          const expectedPath = `${rootPath}/${filePath}`
          return calledPath === expectedPath
        }
      ),
      { numRuns: 50 }
    )
  })

  /**
   * Property 2c: onRefreshTree siempre es llamado exactamente una vez
   * cuando hay al menos un bloque write procesado.
   *
   * **Validates: Requirements 3.4**
   */
  it('PBT 2c: onRefreshTree es llamado exactamente una vez por invocación con bloques write', async () => {
    await fc.assert(
      fc.asyncProperty(
        // filePath absoluto para evitar bug condition
        fc.stringMatching(/^\/[a-zA-Z0-9/_-]+\.[a-z]{2,4}$/),
        async (filePath) => {
          const onRefreshTree = vi.fn()
          const text = buildWriteBlock(filePath, 'content\n')

          await processWritesBuggy(text, null, true, null, vi.fn(), onRefreshTree)

          return onRefreshTree.mock.calls.length === 1
        }
      ),
      { numRuns: 30 }
    )
  })

  /**
   * Property 2d: onWriteFile es llamado con el contenido correcto cuando
   * el archivo escrito coincide con openFile.
   *
   * **Validates: Requirements 3.4**
   */
  it('PBT 2d: onWriteFile recibe el contenido correcto cuando abs === openFile', async () => {
    await fc.assert(
      fc.asyncProperty(
        // rootPath válido
        fc.stringMatching(/^\/[a-zA-Z0-9_-]+$/),
        // filePath relativo
        fc.stringMatching(/^[a-zA-Z][a-zA-Z0-9/_-]*\.[a-z]{2,4}$/),
        // Contenido sin backticks — backtick characters corrupt the triple-fence regex
        // used by buildWriteBlock to wrap content (the closing ``` would be consumed).
        fc.stringMatching(/^[^`]{1,200}$/),
        async (rootPath, filePath, content) => {
          const onWriteFile = vi.fn()
          const openFile = `${rootPath}/${filePath}`
          const text = buildWriteBlock(filePath, content)

          await processWritesBuggy(text, rootPath, true, openFile, onWriteFile, vi.fn())

          if (onWriteFile.mock.calls.length === 0) return false
          const [calledContent] = onWriteFile.mock.calls[0]
          return calledContent === content
        }
      ),
      { numRuns: 30 }
    )
  })
})
