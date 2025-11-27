import { Hand } from '@/models/hand';
import { Card } from '@/models/card';
import { Player } from '@/models/player';
import { Rules } from '@/models/rules';
import {Session} from "@/models/session.ts";
import {Table} from "@/models/table.ts";
import {Dealer} from "@/models/dealer.ts";
import {Chair} from "@/models/chair.ts";
import type {Action} from '@/models/hand'

describe('Hand Model', () => {
  Session.initialize({
    player: new Player(100),
    rules: new Rules(),
    table: new Table(new Dealer(), new Chair(), [], {})
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

  const validateAction = (hand: Hand, action: Action, bet: number = 10) => {
    const chair = new Chair([hand])
    chair.bet = bet
    return chair.validateAction(action)
  }

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
      expect(validateAction(hand17, 'Stand')).toBe(null)
      expect(validateAction(handStood18, 'Stand')).toBe('Hand not active')
      expect(validateAction(handBlackjack, 'Stand')).toBe('Hand not active')
    })

    it('should validate Hit action', () => {
      expect(validateAction(hand17, 'Hit')).toBe(null)
      expect(validateAction(handBlackjack, 'Hit')).toBe('Hand not active')
      expect(validateAction(hand24, 'Hit')).toBe('Hand not active')
    })

    it('should validate Double action', () => {
      expect(validateAction(hand17, 'Double')).toBe(null)
      expect(validateAction(hand17, 'Double', 10000)).toBe('Not enough balance to double')
      expect(validateAction(handSplit13, 'Double')).toBe('Can only double on first two cards')
    })

    it('should validate Split action', () => {
      expect(validateAction(handSplit2, 'Split')).toBe(null)
      expect(validateAction(handMismatch20, 'Split')).toBe(null)
      expect(validateAction(handSplit13, 'Split')).toBe('Can only split with two cards')
      expect(validateAction(hand17, 'Split')).toBe('Can only split matching values')
    })

    it('should validate Surrender action', () => {
      expect(validateAction(hand17, 'Surrender')).toBe(null)
      expect(validateAction(handSplit13, 'Surrender')).toBe('Can only surrender on first two cards')
    })

    it('limits total splits per chair', () => {
      const pair = new Hand([new Card('Spades', '8'), new Card('Clubs', '8')])
      const chair = new Chair([pair])
      chair.bet = 10
      expect(chair.validateAction('Split')).toBe(null)
      chair.splitCount = Session.getInstance().rules.maxSplits
      expect(chair.validateAction('Split')).toBe('maximum split count reached')
    })
  })
})
