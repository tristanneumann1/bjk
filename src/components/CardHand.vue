<template>
  <div class="card-hand" :style="handStyle" role="group" aria-label="Card hand">
    <PlayingCard
      v-for="(card, index) in displayCards"
      :key="index"
      class="card-hand__card"
      :style="cardPositions[index]"
      :value="card.value"
      :suit="card.suit"
      :large="isLarge"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PlayingCard from '@/components/PlayingCard.vue'
import {CARD_SCALE_LARGE, CARD_SCALE_SMALL} from "@/constants.ts";

type CardLike = {
  value?: string | number
  rank?: string | number
  suit?: string
}

const BASE_CARD_WIDTH = 46
const BASE_CARD_HEIGHT = 64
const MAX_CARDS = 13

const props = defineProps<{
  cards: CardLike[]
  maxWidth?: number
  large?: boolean
}>()

const scale = computed(() => (props.large ? CARD_SCALE_LARGE : CARD_SCALE_SMALL))

const cardWidth = computed(() => BASE_CARD_WIDTH * scale.value)
const cardHeight = computed(() => BASE_CARD_HEIGHT * scale.value)

const defaultMaxWidth = computed(() => cardWidth.value + (MAX_CARDS - 1) * (cardWidth.value / 4))

const maxWidth = computed(() => props.maxWidth ?? defaultMaxWidth.value)

const visibleCards = computed(() => props.cards.slice(0, MAX_CARDS))

const isLarge = computed(() => props.large ?? false)

const displayCards = computed(() =>
  visibleCards.value.map(card => ({
    value: card.rank ?? card.value ?? undefined,
    suit: card.suit,
  })),
)

const cardSpacing = computed(() => {
  const count = visibleCards.value.length
  if (count <= 1) {
    return 0
  }

  const availableWidth = Math.max(maxWidth.value - cardWidth.value, 0)
  const idealSpacing = availableWidth / (count - 1)
  const clampedSpacing = Math.min(idealSpacing, cardWidth.value)

  return Math.max(clampedSpacing, cardWidth.value / 4)
})

const handWidth = computed(() => {
  const count = visibleCards.value.length
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
