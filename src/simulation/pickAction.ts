import type { PlayerAction } from '@/types/actions'
import type { ActionBound } from '@/simulation/types'

// determineCorrectAction returns [upper, lower]. See
// src/models/strategy/determineCorrectAction.ts.
export const pickAction = (actions: PlayerAction[], bound: ActionBound): PlayerAction => {
  if (actions.length === 0) {
    throw new Error('pickAction: no actions to choose from')
  }
  if (bound === 'upper') return actions[0]
  return actions[actions.length - 1]
}
