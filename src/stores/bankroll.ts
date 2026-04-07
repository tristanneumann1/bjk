/**
 * Bankroll history store — fetches last 100 completed games from Firebase
 * and exposes chronological balance snapshots for chart rendering.
 *
 * Layer: Store
 * Dependencies: firestore.ts, docs/game.ts, lib/mitt.ts, lib/userEvents.ts
 * Events consumed: usr_evt_gameEnd (re-fetches history after each game)
 */

import { defineStore } from 'pinia'
import { ref, onScopeDispose } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getPlayerDocs } from '@/lib/firestore'
import { GAMES_SUBCOLLECTION, type GameDoc } from '@/docs/game'
import { modelEvents, userEvent } from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'

export const useBankrollStore = defineStore('bankroll', () => {
  const auth = getAuth()
  const userId = ref<string | null>(auth.currentUser?.uid ?? null)
  const bankrollHistory = ref<{ balance: number; date: Date }[]>([])
  const isLoading = ref(false)

  onAuthStateChanged(auth, user => {
    userId.value = user?.uid ?? null
    if (userId.value) {
      void fetchBankrollHistory()
    } else {
      bankrollHistory.value = []
    }
  })

  const fetchBankrollHistory = async () => {
    if (!userId.value) return
    isLoading.value = true
    try {
      const docs = await getPlayerDocs<GameDoc>(userId.value, [GAMES_SUBCOLLECTION], {
        limit: 100,
        // WHY: desc order so we get the most recent 100 games, then reverse for chronological display
        orderBys: [{ field: 'createdAt', direction: 'desc' }],
      })
      bankrollHistory.value = docs
        .filter((d): d is GameDoc => d != null && d.finalBalance != null)
        .map(d => ({
          balance: d.finalBalance!,
          date: d.createdAt!.toDate(),
        }))
        .reverse() // chronological order (oldest first for the chart)
    } catch (error) {
      console.error('Failed to fetch bankroll history', error)
    } finally {
      isLoading.value = false
    }
  }

  // Re-fetch after each game ends so the chart stays current
  const onGameEnd = () => { void fetchBankrollHistory() }
  modelEvents.on(userEvent(userEvents.GAME_END), onGameEnd)
  onScopeDispose(() => {
    modelEvents.off(userEvent(userEvents.GAME_END), onGameEnd)
  })

  return { bankrollHistory, isLoading }
})
