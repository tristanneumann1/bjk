<template>
  <section class="action-section" aria-label="Player actions">
    <button
      v-if="!activeRound"
      class="action-section__play action-section__content"
      type="button"
      :disabled="!roundCanStart && !needsReshuffle"
      @click="onPlayClick()"
    >
      {{ needsReshuffle ? 'Reshuffle' : 'Play' }}
    </button>
    <template v-else>
      <div class="action-section__content action-section__actions">
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
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { PLAYER_ACTIONS, usePlayerActionsStore } from '@/stores/playerActions'
import { type PlayerAction } from '@/types/actions.ts'
import {
  modelCustomEvent,
  modelEvents,
  type ModelPropertyChangeEvent,
  modelPropertyEvent
} from "@/lib/mitt.ts";
import {NEW_CARD_EVENT} from "@/models/hand.ts";
import {Session} from "@/models/session.ts";
import {CHAIR_EVENT} from "@/models/table.ts";
import {useDealerStore} from '@/stores/dealer'

const activeRound = ref<boolean>(false)
const roundCanStart = ref<boolean>(false)
const needsReshuffle = ref<boolean>(false)

const playerActions = usePlayerActionsStore()
const dealerStore = useDealerStore()
const actions = PLAYER_ACTIONS

const onActionClick = (action: PlayerAction) => {
  playerActions.triggerAction(action)
}

const onPlayClick = () => {
  // If shoe is nearly over, reshuffle before starting the round
  if (needsReshuffle.value) {
    playerActions.reshuffle()
    return
  }
  playerActions.play()
}

function setCurrentActions() {
  const table = Session.getInstance().table
  needsReshuffle.value = dealerStore.pastPenetration
  roundCanStart.value = !table.validateRoundCanStart()
  if (!table.aPlayerHasCards) {
    activeRound.value = false
    return;
  }
  const activeChair = table.activeChair
  if (!activeChair) return

  const activeHand = activeChair.activeHand
  if (!activeHand) return
  activeRound.value = true

  const viableActions = activeChair.listViableActions()
  if (viableActions) playerActions.setMany(viableActions)
}

/*
  Event Listeners
  TODO: simplify
 */
modelEvents.on(modelPropertyEvent('chair', 'activeHandIndex'), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
});

modelEvents.on(modelCustomEvent('hand', NEW_CARD_EVENT), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
})

modelEvents.on(modelPropertyEvent('chair', 'bet'), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
})

modelEvents.on(modelPropertyEvent('table', 'chairTurnIndex'), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
})

modelEvents.on(modelCustomEvent('table', CHAIR_EVENT), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
})

modelEvents.on(modelPropertyEvent('dealer', 'dealIndex'), (_event: ModelPropertyChangeEvent) => {
  setCurrentActions()
})

/*
  End Event Listeners
 */
</script>

<style scoped>
.action-section {
  display: grid;
  width: 100%;
  max-width: 30rem;
}

.action-section__content {
  padding: 0.5rem;
}

.action-section__actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.action-section__button {
  padding: 0.75rem 0;
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
