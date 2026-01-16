<template>
  <div class="game-tab">
    <p class="game-tab__intro">Customize the rules to be applied at your next shoe.</p>

    <div class="game-tab__group">
      <h3 class="game-tab__heading">Shoe setup</h3>
      <v-text-field
        type="number"
        variant="outlined"
        hide-details="auto"
        min="1"
        max="8"
        density="compact"
        label="Deck count"
        :model-value="gameStore.pendingDeckCount"
        @update:model-value="handleDeckCountChange"
      />
      <v-text-field
        type="number"
        variant="outlined"
        hide-details="auto"
        min="1"
        :max="gameStore.maxPenetration"
        density="compact"
        label="Penetration (cards remaining)"
        :model-value="gameStore.pendingPenetration"
        @update:model-value="handlePenetrationChange"
      />
    </div>

    <div class="game-tab__group">
      <h3 class="game-tab__heading">Dealer behavior</h3>
      <v-switch
        class="game-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Dealer hits soft 17"
        :model-value="gameStore.dealerHitsSoft17"
        @update:model-value="gameStore.setDealerHitsSoft17"
      />
      <v-switch
        class="game-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Dealer peeks for blackjack"
        :model-value="gameStore.dealerPeekA10"
        @update:model-value="gameStore.setDealerPeekA10"
      />
    </div>

    <div class="game-tab__group">
      <h3 class="game-tab__heading">Player options</h3>
      <v-switch
        class="game-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Double after split"
        :model-value="gameStore.doubleAllowedAfterSplit"
        @update:model-value="gameStore.setDoubleAllowedAfterSplit"
      />
      <v-switch
        class="game-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Resplit aces"
        :model-value="gameStore.resplitAcesAllowed"
        @update:model-value="gameStore.setResplitAcesAllowed"
      />
      <v-switch
        class="game-tab__switch"
        color="primary"
        hide-details
        inset
        density="compact"
        label="Surrender allowed"
        :model-value="gameStore.surrenderAllowed"
        @update:model-value="gameStore.setSurrenderAllowed"
      />
      <v-text-field
        type="number"
        variant="outlined"
        hide-details="auto"
        min="0"
        max="3"
        density="compact"
        label="Max splits"
        :model-value="gameStore.pendingMaxSplits"
        @update:model-value="handleMaxSplitsChange"
      />
    </div>

    <div class="game-tab__group">
      <h3 class="game-tab__heading">Payouts</h3>
      <v-select
        variant="outlined"
        density="compact"
        hide-details="auto"
        label="Blackjack payout"
        :items="blackjackPayoutItems"
        item-title="label"
        item-value="value"
        :model-value="gameStore.blackjackPayout"
        @update:model-value="handleBlackjackPayoutChange"
      />
    </div>

    <p class="game-tab__note">Applies after the next reshuffle and will be recorded for future games.</p>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import {parseNumber} from "@/lib/utils.ts";

const gameStore = useGameStore()

const blackjackPayoutItems = [
  { label: '3:2', value: 1.5 },
  { label: '6:5', value: 1.2 },
]

const handlePenetrationChange = (value: string | number) => {
  const numericValue = parseNumber(value)
  if (numericValue !== null) {
    gameStore.setPenetration(numericValue)
  }
}

const handleDeckCountChange = (value: string | number) => {
  const numericValue = parseNumber(value)
  if (numericValue !== null) {
    gameStore.setDeckCount(numericValue)
  }
}

const handleMaxSplitsChange = (value: string | number) => {
  const numericValue = parseNumber(value)
  if (numericValue !== null) {
    gameStore.setMaxSplits(numericValue)
  }
}

const handleBlackjackPayoutChange = (value: number | string) => {
  const numericValue = parseNumber(value)
  if (numericValue !== null) {
    gameStore.setBlackjackPayout(numericValue)
  }
}
</script>

<style scoped>
.game-tab {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-tab__intro {
  margin: 0;
}

.game-tab__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.game-tab__group:first-of-type {
  border-top: none;
  padding-top: 0;
}

.game-tab__heading {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.75;
}

.game-tab__switch :deep(.v-selection-control__wrapper) {
  margin-right: 0.25rem;
}

.game-tab__note {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>
