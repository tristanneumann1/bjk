import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { STRATEGIES } from '@/models/strategy/strategies'
import type { ComparisonRule, ScenarioKey, StrategyGrid } from '@/types/strategies'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getPlayerDocs, upsertPlayerDoc } from '@/lib/firestore'
import { buildStrategyDocId, STRATEGY_COLLECTION, type StrategyDoc, toStrategyGrid } from '@/docs/strategy'

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
  const customStrategies = ref<StrategyGrid[]>([])

  const auth = getAuth()
  const currentUid = ref<string | null>(auth.currentUser?.uid ?? null)
  const isAuthenticated = computed(() => Boolean(currentUid.value))

  const loadCustomStrategies = async () => {
    if (!currentUid.value) {
      customStrategies.value = []
      return
    }

    try {
      const docs = await getPlayerDocs<StrategyDoc>(currentUid.value, [STRATEGY_COLLECTION], {})
      customStrategies.value = docs
        .filter((entry): entry is StrategyDoc => Boolean(entry))
        .map(doc => toStrategyGrid(doc))
    } catch (error) {
      console.error('Failed to load strategies', error)
      customStrategies.value = []
    }
  }

  onAuthStateChanged(auth, user => {
    currentUid.value = user?.uid ?? null
    void loadCustomStrategies()
  })

  const findStrategyById = (id: string) =>
    STRATEGIES.find(strategy => strategy.id === id) ?? customStrategies.value.find(strategy => strategy.id === id)

  const applyStrategyById = (id: string) => {
    const nextStrategy = findStrategyById(id)
    if (nextStrategy) {
      strategyModel.value = cloneStrategyGrid(nextStrategy)
      hasUnsavedChanges.value = false
    }
  }

  watch(selectedStrategyId, applyStrategyById, { immediate: true })

  const selectedStrategy = computed<StrategyGrid>(() =>
    findStrategyById(selectedStrategyId.value) ?? STRATEGIES[0],
  )

  const setSelectedStrategy = (id: string) => {
    if (findStrategyById(id)) {
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
    if (!currentUid.value || !name.trim()) return

    const targetId = strategyId ?? buildStrategyDocId()

    await upsertPlayerDoc<StrategyDoc>(currentUid.value, [STRATEGY_COLLECTION, targetId], {
      id: targetId,
      name,
      rules: strategyModel.value,
    })

    await loadCustomStrategies()
    selectedStrategyId.value = targetId
    hasUnsavedChanges.value = false
  }

  const availableStrategies = computed(() => [...STRATEGIES, ...customStrategies.value])

  void loadCustomStrategies()

  return {
    selectedStrategyId,
    selectedStrategy,
    setSelectedStrategy,
    strategies: availableStrategies,
    strategyModel,
    getRulesForScenario,
    setRulesForScenario,
    hasUnsavedChanges,
    markStrategySaved,
    saveStrategy,
    customStrategies,
    loadCustomStrategies,
    isAuthenticated,
  }
})
