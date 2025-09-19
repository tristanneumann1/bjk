import { Card } from '@/models/card';
import { Rules } from '@/models/rules';
import { Hand } from '@/models/hand';

export class Dealer {
  private dealIndex = 0;
  constructor(readonly shoe: Card[] = []) {
  }

  pastPenetration(): boolean {
    return (this.shoe.length - 1 - this.dealIndex) < Rules.getInstance().penetration + 1; // account for first tossed card
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
    };
    if (dealerHand.bestValue === 17 && dealerHand.isSoft && Rules.getInstance().dealerHitsSoft17) {
      dealerHand.addCard(this.dealCard())
    }
  }
}
