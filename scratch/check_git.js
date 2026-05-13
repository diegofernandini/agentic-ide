
const { execSync } = require('child_process');
const path = require('path');

const rootPath = process.cwd();

function getGitInfo() {
  try {
    const status = execSync('git status --porcelain', { cwd: rootPath, encoding: 'utf-8' });
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: rootPath, encoding: 'utf-8' }).trim();
    const log = execSync('git log --oneline -n 5', { cwd: rootPath, encoding: 'utf-8' });
    
    console.log('--- Status ---');
    console.log(status);
    console.log('--- Branch ---');
    console.log(branch);
    console.log('--- Log ---');
    console.log(log);
  } catch (e) {
    console.error('Failed to get git info', e.message);
  }
}

getGitInfo();
