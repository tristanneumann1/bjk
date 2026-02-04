import type { BaseDoc } from '@/docs/base'
import type { ComparisonRule, ScenarioKey } from '@/types/strategies'
import {nanoid} from "nanoid";

export type StrategyDoc = BaseDoc & {
  id: string,
  name: string
  isDefault?: boolean
  rules: Record<ScenarioKey, ComparisonRule[]>
}

export const buildStrategyDocId = (id?: string | number) => `stg_${id ?? nanoid()}`

export const STRATEGY_COLLECTION = 'Strategies'
