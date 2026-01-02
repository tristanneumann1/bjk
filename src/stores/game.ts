import { defineStore } from 'pinia'
import { onScopeDispose, ref } from 'vue'
import {modelEvents, userEvent, type UserEventMap} from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'
import {getAuth} from "firebase/auth";
import {Session} from "@/models/session.ts";
import {buildGameDocId, type GameDoc, GAMES_SUBCOLLECTION, serializeRulesDoc} from "@/docs/game.ts";
import {upsertPlayerDoc} from "@/lib/firestore.ts";
import {buildRoundDocId, type RoundDoc, ROUNDS_SUBCOLLECTION} from "@/docs/round.ts";

export const useGameStore = defineStore('game', () => {
  const currentGameId = ref<string | null>(null)
  const roundId = ref<number>(0)

  const session = Session.getInstance()

  async function persistGame() {
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return

    const rules = session.rules
    const rulesDoc = serializeRulesDoc(rules)

    const startingTrueCountLower = session.table.trueCountLower
    const startingTrueCountUpper = session.table.trueCountUpper

    const betAmounts = session.table.playerChairArray.map((chair) => {
      return chair.bet
    })

    if(!currentGameId.value) {
      const gameId = buildGameDocId()
      await upsertPlayerDoc<GameDoc>(userId, [GAMES_SUBCOLLECTION, gameId], rulesDoc)
      currentGameId.value = gameId
    }

    await upsertPlayerDoc<RoundDoc>(userId, [GAMES_SUBCOLLECTION, currentGameId.value, ROUNDS_SUBCOLLECTION, buildRoundDocId('' + roundId.value)], {
      startingTrueCountLower,
      startingTrueCountUpper,
      betAmounts
    })
  }

  const onPlay = async () => {
    roundId.value++
    const persistGamePromise = persistGame()
    session.table.startRound();
    try {
      await persistGamePromise
    } catch (error) {
      console.error('Failed to persist game', error)
    }
  }

  const onReshuffle = () => {
    roundId.value = 0
    currentGameId.value = null
  }

  modelEvents.on(userEvent(userEvents.PLAY), onPlay)
  modelEvents.on(userEvent(userEvents.RESHUFFLE), onReshuffle)

  onScopeDispose(() => {
    modelEvents.off(userEvent(userEvents.PLAY), onPlay)
    modelEvents.off(userEvent(userEvents.RESHUFFLE), onReshuffle)
  })

  return {
    currentGameId,
    roundId
  }
})
