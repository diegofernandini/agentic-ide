const fs = require('fs');
const path = require('path');
const os = require('os');

async function testListBackups() {
  try {
    // userData path on macOS for Electron: ~/Library/Application Support/agentic-ide
    const appDirName = 'agentic-ide';
    const backupDir = path.join(os.homedir(), 'Library', 'Application Support', appDirName, 'backups');
    console.log('Checking backups directory:', backupDir);
    
    if (!fs.existsSync(backupDir)) {
      console.log('Backups directory does not exist!');
      return;
    }
    
    const files = await fs.promises.readdir(backupDir);
    const backupFiles = files.filter(f => f.startsWith('sessions.')).sort().reverse();
    console.log(`Found ${backupFiles.length} backup files:`, backupFiles);
    
    const backupsWithDetails = await Promise.all(backupFiles.slice(0, 10).map(async file => {
      try {
        const filePath = path.join(backupDir, file);
        const content = await fs.promises.readFile(filePath, 'utf-8');
        const sessions = JSON.parse(content);
        const workspaces = new Set();
        let summary = 'No active chats';
        
        if (Array.isArray(sessions)) {
          sessions.forEach((s) => {
            if (s.workspace) {
              const name = s.workspace.split(/[\\/]/).pop();
              if (name) workspaces.add(name);
            }
          });
          
          if (sessions.length > 0) {
            // Find the most recently active session
            const activeSess = [...sessions].sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))[0];
            if (activeSess) {
              if (activeSess.messages && activeSess.messages.length > 0) {
                const userMsgs = activeSess.messages.filter((m) => m.role === 'user');
                const lastUserMsg = userMsgs[userMsgs.length - 1];
                if (lastUserMsg && lastUserMsg.content) {
                  const text = lastUserMsg.content.trim().replace(/\s+/g, ' ');
                  const preview = text.length > 30 ? text.slice(0, 30) + '...' : text;
                  summary = `Prompt: "${preview}"`;
                } else {
                  const lastMsg = activeSess.messages[activeSess.messages.length - 1];
                  const text = (lastMsg.content || '').trim().replace(/\s+/g, ' ');
                  const preview = text.length > 30 ? text.slice(0, 30) + '...' : text;
                  summary = `Msg: "${preview}"`;
                }
              } else {
                summary = `Created "${activeSess.name}"`;
              }
            }
          }
        }
        return {
          filename: file,
          workspaces: Array.from(workspaces),
          summary
        };
      } catch (err) {
        return { filename: file, workspaces: [], summary: 'Corrupted backup file: ' + err.message };
      }
    }));
    
    console.log('Result details of latest 3 backups:\n', JSON.stringify(backupsWithDetails, null, 2));
  } catch (err) {
    console.error('Diagnostic failed:', err);
  }
}

testListBackups();
