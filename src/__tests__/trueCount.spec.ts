import { Rules } from '@/models/rules'
import { Session } from '@/models/session'

/**
 * Exercises Table.trueCountLower / trueCountUpper, which bracket the true count
 * to account for uncertainty in remaining decks.
 */
function setupShoe(remainingDecks: number, runningCount: number) {
  const rules = Object.assign(new Rules(), { deckCount: 6 })
  Session.initialize(rules)
  const table = Session.getInstance().table
  const targetRemainingCards = Math.round(remainingDecks * 52)
  table.dealer.dealIndex = table.dealer.shoe.length - 1 - targetRemainingCards
  table.runningCount = runningCount
  return table
}

describe('Table true count bounds', () => {
  describe('RC = 7 across the 3-to-4 decks remaining range', () => {
    it('exactly 3 decks → [2, 3]', () => {
      // remDecks = 3 → floor(7/3)=2, ceil(7/3)=3
      const table = setupShoe(3, 7)
      expect(table.trueCountLower).toBe(2)
      expect(table.trueCountUpper).toBe(3)
    })

    it('3.25 decks → [2, 3]', () => {
      // remDecksLower=3, remDecksUpper=3.5
      // floors: floor(7/3)=2, floor(7/3.5)=2  → TCL=2
      // ceils:  ceil(7/3)=3,  ceil(7/3.5)=2   → TCU=3
      const table = setupShoe(3.25, 7)
      expect(table.trueCountLower).toBe(2)
      expect(table.trueCountUpper).toBe(3)
    })

    it('3.5 decks → [2, 2]', () => {
      // remDecksLower=remDecksUpper=3.5 → floor=ceil=2
      const table = setupShoe(3.5, 7)
      expect(table.trueCountLower).toBe(2)
      expect(table.trueCountUpper).toBe(2)
    })

    it('3.75 decks → [1, 2]', () => {
      // remDecksLower=3.5, remDecksUpper=4
      // floors: floor(7/3.5)=2, floor(7/4)=1 → TCL=1
      // ceils:  ceil(7/3.5)=2,  ceil(7/4)=2  → TCU=2
      const table = setupShoe(3.75, 7)
      expect(table.trueCountLower).toBe(1)
      expect(table.trueCountUpper).toBe(2)
    })

    it('exactly 4 decks → [1, 2]', () => {
      // remDecks = 4 → floor(7/4)=1, ceil(7/4)=2
      const table = setupShoe(4, 7)
      expect(table.trueCountLower).toBe(1)
      expect(table.trueCountUpper).toBe(2)
    })
  })
})
