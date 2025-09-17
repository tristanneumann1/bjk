import { Game1 } from 'models/games/game1';

export class Game3Chair extends Game1 {
  constructor() {
    super();
    this.table.addPlayerChair()
    this.table.addPlayerChair()
  }

  start() {
    for (let chair of this.table.playerChairArray) {
      chair.bet = 1000
    }
    this.table.startRound()
  }
}