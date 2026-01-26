import { defineStore } from 'pinia'
import { onScopeDispose, ref } from 'vue'
import { Session } from '@/models/session'
import {
  modelEvents,
  modelPropertyEvent,
  type ModelPropertyChangeEvent,
} from '@/lib/mitt.ts'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {getFbDoc, upsertFbDoc} from "@/lib/firestore.ts";
import {type PlayerDoc, PLAYER_COLLECTION, playerDocId} from "@/docs/player.ts";
import { useGameStore } from '@/stores/game'

const DEFAULT_BALANCE = 0 // Default to 0 if session still loading
const DEFAULT_REMOTE_BALANCE = 50_000_00
const PLAYER_BALANCE_EVENT = modelPropertyEvent('player', 'balance')

export const usePlayerStore = defineStore('player', () => {
  const balance = ref(DEFAULT_BALANCE)
  const auth = getAuth()
  const currentUserId = ref<string | null>(auth.currentUser?.uid ?? null)
  const syncingRemoteBalance = ref(false)
  const gameStore = useGameStore()

  const normalise = (amount: number) => Math.max(0, Math.floor(amount))

  const setBalance = (amount: number) => {
    const session = Session.getInstance()
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

    setBalance(Session.getInstance().player.balance + delta)
  }

  const persistRemoteBalance = async (uid: string, value: number) => {
    try {
      await upsertFbDoc<PlayerDoc>(PLAYER_COLLECTION, [uid], { balance: value })
    } catch (error) {
      console.error('Failed to persist player balance', error)
    }
  }

  const hydrateBalanceFromRemote = async (uid: string) => {
    syncingRemoteBalance.value = true
    try {
      const playerDoc = await getFbDoc<PlayerDoc>(PLAYER_COLLECTION, [uid])
      const storedBalance = playerDoc?.balance ?? null
      const resolved = typeof storedBalance === 'number'
        ? storedBalance
        : DEFAULT_REMOTE_BALANCE
      setBalance(resolved)
      if (storedBalance === null) {
        await persistRemoteBalance(uid, resolved)
      }
    } catch (error) {
      console.error('Failed to hydrate player balance', error)
    } finally {
      syncingRemoteBalance.value = false
    }
  }

  const onBalanceChange = (event: ModelPropertyChangeEvent) => {
    const nextBalance = Number(event.value)
    balance.value = nextBalance

    const uid = currentUserId.value
    if (!uid || syncingRemoteBalance.value) {
      return
    }

    void persistRemoteBalance(uid, nextBalance)
    void gameStore.persistGameBalance(nextBalance)
  }

  modelEvents.on(PLAYER_BALANCE_EVENT, onBalanceChange)


  onScopeDispose(() => {
    modelEvents.off(PLAYER_BALANCE_EVENT, onBalanceChange)
  })

  onAuthStateChanged(auth, user => {
    currentUserId.value = user?.uid ? playerDocId(user.uid) : null
    if (currentUserId.value) {
      void hydrateBalanceFromRemote(currentUserId.value)
      return
    }
    setBalance(Session.getInstance().player.balance)
  })

  return {
    balance,
    setBalance,
    adjustBalance,
  }
})
