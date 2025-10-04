<template>
  <div class="chair" aria-label="Player Spot" :style="{width: '272px' }">
    <div class="hand__top" aria-label="Inactive hands">
      <div class="hand__top-stack hand__top-stack--left" aria-label="Hands before active">
        <span
          v-if="leftHiddenCount > 0"
          class="hand__ellipsis"
          aria-hidden="true"
        >
          {{ '.'.repeat(leftHiddenCount) }}
        </span>
        <button
          v-for="entry in leftStack"
          :key="entry.index"
          class="hand__entry hand__entry--stack"
          type="button"
          role="listitem"
          :style="entry.style"
          :aria-pressed="entry.index === activeHandIndex"
        >
          <CardHand
            :cards="entry.hand"
            :maxWidth="cardHandMaxWidth"
          />
        </button>
      </div>

      <div class="hand__top-stack hand__top-stack--right" aria-label="Hands after active">
        <span
          v-if="rightHiddenCount > 0"
          class="hand__ellipsis"
          aria-hidden="true"
        >
          {{ '.'.repeat(rightHiddenCount) }}
        </span>
        <button
          v-for="entry in rightStack"
          :key="entry.index"
          class="hand__entry hand__entry--stack"
          type="button"
          role="listitem"
          :style="entry.style"
          :aria-pressed="entry.index === activeHandIndex"
        >
          <CardHand
            :cards="entry.hand"
            :maxWidth="cardHandMaxWidth"
          />
        </button>
      </div>
    </div>
    <div class="hand" role="group" aria-label="Card hands">
      <div v-if="activeEntry" class="hand__frame">

        <button
          class="hand__entry hand__entry--active"
          type="button"
          :aria-pressed="true"
        >
          <CardHand
            :cards="activeEntry.hand"
            :large="true"
            :maxWidth="cardHandMaxWidth"
          />
        </button>
      </div>
    </div>
    <BettingSlider
      :initial-value="currentBet"
      @change="onBetChange"
      :disabled="!canAdjustBet"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CardHand from '@/components/CardHand.vue'
import BettingSlider from "@/components/BettingSlider.vue";
import {CARD_SCALE_LARGE, CARD_SCALE_SMALL} from "@/constants.ts";
import { useChairsStore } from '@/stores/chairs'

type CardLike = {
  value?: string | number
  rank?: string | number
  suit?: string
}

type HandEntry = {
  hand: CardLike[]
  index: number
}

const MAX_HAND_SETS = 8
const BASE_SMALL_CARD_HEIGHT = 64 * CARD_SCALE_SMALL
const BASE_LARGE_CARD_HEIGHT = 64 * CARD_SCALE_LARGE
const STACK_OVERLAP = BASE_SMALL_CARD_HEIGHT / 2
const MAX_VISIBLE_STACK = 2

const props = defineProps<{
  chairId: number
  maxWidth?: number
  initialActiveHand?: number
}>()

const chairsStore = useChairsStore()

const chairView = computed(() => chairsStore.getChairView(props.chairId))
if (!chairView.value) throw new Error('Chair not found')

const canAdjustBet = computed(() => !chairsStore.roundInProgress)

const trimmedHands = computed(() => chairView.value?.hands.slice(0, MAX_HAND_SETS) ?? [])

const normalizeHand = (hand: unknown): CardLike[] => {
  if (Array.isArray(hand)) {
    return hand as CardLike[]
  }
  if (hand && typeof hand === 'object' && 'cards' in (hand as Record<string, unknown>)) {
    const cards = (hand as { cards?: CardLike[] }).cards
    return Array.isArray(cards) ? cards : []
  }
  return []
}

const displayHands = computed(() =>
  trimmedHands.value.map(hand => normalizeHand(hand)),
)

const cardHandMaxWidth = computed(() => props.maxWidth)

const currentBet = computed(() => chairView.value?.bet ?? 0)

const handEntries = computed<HandEntry[]>(() =>
  displayHands.value.map((hand, index) => ({ hand, index })),
)

const lastResolvedActiveIndex = ref<number | null>(null)

const resolvedActiveHandIndex = computed(() => {
  const view = chairView.value
  if (!view) {
    lastResolvedActiveIndex.value = null
    return 0
  }

  const { hands, activeHandIndex, displayActiveHandIndex } = view
  const handCount = hands.length
  const inRange = displayActiveHandIndex !== null
    ? displayActiveHandIndex >= 0 && displayActiveHandIndex < handCount
    : activeHandIndex >= 0 && activeHandIndex < handCount

  if (inRange) {
    const resolved = displayActiveHandIndex !== null
      ? displayActiveHandIndex
      : activeHandIndex
    lastResolvedActiveIndex.value = resolved
    return resolved
  }

  if (handCount === 0) {
    lastResolvedActiveIndex.value = null
    return 0
  }

  const fallback = lastResolvedActiveIndex.value !== null && lastResolvedActiveIndex.value < handCount
    ? lastResolvedActiveIndex.value
    : handCount - 1

  lastResolvedActiveIndex.value = fallback
  return fallback
})

watch(
  () => displayHands.value.length,
  length => {
    if (length === 0) {
      lastResolvedActiveIndex.value = null
    }
  },
)

const activeEntry = computed(() =>
  handEntries.value.find(entry => entry.index === resolvedActiveHandIndex.value) ?? null,
)

const activeHandIndex = resolvedActiveHandIndex

const buildStack = (entries: HandEntry[]) =>
  entries.map((entry, stackIndex, source) => ({
    ...entry,
    style: {
      marginTop: stackIndex === 0 ? '0' : `-${STACK_OVERLAP}px`,
      zIndex: source.length - stackIndex,
    } as Record<string, string | number>,
  }))

const leftEntries = computed(() =>
  handEntries.value.filter(entry => entry.index < resolvedActiveHandIndex.value),
)

const rightEntries = computed(() =>
  handEntries.value.filter(entry => entry.index > resolvedActiveHandIndex.value),
)

const leftDisplayEntries = computed(() => leftEntries.value.slice(Math.max(leftEntries.value.length - MAX_VISIBLE_STACK, 0), leftEntries.value.length))
const rightDisplayEntries = computed(() => rightEntries.value.slice(0, Math.min(MAX_VISIBLE_STACK, rightEntries.value.length)).reverse())


const leftHiddenCount = computed(() => Math.max(leftEntries.value.length - leftDisplayEntries.value.length, 0))
const rightHiddenCount = computed(() => Math.max(rightEntries.value.length - rightDisplayEntries.value.length, 0))

const leftStack = computed(() => buildStack(leftDisplayEntries.value))

const rightStack = computed(() => buildStack(rightDisplayEntries.value))

const onBetChange = (value: number) => {
  chairsStore.adjustBet(props.chairId, value)
}
</script>

<style scoped>
.chair {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hand {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
}

.hand__entry {
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: flex-end;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hand__entry:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.hand__entry--active {
  cursor: default;
  opacity: 1;
  transform: translateY(-4px);
}

.hand__frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hand__top {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
}

.hand__top-stack {
  position: unset;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  pointer-events: none;
}

.hand__top-stack--left {
  align-items: flex-start;
}

.hand__top-stack--right {
  align-items: flex-end;
}

.hand__ellipsis {
  font-size: 1.5rem;
  line-height: 0.5;
  margin-bottom: 0.5rem;
  opacity: 0.6;
  letter-spacing: 0.25rem;
}

.hand__entry--stack {
  position: relative;
  pointer-events: auto;
}

.hand__entry--stack:hover,
.hand__entry--stack:focus-visible {
  opacity: 1;
}

</style>
