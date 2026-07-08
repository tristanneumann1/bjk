import { buildSimulationDoc } from '@/docs/simulation'
import type { RuleFields } from '@/simulation/ruleFields'
import type { SimulationResult } from '@/simulation/types'

const ruleFields: RuleFields = {
  deckCount: 6,
  dealerHitsSoft17: true,
  doubleAllowedAfterSplit: true,
  resplitAcesAllowed: false,
  surrenderAllowed: true,
  insuranceAllowed: false,
  maxSplits: 3,
  blackjackPayout: 1.5,
  dealerPeekA10: true,
  hitAfterSplitAces: false,
  penetration: 52,
}

const sim: SimulationResult = {
  shoes: 500,
  rounds: 12000,
  hands: 12500,
  totalWagered: 6_000_000,
  startingBalance: 1_000_000_000_000,
  endingBalance: 1_000_000_045_000,
  netProfit: 45_000,
  roi: 0.0075,
  evPer100Rounds: 375,
  perRoundMean: 3.75,
  perRoundVariance: 1_000_000,
  perRoundStdDev: 1000,
  finalRunningCount: -3,
  handOutcomes: { Win: 5000, Lose: 5500, Push: 1000, None: 0 } as never,
}

describe('buildSimulationDoc', () => {
  const base = {
    id: 'sim_test',
    ruleFields,
    betSpread: [500, 1000, 2000],
    strategyId: 'illustrious18Fab4H17',
    strategyName: 'Illustrious 18 + Fab 4',
    handsPerHour: 100,
    bankroll: 500_000,
    shoeCount: 500,
    sim,
  }

  it('captures config and raw stats', () => {
    const doc = buildSimulationDoc({ ...base, seed: 'my-seed' })
    expect(doc.id).toBe('sim_test')
    expect(doc.config.deckCount).toBe(6)
    expect(doc.config.betSpread).toEqual([500, 1000, 2000])
    expect(doc.config.strategyId).toBe('illustrious18Fab4H17')
    expect(doc.config.seed).toBe('my-seed')
    expect(doc.stats.perRoundMean).toBe(3.75)
    expect(doc.stats.perRoundVariance).toBe(1_000_000)
    expect(doc.stats.netProfit).toBe(45_000)
    expect(doc.stats.handOutcomes).toEqual({ Win: 5000, Lose: 5500, Push: 1000, None: 0 })
  })

  it('normalises an undefined seed to null (Firestore rejects undefined)', () => {
    const doc = buildSimulationDoc({ ...base, seed: undefined })
    expect(doc.config.seed).toBeNull()
  })

  it('stores only finite numbers (Firestore rejects Infinity/NaN)', () => {
    const doc = buildSimulationDoc({ ...base, seed: 'x' })
    for (const value of Object.values(doc.stats)) {
      if (typeof value === 'number') expect(Number.isFinite(value)).toBe(true)
    }
  })

  it('copies arrays/objects so later mutation of inputs does not leak', () => {
    const betSpread = [500, 1000]
    const doc = buildSimulationDoc({ ...base, betSpread, seed: 'x' })
    betSpread.push(9999)
    expect(doc.config.betSpread).toEqual([500, 1000])
  })
})
