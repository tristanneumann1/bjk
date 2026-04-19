import { Session } from '@/models/session'
import { determineCorrectAction } from '@/models/strategy/determineCorrectAction'
import { HAND_OUTCOME_EVENT } from '@/models/hand'
import { modelCustomEvent, modelEvents, type ModelPropertyChangeEvent } from '@/lib/mitt'
import { createRandom } from '@/lib/random'
import { pickBet } from '@/simulation/pickBet'
import { pickAction } from '@/simulation/pickAction'
import type { HandResult } from '@/models/chair'
import type { OutcomeKey, SimulationConfig, SimulationResult } from '@/simulation/types'

const MAX_ACTIONS_PER_ROUND = 200

export const runSimulation = (config: SimulationConfig): SimulationResult => {
  const actionBound = config.actionBound ?? 'lower'

  const originalRandom = Math.random
  if (config.seed) {
    Math.random = createRandom(config.seed)
  }

  try {
    const session = Session.initialize(config.rules, { playerBalance: config.startingBalance })
    const table = session.table
    table.addPlayerChair()
    const chair = table.getPlayerChair(0)
    if (!chair) throw new Error('runSimulation: failed to seat chair')

    let rounds = 0
    let hands = 0
    let totalWagered = 0
    const handOutcomes: Record<OutcomeKey, number> = {
      Win: 0, Lose: 0, Push: 0,
      Double_Win: 0, Double_Lose: 0, Double_Push: 0,
      BlackJack_Win: 0, Surrendered: 0, None: 0,
    }

    // Tally outcomes via the HAND_OUTCOME_EVENT bus. This captures hands
    // regardless of whether the round resolves mid-act, inside startRound
    // (dealer BJ peek), or via normal flow — the event fires on every
    // lastOutcome assignment.
    const onHandOutcome = (event: ModelPropertyChangeEvent) => {
      const result = event.value as HandResult | undefined
      if (!result) return
      handOutcomes[result] = (handOutcomes[result] ?? 0) + 1
      hands++
    }
    const outcomeEvent = modelCustomEvent('hand', HAND_OUTCOME_EVENT)
    modelEvents.on(outcomeEvent, onHandOutcome)

    try {
      for (let shoe = 0; shoe < config.shoeCount; shoe++) {
        // Keep playing rounds until the shoe hits penetration.
        while (!table.dealer.pastPenetration()) {
          const trueCount = table.trueCountLower
          chair.bet = pickBet(trueCount, config.betSpread)
          totalWagered += chair.bet

          table.startRound()

          // Round is in progress while the dealer still has cards on the table.
          // table.activeChair can be truthy after payout (which resets chairs),
          // so we can't rely on it alone.
          const roundInProgress = () => (table.dealerChair.hands[0]?.cards.length ?? 0) > 0

          let guard = 0
          while (roundInProgress() && table.activeChair && guard++ < MAX_ACTIONS_PER_ROUND) {
            const actions = determineCorrectAction(session, config.strategy)
            if (actions.length === 0) break
            const action = pickAction(actions, actionBound)
            table.act(action)
          }
          if (guard >= MAX_ACTIONS_PER_ROUND) {
            throw new Error('runSimulation: round exceeded action cap; likely stuck in strategy loop')
          }

          rounds++
        }

        // Reshuffle for the next shoe. This also zeros the running count.
        table.dealer.shuffle()
      }
    } finally {
      modelEvents.off(outcomeEvent, onHandOutcome)
    }

    const endingBalance = session.player.balance
    const netProfit = endingBalance - config.startingBalance
    const roi = totalWagered > 0 ? netProfit / totalWagered : 0
    const evPer100Rounds = rounds > 0 ? (netProfit / rounds) * 100 : 0

    return {
      shoes: config.shoeCount,
      rounds,
      hands,
      totalWagered,
      startingBalance: config.startingBalance,
      endingBalance,
      netProfit,
      roi,
      evPer100Rounds,
      finalRunningCount: table.runningCount,
      handOutcomes,
    }
  } finally {
    Math.random = originalRandom
  }
}
