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
  action: PlayerAction
}

type ScenarioRules = Record<string, ComparisonRule[]>

export type StrategyGrid = {
  hard: ScenarioRules
  soft: ScenarioRules
  pair: ScenarioRules
}

export const strategyGrid: StrategyGrid = {
  hard: {},
  soft: {},
  pair: {},
}

type ScenarioType = keyof StrategyGrid

export function determineCorrectAction(
  session: Session,
): PlayerAction {
  const rules = session.rules as Rules
  const table = session.table
  const activeChair = table.activeChair
  const playerHand = activeChair?.activeHand
  const dealerUpCard = table.upCard
  const trueCount = Math.floor(table.runningCount / table.dealer.remainingDecks)

  if (!dealerUpCard || !playerHand) {
    throw new Error('Could not determine correct action')
  }

  const scenarioType = resolveScenarioType(playerHand)
  const scenarioKey = buildScenarioKey(playerHand, dealerUpCard, scenarioType)
  const ruleSet = strategyGrid[scenarioType][scenarioKey] ?? []
  const matchedRule = ruleSet.find(rule => matchesCountRule(trueCount, rule))
  if (matchedRule) {
    return matchedRule.action
  }

  throw 'Could not find rule'
}

const matchesCountRule = (count: number, rule: ComparisonRule): boolean => {
  if (typeof rule.count_gt === 'number' && !(count > rule.count_gt)) {
    return false
  }
  if (typeof rule.count_gte === 'number' && !(count >= rule.count_gte)) {
    return false
  }
  if (typeof rule.count_lt === 'number' && !(count < rule.count_lt)) {
    return false
  }
  if (typeof rule.count_lte === 'number' && !(count <= rule.count_lte)) {
    return false
  }
  return true
}

const resolveScenarioType = (hand: Hand): ScenarioType => {
  if (hand.isSoft) {
    return 'soft'
  }
  return 'hard'
}

const buildScenarioKey = (hand: Hand, dealerCard: Card, scenario: ScenarioType): string => {
  const dealerValue = dealerCard.value

  const playerValue = hand.bestValue
  return `${scenario}_${playerValue}_vs_${dealerValue}`
}
