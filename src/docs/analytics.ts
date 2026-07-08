import type { BaseDoc } from '@/docs/base'
import type { MistakeFamily, StoredMistake } from '@/types/analytics.ts'
import { increment } from 'firebase/firestore'
import { nanoid } from 'nanoid'

/** Subcollection holding per-player aggregate analytics docs. */
export const ANALYTICS_SUBCOLLECTION = 'Analytics'
/** Fixed doc id for the cumulative mistake summary. */
export const MISTAKE_SUMMARY_DOC_ID = 'mistakeSummary'
/** Subcollection of individual mistake records (for drill-down). */
export const MISTAKES_SUBCOLLECTION = 'Mistakes'

export const buildMistakeDocId = (id?: string) => `mst_${id ?? nanoid()}`

/**
 * All-time cumulative mistake aggregate. Updated with atomic increments so the
 * analytics view is a single cheap read.
 */
export type MistakeSummaryDoc = BaseDoc & {
  total: number
  byFamily: Partial<Record<MistakeFamily, number>>
  /** Heatmap counts, hard hands only; key = `${handValue}_${upcard}` (upcard 1 = Ace). */
  hardCells: Record<string, number>
}

/** A hard hand maps cleanly onto the hard-totals heatmap grid. */
const isHardHand = (mistake: StoredMistake): boolean =>
  !mistake.isSoft && !mistake.isPair && !mistake.families.includes('insurance')

/**
 * Build the nested `increment()` payload for one mistake. Merge-written onto the
 * summary doc: bumps total, each family bucket, and (for hard hands) the heatmap cell.
 */
export const buildSummaryIncrement = (mistake: StoredMistake): Record<string, unknown> => {
  const byFamily: Record<string, unknown> = {}
  for (const family of mistake.families) {
    byFamily[family] = increment(1)
  }

  const payload: Record<string, unknown> = {
    total: increment(1),
    byFamily,
  }

  if (isHardHand(mistake)) {
    payload.hardCells = { [mistake.cellKey]: increment(1) }
  }

  return payload
}
