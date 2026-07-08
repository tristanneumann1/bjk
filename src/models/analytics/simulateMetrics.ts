import type { SimulateInput, SimulateMetrics } from '@/types/simulate'

/**
 * Derive advantage-play risk metrics from the per-round net P/L statistics that
 * `runSimulation` collects. Pure and unit-agnostic: cents in, cents out.
 *
 * Formulas (μ = mean per-round net, σ² = variance per-round net, B = bankroll):
 *  - Risk of Ruin (infinite play): RoR = exp(-2·B·μ / σ²) when μ > 0, else 1.
 *  - N0 (rounds until expected win equals one standard deviation): N0 = σ² / μ².
 *
 * Variance is additive across independent rounds, so standard deviation scales
 * with √n (e.g. SD over 100 rounds = 10·SD per round).
 */
export const computeSimulateMetrics = (input: SimulateInput): SimulateMetrics => {
  const { perRoundMean: mean, perRoundVariance: variance, avgBetPerRound, bankroll, handsPerHour } =
    input

  const evPerRound = mean
  const evPer100Rounds = 100 * mean
  const evPerHour = mean * handsPerHour
  const edge = avgBetPerRound > 0 ? mean / avgBetPerRound : 0

  const stdDevPerRound = Math.sqrt(variance)
  const stdDevPer100Rounds = Math.sqrt(100 * variance)
  const stdDevPerHour = handsPerHour > 0 ? Math.sqrt(handsPerHour * variance) : 0

  let riskOfRuin: number
  if (variance <= 0) {
    // No variance ⇒ deterministic outcome: a winner never ruins, anyone else does.
    riskOfRuin = mean > 0 ? 0 : 1
  } else {
    riskOfRuin = mean > 0 ? Math.exp((-2 * bankroll * mean) / variance) : 1
  }

  const n0Rounds = mean > 0 ? variance / (mean * mean) : Infinity
  const n0Hours = mean > 0 && handsPerHour > 0 ? n0Rounds / handsPerHour : Infinity

  return {
    evPerRound,
    evPer100Rounds,
    evPerHour,
    edge,
    stdDevPerRound,
    stdDevPer100Rounds,
    stdDevPerHour,
    riskOfRuin,
    n0Rounds,
    n0Hours,
    perRoundMean: mean,
    perRoundVariance: variance,
    rounds: input.rounds,
  }
}
