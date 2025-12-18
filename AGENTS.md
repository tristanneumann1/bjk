# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the Vue 3 Blackjack project (components, stores, models, lib utilities).
- There are 2 project interfaces, A CLI game that is run from the `src/index.ts`, and a web interface starting with `src/main.ts`.
- The core game logic lives under `src/models/`, and UI elements are split between UI elements in `src/components/` and state management in Pinia stores under `src/stores/`.
- Tests sit beside the code in `src/__tests__/` using Vitest + Vue Test Utils. Static assets are in `public/` (served as-is) and `kenney_playing-cards-pack/` for art references.
- Build outputs land in `dist/`; avoid editing generated files. Shared configs (Vite, TS, eslint) stay at repo root.

## Build, Test, and Development Commands
- `npm run dev` — start the Vite dev server with hot reload at http://localhost:5173.
- `npm run build` — type-check (`vue-tsc`) and bundle for production (Vite). Artifacts go to `dist/`.
- `npm run preview` — serve the latest build to verify production bundles.
- `npm run test:unit` — execute Vitest specs under `src/__tests__/`.
- `npm run lint` / `npm run format` — enforce ESLint + Prettier; run before committing when touching JS/TS/Vue files.

## Coding Style & Naming Conventions
- Use TypeScript + `<script setup>` in Vue SFCs; favor explicit typing and descriptive computed names (`resolvedHandValue`).
- Follow Prettier defaults (2-space indent, single quotes in TS, semicolons off) and ESLint rules defined in `eslint.config.ts`.
- Components: `PascalCase.vue`; composables/utilities: `camelCase.ts`; constants uppercase snake (`CARD_SCALE_LARGE`).

## Testing Guidelines`
- Write Vitest specs near the code, e.g., `src/__tests__/hand.spec.ts`. Name files `*.spec.ts`.
- Cover new game rules, state transitions, and rendering conditions. Mock Pinia stores or Session models when isolating logic.
- Run `npm run test:unit` locally; add regression tests for bug fixes.
