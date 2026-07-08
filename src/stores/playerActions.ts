import { defineStore } from 'pinia'
import {onScopeDispose, reactive} from 'vue'
import {modelEvents, userEvent, userEventAction, type UserEventMap} from "@/lib/mitt.ts";
import {PLAY, PLAYER_ACTION, RESHUFFLE} from "@/lib/userEvents.ts";
import type { PlayerAction } from '@/types/actions.ts'
import * as userEvents from "@/lib/userEvents.ts";
import {isAction} from "@/models/hand.ts";
import {Session} from "@/models/session.ts";
import type {Card} from "@/types/card.ts";
import {
  determineCorrectActionDetailed,
  isActionIncorrect
} from "@/models/strategy/determineCorrectAction.ts";
import {isDeviationMistake} from "@/models/strategy/isDeviationMistake.ts";
import {getAuth} from "firebase/auth";
import {useGameStore} from "@/stores/game.ts";
import {incrementPlayerDoc, upsertPlayerDoc} from "@/lib/firestore.ts";
import {GAMES_SUBCOLLECTION} from "@/docs/game.ts";
import {buildRoundDocId} from "@/docs/round.ts";
import {type ActionDoc, ACTIONS_SUBCOLLECTION, buildActionDocId} from "@/docs/action.ts";
import {
  ANALYTICS_SUBCOLLECTION,
  buildMistakeDocId,
  buildSummaryIncrement,
  MISTAKE_SUMMARY_DOC_ID,
  MISTAKES_SUBCOLLECTION
} from "@/docs/analytics.ts";
import {useStrategyStore} from "@/stores/strategy.ts";
import {categorizeMistake} from "@/models/analytics/categorizeMistake.ts";
import type {StoredMistake} from "@/types/analytics.ts";

const PLAYER_ACTIONS: PlayerAction[] = ['Hit', 'Stand', 'Split', 'Double', 'Surrender', 'Insurance', 'DeclineInsurance']

const createDefaultState = (): {[action in PlayerAction]: boolean} => ({
  Hit: true,
  Stand: true,
  Split: false,
  Double: false,
  Surrender: false,
  Insurance: false,
  DeclineInsurance: false,
} satisfies Record<PlayerAction, boolean>)

export const usePlayerActionsStore = defineStore('playerActions', () => {
  const enabledMap: {[action in PlayerAction]: boolean} = reactive(createDefaultState())

  const gameStore = useGameStore()
  const strategyStore = useStrategyStore()

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
    const table = Session.getInstance().table
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return

    const gameId = gameStore.currentGameId
    const roundId = gameStore.roundId
    if (!gameId) throw 'no game found when user acted'
    if (!roundId) throw 'no round found when user acted, gameID' + gameId

    const cards: Card[] | undefined = table.activeChair?.activeHand?.cards.map(card => {
      return { rank: card.rank, suit: card.suit }
    })
    if (!cards) throw 'no cards found'
    const upCardSuit = table.upCard.suit
    const upCardRank = table.upCard.rank
    if (!upCardSuit || !upCardRank) throw 'no upCard found'

    const startingTrueCountLower = table.trueCountLower
    const startingTrueCountUpper = table.trueCountUpper

    const strategy = strategyStore.selectedStrategy
    const detailed = determineCorrectActionDetailed(Session.getInstance(), strategy)
    const correctActions = detailed.actions
    const actionIsCorrect = !isActionIncorrect(Session.getInstance(), strategy, action)

    const actionDoc: ActionDoc = {
      cards,
      upCard: { rank: upCardRank, suit: upCardSuit },
      startingTrueCountLower,
      startingTrueCountUpper,
      chosenAction: action,
      strategyId: strategyStore.selectedStrategyId,
      expectedAction: correctActions,
      actionIsCorrect,
      roundId: buildRoundDocId(roundId)
    }

    if (!actionIsCorrect) {
      void persistMistake(userId, roundId, action, correctActions, detailed, {
        cards,
        upCard: { rank: upCardRank, suit: upCardSuit },
        startingTrueCountLower,
        startingTrueCountUpper,
      })
    }

    return upsertPlayerDoc<ActionDoc>(userId, [ GAMES_SUBCOLLECTION, gameId, ACTIONS_SUBCOLLECTION, buildActionDocId()], actionDoc)
  }

  /**
   * Preprocess an incorrect decision at write time (the matched rule + full rule
   * set are known here) and persist it two ways: a queryable individual record
   * (for lazy drill-down) and atomic increments on the cumulative summary doc
   * (the single-read analytics view). Fire-and-forget — never blocks play.
   */
  const persistMistake = (
    userId: string,
    roundId: string | number,
    action: PlayerAction,
    correctActions: PlayerAction[],
    detailed: ReturnType<typeof determineCorrectActionDetailed>,
    raw: { cards: Card[]; upCard: Card; startingTrueCountLower: number; startingTrueCountUpper: number },
  ) => {
    const activeHand = Session.getInstance().table.activeChair?.activeHand
    if (!activeHand) return
    const handCards = activeHand.cards
    const isPair = handCards.length === 2 && handCards[0].value === handCards[1].value
    const dealerUpCard = Session.getInstance().table.upCard.value
    const isDeviation = isDeviationMistake({
      matchedUpper: detailed.matchedUpper,
      matchedLower: detailed.matchedLower,
      ruleSet: detailed.ruleSet,
      chosenAction: action,
    })

    const categorization = categorizeMistake({
      handValue: activeHand.softValue,
      dealerUpCard,
      isSoft: activeHand.isSoft,
      isPair,
      pairValue: isPair ? handCards[0].value : undefined,
      chosenAction: action,
      expectedAction: correctActions,
      isDeviation,
    })

    const mistakeId = buildMistakeDocId()
    const storedMistake: StoredMistake = {
      id: mistakeId,
      roundId: buildRoundDocId(roundId),
      strategyId: strategyStore.selectedStrategyId,
      cards: raw.cards,
      upCard: raw.upCard,
      startingTrueCountLower: raw.startingTrueCountLower,
      startingTrueCountUpper: raw.startingTrueCountUpper,
      chosenAction: action,
      expectedAction: correctActions,
      cellKey: `${categorization.handValue}_${categorization.dealerUpCard}`,
      ...categorization,
    }

    return Promise.all([
      upsertPlayerDoc<StoredMistake>(userId, [MISTAKES_SUBCOLLECTION, mistakeId], storedMistake),
      incrementPlayerDoc(userId, [ANALYTICS_SUBCOLLECTION, MISTAKE_SUMMARY_DOC_ID], buildSummaryIncrement(storedMistake)),
    ]).catch(error => console.error('Failed to persist mistake', error))
  }

  const onAct = async (event: UserEventMap) => {
    if(!event.action || !isAction(event.action)) {
      console.error('failing to act on invalid action', event)
      return
    }
    const persistActionPromise = persistAction(event.action)
    Session.getInstance().table.act(event.action);
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
