import { defineStore } from 'pinia'
import { computed, onScopeDispose, ref, watch } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { where } from 'firebase/firestore'
import { countPlayerDocs, getPlayerDocs, upsertPlayerDoc } from '@/lib/firestore.ts'
import { GAMES_SUBCOLLECTION, type GameDoc } from '@/docs/game'
import { ACTIONS_SUBCOLLECTION, type ActionDoc } from '@/docs/action'
import { useGameStore } from '@/stores/game'
import { Session } from '@/models/session.ts'
import { modelEvents, userEvent } from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'

export const useStatsStore = defineStore('stats', () => {
  const gameStore = useGameStore()
  const auth = getAuth()
  const userId = ref<string | null>(auth.currentUser?.uid ?? null)
  const totalActions = ref(0)
  const incorrectActions = ref(0)
  const mistakes = ref<ActionDoc[]>([])
  const isLoadingMistakes = ref(false)
  const latestGuess = ref<number | null>(null)
  const finalRunningCount = ref<number | null>(Session.getInstance().table.runningCount)

  onAuthStateChanged(auth, user => {
    userId.value = user?.uid ?? null
  })

  const stats = computed(() => [
    { label: 'Actions Taken', value: totalActions.value },
    { label: 'Mistakes Made', value: incorrectActions.value },
  ])

  const hasUser = computed(() => Boolean(userId.value))

  const resetStats = () => {
    totalActions.value = 0
    incorrectActions.value = 0
    mistakes.value = []
  }

  const refreshRoundSummary = async () => {
    if (!userId.value || !gameStore.currentGameId) {
      resetStats()
      return
    }

    const actionsPath = [GAMES_SUBCOLLECTION, gameStore.currentGameId, ACTIONS_SUBCOLLECTION]
    isLoadingMistakes.value = true

    try {
      const [totalActionsCount, wrongActions] = await Promise.all([
        countPlayerDocs(userId.value, actionsPath, {}),
        getPlayerDocs<ActionDoc>(userId.value, actionsPath, {
          wheres: [where('actionIsCorrect', '==', false)],
        }),
      ])

      mistakes.value = wrongActions.filter((entry): entry is ActionDoc => Boolean(entry))
      incorrectActions.value = mistakes.value.length
      totalActions.value = totalActionsCount
    } catch (error) {
      console.error('Failed to fetch action stats', error)
      resetStats()
    } finally {
      isLoadingMistakes.value = false
    }
  }

  const submitCountGuess = async (guess: number | null) => {
    latestGuess.value = guess
    const currentUser = auth.currentUser
    const gameId = gameStore.currentGameId
    if (!currentUser?.uid || !gameId) return

    await upsertPlayerDoc<GameDoc>(currentUser.uid, [GAMES_SUBCOLLECTION, gameId], { countGuess: guess })
  }

  const updateFinalRunningCount = () => {
    finalRunningCount.value = Session.getInstance().table.runningCount
  }

  watch(
    [userId, () => gameStore.currentGameId],
    async ([uid, currentGameId]) => {
      if (uid && currentGameId) {
        await refreshRoundSummary()
      } else {
        resetStats()
        if (!currentGameId) {
          latestGuess.value = null
        }
      }
    },
    { immediate: true },
  )

  modelEvents.on(userEvent(userEvents.GAME_END), updateFinalRunningCount)

  onScopeDispose(() => {
    modelEvents.off(userEvent(userEvents.GAME_END), updateFinalRunningCount)
  })

  return {
    hasUser,
    stats,
    mistakes,
    isLoadingMistakes,
    latestGuess,
    finalRunningCount,
    submitCountGuess,
  }
})
