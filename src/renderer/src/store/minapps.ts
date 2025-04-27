import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CUSTOM_DEFAULT_MINAPPS } from '@renderer/config/custom-config'
import { DEFAULT_MIN_APPS } from '@renderer/config/minapps'
import { MinAppType, SidebarIcon } from '@renderer/types'

export const DEFAULT_SIDEBAR_ICONS: SidebarIcon[] = [
  'assistants',
  'agents',
  'paintings',
  'translate',
  'minapp',
  'knowledge',
  'files'
]

export interface MinAppsState {
  enabled: MinAppType[]
  disabled: MinAppType[]
  pinned: MinAppType[]
}

// Function to get the combined list of minapps
// First include the custom IDs in order, then add all other non-Chinese apps
export const getCombinedMinApps = (): MinAppType[] => {
  // If no custom minapps defined, just return the defaults
  if (!CUSTOM_DEFAULT_MINAPPS) {
    return DEFAULT_MIN_APPS
  }

  const result: MinAppType[] = []

  // First add all the custom IDs in the specified order
  // CUSTOM_DEFAULT_MINAPPS is now a string[] of IDs
  const customIds = CUSTOM_DEFAULT_MINAPPS as string[]
  customIds.forEach((id) => {
    const app = DEFAULT_MIN_APPS.find((app) => app.id === id)
    if (app) {
      result.push(app)
    }
  })

  // Then add all other non-Chinese apps that aren't already included
  DEFAULT_MIN_APPS.forEach((app) => {
    // Skip if already added
    if (result.some((a) => a.id === app.id)) {
      return
    }

    // Check if the app name contains Chinese characters
    const containsChinese = /[\u4e00-\u9fff]/.test(app.name)
    if (!containsChinese) {
      result.push(app)
    }
  })

  return result
}

// Use the combined list
const DEFAULT_APPS = getCombinedMinApps()

const initialState: MinAppsState = {
  enabled: DEFAULT_APPS,
  disabled: [],
  pinned: []
}

const minAppsSlice = createSlice({
  name: 'minApps',
  initialState,
  reducers: {
    setMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.enabled = action.payload.map((app) => ({ ...app, logo: undefined }))
    },
    addMinApp: (state, action: PayloadAction<MinAppType>) => {
      state.enabled.push(action.payload)
    },
    setDisabledMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.disabled = action.payload.map((app) => ({ ...app, logo: undefined }))
    },
    setPinnedMinApps: (state, action: PayloadAction<MinAppType[]>) => {
      state.pinned = action.payload.map((app) => ({ ...app, logo: undefined }))
    }
  }
})

export const { setMinApps, addMinApp, setDisabledMinApps, setPinnedMinApps } = minAppsSlice.actions

export default minAppsSlice.reducer
