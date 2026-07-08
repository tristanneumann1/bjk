/**
 * MistakeHeatmap — hard player totals (rows) × dealer upcard (cols), each cell
 * shaded by mistake frequency so peaks are visible at a glance. Clicking a cell
 * with mistakes drills into example hands.
 *
 * Layer: Component
 * Props: cells — `${total}_${upcard}` → count; max — largest count (gradient scale)
 * Emits: selectCell(total, upcard)
 */

<template>
  <div class="mistake-heatmap" role="table" aria-label="Mistakes by hard total and dealer upcard">
    <div class="mistake-heatmap__cell mistake-heatmap__corner">Hard</div>
    <div
      v-for="upcard in upcards"
      :key="`h-${upcard}`"
      class="mistake-heatmap__cell mistake-heatmap__header"
    >
      {{ formatUpcard(upcard) }}
    </div>

    <template v-for="total in hardTotals" :key="`r-${total}`">
      <div class="mistake-heatmap__cell mistake-heatmap__row-label">{{ total }}</div>
      <button
        v-for="upcard in upcards"
        :key="`c-${total}-${upcard}`"
        type="button"
        class="mistake-heatmap__cell mistake-heatmap__data"
        :class="{ 'mistake-heatmap__data--active': count(total, upcard) > 0, 'mistake-heatmap__data--selected': isSelected(total, upcard) }"
        :style="cellStyle(count(total, upcard))"
        :disabled="count(total, upcard) === 0"
        :title="`Hard ${total} vs ${formatUpcard(upcard)}: ${count(total, upcard)} mistake${count(total, upcard) === 1 ? '' : 's'}`"
        @click="emit('selectCell', total, upcard)"
      >
        {{ count(total, upcard) || '' }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { formatUpcard } from '@/models/analytics/mistakeLabels'

const props = defineProps<{
  cells: Record<string, number>
  max: number
  selected?: { total: number; upcard: number } | null
}>()

const emit = defineEmits<{ (e: 'selectCell', total: number, upcard: number): void }>()

const hardTotals = Array.from({ length: 19 }, (_, i) => 2 + i)
const upcards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1]

const count = (total: number, upcard: number) => props.cells[`${total}_${upcard}`] ?? 0

const isSelected = (total: number, upcard: number) =>
  props.selected?.total === total && props.selected?.upcard === upcard

const cellStyle = (value: number) => {
  if (value <= 0 || props.max <= 0) return {}
  // WHY: floor at 0.18 so even a single mistake is visible, scale up to 1 at the peak.
  const intensity = 0.18 + 0.82 * (value / props.max)
  return { backgroundColor: `rgba(239, 68, 68, ${intensity.toFixed(3)})` }
}
</script>

<style scoped>
.mistake-heatmap {
  display: grid;
  grid-template-columns: 2.2rem repeat(10, minmax(0, 1fr));
  gap: 1px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.12);
}

.mistake-heatmap__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  min-height: 1.6rem;
}

.mistake-heatmap__corner,
.mistake-heatmap__header,
.mistake-heatmap__row-label {
  letter-spacing: 0.03em;
  opacity: 0.9;
}

.mistake-heatmap__data {
  border: none;
  cursor: pointer;
  color: #fff;
  font: inherit;
  background: rgba(0, 0, 0, 0.55);
}

.mistake-heatmap__data:disabled {
  cursor: default;
}

.mistake-heatmap__data--active:hover {
  outline: 1px solid rgba(255, 255, 255, 0.6);
  outline-offset: -1px;
}

.mistake-heatmap__data--selected {
  outline: 2px solid #fff;
  outline-offset: -2px;
}
</style>
