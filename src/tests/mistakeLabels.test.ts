import { describe, expect, it } from 'vitest'
import {
  formatTrueCountRange,
  formatUpcard,
  handGroupLabel,
  trueCountBucket,
  trueCountMidpoint,
} from '@/models/analytics/mistakeLabels'

describe('formatUpcard', () => {
  it('renders Ace for 1/11, otherwise the number', () => {
    expect(formatUpcard(1)).toBe('A')
    expect(formatUpcard(11)).toBe('A')
    expect(formatUpcard(10)).toBe('10')
    expect(formatUpcard(6)).toBe('6')
  })
})

describe('handGroupLabel', () => {
  it('labels pairs, soft and hard hands', () => {
    expect(handGroupLabel({ isPair: true, isSoft: true, handValue: 2, pairValue: 1 })).toBe('Pair of Aces')
    expect(handGroupLabel({ isPair: true, isSoft: false, handValue: 8, pairValue: 4 })).toBe('Pair of 4s')
    expect(handGroupLabel({ isPair: false, isSoft: true, handValue: 8 })).toBe('Soft 18')
    expect(handGroupLabel({ isPair: false, isSoft: false, handValue: 16 })).toBe('Hard 16')
  })
})

describe('trueCountBucket', () => {
  it('buckets the midpoint into integer bands', () => {
    expect(trueCountMidpoint(0, 2)).toBe(1)
    expect(trueCountBucket(-2, -2)).toBe('≤ -1')
    expect(trueCountBucket(0, 0)).toBe('0')
    expect(trueCountBucket(1, 1)).toBe('+1')
    expect(trueCountBucket(4, 9)).toBe('≥ +4')
  })
})

describe('formatTrueCountRange', () => {
  it('collapses equal bounds and shows a range otherwise', () => {
    expect(formatTrueCountRange(2, 2)).toBe('2')
    expect(formatTrueCountRange(0, 2)).toBe('0 to 2')
  })
})
