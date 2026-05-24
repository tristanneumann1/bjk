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
  })
})
