import type { BaseDoc } from '@/docs/base'
import { nanoid } from 'nanoid'

export type RoundDoc = BaseDoc & {
  startingTrueCountLower: number,
  startingTrueCountUpper: number,
  betAmounts: number[]|null,
  strategyId?: string,
}

export const ROUNDS_SUBCOLLECTION = 'Rounds'

export const buildRoundDocId = (id?: string | number) => `rnd_${id ?? nanoid()}`
