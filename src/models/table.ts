import { Chair } from '@/models/chair';
import { Dealer } from '@/models/dealer';
import {type Action} from '@/models/hand';
import {Session} from "@/models/session.ts";
import {attachModelEventEmitter} from "@/lib/modelEvents";
import {
  modelChangeEvent,
  modelCustomEvent,
  modelEvents,
  type ModelPropertyChangeEvent
} from "@/lib/mitt";

interface PlayerChair {
  [chairId: number]: Chair | null;
}

interface TableConfiguration {
  logAfterAction?: boolean;
}

const DEFAULT_TABLE_CONFIGURATION : TableConfiguration= {
  logAfterAction: false,
}

export const CHAIR_EVENT = 'chair'

export class Table {
  chairIndex = 0;
  chairTurnIndex = 0;
  constructor(public dealer: Dealer, public dealerChair: Chair, public playerChairs: PlayerChair = {}, public configuration: TableConfiguration = DEFAULT_TABLE_CONFIGURATION) {}

  get dealerPeekedBlackjack(): boolean {
    return Session.getInstance().rules.dealerPeekA10 &&
      this.dealerChair.hands[0]?.isBlackJack
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

  addPlayerChair(index?: number) {
    const newChair = new Chair()
    this.playerChairs[index ?? this.chairIndex] = newChair
    this.chairIndex++

    const payload: ModelPropertyChangeEvent = {
      model: 'table',
      event: CHAIR_EVENT,
      value: newChair,
      previous: undefined,
      target: this,
    }
    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('table', CHAIR_EVENT), payload)
  }
  getPlayerChair(index: number): Chair | null {
    return this.playerChairs[index] ?? null
  }
  removePlayerChair(index: number) {
    const playerChair = this.playerChairs[index]
    if (!playerChair) {
      throw new Error('No chair at this index');
    }
    this.playerChairs[index] = null

    const payload: ModelPropertyChangeEvent = {
      model: 'table',
      event: CHAIR_EVENT,
      value: null,
      previous: playerChair,
      target: this,
    }
    modelEvents.emit(modelChangeEvent, payload)
    modelEvents.emit(modelCustomEvent('table', CHAIR_EVENT), payload)
  }

  deal(chair: Chair, n: number = 1) {
    for (let i = 0; i < n; i++) {
      chair.deal(this.dealer.dealCard())
    }
  }
  startRound() {
    const roundCannotStartError = this.validateRoundCanStart()
    if (roundCannotStartError) {
      throw new Error(roundCannotStartError)
    }
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
    if (!this.activeChair) {
      this.payout()
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
    if (!this.activeChair) {
      this.payout()
    }
  }

  nextChair() {
    this.chairTurnIndex++
    if(this.activeChair && this.activeChair.chairDone) {
      this.nextChair()
      return
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

  validateRoundCanStart(): string | null {
    if (this.dealerChair.hands[0]?.cards.length > 0) {
      return 'Round already in progress';
    }
    if (this.playerChairArray.length === 0) {
      return 'No players at the table';
    }
    if (this.roundInitialCost > Session.getInstance().player.balance) {
      return 'Player does not have enough balance for the round';
    }
    if (this.roundInitialCost <= 0) {
      return 'No bets placed';
    }
    for (const chair of this.playerChairArray) {
      if (chair.bet < 0) {
        return 'No negative bets allowed';
      }
    }
    // for (const chair of this.playerChairArray) {
    //   if (chair.bet <= 0) {
    //     return 'All chairs must have a bet placed';
    //   }
    // }
    if (this.dealer.pastPenetration()) {
      return 'Dealer is out of cards, needs to reshuffle';
    }
    return null
  }
}

attachModelEventEmitter(Table, {
  model: 'table',
  props: ['chairTurnIndex'],
  trackInstance: false,
})

