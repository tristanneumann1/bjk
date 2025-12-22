<template>
  <div class="card-hand" :style="handStyle" role="group" aria-label="Card hand">
    <PlayingCard
      v-for="(card, index) in displayCards"
      :key="card.id"
      class="card-hand__card"
      :class="{ 'card-hand__card--entering': card.isEntering }"
      :style="cardPositions[index]"
      :rank="card.rank"
      :suit="card.suit"
      :large="isLarge"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onScopeDispose, ref, watch } from 'vue'
import PlayingCard from '@/components/PlayingCard.vue'
import {CARD_SCALE_LARGE, CARD_SCALE_SMALL} from "@/constants.ts";
import type {Card} from "@/types/card.ts";

type DisplayCard = Card & {
  id: number
  isEntering: boolean
}

const BASE_CARD_WIDTH = 46
const BASE_CARD_HEIGHT = 64
const MAX_CARDS = 13
const REVEAL_STAGGER_MS = 220
const ENTER_ANIMATION_MS = 320

const props = defineProps<{
  cards: Card[]
  maxWidth?: number
  large?: boolean
}>()

const scale = computed(() => (props.large ? CARD_SCALE_LARGE : CARD_SCALE_SMALL))

const cardWidth = computed(() => BASE_CARD_WIDTH * scale.value)
const cardHeight = computed(() => BASE_CARD_HEIGHT * scale.value)

const defaultMaxWidth = computed(() => cardWidth.value + (MAX_CARDS - 1) * (cardWidth.value / 4))

const maxWidth = computed(() => props.maxWidth ?? defaultMaxWidth.value)

const isLarge = computed(() => props.large ?? false)

const targetCards = computed<Card[]>(() =>
  props.cards.slice(0, MAX_CARDS),
)

const renderedCards = ref<DisplayCard[]>([])

const displayCards = computed(() => renderedCards.value)

const cardSpacing = computed(() => {
  const count = renderedCards.value.length
  if (count <= 1) {
    return 0
  }

  const availableWidth = Math.max(maxWidth.value - cardWidth.value, 0)
  const idealSpacing = availableWidth / (count - 1)
  const clampedSpacing = Math.min(idealSpacing, cardWidth.value)

  return Math.max(clampedSpacing, cardWidth.value / 4)
})

const handWidth = computed(() => {
  const count = renderedCards.value.length
  if (count === 0) {
    return 0
  }

  return cardWidth.value + cardSpacing.value * (count - 1)
})

const handStyle = computed(() => ({
  maxWidth: `${maxWidth.value}px`,
  width: `${Math.min(handWidth.value, maxWidth.value)}px`,
  height: `${cardHeight.value}px`,
}))

const cardPositions = computed(() =>
  renderedCards.value.map((_, index) => ({
    left: `${index * cardSpacing.value - 8}px`,
    zIndex: index + 1,
  })),
)

const revealQueue: Card[] = []
const activeTimeouts: Array<ReturnType<typeof setTimeout>> = []
let cardIdCounter = 0
let processingReveal = false

const createDisplayCard = (card: Card, isEntering: boolean): DisplayCard => ({
  id: ++cardIdCounter,
  value: card.value,
  suit: card.suit,
  rank: card.rank,
  isEntering,
})

const clearActiveTimeouts = () => {
  while (activeTimeouts.length) {
    const timeoutId = activeTimeouts.pop()
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }
  }
}

const markCardSettled = (id: number) => {
  renderedCards.value = renderedCards.value.map(card =>
    card.id === id ? { ...card, isEntering: false } : card,
  )
}

const schedule = (handler: () => void, delay: number) => {
  const timeoutId = setTimeout(() => {
    const index = activeTimeouts.indexOf(timeoutId)
    if (index !== -1) {
      activeTimeouts.splice(index, 1)
    }
    handler()
  }, delay)
  activeTimeouts.push(timeoutId)
}

const processRevealQueue = () => {
  if (processingReveal) {
    return
  }
  processingReveal = true

  const step = () => {
    const nextCard = revealQueue.shift()
    if (!nextCard) {
      processingReveal = false
      return
    }

    const displayCard = createDisplayCard(nextCard, true)

    renderedCards.value = [...renderedCards.value, displayCard]

    schedule(() => markCardSettled(displayCard.id), ENTER_ANIMATION_MS)
    schedule(step, REVEAL_STAGGER_MS)
  }

  step()
}

const enqueueReveals = (cards: Card[]) => {
  if (cards.length === 0) {
    return
  }

  revealQueue.push(...cards)
  processRevealQueue()
}

const resetRenderedCards = (nextCards: Card[]) => {
  clearActiveTimeouts()
  revealQueue.length = 0
  processingReveal = false
  renderedCards.value = nextCards.map(card => createDisplayCard(card, false))
}

// TODO Clean up this watch by breaking down the steps; Maybe move logic
watch(
  targetCards,
  nextCards => {
    const existing = renderedCards.value
    const nextLength = nextCards.length

    if (existing.length === 0 && nextLength === 0) {
      return
    }

    if (existing.length > 0 && nextLength === 0) {
      resetRenderedCards([])
      return
    }
    const syncedLength = Math.min(existing.length, nextLength)
    const updatedExisting = existing.slice(0, syncedLength).map((card, index) => {
      const nextCard = nextCards[index]
      if (card.value === nextCard.value && card.suit === nextCard.suit) {
        return card
      }
      const replacement = createDisplayCard(nextCard, true)
      schedule(() => markCardSettled(replacement.id), ENTER_ANIMATION_MS)
      return replacement
    })

    renderedCards.value = updatedExisting
    if (nextLength < existing.length) {
      clearActiveTimeouts()
      revealQueue.length = 0
      processingReveal = false
      return
    }

    const newCards = nextCards.slice(updatedExisting.length)
    enqueueReveals(newCards)
  },
  { immediate: true },
)

onScopeDispose(() => {
  clearActiveTimeouts()
})
</script>

<style scoped>
.card-hand {
  position: relative;
  display: block;
}

.card-hand__card {
  position: absolute;
  top: 0;
}

.card-hand__card--entering {
  animation: card-hand-enter 0.32s ease;
}

@keyframes card-hand-enter {
  0% {
    transform: translateY(-18%) scale(0.92);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
