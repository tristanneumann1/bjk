// Mulberry32: 32-bit seedable PRNG. Fast, uniform enough for non-cryptographic
// simulation use. Period ~2^32, which is ample for millions of shoes.
// Returns a function with the same signature as Math.random.

const hashSeed = (seed: string): number => {
  // FNV-1a variant — deterministic string → uint32.
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export const createRandom = (seed?: string): (() => number) => {
  let state = seed !== undefined
    ? hashSeed(seed)
    : (Math.random() * 0x1_0000_0000) >>> 0

  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 0x1_0000_0000
  }
}
