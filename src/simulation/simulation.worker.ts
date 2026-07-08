/// <reference lib="webworker" />
import { runSimulation } from '@/simulation/runSimulation'
import { rulesFromFields } from '@/simulation/ruleFields'
import type { SimulationWorkerRequest, SimulationWorkerResponse } from '@/simulation/workerMessages'

self.onmessage = (event: MessageEvent<SimulationWorkerRequest>) => {
  const { requestId, shoeCount, ruleFields, strategyGrid, betSpread, startingBalance, seed } = event.data
  try {
    // Rebuild the Rules instance here — its prototype was dropped when the
    // plain fields crossed the worker boundary. StrategyGrid is a plain object
    // of plain arrays, so it survives structured clone as-is.
    const result = runSimulation({
      shoeCount,
      strategy: strategyGrid,
      rules: rulesFromFields(ruleFields),
      betSpread,
      startingBalance,
      seed,
    })
    const response: SimulationWorkerResponse = { requestId, result }
    self.postMessage(response)
  } catch (err) {
    const response: SimulationWorkerResponse = {
      requestId,
      error: err instanceof Error ? err.message : 'Simulation failed',
    }
    self.postMessage(response)
  }
}
