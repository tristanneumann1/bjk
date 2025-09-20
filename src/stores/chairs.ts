import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export type ChairCard = {
  value?: string | number
  suit?: string
}

export type ChairHand = {
  cards: ChairCard[]
  activeHandIndex: number
}

export type Chair = {
  hands: ChairHand[]
  bet: number
}

const CHAIRS_COUNT = 3
const DEFAULT_BET = 10

const buildDefaultChair = (): Chair => ({
  hands: [{ cards: [], activeHandIndex: 0 }],
  bet: DEFAULT_BET,
})

const buildInitialState = (): Chair[] => Array.from({ length: CHAIRS_COUNT }, buildDefaultChair)

export const useChairsStore = defineStore('chairs', () => {
  const chairs = reactive<Chair[]>(buildInitialState())

  const getChair = (index: number) => chairs[index] ?? null

  const setChairBet = (index: number, bet: number) => {
    const chair = getChair(index)
    if (!chair) return
    chair.bet = Math.max(0, Math.floor(bet))
  }

  const setChairHands = (index: number, hands: ChairHand[]) => {
    const chair = getChair(index)
    if (!chair) return
    chair.hands = hands.map(hand => ({
      cards: hand.cards.slice(),
      activeHandIndex: Math.max(0, Math.floor(hand.activeHandIndex ?? 0)),
    }))
  }

  const setChairCards = (chairIndex: number, handIndex: number, cards: ChairCard[]) => {
    const chair = getChair(chairIndex)
    if (!chair || !chair.hands[handIndex]) return
    chair.hands[handIndex].cards = cards.slice()
  }

  const addCardToHand = (chairIndex: number, handIndex: number, card: ChairCard) => {
    const chair = getChair(chairIndex)
    if (!chair || !chair.hands[handIndex]) return
    chair.hands[handIndex].cards = [...chair.hands[handIndex].cards, card]
  }

  const setActiveHand = (chairIndex: number, handIndex: number, activeIndex: number) => {
    const chair = getChair(chairIndex)
    if (!chair || !chair.hands[handIndex]) return
    const hand = chair.hands[handIndex]
    const clampedIndex = Math.max(0, Math.min(activeIndex, hand.cards.length - 1))
    hand.activeHandIndex = clampedIndex
  }

  const reset = () => {
    chairs.splice(0, chairs.length, ...buildInitialState())
  }

  const summary = computed(() =>
    chairs.map(({ bet, hands }) => ({
      bet,
      hands: hands.map(hand => ({ cards: hand.cards.length, activeHandIndex: hand.activeHandIndex })),
    })),
  )

  return {
    chairs,
    summary,
    getChair,
    setChairBet,
    setChairHands,
    setChairCards,
    addCardToHand,
    setActiveHand,
    reset,
  }
})
