<template>
  <section class="strategy-tab" aria-label="Strategy chart preview">
    <header class="strategy-tab__header">
      <div>
        <h3>Strategy Preview</h3>
        <p>Hard totals versus dealer upcards (based on selected strategy).</p>
      </div>
      <label class="strategy-tab__selector">
        <span>Strategy</span>
        <select v-model="selectedStrategyModel">
          <option v-for="strategy in strategies" :key="strategy.id" :value="strategy.id">
            {{ strategy.name }}
          </option>
        </select>
      </label>
    </header>
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
        />
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import StrategyActionButton, { type StrategyActionType } from '@/components/strategy/StrategyActionButton.vue'
import { STRATEGIES } from '@/models/strategy/strategies'
import { useGameStore } from '@/stores/game'
import type {ScenarioKey, StrategyGrid} from "@/types/strategies.ts";

const hardTotals = Array.from({ length: 19 }, (_, index) => 2 + index)
const upcards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1]

const strategies = STRATEGIES

const actionMap: Record<string, StrategyActionType> = {
  hit: 'hit',
  stand: 'stand',
  double: 'double',
  split: 'split',
  surrender: 'surrender',
}

const gameStore = useGameStore()
const { selectedStrategyId } = storeToRefs(gameStore)

const selectedStrategyModel = computed({
  get: () => selectedStrategyId.value,
  set: value => gameStore.setSelectedStrategy(value),
})

const selectedStrategy = computed<StrategyGrid>(() =>
  strategies.find(strategy => strategy.id === selectedStrategyId.value) ?? strategies[0],
)

const formatUpCard = (value: number) => (value === 1 ? 'A' : value)

const resolveActions = (total: number, upCard: number): StrategyActionType[] => {
  const scenarioKey: ScenarioKey = `${total}_${upCard}`
  const rules = selectedStrategy.value?.[scenarioKey]
  if (!rules?.length) return ['hit']
  const mapped = rules
    .map(rule => actionMap[rule.action.toLowerCase()] ?? null)
    .filter((value): value is StrategyActionType => Boolean(value))
  return mapped.length ? mapped : ['hit']
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

.strategy-chart {
  display: inline-grid;
  grid-template-columns: 2.5rem repeat(10, 3rem);
  gap: 0;
  width: fit-content;
  max-width: 100%;
  overflow: auto;
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
  background: rgba(0, 0, 0, 0.4);
}

.strategy-chart__cell--corner {
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
}

.strategy-chart__cell--header,
.strategy-chart__cell--row-label {
  background: rgba(255, 255, 255, 0.08);
}

.strategy-chart__cell--row-label {
  font-size: 0.85rem;
}
</style>
