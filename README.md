# Aarij — Digital Marketing Specialist Portfolio

Single-page portfolio with case studies and a blog, built to be edited through an admin CMS.

| Layer | Stack |
|---|---|
| Web (`apps/web`) | Next.js App Router, Tailwind CSS, GSAP + Lenis + Motion — deployed on Vercel |
| API (`apps/api`, Phase 3) | Hono on Cloudflare Workers |
| Data (Phase 4) | Supabase (Postgres, Auth, Storage) |
| Email (Phase 3) | Brevo |

Design spec: [`docs/superpowers/specs/2026-09-30-aarij-portfolio-design.md`](docs/superpowers/specs/2026-09-30-aarij-portfolio-design.md)

## Getting started

Requires Node 24+ and pnpm 12+.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `pnpm dev` | Run the web app in development (draft blog posts visible) |
| `pnpm build` | Production build of every app |
| `pnpm lint` | Biome lint + format check |
| `pnpm format` | Apply Biome fixes |
| `pnpm typecheck` | TypeScript across the workspace |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm e2e` | Playwright end-to-end tests against a production build |
| `pnpm --filter web media:import` | Re-optimize images from `source-content/` into `apps/web/public/media` |

## Content

Until the Supabase phase, content lives in typed files under `apps/web/src/content/data/`.
Everything Aarij still needs to supply or confirm is tracked in [`docs/content-todo.md`](docs/content-todo.md).

Raw client evidence (`source-content/`) is intentionally not committed.
