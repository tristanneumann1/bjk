/**
 * Pure classifier: was an incorrect decision a *deviation* mistake?
 *
 * A deviation mistake is either:
 *  (a) the count-correct play was a deviation the player failed to make, or
 *  (b) the player applied a deviation when the count did not call for it
 *      (their chosen action matches a count-gated rule that did not fire).
 *
 * No Vue, no Firebase — fully unit-testable.
 */
import type { PlayerAction } from '@/types/actions.ts'
import type { ComparisonRule } from '@/types/strategies.ts'
import { isDeviationRule } from '@/models/strategy/determineCorrectAction.ts'

export interface DeviationMistakeInput {
  matchedUpper?: ComparisonRule
  matchedLower?: ComparisonRule
  ruleSet: ComparisonRule[]
  chosenAction: PlayerAction
}

export function isDeviationMistake({
  matchedUpper,
  matchedLower,
  ruleSet,
  chosenAction,
}: DeviationMistakeInput): boolean {
  // (a) the correct play at this count came from a deviation rule
  if (isDeviationRule(matchedUpper) || isDeviationRule(matchedLower)) return true
  // (b) the player chose an action that only exists as a count-gated deviation here
  return ruleSet.some(rule => isDeviationRule(rule) && rule.action === chosenAction)
}
