/**
 * CommonMistakes — "most common mistakes" analytics for the Stats tab.
 *
 * Default view reads a single cumulative summary doc and renders a hard-totals ×
 * upcard heatmap plus family tag counts. Clicking a heatmap cell or a family tag
 * lazily loads paginated example hands for that slice.
 *
 * Layer: Component
 * Dependencies: useMistakeAnalyticsStore, MistakeHeatmap, CardHand, PlayingCard, ACTION_COLORS
 */

<template>
  <section class="common-mistakes" aria-label="Common mistakes">
    <header class="common-mistakes__header">
      <h3>Common Mistakes</h3>
      <p class="common-mistakes__subtitle">Where your decisions diverge from strategy (all-time).</p>
    </header>

    <p v-if="!hasUser" class="common-mistakes__status">Log in to track mistakes across games.</p>
    <p v-else-if="isLoading" class="common-mistakes__status">Loading…</p>
    <p v-else-if="total === 0" class="common-mistakes__status">
      No mistakes logged yet — play a few hands to see your patterns.
    </p>

    <template v-else>
      <MistakeHeatmap :cells="hardCells" :max="maxCell" :selected="selectedCell" @selectCell="onSelectCell" />

      <div class="common-mistakes__families" role="group" aria-label="Mistakes by type">
        <button
          v-for="entry in familyRollup"
          :key="entry.family"
          type="button"
          class="family-chip"
          :class="{ 'family-chip--active': isFamilyActive(entry.family) }"
          @click="onSelectFamily(entry.family)"
        >
          {{ familyLabel(entry.family) }} <span class="family-chip__count">{{ entry.count }}</span>
        </button>
      </div>

      <section v-if="activeFilter" class="common-mistakes__drill" aria-label="Mistake examples">
        <header class="common-mistakes__drill-header">
          <h4>{{ drillTitle }}</h4>
          <button type="button" class="common-mistakes__close" @click="closeExamples">✕</button>
        </header>

        <p v-if="isLoadingExamples && !examples.length" class="common-mistakes__status">Loading examples…</p>
        <p v-else-if="!examples.length" class="common-mistakes__status">No examples found.</p>

        <ul v-else class="example-list">
          <li v-for="example in examples" :key="example.id" class="example-list__item">
            <div class="example-list__hand">
              <label>Hand</label>
              <CardHand :cards="example.cards ?? []" :maxWidth="150" />
            </div>
            <div class="example-list__upcard">
              <label>Upcard</label>
              <PlayingCard :rank="example.upCard?.rank" :suit="example.upCard?.suit" />
            </div>
            <div class="example-list__count">
              <label>True Count</label>
              <p>{{ formatTrueCountRange(example.startingTrueCountLower, example.startingTrueCountUpper) }}</p>
            </div>
            <div class="example-list__actions">
              <span class="action-pill" :style="pillStyle(example.chosenAction)">{{ example.chosenAction }}</span>
              <span class="example-list__arrow">→</span>
              <span
                v-for="action in uniqueActions(example.expectedAction)"
                :key="action"
                class="action-pill"
                :style="pillStyle(action)"
              >{{ action }}</span>
            </div>
          </li>
        </ul>

        <button
          v-if="examplesHasMore"
          type="button"
          class="common-mistakes__more"
          :disabled="isLoadingExamples"
          @click="loadMoreExamples"
        >
          {{ isLoadingExamples ? 'Loading…' : 'Load more' }}
        </button>
      </section>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMistakeAnalyticsStore } from '@/stores/mistakeAnalytics'
import MistakeHeatmap from '@/components/MistakeHeatmap.vue'
import CardHand from '@/components/CardHand.vue'
import PlayingCard from '@/components/PlayingCard.vue'
import { ACTION_COLORS } from '@/constants'
import { formatTrueCountRange, formatUpcard } from '@/models/analytics/mistakeLabels'
import type { MistakeFamily } from '@/types/analytics'
import type { PlayerAction } from '@/types/actions'

const store = useMistakeAnalyticsStore()
const {
  total,
  familyRollup,
  hardCells,
  maxCell,
  isLoading,
  hasUser,
  activeFilter,
  examples,
  examplesHasMore,
  isLoadingExamples,
} = storeToRefs(store)
const { showExamples, loadMoreExamples, closeExamples } = store

const onSelectCell = (cellTotal: number, upcard: number) =>
  showExamples({ type: 'cell', total: cellTotal, upcard })
const onSelectFamily = (family: MistakeFamily) => showExamples({ type: 'family', family })

const selectedCell = computed(() =>
  activeFilter.value?.type === 'cell'
    ? { total: activeFilter.value.total, upcard: activeFilter.value.upcard }
    : null,
)

const isFamilyActive = (family: MistakeFamily) =>
  activeFilter.value?.type === 'family' && activeFilter.value.family === family

const FAMILY_LABELS: Record<MistakeFamily, string> = {
  insurance: 'Insurance',
  surrender: 'Surrender',
  pairs: 'Pairs',
  soft: 'Soft hands',
  'hard-stiff': 'Hard 12–16',
  deviation: 'Deviations',
  basic: 'Basic strategy',
}
const familyLabel = (family: MistakeFamily) => FAMILY_LABELS[family] ?? family

const drillTitle = computed(() => {
  const filter = activeFilter.value
  if (!filter) return ''
  return filter.type === 'cell'
    ? `Hard ${filter.total} vs ${formatUpcard(filter.upcard)}`
    : familyLabel(filter.family)
})

const uniqueActions = (actions: PlayerAction[]): PlayerAction[] => Array.from(new Set(actions))
const pillStyle = (action: PlayerAction) => ({
  backgroundColor: ACTION_COLORS[action]?.color,
  color: ACTION_COLORS[action]?.text,
})
</script>

<style scoped>
.common-mistakes {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.common-mistakes__header h3 {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.common-mistakes__subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  opacity: 0.7;
}

.common-mistakes__status {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.6;
  padding: 1rem 0;
}

.common-mistakes__families {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.family-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.family-chip--active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
}

.family-chip__count {
  font-size: 0.72rem;
  opacity: 0.7;
}

.common-mistakes__drill {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 0.6rem;
}

.common-mistakes__drill-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.common-mistakes__drill-header h4 {
  margin: 0;
  font-size: 0.9rem;
}

.common-mistakes__close {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
  font-size: 0.9rem;
}

.example-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.example-list__item {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  gap: 0.75rem;
  align-items: center;
  padding: 0.6rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.6rem;
  background: rgba(0, 0, 0, 0.25);
}

.example-list__hand label,
.example-list__upcard label,
.example-list__count label {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
  margin-bottom: 0.25rem;
}

.example-list__count p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fbbf24;
}

.example-list__actions {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.example-list__arrow {
  opacity: 0.6;
}

.common-mistakes__more {
  align-self: flex-start;
  padding: 0.35rem 0.9rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 0.8rem;
}

.action-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-transform: capitalize;
}
</style>
