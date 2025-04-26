# Verger Custom Configuration

This repository includes a custom configuration system for Verger (forked from Cherry Studio) that allows you to override default settings without modifying the original source code.

## How It Works

The custom configuration system uses a TypeScript file (`src/renderer/src/config/custom-config.ts`) that defines constants used throughout the application. This approach is simpler and more reliable than using runtime configuration files.

## Configuration Options

You can customize the following settings:

- **CUSTOM_SYSTEM_MODELS**: Override the available models for each provider
- **CUSTOM_DEFAULT_MODEL**: Set the default model for new conversations
- **CUSTOM_TOPIC_NAMING_MODEL**: Set the model used for generating topic names
- **CUSTOM_TRANSLATE_MODEL**: Set the model used for translations
- **CUSTOM_INITIAL_PROVIDERS**: Configure which providers are available and enabled by default. These providers will be listed first, followed by any other providers not explicitly defined, sorted alphabetically by name
- **CUSTOM_TOPIC_NAMING_PROMPT**: Set a custom prompt for generating topic names
- **CUSTOM_SETTINGS**: Override any application settings
- **CUSTOM_DEFAULT_MINAPPS**: Set a list of MiniApp IDs to be displayed first, followed by all other non-Chinese MiniApps

## How to Use

### Local Development

1. Edit the `src/renderer/src/config/custom-config.ts` file to customize your settings
2. Run the standard build script:

```bash
yarn build
```

This will build Verger with your custom configuration.

3. To package the application:

```bash
yarn build:win  # For Windows
yarn build:mac  # For macOS
yarn build:linux  # For Linux
```

### GitHub Workflows

The repository includes a GitHub workflow that uses your custom configuration:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Release" workflow
3. Click "Run workflow"
4. Enter the release tag
5. Click "Run workflow" to start the build process

## Example Configuration

```typescript
// custom-config.ts
import { MinAppType, Model, Provider } from '@renderer/types'

// Custom system models
export const CUSTOM_SYSTEM_MODELS: Record<string, Model[]> = {
  openai: [
    {
      id: 'gpt-4o',
      provider: 'openai',
      name: 'GPT-4o',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-4o-mini',
      provider: 'openai',
      name: 'GPT-4o-mini',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-3.5-turbo',
      provider: 'openai',
      name: 'GPT-3.5 Turbo',
      group: 'GPT 3.5'
    }
  ],
  gemini: [
    {
      id: 'gemini-1.5-flash',
      provider: 'gemini',
      name: 'Gemini 1.5 Flash',
      group: 'Gemini 1.5'
    },
    {
      id: 'gemini-1.5-pro',
      provider: 'gemini',
      name: 'Gemini 1.5 Pro',
      group: 'Gemini 1.5'
    }
  ]
}

// Custom default model
export const CUSTOM_DEFAULT_MODEL: Model = {
  id: 'gpt-4o',
  name: 'GPT-4o',
  provider: 'openai',
  group: 'GPT 4o'
}

// Custom initial providers - these will be listed first, followed by other providers
export const CUSTOM_INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://openrouter.ai/api/v1/',
    models: CUSTOM_SYSTEM_MODELS.openrouter,
    isSystem: true,
    enabled: true
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'anthropic',
    apiKey: '',
    apiHost: 'https://api.anthropic.com/',
    models: CUSTOM_SYSTEM_MODELS.anthropic,
    isSystem: true,
    enabled: true
  }
]

// Custom topic naming prompt
export const CUSTOM_TOPIC_NAMING_PROMPT = 'Generate an English title with 10 characters or less'

// Custom default MiniApps
// Set to an array of MinApp IDs to be listed first in order
// The system will include all other non-Chinese MinApps after these
export const CUSTOM_DEFAULT_MINAPPS: string[] = ['openai', 'anthropic', 'gemini', 'lechat', 'aistudio', 'notebooklm']
```

## Advantages

- **Type Safety**: The TypeScript compiler ensures that your configuration is valid
- **No Runtime File Access**: The configuration is baked into the application at build time
- **Better Performance**: No file I/O operations are needed at runtime
- **Improved Reliability**: No risk of file access errors or missing files in production builds
- **Easy to Maintain**: All configuration is in a single file with proper TypeScript types
- **No Source Code Modifications**: The original source files remain untouched, making it easier to merge updates from upstream.

## Updating from Upstream

When updating from the upstream repository, you may need to update the custom configuration system if the structure of the configuration objects changes. However, since the changes are minimal and focused on the configuration initialization, they are less likely to conflict with upstream changes.

## Technical Details

The custom configuration system works by:

1. Defining constants in the `custom-config.ts` file
2. Importing these constants in the relevant files
3. Using these constants to override default settings

The configuration is applied in the following files:

- `src/renderer/src/config/models.ts`: Uses the `CUSTOM_SYSTEM_MODELS` constant
- `src/renderer/src/store/llm.ts`: Uses the `CUSTOM_DEFAULT_MODEL`, `CUSTOM_TOPIC_NAMING_MODEL`, `CUSTOM_TRANSLATE_MODEL`, and `CUSTOM_INITIAL_PROVIDERS` constants
- `src/renderer/src/store/settings.ts`: Uses the `CUSTOM_SETTINGS` and `CUSTOM_TOPIC_NAMING_PROMPT` constants
- `src/renderer/src/store/minapps.ts`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant
- `src/renderer/src/components/Icons/MinAppIcon.tsx`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant
- `src/renderer/src/pages/settings/MiniappSettings/MiniAppSettings.tsx`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant
