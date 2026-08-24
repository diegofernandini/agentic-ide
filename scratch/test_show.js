const http = require('http');

function checkModel(modelName) {
  return new Promise((resolve) => {
    const payload = { name: modelName };
    const body = JSON.stringify(payload);
    const options = {
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/show',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.write(body);
    req.end();
  });
}

async function run() {
  const llama = await checkModel('llama3:latest');
  console.log('LLAMA3 keys:', llama ? Object.keys(llama) : 'null');
  if (llama) {
    console.log('LLAMA3 details:', llama.details);
    console.log('LLAMA3 model_info keys:', llama.model_info ? Object.keys(llama.model_info) : 'none');
  }

  const qwen = await checkModel('qwen2.5-coder:latest');
  console.log('QWEN keys:', qwen ? Object.keys(qwen) : 'null');
  if (qwen) {
    console.log('QWEN details:', qwen.details);
    console.log('QWEN model_info keys:', qwen.model_info ? Object.keys(qwen.model_info) : 'none');
  }
}

run();
