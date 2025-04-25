// custom-build.js
// This script is a convenience wrapper around the standard build process
// that ensures the custom-config.json file exists before building.

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// Check if custom configuration exists
const configPath = path.resolve(__dirname, 'custom-config.json')

if (!fs.existsSync(configPath)) {
  console.error('ERROR: No custom-config.json found!')
  console.error('The custom configuration file is required for the build process.')
  console.error('Please create a custom-config.json file before running the build.')
  process.exit(1)
}

// Verify the custom configuration is valid JSON
try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
  console.log('Loaded custom configuration from custom-config.json')
  console.log('Configuration contains the following keys:')
  Object.keys(config).forEach((key) => {
    console.log(`- ${key}`)
  })
} catch (error) {
  console.error('ERROR: Failed to parse custom-config.json')
  console.error(error)
  process.exit(1)
}

// Run the build command
console.log('\nStarting build with custom configuration...')

// Set custom Node.js path for Windows
if (process.platform === 'win32') {
  const nodePath = 'C:\\Program Files\\nodejs20'
  process.env.PATH = `${nodePath};${process.env.PATH}`
  console.log(`Using Node.js from: ${nodePath}`)
}

// Run yarn build command
const buildProcess = spawn(process.platform === 'win32' ? 'yarn.cmd' : 'yarn', ['build'], {
  stdio: 'inherit',
  shell: true
})

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\nBuild completed successfully with custom configuration!')
  } else {
    console.error(`\nBuild failed with exit code ${code}`)
  }
})
