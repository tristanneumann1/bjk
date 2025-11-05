<template>
  <div class="betting-slider" role="group" aria-label="Bet amount selector">
    <div class="betting-slider__body">
      <div class="betting-slider__value" aria-live="polite">
        <button
          type="button"
          class="betting-slider__control"
          aria-label="Decrease bet"
          @click="decrement"
          :disabled="isDisabled || isAtMinimum"
        >
          −
        </button>
        {{ formattedValue }}
        <button
          type="button"
          class="betting-slider__control"
          aria-label="Increase bet"
          @click="increment"
          :disabled="isDisabled || isAtMaximum"
        >
          +
        </button>
      </div>
      <input
        v-show="props.showSlider"
        ref="sliderRef"
        class="betting-slider__range"
        type="range"
        :min="MIN_BET"
        :max="MAX_BET"
        :step="STEP"
        :value="currentValue"
        aria-label="Bet amount slider"
        :disabled="isDisabled"
        @input="onSliderInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const MIN_BET = 0
const MAX_BET = 30000
const STEP = 500

const props = defineProps<{
  initialValue?: number
  showSlider?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (event: 'change', value: number): void
  (event: 'update:value', value: number): void
}>()

const clampToStep = (value: number) => {
  const clamped = Math.min(MAX_BET, Math.max(MIN_BET, value))
  const stepIndex = Math.round((clamped - MIN_BET) / STEP)
  return MIN_BET + stepIndex * STEP
}

const currentValue = ref(clampToStep(props.initialValue ?? MIN_BET))
const isDisabled = computed(() => props.disabled ?? false)

const emitValueChange = () => {
  const value = currentValue.value
  emit('update:value', value)
  emit('change', value)
}

watch(
  () => props.initialValue,
  value => {
    if (value !== undefined && !Number.isNaN(value)) {
      const sanitized = clampToStep(value)
      if (sanitized !== currentValue.value) {
        currentValue.value = sanitized
      }
    }
  },
)

watch(currentValue, emitValueChange)

const isAtMinimum = computed(() => currentValue.value <= MIN_BET)
const isAtMaximum = computed(() => currentValue.value >= MAX_BET)

const formattedValue = computed(() => `$${(currentValue.value / 100).toLocaleString('en-US')}`)

const setValue = (value: number) => {
  currentValue.value = clampToStep(value)
}

const increment = () => {
  if (isDisabled.value) return
  if (isAtMaximum.value) return
  setValue(currentValue.value + STEP)
}

const decrement = () => {
  if (isDisabled.value) return
  if (isAtMinimum.value) return
  setValue(currentValue.value - STEP)
}

const onSliderInput = (event: Event) => {
  if (isDisabled.value) return
  const target = event.target as HTMLInputElement | null
  if (!target) return
  const parsed = Number.parseInt(target.value, 10)
  if (Number.isNaN(parsed)) return
  setValue(parsed)
}
</script>

<style scoped>
.betting-slider {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
}

.betting-slider__control {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 0.5rem;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: inherit;
  font-size: 1rem;
  font-weight: 600;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.betting-slider__control:hover:not(:disabled),
.betting-slider__control:focus-visible {
  background: rgba(255, 255, 255, 0.3);
}

.betting-slider__control:active:not(:disabled) {
  transform: scale(0.95);
}

.betting-slider__control:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.betting-slider__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 7rem;
}

.betting-slider__range {
  width: 100%;
}

.betting-slider__value {
  color: white;
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}
</style>
