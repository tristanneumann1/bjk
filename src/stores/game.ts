import { defineStore } from 'pinia'
import { computed, onScopeDispose, ref, watch } from 'vue'
import { modelEvents, modelPropertyEvent, userEvent, type UserEventMap } from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'
import { getAuth } from 'firebase/auth'
import { Session } from '@/models/session.ts'
import { buildGameDocId, type GameDoc, GAMES_SUBCOLLECTION, serializeRulesDoc } from '@/docs/game.ts'
import { upsertPlayerDoc } from '@/lib/firestore.ts'
import { buildRoundDocId, type RoundDoc, ROUNDS_SUBCOLLECTION } from '@/docs/round.ts'
import { readGameConfig, writeGameConfig } from '@/lib/gameConfig.ts'
import {Rules} from "@/models/rules.ts";
import { STRATEGIES } from '@/models/strategy/strategies'

const clampPenetration = (value: number, maxPenetration: number): number => {
  const rounded = Math.round(value)
  return Math.min(maxPenetration, Math.max(1, rounded))
}

const clampDeckCount = (value: number): number => {
  const rounded = Math.round(value)
  return Math.min(8, Math.max(1, rounded))
}

const clampMaxSplits = (value: number): number => {
  const rounded = Math.round(value)
  return Math.min(3, Math.max(0, rounded))
}

const normalizeBlackjackPayout = (value: number): number => {
  if (value === 1.2) return 1.2
  return 1.5
}

export const useGameStore = defineStore('game', () => {
  const currentGameId = ref<string | null>(null)
  const roundId = ref<number>(0)
  const selectedStrategyId = ref(STRATEGIES[0]?.id ?? '')

  const sessionInitial = Session.getInstance()

  const storedConfig = readGameConfig()

  const pendingDeckCount = ref(clampDeckCount(storedConfig?.deckCount ?? sessionInitial.rules.deckCount))
  const maxPenetration = computed(() => Math.max(52, pendingDeckCount.value * 52))
  const pendingPenetration = ref(
    clampPenetration(storedConfig?.penetration ?? sessionInitial.rules.penetration, maxPenetration.value),
  )
  const dealerHitsSoft17 = ref(storedConfig?.dealerHitsSoft17 ?? sessionInitial.rules.dealerHitsSoft17)
  const doubleAllowedAfterSplit = ref(
    storedConfig?.doubleAllowedAfterSplit ?? sessionInitial.rules.doubleAllowedAfterSplit,
  )
  const resplitAcesAllowed = ref(storedConfig?.resplitAcesAllowed ?? sessionInitial.rules.resplitAcesAllowed)
  const surrenderAllowed = ref(storedConfig?.surrenderAllowed ?? sessionInitial.rules.surrenderAllowed)
  const pendingMaxSplits = ref(clampMaxSplits(storedConfig?.maxSplits ?? sessionInitial.rules.maxSplits))
  const blackjackPayout = ref(normalizeBlackjackPayout(storedConfig?.blackjackPayout ?? sessionInitial.rules.blackjackPayout))
  const dealerPeekA10 = ref(storedConfig?.dealerPeekA10 ?? sessionInitial.rules.dealerPeekA10)

  const setPenetration = (value: number) => {
    pendingPenetration.value = clampPenetration(value, maxPenetration.value)
  }

  const setDeckCount = (value: number) => {
    pendingDeckCount.value = clampDeckCount(value)
  }

  const setMaxSplits = (value: number) => {
    pendingMaxSplits.value = clampMaxSplits(value)
  }

  const setBlackjackPayout = (value: number) => {
    blackjackPayout.value = normalizeBlackjackPayout(value)
  }

  const setDealerHitsSoft17 = (value: boolean | null) => {
    dealerHitsSoft17.value = Boolean(value)
  }

  const setDoubleAllowedAfterSplit = (value: boolean | null) => {
    doubleAllowedAfterSplit.value = Boolean(value)
  }

  const setResplitAcesAllowed = (value: boolean | null) => {
    resplitAcesAllowed.value = Boolean(value)
  }

  const setSurrenderAllowed = (value: boolean | null) => {
    surrenderAllowed.value = Boolean(value)
  }

  const setDealerPeekA10 = (value: boolean | null) => {
    dealerPeekA10.value = Boolean(value)
  }

  const persistGameConfig = () => {
    writeGameConfig({
      penetration: pendingPenetration.value,
      deckCount: pendingDeckCount.value,
      dealerHitsSoft17: dealerHitsSoft17.value,
      doubleAllowedAfterSplit: doubleAllowedAfterSplit.value,
      resplitAcesAllowed: resplitAcesAllowed.value,
      surrenderAllowed: surrenderAllowed.value,
      maxSplits: pendingMaxSplits.value,
      blackjackPayout: blackjackPayout.value,
      dealerPeekA10: dealerPeekA10.value,
    })
  }

  const applyPendingConfig = () => {
    const nextDeckCount = pendingDeckCount.value
    const nextPenetration = clampPenetration(pendingPenetration.value, maxPenetration.value)

    const newRules = new Rules()
    newRules.deckCount = nextDeckCount
    newRules.dealerHitsSoft17 = dealerHitsSoft17.value
    newRules.doubleAllowedAfterSplit = doubleAllowedAfterSplit.value
    newRules.resplitAcesAllowed = resplitAcesAllowed.value
    newRules.surrenderAllowed = surrenderAllowed.value
    newRules.maxSplits = pendingMaxSplits.value
    newRules.blackjackPayout = blackjackPayout.value
    newRules.dealerPeekA10 = dealerPeekA10.value
    newRules.penetration = nextPenetration

    Session.changeRules(newRules)
  }

  async function persistGameAndRound() {
    let isNewGame = false
    if (!currentGameId.value) {
      const gameId = buildGameDocId()
      isNewGame = true
      currentGameId.value = gameId
    }

    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return

    const rules = Session.getInstance().rules
    const rulesDoc = serializeRulesDoc(rules)

    const startingTrueCountLower = Session.getInstance().table.trueCountLower
    const startingTrueCountUpper = Session.getInstance().table.trueCountUpper

    const betAmounts = Session.getInstance().table.playerChairArray.map(chair => chair.bet)

    if (isNewGame) {
      await upsertPlayerDoc<GameDoc>(userId, [GAMES_SUBCOLLECTION, currentGameId.value], rulesDoc)
    }

    await upsertPlayerDoc<RoundDoc>(
      userId,
      [GAMES_SUBCOLLECTION, currentGameId.value, ROUNDS_SUBCOLLECTION, buildRoundDocId(`${roundId.value}`)],
      {
        startingTrueCountLower,
        startingTrueCountUpper,
        betAmounts,
      },
    )
  }

  const onPlay = async () => {
    roundId.value++

    if (!currentGameId.value) {
      applyPendingConfig()
    }

    const persistGamePromise = persistGameAndRound()
    Session.getInstance().table.startRound()
    try {
      await persistGamePromise
    } catch (error) {
      console.error('Failed to persist game', error)
    }
  }

  const onReshuffle = () => {
    applyPendingConfig()
    roundId.value = 0
    currentGameId.value = null
  }

  const setSelectedStrategy = (strategyId: string) => {
    if (STRATEGIES.some(strategy => strategy.id === strategyId)) {
      selectedStrategyId.value = strategyId
    }
  }

  const persistGameBalance = async (finalBalance: number | null) => {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId || !currentGameId.value) return

    await upsertPlayerDoc<GameDoc>(
      userId,
      [GAMES_SUBCOLLECTION, currentGameId.value],
      { finalBalance },
    )
  }

  const persistGameEndState = async (finalRunningCount: number | null) => {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId || !currentGameId.value) return

    await upsertPlayerDoc<GameDoc>(
      userId,
      [GAMES_SUBCOLLECTION, currentGameId.value],
      { finalRunningCount },
    )
  }

  const chairTurnEvent = modelPropertyEvent('table', 'chairTurnIndex')
  const checkGameEndEvent = () => {
    const table = Session.getInstance().table
    if (!table.gameComplete) return
    modelEvents.emit(userEvent(userEvents.GAME_END), { event: userEvents.GAME_END } as UserEventMap)
  }

  modelEvents.on(chairTurnEvent, checkGameEndEvent)

  const onGameEnd = async () => {
    const table = Session.getInstance().table
    const finalCount = table.trueCountLower
    await persistGameEndState(finalCount)
  }

  modelEvents.on(userEvent(userEvents.PLAY), onPlay)
  modelEvents.on(userEvent(userEvents.RESHUFFLE), onReshuffle)
  modelEvents.on(userEvent(userEvents.GAME_END), onGameEnd)

  onScopeDispose(() => {
    modelEvents.off(chairTurnEvent, checkGameEndEvent)
    modelEvents.off(userEvent(userEvents.PLAY), onPlay)
    modelEvents.off(userEvent(userEvents.RESHUFFLE), onReshuffle)
    modelEvents.off(userEvent(userEvents.GAME_END), onGameEnd)
  })

  watch(maxPenetration, nextMax => {
    pendingPenetration.value = clampPenetration(pendingPenetration.value, nextMax)
  })

  watch(
    [
      pendingDeckCount,
      pendingPenetration,
      dealerHitsSoft17,
      doubleAllowedAfterSplit,
      resplitAcesAllowed,
      surrenderAllowed,
      pendingMaxSplits,
      blackjackPayout,
      dealerPeekA10,
    ],
    persistGameConfig,
    { immediate: true },
  )

  return {
    currentGameId,
    roundId,
    pendingDeckCount,
    setDeckCount,
    pendingPenetration,
    setPenetration,
    maxPenetration,
    dealerHitsSoft17,
    setDealerHitsSoft17,
    doubleAllowedAfterSplit,
    setDoubleAllowedAfterSplit,
    resplitAcesAllowed,
    setResplitAcesAllowed,
    surrenderAllowed,
    setSurrenderAllowed,
    pendingMaxSplits,
    setMaxSplits,
    blackjackPayout,
    setBlackjackPayout,
    dealerPeekA10,
    setDealerPeekA10,
    applyPendingConfig,
    persistGameBalance,
    selectedStrategyId,
    setSelectedStrategy,
  }
})
