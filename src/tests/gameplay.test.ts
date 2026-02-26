import { c, setupGame } from './helpers/gameSetup'

/**
 * Note: payout() calls resetAllChairs() at round end, so hand state must be
 * checked while the round is still in progress. Balance is used to verify outcomes.
 */
describe('Gameplay', () => {
  describe('stand', () => {
    it('player wins by standing on a higher value than dealer', () => {
      const { session, table, chair } = setupGame({
        dealer: [c('7'), c('K')],   // dealer 17
        player: [c('10'), c('9')],  // player 19
      })

      table.startRound()
      expect(chair.hands[0].bestValue).toBe(19)

      table.act('Stand')

      expect(session.player.balance).toBe(100_100) // -100 bet +200 payout
    })

    it('player loses by standing below dealer value', () => {
      const { session, table, chair } = setupGame({
        dealer: [c('K'), c('8')],   // dealer 18
        player: [c('10'), c('7')],  // player 17
      })

      table.startRound()
      expect(chair.hands[0].bestValue).toBe(17)

      table.act('Stand')

      expect(session.player.balance).toBe(99_900) // -100 bet, no payout
    })
  })

  describe('hit', () => {
    it('player wins by hitting to a better value than dealer', () => {
      const { session, table, chair } = setupGame({
        dealer:    [c('7'), c('K')],  // dealer 17
        player:    [c('5'), c('6')],  // player 11
        nextCards: [c('7')],          // hit → player 18
      })

      table.startRound()
      expect(chair.hands[0].bestValue).toBe(11)

      table.act('Hit')
      // Round still in progress (18 is not a terminal value), so hand state is readable
      expect(chair.hands[0].bestValue).toBe(18)

      table.act('Stand')
      expect(session.player.balance).toBe(100_100) // -100 bet +200 payout
    })

    it('player loses by hitting lower than dealer', () => {
      const { session, table, chair } = setupGame({
        dealer:    [c('7'), c('K')],  // dealer 17
        player:    [c('5'), c('6')],  // player 11
        nextCards: [c('3')],          // hit → player 14
      })

      table.startRound()
      expect(chair.hands[0].bestValue).toBe(11)

      table.act('Hit')
      // Round still in progress (14 is not a terminal value), so hand state is readable
      expect(chair.hands[0].bestValue).toBe(14)

      table.act('Stand')
      expect(session.player.balance).toBe(99_900) // -100 bet, no payout
    })

    it('player loses by busting', () => {
      const { session, table, chair } = setupGame({
        dealer:    [c('7'), c('K')],    // dealer 17
        player:    [c('10'), c('8')],   // player 18
        nextCards: [c('9')],            // hit → player 27 (bust)
      })

      table.startRound()
      expect(chair.hands[0].bestValue).toBe(18)

      // Bust triggers payout immediately; balance confirms the loss
      table.act('Hit')

      expect(session.player.balance).toBe(99_900) // -100 bet, no payout
    })
  })

  describe('blackjack', () => {
    it('pays 3:2 when player has blackjack and dealer does not', () => {
      const { session, table } = setupGame({
        dealer: [c('5'), c('8')],  // dealer 13
        player: [c('A'), c('K')],  // player blackjack
      })

      // Blackjack auto-resolves inside startRound(); balance confirms 3:2 payout (net +150)
      table.startRound()

      expect(session.player.balance).toBe(100_150) // Math.floor(100 * 2.5) = 250 payout
    })

    it('is a push when both player and dealer have blackjack', () => {
      const { session, table } = setupGame({
        dealer: [c('A'), c('K')],                         // dealer blackjack
        player: [c('A', 'Diamonds'), c('K', 'Diamonds')], // player blackjack
        // Disable insurance and peek to keep test focused on the BJ vs BJ outcome
        rules: { insuranceAllowed: false, dealerPeekA10: false },
      })

      table.startRound()

      expect(session.player.balance).toBe(100_000) // push, net zero
    })
  })

  describe('insurance', () => {
    it('taking insurance breaks even when dealer has blackjack', () => {
      const { session, table } = setupGame({
        dealer: [c('A'), c('K')],   // dealer blackjack
        player: [c('10'), c('8')],  // player 18
      })

      table.startRound()
      table.act('Insurance')

      // Insurance pays 2:1: win 100 profit on the 50 side bet, lose the 100 main bet → net 0
      expect(session.player.balance).toBe(100_000)
    })

    it('declining insurance costs only the original bet when dealer has blackjack', () => {
      const { session, table } = setupGame({
        dealer: [c('A'), c('K')],   // dealer blackjack
        player: [c('10'), c('8')],  // player 18
      })

      table.startRound()
      table.act('DeclineInsurance')

      expect(session.player.balance).toBe(99_900) // -100 bet, no insurance cost
    })

    it('insurance costs half the bet when dealer does not have blackjack', () => {
      const { session, table, chair } = setupGame({
        dealer: [c('A'), c('7')],   // dealer soft 18, no blackjack
        player: [c('10'), c('9')],  // player 19
      })

      table.startRound()
      table.act('Insurance')
      table.act('Stand')

      // Win the hand (+100), but lose the insurance side bet (-50) = net +50
      expect(session.player.balance).toBe(100_050)
    })

    it('declining insurance lets the player play the hand normally', () => {
      const { session, table } = setupGame({
        dealer: [c('A'), c('7')],   // dealer soft 18, no blackjack
        player: [c('10'), c('9')],  // player 19
      })

      table.startRound()
      table.act('DeclineInsurance')
      table.act('Stand')

      expect(session.player.balance).toBe(100_100) // normal win, no insurance cost
    })

    it('taking insurance with a blackjack pays even money', () => {
      const { session, table } = setupGame({
        dealer: [c('A'), c('4')],  // dealer soft 15, no blackjack
        player: [c('A'), c('K')],  // player blackjack
      })

      table.startRound()
      table.act('Insurance') // → tookEvenMoney = true

      // Even money: guaranteed 1:1 payout regardless of dealer hole card → net +100
      expect(session.player.balance).toBe(100_100)
    })
  })
})
