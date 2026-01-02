import { defineStore } from 'pinia'
import { onScopeDispose, ref } from 'vue'
import { nanoid } from 'nanoid'
import {modelEvents, userEvent, type UserEventMap} from '@/lib/mitt'
import * as userEvents from '@/lib/userEvents'
import {getAuth} from "firebase/auth";
import {Session} from "@/models/session.ts";

export const useGameStore = defineStore('game', () => {
  const currentGameId = ref<string | null>(null)

  const table = Session.getInstance().table
  const newGameId = () => nanoid()

  const ensureActiveGame = () => {
    if (!currentGameId.value) {
      currentGameId.value = newGameId()
    }
    return currentGameId.value
  }

  async function persistGame() {}

  const onPlay = () => {
    ensureActiveGame()
    const auth = getAuth()
    const userId = auth.currentUser?.uid
    if (!userId) return


    /*
    persistGame()
      required data:
        user id
        Table Rules
        Player seats and bets
        startingTrueCount

      In a transaction:
      get or create the remote game document
        /Player/plyr<id>/Games/game<id>
        GameDoc
      create the remote round document
        /Player/plyr<id>/Games/gm<id>/Rounds/rnd<id>
        RoundDoc
     */
  }

  const onReshuffle = () => {
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
  }
})
