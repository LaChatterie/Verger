/**
 * Utilities for handling custom configuration directly from JSON file
 */

import fs from 'fs';
import path from 'path';

// Cache for the custom configuration to avoid reading the file multiple times
let customConfigCache: Record<string, any> | null = null;

/**
 * Reads the custom configuration from the custom-config.json file
 * @returns The custom configuration object or null if the file doesn't exist
 */
function readCustomConfig(): Record<string, any> | null {
  if (customConfigCache !== null) {
    return customConfigCache;
  }

  try {
    // In development mode, the file is in the project root
    // In production mode, the file is in the resources directory
    const isDev = import.meta.env.DEV;
    
    let configPath: string;
    if (isDev) {
      // For development, try to find the file in the project root
      configPath = path.resolve(process.cwd(), 'custom-config.json');
    } else {
      // For production, try to find the file in the resources directory
      // The path is different depending on the platform and packaging
      const resourcesPath = window.electron?.ipcRenderer?.sendSync('get-resources-path') || '';
      configPath = path.join(resourcesPath, 'custom-config.json');
    }

    // Check if the file exists
    if (!fs.existsSync(configPath)) {
      console.warn(`Custom configuration file not found at ${configPath}`);
      return null;
    }

    // Read and parse the file
    const configContent = fs.readFileSync(configPath, 'utf8');
    customConfigCache = JSON.parse(configContent);
    console.log('Loaded custom configuration from', configPath);
    return customConfigCache;
  } catch (error) {
    console.error('Failed to read custom configuration:', error);
    return null;
  }
}

/**
 * Gets a configuration value from the custom configuration file
 * @param key The key name in the custom configuration
 * @param defaultValue The default value to use if the key is not found
 * @returns The value from the custom configuration or the default value
 */
export function getCustomConfig<T>(key: string, defaultValue: T): T {
  try {
    const config = readCustomConfig();
    if (config && key in config) {
      console.log(`Using custom configuration for ${key}`);
      return config[key] as T;
    }
    
    console.log(`No custom configuration found for ${key}, using default value`);
    return defaultValue;
  } catch (error) {
    console.warn(`Failed to get custom configuration for ${key}:`, error);
    return defaultValue;
  }
}
