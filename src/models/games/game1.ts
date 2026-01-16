import { Table } from '@/models/table';
import { Rules } from '@/models/rules';
import {Session} from "@/models/session";

export class Game1 {
  public table: Table;
  constructor() {
    const rules = new Rules();
    const session = Session.initialize(rules)
    this.table = session.table
    this.table.addPlayerChair()
  }

  start() {
    const chair = this.table.playerChairArray[0]
    chair.bet = 1000
    this.table.startRound()
  }

  nextRound() {
    this.table.payout()
    this.table.resetAllChairs()
    this.table.startRound()
  }
}
