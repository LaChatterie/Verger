// custom-build.js
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// Load custom configuration
const configPath = path.resolve(__dirname, 'custom-config.json')
let config = {}

if (fs.existsSync(configPath)) {
  console.log('Loading configuration from custom-config.json')
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
} else {
  console.log('No custom-config.json found, using default configuration')
  // Default configuration
  config = {
    SYSTEM_MODELS: {
      openai: [
        { id: 'gpt-4o', provider: 'openai', name: 'GPT-4o', group: 'GPT 4o' },
        { id: 'gpt-4o-mini', provider: 'openai', name: 'GPT-4o-mini', group: 'GPT 4o' },
        { id: 'gpt-3.5-turbo', provider: 'openai', name: 'GPT-3.5 Turbo', group: 'GPT 3.5' }
      ],
      gemini: [
        { id: 'gemini-1.5-flash', provider: 'gemini', name: 'Gemini 1.5 Flash', group: 'Gemini 1.5' },
        { id: 'gemini-1.5-pro', provider: 'gemini', name: 'Gemini 1.5 Pro', group: 'Gemini 1.5' }
      ]
    },
    DEFAULT_MODEL: {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'openai',
      group: 'GPT 4o'
    },
    TOPIC_NAMING_MODEL: {
      id: 'gpt-4o-mini',
      name: 'GPT-4o-mini',
      provider: 'openai',
      group: 'GPT 4o'
    },
    TRANSLATE_MODEL: {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      group: 'GPT 3.5'
    },
    INITIAL_PROVIDERS: [
      {
        id: 'openai',
        name: 'OpenAI',
        type: 'openai',
        apiKey: '',
        apiHost: 'https://api.openai.com',
        models: [],
        isSystem: true,
        enabled: true
      },
      {
        id: 'silicon',
        name: 'Silicon',
        type: 'openai',
        apiKey: '',
        apiHost: 'https://api.siliconflow.cn',
        models: [],
        isSystem: true,
        enabled: false
      }
    ],
    TOPIC_NAMING_PROMPT: 'Generate an English title with 10 characters or less'
  }

  // Save default configuration
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
  console.log('Created default custom-config.json')
}

// Set environment variables
Object.entries(config).forEach(([key, value]) => {
  process.env[`CUSTOM_${key}`] = typeof value === 'string' ? value : JSON.stringify(value)
})

console.log('Custom environment variables set:')
Object.keys(config).forEach((key) => {
  console.log(`- CUSTOM_${key}`)
})

// Run the build command
console.log('\nStarting build with custom configuration...')

// Set custom Node.js path for Windows
if (process.platform === 'win32') {
  const nodePath = 'C:\\Program Files\\nodejs20'
  process.env.PATH = `${nodePath};${process.env.PATH}`
  console.log(`Using Node.js from: ${nodePath}`)
}

// Run npm build command
const buildProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
  stdio: 'inherit',
  env: process.env,
  shell: true
})

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\nBuild completed successfully with custom configuration!')
  } else {
    console.error(`\nBuild failed with exit code ${code}`)
  }
})
