/**
 * Pure mistake categorizer — maps the facts of a single incorrect decision to
 * its families (insurance / surrender / pairs / soft / hard-stiff) and the
 * deviation-vs-basic distinction. No Vue, no Firebase: fully unit-testable.
 *
 * `isDeviation` is supplied by the caller (computed at write time from the
 * matched ComparisonRule via isDeviationRule), so this stays a pure function of
 * its input.
 */
import type { PlayerAction } from '@/types/actions.ts'
import type { MistakeCategorization, MistakeFamily } from '@/types/analytics.ts'

export interface MistakeFacts {
  /** Player hand soft value (sum with Ace = 1), matching the strategy scenario key. */
  handValue: number
  /** Dealer upcard numeric value (1 = Ace). */
  dealerUpCard: number
  isSoft: boolean
  isPair: boolean
  /** Card value of the pair (1 = Aces, 10 = T/J/Q/K) when isPair. */
  pairValue?: number
  chosenAction: PlayerAction
  expectedAction: PlayerAction[]
  isDeviation: boolean
}

const INSURANCE_ACTIONS: PlayerAction[] = ['Insurance', 'DeclineInsurance']

const involvesInsurance = (facts: MistakeFacts): boolean =>
  INSURANCE_ACTIONS.includes(facts.chosenAction) ||
  facts.expectedAction.some(action => INSURANCE_ACTIONS.includes(action))

const involvesSurrender = (facts: MistakeFacts): boolean =>
  facts.chosenAction === 'Surrender' || facts.expectedAction.includes('Surrender')

export function categorizeMistake(facts: MistakeFacts): MistakeCategorization {
  const families: MistakeFamily[] = []
  const deviationFamily: MistakeFamily = facts.isDeviation ? 'deviation' : 'basic'

  // Insurance is a decision about the dealer's Ace, not the player's hand shape,
  // so it does not also pick up pairs/soft/hard-stiff tags.
  if (involvesInsurance(facts)) {
    families.push('insurance', deviationFamily)
  } else {
    if (involvesSurrender(facts)) families.push('surrender')
    if (facts.isPair) families.push('pairs')
    if (facts.isSoft) families.push('soft')
    if (!facts.isSoft && !facts.isPair && facts.handValue >= 12 && facts.handValue <= 16) {
      families.push('hard-stiff')
    }
    families.push(deviationFamily)
  }

  const categorization: MistakeCategorization = {
    handValue: facts.handValue,
    dealerUpCard: facts.dealerUpCard,
    isSoft: facts.isSoft,
    isPair: facts.isPair,
    isDeviation: facts.isDeviation,
    families,
  }
  // WHY: omit pairValue entirely when absent — Firestore rejects writes containing
  // `undefined`, which would silently drop every non-pair mistake.
  if (facts.isPair && facts.pairValue !== undefined) {
    categorization.pairValue = facts.pairValue
  }
  return categorization
}
