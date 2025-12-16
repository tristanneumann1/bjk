import { defineStore } from 'pinia'
import { computed, onScopeDispose, reactive, ref } from 'vue'
import { Session } from '@/models/session.ts'
import { type Chair, NEW_HAND_EVENT } from '@/models/chair.ts'
import { getModelInstanceId } from '@/lib/modelEvents.ts'
import {
  modelCustomEvent,
  modelEvents,
  modelInstanceCustomEvent,
  modelInstancePropertyEvent,
  modelPropertyEvent,
  type ModelPropertyChangeEvent,
} from '@/lib/mitt.ts'
import { Hand, HAND_OUTCOME_EVENT, NEW_CARD_EVENT, SPLIT_CARDS_EVENT } from '@/models/hand.ts'
import { CHAIR_EVENT } from '@/models/table.ts'

type ChairView = {
  hands: Hand['cards'][]
  modelHands: Hand['cards'][]
  handResults: (Hand['lastOutcome'])[]
  activeHandIndex: number
  bet: number
  displayActiveHandIndex: number | null
}

type ChairRegistryEntry = {
  chair: Chair
  chairInstanceId: string
  handListeners: Map<string, () => void>
  cleanupFns: Array<() => void>
}

export const useChairsStore = defineStore('chairs', () => {
  const activeChairId = ref<number | null>(null)

  const chairs = reactive<Record<number, ChairView>>({})
  const activeChair = computed(() => {
    const chairId = activeChairId.value
    if (typeof chairId !== 'number') {
      return null
    }
    return chairs[chairId]
  })

  const chairRegistry = new Map<number, ChairRegistryEntry>()
  const cleanupFns: Array<() => void> = []

  const table = Session.getInstance().table

  const roundInProgress = computed(() =>
    Object.values(chairs).some(view => view.modelHands.some(hand => hand.length > 0)),
  )

  const cloneHandCards = (hands: Hand['cards'][]): Hand['cards'][] =>
    hands.map(cards => [...cards])

  const extractChairHands = (chair: Chair): Hand['cards'][] =>
    chair.hands.map(hand => [...hand.cards])

  const extractChairHandResults = (chair: Chair): (Hand['lastOutcome'])[] =>
    chair.hands.map(hand => hand.lastOutcome ?? null)

  const totalCards = (hands: Hand['cards'][]): number =>
    hands.reduce((sum, cards) => sum + cards.length, 0)

  const findSeatIndex = (chair: Chair | null | undefined): number | null => {
    if (!chair) {
      return null
    }

    for (const [index, entry] of chairRegistry.entries()) {
      if (entry.chair === chair) {
        return index
      }
    }

    for (const [key, value] of Object.entries(table.playerChairs)) {
      if (value === chair) {
        return Number(key)
      }
    }

    return null
  }

  const updateChairHands = (index: number) => {
    const view = chairs[index]
    const entry = chairRegistry.get(index)
    if (!view || !entry) {
      return
    }
    const nextHands = extractChairHands(entry.chair)
    // console.log('index', index)
    // console.log('view', view)
    console.log('entry.chair', entry.chair, entry.chair.hands[0]?.lastOutcome)
    const nextResults = extractChairHandResults(entry.chair)
    console.log('nextResults', nextResults)
    view.modelHands = cloneHandCards(nextHands)

    const nextTotal = totalCards(nextHands)
    const currentTotal = totalCards(view.hands)
    const nextActiveIndex = entry.chair.activeHandIndex

    if (nextTotal === 0 && currentTotal > 0) {
      return
    }

    if (nextHands.length === 0) {
      view.displayActiveHandIndex = null
      view.hands = []
      view.handResults = []
      return
    }

    const clampedActiveIndex = Math.min(Math.max(nextActiveIndex, 0), nextHands.length - 1)
    view.displayActiveHandIndex = clampedActiveIndex
    view.hands = cloneHandCards(nextHands)
    view.handResults = [...nextResults]
  }

  const detachHandListener = (entry: ChairRegistryEntry, handId: string) => {
    const cleanup = entry.handListeners.get(handId)
    if (!cleanup) {
      return
    }
    try {
      cleanup()
    } finally {
      entry.handListeners.delete(handId)
    }
  }

  const attachHandListener = (index: number, hand: Hand) => {
    const entry = chairRegistry.get(index)
    if (!entry) {
      return
    }
    const handInstanceId = getModelInstanceId(hand)
    if (!handInstanceId) {
      throw new Error('Hand instance ID not found')
    }

    if (entry.handListeners.has(handInstanceId)) {
      return
    }

    const handleHandMutation = (_event) => {
      console.log('event', _event)
      updateChairHands(index)
    }

    const newCardEvent = modelInstanceCustomEvent('hand', NEW_CARD_EVENT, handInstanceId)
    const splitCardsEvent = modelInstanceCustomEvent('hand', SPLIT_CARDS_EVENT, handInstanceId)
    const outcomeEvent = modelInstanceCustomEvent('hand', HAND_OUTCOME_EVENT, handInstanceId)

    modelEvents.on(newCardEvent, handleHandMutation)
    modelEvents.on(splitCardsEvent, handleHandMutation)
    modelEvents.on(outcomeEvent, handleHandMutation)

    entry.handListeners.set(handInstanceId, () => {
      modelEvents.off(newCardEvent, handleHandMutation)
      modelEvents.off(splitCardsEvent, handleHandMutation)
      modelEvents.off(outcomeEvent, handleHandMutation)
    })
  }

  const syncChairHands = (index: number) => {
    const entry = chairRegistry.get(index)
    if (!entry) {
      return
    }

    const chair = entry.chair
    const presentIds = new Set<string>()

    for (const hand of chair.hands) {
      const handInstanceId = getModelInstanceId(hand)
      if (!handInstanceId) {
        throw new Error('Hand instance ID not found')
      }
      presentIds.add(handInstanceId)
      attachHandListener(index, hand)
    }

    for (const handId of [...entry.handListeners.keys()]) {
      if (!presentIds.has(handId)) {
        detachHandListener(entry, handId)
      }
    }

    updateChairHands(index)
  }

  const cleanupChair = (index: number) => {
    const entry = chairRegistry.get(index)
    if (!entry) {
      return
    }

    for (const cleanup of entry.cleanupFns) {
      try {
        cleanup()
      } catch (error) {
        console.error('Failed to cleanup chair listener', error)
      }
    }
    entry.cleanupFns.length = 0

    for (const handId of [...entry.handListeners.keys()]) {
      detachHandListener(entry, handId)
    }

    chairRegistry.delete(index)
    delete chairs[index]
  }

  const registerChair = (index: number, chair: Chair) => {
    cleanupChair(index)

    const chairInstanceId = getModelInstanceId(chair)
    if (!chairInstanceId) {
      throw new Error('Chair instance ID not found')
    }

    const initialHands = extractChairHands(chair)
    const initialResults = extractChairHandResults(chair)

    chairs[index] = {
      hands: initialHands,
      modelHands: cloneHandCards(initialHands),
      handResults: [...initialResults],
      activeHandIndex: chair.activeHandIndex,
      bet: chair.bet ?? 0,
      displayActiveHandIndex: initialHands.length > 0
        ? Math.min(Math.max(chair.activeHandIndex, 0), initialHands.length - 1)
        : null,
    }

    const entry: ChairRegistryEntry = {
      chair,
      chairInstanceId,
      handListeners: new Map(),
      cleanupFns: [],
    }

    const activeHandEvent = modelInstancePropertyEvent('chair', 'activeHandIndex', chairInstanceId)
    const onActiveHandChange = (event: ModelPropertyChangeEvent) => {
      const view = chairs[index]
      if (!view) {
        return
      }
      const nextIndex = typeof event.value === 'number'
        ? event.value
        : Number(event.value ?? view.activeHandIndex)
      view.activeHandIndex = Number.isNaN(nextIndex) ? view.activeHandIndex : nextIndex
      syncChairHands(index)
    }

    modelEvents.on(activeHandEvent, onActiveHandChange)
    entry.cleanupFns.push(() => modelEvents.off(activeHandEvent, onActiveHandChange))

    const betEvent = modelInstancePropertyEvent('chair', 'bet', chairInstanceId)
    const onBetChange = (event: ModelPropertyChangeEvent) => {
      const view = chairs[index]
      if (!view) {
        return
      }
      const nextBet = typeof event.value === 'number'
        ? event.value
        : Number(event.value ?? view.bet)
      view.bet = Number.isNaN(nextBet) ? view.bet : nextBet
    }

    modelEvents.on(betEvent, onBetChange)
    entry.cleanupFns.push(() => modelEvents.off(betEvent, onBetChange))

    const newHandEvent = modelInstanceCustomEvent('chair', NEW_HAND_EVENT, chairInstanceId)
    const onNewHand = (event: ModelPropertyChangeEvent) => {
      const newHand = event.value as Hand | undefined
      if (newHand) {
        attachHandListener(index, newHand)
      }
      updateChairHands(index)
    }

    modelEvents.on(newHandEvent, onNewHand)
    entry.cleanupFns.push(() => modelEvents.off(newHandEvent, onNewHand))

    chairRegistry.set(index, entry)

    syncChairHands(index)
  }

  const initializeChairs = () => {
    for (const [key, chair] of Object.entries(table.playerChairs)) {
      if (!chair) {
        continue
      }
      registerChair(Number(key), chair)
    }
  }

  const onTableChairChange = (event: ModelPropertyChangeEvent) => {
    const addedChair = event.value as Chair | null
    const removedChair = event.previous as Chair | null

    if (removedChair) {
      const index = findSeatIndex(removedChair)
      if (index !== null) {
        cleanupChair(index)
      }
    }

    if (addedChair) {
      const index = findSeatIndex(addedChair)
      if (index === null) {
        throw new Error('Could not determine chair index for new chair')
      }
      registerChair(index, addedChair)
    }
  }

  const tableChairEvent = modelCustomEvent('table', CHAIR_EVENT)
  modelEvents.on(tableChairEvent, onTableChairChange)
  cleanupFns.push(() => modelEvents.off(tableChairEvent, onTableChairChange))

  const chairTurnEvent = modelPropertyEvent('table', 'chairTurnIndex')
  const onChairTurnIndexChange = (event: ModelPropertyChangeEvent) => {
    const nextIndex = typeof event.value === 'number'
      ? event.value
      : Number(event.value ?? -1)
    activeChairId.value = nextIndex >= 0 ? nextIndex : null
  }

  modelEvents.on(chairTurnEvent, onChairTurnIndexChange)
  cleanupFns.push(() => modelEvents.off(chairTurnEvent, onChairTurnIndexChange))

  activeChairId.value = table.chairTurnIndex >= 0 ? table.chairTurnIndex : null

  initializeChairs()

  onScopeDispose(() => {
    for (const cleanup of cleanupFns) {
      try {
        cleanup()
      } catch (error) {
        console.error('Failed to cleanup chair store listener', error)
      }
    }
    cleanupFns.length = 0

    for (const index of [...chairRegistry.keys()]) {
      cleanupChair(index)
    }
  })

  const getChairView = (index: number): ChairView | null => {
    return chairs[index] ?? null
  }

  const sit = (index: number) => {
    if (roundInProgress.value) return
    Session.getInstance().table.addPlayerChair(index)
  }

  const adjustBet = (index: number, bet: number) => {
    if (roundInProgress.value) return
    const chair = chairRegistry.get(index)?.chair
    if (!chair) return
    chair.bet = Math.max(bet, 0)
  }

  const leave = (index: number) => {
    if (roundInProgress.value) return
    Session.getInstance().table.removePlayerChair(index)
  }

  return {
    activeChairId,
    activeChair,
    getChairView,
    roundInProgress,
    sit,
    adjustBet,
    leave,
  }
})
