<template>
  <div class="stats-tab">
    <h3 class="stats-tab__heading">Bankroll</h3>
    <p v-if="isLoading" class="stats-tab__loading">Loading...</p>
    <BankrollChart v-else :data="bankrollHistory" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBankrollStore } from '@/stores/bankroll'
import BankrollChart from '@/components/BankrollChart.vue'

const bankrollStore = useBankrollStore()
const { bankrollHistory, isLoading } = storeToRefs(bankrollStore)
</script>

<style scoped>
.stats-tab {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.stats-tab__heading {
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stats-tab__loading {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.6;
}
</style>
