import type {PlayerAction} from "@/types/actions.ts";

export type ComparisonRule = {
  isSoft?: boolean
  canSplit?: boolean
  canDouble?: boolean
  canSurrender?: boolean
  canInsure?: boolean
  DAS?: boolean
  trueCountGreaterEqualTo?: number | null

  action: PlayerAction
}

export type ScenarioKey = `${number}_${number}`
export const isScenarioKey = (input: unknown | ScenarioKey): input is ScenarioKey => /^\d+_\d+$/.test(<string>input)

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
  canInsure: boolean
  isSoft: boolean
  DAS: boolean
}
