<template>
  <div class="player-balance" role="status" aria-live="polite">
    <span class="player-balance__value">{{ formattedBalance }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const formattedBalance = computed(() =>
  `$${(playerStore.balance / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`,
)
</script>

<style scoped>
.player-balance {
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0.6rem 0.6rem;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.75);
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.player-balance__value {
  font-size: 1rem;
  font-weight: 600;
}
</style>
