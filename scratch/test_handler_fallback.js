const http = require('http');

function performOllamaChat(payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload)
    const options = {
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/chat',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 60000
    }
    const req = http.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => resolve({ statusCode: res.statusCode || 200, data }))
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('Ollama request timed out')) })
    req.write(body)
    req.end()
  })
}

async function handleOllamaChat(payload) {
  try {
    let result = await performOllamaChat(payload)
    
    // Fallback: If model doesn't support tools, retry without tools
    if (result.statusCode === 400 && payload && payload.tools) {
      try {
        const parsed = JSON.parse(result.data)
        if (parsed.error && parsed.error.includes('does not support tools')) {
          console.log(`[TEST INFO] Model "${payload.model}" doesn't support tools. Retrying request without tools...`);
          const fallbackPayload = { ...payload }
          delete fallbackPayload.tools
          result = await performOllamaChat(fallbackPayload)
        }
      } catch (err) {
        console.error('[TEST ERROR] Error trying to parse 400 error body:', err);
      }
    }
    
    if (result.statusCode >= 400) {
      throw new Error(`Ollama error (${result.statusCode}): ${result.data}`)
    }
    
    return result.data
  } catch (err) {
    throw new Error(err.message || String(err))
  }
}

async function runTests() {
  console.log('--- Test 1: Model that does not support tools (llama3:latest) with tools payload ---');
  try {
    const response = await handleOllamaChat({
      model: 'llama3:latest',
      stream: false,
      messages: [{ role: 'user', content: 'Say "hello" and nothing else.' }],
      tools: [{
        type: 'function',
        function: {
          name: 'mcp__mock__test',
          description: 'mock test tool',
          parameters: {
            type: 'object',
            properties: { arg: { type: 'string' } }
          }
        }
      }]
    });
    console.log('[TEST SUCCESS] Got response from llama3:latest successfully (fallback worked!):');
    console.log(response);
  } catch (err) {
    console.error('[TEST FAILED] Test 1 failed:', err);
  }

  console.log('\n--- Test 2: Non-existent model ---');
  try {
    const response = await handleOllamaChat({
      model: 'non-existent-model',
      stream: false,
      messages: [{ role: 'user', content: 'hello' }]
    });
    console.log('[TEST FAILED] Expected non-existent model to throw error, but got response:', response);
  } catch (err) {
    console.log('[TEST SUCCESS] Correctly threw error for non-existent model:');
    console.log(err.message);
  }
}

runTests();
