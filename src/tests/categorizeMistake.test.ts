import { describe, expect, it } from 'vitest'
import { categorizeMistake, type MistakeFacts } from '@/models/analytics/categorizeMistake'

const facts = (overrides: Partial<MistakeFacts>): MistakeFacts => ({
  handValue: 16,
  dealerUpCard: 10,
  isSoft: false,
  isPair: false,
  chosenAction: 'Hit',
  expectedAction: ['Stand'],
  isDeviation: false,
  ...overrides,
})

describe('categorizeMistake', () => {
  it('classifies a hard stiff basic-strategy error', () => {
    const result = categorizeMistake(facts({ handValue: 16, chosenAction: 'Hit', expectedAction: ['Stand'] }))
    expect(result.families).toContain('hard-stiff')
    expect(result.families).toContain('basic')
    expect(result.families).not.toContain('deviation')
  })

  it('classifies a count-dependent deviation (12 vs 2 at high count)', () => {
    const result = categorizeMistake(
      facts({ handValue: 12, dealerUpCard: 2, chosenAction: 'Hit', expectedAction: ['Stand'], isDeviation: true }),
    )
    expect(result.families).toContain('hard-stiff')
    expect(result.families).toContain('deviation')
    expect(result.families).not.toContain('basic')
  })

  it('classifies taking insurance when it should be declined as a basic insurance error', () => {
    const result = categorizeMistake(
      facts({ chosenAction: 'Insurance', expectedAction: ['DeclineInsurance'], isDeviation: false }),
    )
    expect(result.families).toEqual(['insurance', 'basic'])
  })

  it('classifies declining insurance at TC>=3 as a deviation insurance error', () => {
    const result = categorizeMistake(
      facts({ chosenAction: 'DeclineInsurance', expectedAction: ['Insurance'], isDeviation: true }),
    )
    expect(result.families).toEqual(['insurance', 'deviation'])
  })

  it('does not tag insurance decisions with hand-shape families', () => {
    const result = categorizeMistake(
      facts({ handValue: 16, isPair: false, chosenAction: 'Insurance', expectedAction: ['DeclineInsurance'] }),
    )
    expect(result.families).not.toContain('hard-stiff')
    expect(result.families).not.toContain('pairs')
  })

  it('classifies a pair-of-4s error', () => {
    const result = categorizeMistake(
      facts({ handValue: 8, dealerUpCard: 5, isPair: true, pairValue: 4, chosenAction: 'Split', expectedAction: ['Hit'] }),
    )
    expect(result.families).toContain('pairs')
    expect(result.pairValue).toBe(4)
  })

  it('omits pairValue entirely for non-pair hands (Firestore rejects undefined)', () => {
    const result = categorizeMistake(facts({ isPair: false }))
    expect('pairValue' in result).toBe(false)
  })

  it('classifies a soft-hand error', () => {
    const result = categorizeMistake(
      facts({ handValue: 8, isSoft: true, dealerUpCard: 3, chosenAction: 'Stand', expectedAction: ['Double'] }),
    )
    expect(result.families).toContain('soft')
    expect(result.families).not.toContain('hard-stiff')
  })

  it('classifies a surrender error', () => {
    const result = categorizeMistake(
      facts({ handValue: 16, dealerUpCard: 10, chosenAction: 'Hit', expectedAction: ['Surrender'] }),
    )
    expect(result.families).toContain('surrender')
  })
})
