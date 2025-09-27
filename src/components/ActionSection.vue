<template>
  <section class="action-section" aria-label="Player actions">
    <button
      v-if="!isActiveRound"
      class="action-section__play"
      type="button"
      :disabled="isPlayDisabled"
    >
      Play
    </button>
    <template v-else>
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
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PLAYER_ACTIONS, type PlayerAction, usePlayerActionsStore } from '@/stores/playerActions'

const props = defineProps<{
  activeRound?: boolean
  active?: boolean
}>()

const playerActions = usePlayerActionsStore()
const actions = PLAYER_ACTIONS

const isActiveRound = computed(() => props.activeRound !== false)
const isPlayDisabled = computed(() => props.active === false)

const onActionClick = (action: PlayerAction) => {
  playerActions.triggerAction(action)
}
</script>

<style scoped>
.action-section {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
  max-width: 30rem;
}

.action-section__button {
  padding: 0.75rem 0.75rem;
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

.action-section__play {
  grid-column: span 3;
  padding: 1.5rem;
  margin: 2rem;
  border: none;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(67, 160, 71, 0.95), rgba(56, 142, 60, 0.85));
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(56, 142, 60, 0.35);
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.action-section__play:hover,
.action-section__play:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(56, 142, 60, 0.4);
  filter: brightness(1.05);
}

.action-section__play:active {
  transform: translateY(1px);
}

.action-section__play:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
  transform: none;
  filter: none;
}
</style>
