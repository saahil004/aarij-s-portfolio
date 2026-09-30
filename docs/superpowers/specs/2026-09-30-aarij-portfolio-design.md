# Aarij Portfolio — Design Spec

**Date:** 2026-09-30
**Status:** Draft for review

## 1. Goal

A premium single-page portfolio for **Aarij, Digital Marketing Specialist** (SEO-led: SEO, lead generation, analytics, CRO, PPC, content, social). Primary audience: recruiters hiring in the UAE, Malaysia and internationally; secondary: businesses looking for growth help. Every section must answer *"What can this person do for our business?"* and connect activity to traffic → leads → customers → growth.

The site must itself be an SEO showcase: fast, static, well-structured, fully editable by Aarij through an admin CMS, and backed by a blog for content marketing.

Source material: `source-content/` (extracted from `Aarij Portfolio.zip`) — designer brief, evidence screenshots (Search Console, GA4, Ahrefs, HubSpot, PageSpeed, PPC, social), 18 brand logos, 14 tool logos, 18 Semrush authority previews.

## 2. Stack & hosting

| Layer | Choice |
|---|---|
| Frontend + admin | Next.js (latest stable, App Router, TypeScript) on **Vercel** |
| API | **Hono** on **Cloudflare Workers** |
| DB / Auth / Storage | **Supabase** (Postgres + RLS, Auth, Storage) |
| Email | **Brevo** transactional API (lead notification to Aarij only) |
| Bot protection | Cloudflare **Turnstile** |
| Motion | **GSAP + ScrollTrigger** (scroll choreography), **Motion** (component interactions), **Lenis** (smooth scroll) |
| Blog editor | **Tiptap** (rich text + markdown shortcuts) |
| Repo | pnpm + Turborepo monorepo |
| Tests | Vitest (shared, API), Playwright (e2e) |

```
apps/web          Next.js — public site + /admin
apps/api          Hono Worker — all writes, all admin reads, cron
packages/shared   zod schemas, TS types, constants (used by web + api)
supabase/         migrations, RLS policies, seed script
source-content/   original assets from Aarij (not deployed)
```

## 3. Visual system

Exact recreation of the **Meeko** Framer template layout (including the hero image shape), recolored to the brand palette.

**Tokens** (single source in `apps/web` CSS variables; hex values replaceable if Aarij supplies exact brand codes):

| Token | Value | Use |
|---|---|---|
| `--ink` | `#111111` | text, 1px borders, outline buttons |
| `--night` | `#141414` | dark sections (case studies, final CTA/footer) |
| `--grey-600` | `#5B6170` | body copy |
| `--grey-100` | `#F2F3F5` | blog section, neutral cards |
| `--white` | `#FFFFFF` | base |
| `--blue` | `#1E5EFF` | accents, links, focus rings |
| `--blue-50` | `#EAF2FF` | hero panel grid, testimonials grid, pills |
| `--sky` | `#CFE0FF` | process card, pills |
| `--yellow` | `#FFC83D` | hand-drawn marks, rotating badge |
| `--yellow-100` | `#FFE38A` | brands logo strip |
| `--yellow-50` | `#FFF6D6` | ticker strip, pills |

**Style rules (from Meeko):** large tight-tracked grotesk headlines (Instrument Sans or Onest via `next/font`), small body copy, a handwritten accent font for annotations; 1px `--ink` borders; ~16px card radius; pill tags with tinted fill + ink outline; outlined numerals for stats; faint square grid backgrounds on hero/testimonial panels; hand-drawn pill around a key headline word; rotating circular "Open to opportunities · Let's talk" badge fixed bottom-right.

**Hero image shape:** three vertically stacked, scalloped lobes with ink outline, implemented as an SVG `clipPath` + stroke overlay so any uploaded portrait adopts it; two floating sticker tags (editable text).

## 4. Public site

### 4.1 Routes

| Route | Purpose |
|---|---|
| `/` | Single-page portfolio (sections below) |
| `/case-studies/[slug]` | Full case study ("mini business report") |
| `/blog`, `/blog/[slug]`, `/blog/category/[slug]` | Blog |
| `/privacy` | Privacy notice (form collects personal data) |
| `/rss.xml`, `/sitemap.xml`, `/robots.txt` | Generated |
| `opengraph-image` per route | Generated OG images |

### 4.2 Home sections (brief → Meeko pattern → motion)

| # | Section | Pattern | Motion |
|---|---|---|---|
| 1 | Nav (logo, anchor links, socials) | Meeko top bar | hide on scroll down / reveal on up |
| 2 | Hero — "Driving traffic, leads & business **growth**"; CTAs *View My Results*, *Download Resume* | split; portrait in scalloped mask on blue-grid panel with stickers | line-by-line headline reveal, pill stroke draws, stickers float |
| 3 | Skills ticker | yellow marquee strip | infinite marquee, velocity follows scroll |
| 4 | "I don't just do marketing. I build growth." + funnel Traffic → Engagement → Leads → Customers → Growth | two-column intro + funnel strip | pinned; funnel stages fill with scroll |
| 5 | Expertise (6 areas) | "Value-focused work" bordered cards with pills | staggered reveal |
| 6 | Results (real numbers only) | "My numbers say it all" outlined-number pills | count-up on enter |
| 7 | Featured case studies (4–6) | dark 2-col screenshot grid → detail pages | parallax, cursor-follow "View case study" pill |
| 8 | Brands worked with | yellow logo strip | marquee |
| 9 | Process: Research → Strategy → Execute → Measure → Optimize | stacked numbered cards (01)–(05) | pinned sticky stacking |
| 10 | 90-day growth framework + "What I'd do for your business" (employer-focused outcomes list) | 3-phase timeline + outcome checklist | scroll-drawn line |
| 11 | Marketing tech stack | category pills + logo grid | grayscale → color hover |
| 12 | Before & after | growth-snapshot cards (real chart screenshots with before/after annotations); drag-compare slider added once genuine before/after image pairs exist | scroll-scrub reveal |
| 13 | Industries + certifications | pill clouds | stagger |
| 14 | Testimonials | blue-grid carousel | swipe carousel; **section hidden while empty** |
| 15 | About | short story + photo | text reveal |
| 16 | Blog | featured + 3-list | hover lift, cursor-follow "View more" |
| 17 | "Let's grow something together." + contact form | dark CTA footer | hand-drawn arrow draws, form expands |

Every section is toggleable and orderable from the admin; sections with no content render nothing.

### 4.3 Case study page

Fixed template from the brief: Project/Client · Industry · Challenge · Strategy · What I Executed · Before vs After · Results & KPIs · Business Impact · Key Takeaway. KPI blocks, framed screenshots, optional charts. `Article` + `BreadcrumbList` JSON-LD.

### 4.4 Contact form (adaptive)

Intent selector: **Hiring** (company, role, location) · **Business project** (website, services multi-select, budget range) · **Other**. Common: name, email, message, consent checkbox. Hidden honeypot field; render timestamp; Turnstile (invisible/managed). Inline success/error states; no page reload.

### 4.5 Motion rules

- GSAP owns scroll-driven animation (ScrollTrigger synced to Lenis via ticker); Motion owns hover/press/presence/carousel. The two never animate the same element.
- Animate `transform`/`opacity` only; no layout-thrashing properties.
- All GSAP in `useGSAP` with context cleanup; ScrollTriggers refreshed after fonts/images load.
- `prefers-reduced-motion`: Lenis disabled, pins and scrubs disabled, content shown in final state.
- Motion is progressive enhancement: the page is fully readable with JS disabled.
- Budget: LCP < 2.0s, CLS < 0.05, INP < 200ms on mid-range mobile; Lighthouse ≥ 95 in all categories.

### 4.6 SEO

`generateMetadata` from `page_seo` + `site_settings`; canonical URLs; JSON-LD `Person` + `ProfessionalService` (home), `Article`/`BlogPosting`, `BreadcrumbList`, `FAQPage` where applicable; generated sitemap (home, case studies, posts, categories) and RSS; OG images via `next/og`; `next/image` with required alt text; admin-managed redirects (301/302) applied in Next middleware/proxy from a cached map.

## 5. Data model (Supabase)

All tables: `id uuid pk`, `created_at`, `updated_at` (trigger). Content tables with visibility use `is_published bool` and `sort_order int`.

| Table | Key columns |
|---|---|
| `site_settings` (single row) | name, headline_name, email, phone, location, socials jsonb, resume_path, default_seo jsonb, person_jsonld jsonb |
| `sections` | key (unique: hero, ticker, funnel, expertise, results, process, framework, before_after, about, cta, …), content jsonb (validated by per-key zod schema), is_visible, sort_order |
| `page_seo` | route (unique), title, description, og_image_path, canonical, noindex, jsonld jsonb |
| `case_studies` | slug, title, client, industry, summary, cover_path, challenge, strategy, executed, before_after jsonb, kpis jsonb, impact, takeaway, gallery jsonb, featured, is_published, sort_order, seo jsonb |
| `metrics` | label, value numeric, prefix, suffix, source_note, sort_order |
| `brands` | name, logo_path, url, sort_order |
| `tools` | name, category (seo/analytics/crm/platform/ads/ai/design), logo_path, sort_order |
| `industries`, `certifications` | name, (issuer, year, credential_url, badge_path), sort_order |
| `testimonials` | quote, author, role, company, avatar_path, rating, is_published, sort_order |
| `categories`, `tags` | slug, name, description |
| `posts` | slug, title, excerpt, content_json jsonb (Tiptap), content_html text (sanitized, rendered on save), cover_path, cover_alt, category_id, status (draft/scheduled/published), publish_at, reading_minutes, target_keyword, seo jsonb, author |
| `post_tags` | post_id, tag_id |
| `redirects` | source (unique), destination, status_code (301/302), hits |
| `leads` | intent, name, email, company, role, location, website, services text[], budget, message, status (new/contacted/won/lost/spam), notes, ip_hash, user_agent, referrer, utm jsonb |
| `admins` | email (unique) |

**Storage:** bucket `media` (public read), paths `brands/`, `tools/`, `case-studies/`, `posts/`, `portrait/`, `resume/`.

**RLS:**
- `anon`: `SELECT` only on published/visible content tables, `site_settings`, `page_seo`, `redirects`. No access at all to `leads` or `admins`.
- `authenticated`: no direct table access (admin goes through the API).
- All writes via the Worker using the service role key.

## 6. API (Hono on Workers)

Base `https://api.<domain>/v1`.

**Public**
- `GET /health`
- `POST /leads`

**Admin** (middleware: verify Supabase JWT against project JWKS with `jose`, then check email ∈ `admins`)
- `GET /admin/stats` — lead counts by status/intent, recent leads
- `GET /admin/leads` (search, filter, paginate), `GET /admin/leads/:id`, `PATCH /admin/leads/:id` (status, notes), `GET /admin/leads/export.csv`
- `GET|PUT /admin/sections/:key` — body validated by that section's schema
- `GET|POST /admin/:collection`, `PATCH|DELETE /admin/:collection/:id`, `POST /admin/:collection/reorder` — collection ∈ fixed allowlist (case_studies, metrics, brands, tools, industries, certifications, testimonials, categories, tags, redirects)
- `GET|POST /admin/posts`, `GET|PATCH|DELETE /admin/posts/:id`, `POST /admin/posts/:id/publish|unpublish`
- `GET|PUT /admin/seo/:route`, `GET|PUT /admin/settings`
- `POST /admin/media/upload-url` (signed upload URL; mime + size allowlist), `DELETE /admin/media`

**After every successful write:** the Worker calls `POST https://<site>/api/revalidate` with an HMAC-signed body listing cache tags (`settings`, `section:<key>`, `case-studies`, `case-study:<slug>`, `posts`, `post:<slug>`, `seo`, `redirects`). Next.js calls `revalidateTag` for each.

**Cron trigger (every 5 min):** publish due `scheduled` posts → revalidate.

**Errors:** uniform `{ error: { code, message, fields? } }`; zod errors mapped to field errors; no stack traces in responses; structured logs via Workers Logs.

## 7. Lead form security

Request pipeline for `POST /v1/leads`, in order:

1. **CORS** — allow only configured site origins.
2. **Body size limit** — 16 KB.
3. **Burst rate limit** — Workers Rate Limiting binding, 5 requests / 60s per IP (binding periods are limited to 10s/60s).
4. **Schema validation** — shared zod schema: lengths, email format, enum intents/budgets, trimming, control-char stripping.
5. **Honeypot** filled or submit faster than 3s after render → respond `201` silently, store nothing.
6. **Turnstile** — server-side Siteverify with the token and IP; failure → `403`.
7. **Quota** — by salted SHA-256 IP hash and by email: max 3 leads / 10 min and 10 / 24h, counted from `leads`; excess → `429` with `Retry-After`.
8. **Insert** the lead (service role).
9. **Respond** `201`.
10. **Notify** — `ctx.waitUntil` sends the Brevo email to Aarij (reply-to = lead email, all fields HTML-escaped); failures are logged and never affect the response.

Raw IPs are never stored.

## 8. Admin panel (`/admin` in Next.js)

- **Auth:** Supabase Auth email magic link; public sign-ups disabled; login allowed only for emails in `admins` (checked by the API; Next middleware guards `/admin` routes for UX). Session via `@supabase/ssr` cookies.
- **Dashboard:** lead counts, latest leads, quick links.
- **Leads:** table with search/filter (status, intent, date), detail drawer, status + notes, CSV export.
- **Homepage sections:** per-section forms generated from the shared zod schemas; visibility toggle; drag reorder.
- **Collections:** CRUD + drag reorder for case studies, metrics, brands, tools, industries, certifications, testimonials.
- **Blog:** post list; Tiptap editor (headings, lists, links, images with required alt, code, quotes, tables, embeds; markdown shortcuts); cover image; category/tags; draft/schedule/publish; SEO panel with title/description length meters, target keyword checklist (in title, H1, slug, first paragraph, meta description, image alt), SERP + social previews.
- **SEO:** per-route meta/OG/canonical/noindex/JSON-LD overrides.
- **Redirects:** manager; slug changes on posts/case studies auto-create a 301.
- **Media:** library over the storage bucket; upload via signed URLs.
- **Settings:** contact info, socials, resume PDF upload, portrait upload.
- **Preview:** Next draft mode so unpublished posts/case studies can be viewed on the real site.

## 9. Security & platform hardening

- **Secrets:** Supabase service role key, Turnstile secret, Brevo key, revalidate HMAC secret, IP-hash salt — Worker secrets only. Web gets only the Supabase URL + anon key, the Turnstile site key and the API URL.
- **Next.js headers:** CSP (allow self, Supabase storage, `challenges.cloudflare.com`, analytics), HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors 'none'`.
- **Blog HTML:** rendered from Tiptap JSON and sanitized with a tag/attribute allowlist on save; the site only ever renders the sanitized `content_html`.
- **Uploads:** mime/size allowlist (JPEG, PNG, WebP, AVIF, PDF for resume); SVG rejected (XSS vector) — existing logos are raster.
- **Dependencies:** lockfile, Dependabot, CI audit.
- **Analytics:** GA4 + Microsoft Clarity (Aarij's own stack), loaded after consent where required.

## 10. Environments & CI

- **Local:** Supabase CLI (Docker), `wrangler dev`, `next dev`.
- **Production:** Vercel (web), Workers (api), Supabase project. Preview deployments on Vercel use a Worker `preview` environment.
- **CI (GitHub Actions):** typecheck, lint, unit tests, build; Playwright against preview; migrations applied via Supabase CLI on main.

## 11. Testing

- **shared:** schema tests (valid/invalid fixtures per section, lead intents).
- **api:** Vitest with `app.request()` — the lead pipeline (each rejection path, quota, honeypot, Turnstile mocked, email via `waitUntil` mocked), admin auth (missing/invalid/non-admin token), collection allowlist, revalidation call.
- **web:** Playwright — home renders all visible sections, reduced-motion mode, contact form success + validation, admin login → edit section → change visible on site, post draft → publish → appears in blog/sitemap/RSS.
- **Performance:** Lighthouse CI budget from §4.5.

## 12. Delivery phases

**Frontend first.** The public site is built before the backend. It reads all content through a content layer (`apps/web/src/content/`) whose functions (`getSiteSettings()`, `getSection(key)`, `getCaseStudies()`, `getPosts()`, …) return types from `packages/shared` shaped exactly like the §5 tables. Until Phase 4 these functions return typed local data built from `source-content/`; Phase 4 swaps their implementation to Supabase with no component changes. Assets from `source-content/` are optimized and copied into `apps/web/public/media/` for now and moved to Supabase Storage in Phase 4.

Each phase ends deployable and verifiable; each gets its own implementation plan.

| Phase | Scope | Done when |
|---|---|---|
| **1. Foundation + public site** | Monorepo, TS strict, lint/format, CI; `packages/shared` types + zod schemas; content layer with local data from `source-content/`; design tokens, fonts; all 17 sections pixel-matched to Meeko in brand colors; scalloped portrait; case study pages; blog list/post pages from local sample data; contact form UI with client validation (submit stubbed behind an interface); SEO (metadata, JSON-LD, sitemap, robots, OG); privacy page | Site deployed on Vercel with real content, responsive 360px→1440px, Lighthouse ≥ 95 |
| **2. Motion** | Lenis, GSAP ScrollTrigger sequences, Motion interactions, reduced-motion path, perf check | All animations from §4.2; CWV budget still met |
| **3. API core** | Hono Worker, error model, `POST /leads` full security pipeline, Brevo notify, Turnstile wired into the form, admin auth middleware, revalidation client, health | API tests green; a real lead from the live form lands in Supabase and emails Aarij |
| **4. Data layer** | Supabase migrations for all tables, RLS, storage bucket, seed from the local content, content layer swapped to Supabase, `/api/revalidate` | Site renders identically from Supabase; RLS tests prove anon can't read leads/drafts |
| **5. Admin: leads + content** | Admin auth, dashboard, leads, sections editor, collections CRUD + reorder, settings, SEO editor, media library, draft preview, on-save revalidation | Aarij can log in, manage leads, edit any homepage content and see it live in seconds |
| **6. Blog CMS** | Posts/categories/tags API, Tiptap editor with SEO panel, scheduling cron, RSS, redirects manager | Post drafted → scheduled → auto-published → in sitemap/RSS |
| **7. Hardening & launch** | Security headers/CSP, Playwright suite in CI, Lighthouse CI, analytics + consent, Brevo domain auth (SPF/DKIM), custom domains, runbook README | Production launch checklist complete |

## 13. Content needed from Aarij

The folder has evidence and logos but not these. Seeded as clearly marked placeholders (never invented numbers), editable in the admin:

- Portrait photo (hero depends on it) and a second photo for About
- Resume PDF
- Contact email, phone (optional), location, LinkedIn/other socials
- Case study narratives for the 4–6 featured projects; candidates from the evidence: Livebits (SEO, rankings, GA4, backlinks), Trendy Jacket (PPC, influencer), Timezone (social), Mussarat Lingerie (GA4), Vanquishe (rankings), Evoltciti (page speed)
- Confirmation of every metric pulled from screenshots
- Testimonials (with permission), certifications, about text
- Exact brand hex codes (optional) and domain name

**Content integrity rules**

- `source-content/` is never committed (raw client evidence). Only optimized, reviewed images are copied into the app.
- `Leads/HUBSPOT LEADS DASHBOARD.png` is **excluded**: it shows real contacts' names, emails and phone numbers.
- The before/after slider only renders genuine before/after pairs; with none, the section stays hidden. Growth-over-time charts are shown inside case studies instead.
- Metrics carry an internal `sourceNote` naming the screenshot they came from, so Aarij can verify each one.
- Blog sample posts are drafts: visible in development, never in production.

## 14. Out of scope

Multiple authors/roles beyond an admin allowlist; auto-reply emails to leads; comments on blog; multi-language; newsletter.
