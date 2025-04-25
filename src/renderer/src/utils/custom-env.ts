/**
 * Utilities for handling custom environment variables
 */

import { Model } from '@renderer/types'

/**
 * Gets a configuration value from a custom environment variable
 * @param key The key name (without the CUSTOM_ prefix)
 * @param defaultValue The default value to use if the environment variable is not set
 * @returns The parsed value from the environment variable or the default value
 */
export function getCustomEnvConfig<T>(key: string, defaultValue: T): T {
  try {
    const envKey = `CUSTOM_${key}`
    console.log(`Checking for custom environment variable: ${envKey}`)

    // Log all available environment variables for debugging
    if (key === 'SYSTEM_MODELS') {
      console.log(
        'Available environment variables:',
        Object.keys(import.meta.env)
          .filter((k) => k.startsWith('CUSTOM_'))
          .join(', ')
      )
    }

    const envValue = import.meta.env[envKey]
    if (envValue) {
      console.log(
        `Found custom environment variable ${envKey} with value:`,
        envValue.substring(0, 100) + (envValue.length > 100 ? '...' : '')
      )
      const parsedValue = JSON.parse(envValue)
      console.log(`Using custom configuration for ${key}`)
      return parsedValue
    }

    console.log(`No custom configuration found for ${key}, using default value`)
    return defaultValue
  } catch (error) {
    console.warn(`Failed to parse custom environment variable ${key}:`, error)
    return defaultValue
  }
}

/**
 * Merges a custom configuration with a default configuration
 * @param key The key name (without the CUSTOM_ prefix)
 * @param defaultValue The default value to merge with
 * @returns The merged configuration
 */
export function mergeCustomEnvConfig<T extends object>(key: string, defaultValue: T): T {
  try {
    const envKey = `CUSTOM_${key}`
    const envValue = import.meta.env[envKey]
    if (envValue) {
      const parsedValue = JSON.parse(envValue)
      console.log(`Merging custom configuration for ${key}:`, parsedValue)
      return { ...defaultValue, ...parsedValue }
    }
    return defaultValue
  } catch (error) {
    console.warn(`Failed to parse custom environment variable ${key}:`, error)
    return defaultValue
  }
}

/**
 * Validates a model configuration
 * @param model The model configuration to validate
 * @returns True if the model is valid, false otherwise
 */
function isValidModel(model: any): boolean {
  return (
    model &&
    typeof model === 'object' &&
    typeof model.id === 'string' &&
    typeof model.name === 'string' &&
    typeof model.provider === 'string' &&
    typeof model.group === 'string'
  )
}

/**
 * Gets a model configuration from a custom environment variable
 * @param key The key name (without the CUSTOM_ prefix)
 * @param defaultValue The default model to use if the environment variable is not set
 * @returns The parsed model from the environment variable or the default model
 */
export function getCustomModelConfig(key: string, defaultValue: Model): Model {
  try {
    const envKey = `CUSTOM_${key}`
    const envValue = import.meta.env[envKey]
    if (envValue) {
      const parsedValue = JSON.parse(envValue)
      if (isValidModel(parsedValue)) {
        console.log(`Using custom model for ${key}:`, parsedValue)
        return parsedValue
      } else {
        console.warn(`Invalid model configuration for ${key}:`, parsedValue)
      }
    }
    return defaultValue
  } catch (error) {
    console.warn(`Failed to parse custom model configuration for ${key}:`, error)
    return defaultValue
  }
}
