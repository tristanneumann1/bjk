import { Chair } from '@/models/chair';
import { Dealer } from '@/models/dealer';
import { type Action } from '@/models/hand';
import {Session} from "@/models/session.ts";

interface PlayerChair {
  [chairId: number]: Chair | null;
}

interface TableConfiguration {
  logAfterAction?: boolean;
}

const DEFAULT_TABLE_CONFIGURATION : TableConfiguration= {
  logAfterAction: false,
}

export class Table {
  private chairIndex = 0;
  private chairTurnIndex = 0;
  constructor(public dealer: Dealer, public dealerChair: Chair, public playerChairs: PlayerChair = {}, public configuration: TableConfiguration = DEFAULT_TABLE_CONFIGURATION) {}

  get dealerPeekedBlackjack(): boolean {
    return Session.getInstance().rules.dealerPeekA10 &&
      this.dealerChair.hands[0].isBlackJack
  }

  get roundInitialCost(): number {
    let roundCost = 0
    for (const chair of this.playerChairArray) {
      roundCost += chair.bet
    }
    return roundCost
  }
  get playerChairArray(): Chair[] {
    return Object.values(this.playerChairs).filter(chair => chair !== null);
  }
  get activeChair(): Chair| undefined {
    return this.playerChairArray[this.chairTurnIndex]
  }
  get playerRoundsComplete(): boolean {
    return this.dealerPeekedBlackjack || !this.playerChairArray.find(pc => !pc.chairDone)
  }

  view() {
    if (this.dealerChair.hands[0]?.cards.length < 1
    || this.playerChairArray[0]?.hands[0]?.cards.length < 1) {
      throw new Error('could not find active hands')
    }

    for (let chair of this.playerChairArray) {
      chair.view(chair === this.activeChair, this.playerRoundsComplete ? this.dealerChair.hands[0] : null)
    }
    if (this.playerRoundsComplete) {
      console.log('Dealer Chair:', this.dealerChair.hands.map(hand => hand.cards.map(card => `${card.rank}${card.suitSymbol}`).join(', ')).join(' | '));
    } else {
      const dealerFirstCard = this.dealerChair.hands[0].cards[0]
      console.log(`Dealer Chair: ${dealerFirstCard.rank}${dealerFirstCard.suitSymbol}, [Hidden]`);
    }

  }

  addPlayerChair() {
    this.playerChairs[this.chairIndex] = new Chair()
    this.chairIndex++
  }
  removePlayerChair(index: number) {
    const playerChair = this.playerChairs[index]
    if (!playerChair) {
      throw new Error('No chair at this index');
    }
    this.playerChairs[index] = null
  }
  deal(chair: Chair, n: number = 1) {
    for (let i = 0; i < n; i++) {
      chair.deal(this.dealer.dealCard())
    }
  }
  startRound() {
    this.validateRoundCanStart();
    Session.getInstance().player.removeMoney(this.roundInitialCost);
    this.dealerChair.start()
    this.deal(this.dealerChair, 2);
    for (let chair of this.playerChairArray) {
      chair.start()
      this.deal(chair, 2);
    }

    this.chairTurnIndex = -1;

    if (this.dealerPeekedBlackjack) {
      this.chairTurnIndex = this.playerChairArray.length
    }

    this.nextChair()

    if (this.configuration.logAfterAction) {
      this.view()
    }
  }

  act(action: Action) {
    if (!this.dealerChair.activeHand) {
      throw new Error('Round not started');
    }
    if (!this.activeChair) {
      throw new Error('No active chair');
    }
    this.activeChair.act(action, this.dealer)

    if (this.activeChair.activeHand === undefined) {
      this.nextChair()
    }

    if (this.playerRoundsComplete) {
      this.dealer.completeDealerHand(this.dealerChair.activeHand)
    }

    if (this.configuration.logAfterAction) {
      this.view()
    }
  }

  nextChair() {
    this.chairTurnIndex++
    if(this.activeChair && this.activeChair.chairDone) {
      this.nextChair()
    }
  }

  payout() {
    if(this.chairTurnIndex < this.playerChairArray.length) {
      throw new Error('Round still in progress');
    }
    for (let chair of this.playerChairArray) {
      const payout = chair.payout(this.dealerChair.hands[0])
      if (payout > 0) {
        Session.getInstance().player.addMoney(payout)
      }
    }
    console.log('currentBalance', Session.getInstance().player.balance)
    this.resetAllChairs()
    this.chairTurnIndex = 0
  }
  resetAllChairs() {
    this.dealerChair.start()
    for (let chair of this.playerChairArray) {
      chair.start()
    }
  }

  private validateRoundCanStart() {
    if (this.dealerChair.hands[0]?.cards.length > 0) {
      throw new Error('Round already in progress');
    }
    if (this.playerChairArray.length === 0) {
      throw new Error('No players at the table');
    }
    if (this.roundInitialCost > Session.getInstance().player.balance) {
      throw new Error('Player does not have enough balance for the round');
    }
    if (this.roundInitialCost <= 0) {
      throw new Error('No bets placed');
    }
    // for (const chair of this.playerChairArray) {
    //   if (chair.bet <= 0) {
    //     throw new Error('All chairs must have a bet placed');
    //   }
    // }
    if (this.dealer.pastPenetration()) {
      throw new Error('Dealer is out of cards, needs to reshuffle');
    }
  }
}
