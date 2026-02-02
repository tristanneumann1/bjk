<template>
  <section class="strategy-tile-detail" aria-label="Strategy tile detail">
    <button class="strategy-tile-detail__back" type="button" @click="$emit('back')">
      ← Back to chart
    </button>
    <h3>Customize Actions</h3>
    <p>
      Selected tile: Hard {{ total }} vs Dealer {{ formattedUpcard }}
    </p>
    <p class="strategy-tile-detail__placeholder">Customization UI coming soon.</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ total: number; upcard: number }>()

const formattedUpcard = computed(() => (props.upcard === 1 ? 'A' : props.upcard))
</script>

<style scoped>
.strategy-tile-detail {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.strategy-tile-detail__back {
  align-self: flex-start;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 0.4rem;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}

.strategy-tile-detail__placeholder {
  margin: 0;
  opacity: 0.8;
}
</style>
