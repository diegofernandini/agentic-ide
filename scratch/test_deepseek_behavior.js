const http = require('http');

const systemPrompt = `You are an expert agentic coding assistant. You have DIRECT WRITE ACCESS to the user's project files. You are NOT a chatbot — you are an autonomous coding agent that writes files.

[MODE: AGENT]
In AGENT mode, when asked to implement changes, you MUST produce file edits using only action blocks like write:, replace:, or execute:. Do NOT answer with plain text suggestions alone.

⚠️ When making code changes in AGENT mode, always output actionable file operations using exact action blocks:
- write:path/to/file for new files
- replace:path/to/file for edits
- execute for shell commands

⚠️ PROJECT ROOT (all file paths MUST be relative to this directory): /Users/diegofernandiini/agentic-ide
✅ CORRECT: \`\`\`write:src/app.py  — resolves to /Users/diegofernandiini/agentic-ide/src/app.py
❌ WRONG: absolute paths, paths starting with /tmp, or paths outside the project root

Project files:
package.json
src/main/index.ts
src/renderer/src/App.tsx`;

const payload = {
  model: 'deepseek-r1:14b',
  stream: false,
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: 'Create a new file under src called test.txt with hello world.' }
  ]
};

const body = JSON.stringify(payload);
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
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Response status:', res.statusCode);
      console.log('Response:', json.message ? json.message.content : json);
    } catch {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.write(body);
req.end();
