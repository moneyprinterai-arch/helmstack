# Helmstack

The control deck for your AI agent fleet. Connect any agent runtime, observe what they're doing, approve what matters, and ship outcomes — not prompts.

## What's in here

- **Marketing site** (`/`, `/pricing`, `/docs`, `/changelog`, `/login`, `/signup`)
  Client-facing pages that explain Helmstack and convert visitors into trial users.

- **The app** (`/app/**`)
  The product itself — fleet overview, agents, connectors, activity log, approvals, settings. This is what customers see after they sign in.

## Tech

- Next.js 15 (App Router) + React 19
- Tailwind v4 with OKLCH-derived design tokens (single-hue theming)
- TypeScript everywhere
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Theme

The entire palette derives from a single hue token (`--brand-hue`) using OKLCH math. Change one number in [app/globals.css](app/globals.css) and the whole product re-themes — backgrounds, surfaces, borders, accents, all of it.
