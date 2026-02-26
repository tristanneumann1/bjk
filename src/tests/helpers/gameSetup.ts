import { Card, type Rank, type Suit } from '@/models/card'
import { Rules } from '@/models/rules'
import { Session } from '@/models/session'

/**
 * Shorthand card constructor for readable test setup.
 * e.g. c('A'), c('K', 'Spades')
 */
export const c = (rank: Rank, suit: Suit = 'Hearts'): Card => new Card(suit, rank)

interface GameSetup {
  dealer: [Card, Card]       // [upcard, hole card]
  player: [Card, Card]       // [card 1, card 2]
  nextCards?: Card[]         // drawn in order: hits, dealer completion draws, etc.
  rules?: Partial<Rules>
}

/**
 * Initializes a game session with a deterministic shoe.
 * Cards are assembled into the shoe in the order startRound() deals them:
 * dealer upcard → dealer hole → player card 1 → player card 2 → nextCards
 *
 * A standard shuffled 6-deck shoe is appended after, so nextCards only needs
 * to cover cards explicitly required by the test scenario.
 */
export function setupGame({ dealer, player, nextCards = [], rules: rulesOverrides = {} }: GameSetup) {
  const rules = Object.assign(new Rules(), rulesOverrides)
  const shoePrefix = [...dealer, ...player, ...nextCards]
  const session = Session.initialize(rules, { shoePrefix })
  session.table.addPlayerChair()
  const chair = session.table.getPlayerChair(0)!
  chair.bet = 100
  return { session, table: session.table, chair }
}
