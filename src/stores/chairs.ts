import { defineStore } from 'pinia'
import {ref} from 'vue'
import {Session} from "@/models/session.ts";

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

export const useChairsStore = defineStore('chairs', () => {
  const activeChairId = ref<number | null>(null)

  const getChair = (index: number) => {
    console.log('player chairs', Session.getInstance().table.playerChairs)
    return Session.getInstance().table.getPlayerChair(index)
  }

  const sit = (index: number) => {
    Session.getInstance().table.addPlayerChair(index)
  }

  const adjustBet = (index: number, bet: number) => {
    const chair = getChair(index)
    if (!chair) return
    const sanitized = Math.max(bet, 0)
    chair.bet = sanitized
  }

  return {
    activeChairId,
    getChair,
    sit,
    adjustBet,
  }
})
