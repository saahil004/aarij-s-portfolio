# Deploying the web app to Vercel

The frontend (`apps/web`) is a standard Next.js app inside a pnpm workspace.

## One-time setup

1. In Vercel, **Add New → Project** and import `saahil004/aarij-s-portfolio`.
2. **Root Directory:** `apps/web`. Vercel detects Next.js and pnpm automatically.
   Leave the install and build commands at their defaults.
3. **Node.js version:** 24.x (Project Settings → General).
4. **Environment variables** (Production and Preview):

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://<your-domain>` (omit until the domain is connected; the `*.vercel.app` URL is used) |
   | `NEXT_PUBLIC_API_URL` | Leave empty until the Hono API is deployed (Phase 3) |

5. Deploy. Preview deployments are kept out of search results automatically
   (`robots.txt` disallows everything when `VERCEL_ENV=preview`).

## Custom domain

Add the domain under Project → Domains, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy so
canonical URLs, the sitemap and social cards use the real domain.

## Updating content before the admin panel exists

Edit the typed files in `apps/web/src/content/data/`, then push. `pnpm test` validates every
entry against the shared schemas, so a malformed edit fails CI instead of breaking the site.

To add or replace images, drop them in `source-content/`, register them in
`apps/web/scripts/media-sources.ts` and run `pnpm --filter web media:import`.

## Checks before a release

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
PW_CHANNEL=chrome pnpm --filter web e2e   # uses your installed Chrome
```
