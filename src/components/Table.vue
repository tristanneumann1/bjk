<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Chair from '@/components/Chair.vue'
import InactiveChair from '@/components/InactiveChair.vue'
import PlayerBalanceDisplay from '@/components/PlayerBalanceDisplay.vue'
import ActionSection from '@/components/ActionSection.vue'
import DealerSection from '@/components/DealerSection.vue'
import RoundSummary from '@/components/RoundSummary.vue'
import TrueCountGuessPrompt from '@/components/TrueCountGuessPrompt.vue'
import { useChairsStore } from '@/stores/chairs'
import { useGameStore } from '@/stores/game'
import {useDealerStore} from "@/stores/dealer.ts";
import { useSettingsStore } from '@/stores/settings'
import { useStatsStore } from '@/stores/stats'

useGameStore()
const chairStore = useChairsStore()
const dealerStore = useDealerStore()
const settingsStore = useSettingsStore()
const statsStore = useStatsStore()

const guessSubmitted = ref(false)
const chairSlots = [0, 1, 2]
const showSummary = computed(() => !chairStore.roundInProgress && dealerStore.pastPenetration)
const shouldPromptTrueCount = computed(() => showSummary.value && !settingsStore.showCounter && !guessSubmitted.value)
const shouldShowChairs = computed(() => !showSummary.value || shouldPromptTrueCount.value)

watch(

  () => dealerStore.pastPenetration,
  value => {
    if (!value) {
      guessSubmitted.value = false
    }
  },
)

const handleGuessSubmit = (guess: number | null) => {
  statsStore.submitCountGuess(guess)
  guessSubmitted.value = true
}
</script>

<template>
  <div class="table-upper">
    <DealerSection />
    <ActionSection />
  </div>

  <div class="table-lower">
    <TrueCountGuessPrompt v-if="shouldPromptTrueCount" @submit="handleGuessSubmit" />
    <div v-else-if="showSummary" class="summary-container">
      <RoundSummary />
    </div>
    <template v-if="shouldShowChairs">
      <template v-for="chairId in chairSlots" :key="chairId">
        <Chair
          v-if="chairStore.getChairView(chairId)"
          :chair-id="chairId"
        />
        <InactiveChair v-else :chair-id="chairId" />
      </template>
    </template>
  </div>
  <PlayerBalanceDisplay/>
</template>

<style scoped>
.table-upper {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(320px, 2fr);
  align-items: start;
  margin-bottom: 1rem;
}
.table-lower {
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: center;
}

.summary-container {
  width: 100%;
  display: block;
}

@media (max-width: 768px) {
  .table-upper {
    grid-template-columns: 1fr;
  }

  .table-upper > :deep(*) {
    width: 100%;
  }

  .table-lower {
    flex-direction: column;
    align-items: center;
  }
}
</style>
