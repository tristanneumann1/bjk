import { describe, expect, it } from 'vitest'
import { buildSummaryIncrement } from '@/docs/analytics'
import type { StoredMistake } from '@/types/analytics'

const mistake = (overrides: Partial<StoredMistake>): StoredMistake => ({
  id: 'mst_1',
  roundId: 'rnd_1',
  strategyId: 'illustrious18Fab4S17',
  cards: [],
  upCard: {},
  startingTrueCountLower: 0,
  startingTrueCountUpper: 0,
  chosenAction: 'Hit',
  expectedAction: ['Stand'],
  handValue: 16,
  dealerUpCard: 10,
  cellKey: '16_10',
  isSoft: false,
  isPair: false,
  isDeviation: true,
  families: ['hard-stiff', 'deviation'],
  ...overrides,
})

describe('buildSummaryIncrement', () => {
  it('increments total and every family bucket', () => {
    const payload = buildSummaryIncrement(mistake({}))
    expect(payload.total).toBeDefined()
    const byFamily = payload.byFamily as Record<string, unknown>
    expect(Object.keys(byFamily).sort()).toEqual(['deviation', 'hard-stiff'])
  })

  it('emits a hardCells entry for a hard hand keyed by cellKey', () => {
    const payload = buildSummaryIncrement(mistake({ cellKey: '16_10' }))
    expect(payload.hardCells).toBeDefined()
    expect(Object.keys(payload.hardCells as Record<string, unknown>)).toEqual(['16_10'])
  })

  it('omits hardCells for soft hands', () => {
    const payload = buildSummaryIncrement(mistake({ isSoft: true, families: ['soft', 'basic'] }))
    expect('hardCells' in payload).toBe(false)
  })

  it('omits hardCells for pairs', () => {
    const payload = buildSummaryIncrement(mistake({ isPair: true, pairValue: 4, families: ['pairs', 'basic'] }))
    expect('hardCells' in payload).toBe(false)
  })

  it('omits hardCells for insurance decisions', () => {
    const payload = buildSummaryIncrement(
      mistake({ families: ['insurance', 'deviation'], chosenAction: 'Insurance', expectedAction: ['DeclineInsurance'] }),
    )
    expect('hardCells' in payload).toBe(false)
  })
})
