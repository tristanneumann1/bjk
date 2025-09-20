<template>
  <div class="hand" role="group" aria-label="Card hands">
    <div v-if="activeEntry" class="hand__frame">
      <div class="hand__top" aria-label="Inactive hands">
        <div class="hand__top-stack hand__top-stack--left" aria-label="Hands before active">
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
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import CardHand from '@/components/CardHand.vue'

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
const BASE_CARD_HEIGHT = 64
const STACK_OVERLAP = BASE_CARD_HEIGHT / 2

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

const leftStack = computed(() =>
  buildStack(
    handEntries.value
      .filter(entry => entry.index < activeHandIndex.value)
  ),
)

const rightStack = computed(() =>
  buildStack(handEntries.value.filter(entry => entry.index > activeHandIndex.value).reverse()),
)

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
.hand {
  width: 280px;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2rem 4rem;
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
  position: absolute;
  bottom: 132px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}

.hand__top-stack--left {
  align-items: flex-start;
  left: 0;
}

.hand__top-stack--right {
  right: 0;
  align-items: flex-end;
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
