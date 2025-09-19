<template>
  <div class="card-hand" :style="handStyle" role="group" aria-label="Card hand">
    <PlayingCard
      v-for="(card, index) in displayCards"
      :key="index"
      class="card-hand__card"
      :style="cardPositions[index]"
      :value="card.value"
      :suit="card.suit"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PlayingCard from '@/components/PlayingCard.vue'

type CardLike = {
  value?: string | number
  rank?: string | number
  suit?: string
}

const CARD_WIDTH = 64
const CARD_HEIGHT = 64
const MAX_CARDS = 11
const DEFAULT_MAX_WIDTH = CARD_WIDTH + (MAX_CARDS - 1) * (CARD_WIDTH / 2)

const props = defineProps<{
  cards: CardLike[]
  maxWidth?: number
}>()

const visibleCards = computed(() => props.cards.slice(0, MAX_CARDS))

const displayCards = computed(() =>
  visibleCards.value.map(card => ({
    value: card.value ?? card.rank ?? undefined,
    suit: card.suit,
  })),
)

const maxWidth = computed(() => props.maxWidth ?? DEFAULT_MAX_WIDTH)

const cardSpacing = computed(() => {
  const count = visibleCards.value.length
  if (count <= 1) {
    return 0
  }

  const availableWidth = maxWidth.value - CARD_WIDTH
  const idealSpacing = availableWidth / (count - 1)
  const clampedSpacing = Math.min(idealSpacing, CARD_WIDTH)

  return Math.max(clampedSpacing, CARD_WIDTH / 2)
})

const handWidth = computed(() => {
  const count = visibleCards.value.length
  if (count === 0) {
    return 0
  }

  return CARD_WIDTH + cardSpacing.value * (count - 1)
})

const handStyle = computed(() => ({
  maxWidth: `${maxWidth.value}px`,
  width: `${Math.min(handWidth.value, maxWidth.value)}px`,
  height: `${CARD_HEIGHT}px`,
}))

const cardPositions = computed(() =>
  visibleCards.value.map((_, index) => ({
    left: `${index * cardSpacing.value}px`,
    zIndex: index + 1,
  })),
)
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
</style>
