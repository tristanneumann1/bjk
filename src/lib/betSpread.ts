export const MIN_BET = 500
export const MAX_BET = 30000

export const DEFAULT_BET_SPREAD: readonly number[] = [
  500, 1000, 1500, 2500, 5000, 7500, 10000, 15000, 20000, 30000,
]

export const MIN_SPREAD_LENGTH = 2
export const MAX_SPREAD_LENGTH = 10

const clampValue = (value: number): number => {
  if (!Number.isFinite(value)) return MIN_BET
  const rounded = Math.round(value)
  return Math.min(MAX_BET, Math.max(MIN_BET, rounded))
}

export const normaliseSpread = (values: number[]): number[] => {
  const cleaned = values
    .map(clampValue)
    .filter((v, i, arr) => arr.indexOf(v) === i)
    .sort((a, b) => a - b)
  return cleaned.slice(0, MAX_SPREAD_LENGTH)
}

export const nextSpreadValue = (current: number, spread: readonly number[]): number => {
  if (spread.length === 0) return current
  for (const value of spread) {
    if (value > current) return value
  }
  return spread[spread.length - 1]
}

export const prevSpreadValue = (current: number, spread: readonly number[]): number => {
  if (spread.length === 0) return current
  for (let i = spread.length - 1; i >= 0; i--) {
    if (spread[i] < current) return spread[i]
  }
  return spread[0]
}

export const nearestSpreadValue = (current: number, spread: readonly number[]): number => {
  if (spread.length === 0) return current
  let best = spread[0]
  let bestDist = Math.abs(current - best)
  for (const value of spread) {
    const dist = Math.abs(current - value)
    if (dist < bestDist) {
      best = value
      bestDist = dist
    }
  }
  return best
}

export const isAtMaxSpread = (current: number, spread: readonly number[]): boolean =>
  spread.length === 0 || current >= spread[spread.length - 1]

export const isAtMinSpread = (current: number, spread: readonly number[]): boolean =>
  spread.length === 0 || current <= spread[0]
