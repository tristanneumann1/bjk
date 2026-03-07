<template>
  <div class="chair" aria-label="Player Spot" :style="{ width: '272px' }">
    <button
      class="chair__empty-button"
      type="button"
      aria-label="Sit at this chair"
      :disabled="chairsStore.roundInProgress"
      @click="onSitClick"
    >
      <span
        v-if="chairsStore.roundInProgress"
        class="chair__inactive-label"
      >
        Round Active
      </span>
      <svg v-else aria-hidden="true" class="chair__seat-icon" viewBox="0 0 24 24">
        <path :d="seatIcon" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { mdiAccountPlus } from '@mdi/js'
import { useChairsStore } from '@/stores/chairs'

const seatIcon = mdiAccountPlus

const props = defineProps<{
  chairId: number
}>()

const chairsStore = useChairsStore()

const onSitClick = () => {
  if (chairsStore.roundInProgress) return
  chairsStore.sit(props.chairId)
}
</script>

<style scoped>
.chair {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chair__empty-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.chair__empty-button:hover,
.chair__empty-button:focus-visible {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
}

.chair__empty-button:disabled {
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
  transform: none;
}

.chair__seat-icon {
  width: 52px;
  height: 52px;
  fill: currentColor;
}

.chair__inactive-label {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>
