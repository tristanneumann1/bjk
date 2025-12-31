import type { BaseDoc } from '@/docs/base'
import { nanoid } from 'nanoid'

export type RoundDoc = BaseDoc & {
  startingTrueCount: number,
  betAmounts: number|null[],
}

export const ROUNDS_SUBCOLLECTION = 'games'

export const buildRoundDocId = (id?: string) => `rnd_${id ?? nanoid()}`
