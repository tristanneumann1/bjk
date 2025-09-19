import { Card } from '@/models/card';
import { type Action, Hand } from '@/models/hand';
import { Dealer } from '@/models/dealer';
import { Player } from '@/models/player';
import chalk, { type ColorName, type ModifierName } from 'chalk';
import { Rules } from '@/models/rules';

export type HandResult = 'Win' | 'Lose' | 'Push' | 'BlackJackWin' | 'Double' | 'Double_Push';
const HAND_VIEW_COLORS: { [result in HandResult]: ColorName | ModifierName} = {
  'Win': 'blue',          // Green
  'Lose': 'red',         // Red
  'Push': 'white',         // Yellow
  'BlackJackWin': 'bgYellow', // Magenta
  'Double': 'blue',       // Blue
  'Double_Push': 'white'   // Cyan
}

export class Chair {
  private betValue: number = 0;
  private activeHandIndex = 0;
  constructor(public hands: Hand[] = []) {
  }

  get bet(): number {
    return this.betValue;
  }
  set bet(amount: number) {
    if (this.hands.length > 0) {
      throw new Error('can not change bet during round');
    }
    this.betValue = amount;
  }
  get activeHand(): Hand | undefined {
    return this.hands[this.activeHandIndex];
  }
  get chairDone(): boolean {
    return !this.activeHand || this.allHandsOff
  }
  get allHandsOff(): boolean {
    for (let hand of this.hands) {
      if (!hand.isBusted && !hand.isSurrendered && !hand.isBlackJack) {
        return false;
      }
    }
    return true;
  }

  start() {
    this.activeHandIndex = 0;
    this.hands = [new Hand()];
  }
  deal(card: Card) {
    if (!this.activeHand) {
      throw new Error('no active hand');
    }
    this.activeHand.addCard(card);
  }

  payout (other: Hand): number {
    let payout = 0
    for(let hand of this.hands) {
      payout += this.handPayout(hand, other)
    }
    return payout;
  }
  private handPayout(hand: Hand, other: Hand): number {
    switch (hand.beatsHand(other)) {
      case 'Win':
      case 'Double_Push':
        return this.bet * 2;
      case 'Push':
        return this.bet;
      case 'BlackJackWin':
        return Math.floor(this.bet * (1 + Rules.getInstance().blackjackPayout));
      case 'Lose':
        return 0
      case "Double":
        return this.bet * 4;
    }
  }

  moveToNextHand(dealer: Dealer) {
    this.activeHandIndex++
    if(this.activeHand && this.activeHand.cards.length < 2) {
      this.activeHand.addCard(dealer.dealCard())
    }
  }
  act (action: Action, dealer: Dealer) {
    if (!this.activeHand) {
      throw new Error('No active hand');
    }

    const actionNotValidError = this.activeHand.validateAction(action, this.betValue);
    if (actionNotValidError) {
      throw new Error(actionNotValidError)
    }

    switch (action) {
      case 'Stand':
        this.activeHand.hasStood = true;
        this.moveToNextHand(dealer);
        break;
      case 'Double':
        Player.getInstance().removeMoney(this.betValue)
        this.activeHand.isDoubled = true;
        this.activeHand.addCard(dealer.dealCard())
        this.moveToNextHand(dealer);
        break;
      case 'Split':
        const splitCard = this.activeHand.cards.pop();
        if (!splitCard) {
          throw new Error('No card to split');
        }
        const newHand = new Hand([splitCard]);
        newHand.split();
        this.activeHand.split();
        this.hands.push(newHand);
        this.activeHand.addCard(dealer.dealCard())
        break;
      case 'Hit':
        this.activeHand.addCard(dealer.dealCard())
        if (this.activeHand.isDone) {
          this.moveToNextHand(dealer);
        }
        break;
      case 'Surrender':
        this.activeHand.isSurrendered = true
        this.moveToNextHand(dealer);
        break;
    }
  }

  view(isActive: boolean, other?: Hand | null): void {
      console.log('Player Chair:', this.hands.map((hand: Hand, index: number) => {
        const result = other ? hand.beatsHand(other) : null
        const handString = this.chalkModify(hand, result)
        if (isActive && index === this.activeHandIndex) {
          return `>${handString}<`
        }

        return handString
      }).join(' | '), '  Bet:', this.bet);
  }
  private chalkModify(hand: Hand, result: HandResult | null): string {
    let handString = hand.cards.map(card => `${card.rank}${card.suitSymbol}`).join(', ')
    if (result) {
      const color = HAND_VIEW_COLORS[result]
      handString = chalk[color](handString)
    }
    if (hand.isDoubled || result == 'BlackJackWin') {
      handString = chalk.underline(handString)
    }

    return handString
  }
}
