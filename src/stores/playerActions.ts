import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

type PLAYER_ACTION_TYPE = 'Hit' | 'Stand' | 'Split' | 'Double' | 'Surrender' | 'Insurance'
export const PLAYER_ACTIONS: PLAYER_ACTION_TYPE[] = ['Hit', 'Stand', 'Split', 'Double', 'Surrender', 'Insurance'] as const
export type PlayerAction = (typeof PLAYER_ACTIONS)[number]

const createDefaultState = (): {[action in PLAYER_ACTION_TYPE]: boolean} => ({
  Hit: true,
  Stand: true,
  Split: false,
  Double: false,
  Surrender: false,
  Insurance: false,
} satisfies Record<PlayerAction, boolean>)

export const usePlayerActionsStore = defineStore('playerActions', () => {
  const enabledMap: {[action in PLAYER_ACTION_TYPE]: boolean} = reactive(createDefaultState())

  const isEnabled = (action: PlayerAction) => enabledMap[action]

  const setActionEnabled = (action: PlayerAction, enabled: boolean) => {
    enabledMap[action] = enabled
  }

  const setMany = (updates: Partial<Record<PlayerAction, boolean>>) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        enabledMap[key as PlayerAction] = value
      }
    })
  }

  const reset = () => {
    const defaults = createDefaultState()
    PLAYER_ACTIONS.forEach(action => {
      enabledMap[action] = defaults[action]
    })
  }

  const triggerAction = (action: PlayerAction) => {
    if (!isEnabled(action)) return false
    console.log(`Action triggered: ${action}`)
    return true
  }

  return {
    enabledMap,
    isEnabled,
    setActionEnabled,
    setMany,
    reset,
    triggerAction,
  }
})
