# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

pnpm monorepo with two apps:

- `apps/web` — React 19 + Vite 8 + TypeScript 6 frontend
- `apps/api` — NestJS 11 + TypeScript 5 backend (runs on port 3000 by default)

Each app has its own `package.json`, `tsconfig.json`, and independent git history (both are separate git repos nested inside the workspace root, which is not itself a git repo).

## Commands

Run from the workspace root unless noted.

```bash
# Dev servers
pnpm dev:web          # Vite HMR dev server for web
pnpm dev:api          # NestJS watch mode for api

# Build
pnpm build:web
pnpm build:api

# From apps/api only
pnpm test             # Jest unit tests (*.spec.ts in src/)
pnpm test:watch
pnpm test:e2e         # uses test/jest-e2e.json
pnpm lint             # ESLint + Prettier fix for api
pnpm format           # Prettier write for api

# From apps/web only
pnpm lint             # ESLint for web
```

To run a single test file in the API:
```bash
cd apps/api && pnpm test -- src/app.controller.spec.ts
```

## Architecture

**Frontend (`apps/web`)** is a bare Vite + React scaffold. Entry: `src/main.tsx` → `src/App.tsx`. No routing or state management libraries yet.

**Backend (`apps/api`)** is a bare NestJS scaffold. Entry: `src/main.ts` → `AppModule` → `AppController` / `AppService`. No database, auth, or additional modules yet.

The two apps are currently independent — no shared packages, no API proxy configured in Vite, and no shared TypeScript types.

## Frontend conventions

**Atomic Design** — organize components under `src/components/` in four layers:

- `atoms/` — smallest primitives (Button, Input, Icon, Badge)
- `molecules/` — compositions of atoms with a single responsibility (SearchField, FormGroup)
- `organisms/` — full UI sections composed of molecules/atoms (Header, ProductCard, Modal)
- `templates/` — page-level layout skeletons with slots, no real data
- Pages live in `src/pages/` and wire templates to real data/state.

**Tailwind CSS** — utility-first styling; no separate CSS files per component. Use `cn()` (or `clsx`) to conditionally join class names. Design tokens (colors, spacing, typography) must be defined centrally, not hardcoded as arbitrary values. With Tailwind v4, tokens are declared in the CSS entry file under `@theme {}`; with Tailwind v3, they go in `tailwind.config.ts`.

## Backend conventions

**Strict REST** — follow these rules in every controller:

- Resources are nouns, always plural: `/users`, `/posts/:id/comments`
- HTTP verbs carry the action: `GET` read, `POST` create, `PUT`/`PATCH` update, `DELETE` remove
- Status codes must be accurate: `201` on create, `204` on delete, `404` when a resource is not found, `422` for validation errors (not `400`)
- Responses wrap data in a consistent envelope: `{ data: T }` for single resources, `{ data: T[], meta: { total, page, limit } }` for collections
- Versioning via URL prefix: `/v1/...`
- Controllers stay thin — business logic lives in services, database logic in repositories

## Version control

Use **Conventional Commits** for every commit message:

```
<type>(<scope>): <short summary>

[optional body]
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`, `ci`  
Scope: app name or module (e.g. `web`, `api`, `auth`, `users`)  
Breaking changes: append `!` after the type/scope and add a `BREAKING CHANGE:` footer.

Examples:
```
feat(api): add JWT authentication to users module
fix(web): resolve hydration mismatch on ProductCard
chore(api): upgrade NestJS to v11.1
```
