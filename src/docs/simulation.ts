import type { BaseDoc } from '@/docs/base'
import type { RuleFields } from '@/simulation/ruleFields'
import type { SimulationResult } from '@/simulation/types'
import { nanoid } from 'nanoid'

export const SIMULATIONS_SUBCOLLECTION = 'Simulations'

export const buildSimulationDocId = (id?: string) => `sim_${id ?? nanoid()}`

// The exact inputs that drove the run. Storing these plus the raw per-round
// statistics below is sufficient to recompute any metric later (Risk of Ruin at
// a different bankroll, N0 at a different hands-per-hour, …) WITHOUT re-running.
export type SimulationConfigDoc = RuleFields & {
  betSpread: number[]
  strategyId: string
  strategyName: string
  handsPerHour: number
  bankroll: number // cents
  shoeCount: number
  seed: string | null
}

// Raw sufficient statistics from the simulation. Every field is a finite number
// (Firestore rejects Infinity/NaN), so we deliberately do NOT store the derived
// metrics — n0Rounds/n0Hours can be Infinity. Recompute them from these.
export type SimulationStatsDoc = {
  shoes: number
  rounds: number
  hands: number
  totalWagered: number // cents
  netProfit: number // cents
  perRoundMean: number
  perRoundVariance: number
  perRoundStdDev: number
  finalRunningCount: number
  handOutcomes: Record<string, number>
}

export type SimulationDoc = BaseDoc & {
  id: string
  config: SimulationConfigDoc
  stats: SimulationStatsDoc
}

export interface BuildSimulationDocParams {
  id: string
  ruleFields: RuleFields
  betSpread: number[]
  strategyId: string
  strategyName: string
  handsPerHour: number
  bankroll: number
  shoeCount: number
  seed?: string
  sim: SimulationResult
}

/**
 * Assemble a persistable simulation record. Pure — no Firestore, no auth — so it
 * is unit-testable. `seed` is normalised to `null` because Firestore rejects
 * `undefined`.
 */
export const buildSimulationDoc = (params: BuildSimulationDocParams): SimulationDoc => {
  const { sim } = params
  return {
    id: params.id,
    config: {
      ...params.ruleFields,
      betSpread: [...params.betSpread],
      strategyId: params.strategyId,
      strategyName: params.strategyName,
      handsPerHour: params.handsPerHour,
      bankroll: params.bankroll,
      shoeCount: params.shoeCount,
      seed: params.seed ?? null,
    },
    stats: {
      shoes: sim.shoes,
      rounds: sim.rounds,
      hands: sim.hands,
      totalWagered: sim.totalWagered,
      netProfit: sim.netProfit,
      perRoundMean: sim.perRoundMean,
      perRoundVariance: sim.perRoundVariance,
      perRoundStdDev: sim.perRoundStdDev,
      finalRunningCount: sim.finalRunningCount,
      handOutcomes: { ...sim.handOutcomes },
    },
  }
}
