import { Dealer } from '@/models/dealer'
import { Hand } from '@/models/hand'
import { Rules } from '@/models/rules'
import { Session } from '@/models/session'
import { c } from '../tests/helpers/gameSetup'

describe('Dealer', () => {
  describe('completeDealerHand', () => {
    it('keeps hitting when taking a card on soft 17 leaves a hard total below 17', () => {
      // Real scenario: player 10,10 vs dealer A. Dealer turns over a 6 (soft 17),
      // hits per H17, draws a 7 → A,6,7 = hard 14. Dealer must continue, not stop.
      Session.initialize(Object.assign(new Rules(), { dealerHitsSoft17: true }))

      const dealer = new Dealer([c('7'), c('5')])
      const dealerHand = new Hand([c('A'), c('6')])

      dealer.completeDealerHand(dealerHand)

      // After 7 → hard 14 (must hit), after 5 → hard 19 (stop)
      expect(dealerHand.bestValue).toBe(19)
      expect(dealerHand.cards.map(card => card.rank)).toEqual(['A', '6', '7', '5'])
    })

    it('hits an initial soft 17 under H17 and stops — does not drain the shoe', () => {
      // Regression: the soft-17 check was once hoisted to a const computed before the
      // loop, so an initial soft 17 made the condition permanently true. The dealer drew
      // through the entire shoe and never revealed the hole card. The condition must be
      // re-evaluated each iteration.
      Session.initialize(Object.assign(new Rules(), { dealerHitsSoft17: true }))

      const dealer = new Dealer([c('4'), c('K'), c('K'), c('K')])
      const dealerHand = new Hand([c('A'), c('6')])

      dealer.completeDealerHand(dealerHand)

      // A,6 (soft 17) hits → 4 makes hard 21, stop. Only one card consumed.
      expect(dealerHand.cards.map(card => card.rank)).toEqual(['A', '6', '4'])
      expect(dealerHand.bestValue).toBe(21)
      expect(dealer.holeCardHidden).toBe(false)
    })

    it('stands on an initial soft 17 under S17', () => {
      Session.initialize(Object.assign(new Rules(), { dealerHitsSoft17: false }))

      const dealer = new Dealer([c('K'), c('K')])
      const dealerHand = new Hand([c('A'), c('6')])

      dealer.completeDealerHand(dealerHand)

      // Soft 17 stands under S17 — no cards drawn.
      expect(dealerHand.cards.map(card => card.rank)).toEqual(['A', '6'])
      expect(dealerHand.bestValue).toBe(17)
      expect(dealer.holeCardHidden).toBe(false)
    })

    it('stops the moment a soft total reaches a standing value', () => {
      // Reaching soft 18 mid-draw must stop under H17 (only soft 17 hits).
      Session.initialize(Object.assign(new Rules(), { dealerHitsSoft17: true }))

      const dealer = new Dealer([c('A'), c('K')])
      const dealerHand = new Hand([c('5'), c('4')]) // hard 9

      dealer.completeDealerHand(dealerHand)

      // 9 + A → soft 20, stop. Only one card consumed.
      expect(dealerHand.cards.map(card => card.rank)).toEqual(['5', '4', 'A'])
      expect(dealerHand.bestValue).toBe(20)
    })
  })
})
