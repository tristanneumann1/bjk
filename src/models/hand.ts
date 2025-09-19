import { Card } from '@/models/card';
import { type HandResult } from '@/models/chair';
export type Action = 'Hit' | 'Stand' | 'Double' | 'Split' | 'Surrender';
import { Rules } from '@/models/rules';
import { Player } from '@/models/player';

export class Hand {
  public isSplit = false;
  private splitCount = 0;
  public isDoubled = false;
  public hasStood = false;
  public isSurrendered = false
  constructor(public cards: Card[] = []) {
  }

  get softValue(): number {
    let value = 0;
    for (const card of this.cards) {
      value += card.value;
    }
    return value;
  }
  get isSoft(): boolean {
    return this.cards.some(card => card.isAce()) && this.softValue + 10 <= 21;
  }
  get isDone(): boolean {
    return this.isBusted || this.hasStood || this.isSurrendered || this.bestValue === 21
  }
  get isBusted(): boolean {
    return this.softValue > 21;
  }
  get isBlackJack(): boolean {
    return !this.isSplit && this.bestValue === 21 && this.cards.length === 2;
  }
  get bestValue(): number {
    if (this.isSoft && this.softValue + 10 <= 21) {
      return this.softValue + 10;
    }
    return this.softValue;
  }

  addCard (card: Card) {
    this.cards.push(card);
  }

  split() {
    this.isSplit = true
    this.splitCount++
  }

  beatsHand(other: Hand): HandResult {
    if (this.isBlackJack && !other.isBlackJack) {
      return 'BlackJackWin';
    }
    if (!this.isBlackJack && other.isBlackJack) {
      return 'Lose';
    }
    if (this.isBusted) {
      return 'Lose';
    }
    if (other.isBusted) {
      return this.isDoubled ? 'Double' : 'Win';
    }
    if (this.bestValue > other.bestValue) {
      return this.isDoubled ? 'Double' : 'Win';
    }
    if (this.bestValue < other.bestValue) {
      return 'Lose';
    }
    return this.isDoubled ? 'Double_Push' : 'Push';
  }

  validateAction(action: Action, betValue: number): string | null {
    if (this.isDone) return 'Hand not active'
    switch (action) {
      case 'Stand':
        return null
      case 'Hit':
        return this.softValue < 21 ? null : 'Cannot hit on 21 or more'
      case "Double":
        if (Player.getInstance().balance < betValue) return 'Not enough balance to double'
        if (this.cards.length !== 2) return 'Can only double on first two cards'
        if (this.isSplit && !Rules.getInstance().doubleAllowedAfterSplit) {
          return 'Can not double after split'
        }
        return null
      case 'Split':
        if (this.cards.length !== 2) return 'Can only split with two cards'
        if (this.cards[0].value !== this.cards[1].value) return 'Can only split matching values'
        if (this.splitCount >= Rules.getInstance().maxSplits) return 'maximum split count reached'
        if (this.cards[0].isAce() && this.isSplit && !Rules.getInstance().resplitAcesAllowed) return 'Can not resplit aces'
        return null
      case "Surrender":
        if (this.cards.length !== 2) return 'Can only surrender on first two cards'
        if (!Rules.getInstance().surrenderAllowed) return 'Surrender not allowed'
        return  null
    }
  }
}
