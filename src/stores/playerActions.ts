import { defineStore } from 'pinia'
import { reactive } from 'vue'
import {modelEvents, userEvent, userEventAction, type UserEventMap} from "@/lib/mitt.ts";
import {PLAY, PLAYER_ACTION, RESHUFFLE} from "@/lib/userEvents.ts";

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
      enabledMap[key as PlayerAction] = value
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
    modelEvents.emit(userEvent(PLAYER_ACTION), { event: PLAYER_ACTION, action } as UserEventMap)
    modelEvents.emit(userEventAction(PLAYER_ACTION, action), { event: PLAYER_ACTION, action } as UserEventMap)
    return true
  }

  const play = () => {
    modelEvents.emit(userEvent(PLAY), { event: PLAY } as UserEventMap)
  }

  const reshuffle = () => {
    modelEvents.emit(userEvent(RESHUFFLE), { event: RESHUFFLE } as UserEventMap)
  }

  return {
    enabledMap,
    isEnabled,
    setActionEnabled,
    setMany,
    reset,
    triggerAction,
    play,
    reshuffle
  }
})
