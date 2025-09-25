import type {Player} from "@/models/player.ts";
import type {Rules} from "@/models/rules.ts";
import {Table} from "@/models/table";

export class Session {
  public player: Player;
  public rules: Rules;
  public table: Table
  private static instance: Session;

  static initialize(session: Session) {
    this.instance = session;
  }
  static getInstance(): Session {
    if (!Session.instance) {
      throw new Error('Session not initialized');
    }
    return Session.instance;
  }

  constructor({ player, rules, table }: { player: Player; rules: Rules, table: Table }) {
    this.player = player;
    this.rules = rules;
    this.table = table;
  }
}
