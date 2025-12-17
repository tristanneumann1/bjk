<template>
  <div
    class="chair"
    :class="{ 'chair--active': isActiveChair }"
    aria-label="Player Spot"
    :aria-current="isActiveChair ? 'true' : undefined"
    :style="{ width: '272px' }"
  >
    <button
      v-if="!chairsStore.roundInProgress"
      class="chair__deactivate"
      type="button"
      aria-label="Make this chair inactive"
      @click="chairsStore.leave(props.chairId)"
    >
      ×
    </button>
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
          :class="['hand__entry', 'hand__entry--stack', entryResultClass(entry)]"
          type="button"
          role="listitem"
          :style="entry.style"
          :aria-pressed="entry.index === activeHandIndex"
        >
          <div class="hand__entry-body">
            <CardHand
              :cards="entry.hand"
              :maxWidth="cardHandMaxWidth"
            />
            <ResultCounter
              v-if="entry.resultVariant && entry.resultAmount > 0"
              :amount="entry.resultAmount"
              :active="entry.showResultHighlight"
              :variant="entry.resultVariant"
            />
            <div
              v-if="entry.resultVariant === 'surrender' && entry.showResultHighlight"
              class="hand__surrender-flag"
              aria-hidden="true"
            >
              <img src="/flag-wave.gif" alt="Surrender flag" />
            </div>
          </div>
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
          :class="['hand__entry', 'hand__entry--stack', entryResultClass(entry)]"
          type="button"
          role="listitem"
          :style="entry.style"
          :aria-pressed="entry.index === activeHandIndex"
        >
          <div class="hand__entry-body">
            <CardHand
              :cards="entry.hand"
              :maxWidth="cardHandMaxWidth"
            />
            <ResultCounter
              v-if="entry.resultVariant && entry.resultAmount > 0"
              :amount="entry.resultAmount"
              :active="entry.showResultHighlight"
              :variant="entry.resultVariant"
            />
            <div
              v-if="entry.resultVariant === 'surrender' && entry.showResultHighlight"
              class="hand__surrender-flag"
              aria-hidden="true"
            >
              <img src="/flag-wave.gif" alt="Surrender flag" />
            </div>
          </div>
        </button>
      </div>
    </div>
    <div class="hand" role="group" aria-label="Card hands">
      <div v-if="activeEntry" class="hand__frame">

        <button
          :class="['hand__entry', 'hand__entry--active', entryResultClass(activeEntry)]"
          type="button"
          :aria-pressed="true"
        >
          <div class="hand__entry-body">
            <CardHand
              :cards="activeEntry.hand"
              :large="true"
              :maxWidth="cardHandMaxWidth"
            />
            <ResultCounter
              v-if="activeEntry.resultVariant && activeEntry.resultAmount > 0"
              :amount="activeEntry.resultAmount"
              :active="activeEntry.showResultHighlight"
              :variant="activeEntry.resultVariant"
            />
            <div
              v-if="activeEntry.resultVariant === 'surrender' && activeEntry.showResultHighlight"
              class="hand__surrender-flag"
              aria-hidden="true"
            >
              <img src="/flag-wave.gif" alt="Surrender flag" />
            </div>
          </div>
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
import ResultCounter from '@/components/ResultCounter.vue'
import BettingSlider from "@/components/BettingSlider.vue";
import {CARD_SCALE_LARGE, CARD_SCALE_SMALL} from "@/constants.ts";
import { useChairsStore } from '@/stores/chairs'
import type { HandResult } from '@/models/chair'
import { Session } from '@/models/session.ts'
import type { ResultVariant } from '@/types/results'

type CardLike = {
  value?: string | number
  rank?: string | number
  suit?: string
}

type HandEntry = {
  hand: CardLike[]
  index: number
  result: HandResult | null | undefined
  resultVariant: ResultVariant | null
  resultAmount: number
  showResultHighlight: boolean
}

const MAX_HAND_SETS = 8
const BASE_SMALL_CARD_HEIGHT = 64 * CARD_SCALE_SMALL
const BASE_LARGE_CARD_HEIGHT = 64 * CARD_SCALE_LARGE
const STACK_OVERLAP = BASE_SMALL_CARD_HEIGHT / 2
const MAX_VISIBLE_STACK = 2

const WIN_RESULTS = new Set<HandResult>(['Win', 'BlackJack_Win', 'Double_Win'])
const SURRENDER_RESULTS = new Set<HandResult>(['Surrendered'])
const LOSE_RESULTS = new Set<HandResult>(['Lose', 'Double_Lose'])
const LOSS_MULTIPLIERS: Partial<Record<HandResult, number>> = {
  Lose: 1,
  Double_Lose: 2,
}
const WIN_MULTIPLIERS: Partial<Record<HandResult, number>> = {
  Win: 2,
  Double_Win: 4,
}
const PUSH_RESULTS = new Set<HandResult>(['Push', 'Double_Push'])
const BLACKJACK_WIN_MULTIPLIER = 1 + Session.getInstance().rules.blackjackPayout

const props = defineProps<{
  chairId: number
  maxWidth?: number
  initialActiveHand?: number
}>()

const chairsStore = useChairsStore()

const isActiveChair = computed(() => chairsStore.activeChairId === props.chairId)

const chairView = computed(() => chairsStore.getChairView(props.chairId))
if (!chairView.value) throw new Error('Chair not found')

const canAdjustBet = computed(() => !chairsStore.roundInProgress)

const trimmedHands = computed(() => chairView.value?.hands.slice(0, MAX_HAND_SETS) ?? [])
const trimmedResults = computed(() => chairView.value?.handResults.slice(0, MAX_HAND_SETS) ?? [])

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

const entryResultClass = (entry: HandEntry | null | undefined) => {
  const hasCards = Boolean(entry?.hand.length)
  const isWin = Boolean(entry?.resultVariant === 'win' && hasCards)
  const isLoss = Boolean(entry?.resultVariant === 'loss' && hasCards)
  const isPush = Boolean(entry?.resultVariant === 'push' && hasCards)
  const isSurrender = Boolean(entry?.resultVariant === 'surrender' && hasCards)
  const highlight = Boolean(entry?.showResultHighlight)

  return {
    'hand__entry--win': isWin,
    'hand__entry--lose': isLoss,
    'hand__entry--push': isPush,
    'hand__entry--surrender': isSurrender,
    'hand__entry--win-active': Boolean(isWin && highlight),
    'hand__entry--loss-active': Boolean(isLoss && highlight),
    'hand__entry--push-active': Boolean(isPush && highlight),
    'hand__entry--surrender-active': Boolean(isSurrender && highlight),
  }
}

const resolveResultMeta = (
  result: HandResult | null | undefined,
  betAmount: number,
): {
  variant: ResultVariant | null
  amount: number
} => {
  const normalizedBet = betAmount / 100
  if (normalizedBet <= 0) {
    return { variant: null, amount: 0 }
  }

  if (!result) {
    return { variant: null, amount: 0 }
  }


  if (SURRENDER_RESULTS.has(result)) {
    return { variant: 'surrender', amount: normalizedBet / 2 }
  }
  if (LOSE_RESULTS.has(result)) {
    const lossMultiplier = LOSS_MULTIPLIERS[result] ?? 1
    return { variant: 'loss', amount: lossMultiplier * normalizedBet }
  }
  if (WIN_RESULTS.has(result)) {
    if (result === 'BlackJack_Win') {
      return { variant: 'win', amount: Math.floor(normalizedBet * BLACKJACK_WIN_MULTIPLIER) }
    }
    const winMultiplier = WIN_MULTIPLIERS[result] ?? 2
    return { variant: 'win', amount: winMultiplier * normalizedBet }
  }
  if (PUSH_RESULTS.has(result)) {
    return { variant: 'push', amount: 0 }
  }
  return { variant: null, amount: 0 }
}

const handEntries = computed<HandEntry[]>(() => {
  const betAmount = currentBet.value ?? 0

  return displayHands.value.map((hand, index) => {
    const result = trimmedResults.value[index] ?? null
    const { variant, amount } = resolveResultMeta(result, betAmount)
    const hasCards = hand.length > 0
    return {
      hand,
      index,
      result,
      resultVariant: variant,
      resultAmount: amount,
      showResultHighlight: Boolean((variant) && hasCards),
    }
  })
})

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
  border-radius: 12px;
  padding: 0.5rem 0.25rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  position: relative; /* allow floating controls without affecting layout */
}

.chair--active {
  box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.4);
  transform: translateY(-2px);
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
  position: relative;
  overflow: visible;
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

.hand__entry-body {
  position: relative;
  border-radius: 18px;
  padding: 0.35rem;
  border: 2px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.hand__entry--win .hand__entry-body {
  border-color: rgba(74, 222, 128, 0.85);
  box-shadow: 0 0 0 13px rgba(74, 222, 128, 0.35);
}

.hand__entry--lose .hand__entry-body {
  border-color: rgba(248, 113, 113, 0.95);
  box-shadow: 0 0 0 13px rgba(248, 113, 113, 0.4);
}

.hand__entry--push .hand__entry-body {
  border-color: rgba(96, 165, 250, 0.9);
  box-shadow: 0 0 0 13px rgba(96, 165, 250, 0.4);
}

.hand__entry--loss-active .hand__entry-body {
  animation: hand-loss-outline 0.55s ease-in-out infinite;
}

.hand__entry--win-active .hand__entry-body {
  animation: hand-win-outline 0.55s ease-in-out infinite;
}

.hand__entry--push-active .hand__entry-body {
  animation: hand-push-outline 0.55s ease-in-out infinite;
}

.hand__entry--stack:hover,
.hand__entry--stack:focus-visible {
  opacity: 1;
}

.hand__surrender-flag {
  z-index: 3;
  position: absolute;
  top: -14px;
  right: -8px;
  width: 56px;
  pointer-events: none;
  animation: hand-surrender-flag 1.1s ease forwards;
}

.hand__surrender-flag img {
  width: 100%;
  height: auto;
  display: block;
}

/* Small deactivate button shown between rounds; fully floated, no layout impact */
.chair__deactivate {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.chair__deactivate:hover,
.chair__deactivate:focus-visible {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.7);
}

@keyframes hand-loss-outline {
  0% {
    box-shadow: 0 0 0 0 rgba(248, 113, 113, 0.55);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(248, 113, 113, 0);
  }
}

@keyframes hand-win-outline {
  0% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.45);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(74, 222, 128, 0);
  }
}

@keyframes hand-push-outline {
  0% {
    box-shadow: 0 0 0 0 rgba(96, 165, 250, 0.4);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(96, 165, 250, 0);
  }
}

@keyframes hand-surrender-flag {
  0% {
    opacity: 0;
    transform: translateY(-4px) scale(0.9);
  }
  30% {
    opacity: 1;
    transform: translateY(-8px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-18px) scale(1);
  }
}

</style>
