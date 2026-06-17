# Plan: Tela de Login — Code Connect

## Context

`apps/web` is currently the untouched default Vite + React 19 scaffold (`App.tsx` is the
boilerplate counter demo, `index.css`/`App.css` are scaffold styles). We need to build the
**Login** screen shown in the reference print: a full-screen dark UI with a centered card
split into a **banner** (left) and a **login form** (right).

CLAUDE.md mandates **Atomic Design** + **Tailwind** + a `cn()` helper. The future **Register**
page shares the same layout shell but swaps the banner and form fields — so the layout and
sub-components must be built for reuse from day one.

**Confirmed decisions:**
- Styling: **Tailwind v4** with design tokens in an `@theme` block in `index.css` (user's
  explicit choice; supersedes CLAUDE.md's literal "tailwind.config.ts" wording).
- Routing: add **react-router** with `/login` and `/register` routes now.
- Form: **pure presentational** — static markup, no controlled state or submit logic yet.

## Assets (already in `apps/web/public/login-screen/`)
- Banner: `IMG_1 - Desktop.png` (logo "code connect" already baked into the image bottom).
- GitHub icon: `Vector.svg` (white octocat).
- Google icon: `Group 2083.svg` (multicolor "G").

## 1. Tooling setup

**Dependencies** (`apps/web/package.json`):
- dev: `tailwindcss@^4`, `@tailwindcss/vite@^4`
- prod: `react-router@^7`, `clsx`, `tailwind-merge`

**`vite.config.ts`** — add the Tailwind plugin:
```ts
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()] })
```

**`src/index.css`** — replace scaffold contents entirely with:
- `@import "tailwindcss";`
- An `@theme { ... }` block defining tokens (no hardcoded arbitrary values in components).
  Approximate values from the print:
  - `--color-bg: #0a0e16` (deep navy page background)
  - `--color-surface: #1b1f29` (card panel)
  - `--color-surface-input: #2b2f38` (input fields)
  - `--color-primary: #9ef07f` / `--color-primary-hover: #88e066` (green CTA)
  - `--color-primary-foreground: #0a0e16` (dark text on green button)
  - `--color-text: #f4f4f5`, `--color-text-muted: #9ca3af`
  - `--color-accent: #4ade80` (green links), `--color-border: #343844`
  - `--font-sans` token (system sans stack; matches scaffold)
- Minimal base layer: `body { margin:0 }`, dark `background`/`color` on root.

Delete `src/App.css` and its import (scaffold-only).

**`cn()` helper** — `src/lib/utils.ts`:
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

## 2. Atomic Design components (`src/components/`)

**atoms/**
- `Button.tsx` — green CTA, `variant` prop (default `primary`), forwards `className`/props,
  uses `cn()`. Renders children + optional trailing icon (the `→`).
- `Input.tsx` — dark themed text input; `type` prop (text/password); forwards ref + props.
- `Label.tsx` — field label styling.
- `Checkbox.tsx` — styled checkbox for "Lembrar-me".
- `TextLink.tsx` — styled link (wraps react-router `Link`, accepts `to`/`href`); used for
  "Esqueci a senha", "Crie seu cadastro!".

**molecules/**
- `FormField.tsx` — `Label` + `Input` pair (props: `label`, `name`, `type`, `placeholder`).
- `SocialButton.tsx` — icon (svg `src`) + caption below; used for GitHub & Google.
- `SocialLoginGroup.tsx` — "ou entre com outras contas" divider + row of two `SocialButton`s.

**organisms/**
- `AuthBanner.tsx` — left panel: rounded banner `<img>` (props: `src`, `alt`). Reusable —
  register page passes a different image.
- `LoginForm.tsx` — right panel: heading "Login", subtitle "Boas-vindas! Faça seu login.",
  two `FormField`s (Email ou usuário / Senha), remember-me + forgot-password row, green
  "Login →" `Button`, `SocialLoginGroup`, and "Ainda não tem conta? Crie seu cadastro!"
  footer link. `<form>` with `onSubmit={e => e.preventDefault()}` (no logic).

**templates/**
- `AuthLayout.tsx` — full-screen `--color-bg` background, centers a two-column rounded card.
  Props: `banner` (ReactNode) and `children` (form ReactNode) as slots. Responsive: banner
  hides/stacks on small screens. **This is the shared shell** for login + register.

**pages/** (`src/pages/`)
- `LoginPage.tsx` — `<AuthLayout banner={<AuthBanner src=".../IMG_1 - Desktop.png" />}>` +
  `<LoginForm />`.

## 3. Routing (`src/App.tsx`)
Replace boilerplate with `BrowserRouter` + `Routes`:
- `/login` → `LoginPage`
- `/register` → lightweight placeholder (route reserved; full page is future work)
- `/` → `<Navigate to="/login" replace />`

## Notes
- The faint chain-link brand watermarks in the print background have no provided asset →
  treated as optional/decorative; ship a flat `--color-bg` background (matches overall look).
  Can revisit if the user wants the watermark.
- All colors/spacing reference theme tokens via Tailwind utilities — no arbitrary `[#hex]`
  values in component markup, per CLAUDE.md.

## Verification
1. `pnpm install` at workspace root (picks up new deps).
2. `pnpm dev:web` → open the dev server, navigate to `/` (redirects to `/login`).
3. Visually confirm against the print: dark bg, centered card, banner left, form right with
   all fields, green button, divider, GitHub + Google buttons, register link. Check `/register`
   placeholder renders.
4. `cd apps/web && pnpm lint` → no errors.
