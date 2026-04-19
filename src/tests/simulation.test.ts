import { Rules } from '@/models/rules'
import { basicStrategyH17 } from '@/models/strategy/basicStrategyH17'
import { pickBet } from '@/simulation/pickBet'
import { pickAction } from '@/simulation/pickAction'
import { runSimulation } from '@/simulation/runSimulation'
import type { PlayerAction } from '@/types/actions'

describe('simulation helpers', () => {
  describe('pickBet', () => {
    const spread = [500, 1000, 2500, 5000, 10000]

    it('clamps to spread[0] at or below zero', () => {
      expect(pickBet(0, spread)).toBe(500)
      expect(pickBet(-3, spread)).toBe(500)
    })

    it('picks the floor(trueCount) index', () => {
      expect(pickBet(1, spread)).toBe(1000)
      expect(pickBet(2, spread)).toBe(2500)
      expect(pickBet(2.9, spread)).toBe(2500)
      expect(pickBet(3, spread)).toBe(5000)
    })

    it('clamps to the final value when count exceeds spread length', () => {
      expect(pickBet(10, spread)).toBe(10000)
      expect(pickBet(999, spread)).toBe(10000)
    })

    it('returns 0 for empty spread', () => {
      expect(pickBet(5, [])).toBe(0)
    })
  })

  describe('pickAction', () => {
    const actions: PlayerAction[] = ['Hit', 'Stand']

    it('returns the upper-bound action at index 0', () => {
      expect(pickAction(actions, 'upper')).toBe('Hit')
    })

    it('returns the lower-bound action at the last index', () => {
      expect(pickAction(actions, 'lower')).toBe('Stand')
    })

    it('throws on empty array', () => {
      expect(() => pickAction([], 'upper')).toThrow()
    })
  })
})

describe('runSimulation', () => {
  const baseConfig = {
    shoeCount: 2,
    strategy: basicStrategyH17,
    rules: new Rules(),
    betSpread: [500, 1000, 2500, 5000],
    startingBalance: 1_000_000,
  }

  it('runs without throwing and returns a valid result', () => {
    const result = runSimulation({ ...baseConfig, seed: 'test-seed' })

    expect(result.shoes).toBe(2)
    expect(result.rounds).toBeGreaterThan(0)
    expect(result.hands).toBeGreaterThanOrEqual(result.rounds)
    expect(result.totalWagered).toBeGreaterThan(0)
    expect(result.endingBalance).toBe(baseConfig.startingBalance + result.netProfit)
  })

  it('is deterministic with the same seed', () => {
    const a = runSimulation({ ...baseConfig, seed: 'same-seed' })
    const b = runSimulation({ ...baseConfig, seed: 'same-seed' })

    expect(b.netProfit).toBe(a.netProfit)
    expect(b.rounds).toBe(a.rounds)
    expect(b.totalWagered).toBe(a.totalWagered)
    expect(b.handOutcomes).toEqual(a.handOutcomes)
  })

  it('produces different results for different seeds', () => {
    const a = runSimulation({ ...baseConfig, shoeCount: 5, seed: 'seed-a' })
    const b = runSimulation({ ...baseConfig, shoeCount: 5, seed: 'seed-b' })

    // Not a guarantee, but overwhelmingly likely at 5 shoes.
    expect(b.netProfit).not.toBe(a.netProfit)
  })
})
