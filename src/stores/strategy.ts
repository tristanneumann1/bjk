import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STRATEGIES } from '@/models/strategy/strategies'
import type { ComparisonRule, ScenarioKey, StrategyGrid } from '@/types/strategies'
import { getAuth } from 'firebase/auth'
import { upsertPlayerDoc } from '@/lib/firestore'
import {buildStrategyDocId, STRATEGY_COLLECTION, type StrategyDoc} from '@/docs/strategy'

const isScenarioKey = (key: string): key is ScenarioKey => /\d+_\d+/.test(key)

const cloneRules = (rules: ComparisonRule[]): ComparisonRule[] => rules.map(rule => ({ ...rule }))

const cloneStrategyGrid = (grid: StrategyGrid): Record<ScenarioKey, ComparisonRule[]> => {
  const entries = Object.entries(grid)
    .filter(([key]) => isScenarioKey(key))
    .map(([key, value]) => [key as ScenarioKey, cloneRules(value as ComparisonRule[])])
  return Object.fromEntries(entries)
}

export const useStrategyStore = defineStore('strategy', () => {
  const selectedStrategyId = ref(STRATEGIES[0]?.id ?? '')
  const strategyModel = ref<Record<ScenarioKey, ComparisonRule[]>>({})
  const hasUnsavedChanges = ref(false)

  const auth = getAuth()
  const currentUserUid = computed(() => auth.currentUser?.uid ?? null)

  watch(
    selectedStrategyId,
    id => {
      const nextStrategy = STRATEGIES.find(strategy => strategy.id === id)
      if (nextStrategy) {
        strategyModel.value = cloneStrategyGrid(nextStrategy)
        hasUnsavedChanges.value = false
      }
    },
    { immediate: true },
  )

  const selectedStrategy = computed<StrategyGrid>(() =>
    STRATEGIES.find(strategy => strategy.id === selectedStrategyId.value) ?? STRATEGIES[0],
  )

  const setSelectedStrategy = (id: string) => {
    if (STRATEGIES.some(strategy => strategy.id === id)) {
      selectedStrategyId.value = id
    }
  }

  const getRulesForScenario = (key: ScenarioKey): ComparisonRule[] => {
    return strategyModel.value[key] ? cloneRules(strategyModel.value[key]) : []
  }

  const setRulesForScenario = (key: ScenarioKey, rules: ComparisonRule[]) => {
    strategyModel.value = {
      ...strategyModel.value,
      [key]: cloneRules(rules),
    }
    hasUnsavedChanges.value = true
  }

  const markStrategySaved = () => {
    hasUnsavedChanges.value = false
  }

  const saveStrategy = async (name: string, strategyId?: string) => {
    const userUid = currentUserUid.value
    if (!userUid || !name.trim()) return

    const targetId = strategyId ?? buildStrategyDocId()

    const a = {
        id: targetId,
        name,
        rules: strategyModel.value,
    }
    console.log('a', a)

    await upsertPlayerDoc<StrategyDoc>(
      userUid,
      [STRATEGY_COLLECTION, targetId],
      {
        id: targetId,
        name,
        rules: strategyModel.value,
      },
    )
    hasUnsavedChanges.value = false
  }

  return {
    selectedStrategyId,
    selectedStrategy,
    setSelectedStrategy,
    strategies: STRATEGIES,
    strategyModel,
    getRulesForScenario,
    setRulesForScenario,
    hasUnsavedChanges,
    markStrategySaved,
    saveStrategy,
  }
})
