import type {PlayerAction} from "@/types/actions.ts";

export type ComparisonRule = {
  isSoft?: boolean
  canSplit?: boolean
  canDouble?: boolean
  canSurrender?: boolean
  DAS?: boolean
  trueCountGreaterEqualTo?: number | null

  action: PlayerAction
}

export type ScenarioKey = `${number}_${number}`

export type StrategyGrid = { id: string, name: string } & {
  [K in ScenarioKey]: ComparisonRule[]
}

export interface RulesMeta {
  // strategyId: string
  dealerUpCard: number
  softValue: number
  canSplit: boolean
  canDouble: boolean
  canSurrender: boolean
  isSoft: boolean
  DAS: boolean
}
