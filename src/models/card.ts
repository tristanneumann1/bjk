import { type Card as CardType } from '@/types/card';
export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export class Card implements CardType {
  constructor(readonly suit: Suit, readonly rank: Rank) {}
  isAce(): boolean {
    return this.rank === 'A';
  }
  get value() {
    switch (this.rank) {
      case '10':
      case 'J':
      case 'Q':
      case 'K':
        return 10
      case 'A':
        return 1
      default:
        return Number(this.rank);
    }
  }
  get suitSymbol() {
    switch (this.suit) {
      case 'Hearts':
        return '♥';
      case 'Diamonds':
        return '♦';
      case 'Clubs':
        return '♣';
      case 'Spades':
        return '♠';
    }
  }
}

export function buildDeck(): Card[] {
  const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(new Card(suit, rank));
    }
  }
  return deck;
}

export function buildNDeckShoe(n: number): Card[] {
  let shoe: Card[] = [];
  for (let i = 0; i < n; i++) {
    shoe = shoe.concat(buildDeck());
  }
  return shoe;
}
