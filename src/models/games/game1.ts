import { buildNDeckShoe } from '@/models/card';
import { Chair } from '@/models/chair';
import { Player } from '@/models/player';
import { Dealer } from '@/models/dealer';
import { Table } from '@/models/table';
import { Rules } from '@/models/rules';
import {Session} from "@/models/session.ts";

export class Game1 {
  public table: Table;
  constructor() {
    const rules = new Rules();
    const shoe = buildNDeckShoe(rules.deckCount)
    const dealerChair = new Chair()
    const player = new Player(100_000)
    const dealer = new Dealer(shoe)
    this.table = new Table(dealer, dealerChair, [], { logAfterAction: true })
    Session.initialize({ player, rules, table: this.table})
    dealer.shuffle()
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
