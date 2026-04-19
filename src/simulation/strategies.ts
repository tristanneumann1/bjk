import { basicStrategyH17 } from '@/models/strategy/basicStrategyH17'
import { illustrious18Fab4H17 } from '@/models/strategy/illustrious18Fab4H17'
import type { StrategyGrid } from '@/types/strategies'

export const BUILTIN_STRATEGIES: Record<string, StrategyGrid> = {
  basicStrategyH17,
  illustrious18Fab4H17,
}

export const DEFAULT_STRATEGY_KEY = 'basicStrategyH17'
