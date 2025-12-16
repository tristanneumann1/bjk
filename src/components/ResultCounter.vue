<template>
  <Transition name="result-counter">
    <div
      v-if="visible"
      class="result-counter"
      :class="variantClass"
      role="status"
      aria-live="polite"
    >
      <span class="result-counter__prefix">{{ prefix }}</span>
      <span class="result-counter__value">{{ formattedValue }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { ResultVariant } from '@/types/results'

type Direction = 'up' | 'down'

const props = defineProps<{ amount: number; active: boolean; durationMs?: number; variant?: ResultVariant; direction?: Direction }>()

const displayValue = ref(0)
const visible = ref(false)
let rafId: number | null = null

const resolvedVariant = computed<ResultVariant>(() => props.variant ?? 'loss')
const resolvedDirection = computed<Direction>(() => props.direction ?? (resolvedVariant.value === 'win' ? 'up' : 'down'))
const duration = computed(() => props.durationMs ?? 900)

const prefix = computed(() => {
  if (resolvedVariant.value === 'win') return '+'
  if (resolvedVariant.value === 'loss') return '-'
  return '±'
})

const variantClass = computed(() => `result-counter--${resolvedVariant.value}`)

const cancelAnimation = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const animateValue = () => {
  cancelAnimation()
  const targetAmount = Math.max(props.amount, 0)
  const direction = resolvedDirection.value
  if (!props.active || targetAmount <= 0) {
    visible.value = false
    displayValue.value = direction === 'down' ? targetAmount : 0
    return
  }

  visible.value = true
  const startValue = direction === 'down' ? targetAmount : 0
  const endValue = direction === 'down' ? 0 : targetAmount
  const range = endValue - startValue
  const startTime = performance.now()

  const tick = (time: number) => {
    const elapsed = time - startTime
    const progress = Math.min(elapsed / duration.value, 1)
    const nextValue = startValue + range * progress
    displayValue.value = Math.round(nextValue)
    if (progress < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = null
      visible.value = false
    }
  }

  displayValue.value = startValue
  rafId = requestAnimationFrame(tick)
}

watch(
  () => ({ amount: props.amount, active: props.active, direction: resolvedDirection.value }),
  (current, previous) => {
    const { amount, active } = current
    const prevAmount = previous?.amount
    const prevActive = previous?.active
    if (amount <= 0) {
      visible.value = false
      cancelAnimation()
      displayValue.value = 0
      return
    }

    if (!active) {
      cancelAnimation()
      visible.value = false
      displayValue.value = resolvedDirection.value === 'down' ? Math.max(amount, 0) : 0
      return
    }

    if (active && (!prevActive || amount !== prevAmount)) {
      animateValue()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  cancelAnimation()
})

const formattedValue = computed(() => displayValue.value.toLocaleString())
</script>

<style scoped>
.result-counter-enter-active,
.result-counter-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.result-counter-enter-from,
.result-counter-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px);
}

.result-counter {
  position: absolute;
  left: 50%;
  bottom: -1.5rem;
  transform: translate(-50%, 0);
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: baseline;
  gap: 0.15rem;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
}

.result-counter--loss {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(248, 113, 113, 0.7);
  color: #fef2f2;
}

.result-counter--win {
  background: rgba(22, 101, 52, 0.9);
  border: 1px solid rgba(187, 247, 208, 0.8);
  color: #ecfccb;
}

.result-counter--push {
  background: rgba(30, 64, 175, 0.85);
  border: 1px solid rgba(147, 197, 253, 0.8);
  color: #dbeafe;
}

.result-counter__prefix {
  font-size: 0.85em;
}

.result-counter__value {
  min-width: 1.5rem;
}
</style>
