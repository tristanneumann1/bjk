import type { RuleFields } from '@/simulation/ruleFields'
import type { SimulationResult } from '@/simulation/types'
import type { StrategyGrid } from '@/types/strategies'

export interface SimulationWorkerRequest {
  requestId: number
  shoeCount: number
  ruleFields: RuleFields
  strategyGrid: StrategyGrid
  betSpread: number[]
  startingBalance: number
  seed?: string
}

export type SimulationWorkerResponse =
  | { requestId: number; result: SimulationResult; error?: undefined }
  | { requestId: number; error: string; result?: undefined }
