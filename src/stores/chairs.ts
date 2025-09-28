import { defineStore } from 'pinia'
import { onScopeDispose, reactive, ref } from 'vue'
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
import { Hand, NEW_CARD_EVENT, SPLIT_CARDS_EVENT } from '@/models/hand.ts'
import { CHAIR_EVENT } from '@/models/table.ts'

type ChairView = {
  // chair: Chair
  hands: Hand['cards'][]
  activeHandIndex: number
  bet: number
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
  const chairRegistry = new Map<number, ChairRegistryEntry>()
  const cleanupFns: Array<() => void> = []

  const table = Session.getInstance().table

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
    view.hands = entry.chair.hands.map(hand => [...hand.cards])
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

    const handleHandMutation = () => {
      updateChairHands(index)
    }

    const newCardEvent = modelInstanceCustomEvent('hand', NEW_CARD_EVENT, handInstanceId)
    const splitCardsEvent = modelInstanceCustomEvent('hand', SPLIT_CARDS_EVENT, handInstanceId)

    modelEvents.on(newCardEvent, handleHandMutation)
    modelEvents.on(splitCardsEvent, handleHandMutation)

    entry.handListeners.set(handInstanceId, () => {
      modelEvents.off(newCardEvent, handleHandMutation)
      modelEvents.off(splitCardsEvent, handleHandMutation)
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

    chairs[index] = {
      hands: chair.hands.map(hand => [...hand.cards]),
      activeHandIndex: chair.activeHandIndex,
      bet: chair.bet ?? 0,
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
    Session.getInstance().table.addPlayerChair(index)
  }

  const adjustBet = (index: number, bet: number) => {
    const chair = chairRegistry.get(index)?.chair
    if (!chair) return
    chair.bet = Math.max(bet, 0)
  }

  return {
    activeChairId,
    getChairView,
    sit,
    adjustBet,
  }
})
