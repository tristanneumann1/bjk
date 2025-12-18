import { defineStore } from 'pinia'
import { computed, onScopeDispose, ref } from 'vue'
import { Session } from '@/models/session'
import {
  modelEvents,
  modelInstanceCustomEvent,
  modelInstancePropertyEvent,
  modelPropertyEvent,
  type ModelPropertyChangeEvent, userEvent,
} from '@/lib/mitt'
import { Dealer } from '@/models/dealer'
import { getModelInstanceId } from '@/lib/modelEvents'
import type { Chair } from '@/models/chair'
import { Hand, NEW_CARD_EVENT } from '@/models/hand'
import type { Card } from '@/models/card'
import type { Table } from '@/models/table'
import {RESHUFFLE} from "@/lib/userEvents.ts";

export type DealerCard = {
  value?: string | number
  suit?: string
}

export const useDealerStore = defineStore('dealer', () => {
  const cards = ref<DealerCard[]>([])
  const totalShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const remainingShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const runningCount = ref(0)
  const pendingHoleCardDelta = ref(0)
  const holeCardHidden = ref(false)
  const pastPenetration = ref(false)

  const setCards = (nextCards: DealerCard[]) => {
    cards.value = [...nextCards]
    if (nextCards.length === 0) {
      revealHoleCard()
    }
  }

  const addCard = (card: DealerCard) => {
    cards.value = [...cards.value, card]
  }

  const resetCards = () => {
    setCards([])
  }

  const setShoeSizes = (remaining: number, total: number) => {
    const safeTotal = Math.max(1, Math.floor(total))
    const safeRemaining = Math.min(safeTotal, Math.max(0, Math.floor(remaining)))
    totalShoeSize.value = safeTotal
    remainingShoeSize.value = safeRemaining
  }

  const adjustShoe = (delta: number) => {
    const nextRemaining = remainingShoeSize.value + delta
    remainingShoeSize.value = Math.min(totalShoeSize.value, Math.max(0, Math.floor(nextRemaining)))
  }

  const resetShoe = () => {
    totalShoeSize.value = Session.getInstance().rules.deckCount * 52
    remainingShoeSize.value = Session.getInstance().rules.deckCount * 52
    pastPenetration.value = false
    Session.getInstance().table.dealer.reset()
    Session.getInstance().table.dealer.resetDealIndex()
    runningCount.value = 0
  }

  const setRunningCount = (count: number) => {
    runningCount.value = Math.trunc(count)
  }

  const adjustRunningCount = (delta: number) => {
    runningCount.value = Math.trunc(runningCount.value + delta)
  }

  const reset = () => {
    resetCards()
    resetShoe()
  }

  modelEvents.on(userEvent(RESHUFFLE), () => {
    reset()
  })

  const cleanupFns: Array<() => void> = []

  const dealerDealIndexEvent = modelPropertyEvent('dealer', 'dealIndex')

  const getCountDelta = (card: Card | DealerCard | undefined): number => {
    if (!card || card.value === undefined || card.value === null) {
      return 0
    }
    const value = typeof card.value === 'number' ? card.value : Number(card.value)
    switch (value) {
      case 1:
      case 10:
        return -1
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 1
      default:
        return 0
    }
  }

  const revealHoleCard = () => {
    if (!holeCardHidden.value) {
      return
    }
    holeCardHidden.value = false
    pendingHoleCardDelta.value = 0
  }

  /* HANDLERS */
  function onDealerActiveHandChange (event: ModelPropertyChangeEvent) {
    if (event.value !== 0) {
      return
    }

    detachActiveHandListener()

    const dealerChairInstance = event.target as Chair
    const dealerHand = dealerChairInstance.hands[0]
    const dealerHandIndex = getModelInstanceId(dealerHand)
    if (!dealerHandIndex) {
      throw new Error('dealer hand not found')
    }

    activeHandEventKey = modelInstanceCustomEvent('hand', NEW_CARD_EVENT, dealerHandIndex)
    modelEvents.on(activeHandEventKey, dealerNewCardHandler)
  }
  function dealerNewCardHandler(e: ModelPropertyChangeEvent) {
    const dealerHand = e.target as Hand
    setCards(dealerHand.cards)

    const tableInstance = Session.getInstance().table

    if (dealerHand.cards.length === 2) {
      const shouldHide = !tableInstance.playerChairArray[0]?.hands.length || !tableInstance.playerRoundsComplete
      if (shouldHide && !holeCardHidden.value) {
        holeCardHidden.value = true
        const newCard = e.value as Card | undefined
        pendingHoleCardDelta.value = getCountDelta(newCard)
      } else if (!shouldHide) {
        revealHoleCard()
      }
      return
    }
  }
  function onChairTurnIndexChange (event: ModelPropertyChangeEvent) {
    const tableInstance = event.target as Table
    if (holeCardHidden.value && tableInstance.playerRoundsComplete) {
      revealHoleCard()
    }
  }
  function onDealIndexChange (event: ModelPropertyChangeEvent) {
    if (Session.getInstance().table.dealer.pastPenetration()) {
      pastPenetration.value = true
    }

    if(event.value === 0) {
      // shoe reset
      setRunningCount(0)
      remainingShoeSize.value = Session.getInstance().rules.deckCount * 52
      return
    }
    remainingShoeSize.value--
    const dealer = event.target as Dealer
    const dealtCard = dealer.shoe[event.value as number - 1]
    const delta = getCountDelta(dealtCard)
    if (delta !== 0) {
      adjustRunningCount(delta)
    }
  }
  /* END HANDLERS */

  modelEvents.on(dealerDealIndexEvent, onDealIndexChange)
  cleanupFns.push(() => modelEvents.off(dealerDealIndexEvent, onDealIndexChange))

  const dealerChairId = getModelInstanceId(Session.getInstance().table.dealerChair)
  if (!dealerChairId) {
    throw new Error('dealer chair not found')
  }

  let activeHandEventKey: `mod_${string}` | null = null

  const detachActiveHandListener = () => {
    if (!activeHandEventKey) {
      return
    }
    modelEvents.off(activeHandEventKey, dealerNewCardHandler)
    activeHandEventKey = null
  }

  const activeHandEvent = modelInstancePropertyEvent('chair', 'activeHandIndex', dealerChairId)
  modelEvents.on(activeHandEvent, onDealerActiveHandChange)

  cleanupFns.push(() => {
    modelEvents.off(activeHandEvent, onDealerActiveHandChange)
    detachActiveHandListener()
  })

  const chairTurnEvent = modelPropertyEvent('table', 'chairTurnIndex')

  modelEvents.on(chairTurnEvent, onChairTurnIndexChange)
  cleanupFns.push(() => modelEvents.off(chairTurnEvent, onChairTurnIndexChange))

  const perceivedRunningCount = computed(() => {
    const perceived = holeCardHidden.value
      ? runningCount.value - pendingHoleCardDelta.value
      : runningCount.value
    return Math.trunc(perceived)
  })

  onScopeDispose(() => {
    cleanupFns.forEach((cleanup) => {
      try {
        cleanup()
      } catch (error) {
        console.error('Failed to cleanup dealer store listener', error)
      }
    })
    cleanupFns.length = 0
    detachActiveHandListener()
  })


  return {
    cards,
    totalShoeSize,
    remainingShoeSize,
    runningCount,
    pastPenetration,
    perceivedRunningCount,
    holeCardHidden,
    setCards,
    addCard,
    resetCards,
    setShoeSizes,
    adjustShoe,
    resetShoe,
    setRunningCount,
    adjustRunningCount,
    reset,
  }
})
