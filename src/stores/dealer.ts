import { defineStore } from 'pinia'
import { onScopeDispose, ref } from 'vue'
import { Session } from '@/models/session'
import {
  modelEvents,
  modelInstanceCustomEvent,
  modelInstancePropertyEvent,
  modelPropertyEvent,
  type ModelPropertyChangeEvent,
} from '@/lib/mitt'
import { Dealer } from '@/models/dealer'
import { getModelInstanceId } from '@/lib/modelEvents'
import type { Chair } from '@/models/chair'
import { Hand, NEW_CARD_EVENT } from '@/models/hand'

export type DealerCard = {
  value?: string | number
  suit?: string
}

export const useDealerStore = defineStore('dealer', () => {
  const cards = ref<DealerCard[]>([])
  const totalShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const remainingShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const runningCount = ref(0)

  const setCards = (nextCards: DealerCard[]) => {
    cards.value = [...nextCards]
  }

  const addCard = (card: DealerCard) => {
    cards.value = [...cards.value, card]
  }

  const resetCards = () => {
    cards.value = []
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
    runningCount.value = 0
  }

  const cleanupFns: Array<() => void> = []

  const dealerDealIndexEvent = modelPropertyEvent('dealer', 'dealIndex')

  const onDealIndexChange = (event: ModelPropertyChangeEvent) => {
    if(event.value === 0) {
      // shoe reset
      setRunningCount(0)
      remainingShoeSize.value = Session.getInstance().rules.deckCount * 52
      return
    }
    remainingShoeSize.value--
    const dealer = event.target as Dealer
    const dealtCard = dealer.shoe[event.value as number - 1]
    switch (dealtCard.value) {
      case 1:
      case 10:
        adjustRunningCount(-1)
        break
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        adjustRunningCount(1)
        break
    }
  }

  modelEvents.on(dealerDealIndexEvent, onDealIndexChange)
  cleanupFns.push(() => modelEvents.off(dealerDealIndexEvent, onDealIndexChange))

  const dealerChair = Session.getInstance().table.dealerChair
  const dealerChairId = getModelInstanceId(dealerChair)
  if (!dealerChairId) {
    throw new Error('dealer chair not found')
  }

  let activeHandEventKey: string | null = null

  const detachActiveHandListener = () => {
    if (!activeHandEventKey) {
      return
    }
    modelEvents.off(activeHandEventKey, dealerNewCardHandler)
    activeHandEventKey = null
  }

  const onDealerActiveHandChange = (event: ModelPropertyChangeEvent) => {
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

  const activeHandEvent = modelInstancePropertyEvent('chair', 'activeHandIndex', dealerChairId)
  modelEvents.on(activeHandEvent, onDealerActiveHandChange)

  cleanupFns.push(() => {
    modelEvents.off(activeHandEvent, onDealerActiveHandChange)
    detachActiveHandListener()
  })

  function dealerNewCardHandler(e: ModelPropertyChangeEvent) {
    const dealerHand = e.target as Hand
    setCards(dealerHand.cards)
  }

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
