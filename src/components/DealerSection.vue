<template>
  <section class="dealer-section" aria-label="Dealer hand">
    <div class="dealer-section__count" aria-live="polite">
      Running Count: <span class="dealer-section__count-value">{{ formattedRunningCount }}</span>
    </div>
    <div class="dealer-section__content">
      <div class="dealer-shoe" aria-label="Remaining shoe">
        <div class="dealer-shoe__track">
          <div class="dealer-shoe__fill" :style="{ height: `${shoeFillPercent}%` }" />
        </div>
      </div>
      <CardHand :cards="dealer.cards" :maxWidth="handMaxWidth" large />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardHand from '@/components/CardHand.vue'
import { useDealerStore } from '@/stores/dealer'

const dealer = useDealerStore()

const handMaxWidth = computed(() => 360)

const shoeFillPercent = computed(() => {
  const total = dealer.totalShoeSize || 1
  const fraction = total > 0 ? dealer.remainingShoeSize / total : 0
  return Math.max(0, Math.min(100, Math.round(fraction * 100)))
})

const formattedRunningCount = computed(() => {
  const count = dealer.runningCount
  const sign = count > 0 ? '+' : ''
  return `${sign}${count}`
})
</script>

<style scoped>
.dealer-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
}

.dealer-section__count {
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.8;
}

.dealer-section__count-value {
  font-weight: 600;
}

.dealer-section__content {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.dealer-shoe {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 3.5rem;
}

.dealer-shoe__track {
  position: relative;
  width: 1.5rem;
  height: 6rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.dealer-shoe__fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(76, 201, 240, 0.9), rgba(12, 92, 228, 0.9));
  transition: height 0.3s ease;
}
</style>
