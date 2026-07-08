/**
 * Pure label / formatting helpers for mistake analytics display (heatmap headers,
 * drill-down rows). No Vue, no Firebase.
 */
import type { StoredMistake } from '@/types/analytics.ts'

export const formatUpcard = (value: number): string => (value === 1 || value === 11 ? 'A' : String(value))

const formatPairRank = (value?: number): string => {
  if (value === 1 || value === 11) return 'Aces'
  if (value === undefined) return 'cards'
  return `${value}s`
}

/** Human label for a player hand: "Pair of 4s" / "Soft 18" / "Hard 16". */
export const handGroupLabel = (mistake: Pick<StoredMistake, 'isPair' | 'isSoft' | 'handValue' | 'pairValue'>): string => {
  if (mistake.isPair) return `Pair of ${formatPairRank(mistake.pairValue)}`
  if (mistake.isSoft) return `Soft ${mistake.handValue + 10}`
  return `Hard ${mistake.handValue}`
}

/** Representative integer true count for a mistake (midpoint of the stored bounds). */
export const trueCountMidpoint = (lower: number, upper: number): number => Math.round((lower + upper) / 2)

/** Bucket the true count into the integer bands where deviations cluster. */
export const trueCountBucket = (lower: number, upper: number): string => {
  const midpoint = trueCountMidpoint(lower, upper)
  if (midpoint <= -1) return '≤ -1'
  if (midpoint === 0) return '0'
  if (midpoint >= 4) return '≥ +4'
  return `+${midpoint}`
}

/** Display the stored true-count range ("0" or "0 to 2"). */
export const formatTrueCountRange = (lower: number, upper: number): string =>
  lower === upper ? `${lower}` : `${lower} to ${upper}`
