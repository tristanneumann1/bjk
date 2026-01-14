<template>
  <section class="round-summary" aria-label="Round summary">
    <header class="round-summary__header">
      <h2>Round Summary</h2>
      <nav class="round-summary__tabs" role="tablist">
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
import { useGameStore } from '@/stores/game.ts'
import { countPlayerDocs } from '@/lib/firestore.ts'
import { GAMES_SUBCOLLECTION } from '@/docs/game.ts'
import { ACTIONS_SUBCOLLECTION } from '@/docs/action.ts'

const tabs = [
  { id: 'stats', label: 'Stats' },
  { id: 'graph', label: 'Graph' },
]

const gameStore = useGameStore()
const activeTab = ref('stats')
const userId = ref<string | null>(getAuth().currentUser?.uid ?? null)
const totalActions = ref(0)
const incorrectActions = ref(0)

const stats = computed(() => [
  { label: 'Actions Taken', value: totalActions.value },
  { label: 'Mistakes Made', value: incorrectActions.value },
])

onAuthStateChanged(getAuth(), user => {
  userId.value = user?.uid ?? null
})

const updateActionStats = async () => {
  if (!userId.value || !gameStore.currentGameId) return

  const actionsPath = [GAMES_SUBCOLLECTION, gameStore.currentGameId, ACTIONS_SUBCOLLECTION]

  try {
    const [wrongActionsCount, totalActionsCount] = await Promise.all([
      countPlayerDocs(userId.value, actionsPath, {
        wheres: [where('actionIsCorrect', '==', false)],
      }),
      countPlayerDocs(userId.value, actionsPath, {}),
    ])

    incorrectActions.value = wrongActionsCount
    totalActions.value = totalActionsCount
  } catch (error) {
    console.error('Failed to fetch action stats', error)
  }
}

watch(
  [userId, () => gameStore.currentGameId],
  ([uid, currentGameId]) => {
    if (uid && currentGameId) {
      updateActionStats()
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
</style>
