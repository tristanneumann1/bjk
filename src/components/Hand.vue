<template>
  <div class="player-spot" aria-label="Player Spot" :style="{width: '272px' }">
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
          @click="setActiveHand(entry.index)"
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
          @click="setActiveHand(entry.index)"
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
          @click="setActiveHand(activeEntry.index)"
        >
          <CardHand
            :cards="activeEntry.hand"
            :large="true"
            :maxWidth="cardHandMaxWidth"
          />
        </button>
      </div>
    </div>
    <BettingSlider :initial-value="15" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CardHand from '@/components/CardHand.vue'
import BettingSlider from "@/components/BettingSlider.vue";
import {CARD_SCALE_LARGE, CARD_SCALE_SMALL} from "@/constants.ts";

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
  hands: CardLike[][]
  maxWidth?: number
  initialActiveHand?: number
}>()

const emit = defineEmits<{
  (event: 'update:activeHand', index: number): void
  (event: 'handSelected', index: number): void
}>()

const trimmedHands = computed(() => props.hands.slice(0, MAX_HAND_SETS))

const displayHands = computed(() =>
  trimmedHands.value.map(hand => (Array.isArray(hand) ? hand : [])),
)

const cardHandMaxWidth = computed(() => props.maxWidth)

const activeHandIndex = ref(-1)

const clampIndex = (index: number | undefined): number => {
  const count = displayHands.value.length
  if (count === 0) {
    return -1
  }

  if (index === undefined || Number.isNaN(index)) {
    return 0
  }

  return Math.min(Math.max(index, 0), count - 1)
}

let isInitialized = false

watch(
  displayHands,
  hands => {
    if (hands.length === 0) {
      activeHandIndex.value = -1
      isInitialized = false
      return
    }

    const baseIndex = isInitialized
      ? activeHandIndex.value
      : clampIndex(props.initialActiveHand)

    activeHandIndex.value = clampIndex(baseIndex)
    isInitialized = true
  },
  { immediate: true },
)

const handEntries = computed<HandEntry[]>(() =>
  displayHands.value.map((hand, index) => ({ hand, index })),
)

const activeEntry = computed(() =>
  handEntries.value.find(entry => entry.index === activeHandIndex.value) ?? null,
)

const buildStack = (entries: HandEntry[]) =>
  entries.map((entry, stackIndex, source) => ({
    ...entry,
    style: {
      marginTop: stackIndex === 0 ? '0' : `-${STACK_OVERLAP}px`,
      zIndex: source.length - stackIndex,
    } as Record<string, string | number>,
  }))

const leftEntries = computed(() =>
  handEntries.value
    .filter(entry => entry.index < activeHandIndex.value)
)

const rightEntries = computed(() =>
  handEntries.value
    .filter(entry => entry.index > activeHandIndex.value),
)

const leftDisplayEntries = computed(() => leftEntries.value.slice(Math.max(leftEntries.value.length - MAX_VISIBLE_STACK, 0), leftEntries.value.length))
const rightDisplayEntries = computed(() => rightEntries.value.slice(0, Math.min(MAX_VISIBLE_STACK, rightEntries.value.length)).reverse())


const leftHiddenCount = computed(() => Math.max(leftEntries.value.length - leftDisplayEntries.value.length, 0))
const rightHiddenCount = computed(() => Math.max(rightEntries.value.length - rightDisplayEntries.value.length, 0))

const leftStack = computed(() => buildStack(leftDisplayEntries.value))

const rightStack = computed(() => buildStack(rightDisplayEntries.value))

const setActiveHand = (index: number) => {
  const nextIndex = clampIndex(index)
  if (nextIndex === -1 || nextIndex === activeHandIndex.value) {
    return
  }

  activeHandIndex.value = nextIndex
  emit('update:activeHand', nextIndex)
  emit('handSelected', nextIndex)
}
</script>

<style scoped>
.player-spot {
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
