<template>
  <div class="game-tab">
    <p class="game-tab__intro">Customize the next shoe before you deal a new round.</p>
    <v-text-field
      type="number"
      variant="outlined"
      hide-details="auto"
      min="1"
      :max="gameStore.maxPenetration"
      density="compact"
      label="Penetration (cards remaining)"
      :model-value="gameStore.pendingPenetration"
      @update:model-value="handlePenetrationChange"
    />
    <p class="game-tab__note">Applies after the next reshuffle and will be recorded for future games.</p>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const handlePenetrationChange = (value: string | number) => {
  const numericValue = typeof value === 'number' ? value : parseFloat(value)
  if (!Number.isNaN(numericValue)) {
    gameStore.setPenetration(numericValue)
  }
}
</script>

<style scoped>
.game-tab {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.game-tab__intro {
  margin: 0;
}

.game-tab__note {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
