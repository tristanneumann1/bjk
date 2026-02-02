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
          <button
            v-if="editableRules.length > 1"
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
import { computed, ref } from 'vue'
import {type PlayerAction} from "@/types/actions.ts";

const MAX_RULES_COUNT = 7

const props = defineProps<{ total: number; upcard: number }>()
const formattedUpcard = computed(() => (props.upcard === 1 ? 'A' : props.upcard))

const toggles = [
  { key: 'isSoft', label: 'Is soft' },
  { key: 'canSurrender', label: 'Can surr' },
  { key: 'canDouble', label: 'Can double' },
  { key: 'canSplit', label: 'Can split' },
  { key: 'DAS', label: 'DAS' },
] as const

type ToggleKey = (typeof toggles)[number]['key']

type EditableRule = {
  id: string
  action: PlayerAction
} & Record<ToggleKey, boolean>

const availableActions: PlayerAction[] = ['Hit', 'Stand', 'Double', 'Split', 'Surrender', 'Insurance']

const createRule = (): EditableRule => ({
  id: crypto.randomUUID(),
  action: 'Hit',
  canSplit: false,
  isSoft: false,
  canDouble: false,
  DAS: false,
  canSurrender: false,
})

const editableRules = ref<EditableRule[]>([createRule()])
const finalAction = ref<PlayerAction>('Hit')

const addRule = () => {
  if (editableRules.value.length >= MAX_RULES_COUNT) return
  editableRules.value.push(createRule())
}

const removeRule = (index: number) => {
  editableRules.value.splice(index, 1)
}
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
