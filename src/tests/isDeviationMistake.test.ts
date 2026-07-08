import { describe, expect, it } from 'vitest'
import { isDeviationMistake } from '@/models/strategy/isDeviationMistake'
import type { ComparisonRule } from '@/types/strategies'

// Representative 12 vs 2 ruleset (Illustrious 18: stand at TC >= 3, else hit).
const twelveVsTwo: ComparisonRule[] = [
  { trueCountGreaterEqualTo: 3, action: 'Stand' },
  { action: 'Hit' },
]
// 16 vs 10 (Illustrious 18: stand at TC >= 0, else hit) with surrender option.
const sixteenVsTen: ComparisonRule[] = [
  { canSurrender: true, action: 'Surrender' },
  { trueCountGreaterEqualTo: 0, action: 'Stand' },
  { action: 'Hit' },
]
const insuranceRuleset: ComparisonRule[] = [
  { trueCountGreaterEqualTo: 3, canInsure: true, action: 'Insurance' },
  { action: 'Hit' },
]

describe('isDeviationMistake', () => {
  it('flags failing to deviate (correct play came from a deviation rule)', () => {
    expect(
      isDeviationMistake({
        matchedUpper: { trueCountGreaterEqualTo: 3, action: 'Stand' },
        matchedLower: { trueCountGreaterEqualTo: 3, action: 'Stand' },
        ruleSet: twelveVsTwo,
        chosenAction: 'Hit',
      }),
    ).toBe(true)
  })

  it('flags deviating when the count is wrong (chose a count-gated action prematurely)', () => {
    // 12 vs 2 at TC 0: correct is Hit (basic), but the player stood (the deviation).
    expect(
      isDeviationMistake({
        matchedUpper: { action: 'Hit' },
        matchedLower: { action: 'Hit' },
        ruleSet: twelveVsTwo,
        chosenAction: 'Stand',
      }),
    ).toBe(true)
  })

  it('flags 16 vs 10 where the correct play is the index-0 deviation', () => {
    // 16 vs 10: stand is the TC>=0 deviation; hitting it is a deviation mistake.
    expect(
      isDeviationMistake({
        matchedUpper: { trueCountGreaterEqualTo: 0, action: 'Stand' },
        matchedLower: { trueCountGreaterEqualTo: 0, action: 'Stand' },
        ruleSet: sixteenVsTen,
        chosenAction: 'Hit',
      }),
    ).toBe(true)
  })

  it('treats a pure basic spot (no deviation rules) as not a deviation', () => {
    const basicOnly: ComparisonRule[] = [{ action: 'Stand' }]
    expect(
      isDeviationMistake({
        matchedUpper: { action: 'Stand' },
        matchedLower: { action: 'Stand' },
        ruleSet: basicOnly,
        chosenAction: 'Hit',
      }),
    ).toBe(false)
  })

  it('flags taking insurance at a low count (deviation applied early)', () => {
    expect(
      isDeviationMistake({
        matchedUpper: { action: 'Hit' },
        matchedLower: { action: 'Hit' },
        ruleSet: insuranceRuleset,
        chosenAction: 'Insurance',
      }),
    ).toBe(true)
  })

  it('flags declining insurance at a high count (failed deviation)', () => {
    expect(
      isDeviationMistake({
        matchedUpper: { trueCountGreaterEqualTo: 3, canInsure: true, action: 'Insurance' },
        matchedLower: { trueCountGreaterEqualTo: 3, canInsure: true, action: 'Insurance' },
        ruleSet: insuranceRuleset,
        chosenAction: 'DeclineInsurance',
      }),
    ).toBe(true)
  })
})
