import { defineStore } from 'pinia'
import { ref } from 'vue'

const DEFAULT_BALANCE = 5000000

export const usePlayerStore = defineStore('player', () => {
  const balance = ref(DEFAULT_BALANCE)

  const setBalance = (amount: number) => {
    balance.value = Math.max(0, Math.floor(amount))
  }

  const adjustBalance = (delta: number) => {
    setBalance(balance.value + delta)
  }

  return {
    balance,
    setBalance,
    adjustBalance,
  }
})
