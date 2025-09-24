import type {Player} from "@/models/player.ts";
import type {Rules} from "@/models/rules.ts";

export class Session {
  public player: Player;
  public rules: Rules;
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

  constructor({ player, rules }: { player: Player; rules: Rules }) {
    this.player = player;
    this.rules = rules;
  }
}
