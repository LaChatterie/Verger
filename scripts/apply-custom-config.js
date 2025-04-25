#!/usr/bin/env node
/**
 * This script applies custom configuration to the build process.
 * It can be used both locally and in CI/CD pipelines.
 *
 * Usage:
 *   node scripts/apply-custom-config.js
 *
 * Environment variables:
 *   CUSTOM_CONFIG_PATH - Path to the custom configuration file (default: custom-config.json)
 */

const fs = require('fs')
const path = require('path')

// Get the path to the custom configuration file
const configPath = process.env.CUSTOM_CONFIG_PATH || path.resolve(__dirname, '../custom-config.json')

// Check if the custom configuration file exists
if (!fs.existsSync(configPath)) {
  console.error(`ERROR: Custom configuration file not found at ${configPath}`)
  console.error('The custom configuration file is required for the build process.')
  console.error(
    'Please create a custom-config.json file or specify the correct path using CUSTOM_CONFIG_PATH environment variable.'
  )

  // Exit with error code if this script is being executed directly
  if (require.main === module) {
    process.exit(1)
  } else {
    throw new Error(`Custom configuration file not found at ${configPath}`)
  }
}

// Load the custom configuration
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
console.log('Loaded custom configuration from', configPath)

// Set environment variables
Object.entries(config).forEach(([key, value]) => {
  const envKey = `CUSTOM_${key}`
  process.env[envKey] = typeof value === 'string' ? value : JSON.stringify(value)
  console.log(`Set environment variable: ${envKey}`)
})

// If this script is being executed directly (not imported)
if (require.main === module) {
  console.log('Custom configuration applied successfully!')
  console.log('You can now run your build command.')
}

module.exports = config
