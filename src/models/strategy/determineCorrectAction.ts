import { Card } from '@/models/card'
import { Hand } from '@/models/hand'
import { Rules } from '@/models/rules'
import type { PlayerAction } from '@/types/actions'
import type {Session} from "@/models/session.ts"
import type {ComparisonRule, RulesMeta, ScenarioKey, StrategyGrid} from "@/types/strategies.ts";

export function isActionIncorrect(session: Session, strategy: StrategyGrid, action: PlayerAction) {
  const correctActions = determineCorrectAction(session, strategy)

  if (action === 'DeclineInsurance' && !correctActions.every(action => action === 'Insurance')) {
    return false
  }

  if (correctActions.includes(action)) {
    return false
  }
  return true
}

export function determineCorrectAction(
  session: Session,
  strategyGrid: StrategyGrid,
): PlayerAction[] {
  const rules = session.rules as Rules
  const table = session.table
  const activeChair  = table.activeChair
  const playerHand = activeChair?.activeHand
  const dealerUpCard = table.upCard
  const trueCountUpper = table.trueCountUpper
  const trueCountLower = table.trueCountLower

  if (!activeChair || !playerHand || !dealerUpCard) {
    return []
  }

  const canSplit = !activeChair.validateAction('Split')
  const canDouble = !activeChair.validateAction('Double')
  const canSurrender = !activeChair.validateAction('Surrender')
  const isSoft = playerHand.isSoft

  const ruleMeta: RulesMeta = {
    dealerUpCard: dealerUpCard.value,
    softValue: playerHand.softValue,
    canSplit,
    canDouble,
    canSurrender,
    isSoft,
    DAS: rules.doubleAllowedAfterSplit,
  }

  if (!dealerUpCard || !playerHand) {
    throw new Error('Could not determine correct action')
  }

  const scenarioKey = buildScenarioKey(playerHand, dealerUpCard)
  const ruleSet = strategyGrid[scenarioKey] ?? []

  const matchedRuleUpper = ruleSet.find(rule => matchesCountRule(ruleMeta, trueCountUpper, rule))
  const matchedRuleLower = ruleSet.find(rule => matchesCountRule(ruleMeta, trueCountLower, rule))
  if (!matchedRuleUpper?.action || !matchedRuleLower?.action) {
    throw `Missing default rule for ${playerHand.softValue} vs ${dealerUpCard.value}`
  }
  return [matchedRuleUpper.action, matchedRuleLower.action]
}

const matchesCountRule = (ruleMeta: RulesMeta, count: number, rule: ComparisonRule): boolean => {
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
  if (typeof rule.trueCountGreaterEqualTo === 'number' && count < rule.trueCountGreaterEqualTo) {
    return false
  }
  return true
}

const buildScenarioKey = (hand: Hand, dealerCard: Card): ScenarioKey => {
  const dealerValue = dealerCard.value

  const playerValue = hand.softValue
  return `${playerValue}_${dealerValue}`
}
