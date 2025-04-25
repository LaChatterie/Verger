# Verger

Verger is a fork of [Cherry Studio](https://github.com/CherryHQ/cherry-studio), customized with enhanced configuration options and optimized default settings.

## About This Fork

Verger maintains the core functionality of Cherry Studio while adding:

- Custom configuration system for easy customization without modifying source code
- Default configuration optimized for OpenAI and Gemini models
- English-only interface and prompts
- Disabled Sentry error reporting for improved privacy
- Streamlined build process with custom scripts

## Key Differences from Cherry Studio

- **Default Models**: Uses OpenAI GPT-4o as the default model instead of Silicon models
- **Topic Naming**: Uses a custom English prompt for generating conversation titles
- **Build System**: Includes custom build scripts that apply configurations at build time
- **Error Reporting**: Sentry error reporting is disabled by default

## Building from Source

### Prerequisites

- Node.js 20
- Git

### Build Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/verger.git
   cd verger
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build with custom configuration:
   ```bash
   node custom-build.js
   ```

4. Package the application:
   ```bash
   node custom-package.js
   ```

The packaged application will be available in the `dist` directory.

## Custom Configuration

Verger includes a custom configuration system that allows you to override default settings without modifying the source code. The configuration is defined in `custom-config.json`.

### Configuration Options

- **SYSTEM_MODELS**: Available models for each provider
- **DEFAULT_MODEL**: Default model for new conversations
- **TOPIC_NAMING_MODEL**: Model used for generating topic names
- **TRANSLATE_MODEL**: Model used for translations
- **INITIAL_PROVIDERS**: Available providers and their default state
- **TOPIC_NAMING_PROMPT**: Custom prompt for generating topic names

See [CUSTOM-CONFIG-README.md](CUSTOM-CONFIG-README.md) for detailed documentation.

## Using AutoSync

Verger uses a different application identity than Cherry Studio to prevent data conflicts. If you enable AutoSync:

- Data will be stored in a separate location from Cherry Studio
- You should use a separate WebDAV or Nutstore account/folder for synchronization
- Synchronizing to the same location as Cherry Studio may cause data conflicts

## Acknowledgments

Verger is based on [Cherry Studio](https://github.com/CherryHQ/cherry-studio), an open-source AI assistant application. All original credits and licenses apply.

## License

This project is licensed under the same terms as the original Cherry Studio project. See the [LICENSE](LICENSE) file for details.
