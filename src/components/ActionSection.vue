<template>
  <section class="action-section" aria-label="Player actions">
    <button
      v-for="action in actions"
      :key="action"
      class="action-section__button"
      type="button"
      :disabled="!playerActions.isEnabled(action)"
      @click="onActionClick(action)"
    >
      {{ action }}
    </button>
  </section>
</template>

<script setup lang="ts">
import { PLAYER_ACTIONS, type PlayerAction, usePlayerActionsStore } from '@/stores/playerActions'

const playerActions = usePlayerActionsStore()
const actions = PLAYER_ACTIONS

const onActionClick = (action: PlayerAction) => {
  playerActions.triggerAction(action)
}
</script>

<style scoped>
.action-section {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 20rem;
}

.action-section__button {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease, opacity 0.2s ease;
}

.action-section__button:hover:not(:disabled),
.action-section__button:focus-visible {
  background: rgba(255, 255, 255, 0.25);
}

.action-section__button:active:not(:disabled) {
  transform: scale(0.97);
}

.action-section__button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
