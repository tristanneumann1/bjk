<template>
  <section class="strategy-tab" aria-label="Strategy chart preview">
    <header class="strategy-tab__header">
      <div>
        <h3>Strategy Preview</h3>
        <p>Hard totals versus dealer upcards (based on selected strategy).</p>
        <p class="strategy-tab__warning">Changing strategies mid-shoe can skew analytics.</p>
      </div>
    </header>
    <div class="strategy-tab__controls">
      <label class="strategy-tab__selector">
        <span>Strategy</span>
        <select v-model="selectedStrategyModel">
          <option v-for="strategy in strategies" :key="strategy.id" :value="strategy.id">
            {{ strategy.name }}
          </option>
        </select>
      </label>
      <label class="strategy-tab__name">
        <span>New strategy name</span>
        <input
          type="text"
          v-model="draftName"
          maxlength="25"
          placeholder="Enter name"
        />
      </label>
      <v-btn
        type="button"
        class="strategy-tab__save"
        color="success"
        :disabled="!canSave"
        @click="handleSave"
      >
        Save Strategy
      </v-btn>
    </div>
    <div class="strategy-tab__panels">
      <Transition :name="detailTransitionName" mode="out-in">
        <div v-if="!selectedTile" key="chart" class="strategy-panel strategy-panel--chart">
          <div class="strategy-chart" role="table">
            <div class="strategy-chart__cell strategy-chart__cell--corner">Hard</div>
            <div
              v-for="upcard in upcards"
              :key="`header-${upcard}`"
              class="strategy-chart__cell strategy-chart__cell--header"
            >
              {{ formatUpCard(upcard) }}
            </div>
            <template v-for="row in strategyGrid" :key="`row-${row.total}`">
              <div class="strategy-chart__cell strategy-chart__cell--row-label">{{ row.total }}</div>
              <StrategyActionButton
                v-for="(actions, index) in row.actions"
                :key="`cell-${row.total}-${index}`"
                :actions="actions"
                @select="openDetail(row.total, upcards[index])"
              />
            </template>
          </div>
        </div>
        <div v-else key="detail" class="strategy-panel strategy-panel--detail">
          <StrategyTileDetail
            :total="selectedTile.total"
            :upcard="selectedTile.upcard"
            @back="selectedTile = null"
          />
        </div>
      </Transition>
    </div>
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" timeout="2500">
      {{ snackbar.text }}
    </v-snackbar>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import StrategyActionButton from '@/components/strategy/StrategyActionButton.vue'
import { useStrategyStore } from '@/stores/strategy'
import StrategyTileDetail from '@/components/strategy/StrategyTileDetail.vue'
import type {ScenarioKey} from "@/types/strategies.ts";
import {type PlayerAction} from "@/types/actions.ts";
import { getAuth } from 'firebase/auth'

const hardTotals = Array.from({ length: 19 }, (_, index) => 2 + index)
const upcards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1]

const strategyStore = useStrategyStore()
const { selectedStrategyId, hasUnsavedChanges } = storeToRefs(strategyStore)
const strategies = computed(() => strategyStore.strategies)
const draftName = ref('')
const isAuthenticated = computed(() => Boolean(getAuth().currentUser))

const actionMap: Record<string, PlayerAction> = {
  hit: 'Hit',
  stand: 'Stand',
  double: 'Double',
  split: 'Split',
  surrender: 'Surrender',
  insurance: 'Insurance',
}
const selectedTile = ref<{ total: number; upcard: number } | null>(null)
const transitioningToDetail = ref(false)

const openDetail = (total: number, upcard: number) => {
  transitioningToDetail.value = true
  selectedTile.value = { total, upcard }
}

const detailTransitionName = computed(() =>
  transitioningToDetail.value ? 'strategy-panel-forward' : 'strategy-panel-backward'
)

watch(selectedTile, (next, prev) => {
  if (!next && prev) {
    transitioningToDetail.value = false
  }
})

const selectedStrategyModel = computed({
  get: () => selectedStrategyId.value,
  set: value => strategyStore.setSelectedStrategy(value),
})

const canSave = computed(() => !!draftName.value.trim() && hasUnsavedChanges.value && isAuthenticated.value)

const snackbar = ref({ visible: false, text: '', color: 'success' as 'success' | 'error' })

const handleSave = async () => {
  if (!canSave.value) return
  try {
    await strategyStore.saveStrategy(draftName.value.trim())
    draftName.value = ''
    snackbar.value = { visible: true, text: 'Strategy saved', color: 'success' }
  } catch (error) {
    console.error('Failed to save strategy', error)
    snackbar.value = { visible: true, text: 'Failed to save strategy', color: 'error' }
  }
}

const formatUpCard = (value: number) => (value === 1 ? 'A' : value)

const resolveActions = (total: number, upCard: number): PlayerAction[] => {
  const scenarioKey: ScenarioKey = `${total}_${upCard}`
  const rules = strategyStore.getRulesForScenario(scenarioKey)
  if (!rules?.length) return ['Hit']
  const mapped = rules
    .map(rule => actionMap[rule.action.toLowerCase()] ?? null)
    .filter((value): value is PlayerAction => Boolean(value))
  return mapped.length ? mapped : ['Hit']
}

const strategyGrid = computed(() =>
  hardTotals.map(total => ({
    total,
    actions: upcards.map(upCard => resolveActions(total, upCard)),
  })),
)
</script>

<style scoped>
.strategy-tab {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.strategy-tab__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;

  h3 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0.15rem 0 0;
    font-size: 0.85rem;
    opacity: 0.85;
  }
}

.strategy-tab__warning {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #facc15;
}

.strategy-tab__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.strategy-tab__name {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.8rem;

  input {
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.3rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.9rem;
  }
}

.strategy-tab__selector {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;

  select {
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.3rem;
    padding: 0.35rem 0.5rem;
    font-size: 0.9rem;
  }
}

.strategy-tab__save {
  border: 1px solid rgba(34, 197, 94, 0.7);
  color: #fff;
  border-radius: 0.3rem;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  height: fit-content;
}

.strategy-tab__save:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.strategy-tab__panels {
  position: relative;
  min-height: 320px;
}

.strategy-panel {
  position: absolute;
  inset: 0;
  overflow: auto;
  padding: 0.5rem 0.25rem 0.5rem 0;
}

.strategy-panel--detail {
  padding: 0.5rem 0 0.5rem 0;
}

.strategy-panel-forward-enter-active,
.strategy-panel-forward-leave-active,
.strategy-panel-backward-enter-active,
.strategy-panel-backward-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.strategy-panel-forward-enter-from,
.strategy-panel-backward-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.strategy-panel-forward-leave-to,
.strategy-panel-backward-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.strategy-panel-forward-leave-active,
.strategy-panel-backward-leave-active {
  position: absolute;
}

.strategy-chart {
  position: relative;
  display: inline-grid;
  grid-template-columns: 2.5rem repeat(10, 3rem);
  gap: 0;
  width: fit-content;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.strategy-chart__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
}

.strategy-chart__cell--corner,
.strategy-chart__cell--header,
.strategy-chart__cell--row-label {
  z-index: 2;
}

.strategy-chart__cell--corner {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.strategy-chart__cell--header {
  position: sticky;
  top: 0;
  z-index: 2;
}

.strategy-chart__cell--row-label {
  position: sticky;
  left: 0;
  font-size: 0.85rem;
  z-index: 2;
}
</style>
