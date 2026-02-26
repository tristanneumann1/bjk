import { Table } from '@/models/table';
import { Rules } from '@/models/rules';
import {Session} from "@/models/session";

export class Game1 {
  public table: Table;
  constructor() {
    const rules = new Rules();
    const session = Session.initialize(rules, { logAfterAction: true })
    this.table = session.table
    this.table.addPlayerChair()
  }

  start() {
    const chair = this.table.playerChairArray[0]
    chair.bet = 1000
    this.table.startRound()
  }

  nextRound() {
    console.log('player.balance', Session.getInstance().player.balance)
    this.table.startRound()
  }
}
