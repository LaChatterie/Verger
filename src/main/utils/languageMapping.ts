/**
 * Utility functions for language code mapping and normalization
 */

// List of supported language codes in the application
export const SUPPORTED_LANGUAGES = ['el-GR', 'en-US', 'es-ES', 'fr-FR', 'ja-JP', 'pt-PT', 'ru-RU', 'zh-CN', 'zh-TW']

/**
 * Maps language variants to their base language codes
 * For example, maps "en-GB" to "en-US"
 *
 * @param languageCode The language code to map
 * @returns The mapped language code
 */
export function mapLanguageVariant(languageCode: string): string {
  // If the language code is already supported, return it as is
  if (SUPPORTED_LANGUAGES.includes(languageCode)) {
    return languageCode
  }

  // Get the language prefix (e.g., "en" from "en-GB")
  const prefix = languageCode.split('-')[0].toLowerCase()

  // Find a supported language with the same prefix
  const mappedLanguage = SUPPORTED_LANGUAGES.find((lang) => lang.toLowerCase().startsWith(`${prefix}-`))

  // Return the mapped language if found, otherwise return the original
  return mappedLanguage || languageCode
}
