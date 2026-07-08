import type { Card } from '@/types/card.ts'
import type { PlayerAction } from '@/types/actions.ts'

/**
 * High-level categories a mistake can belong to. A single mistake may belong to
 * several (e.g. failing to take insurance at TC>=3 is both `insurance` and
 * `deviation`). `deviation` and `basic` are mutually exclusive.
 */
export type MistakeFamily =
  | 'insurance'
  | 'surrender'
  | 'pairs'
  | 'soft'
  | 'hard-stiff'
  | 'deviation'
  | 'basic'

/**
 * A single incorrect decision, denormalized onto its GameDoc so the analytics
 * read path is a single cheap query for the last N games. Carries both the raw
 * fields (for the detailed list view + future re-categorization) and the
 * write-time categorization (precise, because the live matched rule was known).
 */
export interface StoredMistake {
  /** Unique discriminator. */
  id: string
  roundId: string
  strategyId: string
  cards: Card[]
  upCard: Card
  startingTrueCountLower: number
  startingTrueCountUpper: number
  chosenAction: PlayerAction
  expectedAction: PlayerAction[]
  // Derived (write-time) fields used for grouping, labeling and categorization:
  handValue: number
  dealerUpCard: number
  /** `${handValue}_${dealerUpCard}` — single-field key for cheap drill-down queries. */
  cellKey: string
  isSoft: boolean
  isPair: boolean
  /** Card value of the pair (1 = Aces, 10 = T/J/Q/K) when isPair. */
  pairValue?: number
  isDeviation: boolean
  families: MistakeFamily[]
}

/** The subset of StoredMistake the pure categorizer needs to assign families. */
export interface MistakeCategorization {
  handValue: number
  dealerUpCard: number
  isSoft: boolean
  isPair: boolean
  pairValue?: number
  isDeviation: boolean
  families: MistakeFamily[]
}

/** Roll-up count for a single family. */
export interface FamilyCount {
  family: MistakeFamily
  count: number
}

/** Resolved, view-ready summary derived from the aggregate doc. */
export interface MistakeSummary {
  total: number
  familyRollup: FamilyCount[]
  /** Heatmap counts keyed `${handValue}_${dealerUpCard}` (hard hands only). */
  hardCells: Record<string, number>
  /** Largest cell count, for gradient scaling. */
  maxCell: number
}

/** What slice of individual mistakes a drill-down should fetch. */
export type MistakeExampleFilter =
  | { type: 'cell'; total: number; upcard: number }
  | { type: 'family'; family: MistakeFamily }
