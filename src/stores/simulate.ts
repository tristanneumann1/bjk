import { defineStore } from 'pinia'
import { ref } from 'vue'
import { runSimulation } from '@/simulation/runSimulation'
import { rulesFromFields, type RuleFields } from '@/simulation/ruleFields'
import { computeSimulateMetrics } from '@/models/analytics/simulateMetrics'
import { useGameStore } from '@/stores/game'
import { useStrategyStore } from '@/stores/strategy'
import { useSettingsStore } from '@/stores/settings'
import { usePlayerStore } from '@/stores/player'
import { getAuth } from 'firebase/auth'
import { nanoid } from 'nanoid'
import { upsertPlayerDoc } from '@/lib/firestore'
import {
  buildSimulationDoc,
  buildSimulationDocId,
  SIMULATIONS_SUBCOLLECTION,
  type SimulationDoc,
} from '@/docs/simulation'
import type { StrategyGrid } from '@/types/strategies'
import type { SimulateMetrics } from '@/types/simulate'
import type { SimulationResult } from '@/simulation/types'
import type { SimulationWorkerRequest, SimulationWorkerResponse } from '@/simulation/workerMessages'

export type { RuleFields } from '@/simulation/ruleFields'

const DEFAULT_HANDS_PER_HOUR = 100
const DEFAULT_SHOE_COUNT = 500
// Simulation bankroll must be large enough that a bet is never refused (an
// unaffordable bet would short-circuit the round and bias μ/σ²). This is
// unrelated to the user's real bankroll used for Risk of Ruin.
const SIM_BANKROLL = 1_000_000_000_000 // 1e12 cents

// ── Web Worker plumbing (module singleton) ──────────────────────────────────
// Running a long sim off the main thread keeps the UI responsive. We keep one
// worker and correlate responses by requestId. If Worker is unavailable (SSR /
// tests), we transparently fall back to a synchronous run.
let worker: Worker | null = null
let requestSeq = 0
const pending = new Map<number, (res: SimulationWorkerResponse) => void>()

const getWorker = (): Worker | null => {
  if (typeof Worker === 'undefined') return null
  if (worker) return worker
  try {
    worker = new Worker(new URL('@/simulation/simulation.worker.ts', import.meta.url), {
      type: 'module',
    })
    worker.onmessage = (event: MessageEvent<SimulationWorkerResponse>) => {
      const resolve = pending.get(event.data.requestId)
      if (resolve) {
        pending.delete(event.data.requestId)
        resolve(event.data)
      }
    }
    return worker
  } catch (err) {
    console.warn('Simulation worker unavailable; running on main thread', err)
    worker = null
    return null
  }
}

const runSim = (payload: Omit<SimulationWorkerRequest, 'requestId'>): Promise<SimulationResult> => {
  const w = getWorker()
  if (!w) {
    // Synchronous fallback (blocks the main thread).
    return Promise.resolve(
      runSimulation({
        shoeCount: payload.shoeCount,
        strategy: payload.strategyGrid,
        rules: rulesFromFields(payload.ruleFields),
        betSpread: payload.betSpread,
        startingBalance: payload.startingBalance,
        seed: payload.seed,
      }),
    )
  }
  const requestId = ++requestSeq
  return new Promise<SimulationResult>((resolve, reject) => {
    pending.set(requestId, res => {
      if (res.result !== undefined) resolve(res.result)
      else reject(new Error(res.error ?? 'Simulation failed'))
    })
    w.postMessage({ requestId, ...payload } satisfies SimulationWorkerRequest)
  })
}

export const useSimulateStore = defineStore('simulate', () => {
  const gameStore = useGameStore()
  const strategyStore = useStrategyStore()
  const settingsStore = useSettingsStore()
  const playerStore = usePlayerStore()

  // ── Local, overridable what-if config (never mutates the source stores) ──
  const betSpread = ref<number[]>([...settingsStore.betSpread])
  const strategyGrid = ref<StrategyGrid>(strategyStore.selectedStrategy)
  const rules = ref<RuleFields>(currentRuleFields())
  const handsPerHour = ref(DEFAULT_HANDS_PER_HOUR)
  const shoeCount = ref(DEFAULT_SHOE_COUNT)
  const bankroll = ref(playerStore.balance) // cents
  // A fresh seed is generated per run (see run()) so each run is an independent
  // Monte Carlo sample. It is recorded on the persisted doc so any run remains
  // exactly reproducible after the fact.
  const seed = ref('')

  // ── Output ──────────────────────────────────────────────────────────────
  const result = ref<SimulateMetrics | null>(null)
  const isRunning = ref(false)
  const error = ref<string | null>(null)

  function currentRuleFields(): RuleFields {
    return {
      deckCount: gameStore.pendingDeckCount,
      dealerHitsSoft17: gameStore.dealerHitsSoft17,
      doubleAllowedAfterSplit: gameStore.doubleAllowedAfterSplit,
      resplitAcesAllowed: gameStore.resplitAcesAllowed,
      surrenderAllowed: gameStore.surrenderAllowed,
      insuranceAllowed: gameStore.insuranceAllowed,
      maxSplits: gameStore.pendingMaxSplits,
      blackjackPayout: gameStore.blackjackPayout,
      dealerPeekA10: gameStore.dealerPeekA10,
      hitAfterSplitAces: gameStore.hitAfterSplitAces,
      penetration: gameStore.pendingPenetration,
    }
  }

  const resetFromCurrentConfig = () => {
    betSpread.value = [...settingsStore.betSpread]
    strategyGrid.value = strategyStore.selectedStrategy
    rules.value = currentRuleFields()
    bankroll.value = playerStore.balance
  }

  const run = async () => {
    if (isRunning.value) return
    isRunning.value = true
    error.value = null
    // Fresh seed each run → independent sample, but still recorded for repro.
    seed.value = nanoid()
    try {
      const sim = await runSim({
        shoeCount: shoeCount.value,
        strategyGrid: JSON.parse(JSON.stringify(strategyGrid.value)),
        ruleFields: { ...rules.value },
        betSpread: [...betSpread.value],
        startingBalance: SIM_BANKROLL,
        seed: seed.value || undefined,
      })

      const avgBetPerRound = sim.rounds > 0 ? sim.totalWagered / sim.rounds : 0
      result.value = computeSimulateMetrics({
        perRoundMean: sim.perRoundMean,
        perRoundVariance: sim.perRoundVariance,
        rounds: sim.rounds,
        avgBetPerRound,
        bankroll: bankroll.value,
        handsPerHour: handsPerHour.value,
      })

      // Auto-save the run so it can be revisited / re-analyzed later. Fire and
      // forget — a failed write must not clobber the result already displayed.
      void persistRun(sim)
    } catch (err) {
      console.error('Simulation analysis failed', err)
      error.value = err instanceof Error ? err.message : 'Analysis failed'
      result.value = null
    } finally {
      isRunning.value = false
    }
  }

  const persistRun = async (sim: SimulationResult) => {
    const uid = getAuth().currentUser?.uid
    if (!uid) {
      return // Not signed in — nothing to persist to.
    }
    try {
      const id = buildSimulationDocId()
      const docData = buildSimulationDoc({
        id,
        ruleFields: { ...rules.value },
        betSpread: [...betSpread.value],
        strategyId: strategyGrid.value.id,
        strategyName: strategyGrid.value.name,
        handsPerHour: handsPerHour.value,
        bankroll: bankroll.value,
        shoeCount: shoeCount.value,
        seed: seed.value || undefined,
        sim,
      })
      await upsertPlayerDoc<SimulationDoc>(uid, [SIMULATIONS_SUBCOLLECTION, id], docData)
    } catch (err) {
      console.error('Failed to persist simulation run', err)
    }
  }

  return {
    betSpread,
    strategyGrid,
    rules,
    handsPerHour,
    shoeCount,
    bankroll,
    seed,
    result,
    isRunning,
    error,
    resetFromCurrentConfig,
    run,
  }
})
