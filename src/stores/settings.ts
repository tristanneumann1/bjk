import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { SETTINGS_STORAGE_KEY } from '@/constants.ts'
import { DEFAULT_BET_SPREAD, normaliseSpread } from '@/lib/betSpread'
import { getFbDoc, upsertFbDoc } from '@/lib/firestore'
import { PLAYER_COLLECTION, playerDocId, type PlayerDoc } from '@/docs/player'

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
  // ── state ─────────────────────────────────────────────────────────────
  const showCounter = ref(true)
  const showMistakeSnackbar = ref(true)
  const menuHidden = ref(false)
  const betSpread = ref<number[]>([...DEFAULT_BET_SPREAD])

  const auth = getAuth()
  const currentUserId = ref<string | null>(auth.currentUser?.uid ?? null)
  // Set during remote reads so the betSpread watcher doesn't echo the
  // freshly-loaded value back to Firestore.
  const applyingRemoteSpread = ref(false)

  // ── setters ───────────────────────────────────────────────────────────
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

  // ── local persistence (localStorage) ──────────────────────────────────
  const hydrateFromLocal = () => {
    const stored = readSettings()
    if (!stored) return
    showCounter.value = stored.showCounter
    showMistakeSnackbar.value = stored.showMistakeSnackbar ?? false
    menuHidden.value = stored.menuHidden ?? false
    if (Array.isArray(stored.betSpread) && stored.betSpread.length >= 2) {
      betSpread.value = normaliseSpread(stored.betSpread)
    }
  }

  const persistToLocal = () => {
    writeSettings({
      showCounter: showCounter.value,
      showMistakeSnackbar: showMistakeSnackbar.value,
      menuHidden: menuHidden.value,
      betSpread: betSpread.value,
    })
  }

  // ── remote persistence (Firestore — betSpread only) ───────────────────
  // Remote is the source of truth for logged-in users. On login we always
  // overwrite the local betSpread with the remote value if it exists.
  // If the remote has no betSpread yet (new user), we push the current
  // local value up so it becomes their starting remote state.
  const hydrateSpreadFromRemote = async (uid: string) => {
    applyingRemoteSpread.value = true
    try {
      const doc = await getFbDoc<PlayerDoc>(PLAYER_COLLECTION, [playerDocId(uid)])
      const remote = doc?.betSpread
      if (Array.isArray(remote) && remote.length >= 2) {
        betSpread.value = normaliseSpread(remote)
      } else {
        await persistSpreadToRemote(uid, [...betSpread.value])
      }
    } catch (error) {
      console.error('Failed to hydrate bet spread', error)
    } finally {
      applyingRemoteSpread.value = false
    }
  }

  const persistSpreadToRemote = async (uid: string, values: number[]) => {
    try {
      await upsertFbDoc<PlayerDoc>(PLAYER_COLLECTION, [playerDocId(uid)], { betSpread: values })
    } catch (error) {
      console.error('Failed to persist bet spread', error)
    }
  }

  // ── bootstrap ─────────────────────────────────────────────────────────
  // 1. Load from localStorage so UI has values immediately, even before auth resolves.
  hydrateFromLocal()

  // 2. Watch local state → mirror to localStorage on every change.
  watch(
    [showCounter, showMistakeSnackbar, menuHidden, betSpread],
    persistToLocal,
    { deep: true },
  )

  // 3. Watch betSpread → mirror to Firestore whenever the user is logged in
  //    (skipping echo-back during remote hydration).
  watch(
    betSpread,
    next => {
      const uid = currentUserId.value
      if (!uid || applyingRemoteSpread.value) return
      void persistSpreadToRemote(uid, [...next])
    },
    { deep: true },
  )

  // 4. React to auth changes. On sign-in, remote becomes the source of truth.
  onAuthStateChanged(auth, user => {
    currentUserId.value = user?.uid ?? null
    if (currentUserId.value) {
      void hydrateSpreadFromRemote(currentUserId.value)
    }
  })

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
