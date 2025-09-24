import { Card } from '@/models/card';
import { Game1 } from './game1';

export class GameRigged extends Game1 {
  constructor() {
    super()
  }

  start(topCards: Card[] = []) {
    const chair = this.table.playerChairArray[0]
    chair.bet = 1000
    this.table.dealer.shoe.unshift(...topCards)
    this.table.dealer.resetDealIndex();
    this.table.startRound()
  }
}
