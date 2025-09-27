import { Card } from '@/models/card';
import { Hand } from '@/models/hand';
import {Session} from "@/models/session.ts";
import {attachModelEventEmitter} from "@/lib/modelEvents";

export class Dealer {
  public _dealIndex: number = 0;
  constructor(public shoe: Card[] = []) {
  }

  get dealIndex(): number {
    return this._dealIndex;
  }
  set dealIndex (newIndex: number) {
    this._dealIndex = newIndex;
  }

  pastPenetration(): boolean {
    return (this.shoe.length - 1 - this.dealIndex) < Session.getInstance().rules.penetration + 1; // account for first tossed card
  }

  reset() {
    this.shuffle()
  }
  resetDealIndex() {
    this.dealIndex = 0;
  }

  dealCard(): Card {
    if (this.dealIndex > this.shoe.length - 1) {
      throw new Error('No cards left in the shoe');
    }
    const card = this.shoe[this.dealIndex];
    this.dealIndex++;
    return card;
  }

  shuffle(): void {
    for (let i = this.shoe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
    }
    this.dealIndex = 0
  }

  completeDealerHand(dealerHand: Hand): void {
    while(dealerHand.bestValue < 17) {
      dealerHand.addCard(this.dealCard())
    }
    if (dealerHand.bestValue === 17 && dealerHand.isSoft && Session.getInstance().rules.dealerHitsSoft17) {
      dealerHand.addCard(this.dealCard())
    }
  }
}

attachModelEventEmitter(Dealer, {
  model: 'dealer',
  props: ['dealIndex'],
  trackInstance: false,
})
