import { RootState, useAppDispatch, useAppSelector } from '@renderer/store'
import { getCombinedMinApps, setDisabledMinApps, setMinApps, setPinnedMinApps } from '@renderer/store/minapps'
import { MinAppType } from '@renderer/types'

export const useMinapps = () => {
  const { enabled, disabled, pinned } = useAppSelector((state: RootState) => state.minapps)
  const dispatch = useAppDispatch()
  const allApps = getCombinedMinApps()

  return {
    minapps: enabled.map((app) => allApps.find((item) => item.id === app.id) || app),
    disabled: disabled.map((app) => allApps.find((item) => item.id === app.id) || app),
    pinned: pinned.map((app) => allApps.find((item) => item.id === app.id) || app),
    updateMinapps: (minapps: MinAppType[]) => {
      dispatch(setMinApps(minapps))
    },
    updateDisabledMinapps: (minapps: MinAppType[]) => {
      dispatch(setDisabledMinApps(minapps))
    },
    updatePinnedMinapps: (minapps: MinAppType[]) => {
      dispatch(setPinnedMinApps(minapps))
    }
  }
}
