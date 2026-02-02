import type {PlayerAction} from "@/types/actions.ts";

export type ComparisonRule = {
  count_gt?: number
  count_gte?: number
  count_lt?: number
  count_lte?: number

  isSoft?: boolean
  canSplit?: boolean
  canDouble?: boolean
  canSurrender?: boolean
  DAS?: boolean

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
