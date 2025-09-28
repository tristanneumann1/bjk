import { defineStore } from 'pinia'
import {ref} from 'vue'
import {Session} from "@/models/session.ts";
import {type Chair, NEW_HAND_EVENT} from "@/models/chair.ts";
import {getModelInstanceId} from "@/lib/modelEvents.ts";
import {
  modelEvents,
  modelInstanceCustomEvent,
  modelInstancePropertyEvent,
  type ModelPropertyChangeEvent
} from "@/lib/mitt.ts";
import type {Hand} from "@/models/hand.ts";

export const useChairsStore = defineStore('chairs', () => {
  const activeChairId = ref<number | null>(null)

  const registerChair = (index: number) => {
    const chair = getChair(index)
    if (!chair) {
      throw new Error('Chair not found')
    }
    const chairInstanceId = getModelInstanceId(chair)
    if (!chairInstanceId) {
      throw new Error('Chair instance ID not found')
    }

    const activeHandEvent = modelInstancePropertyEvent('chair', 'activeHandIndex', chairInstanceId)
    function registerChairHand(event: ModelPropertyChangeEvent) {

    }

    modelEvents.on(activeHandEvent, registerChairHand)
  }

  const getChair = (index: number): Chair | null => {
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
