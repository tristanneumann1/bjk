<script setup lang="ts">
import Chair from "@/components/Chair.vue";
import InactiveChair from "@/components/InactiveChair.vue";
import PlayerBalanceDisplay from "@/components/PlayerBalanceDisplay.vue";
import ActionSection from "@/components/ActionSection.vue";
import DealerSection from "@/components/DealerSection.vue";
import { useChairsStore } from '@/stores/chairs'
import { useGameStore } from '@/stores/game'

const chairStore = useChairsStore()
useGameStore()
const chairSlots = [0, 1, 2]
</script>

<template>
  <div class="table-upper">
    <DealerSection />
    <ActionSection />
  </div>

  <div class="table-lower">
    <template v-for="chairId in chairSlots" :key="chairId">
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
