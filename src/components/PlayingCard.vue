<template>
  <div class="playing-card" :style="tileStyle" role="img" :aria-label="accessibleLabel" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const TILE_WIDTH = 64
const TILE_HEIGHT = 64
const TILE_SPACING = 1
const TILE_COLUMNS = 14
const TILE_ROWS = 4
const TILEMAP_WIDTH = TILE_COLUMNS * TILE_WIDTH + (TILE_COLUMNS - 1) * TILE_SPACING
const TILEMAP_HEIGHT = TILE_ROWS * TILE_HEIGHT + (TILE_ROWS - 1) * TILE_SPACING

const CARD_BACK_TILE = { row: 1, column: 13 }

const valueOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const
const suitOrder = ['hearts', 'diamonds', 'clubs', 'spades'] as const

type CardValue = typeof valueOrder[number]
type CardSuit = typeof suitOrder[number]

const valueAliases: Record<string, CardValue> = {
  A: 'A',
  ACE: 'A',
  '1': 'A',
  '01': 'A',
  '02': '2',
  '2': '2',
  TWO: '2',
  '03': '3',
  '3': '3',
  THREE: '3',
  '04': '4',
  '4': '4',
  FOUR: '4',
  '05': '5',
  '5': '5',
  FIVE: '5',
  '06': '6',
  '6': '6',
  SIX: '6',
  '07': '7',
  '7': '7',
  SEVEN: '7',
  '08': '8',
  '8': '8',
  EIGHT: '8',
  '09': '9',
  '9': '9',
  NINE: '9',
  '10': '10',
  T: '10',
  TEN: '10',
  J: 'J',
  JACK: 'J',
  Q: 'Q',
  QUEEN: 'Q',
  K: 'K',
  KING: 'K',
}

const suitAliases: Record<string, CardSuit> = {
  HEARTS: 'hearts',
  HEART: 'hearts',
  H: 'hearts',
  DIAMONDS: 'diamonds',
  DIAMOND: 'diamonds',
  D: 'diamonds',
  CLUBS: 'clubs',
  CLUB: 'clubs',
  C: 'clubs',
  SPADES: 'spades',
  SPADE: 'spades',
  S: 'spades',
}

const props = defineProps<{
  value?: string | number
  suit?: string
  large?: boolean
}>()

const scale = computed(() => (props.large ? 1.5 : 1))

const normalizedValue = computed<CardValue | null>(() => {
  if (props.value === undefined || props.value === null) {
    return null
  }

  const lookupKey = `${props.value}`.trim().toUpperCase()
  return valueAliases[lookupKey] ?? null
})

const normalizedSuit = computed<CardSuit | null>(() => {
  if (!props.suit) {
    return null
  }

  const lookupKey = props.suit.trim().toUpperCase()
  return suitAliases[lookupKey] ?? null
})

const spritePosition = computed(() => {
  const value = normalizedValue.value
  const suit = normalizedSuit.value

  if (!value || !suit) {
    return CARD_BACK_TILE
  }

  const column = valueOrder.indexOf(value)
  const row = suitOrder.indexOf(suit)

  if (column === -1 || row === -1) {
    return CARD_BACK_TILE
  }

  return { row, column }
})

const cardsTilemapUrl = new URL('../../kenney_playing-cards-pack/Tilesheet/cardsLarge_tilemap.png', import.meta.url).href

const tileStyle = computed(() => {
  const { row, column } = spritePosition.value
  const offsetX = -column * (TILE_WIDTH + TILE_SPACING)
  const offsetY = -row * (TILE_HEIGHT + TILE_SPACING)

  const scaleValue = scale.value

  return {
    width: `${TILE_WIDTH * scaleValue}px`,
    height: `${TILE_HEIGHT * scaleValue}px`,
    backgroundImage: `url(${cardsTilemapUrl})`,
    backgroundPosition: `${offsetX * scaleValue}px ${offsetY * scaleValue}px`,
    backgroundSize: `${TILEMAP_WIDTH * scaleValue}px ${TILEMAP_HEIGHT * scaleValue}px`,
  }
})

const accessibleLabel = computed(() => {
  const value = normalizedValue.value
  const suit = normalizedSuit.value

  if (!value || !suit) {
    return 'Card back'
  }

  return `${value} of ${suit}`
})
</script>

<style scoped>
.playing-card {
  display: inline-block;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}
</style>
