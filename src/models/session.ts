import {Player} from "@/models/player.ts";
import type {Rules} from "@/models/rules.ts";
import {Table} from "@/models/table";
import {buildNDeckShoe, Card} from "@/models/card";
import {Chair} from "@/models/chair";
import {Dealer} from "@/models/dealer";

export interface SessionOptions {
  playerBalance?: number;
}

export class Session {
  public player: Player;
  public rules: Rules;
  public table: Table
  private static instance: Session;

  static initialize(rules: Rules, options: SessionOptions = {}) {
    const shoe: Card[] = buildNDeckShoe(rules.deckCount)
    const player = new Player(options.playerBalance ?? 100_000)
    const dealerChair = new Chair()
    const dealer = new Dealer(shoe)
    dealer.shuffle()

    const table = new Table(dealer, dealerChair, [], {logAfterAction: false})
    this.instance = new Session({ rules, player, table });
    return this.instance
  }

  static getInstance(): Session {
    if (!Session.instance) {
      throw new Error('Session not initialized');
    }
    return Session.instance;
  }

  static changeRules(newRules: Rules) {
    if (this.instance.table.dealer.dealIndex !== 0) {
      throw new Error('Cannot change rules during an active shoe');
    }
    this.instance = Session.initialize(newRules);
    return this.instance;
  }

  constructor({ player, rules, table }: { player: Player; rules: Rules, table: Table }) {
    this.player = player;
    this.rules = rules;
    this.table = table;
  }
}
