AGENTS

Build / Run / Test
- Dev server: `npm run dev` (vite)
- Build: `npm run build` (TypeScript build + vite build)
- Preview production build: `npm run preview`
- Lint: `npm run lint` (uses `eslint`, config at `eslint.config.js`)
- Test (all): `npm run test` (Jest)
- Test watch: `npm run test:watch`
- Run a single test file: `npx jest path/to/file.test.ts -i` or `npm test -- -- ${"--testPathPattern=path/to/file.test.ts"}`
- Run a single test case by name: `npm test -- -t "test name"` or `npx jest -t "test name"`
- E2E: `npm run cypress` (open) or `npm run cypress:run` (headless)

Style & Conventions
- Formatting: use Prettier (installed). Run Prettier on save or via editor integration.
- Imports: group external packages first, then absolute/project imports, then relative imports; use named imports when possible.
- Types: prefer explicit return types on public functions/APIs; prefer `unknown` over `any` for unknown values and narrow before use.
- Naming: React components & types -> `PascalCase`; variables & functions -> `camelCase`; constants -> `UPPER_SNAKE`.
- Files: tests use `*.test.ts` / `*.test.tsx`. Put tests alongside modules where practical.
- Error handling: avoid empty `catch`; log and rethrow or wrap errors; use typed Error subclasses when useful.
- ESLint/TS: repo uses `eslint.config.js` and `tsconfig*.json`. Prefer type-aware linting for changes that touch types.

Tooling Notes
- No `.cursor` rules or Copilot instructions (`.github/copilot-instructions.md`) found in repo.
- Keep edits minimal and follow existing patterns in `src/` files.
