export const pickBet = (trueCount: number, spread: readonly number[]): number => {
  if (spread.length === 0) return 0
  const index = Math.max(0, Math.min(spread.length - 1, Math.floor(trueCount)))
  return spread[index]
}
