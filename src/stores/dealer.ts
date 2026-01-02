import { defineStore } from 'pinia'
import { onScopeDispose, type Ref, ref} from 'vue'
import { Session } from '@/models/session'
import {
  modelEvents,
  modelInstanceCustomEvent,
  modelInstancePropertyEvent,
  modelPropertyEvent,
  type ModelPropertyChangeEvent, userEvent, type ModelEvent,
} from '@/lib/mitt'
import { getModelInstanceId } from '@/lib/modelEvents'
import type { Chair } from '@/models/chair'
import { Hand, NEW_CARD_EVENT } from '@/models/hand'
import type { Card as CardType } from '@/types/card'
import {RESHUFFLE} from "@/lib/userEvents.ts";

export const useDealerStore = defineStore('dealer', () => {
  const cards = ref<CardType[]>([])
  const totalShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const remainingShoeSize = ref(Session.getInstance().rules.deckCount * 52)
  const dealerModel = Session.getInstance().table.dealer
  const runningCount = ref(0)
  const holeCardHidden = ref(Boolean(dealerModel.holeCardHidden))
  const pastPenetration = ref(false)
  const dealerHandId: Ref<string | null> = ref(null)

  const setCards = (nextCards: CardType[]) => {
    cards.value = [...nextCards]
  }

  const addCard = (card: CardType) => {
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

  const setRunningCount = () => runningCount.value = Math.trunc(Session.getInstance().table.runningCount)
  const setHoleCardHidden = () => holeCardHidden.value = Session.getInstance().table.dealer.holeCardHidden

  const resetShoe = () => {
    totalShoeSize.value = Session.getInstance().rules.deckCount * 52
    remainingShoeSize.value = Session.getInstance().rules.deckCount * 52
    pastPenetration.value = false
    Session.getInstance().table.dealer.reset()
    Session.getInstance().table.dealer.resetDealIndex()
    setRunningCount()
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
  const runningCountChangeEvent = modelPropertyEvent('table', 'runningCount')
  const dealerHoleCardEvent = modelPropertyEvent('dealer', 'holeCardHidden')

  /* HANDLERS */
  function onDealerActiveHandChange (event: ModelPropertyChangeEvent) {
    if (event.value !== 0) {
      return
    }

    detachActiveHandListener()

    const dealerChairInstance = event.target as Chair
    const dealerHand = dealerChairInstance.hands[0]
    dealerHandId.value = getModelInstanceId(dealerHand) ?? null
    if (!dealerHandId.value) {
      throw new Error('dealer hand not found')
    }

    activeHandEventKey = modelInstanceCustomEvent('hand', NEW_CARD_EVENT, dealerHandId.value)
    modelEvents.on(activeHandEventKey, dealerNewCardHandler)
    modelEvents.on(dealerHoleCardEvent, dealerNewCardHandler)
  }

  function dealerNewCardHandler() {
    const dealerHand = Session.getInstance().table.dealerChair.activeHand as Hand;
    setCards(dealerHand.cards)
    setHoleCardHidden()
  }

  function onDealIndexChange (event: ModelPropertyChangeEvent) {
    if (Session.getInstance().table.dealer.pastPenetration()) {
      pastPenetration.value = true
    }

    if(event.value === 0) {
      // shoe reset
      remainingShoeSize.value = Session.getInstance().rules.deckCount * 52
      return
    }
    remainingShoeSize.value = Math.max(0, remainingShoeSize.value - 1)
  }

  function onRunningCountChange (event: ModelPropertyChangeEvent) {
    runningCount.value = Math.trunc(event.value as number)
  }

  /* END HANDLERS */

  modelEvents.on(dealerDealIndexEvent, onDealIndexChange)
  modelEvents.on<ModelEvent>(runningCountChangeEvent, onRunningCountChange)
  cleanupFns.push(() => modelEvents.off(dealerDealIndexEvent, onDealIndexChange))

  const dealerChairId = getModelInstanceId(Session.getInstance().table.dealerChair)
  if (!dealerChairId) {
    throw new Error('dealer chair not found')
  }

  let activeHandEventKey: ModelEvent | null = null

  const detachActiveHandListener = () => {
    if (!activeHandEventKey) {
      return
    }
    modelEvents.off(activeHandEventKey, dealerNewCardHandler)
    modelEvents.off(dealerHoleCardEvent, dealerNewCardHandler)
    activeHandEventKey = null
    dealerHandId.value = null
  }

  const activeHandEvent = modelInstancePropertyEvent('chair', 'activeHandIndex', dealerChairId)
  modelEvents.on(activeHandEvent, onDealerActiveHandChange)

  cleanupFns.push(() => {
    modelEvents.off(activeHandEvent, onDealerActiveHandChange)
    detachActiveHandListener()
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
    holeCardHidden,
    setCards,
    addCard,
    resetCards,
    setShoeSizes,
    adjustShoe,
    resetShoe,
    reset,
  }
})
