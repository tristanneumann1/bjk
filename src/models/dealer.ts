import { Card } from '@/models/card';
import { Hand } from '@/models/hand';
import {Session} from "@/models/session";
import {attachModelEventEmitter} from "@/lib/modelEvents";

export class Dealer {
  public dealIndex: number = 0;
  public trueRunningCount: number = 0;
  public holeCardHidden = true;

  public static getCountDelta(card: Card): number {
    const value = card.value
    switch (value) {
      case 1:
      case 10:
        return -1
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 1
      default:
        return 0
    }
  }

  constructor(public shoe: Card[] = []) {
  }

  get remainingDecks(): number {
    const remainingCards = this.shoe.length - this.dealIndex - 1
    return remainingCards / 52
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
    // NEED to account for hidden Hole Card
    this.applyRunningCountDelta(card)
    return card;
  }

  shuffle(): void {
    for (let i = this.shoe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
    }
    this.dealIndex = 0
    this.trueRunningCount = 0
    this.holeCardHidden = true
  }

  completeDealerHand(dealerHand: Hand): void {
    while(dealerHand.bestValue < 17) {
      dealerHand.addCard(this.dealCard())
    }
    if (dealerHand.bestValue === 17 && dealerHand.isSoft && Session.getInstance().rules.dealerHitsSoft17) {
      dealerHand.addCard(this.dealCard())
    }
    if (this.holeCardHidden) {
      this.holeCardHidden = false
    }
  }

  private applyRunningCountDelta(card: Card | undefined) {
    if (!card) {
      return
    }
    const delta = Dealer.getCountDelta(card)
    if (delta === 0) {
      return
    }
    this.trueRunningCount = this.trueRunningCount + delta
  }
}

attachModelEventEmitter(Dealer, {
  model: 'dealer',
  props: ['dealIndex', 'holeCardHidden'],
  trackInstance: false,
})
