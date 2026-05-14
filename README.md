# Agentic IDE

A minimal VS Code-like IDE with an agentic chat panel powered by Ollama.

## Requirements

- Node.js 18+¬
- [Ollama](https://ollama.ai) running locally (`ollama serve`)
- At least one model pulled, e.g. `ollama pull llama3`

## Setup

```bash
cd agentic-ide
npm install
npm run dev
```

## Usage

1. Click "Open Folder" to choose your project directory
2. Select a model from the dropdown (auto-detected from Ollama)¬
3. Click any file to open it in the editor
4. Chat with the agent — it can read the open file and write files back

## Agent file writing

The agent writes files using this syntax in its response:

```write:path/to/file.ts
// file content
```

The IDE detects this and writes the file automatically.
