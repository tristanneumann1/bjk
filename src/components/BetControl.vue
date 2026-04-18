<template>
  <div
    class="bet-control"
    role="group"
    aria-label="Bet amount"
  >
    <button
      type="button"
      class="bet-control__button bet-control__button--minus"
      aria-label="Decrease bet"
      :disabled="disabled || atMin"
      @click="onDecrement"
    >
      <span aria-hidden="true">−</span>
    </button>
    <span class="bet-control__value" aria-live="polite">{{ formattedValue }}</span>
    <button
      type="button"
      class="bet-control__button bet-control__button--plus"
      aria-label="Increase bet"
      :disabled="disabled || atMax"
      @click="onIncrement"
    >
      <span aria-hidden="true">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import {
  isAtMaxSpread,
  isAtMinSpread,
  nextSpreadValue,
  prevSpreadValue,
} from '@/lib/betSpread'

const props = defineProps<{
  value: number
  disabled?: boolean
}>()

const emit = defineEmits<{ change: [value: number] }>()

const settingsStore = useSettingsStore()
const spread = computed(() => settingsStore.betSpread)

const atMin = computed(() => isAtMinSpread(props.value, spread.value))
const atMax = computed(() => isAtMaxSpread(props.value, spread.value))

const formattedValue = computed(() => `$${(props.value / 100).toLocaleString('en-US')}`)

const onIncrement = () => {
  if (props.disabled || atMax.value) return
  const next = nextSpreadValue(props.value, spread.value)
  if (next !== props.value) emit('change', next)
}

const onDecrement = () => {
  if (props.disabled || atMin.value) return
  const prev = prevSpreadValue(props.value, spread.value)
  if (prev !== props.value) emit('change', prev)
}
</script>

<style scoped>
.bet-control {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #fff;
  user-select: none;
}

.bet-control__value {
  font-size: 0.9rem;
  font-weight: 600;
  min-width: 3.2rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}

.bet-control__button {
  position: relative;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.3);
  color: inherit;
  font-size: 0.95rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, opacity 0.15s ease, transform 0.08s ease;
}

.bet-control__button::before {
  content: '';
  position: absolute;
  inset: -6px;
}

.bet-control__button:hover:not(:disabled),
.bet-control__button:focus-visible:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
}

.bet-control__button:active:not(:disabled) {
  transform: scale(0.92);
}

.bet-control__button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
