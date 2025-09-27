import { defineStore } from 'pinia'
import {computed, reactive, ref} from 'vue'
import { modelEvents, userEvent, type UserEventMap } from '@/lib/mitt'
import { ADJUST_BET, SIT } from '@/lib/userEvents'

export type ChairCard = {
  value?: string | number
  suit?: string
}

export type ChairHand = {
  cards: ChairCard[]
}

export type Chair = {
  activeHandIndex: number
  hands: ChairHand[]
  bet: number
}

const CHAIRS_COUNT = 0
const DEFAULT_BET = 10

const buildDefaultChair = (): Chair => ({
  hands: [],
  bet: DEFAULT_BET,
  activeHandIndex: -1
})

const buildInitialState = (): Chair[] => Array.from({ length: CHAIRS_COUNT }, buildDefaultChair)

export const useChairsStore = defineStore('chairs', () => {
  const chairs = reactive<Chair[]>(buildInitialState())
  const activeChairId = ref<number | null>(null)

  // TODO handle no chair with new component i guess
  const getChair = (index: number) => chairs[index] ?? buildDefaultChair()

  const setChairBet = (index: number, bet: number) => {
    const chair = getChair(index)
    if (!chair) return 0
    const sanitized = Math.max(0, Math.floor(bet))
    chair.bet = sanitized
    return sanitized
  }

  const setChairHands = (index: number, hands: ChairHand[]) => {
    const chair = getChair(index)
    if (!chair) return
    chair.hands = hands.map(hand => ({
      cards: hand.cards.slice(),
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

  const setActiveHand = (chairIndex: number, handIndex: number) => {
    const chair = getChair(chairIndex)
    if (!chair || !chair.hands[handIndex]) return
  }

  const emitSit = (index: number) => {
    modelEvents.emit(userEvent(SIT), { event: SIT, chairIndex: index } as UserEventMap)
  }

  const emitAdjustBet = (index: number, bet: number) => {
    const sanitized = setChairBet(index, bet)
    modelEvents.emit(
      userEvent(ADJUST_BET),
      { event: ADJUST_BET, chairIndex: index, value: sanitized } as UserEventMap,
    )
    return sanitized
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
    emitSit,
    emitAdjustBet,
    activeChairId,
    reset,
  }
})
