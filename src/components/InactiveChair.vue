<template>
  <div class="chair" aria-label="Player Spot" :style="{ width: '272px' }">
    <button
      class="chair__empty-button"
      type="button"
      aria-label="Sit at this chair"
      :disabled="chairsStore.roundInProgress"
      @click="onSitClick"
    >
      <span aria-hidden="true">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useChairsStore } from '@/stores/chairs'

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
  font-size: 4rem;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.chair__empty-button:hover,
.chair__empty-button:focus-visible {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
}
</style>
