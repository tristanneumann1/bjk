<template>
  <div class="simulate-tab">
    <p class="simulate-tab__intro">
      Estimate your <strong>EV</strong>, <strong>standard deviation</strong>, <strong>Risk of Ruin</strong>,
      and <strong>N0</strong> (hours to overcome variance) for a given bet spread and set of rules. Tweak the
      inputs and re-run to compare.
    </p>

    <!-- Strategy -->
    <div class="simulate-tab__group">
      <h3 class="simulate-tab__heading">Strategy</h3>
      <v-select
        variant="outlined"
        density="compact"
        hide-details="auto"
        label="Strategy"
        :items="strategyItems"
        item-title="name"
        item-value="id"
        :model-value="selectedStrategyId"
        @update:model-value="handleStrategyChange"
      />
    </div>

    <!-- Bet spread -->
    <div class="simulate-tab__group">
      <h3 class="simulate-tab__heading">Bet spread (by true count)</h3>
      <p class="simulate-tab__hint">Bet used at true count 0, 1, 2, … (top-clamped). Dollars.</p>
      <ul class="simulate-tab__spread" aria-label="Bet spread values">
        <li v-for="(value, index) in simulateStore.betSpread" :key="index" class="simulate-tab__spread-row">
          <span class="simulate-tab__spread-index">TC {{ index }}</span>
          <span class="simulate-tab__spread-prefix">$</span>
          <input
            type="number"
            inputmode="numeric"
            class="simulate-tab__spread-input"
            :aria-label="`Bet at true count ${index}`"
            min="1"
            step="1"
            :value="value / 100"
            @input="onSpreadInput(index, $event)"
          />
          <button
            v-if="simulateStore.betSpread.length > 2"
            type="button"
            class="simulate-tab__spread-remove"
            aria-label="Remove slot"
            @click="removeSpreadSlot(index)"
          >
            ×
          </button>
        </li>
      </ul>
      <div class="simulate-tab__spread-actions">
        <button type="button" class="simulate-tab__mini-btn" @click="addSpreadSlot">+ Add slot</button>
      </div>
    </div>

    <!-- Rules -->
    <div class="simulate-tab__group">
      <div class="simulate-tab__group-head">
        <h3 class="simulate-tab__heading">Rules</h3>
        <button type="button" class="simulate-tab__mini-btn simulate-tab__mini-btn--ghost" @click="resetConfig">
          Match current game
        </button>
      </div>
      <v-text-field
        type="number"
        variant="outlined"
        hide-details="auto"
        min="1"
        max="8"
        density="compact"
        label="Deck count"
        :model-value="simulateStore.rules.deckCount"
        @update:model-value="v => setRuleNumber('deckCount', v)"
      />
      <v-text-field
        type="number"
        variant="outlined"
        hide-details="auto"
        min="1"
        density="compact"
        label="Penetration (cards remaining)"
        :model-value="simulateStore.rules.penetration"
        @update:model-value="v => setRuleNumber('penetration', v)"
      />
      <v-switch
        class="simulate-tab__switch" color="primary" hide-details inset density="compact"
        label="Dealer hits soft 17"
        :model-value="simulateStore.rules.dealerHitsSoft17"
        @update:model-value="v => setRuleBool('dealerHitsSoft17', v)"
      />
      <v-switch
        class="simulate-tab__switch" color="primary" hide-details inset density="compact"
        label="Double after split"
        :model-value="simulateStore.rules.doubleAllowedAfterSplit"
        @update:model-value="v => setRuleBool('doubleAllowedAfterSplit', v)"
      />
      <v-switch
        class="simulate-tab__switch" color="primary" hide-details inset density="compact"
        label="Surrender allowed"
        :model-value="simulateStore.rules.surrenderAllowed"
        @update:model-value="v => setRuleBool('surrenderAllowed', v)"
      />
      <v-select
        variant="outlined" density="compact" hide-details="auto"
        label="Blackjack payout"
        :items="blackjackPayoutItems" item-title="label" item-value="value"
        :model-value="simulateStore.rules.blackjackPayout"
        @update:model-value="v => setRuleNumber('blackjackPayout', v)"
      />
    </div>

    <!-- Session params -->
    <div class="simulate-tab__group">
      <h3 class="simulate-tab__heading">Session</h3>
      <v-text-field
        type="number" variant="outlined" hide-details="auto" min="1" density="compact"
        label="Bankroll ($)"
        :model-value="simulateStore.bankroll / 100"
        @update:model-value="setBankroll"
      />
      <v-text-field
        type="number" variant="outlined" hide-details="auto" min="1" density="compact"
        label="Hands per hour"
        :model-value="simulateStore.handsPerHour"
        @update:model-value="v => setNumber('handsPerHour', v, 1)"
      />
      <v-text-field
        type="number" variant="outlined" hide-details="auto" min="10" density="compact"
        label="Shoes to simulate (accuracy vs. speed)"
        :model-value="simulateStore.shoeCount"
        @update:model-value="v => setNumber('shoeCount', v, 10)"
      />
    </div>

    <v-btn
      color="primary"
      block
      :loading="simulateStore.isRunning"
      :disabled="simulateStore.isRunning"
      @click="simulateStore.run()"
    >
      Run analysis
    </v-btn>

    <p v-if="simulateStore.error" class="simulate-tab__error">{{ simulateStore.error }}</p>

    <!-- Results -->
    <div v-if="simulateStore.result" class="simulate-tab__results">
      <div class="simulate-tab__metric">
        <span class="simulate-tab__metric-label">Expected value</span>
        <span class="simulate-tab__metric-value" :class="evClass">{{ formatMoney(simulateStore.result.evPerHour) }}/hr</span>
        <span class="simulate-tab__metric-sub">
          {{ formatMoney(simulateStore.result.evPer100Rounds) }}/100 hands · edge {{ formatPct(simulateStore.result.edge) }}
        </span>
      </div>
      <div class="simulate-tab__metric">
        <span class="simulate-tab__metric-label">Standard deviation</span>
        <span class="simulate-tab__metric-value">{{ formatMoney(simulateStore.result.stdDevPerHour) }}/hr</span>
        <span class="simulate-tab__metric-sub">{{ formatMoney(simulateStore.result.stdDevPer100Rounds) }}/100 hands</span>
      </div>
      <div class="simulate-tab__metric">
        <span class="simulate-tab__metric-label">Risk of Ruin</span>
        <span class="simulate-tab__metric-value" :class="rorClass">{{ formatPct(simulateStore.result.riskOfRuin) }}</span>
        <span class="simulate-tab__metric-sub">chance of busting this bankroll</span>
      </div>
      <div class="simulate-tab__metric">
        <span class="simulate-tab__metric-label">Hours to net 0 (N0)</span>
        <span class="simulate-tab__metric-value">{{ formatHours(simulateStore.result.n0Hours) }}</span>
        <span class="simulate-tab__metric-sub">{{ formatN0Rounds(simulateStore.result.n0Rounds) }}</span>
      </div>
      <p class="simulate-tab__results-note">
        Based on {{ simulateStore.result.rounds.toLocaleString() }} simulated rounds.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { parseNumber } from '@/lib/utils'
import { MAX_BET, MIN_BET } from '@/lib/betSpread'
import { useSimulateStore, type RuleFields } from '@/stores/simulate'
import { useStrategyStore } from '@/stores/strategy'
import type { StrategyGrid } from '@/types/strategies'

const simulateStore = useSimulateStore()
const strategyStore = useStrategyStore()

const blackjackPayoutItems = [
  { label: '3:2', value: 1.5 },
  { label: '6:5', value: 1.2 },
]

const strategyItems = computed(() => strategyStore.strategies as StrategyGrid[])
const selectedStrategyId = ref(simulateStore.strategyGrid.id)

const handleStrategyChange = (id: string) => {
  const grid = (strategyStore.strategies as StrategyGrid[]).find(s => s.id === id)
  if (grid) {
    simulateStore.strategyGrid = grid
    selectedStrategyId.value = id
  }
}

const setRuleNumber = (key: keyof RuleFields, value: string | number) => {
  const n = parseNumber(value)
  if (n !== null) (simulateStore.rules[key] as number) = n
}

const setRuleBool = (key: keyof RuleFields, value: boolean | null) => {
  ;(simulateStore.rules[key] as boolean) = Boolean(value)
}

const setNumber = (key: 'handsPerHour' | 'shoeCount', value: string | number, min: number) => {
  const n = parseNumber(value)
  if (n !== null) simulateStore[key] = Math.max(min, Math.round(n))
}

const setBankroll = (value: string | number) => {
  const n = parseNumber(value)
  if (n !== null) simulateStore.bankroll = Math.max(0, Math.round(n * 100))
}

const clampBet = (cents: number) => Math.min(MAX_BET, Math.max(MIN_BET, Math.round(cents)))

const onSpreadInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  const raw = target.valueAsNumber
  if (Number.isNaN(raw)) return
  const next = [...simulateStore.betSpread]
  next[index] = clampBet(raw * 100)
  simulateStore.betSpread = next
}

const addSpreadSlot = () => {
  const last = simulateStore.betSpread[simulateStore.betSpread.length - 1] ?? MIN_BET
  simulateStore.betSpread = [...simulateStore.betSpread, clampBet(last + 2500)]
}

const removeSpreadSlot = (index: number) => {
  if (simulateStore.betSpread.length <= 2) return
  simulateStore.betSpread = simulateStore.betSpread.filter((_, i) => i !== index)
}

const resetConfig = () => {
  simulateStore.resetFromCurrentConfig()
  selectedStrategyId.value = simulateStore.strategyGrid.id
}

// ── formatting ────────────────────────────────────────────────────────────
const formatMoney = (cents: number) => {
  const dollars = cents / 100
  const sign = dollars < 0 ? '-' : ''
  return `${sign}$${Math.abs(dollars).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
}

const formatPct = (fraction: number) => `${(fraction * 100).toFixed(2)}%`

const formatHours = (hours: number) => {
  if (!Number.isFinite(hours)) return 'Never (not winning)'
  return `${hours.toLocaleString(undefined, { maximumFractionDigits: 1 })} hrs`
}

const formatN0Rounds = (rounds: number) => {
  if (!Number.isFinite(rounds)) return 'negative or zero EV'
  return `${Math.round(rounds).toLocaleString()} rounds`
}

const evClass = computed(() => ((simulateStore.result?.evPerHour ?? 0) >= 0 ? 'is-positive' : 'is-negative'))
const rorClass = computed(() => ((simulateStore.result?.riskOfRuin ?? 1) > 0.13 ? 'is-negative' : 'is-positive'))
</script>

<style scoped>
.simulate-tab {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.simulate-tab__intro {
  margin: 0;
  font-size: 0.9rem;
}

.simulate-tab__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.simulate-tab__group:first-of-type {
  border-top: none;
  padding-top: 0;
}

.simulate-tab__group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.simulate-tab__heading {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.75;
}

.simulate-tab__hint {
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.6;
}

.simulate-tab__spread {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.simulate-tab__spread-row {
  display: grid;
  grid-template-columns: 3rem 1rem 1fr 1.4rem;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.simulate-tab__spread-index {
  font-size: 0.75rem;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.simulate-tab__spread-prefix {
  opacity: 0.6;
  text-align: right;
}

.simulate-tab__spread-input {
  width: 100%;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  outline: none;
  padding: 0.15rem 0;
  -moz-appearance: textfield;
}

.simulate-tab__spread-input::-webkit-outer-spin-button,
.simulate-tab__spread-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.simulate-tab__spread-remove {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.25);
  color: inherit;
  line-height: 1;
  cursor: pointer;
}

.simulate-tab__spread-actions {
  display: flex;
  gap: 0.5rem;
}

.simulate-tab__mini-btn {
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.simulate-tab__mini-btn--ghost {
  border-color: transparent;
  background: transparent;
  opacity: 0.75;
}

.simulate-tab__switch :deep(.v-selection-control__wrapper) {
  margin-right: 0.25rem;
}

.simulate-tab__error {
  margin: 0;
  color: #ff6b6b;
  font-size: 0.85rem;
}

.simulate-tab__results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.simulate-tab__metric {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.6rem 0.7rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.simulate-tab__metric-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  opacity: 0.65;
}

.simulate-tab__metric-value {
  font-size: 1.15rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.simulate-tab__metric-value.is-positive {
  color: #4ade80;
}

.simulate-tab__metric-value.is-negative {
  color: #ff6b6b;
}

.simulate-tab__metric-sub {
  font-size: 0.72rem;
  opacity: 0.6;
}

.simulate-tab__results-note {
  grid-column: 1 / -1;
  margin: 0;
  font-size: 0.72rem;
  opacity: 0.55;
  text-align: center;
}
</style>
