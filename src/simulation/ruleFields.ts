import { Rules } from '@/models/rules'

// Plain, structured-clone-friendly snapshot of the Rules fields. A real `Rules`
// instance can't cross a Web Worker boundary (its prototype is dropped), so we
// always pass this shape and rebuild the instance inside the worker.
export interface RuleFields {
  deckCount: number
  dealerHitsSoft17: boolean
  doubleAllowedAfterSplit: boolean
  resplitAcesAllowed: boolean
  surrenderAllowed: boolean
  insuranceAllowed: boolean
  maxSplits: number
  blackjackPayout: number
  dealerPeekA10: boolean
  hitAfterSplitAces: boolean
  penetration: number
}

export const rulesFromFields = (fields: RuleFields): Rules => {
  const rules = new Rules()
  rules.deckCount = fields.deckCount
  rules.dealerHitsSoft17 = fields.dealerHitsSoft17
  rules.doubleAllowedAfterSplit = fields.doubleAllowedAfterSplit
  rules.resplitAcesAllowed = fields.resplitAcesAllowed
  rules.surrenderAllowed = fields.surrenderAllowed
  rules.insuranceAllowed = fields.insuranceAllowed
  rules.maxSplits = fields.maxSplits
  rules.blackjackPayout = fields.blackjackPayout
  rules.dealerPeekA10 = fields.dealerPeekA10
  rules.hitAfterSplitAces = fields.hitAfterSplitAces
  rules.penetration = fields.penetration
  return rules
}
