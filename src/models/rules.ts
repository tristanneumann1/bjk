
export class Rules {
  deckCount: number;
  dealerHitsSoft17: boolean;
  doubleAllowedAfterSplit: boolean;
  resplitAcesAllowed: boolean;
  surrenderAllowed: boolean;
  maxSplits: number;
  blackjackPayout: number;
  penetration: number;
  dealerPeekA10: boolean;
  // insuranceAllowed: boolean; // Insurance allowed

  constructor() {
    this.deckCount = 6; // number of decks in shoe
    this.dealerHitsSoft17 = true; // Dealer hits on soft 17
    this.doubleAllowedAfterSplit = true; // Double down allowed after split
    this.resplitAcesAllowed = true; // Resplitting aces not allowed
    this.surrenderAllowed = true; // Surrender allowed
    this.maxSplits = 3; // Maximum number of splits
    this.blackjackPayout = 1.5; // Blackjack pays 3:2
    this.penetration = 52; // Number of cards left in the shoe to trigger reshuffle
    this.dealerPeekA10 = true; // Dealer peeks for blackjack when showing an Ace or 10-value card
    // this.insuranceAllowed = true; // Insurance allowed
  }
}
