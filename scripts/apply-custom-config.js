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

const fs = require('fs');
const path = require('path');

// Get the path to the custom configuration file
const configPath = process.env.CUSTOM_CONFIG_PATH || path.resolve(__dirname, '../custom-config.json');

// Check if the custom configuration file exists
if (!fs.existsSync(configPath)) {
  console.log(`Custom configuration file not found at ${configPath}`);
  console.log('Creating default configuration...');
  
  // Default configuration
  const defaultConfig = {
    "SYSTEM_MODELS": {
      "openai": [
        { "id": "gpt-4o", "provider": "openai", "name": "GPT-4o", "group": "GPT 4o" },
        { "id": "gpt-4o-mini", "provider": "openai", "name": "GPT-4o-mini", "group": "GPT 4o" },
        { "id": "gpt-3.5-turbo", "provider": "openai", "name": "GPT-3.5 Turbo", "group": "GPT 3.5" }
      ],
      "gemini": [
        { "id": "gemini-1.5-flash", "provider": "gemini", "name": "Gemini 1.5 Flash", "group": "Gemini 1.5" },
        { "id": "gemini-1.5-pro", "provider": "gemini", "name": "Gemini 1.5 Pro", "group": "Gemini 1.5" }
      ]
    },
    "DEFAULT_MODEL": {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "provider": "openai",
      "group": "GPT 4o"
    },
    "TOPIC_NAMING_MODEL": {
      "id": "gpt-4o-mini",
      "name": "GPT-4o-mini",
      "provider": "openai",
      "group": "GPT 4o"
    },
    "TRANSLATE_MODEL": {
      "id": "gpt-3.5-turbo",
      "name": "GPT-3.5 Turbo",
      "provider": "openai",
      "group": "GPT 3.5"
    },
    "INITIAL_PROVIDERS": [
      {
        "id": "openai",
        "name": "OpenAI",
        "type": "openai",
        "apiKey": "",
        "apiHost": "https://api.openai.com",
        "models": [],
        "isSystem": true,
        "enabled": true
      },
      {
        "id": "silicon",
        "name": "Silicon",
        "type": "openai",
        "apiKey": "",
        "apiHost": "https://api.siliconflow.cn",
        "models": [],
        "isSystem": true,
        "enabled": false
      }
    ],
    "TOPIC_NAMING_PROMPT": "Generate an English title with 10 characters or less"
  };

  // Save default configuration
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log(`Created default custom configuration at ${configPath}`);
}

// Load the custom configuration
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.log('Loaded custom configuration from', configPath);

// Set environment variables
Object.entries(config).forEach(([key, value]) => {
  const envKey = `CUSTOM_${key}`;
  process.env[envKey] = typeof value === 'string' ? value : JSON.stringify(value);
  console.log(`Set environment variable: ${envKey}`);
});

// If this script is being executed directly (not imported)
if (require.main === module) {
  console.log('Custom configuration applied successfully!');
  console.log('You can now run your build command.');
}

module.exports = config;
