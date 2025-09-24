import { defineStore } from 'pinia'
import { markRaw, onScopeDispose, ref } from 'vue'
import { Session } from '@/models/session'
import { modelEvents, modelPropertyEvent, type ModelPropertyChangeEvent } from '@/lib/modelEvents.ts'

const DEFAULT_BALANCE = 0
const PLAYER_BALANCE_EVENT = modelPropertyEvent('player', 'balance')

export const usePlayerStore = defineStore('player', () => {
  const session = markRaw(Session.getInstance())
  const balance = ref(session.player.balance ?? DEFAULT_BALANCE)

  const onBalanceChange = (event: ModelPropertyChangeEvent) => {
    balance.value = Number(event.value)
  }

  modelEvents.on(PLAYER_BALANCE_EVENT, onBalanceChange)
  onScopeDispose(() => {
    modelEvents.off(PLAYER_BALANCE_EVENT, onBalanceChange)
  })

  const normalise = (amount: number) => Math.max(0, Math.floor(amount))

  const setBalance = (amount: number) => {
    const target = normalise(amount)
    const current = session.player.balance

    if (target === current) {
      balance.value = current
      return
    }

    if (target > current) {
      session.player.addMoney(target - current)
    } else {
      session.player.removeMoney(current - target)
    }
  }

  const adjustBalance = (delta: number) => {
    if (!Number.isFinite(delta) || delta === 0) {
      return
    }

    setBalance(session.player.balance + delta)
  }

  return {
    balance,
    setBalance,
    adjustBalance,
  }
})
