import { Hand } from '@/models/hand';
import { Card } from '@/models/card';
import { Player } from '@/models/player';
import { Rules } from '@/models/rules';
import {Session} from "@/models/session.ts";

describe('Hand Model', () => {
  Session.initialize({
    player: new Player(100),
    rules: new Rules()
  })

  const hand17 = new Hand([new Card('Hearts', '10'), new Card('Diamonds', '7')]);
  const handMismatch20 = new Hand([new Card('Hearts', '10'), new Card('Diamonds', 'J')]);
  const hand8_18 = new Hand([new Card('Hearts', 'A'), new Card('Diamonds', '7')]);
  const hand24 = new Hand([new Card('Hearts', '10'), new Card('Diamonds', '7'), new Card('Clubs', '6'), new Card('Diamonds', 'A')]);
  const handBlackjack = new Hand([new Card('Hearts', 'A'), new Card('Diamonds', 'K')]);
  const handDoubled18 = new Hand([new Card('Hearts', '4'), new Card('Diamonds', '7'), new Card('Diamonds', '7')]);
  handDoubled18.isDoubled = true
  const handStood18 = new Hand([new Card('Hearts', '9'), new Card('Diamonds', '9')]);
  handStood18.hasStood = true;
  const handSplit2 = new Hand([new Card('Hearts', 'A'), new Card('Diamonds', 'A')]);
  handSplit2.split();
  const handSplit13 = new Hand([new Card('Hearts', '4'), new Card('Diamonds', '7'), new Card('Diamonds', '2')]);
  handSplit13.split();

  it('should show correct value', () => {

    expect(hand17.bestValue).toBe(17);
    expect(hand17.softValue).toBe(17);
    expect(hand17.isSoft).toBe(false);
    expect(hand17.isBusted).toBe(false);
    expect(hand17.isDone).toBe(false);
    expect(hand17.isBlackJack).toBe(false);

    expect(hand8_18.bestValue).toBe(18);
    expect(hand8_18.softValue).toBe(8);
    expect(hand8_18.isSoft).toBe(true);
    expect(hand8_18.isBusted).toBe(false);
    expect(hand8_18.isDone).toBe(false);
    expect(hand8_18.isBlackJack).toBe(false);

    expect(hand24.bestValue).toBe(24);
    expect(hand24.softValue).toBe(24);
    expect(hand24.isSoft).toBe(false);
    expect(hand24.isBusted).toBe(true);
    expect(hand24.isDone).toBe(true);
    expect(hand24.isBlackJack).toBe(false);

    expect(handBlackjack.bestValue).toBe(21);
    expect(handBlackjack.softValue).toBe(11);
    expect(handBlackjack.isSoft).toBe(true);
    expect(handBlackjack.isBusted).toBe(false);
    expect(handBlackjack.isDone).toBe(true);
    expect(handBlackjack.isBlackJack).toBe(true);
  });

  describe('beating hands', () => {
    it('normal hand beats other normal hands based on best value', () => {
      expect(hand17.beatsHand(hand8_18)).toBe('Lose')
      expect(hand17.beatsHand(hand17)).toBe('Push')
      expect(hand8_18.beatsHand(hand17)).toBe('Win')
    })

    it('blackjack beats all but other blackjacks', () => {
      expect(handBlackjack.beatsHand(hand17)).toBe('BlackJackWin')
      expect(handBlackjack.beatsHand(hand24)).toBe('BlackJackWin')

      expect(hand24.beatsHand(handBlackjack)).toBe('Lose')
      expect(handBlackjack.beatsHand(handBlackjack)).toBe('Push')
    })

    it('busted hand loses to all other hands', () => {
      expect(hand24.beatsHand(hand8_18)).toBe('Lose')
      expect(hand24.beatsHand(handBlackjack)).toBe('Lose')
      expect(hand24.beatsHand(hand24)).toBe('Lose')
    })

    it('handles doubled hands', () => {
      expect(handDoubled18.beatsHand(hand17)).toBe('Double')
      expect(handDoubled18.beatsHand(hand8_18)).toBe('Double_Push')
      expect(handDoubled18.beatsHand(handBlackjack)).toBe('Lose')
    })
  })

  describe('validating actions', () => {
    it('should validate Stand action', () => {
      expect(hand17.validateAction('Stand', 10)).toBe(null)
      expect(handStood18.validateAction('Stand', 10)).toBe('Hand not active')
      expect(handBlackjack.validateAction('Stand', 10)).toBe('Hand not active')
    })

    it('should validate Hit action', () => {
      expect(hand17.validateAction('Hit', 10)).toBe(null)
      expect(handBlackjack.validateAction('Hit', 10)).toBe('Hand not active')
      expect(hand24.validateAction('Hit', 10)).toBe('Hand not active')
    })

    it('should validate Double action', () => {
      expect(hand17.validateAction('Double', 10)).toBe(null)
      expect(hand17.validateAction('Double', 10000)).toBe('Not enough balance to double')
      expect(handSplit13.validateAction('Double', 10)).toBe('Can only double on first two cards')
    })

    it('should validate Split action', () => {
      expect(handSplit2.validateAction('Split', 10)).toBe(null)
      expect(handMismatch20.validateAction('Split', 10)).toBe(null)
      expect(handSplit13.validateAction('Split', 10)).toBe('Can only split with two cards')
      expect(hand17.validateAction('Split', 10)).toBe('Can only split matching values')
    })

    it('should validate Surrender action', () => {
      expect(hand17.validateAction('Surrender', 10)).toBe(null)
      expect(handSplit13.validateAction('Surrender', 10)).toBe('Can only surrender on first two cards')
    })
  })
})
