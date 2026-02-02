#!/usr/bin/env node
import { execSync } from 'node:child_process'

const [, , action, ...args] = process.argv

if (!['preview', 'deploy'].includes(action)) {
  console.error('Usage: node scripts/firebaseDeploy.mjs <preview|deploy> [--branch <name> | -b <name>]')
  process.exit(1)
}

const extractBranchFromArg = arg => {
  if (arg.startsWith('--branch=')) return arg.split('=')[1]
  if (arg.startsWith('-b=')) return arg.split('=')[1]
  return null
}

let branch = process.env.BRANCH ?? 'sandbox'
let skipNext = false

args.forEach((arg, index) => {
  if (skipNext) {
    skipNext = false
    return
  }
  if (arg === '--branch' || arg === '-b') {
    const next = args[index + 1]
    if (next) {
      branch = next
      skipNext = true
    }
    return
  }
  const extracted = extractBranchFromArg(arg)
  if (extracted) {
    branch = extracted
  }
})

const command =
  action === 'preview'
    ? `firebase hosting:channel:deploy ${branch}`
    : `firebase hosting:clone blackjack-19729:${branch} blackjack-19729:live`

try {
  execSync(command, { stdio: 'inherit', env: process.env })
} catch (error) {
  process.exit(error.status ?? 1)
}
