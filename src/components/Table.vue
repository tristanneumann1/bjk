<script setup lang="ts">
import Chair from "@/components/Chair.vue";
import InactiveChair from "@/components/InactiveChair.vue";
import PlayerBalanceDisplay from "@/components/PlayerBalanceDisplay.vue";
import ActionSection from "@/components/ActionSection.vue";
import DealerSection from "@/components/DealerSection.vue";
import { useChairsStore } from '@/stores/chairs'

const { chairs } = useChairsStore()
const chairSlots = [0, 1, 2]
</script>

<template>
  <div class="table-upper">
    <DealerSection />
    <ActionSection />
  </div>

  <div class="table-lower">
    <template v-for="chairId in chairSlots" :key="chairId">
      {{chairs[chairId]?.hands.length}}
      <Chair
        v-if="chairs[chairId]"
        :chair-id="chairId"
        :chair="chairs[chairId]"
      />
      <InactiveChair v-else :chair-id="chairId" />
    </template>
  </div>
  <PlayerBalanceDisplay/>
</template>

<style scoped>
.table-upper {
    width: 100%;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
}
.table-lower {
  width: 100%;
    display: flex;
    gap: 2rem;
    align-items: flex-end;
    justify-content: center;
}
</style>
