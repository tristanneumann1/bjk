import { computeSimulateMetrics } from '@/models/analytics/simulateMetrics'
import type { SimulateInput } from '@/types/simulate'

const baseInput: SimulateInput = {
  perRoundMean: 50, // μ
  perRoundVariance: 1_000_000, // σ²
  rounds: 100_000,
  avgBetPerRound: 2_500,
  bankroll: 500_000, // B
  handsPerHour: 100,
}

describe('computeSimulateMetrics', () => {
  it('computes EV figures and edge', () => {
    const r = computeSimulateMetrics(baseInput)
    expect(r.evPerRound).toBe(50)
    expect(r.evPer100Rounds).toBe(5000)
    expect(r.evPerHour).toBe(5000)
    expect(r.edge).toBeCloseTo(50 / 2500, 10) // 0.02 → 2%
  })

  it('computes standard deviation with √n scaling', () => {
    const r = computeSimulateMetrics(baseInput)
    expect(r.stdDevPerRound).toBe(1000)
    expect(r.stdDevPer100Rounds).toBeCloseTo(10_000, 6)
    expect(r.stdDevPerHour).toBeCloseTo(10_000, 6)
    // SD over 100 rounds is exactly 10× the per-round SD.
    expect(r.stdDevPer100Rounds).toBeCloseTo(10 * r.stdDevPerRound, 6)
  })

  it('computes Risk of Ruin and N0 for a positive-EV player', () => {
    const r = computeSimulateMetrics(baseInput)
    // RoR = exp(-2·B·μ/σ²) = exp(-2·500000·50/1e6) = exp(-50)
    expect(r.riskOfRuin).toBeCloseTo(Math.exp(-50), 12)
    // N0 = σ²/μ² = 1e6 / 2500 = 400 rounds → 4 hours at 100/hr
    expect(r.n0Rounds).toBe(400)
    expect(r.n0Hours).toBe(4)
  })

  it('treats a break-even player (μ = 0) as certain ruin, infinite N0', () => {
    const r = computeSimulateMetrics({ ...baseInput, perRoundMean: 0 })
    expect(r.riskOfRuin).toBe(1)
    expect(r.n0Rounds).toBe(Infinity)
    expect(r.n0Hours).toBe(Infinity)
  })

  it('treats a losing player (μ < 0) as certain ruin, infinite N0', () => {
    const r = computeSimulateMetrics({ ...baseInput, perRoundMean: -50 })
    expect(r.riskOfRuin).toBe(1)
    expect(r.n0Rounds).toBe(Infinity)
    expect(r.n0Hours).toBe(Infinity)
  })

  it('guards zero variance without producing NaN', () => {
    const winner = computeSimulateMetrics({ ...baseInput, perRoundVariance: 0 })
    expect(winner.riskOfRuin).toBe(0)
    expect(Number.isNaN(winner.stdDevPerRound)).toBe(false)
    expect(winner.stdDevPerRound).toBe(0)

    const loser = computeSimulateMetrics({ ...baseInput, perRoundMean: -50, perRoundVariance: 0 })
    expect(loser.riskOfRuin).toBe(1)
  })

  it('guards zero avgBet (edge) and zero handsPerHour', () => {
    const r = computeSimulateMetrics({ ...baseInput, avgBetPerRound: 0, handsPerHour: 0 })
    expect(r.edge).toBe(0)
    expect(r.evPerHour).toBe(0)
    expect(r.stdDevPerHour).toBe(0)
    // N0 in hours is undefined without a rate.
    expect(r.n0Hours).toBe(Infinity)
    // N0 in rounds is still finite for a winner.
    expect(r.n0Rounds).toBe(400)
  })
})
