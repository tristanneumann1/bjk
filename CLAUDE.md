# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Domain

**Production:** https://blackjackstrategytrainer.com

## SEO Keywords

| Priority  | Keyword                    | Notes                                              |
|-----------|----------------------------|----------------------------------------------------|
| Primary   | Blackjack Strategy Trainer | Main keyword — use in titles, headings, meta tags  |
| Audience  | Card Counting              | Defines the target user — use in descriptions     |
| Secondary | Illustrious 18             | Low competition, high-intent niche audience        |
| Secondary | Fab 4                      | Low competition, high-intent niche audience        |

When writing copy, meta descriptions, or landing page content, ensure the primary keyword appears in the `<title>` and `<h1>`, and that all four keywords are naturally represented on the page.

## Project Overview

This is a **Blackjack Strategy Trainer** - a Vue 3 + TypeScript web application for learning and practicing blackjack strategy with real-time feedback, card counting assistance, and performance tracking. Users can practice basic strategy, learn count-dependent plays (Illustrious 18, Fab 4), customize strategies, and track their progress across multiple game sessions.

## Commands

### Development
```bash
npm run dev              # Start dev server (Vite) on port 8080
npm run build            # Build for production
npm run type-check       # Run TypeScript compiler checks
npm run lint             # Run ESLint with auto-fix
npm run format           # Format code with Prettier
```

### Testing
```bash
npm run test:unit        # Run Vitest unit tests
```

### Deployment (Firebase Hosting)
```bash
npm run serve            # Serve built app locally
npm run preview          # Deploy preview to Firebase in sandbox environment (returns preview URL)
npm run deploy           # Deploy sandbox environment to production Firebase hosting

# Deploy to specific branch environment:
BRANCH=staging npm run preview
BRANCH=staging npm run deploy
# Or: npm run preview -- --branch=staging
```

### Local Development on Mobile Device
The Vite dev server is configured to bind to `0.0.0.0` (all network interfaces). To test on a mobile device:
1. Ensure mobile device is on same WiFi network
2. Run `npm run dev`
3. Access `http://<YOUR_LOCAL_IP>:8080` from mobile browser

## Architecture

### Dual-Layer State Management

The application uses a **unique two-layer architecture** that separates domain logic from UI state:

**Layer 1: Domain Models** (`/src/models/`)
- Pure TypeScript classes with no Vue dependencies
- Core game logic: `Session`, `Table`, `Dealer`, `Chair`, `Hand`, `Card`, `Rules`
- Emit events when state changes via `attachModelEventEmitter` decorator
- Single source of truth for game state

**Layer 2: Pinia Stores** (`/src/stores/`)
- UI-reactive state management: `useGameStore`, `useChairsStore`, `useDealerStore`, etc.
- Subscribe to model events and sync derived UI state
- Handle side effects (Firebase persistence, localStorage)
- Maintain computed values and reactive refs for Vue components

**Why this pattern?**
- Models are testable, pure, and framework-agnostic
- Stores handle reactivity and platform-specific concerns
- Clear separation of concerns with single responsibility per layer
- Game logic never waits for network operations

### Event System (Mitt-Based)

The application uses a sophisticated event bus (`/src/lib/mitt.ts`) with three event types:

**1. Model Events** - Emitted by domain models when state changes:
```typescript
modelPropertyEvent('table', 'chairTurnIndex')              // 'mod_table:prop_chairTurnIndex'
modelCustomEvent('hand', NEW_CARD_EVENT)                   // 'mod_hand:evt_new_card'
modelInstancePropertyEvent('chair', 'bet', chairId)        // 'mod_chair:prop_bet#id_chair_3'
```

**2. User Events** - Emitted by UI interactions:
```typescript
userEvent(PLAY)                                            // 'usr_evt_play'
userEventAction(PLAYER_ACTION, 'Hit')                      // 'usr_evt_playerAction_act_Hit'
```

**3. Instance Tracking** - Models with `trackInstance: true` get unique IDs:
- Uses `WeakMap` to assign IDs like `chair_1`, `hand_2` without preventing GC
- Enables targeted subscriptions: "only notify when Chair #3 changes"
- Critical for multi-hand split scenarios

**Key Pattern:** Models emit events → Stores listen → UI updates reactively

### Core Domain Model Relationships

```
Session (singleton)
├── Player (balance tracking)
├── Table (orchestrates game flow)
│   ├── Dealer (shoe management, card counting)
│   ├── dealerChair: Chair
│   ├── playerChairs: Chair[]
│   └── Rules (game configuration)
└── rules: Rules

Chair (player seat)
├── hands: Hand[] (multiple when split)
├── bet: number
├── activeHandIndex: number
└── validateAction(action) / act(action, dealer)

Hand (single player hand)
├── cards: Card[]
├── softValue, isSoft, bestValue (computed)
├── insuranceTaken, insuranceAmount, tookEvenMoney (insurance tracking)
├── isSplit, isDoubled, hasStood, isSurrendered (state flags)
└── beatsHand(other) → HandResult
```

**Session Singleton Pattern:**
```typescript
Session.getInstance()              // Get current session
Session.initialize(rules, options) // Create new session
Session.changeRules(newRules)      // Only allowed when shoe is empty
```

### Strategy System

Strategies use **scenario-based lookup tables** instead of procedural code:

```typescript
type ScenarioKey = `${playerTotal}_${dealerUpCard}`  // e.g., "12_6"
type StrategyGrid = {
  [scenarioKey]: ComparisonRule[]  // Array of rules, first match wins
}

type ComparisonRule = {
  action: PlayerAction              // What to do
  isSoft?: boolean                  // Must hand be soft?
  canDouble?: boolean               // Only if double allowed?
  DAS?: boolean                     // Only if Double After Split?
  trueCountGreaterEqualTo?: number  // Count threshold for deviation
}
```

**Built-in Strategies:**
- `basicStrategyH17` - Standard Las Vegas basic strategy (Dealer hits soft 17)
- `illustrious18Fab4H17` - Advanced card counting with 22 count-dependent deviations

**Strategy Matching:**
- `determineCorrectAction(session, strategy)` returns **TWO actions** (upper/lower bound)
- Uses true count range (`trueCountLower`/`trueCountUpper`) for uncertainty
- Rules evaluated in order, first matching rule wins
- Users can create custom strategies, persisted to Firebase

### Firebase Integration

**Data Structure:**
```
Players/{plyr_uid}                     # Player profile
├── Games/{gm_id}                      # Game session with rules
│   ├── Rounds/{rnd_id}                # Individual rounds (hands dealt)
│   └── Actions/{act_id}               # Each player decision
└── Strategies/{stg_id}                # Custom strategies
```

**When Data Persists:**
- **Game Start:** Rules config + game ID
- **Round Start:** True count bounds, bets, active strategy
- **Player Action:** Cards, upcard, chosen action, expected action, correctness
- **Balance Change:** New player balance
- **Game End:** Final running count when shoe exhausted
- **Strategy Save:** Full rule grid on user edit

**Key Patterns:**
- Optimistic updates: UI changes immediately, Firebase writes are async
- Merge-on-write: `setDoc(..., {merge: true})` preserves existing fields
- Non-blocking: Game logic never waits for network operations
- Offline-first: LocalStorage + Firebase sync for multi-device support

## Critical Development Patterns

### Property Change Detection with Decorators

Models use `attachModelEventEmitter` to auto-emit events on property changes:

```typescript
attachModelEventEmitter(Table, {
  model: 'table',
  props: ['chairTurnIndex', 'runningCount'],
  trackInstance: false
})
```

Uses `Object.defineProperty` to intercept setters. When adding new tracked properties, you must declare them in the decorator call.

### Game Lifecycle Flow

**1. Game Start:**
```
User clicks "Play"
→ usePlayerActionsStore.play()
→ emits usr_evt_play
→ useGameStore.onPlay()
→ persist to Firebase (async) + Session.table.startRound() (sync)
→ model events propagate
→ stores sync
→ UI updates
```

**2. Player Action:**
```
User clicks "Hit"
→ usePlayerActionsStore.triggerAction('Hit')
→ emits usr_evt_playerAction_act_Hit
→ persist action to Firebase (async) + Session.table.act('Hit') (sync)
→ chair.validateAction() → chair.act()
→ hand.addCard() → emits mod_hand:evt_new_card
→ useChairsStore/useDealerStore sync
→ UI updates
```

**3. Round Complete:**
```
Last player finishes
→ table.playerRoundsComplete = true
→ dealer completes hand
→ table.payout() compares hands
→ player.balance changes → emits mod_player:prop_balance
→ usePlayerStore persists to Firebase
```

### True Count Range System

The table maintains **both bounds** of the true count to handle deck estimation uncertainty:

```typescript
trueCountLower  // Conservative: ceil(remainingDecks)
trueCountUpper  // Optimistic: floor(remainingDecks)
```

Strategy matching returns two actions (one per bound). This allows players to follow either action safely, especially important late in the shoe.

### Async Persistence Pattern

```typescript
const onPlay = async () => {
  const persistPromise = persistGameAndRound()  // Fire async
  Session.getInstance().table.startRound()      // Execute sync
  try {
    await persistPromise                        // Wait but don't block game
  } catch (error) {
    console.error('Failed to persist', error)   // Log but continue
  }
}
```

Game logic executes synchronously. Firebase writes are async and non-blocking. Network errors are logged but don't prevent gameplay.

## Mobile Viewport Considerations

The app uses `interactive-widget=resizes-visual` in the viewport meta tag to prevent the keyboard from cutting off the top of the app when input fields are focused (e.g., true count guess prompt at end of game).

## Common Tasks

### Adding a New Player Action

1. Add action to `PlayerAction` type in `/src/types/actions.ts`
2. Add to `Chair.ACTIONS` array in `/src/models/chair.ts`
3. Add to `PLAYER_ACTIONS` array in `/src/stores/playerActions.ts`
4. Implement validation logic in `Chair.validateAction()`
5. Implement execution logic in `Chair.act()`
6. Update strategy grids if action affects decision-making
7. Add UI button in `ActionSection.vue`

### Adding a New Game Rule

1. Add property to `Rules` class in `/src/models/rules.ts`
2. Add to `useGameStore` state and setters
3. Update `serializeRulesDoc()` in `/src/docs/game.ts`
4. Add to `GameTab.vue` settings UI
5. Update persistence in `readGameConfig()`/`writeGameConfig()` and `StoredGameConfig` type
6. Add to watch array in `useGameStore`
7. If affects strategy: update `determineCorrectAction()` logic

## Game Rules Implementation

### Insurance Rule

When `insuranceAllowed` is true and dealer shows Ace:
- Available only on first two cards before any other action
- Costs half of original bet
- Pays 2:1 if dealer has blackjack
- Special case: Player blackjack + insurance = "even money" (immediate 1:1 payout, hand complete)
- Implementation: `Hand.insuranceTaken`, `Hand.insuranceAmount`, `Hand.tookEvenMoney` flags
- Payout handled in `Chair.payout()` before regular hand payouts

### Hit After Split Aces Rule

When `hitAfterSplitAces` is false:
- After splitting aces, each hand receives one card and automatically stands
- No further actions allowed on either split ace hand
- Implementation in `Chair.act()` Split case checks flag and stands both hands

### Modifying Event Tracking

1. To track new property on existing model: Add to `props` array in `attachModelEventEmitter()` call
2. To track new model: Add `attachModelEventEmitter()` call in model file
3. To add custom event: Define constant and emit with `modelEvents.emit(modelCustomEvent(...))`
4. To listen in store: `modelEvents.on(modelPropertyEvent(...), handler)` + cleanup in `onScopeDispose()`

### Adding a New Strategy

1. Create strategy grid in `/src/models/strategy/` (see existing files for structure)
2. Export from `/src/models/strategy/index.ts`
3. Add to `BUILTIN_STRATEGIES` in `/src/stores/strategy.ts`
4. Strategy will auto-appear in UI selector

## File Organization

```
src/
├── models/          # Domain logic (pure TypeScript, no Vue)
│   ├── strategy/    # Strategy grids and matching algorithm
│   └── *.ts         # Session, Table, Dealer, Chair, Hand, Card, Rules
├── stores/          # Pinia stores (reactive UI state, Firebase side effects)
├── components/      # Vue components (presentation + smart containers)
├── views/           # Route-level components
├── lib/             # Utilities (mitt, modelEvents, Firebase, initialization)
├── docs/            # Firestore data structure definitions
├── types/           # TypeScript type definitions
└── assets/          # Styles, media queries

Key files:
- src/lib/mitt.ts                    # Event type system
- src/lib/modelEvents.ts             # Decorator attachment for auto-event emission
- src/models/session.ts              # Game singleton
- src/models/table.ts                # Game flow orchestration
- src/models/strategy/determineCorrectAction.ts  # Strategy matching algorithm
- src/stores/game.ts                 # Game lifecycle and persistence
- src/stores/playerActions.ts        # Action triggering and validation
```

## Color System

Colors are defined once in `/src/constants/colors.ts` and automatically available in both TypeScript and CSS:
- **TypeScript**: `import { COLORS } from '@/constants/colors'`
- **CSS**: `var(--color-background)`, `var(--primary-400)`, etc.
- Single source of truth, change colors in `colors.ts` only

## Technology Notes

- **Vue 3**: Composition API with `<script setup>` syntax
- **Pinia**: State management with `defineStore` and `ref`/`computed`
- **TypeScript**: Strict mode enabled, all types in `/src/types/`
- **Vuetify**: Material Design components (v-btn, v-text-field, etc.)
- **Vite**: Dev server and bundler, supports HMR
- **Firebase**: Auth, Firestore, Hosting

## Package Module Recommendations

When suggesting new dependencies, recommend packages but let the user install them. Useful packages for potential features:

- **Tree-shakeable icons**: `@mdi/js` (already in use - only bundles imported icons)
- **Date formatting**: `date-fns` or `dayjs` (if adding timestamp displays)
- **Charts/graphs**: `chart.js` or `echarts` (if adding performance analytics)
- **Testing**: `@testing-library/vue` (for component tests beyond basic Vitest)
- **State debugging**: `pinia-plugin-persistedstate` (if wanting automatic localStorage sync)
