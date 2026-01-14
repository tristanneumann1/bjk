import { defineStore } from 'pinia'
import {onScopeDispose, reactive} from 'vue'
import {modelEvents, userEvent, userEventAction, type UserEventMap} from "@/lib/mitt.ts";
import {PLAY, PLAYER_ACTION, RESHUFFLE} from "@/lib/userEvents.ts";
import type { PlayerAction } from '@/types/actions.ts'
import * as userEvents from "@/lib/userEvents.ts";
import {isAction} from "@/models/hand.ts";
import {Session} from "@/models/session.ts";
import type {Card} from "@/types/card.ts";
import {determineCorrectAction} from "@/models/strategy/determineCorrectAction.ts";
import {basicStrategyH17} from "@/models/strategy/basicStrategyH17.ts";
import {getAuth} from "firebase/auth";
import {useGameStore} from "@/stores/game.ts";
import {upsertPlayerDoc} from "@/lib/firestore.ts";
import {GAMES_SUBCOLLECTION} from "@/docs/game.ts";
import {buildRoundDocId, ROUNDS_SUBCOLLECTION} from "@/docs/round.ts";
import {type ActionDoc, ACTIONS_SUBCOLLECTION, buildActionDocId} from "@/docs/action.ts";

export const PLAYER_ACTIONS: PlayerAction[] = ['Hit', 'Stand', 'Split', 'Double', 'Surrender', 'Insurance'] as const

const createDefaultState = (): {[action in PlayerAction]: boolean} => ({
  Hit: true,
  Stand: true,
  Split: false,
  Double: false,
  Surrender: false,
  Insurance: false,
} satisfies Record<PlayerAction, boolean>)

export const usePlayerActionsStore = defineStore('playerActions', () => {
  const enabledMap: {[action in PlayerAction]: boolean} = reactive(createDefaultState())

  const gameStore = useGameStore()
  const table = Session.getInstance().table

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

  const persistAction = (action: PlayerAction) => {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return

    const gameId = gameStore.currentGameId
    const roundId = gameStore.roundId
    if (!gameId) throw 'no game found when user acted'
    if (!roundId) throw 'no round found when user acted, gameID' + gameId

    const cards: Card[] | undefined = table.activeChair?.activeHand?.cards.map(card => {
      return { value: card.value }
    })
    if (!cards) throw 'no cards found'
    const upCardValue = table.upCard.value
    if (!upCardValue) throw 'no upCard found'

    const startingTrueCountLower = table.trueCountLower
    const startingTrueCountUpper = table.trueCountUpper

    const correctActions = determineCorrectAction(Session.getInstance(), basicStrategyH17)

    const actionDoc: ActionDoc = {
      cards,
      upCard: { value: upCardValue },
      startingTrueCountLower,
      startingTrueCountUpper,
      chosenAction: action,
      strategyId: basicStrategyH17.id,
      expectedAction: correctActions,
      actionIsCorrect: correctActions.includes(action),
      roundId: buildRoundDocId(roundId)
    }

    return upsertPlayerDoc<ActionDoc>(userId, [ GAMES_SUBCOLLECTION, gameId, ACTIONS_SUBCOLLECTION, buildActionDocId()], actionDoc)
  }

  const onAct = async (event: UserEventMap) => {
    if(!event.action || !isAction(event.action)) {
      console.error('failing to act on invalid action', event)
      return
    }
    const persistActionPromise = persistAction(event.action)
    table.act(event.action);
    await persistActionPromise
  }

  modelEvents.on(userEvent(userEvents.PLAYER_ACTION), onAct)

  onScopeDispose(() => {
    modelEvents.off(userEvent(userEvents.PLAYER_ACTION), onAct)
  })

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
