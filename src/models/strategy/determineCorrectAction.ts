import { Card } from '@/models/card'
import { Hand } from '@/models/hand'
import { Rules } from '@/models/rules'
import type { PlayerAction } from '@/types/actions'
import type {Session} from "@/models/session.ts"
import type {ComparisonRule, RulesMeta, ScenarioKey, StrategyGrid} from "@/types/strategies.ts";

export interface DetailedCorrectAction {
  actions: PlayerAction[]
  /** The rule matched at the upper true-count bound (undefined if none matched). */
  matchedUpper?: ComparisonRule
  /** The rule matched at the lower true-count bound (undefined if none matched). */
  matchedLower?: ComparisonRule
  /** The full ordered rule set for this scenario (empty if the scenario is unknown). */
  ruleSet: ComparisonRule[]
}

export function isActionIncorrect(session: Session, strategy: StrategyGrid, action: PlayerAction) {
  const correctActions = determineCorrectAction(session, strategy)

  if (action === 'DeclineInsurance' && !correctActions.every(action => action === 'Insurance')) {
    return false
  }

  return !correctActions.includes(action);

}

export function determineCorrectAction(
  session: Session,
  strategyGrid: StrategyGrid,
): PlayerAction[] {
  return determineCorrectActionDetailed(session, strategyGrid).actions
}

/**
 * Like determineCorrectAction, but also surfaces the ComparisonRule that matched
 * at each true-count bound. Analytics uses the matched rule to tell a deviation
 * (rule has a numeric trueCountGreaterEqualTo) apart from a basic-strategy play.
 */
export function determineCorrectActionDetailed(
  session: Session,
  strategyGrid: StrategyGrid,
): DetailedCorrectAction {
  const rules = session.rules as Rules
  const table = session.table
  const activeChair  = table.activeChair
  const playerHand = activeChair?.activeHand
  const dealerUpCard = table.upCard
  const trueCountUpper = table.trueCountUpper
  const trueCountLower = table.trueCountLower

  if (!activeChair || !playerHand || !dealerUpCard) {
    return { actions: [], ruleSet: [] }
  }

  const canSplit = !activeChair.validateAction('Split')
  const canDouble = !activeChair.validateAction('Double')
  const canSurrender = !activeChair.validateAction('Surrender')
  const canInsure = !activeChair.validateAction('Insurance')
  const isSoft = playerHand.isSoft

  const ruleMeta: RulesMeta = {
    dealerUpCard: dealerUpCard.value,
    softValue: playerHand.softValue,
    canSplit,
    canDouble,
    canSurrender,
    isSoft,
    canInsure,
    DAS: rules.doubleAllowedAfterSplit,
  }

  if (!dealerUpCard || !playerHand) {
    throw new Error('Could not determine correct action')
  }

  const scenarioKey = buildScenarioKey(playerHand, dealerUpCard)
  const ruleSet = strategyGrid[scenarioKey] ?? []

  const matchedUpper = ruleSet.find(rule => matchesCountRule(ruleMeta, trueCountUpper, rule))
  const matchedLower = ruleSet.find(rule => matchesCountRule(ruleMeta, trueCountLower, rule))

  if (canInsure) {
    const upper: PlayerAction = matchedUpper?.action === 'Insurance' ? 'Insurance' : 'DeclineInsurance'
    const lower: PlayerAction = matchedLower?.action === 'Insurance' ? 'Insurance' : 'DeclineInsurance'
    return { actions: [upper, lower], matchedUpper, matchedLower, ruleSet }
  }

  if (!matchedUpper?.action || !matchedLower?.action) {
    throw `Missing default rule for ${playerHand.softValue} vs ${dealerUpCard.value}`
  }
  return { actions: [matchedUpper.action, matchedLower.action], matchedUpper, matchedLower, ruleSet }
}

export const matchesCountRule = (ruleMeta: RulesMeta, count: number, rule: ComparisonRule): boolean => {
  if (rule.isSoft && !ruleMeta.isSoft) {
    return false
  }
  if (rule.canDouble && !ruleMeta.canDouble) {
    return false
  }
  if (rule.canSplit && !ruleMeta.canSplit) {
    return false
  }
  if (rule.canSurrender && !ruleMeta.canSurrender) {
    return false
  }
  if (rule.DAS && !ruleMeta.DAS) {
    return false
  }
  if (rule.canInsure && !ruleMeta.canInsure) {
    return false
  }
  return !(typeof rule.trueCountGreaterEqualTo === 'number' && count < rule.trueCountGreaterEqualTo);

}

export const buildScenarioKey = (hand: Hand, dealerCard: Card): ScenarioKey => {
  const dealerValue = dealerCard.value

  const playerValue = hand.softValue
  return `${playerValue}_${dealerValue}`
}

/** A rule is a count-dependent deviation when it gates on a true-count threshold. */
export const isDeviationRule = (rule?: ComparisonRule): boolean =>
  typeof rule?.trueCountGreaterEqualTo === 'number'
