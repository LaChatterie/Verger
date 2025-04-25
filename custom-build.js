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
  console.error('ERROR: No custom-config.json found!')
  console.error('The custom configuration file is required for the build process.')
  console.error('Please create a custom-config.json file before running the build.')
  process.exit(1)
}

// Generate a temporary .env file with custom environment variables
const tempEnvFile = path.resolve(__dirname, '.temp-env')
const envContent = Object.entries(config)
  .map(([key, value]) => {
    const envValue = typeof value === 'string' ? value : JSON.stringify(value)
    return `CUSTOM_${key}=${envValue}`
  })
  .join('\n')

fs.writeFileSync(tempEnvFile, envContent)

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

// Run npm build command with dotenv to load environment variables
const buildProcess = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['dotenv', '-e', tempEnvFile, process.platform === 'win32' ? 'npm.cmd' : 'npm', 'run', 'build'],
  {
    stdio: 'inherit',
    shell: true
  }
)

buildProcess.on('close', (code) => {
  // Clean up the temporary .env file
  try {
    fs.unlinkSync(tempEnvFile)
    console.log('Cleaned up temporary environment file')
  } catch (error) {
    console.warn('Failed to clean up temporary environment file:', error)
  }

  if (code === 0) {
    console.log('\nBuild completed successfully with custom configuration!')
  } else {
    console.error(`\nBuild failed with exit code ${code}`)
  }
})
