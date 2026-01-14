<template>
  <section class="round-summary" aria-label="Round summary">
    <header class="round-summary__header">
      <h2>Round Summary</h2>
      <nav class="round-summary__tabs" role="tablist" v-show="false">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="round-summary__tab"
          type="button"
          role="tab"
          :aria-selected="tab.id === activeTab"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>
    </header>

    <div class="round-summary__content" v-if="userId">
      <div v-if="activeTab === 'stats'" class="round-summary__panel">
        <ul class="round-summary__stats">
          <li v-for="stat in stats" :key="stat.label">
            <span class="round-summary__stat-label">{{ stat.label }}</span>
            <span class="round-summary__stat-value">{{ stat.value }}</span>
          </li>
        </ul>

        <section class="round-summary__mistakes" aria-label="Incorrect actions">
          <h3>Incorrect Actions</h3>
          <p v-if="isLoadingMistakes" class="round-summary__mistakes-status">Loading mistakes…</p>
          <p v-else-if="!mistakes.length" class="round-summary__mistakes-status">No mistakes logged for this game.</p>
          <ul v-else class="mistakes-list">
            <li v-for="(mistake, index) in mistakes" :key="`${mistake.roundId}-${index}`" class="mistakes-list__item">
              <div class="mistakes-list__hand">
                <label>Player Hand</label>
                <CardHand :cards="mistake.cards ?? []" :maxWidth="180" />
              </div>
              <div class="mistakes-list__upcard">
                <label>Dealer Upcard</label>
                <PlayingCard :rank="mistake.upCard?.rank" :suit="mistake.upCard?.suit" />
              </div>
              <div class="mistakes-list__actions">
                <p><strong>Taken:</strong> {{ mistake.chosenAction }}</p>
                <p><strong>Expected:</strong> {{ mistake.expectedAction?.join(', ') }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div v-else class="round-summary__panel round-summary__panel--graph">
        <p>Graph placeholder</p>
      </div>
    </div>
    <div v-else class="round-summary__content round-summary__content--unauth">
      <p>Please log in to view your round stats.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { where } from 'firebase/firestore'
import CardHand from '@/components/CardHand.vue'
import PlayingCard from '@/components/PlayingCard.vue'
import { useGameStore } from '@/stores/game.ts'
import { countPlayerDocs, getPlayerDocs } from '@/lib/firestore.ts'
import { GAMES_SUBCOLLECTION } from '@/docs/game.ts'
import { ACTIONS_SUBCOLLECTION, type ActionDoc } from '@/docs/action.ts'

const tabs = [
  { id: 'stats', label: 'Stats' },
  { id: 'graph', label: 'Graph' },
]

const gameStore = useGameStore()
const activeTab = ref('stats')
const userId = ref<string | null>(getAuth().currentUser?.uid ?? null)
const totalActions = ref(0)
const incorrectActions = ref(0)
const mistakes = ref<ActionDoc[]>([])
const isLoadingMistakes = ref(false)

const stats = computed(() => [
  { label: 'Actions Taken', value: totalActions.value },
  { label: 'Mistakes Made', value: incorrectActions.value },
])

onAuthStateChanged(getAuth(), user => {
  userId.value = user?.uid ?? null
})

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

watch(
  [userId, () => gameStore.currentGameId],
  ([uid, currentGameId]) => {
    if (uid && currentGameId) {
      refreshRoundSummary()
    } else {
      resetStats()
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.round-summary {
  width: 100%;
  max-width: 960px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  margin: 2rem;
  padding: 1.25rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.round-summary__header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  h2 {
    margin: 0;
  }
}

.round-summary__tabs {
  display: inline-flex;
  gap: 0.5rem;
}

.round-summary__tab {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.round-summary__tab[aria-selected='true'] {
  background: rgba(255, 255, 255, 0.2);
}

.round-summary__content {
  display: flex;
  flex-direction: column;
}

.round-summary__content--unauth {
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  opacity: 0.85;
}

.round-summary__stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 0.75rem;
}

.round-summary__stat-label {
  display: block;
  font-size: 0.85rem;
  opacity: 0.8;
}

.round-summary__stat-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.round-summary__panel--graph {
  min-height: 200px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.round-summary__mistakes {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.round-summary__mistakes h3 {
  margin: 0;
  font-size: 1rem;
}

.round-summary__mistakes-status {
  margin: 0;
  opacity: 0.8;
}

.mistakes-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mistakes-list__item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.25);
}

.mistakes-list__hand,
.mistakes-list__upcard,
.mistakes-list__actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mistakes-list__hand label,
.mistakes-list__upcard label {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.8;
}

.mistakes-list__actions p {
  margin: 0;
}
</style>
