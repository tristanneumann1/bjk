<template>
  <section class="strategy-tab" aria-label="Strategy chart preview">
    <header class="strategy-tab__header">
      <h3>Strategy Preview</h3>
      <p>Compact view of recent hard totals. Full chart coming soon.</p>
    </header>
    <div class="strategy-tab__grid">
      <StrategyActionButton
        v-for="index in 9"
        :key="index"
        :actions="placeholderActions"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import StrategyActionButton, { type StrategyActionType } from '@/components/strategy/StrategyActionButton.vue'

const placeholderActions: StrategyActionType[] = ['split', 'hit']
</script>

<style scoped>
.strategy-tab {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.strategy-tab__header {
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

.strategy-tab__grid {
  display: inline-grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  width: fit-content;
  max-width: 100%;
}
</style>
