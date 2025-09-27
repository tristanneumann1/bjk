<script setup lang="ts">
import Chair from "@/components/Chair.vue";
import PlayerBalanceDisplay from "@/components/PlayerBalanceDisplay.vue";
import ActionSection from "@/components/ActionSection.vue";
import DealerSection from "@/components/DealerSection.vue";
</script>

<template>
  <div class="table-upper">
    <DealerSection />
    <ActionSection :active="false"/>
  </div>

  <div class="table-lower">
    <Chair :hands="[]" inactive />
    <Chair :hands="[]" inactive />
    <Chair :hands="[]" inactive />
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
