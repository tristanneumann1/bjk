import type { BaseDoc } from '@/docs/base'
import { nanoid } from 'nanoid'
import type {Card} from "@/types/card.ts";
import type {PlayerAction} from "@/types/actions.ts";

export type ActionDoc = BaseDoc & {
  cards: Card[],
  upCard: Card,
  startingTrueCountUpper: number,
  startingTrueCountLower: number,
  chosenAction: PlayerAction,
  strategyId: string,
  expectedAction: PlayerAction[]
}

export const ACTIONS_SUBCOLLECTION = 'Actions'

export const buildActionDocId = (id?: string) => `act_${id ?? nanoid()}`
