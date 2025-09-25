import { defineStore } from 'pinia'
import { ref } from 'vue'
import {Session} from "@/models/session.ts";
import {
  modelEvents,
  type ModelPropertyChangeEvent, modelPropertyEvent
} from "@/lib/mitt.ts";
import {Dealer} from "@/models/dealer.ts";

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
    cards.value = nextCards
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

  console.log('Registering dealer store model event listeners')
  modelEvents.on(modelPropertyEvent('dealer', 'dealerIndex'), (event: ModelPropertyChangeEvent) => {
    const dealerChair = event.target as Dealer
    const dealtCard = dealerChair.shoe[event.value as number]
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
    }
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
