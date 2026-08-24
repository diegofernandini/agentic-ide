const http = require('http');

const payload = {
  model: 'deepseek-r1:14b',
  stream: false,
  messages: [{ role: 'user', content: 'say hi' }],
  tools: [{
    type: 'function',
    function: {
      name: 'mcp__mock__test',
      description: 'mock test tool',
      parameters: {
        type: 'object',
        properties: {
          arg: { type: 'string' }
        }
      }
    }
  }]
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
  timeout: 10000
};

const req = http.request(options, (res) => {
  let data = '';
  console.log('Status code:', res.statusCode);
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response ended.');
    console.log(data);
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.write(body);
req.end();
