import type {BaseDoc} from "@/docs/base.ts";

export type PlayerDoc = BaseDoc & {
  balance: number
}

export const playerDocId = (uid: string) => `plyr_${uid}`

export const PLAYER_COLLECTION = 'Players'
