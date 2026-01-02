import type {Table} from "@/models/table.ts";
import {modelEvents, userEvent, type UserEventMap} from "@/lib/mitt.ts";
import * as userEvents from "@/lib/userEvents.ts";
import {isAction} from "@/models/hand.ts";

export const initializeHandlers = (table: Table) => {
  playerActionHandler(table)
  playerPlayHandler(table)
}

function playerActionHandler(table: Table) {
  modelEvents.on(userEvent(userEvents.PLAYER_ACTION), (event: UserEventMap) => {
    if(!event.action || !isAction(event.action)) {
      console.error('failing to act on invalid action', event)
      return
    }
    table.act(event.action);
  })
}

function playerPlayHandler(table: Table) {
  modelEvents.on(userEvent(userEvents.PLAY), (_event: UserEventMap) => {
    table.startRound();
  })
}
