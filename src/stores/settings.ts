import {defineStore} from 'pinia'
import {ref, watch} from 'vue'
import {SETTINGS_STORAGE_KEY} from "@/constants.ts";
import { DEFAULT_BET_SPREAD, normaliseSpread } from '@/lib/betSpread'

type StoredSettings = {
  showCounter: boolean
  showMistakeSnackbar: boolean
  menuHidden: boolean
  betSpread: number[]
}

const readSettings = (): StoredSettings | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredSettings
  } catch (error) {
    console.warn('Failed to parse stored settings', error)
    return null
  }
}

const writeSettings = (settings: StoredSettings) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.warn('Failed to persist settings', error)
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const showCounter = ref(true)
  const showMistakeSnackbar = ref(true)
  const menuHidden = ref(false)
  const betSpread = ref<number[]>([...DEFAULT_BET_SPREAD])

  const hydrate = () => {
    const stored = readSettings()
    if (!stored) return
    showCounter.value = stored.showCounter
    showMistakeSnackbar.value = stored.showMistakeSnackbar ?? false
    menuHidden.value = stored.menuHidden ?? false
    if (Array.isArray(stored.betSpread) && stored.betSpread.length >= 2) {
      betSpread.value = normaliseSpread(stored.betSpread)
    }
  }

  const persist = () => {
    writeSettings({
      showCounter: showCounter.value,
      showMistakeSnackbar: showMistakeSnackbar.value,
      menuHidden: menuHidden.value,
      betSpread: betSpread.value,
    })
  }

  const setShowCounter = (value: boolean | null) => {
    showCounter.value = !!value
  }

  const setShowMistakeSnackbar = (value: boolean | null) => {
    showMistakeSnackbar.value = !!value
  }

  const setMenuHidden = (value: boolean | null) => {
    menuHidden.value = !!value
  }

  const setBetSpread = (values: number[]) => {
    const normalised = normaliseSpread(values)
    if (normalised.length >= 2) {
      betSpread.value = normalised
    }
  }

  hydrate()

  watch([showCounter, showMistakeSnackbar, menuHidden, betSpread], persist, { deep: true })

  return {
    showCounter,
    setShowCounter,
    showMistakeSnackbar,
    setShowMistakeSnackbar,
    menuHidden,
    setMenuHidden,
    betSpread,
    setBetSpread,
  }
})
