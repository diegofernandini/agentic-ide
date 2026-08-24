const http = require('http');

const payload = {
  model: 'llama3:latest',
  stream: true,
  messages: [{ role: 'user', content: 'say hi' }]
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
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  res.on('data', chunk => {
    data += chunk;
    console.log('Received chunk of size:', chunk.length);
  });
  res.on('end', () => {
    console.log('Response ended. Total length:', data.length);
    console.log('Response content preview:\n', data.slice(0, 1000));
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.write(body);
req.end();
