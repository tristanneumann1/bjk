import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STRATEGIES } from '@/models/strategy/strategies'
import type { ComparisonRule, ScenarioKey, StrategyGrid } from '@/types/strategies'

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

  watch(
    selectedStrategyId,
    id => {
      const nextStrategy = STRATEGIES.find(strategy => strategy.id === id)
      if (nextStrategy) {
        strategyModel.value = cloneStrategyGrid(nextStrategy)
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
  }

  return {
    selectedStrategyId,
    selectedStrategy,
    setSelectedStrategy,
    strategies: STRATEGIES,
    strategyModel,
    getRulesForScenario,
    setRulesForScenario,
  }
})
