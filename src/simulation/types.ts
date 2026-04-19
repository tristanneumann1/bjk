import type { Rules } from '@/models/rules'
import type { HandResult } from '@/models/chair'
import type { StrategyGrid } from '@/types/strategies'

export type ActionBound = 'upper' | 'lower'

export interface SimulationConfig {
  shoeCount: number
  strategy: StrategyGrid
  rules: Rules
  betSpread: number[]      // cents, ascending
  startingBalance: number  // cents
  seed?: string
  actionBound?: ActionBound  // default 'lower'
}

export type OutcomeKey = HandResult | 'None'

export interface SimulationResult {
  shoes: number
  rounds: number
  hands: number
  totalWagered: number      // cents
  startingBalance: number   // cents
  endingBalance: number     // cents
  netProfit: number         // cents
  roi: number               // netProfit / totalWagered
  evPer100Rounds: number    // cents
  finalRunningCount: number
  handOutcomes: Record<OutcomeKey, number>
}
