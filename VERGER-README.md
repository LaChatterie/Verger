# Verger

Verger is a fork of [Cherry Studio](https://github.com/CherryHQ/cherry-studio), customized with enhanced configuration options and optimized default settings.

## About This Fork

Verger maintains the core functionality of Cherry Studio while adding:

- Default configuration only with best uncensored models that do no route via China, including European options.
- English content

## Custom Configuration System

Verger includes a custom configuration system that allows you to override default settings without modifying the original source code. The configuration is defined in `src/renderer/src/config/custom-config.ts`.

### How It Works

The custom configuration system uses a TypeScript file that defines constants used throughout the application. This approach is simpler and more reliable than using runtime configuration files.

### Configuration Options

You can customize the following settings:

- **CUSTOM_SYSTEM_MODELS**: Override the available models for each provider
- **CUSTOM_DEFAULT_MODEL**: Set the default model for new conversations
- **CUSTOM_TOPIC_NAMING_MODEL**: Set the model used for generating topic names
- **CUSTOM_TRANSLATE_MODEL**: Set the model used for translations
- **CUSTOM_INITIAL_PROVIDERS**: Configure which providers are available and enabled by default. These providers will be listed first, followed by any other providers not explicitly defined, sorted alphabetically by name
- **CUSTOM_SETTINGS**: Override any application settings
- **CUSTOM_DEFAULT_MINAPPS**: Set a list of MiniApp IDs to be displayed first, followed by all other non-Chinese MiniApps

### How to Use

#### Local Development

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

#### GitHub Workflows

The repository includes a GitHub workflow that uses your custom configuration:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Release" workflow
3. Click "Run workflow"
4. Enter the release tag
5. Click "Run workflow" to start the build process

### Updating from Upstream

When updating from the upstream repository, you may need to update the custom configuration system if the structure of the configuration objects changes. However, since the changes are minimal and focused on the configuration initialization, they are less likely to conflict with upstream changes.

### Technical Details

The custom configuration system works by:

1. Defining constants in the `custom-config.ts` file
2. Importing these constants in the relevant files
3. Using these constants to override default settings

The configuration is applied in the following files:

- `src/renderer/src/config/models.ts`: Uses the `CUSTOM_SYSTEM_MODELS` constant
- `src/renderer/src/store/llm.ts`: Uses the `CUSTOM_DEFAULT_MODEL`, `CUSTOM_TOPIC_NAMING_MODEL`, `CUSTOM_TRANSLATE_MODEL`, and `CUSTOM_INITIAL_PROVIDERS` constants
- `src/renderer/src/store/settings.ts`: Uses the `CUSTOM_SETTINGS` constants
- `src/renderer/src/store/minapps.ts`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant
- `src/renderer/src/components/Icons/MinAppIcon.tsx`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant
- `src/renderer/src/pages/settings/MiniappSettings/MiniAppSettings.tsx`: Uses the `CUSTOM_DEFAULT_MINAPPS` constant

The default agents are defined in the the modified file resouces/data/agents.json.

## Using AutoSync

Verger uses a different application identity than Cherry Studio to prevent data conflicts. If you enable AutoSync:

- Data will be stored in a separate location from Cherry Studio
- You should use a separate WebDAV or Nutstore account/folder for synchronization
- Synchronizing to the same location as Cherry Studio may cause data conflicts

## Acknowledgments

Verger is based on [Cherry Studio](https://github.com/CherryHQ/cherry-studio), an open-source AI assistant application. All original credits and licenses apply.

## License

This project is licensed under the same terms as the original Cherry Studio project. See the [LICENSE](LICENSE) file for details.
