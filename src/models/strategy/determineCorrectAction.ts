import { Card } from '@/models/card'
import { Hand } from '@/models/hand'
import { Rules } from '@/models/rules'
import type { PlayerAction } from '@/types/actions'
import type {Session} from "@/models/session.ts"


type ComparisonRule = {
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

type ScenarioKey = `${number}_${number}`

export type StrategyGrid = { id: string, name: string } & {
  [K in ScenarioKey]: ComparisonRule[]
}

interface RulesMeta {
  // strategyId: string
  dealerUpCard: number
  softValue: number
  canSplit: boolean
  canDouble: boolean
  canSurrender: boolean
  isSoft: boolean
  DAS: boolean
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
  // if (typeof rule.count_gt === 'number' && !(count > rule.count_gt)) {
  //   return false
  // }
  // if (typeof rule.count_gte === 'number' && !(count >= rule.count_gte)) {
  //   return false
  // }
  // if (typeof rule.count_lt === 'number' && !(count < rule.count_lt)) {
  //   return false
  // }
  // if (typeof rule.count_lte === 'number' && !(count <= rule.count_lte)) {
  //   return false
  // }
  return true
}

const buildScenarioKey = (hand: Hand, dealerCard: Card): ScenarioKey => {
  const dealerValue = dealerCard.value

  const playerValue = hand.softValue
  return `${playerValue}_${dealerValue}`
}
