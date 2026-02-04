import type { BaseDoc } from '@/docs/base'
import type {ComparisonRule, ScenarioKey, StrategyGrid} from '@/types/strategies'
import {nanoid} from "nanoid";

export type StrategyDoc = BaseDoc & {
  id: string,
  name: string
  rules: Record<ScenarioKey, ComparisonRule[]>
}

export const toStrategyGrid = (doc: StrategyDoc): StrategyGrid => ({
  id: doc.id,
  name: doc.name,
  ...doc.rules,
})

export const buildStrategyDocId = (id?: string | number) => `stg_${id ?? nanoid()}`

export const STRATEGY_COLLECTION = 'Strategies'
