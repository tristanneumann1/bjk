import type { BaseDoc } from '@/docs/base'
import type { Rules } from '@/models/rules'
import { nanoid } from 'nanoid'

export type RulesDoc = Pick<Rules,
  'deckCount'
  | 'dealerHitsSoft17'
  | 'doubleAllowedAfterSplit'
  | 'resplitAcesAllowed'
  | 'surrenderAllowed'
  | 'maxSplits'
  | 'blackjackPayout'
  | 'penetration'
  | 'dealerPeekA10'
>

export type GameDoc = BaseDoc & RulesDoc

export const GAMES_SUBCOLLECTION = 'Games'

export const buildGameDocId = (id?: string) => `gm_${id ?? nanoid()}`

export const serializeRulesDoc = (rules: Rules): RulesDoc => ({
  deckCount: rules.deckCount,
  dealerHitsSoft17: rules.dealerHitsSoft17,
  doubleAllowedAfterSplit: rules.doubleAllowedAfterSplit,
  resplitAcesAllowed: rules.resplitAcesAllowed,
  surrenderAllowed: rules.surrenderAllowed,
  maxSplits: rules.maxSplits,
  blackjackPayout: rules.blackjackPayout,
  penetration: rules.penetration,
  dealerPeekA10: rules.dealerPeekA10,
})
