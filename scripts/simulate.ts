import { Rules } from '@/models/rules'
import { DEFAULT_BET_SPREAD } from '@/lib/betSpread'
import { runSimulation } from '@/simulation/runSimulation'
import { BUILTIN_STRATEGIES, DEFAULT_STRATEGY_KEY } from '@/simulation/strategies'
import type { ActionBound, SimulationResult } from '@/simulation/types'

type ParsedArgs = Record<string, string | boolean>

const parseArgs = (argv: string[]): ParsedArgs => {
  const parsed: ParsedArgs = {}
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue
    const body = raw.slice(2)
    const eq = body.indexOf('=')
    if (eq === -1) {
      parsed[body] = true
    } else {
      parsed[body.slice(0, eq)] = body.slice(eq + 1)
    }
  }
  return parsed
}

const asNumber = (value: unknown, fallback: number): number => {
  if (typeof value !== 'string') return fallback
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

const asString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback

const parseSpread = (raw: string | undefined): number[] => {
  if (!raw) return [...DEFAULT_BET_SPREAD]
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => Math.round(Number(s) * 100))
    .filter(n => Number.isFinite(n) && n > 0)
}

const parseActionBound = (raw: string | undefined): ActionBound =>
  raw === 'upper' ? 'upper' : 'lower'

const HELP = `
Usage: npm run simulate -- [flags]

Flags:
  --shoes=N               Number of shoes to play        (default 10)
  --strategy=KEY          ${Object.keys(BUILTIN_STRATEGIES).join(' | ')}
                          (default ${DEFAULT_STRATEGY_KEY})
  --spread=5,10,25,...    Custom bet spread in dollars   (default: built-in counter spread)
  --balance=N             Starting balance in dollars    (default 10000)
  --seed=XYZ              Reproducible shuffle
  --action-bound=upper    Which determineCorrectAction branch to follow (default lower)
  --decks=N               Shoe deck count                (default: rules default)
  --penetration=N         Cards remaining trigger         (default: rules default)
  --help                  Show this text
`.trim()

const formatCents = (cents: number): string => {
  const sign = cents < 0 ? '-' : ''
  return `${sign}$${(Math.abs(cents) / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

const formatResult = (result: SimulationResult, elapsedMs: number): string => {
  const lines = [
    '',
    '── Simulation Result ──────────────────────────',
    `Shoes:             ${result.shoes.toLocaleString('en-US')}`,
    `Rounds:            ${result.rounds.toLocaleString('en-US')}`,
    `Hands (w/ splits): ${result.hands.toLocaleString('en-US')}`,
    `Total wagered:     ${formatCents(result.totalWagered)}`,
    `Starting balance:  ${formatCents(result.startingBalance)}`,
    `Ending balance:    ${formatCents(result.endingBalance)}`,
    `Net profit:        ${formatCents(result.netProfit)}`,
    `ROI:               ${(result.roi * 100).toFixed(3)}%`,
    `EV / 100 rounds:   ${formatCents(result.evPer100Rounds)}`,
    `Final running:     ${result.finalRunningCount}`,
    `Elapsed:           ${(elapsedMs / 1000).toFixed(2)}s`,
    '── Hand outcomes ─────────────────────────────',
  ]
  for (const [key, count] of Object.entries(result.handOutcomes)) {
    if (count === 0) continue
    lines.push(`  ${key.padEnd(18)} ${count.toLocaleString('en-US')}`)
  }
  lines.push('')
  return lines.join('\n')
}

const main = () => {
  const args = parseArgs(process.argv.slice(2))

  if (args.help) {
    console.log(HELP)
    return
  }

  const strategyKey = asString(args.strategy, DEFAULT_STRATEGY_KEY)
  const strategy = BUILTIN_STRATEGIES[strategyKey]
  if (!strategy) {
    console.error(`Unknown strategy: ${strategyKey}`)
    console.error(`Available: ${Object.keys(BUILTIN_STRATEGIES).join(', ')}`)
    process.exit(1)
  }

  const rules = new Rules()
  const deckCount = asNumber(args.decks, rules.deckCount)
  const penetration = asNumber(args.penetration, rules.penetration)
  rules.deckCount = deckCount
  rules.penetration = penetration

  const config = {
    shoeCount: Math.max(1, Math.floor(asNumber(args.shoes, 10))),
    strategy,
    rules,
    betSpread: parseSpread(typeof args.spread === 'string' ? args.spread : undefined),
    startingBalance: Math.round(asNumber(args.balance, 10_000) * 100),
    seed: typeof args.seed === 'string' ? args.seed : undefined,
    actionBound: parseActionBound(typeof args['action-bound'] === 'string' ? args['action-bound'] : undefined),
  }

  console.log('Running simulation...')
  console.log(`  strategy:    ${strategyKey}`)
  console.log(`  shoes:       ${config.shoeCount}`)
  console.log(`  decks:       ${rules.deckCount}`)
  console.log(`  penetration: ${rules.penetration}`)
  console.log(`  spread:      [${config.betSpread.map(c => `$${c / 100}`).join(', ')}]`)
  if (config.seed) console.log(`  seed:        ${config.seed}`)

  const start = Date.now()
  const result = runSimulation(config)
  const elapsed = Date.now() - start

  console.log(formatResult(result, elapsed))
}

main()
