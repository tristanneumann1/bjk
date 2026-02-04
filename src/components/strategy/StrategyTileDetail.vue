<template>
  <section class="strategy-tile-detail" aria-label="Strategy tile detail">
    <button class="strategy-tile-detail__back" type="button" @click="$emit('back')">
      ← Back to chart
    </button>
    <h3>Customize Actions</h3>
    <p>
      Selected tile: Hard {{ total }} vs Dealer {{ formattedUpcard }}
    </p>

    <div class="strategy-tile-detail__sections">
      <div
        v-for="(rule, index) in editableRules"
        :key="rule.id"
        class="strategy-tile-detail__section"
      >
        <header>
          <h4>Condition {{ index + 1 }}</h4>
          <div class="strategy-tile-detail__order">
            <v-btn
              icon="mdi-chevron-up"
              size="small"
              variant="text"
              :disabled="index === 0"
              @click="moveRule(index, -1)"
            />
            <v-btn
              icon="mdi-chevron-down"
              size="small"
              variant="text"
              :disabled="index === editableRules.length - 1"
              @click="moveRule(index, 1)"
            />
          </div>
          <button
            type="button"
            class="strategy-tile-detail__remove"
            @click="removeRule(index)"
          >
            Remove
          </button>
        </header>

        <div class="strategy-tile-detail__toggles">
          <label v-for="toggle in toggles" :key="toggle.key" class="toggle">
            <input type="checkbox" v-model="rule[toggle.key]" />
            <span class="toggle__track">
              <span class="toggle__thumb"></span>
            </span>
            <span class="toggle__label">{{ toggle.label }}</span>
          </label>
        </div>

        <label class="strategy-tile-detail__action">
          <span>Action</span>
          <select v-model="rule.action">
            <option v-for="action in availableActions" :key="action" :value="action">
              {{ action }}
            </option>
          </select>
        </label>
        <v-text-field
          v-model.number="rule.trueCountGreaterEqualTo"
          type="number"
          variant="outlined"
          density="compact"
          hide-details
          class="strategy-tile-detail__true-count"
          label="True count ≥"
          min="-20"
          max="20"
          step="1"
        />
      </div>

      <button
        type="button"
        class="strategy-tile-detail__add"
        :disabled="editableRules.length >= MAX_RULES_COUNT"
        @click="addRule"
      >
        + Add Condition
      </button>
    </div>

    <div class="strategy-tile-detail__final">
      <label>
        <span>Final fallback action</span>
        <select v-model="finalAction">
          <option v-for="action in availableActions" :key="action" :value="action">
            {{ action }}
          </option>
        </select>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {type PlayerAction} from "@/types/actions.ts";
import { useStrategyStore } from '@/stores/strategy'
import type { ScenarioKey, ComparisonRule } from '@/types/strategies'

const MAX_RULES_COUNT = 7

const props = defineProps<{ total: number; upcard: number }>()
const formattedUpcard = computed(() => (props.upcard === 1 ? 'A' : props.upcard))
const scenarioKey = computed<ScenarioKey>(() => `${props.total}_${props.upcard}`)
const strategyStore = useStrategyStore()

const toggles = [
  { key: 'isSoft', label: 'Is soft' },
  { key: 'canSurrender', label: 'Can surr' },
  { key: 'canDouble', label: 'Can double' },
  { key: 'canSplit', label: 'Can split' },
  { key: 'DAS', label: 'DAS' },
] as const

type CustomRule = ComparisonRule & {
  id: string
}
const createRule = (): CustomRule => ({
  id: crypto.randomUUID(),
  action: 'Hit',
  trueCountGreaterEqualTo: null,
})

const availableActions: PlayerAction[] = ['Hit', 'Stand', 'Double', 'Split', 'Surrender', 'Insurance']

const editableRules = ref<CustomRule[]>([])
const finalAction = ref<PlayerAction>('Hit')

const addRule = () => {
  if (editableRules.value.length >= MAX_RULES_COUNT) return
  editableRules.value.push(createRule())
}

const removeRule = (index: number) => {
  editableRules.value.splice(index, 1)
}

const moveRule = (index: number, delta: 1 | -1) => {
  const targetIndex = index + delta
  if (targetIndex < 0 || targetIndex >= editableRules.value.length) return
  const current = editableRules.value[index]
  const rules = [...editableRules.value]
  rules.splice(index, 1)
  rules.splice(targetIndex, 0, current)
  editableRules.value = rules
}

const hydrateFromStore = () => {
  const rules = strategyStore.getRulesForScenario(scenarioKey.value)
  if (!rules.length) {
    editableRules.value = []
    finalAction.value = 'Hit'
    return
  }
  const fallback = rules[rules.length - 1]
  const conditionals = rules.slice(0, -1)
  editableRules.value = conditionals.length
    ? conditionals.map(rule => ({id: crypto.randomUUID(), ...rule}))
    : []
  finalAction.value = (fallback?.action as PlayerAction) ?? 'Hit'
}

const persistToStore = () => {
  const serialized: ComparisonRule[] = [
    ...editableRules.value.map(({ id, ...rule }) => rule),
    { action: finalAction.value },
  ]
  strategyStore.setRulesForScenario(scenarioKey.value, serialized)
}

watch(
  [() => scenarioKey.value, () => strategyStore.selectedStrategyId],
  hydrateFromStore,
  { immediate: true },
)

watch(
  () => [editableRules.value, finalAction.value],
  persistToStore,
  { deep: true },
)
</script>

<style scoped>
.strategy-tile-detail {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.strategy-tile-detail__back {
  align-self: flex-start;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 0.4rem;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
}

.strategy-tile-detail__sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.strategy-tile-detail__section {
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.strategy-tile-detail__section header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.strategy-tile-detail__order {
  display: flex;
  gap: 0.2rem;
}

.strategy-tile-detail__section h4 {
  margin: 0;
  font-size: 0.9rem;
}

.strategy-tile-detail__remove,
.strategy-tile-detail__add {
  background: rgba(250, 204, 21, 0.15);
  border: 1px solid rgba(250, 204, 21, 0.3);
  color: #fff;
  border-radius: 0.35rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}

.strategy-tile-detail__add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.strategy-tile-detail__toggles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.4rem;
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
}

.toggle input {
  display: none;
}

.toggle__track {
  width: 32px;
  height: 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  transition: background 0.2s;
}

.toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}

.toggle input:checked + .toggle__track {
  background: #38bdf8;
}

.toggle input:checked + .toggle__track .toggle__thumb {
  transform: translateX(14px);
}

.strategy-tile-detail__action {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.strategy-tile-detail__action select,
.strategy-tile-detail__final select {
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3rem;
  padding: 0.35rem 0.5rem;
}

.strategy-tile-detail__final label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
</style>
