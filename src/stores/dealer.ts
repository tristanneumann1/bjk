import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type DealerCard = {
  value?: string | number
  suit?: string
}

const DEFAULT_SHOE_SIZE = 312

export const useDealerStore = defineStore('dealer', () => {
  const cards = ref<DealerCard[]>([{}, {value: 'A', suit: 'H'}])
  const totalShoeSize = ref(DEFAULT_SHOE_SIZE)
  const remainingShoeSize = ref(DEFAULT_SHOE_SIZE / 2)


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
    totalShoeSize.value = DEFAULT_SHOE_SIZE
    remainingShoeSize.value = DEFAULT_SHOE_SIZE / 2
  }

  const reset = () => {
    resetCards()
    resetShoe()
  }

  return {
    cards,
    totalShoeSize,
    remainingShoeSize,
    setCards,
    addCard,
    resetCards,
    setShoeSizes,
    adjustShoe,
    resetShoe,
    reset,
  }
})
