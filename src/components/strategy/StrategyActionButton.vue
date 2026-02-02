<template>
  <button
    class="strategy-action-button"
    type="button"
    :style="{ backgroundImage: gradientBackground }"
    @click="emit('select')"
  >
    <span class="strategy-action-button__label">
      {{ labelText }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {type PlayerAction} from "@/types/actions.ts";

const emit = defineEmits<{ select: [] }>()

const props = withDefaults(defineProps<{ actions?: PlayerAction[] }>(), {
  actions: () => ['Split', 'Hit', 'Stand'] as PlayerAction[],
})

const actionMap: Record<PlayerAction, { label: string; color: string }> = {
  Hit: { label: 'H', color: '#f5f5f5' },
  Stand: { label: 'S', color: '#fde047' },
  Double: { label: 'D', color: '#f472b6' },
  Split: { label: 'Y', color: '#38bdf8' },
  Surrender: { label: 'R', color: '#f97316' },
  Insurance: { label: 'I', color: '#000000' },
}

const resolvedActions = computed(() => props.actions.slice(0, 4))
const hasOverflow = computed(() => props.actions.length > 4)

const labelText = computed(() => {
  const labels = resolvedActions.value.map(action => actionMap[action].label).join('.')
  return hasOverflow.value ? `${labels}+` : labels
})

const gradientBackground = computed(() => {
  const actions = resolvedActions.value
  if (!actions.length) return 'none'
  const segmentSize = 100 / actions.length
  const segments = actions.map((action, index) => {
    const start = index * segmentSize
    const end = (index + 1) * segmentSize
    return `${actionMap[action].color} ${start}% ${end}%`
  })
  return `linear-gradient(120deg, ${segments.join(', ')})`
})
</script>

<style scoped>
.strategy-action-button {
  aspect-ratio: 1;
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem;
  color: #111;
  font-weight: 600;
  font-size: 0.5rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.strategy-action-button__label {
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
}
</style>
