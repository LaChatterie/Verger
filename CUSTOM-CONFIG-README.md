# Verger Custom Configuration

This repository includes a custom configuration system for Verger (forked from Cherry Studio) that allows you to override default settings without modifying the original source code.

## How It Works

The custom configuration system reads settings directly from a JSON file (`custom-config.json`) at runtime. This approach is simpler and more reliable than using environment variables.

## Configuration Options

You can customize the following settings:

- **SYSTEM_MODELS**: Override the available models for each provider
- **DEFAULT_MODEL**: Set the default model for new conversations
- **TOPIC_NAMING_MODEL**: Set the model used for generating topic names
- **TRANSLATE_MODEL**: Set the model used for translations
- **INITIAL_PROVIDERS**: Configure which providers are available and enabled by default
- **TOPIC_NAMING_PROMPT**: Set a custom prompt for generating topic names
- **SETTINGS**: Override any application settings

## How to Use

### Local Development

1. Edit the `custom-config.json` file to customize your settings
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
4. Enter the release tag and the path to your custom configuration file
5. Click "Run workflow" to start the build process

## Example Configuration

```json
{
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
}
```

## Advantages

- **No Source Code Modifications**: The original source files remain untouched, making it easier to merge updates from upstream.
- **Flexible Configuration**: You can override specific parts of the configuration or the entire state.
- **Runtime Integration**: The changes are applied at runtime, so they're always used regardless of how the application was built.
- **Maintainable**: By extracting configuration to a separate JSON file, you can easily update your custom settings without modifying the code.
- **Simplicity**: Direct file access is simpler and more reliable than environment variables.

## Updating from Upstream

When updating from the upstream repository, you may need to update the custom configuration system if the structure of the configuration objects changes. However, since the changes are minimal and focused on the configuration initialization, they are less likely to conflict with upstream changes.

## Technical Details

The custom configuration system works by:

1. Reading the `custom-config.json` file directly at runtime
2. Using the values from this file to override default settings
3. Falling back to default values if the file doesn't exist or a specific setting isn't defined

The file is read from:

- The project root directory in development mode
- The resources directory in production mode
