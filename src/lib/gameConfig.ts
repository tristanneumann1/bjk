import {GAME_CONFIG_STORAGE_KEY} from "@/constants.ts";

export type StoredGameConfig = Partial<{
  penetration: number
  deckCount: number
  dealerHitsSoft17: boolean
  doubleAllowedAfterSplit: boolean
  resplitAcesAllowed: boolean
  surrenderAllowed: boolean
  maxSplits: number
  blackjackPayout: number
  dealerPeekA10: boolean
}>

export const readGameConfig = (): StoredGameConfig | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(
      GAME_CONFIG_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredGameConfig
  } catch (error) {
    console.warn('Failed to parse stored game config', error)
    return null
  }
}

export const writeGameConfig = (config: StoredGameConfig) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(GAME_CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (error) {
    console.warn('Failed to persist game config', error)
  }
}
