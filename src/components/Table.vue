<script setup lang="ts">
import { computed } from 'vue'
import Chair from '@/components/Chair.vue'
import InactiveChair from '@/components/InactiveChair.vue'
import PlayerBalanceDisplay from '@/components/PlayerBalanceDisplay.vue'
import ActionSection from '@/components/ActionSection.vue'
import DealerSection from '@/components/DealerSection.vue'
import RoundSummary from '@/components/RoundSummary.vue'
import { useChairsStore } from '@/stores/chairs'
import { useGameStore } from '@/stores/game'
import {useDealerStore} from "@/stores/dealer.ts";

useGameStore()
const chairStore = useChairsStore()
const dealerStore = useDealerStore()

const chairSlots = [0, 1, 2]
const showSummary = computed(() => !chairStore.roundInProgress && dealerStore.pastPenetration)
</script>

<template>
  <div class="table-upper">
    <DealerSection />
    <ActionSection />
  </div>

  <div class="table-lower">
    <RoundSummary v-if="showSummary" />
    <template v-else v-for="chairId in chairSlots" :key="chairId">
      <Chair
        v-if="chairStore.getChairView(chairId)"
        :chair-id="chairId"
      />
      <InactiveChair v-else :chair-id="chairId" />
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
