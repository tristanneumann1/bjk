// Types for the Simulate analytics feature. All monetary values are in
// CENTS (matching the rest of the app and the simulation engine). Conversion to
// dollars / percentages happens at display time, never inside computeSimulateMetrics.

export interface SimulateInput {
  perRoundMean: number // μ, cents — expected net P/L per round
  perRoundVariance: number // σ², cents² — population variance of per-round net P/L
  rounds: number // n — simulation sample size (rounds played)
  avgBetPerRound: number // cents — totalWagered / rounds, used for edge %
  bankroll: number // B, cents — the player's real bankroll (Risk of Ruin input)
  handsPerHour: number // rounds played per hour, used for per-hour figures & N0
}

export interface SimulateMetrics {
  // Expected value (all cents unless noted)
  evPerRound: number
  evPer100Rounds: number
  evPerHour: number
  edge: number // dimensionless fraction (μ / avgBet); multiply by 100 to display %

  // Standard deviation (all cents)
  stdDevPerRound: number
  stdDevPer100Rounds: number
  stdDevPerHour: number

  // Risk
  riskOfRuin: number // 0..1
  n0Rounds: number // rounds until expected win == 1 SD; Infinity when μ ≤ 0
  n0Hours: number // n0Rounds / handsPerHour; Infinity when μ ≤ 0

  // Passthrough for display / sanity checks
  perRoundMean: number
  perRoundVariance: number
  rounds: number
}
