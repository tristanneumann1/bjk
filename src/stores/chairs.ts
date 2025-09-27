import { defineStore } from 'pinia'
import {ref} from 'vue'
import {Session} from "@/models/session.ts";
import {
  modelCustomEvent,
  modelEvents,
  type ModelPropertyChangeEvent
} from "@/lib/mitt.ts";
import {CHAIR_EVENT} from "@/models/table.ts";
import type {Chair} from "@/models/chair.ts";

export const useChairsStore = defineStore('chairs', () => {
  const activeChairId = ref<number | null>(null)
  const chairs = ref<{ [key: number]: Chair | null }>({})

  const getChair = (index: number) => {
    return chairs.value[index]
  }

  const sit = (index: number) => {
    const addNewChairToThisSpot = (event: ModelPropertyChangeEvent) => {
      if (!event.value) return
      chairs.value[index] = event.value as Chair
      modelEvents.off(modelCustomEvent('table', CHAIR_EVENT), addNewChairToThisSpot)
    }
    modelEvents.on(modelCustomEvent('table', CHAIR_EVENT), addNewChairToThisSpot)

    Session.getInstance().table.addPlayerChair(index)
  }

  const adjustBet = (index: number, bet: number) => {
    const chair = getChair(index)
    if (!chair) return
    const sanitized = Math.max(bet, 0)
    chair.bet = sanitized
  }


  return {
    chairs,
    activeChairId,
    getChair,
    sit,
    adjustBet,
  }
})
