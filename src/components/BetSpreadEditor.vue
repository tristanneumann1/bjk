<template>
  <div class="spread-editor">
    <ul class="spread-editor__list" aria-label="Bet spread values">
      <li
        v-for="(value, index) in draft"
        :key="index"
        class="spread-editor__row"
      >
        <span class="spread-editor__index">{{ index + 1 }}</span>
        <button
          type="button"
          class="spread-editor__step"
          aria-label="Decrease value"
          :disabled="value <= MIN_BET"
          @click="stepValue(index, -DOLLAR)"
        >
          −
        </button>
        <label class="spread-editor__input-wrap">
          <span class="spread-editor__prefix" aria-hidden="true">$</span>
          <input
            type="number"
            inputmode="numeric"
            class="spread-editor__input"
            :aria-label="`Bet slot ${index + 1} in dollars`"
            :min="MIN_BET / 100"
            :max="MAX_BET / 100"
            step="1"
            :value="value / 100"
            @input="onInput(index, $event)"
            @blur="onBlur(index)"
            @keydown.enter.prevent="($event.target as HTMLInputElement).blur()"
          />
        </label>
        <button
          type="button"
          class="spread-editor__step"
          aria-label="Increase value"
          :disabled="value >= MAX_BET"
          @click="stepValue(index, DOLLAR)"
        >
          +
        </button>
        <button
          type="button"
          class="spread-editor__remove"
          aria-label="Remove value"
          :disabled="draft.length <= MIN_SPREAD_LENGTH"
          @click="removeSlot(index)"
        >
          ×
        </button>
      </li>
    </ul>

    <div class="spread-editor__actions">
      <button
        type="button"
        class="spread-editor__action"
        :disabled="draft.length >= MAX_SPREAD_LENGTH"
        @click="addSlot"
      >
        + Add slot
      </button>
      <button
        type="button"
        class="spread-editor__action spread-editor__action--ghost"
        @click="resetToDefault"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import {
  DEFAULT_BET_SPREAD,
  MAX_BET,
  MAX_SPREAD_LENGTH,
  MIN_BET,
  MIN_SPREAD_LENGTH,
  normaliseSpread,
} from '@/lib/betSpread'

const DOLLAR = 100

const settingsStore = useSettingsStore()
const draft = ref<number[]>([...settingsStore.betSpread])

const clamp = (value: number) => Math.min(MAX_BET, Math.max(MIN_BET, Math.round(value)))

const stepValue = (index: number, delta: number) => {
  const current = draft.value[index]
  if (current === undefined) return
  draft.value[index] = clamp(current + delta)
}

const onInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (!target) return
  const raw = target.valueAsNumber
  if (Number.isNaN(raw)) return
  // Store as cents while typing; don't clamp yet so intermediate values like "5" → "50" aren't rejected mid-edit.
  draft.value[index] = Math.max(0, Math.min(MAX_BET, Math.round(raw * 100)))
}

const onBlur = (index: number) => {
  const current = draft.value[index]
  if (current === undefined) return
  draft.value[index] = clamp(current)
}

const removeSlot = (index: number) => {
  if (draft.value.length <= MIN_SPREAD_LENGTH) return
  draft.value.splice(index, 1)
}

const addSlot = () => {
  if (draft.value.length >= MAX_SPREAD_LENGTH) return
  const last = draft.value[draft.value.length - 1] ?? MIN_BET
  draft.value.push(clamp(last + 2500))
}

const resetToDefault = () => {
  draft.value = [...DEFAULT_BET_SPREAD]
}

// Push draft changes to the store whenever they settle.
// Store normalises (sort, dedupe, clamp) so draft is allowed to have duplicates
// or out-of-order values transiently while the user is editing.
const pendingSpread = computed(() => normaliseSpread(draft.value))
watch(
  pendingSpread,
  next => {
    if (next.length < MIN_SPREAD_LENGTH) return
    const current = settingsStore.betSpread
    if (current.length === next.length && current.every((v, i) => v === next[i])) return
    settingsStore.setBetSpread(next)
  },
  { deep: true },
)

// If the store is updated externally (e.g. reset from another tab), keep draft in sync.
watch(
  () => settingsStore.betSpread,
  next => {
    const snapshot = normaliseSpread(draft.value)
    const same = snapshot.length === next.length && snapshot.every((v, i) => v === next[i])
    if (!same) draft.value = [...next]
  },
  { deep: true },
)
</script>

<style scoped>
.spread-editor {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.spread-editor__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.spread-editor__row {
  display: grid;
  grid-template-columns: 1.4rem 1.6rem 1fr 1.6rem 1.4rem;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.35rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.spread-editor__index {
  font-size: 0.75rem;
  opacity: 0.6;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.spread-editor__step,
.spread-editor__remove {
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 0, 0.25);
  color: inherit;
  font-size: 0.9rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease, transform 0.08s ease;
}

.spread-editor__step:hover:not(:disabled),
.spread-editor__remove:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.18);
}

.spread-editor__step:active:not(:disabled),
.spread-editor__remove:active:not(:disabled) {
  transform: scale(0.92);
}

.spread-editor__step:disabled,
.spread-editor__remove:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.spread-editor__input-wrap {
  display: inline-flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.15rem 0.4rem;
  border-radius: 0.35rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: border-color 0.15s ease, background 0.15s ease;
  justify-self: center;
  min-width: 0;
}

.spread-editor__input-wrap:focus-within {
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(0, 0, 0, 0.4);
}

.spread-editor__prefix {
  font-size: 0.85rem;
  opacity: 0.6;
  font-variant-numeric: tabular-nums;
}

.spread-editor__input {
  width: 3.2rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 600;
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
  outline: none;
  padding: 0;
  -moz-appearance: textfield;
}

.spread-editor__input::-webkit-outer-spin-button,
.spread-editor__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.spread-editor__actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.spread-editor__action {
  padding: 0.35rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;
}

.spread-editor__action:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}

.spread-editor__action:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.spread-editor__action--ghost {
  border-color: transparent;
  background: transparent;
  opacity: 0.7;
}

.spread-editor__action--ghost:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.08);
}
</style>
