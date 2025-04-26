// custom-config.ts
// This file contains custom configuration for Verger
// Edit this file to customize your settings

// Import app logos
import AbacusLogo from '@renderer/assets/images/apps/abacus.webp?url'
import AIStudioLogo from '@renderer/assets/images/apps/aistudio.svg?url'
import GeminiAppLogo from '@renderer/assets/images/apps/gemini.webp?url'
import LeChatLogo from '@renderer/assets/images/apps/lechat.png?url'
import NotebookLMAppLogo from '@renderer/assets/images/apps/notebooklm.svg?url'
import YouLogo from '@renderer/assets/images/apps/you.jpg?url'
import ClaudeAppLogo from '@renderer/assets/images/models/claude.png?url'
import OpenAiProviderLogo from '@renderer/assets/images/providers/openai.png?url'
import { MinAppType, Model, Provider } from '@renderer/types'

// Custom system models
export const CUSTOM_SYSTEM_MODELS: Record<string, Model[]> = {
  openai: [
    {
      id: 'gpt-4o-latest',
      provider: 'openai',
      name: 'ChatGPT 4o',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-4.1-mini',
      provider: 'openai',
      name: ' GPT 4.1 mini',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-4.1',
      provider: 'openai',
      name: ' GPT-4.1',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-4o',
      provider: 'openai',
      name: ' GPT 4o',
      group: 'GPT 4o'
    },
    {
      id: 'o4-mini',
      provider: 'openai',
      name: ' o4 mini',
      description: 'Fast thinking model',
      group: 'o4'
    },
    {
      id: 'o3',
      provider: 'openai',
      name: ' o3',
      description: 'latest thinking model',
      group: 'o3'
    }
  ],
  'azure-openai': [
    {
      id: 'gpt-4.1',
      provider: 'azure-openai',
      name: ' GPT-4.1',
      group: 'GPT 4o'
    },
    {
      id: 'gpt-4.1-mini',
      provider: 'azure-openai',
      name: ' GPT-4.1-mini',
      group: 'GPT 4o'
    }
  ],
  gemini: [
    {
      id: 'gemini-2.5-flash-preview',
      provider: 'gemini',
      name: 'Gemini 2.5 Flash',
      group: 'Gemini 2.5'
    },
    {
      id: 'gemini-2.5-pro-preview',
      name: 'Gemini 2.5 Pro',
      provider: 'gemini',
      group: 'Gemini 2.5'
    }
  ],
  anthropic: [
    {
      id: 'claude-3-7-sonnet',
      provider: 'anthropic',
      name: 'Claude 3.7 Sonnet',
      group: 'Claude 3.7'
    }
  ],
  mistral: [
    {
      id: 'pixtral-large-latest',
      provider: 'mistral',
      name: 'Pixtral Large',
      group: 'Pixtral'
    },
    {
      id: 'ministral-8b-latest',
      provider: 'mistral',
      name: 'Mistral 8B [Free]',
      group: 'Mistral Mini'
    },
    {
      id: 'codestral-latest',
      provider: 'mistral',
      name: 'Mistral Codestral',
      group: 'Mistral Code'
    },
    {
      id: 'mistral-large-latest',
      provider: 'mistral',
      name: 'Mistral Large',
      group: 'Mistral Chat'
    }
  ],
  openrouter: [
    {
      id: 'google/gemini-2.5-flash-preview',
      provider: 'openrouter',
      name: 'Google: Gemini 2.5 Flash Preview',
      group: 'google'
    },
    {
      id: 'google/gemini-2.5-pro-preview',
      provider: 'openrouter',
      name: 'Google: Gemini 2.5 Pro Preview',
      group: 'google'
    },
    {
      id: 'meta/llama-4-maverick:free',
      provider: 'openrouter',
      name: 'Meta: Llama 4 Maverick',
      group: 'meta'
    },
    {
      id: 'meta/llama-4-scout:free',
      provider: 'openrouter',
      name: 'Meta: Llama 4 Scout',
      group: 'meta'
    },
    {
      id: 'microsoft/mai-ds-r1:free',
      provider: 'openrouter',
      name: 'DeepSeek R1 (uncensored, free)',
      group: 'Deepseek'
    },
    {
      id: 'mistralai/mistral-7b-instruct:free',
      provider: 'openrouter',
      name: 'Mistral: Mistral 7B Instruct',
      group: 'mistralai'
    }
  ],
  groq: [
    {
      id: 'mistral-saba-24b',
      provider: 'groq',
      name: 'Mistral Saba 24B',
      group: 'Mistral'
    }
  ],
  perplexity: [
    {
      id: 'sonar-reasoning-pro',
      provider: 'perplexity',
      name: 'sonar-reasoning-pro',
      group: 'Sonar'
    },
    {
      id: 'sonar-reasoning',
      provider: 'perplexity',
      name: 'sonar-reasoning',
      group: 'Sonar'
    },
    {
      id: 'sonar-pro',
      provider: 'perplexity',
      name: 'sonar-pro',
      group: 'Sonar'
    },
    {
      id: 'sonar',
      provider: 'perplexity',
      name: 'sonar',
      group: 'Sonar'
    }
  ]
}

// Custom default model
export const CUSTOM_DEFAULT_MODEL: Model = {
  id: 'google/gemini-2.5-flash-preview',
  provider: 'openrouter',
  name: 'Google: Gemini 2.5 Flash Preview',
  group: 'Gemini 2.5'
}

// Custom topic naming model
export const CUSTOM_TOPIC_NAMING_MODEL: Model = {
  id: 'google/gemini-2.5-flash-preview',
  provider: 'openrouter',
  name: 'Google: Gemini 2.5 Flash Preview',
  group: 'Gemini 2.5'
}

// Custom translate model
export const CUSTOM_TRANSLATE_MODEL: Model = {
  id: 'gpt-3.5-turbo',
  name: 'GPT-3.5 Turbo',
  provider: 'openai',
  group: 'GPT 3.5'
}

// Custom initial providers
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
  },
  {
    id: 'mistral',
    name: 'Mistral',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.mistral.ai',
    models: CUSTOM_SYSTEM_MODELS.mistral,
    isSystem: true,
    enabled: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.openai.com',
    models: CUSTOM_SYSTEM_MODELS.openai,
    isSystem: true,
    enabled: true
  },
  {
    id: 'gemini',
    name: 'Gemini',
    type: 'gemini',
    apiKey: '',
    apiHost: 'https://generativelanguage.googleapis.com',
    models: CUSTOM_SYSTEM_MODELS.gemini,
    isSystem: true,
    enabled: true
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.perplexity.ai/',
    models: CUSTOM_SYSTEM_MODELS.perplexity,
    isSystem: true,
    enabled: true
  },
  {
    id: 'groq',
    name: 'Groq',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.groq.com/openai',
    models: CUSTOM_SYSTEM_MODELS.groq,
    isSystem: true,
    enabled: false
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    type: 'openai',
    apiKey: '',
    apiHost: '',
    apiVersion: '',
    models: CUSTOM_SYSTEM_MODELS['azure-openai'],
    isSystem: true,
    enabled: false
  }
]

// Custom topic naming prompt
export const CUSTOM_TOPIC_NAMING_PROMPT = 'Generate an English title with 10 characters or less'

// Custom settings
export const CUSTOM_SETTINGS = undefined // Set to an object to override default settings

// Custom default MiniApps
// Set to an array of MinAppType to override the default MiniApp list
// Leave as undefined to use the system defaults
// Example:
export const CUSTOM_DEFAULT_MINAPPS: MinAppType[] = [
  {
    id: 'openai',
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    logo: OpenAiProviderLogo,
    bodered: true
  },
  {
    id: 'anthropic',
    name: 'Claude',
    url: 'https://claude.ai/',
    logo: ClaudeAppLogo
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com/',
    logo: GeminiAppLogo
  },
  {
    id: 'aistudio',
    name: 'AI Studio',
    logo: AIStudioLogo,
    url: 'https://aistudio.google.com/'
  },
  {
    id: 'lechat',
    name: 'LeChat',
    logo: LeChatLogo,
    url: 'https://chat.mistral.ai/chat',
    bodered: true
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    logo: NotebookLMAppLogo,
    url: 'https://notebooklm.google.com/'
  },
  {
    id: 'abacus',
    name: 'Abacus',
    logo: AbacusLogo,
    url: 'https://apps.abacus.ai/chatllm',
    bodered: true
  },
  {
    id: 'you',
    name: 'You',
    logo: YouLogo,
    url: 'https://you.com/'
  }
]
