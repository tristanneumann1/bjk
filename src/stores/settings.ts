import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const SETTINGS_STORAGE_KEY = 'bjk_settings'

type StoredSettings = {
  showCounter: boolean
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

  const hydrate = () => {
    const stored = readSettings()
    if (!stored) return
    showCounter.value = stored.showCounter
  }

  const persist = () => {
    writeSettings({
      showCounter: showCounter.value,
    })
  }

  const setShowCounter = (value: boolean | null) => {
    showCounter.value = !!value
  }

  hydrate()

  watch(showCounter, persist, { deep: false })

  return {
    showCounter,
    setShowCounter,
  }
})
