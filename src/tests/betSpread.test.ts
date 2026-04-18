import {
  DEFAULT_BET_SPREAD,
  MAX_BET,
  MIN_BET,
  isAtMaxSpread,
  isAtMinSpread,
  nearestSpreadValue,
  nextSpreadValue,
  normaliseSpread,
  prevSpreadValue,
} from '@/lib/betSpread'

describe('betSpread helpers', () => {
  const spread = [500, 1000, 2500, 10000]

  describe('nextSpreadValue', () => {
    it('returns the next higher value when current is a spread member', () => {
      expect(nextSpreadValue(500, spread)).toBe(1000)
      expect(nextSpreadValue(1000, spread)).toBe(2500)
    })

    it('returns the smallest value greater than current when current is not in spread', () => {
      expect(nextSpreadValue(700, spread)).toBe(1000)
      expect(nextSpreadValue(100, spread)).toBe(500)
    })

    it('sticks at max when current is at or above max', () => {
      expect(nextSpreadValue(10000, spread)).toBe(10000)
      expect(nextSpreadValue(20000, spread)).toBe(10000)
    })

    it('returns current unchanged when spread is empty', () => {
      expect(nextSpreadValue(500, [])).toBe(500)
    })
  })

  describe('prevSpreadValue', () => {
    it('returns the next lower value when current is a spread member', () => {
      expect(prevSpreadValue(10000, spread)).toBe(2500)
      expect(prevSpreadValue(1000, spread)).toBe(500)
    })

    it('returns the largest value less than current when current is not in spread', () => {
      expect(prevSpreadValue(700, spread)).toBe(500)
      expect(prevSpreadValue(3000, spread)).toBe(2500)
    })

    it('sticks at min when current is at or below min', () => {
      expect(prevSpreadValue(500, spread)).toBe(500)
      expect(prevSpreadValue(100, spread)).toBe(500)
    })
  })

  describe('nearestSpreadValue', () => {
    it('returns exact match when current is in the spread', () => {
      expect(nearestSpreadValue(2500, spread)).toBe(2500)
    })

    it('returns the closest value when current is between spread members', () => {
      expect(nearestSpreadValue(600, spread)).toBe(500)
      expect(nearestSpreadValue(900, spread)).toBe(1000)
      expect(nearestSpreadValue(1500, spread)).toBe(1000)
      expect(nearestSpreadValue(2000, spread)).toBe(2500)
    })

    it('clamps to endpoints for out-of-range values', () => {
      expect(nearestSpreadValue(100, spread)).toBe(500)
      expect(nearestSpreadValue(99999, spread)).toBe(10000)
    })
  })

  describe('normaliseSpread', () => {
    it('clamps values to [MIN_BET, MAX_BET]', () => {
      expect(normaliseSpread([0, 100, 500, 100000])).toEqual([MIN_BET, MAX_BET])
    })

    it('dedupes and sorts ascending', () => {
      expect(normaliseSpread([5000, 1000, 500, 1000])).toEqual([500, 1000, 5000])
    })

    it('truncates to at most 10 values', () => {
      const many = Array.from({ length: 15 }, (_, i) => 500 + i * 500)
      expect(normaliseSpread(many).length).toBe(10)
    })

    it('default spread is valid after normalisation', () => {
      expect(normaliseSpread([...DEFAULT_BET_SPREAD])).toEqual([...DEFAULT_BET_SPREAD])
    })
  })

  describe('isAtMin / isAtMax', () => {
    it('reports min correctly', () => {
      expect(isAtMinSpread(500, spread)).toBe(true)
      expect(isAtMinSpread(400, spread)).toBe(true)
      expect(isAtMinSpread(1000, spread)).toBe(false)
    })

    it('reports max correctly', () => {
      expect(isAtMaxSpread(10000, spread)).toBe(true)
      expect(isAtMaxSpread(99999, spread)).toBe(true)
      expect(isAtMaxSpread(2500, spread)).toBe(false)
    })

    it('treats empty spread as both min and max', () => {
      expect(isAtMinSpread(500, [])).toBe(true)
      expect(isAtMaxSpread(500, [])).toBe(true)
    })
  })
})
