# Phase 1 — Foundation + Public Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A deployable, statically generated Next.js portfolio for Aarij that recreates the Meeko layout in the brand palette, reads all content through a typed content layer backed by local data from `source-content/`, and ships complete SEO plumbing.

**Architecture:** pnpm + Turborepo monorepo. `packages/shared` holds zod schemas and inferred types (consumed as TS source). `apps/web` is a Next.js App Router app; every page reads content only through `apps/web/src/content/index.ts` getters, so Phase 4 can swap local data for Supabase without touching components. Images from `source-content/` are optimized by a sharp script into `apps/web/public/media/` with a generated manifest (dimensions + detected tile background).

**Tech Stack:** Node 24, pnpm 12, Turborepo 2.11, TypeScript 6.0, Next.js 16.3, React 19.3, Tailwind CSS 4.3, zod 4, Biome 2.5, Vitest 5, Testing Library, Playwright 1.63, sharp 0.35.

**Spec:** `docs/superpowers/specs/2026-09-30-aarij-portfolio-design.md`

## Global Constraints

- Colors come only from the tokens in spec §3 (`--ink #111111`, `--night #141414`, `--grey-600 #5B6170`, `--grey-100 #F2F3F5`, `--white #FFFFFF`, `--blue #1E5EFF`, `--blue-50 #EAF2FF`, `--sky #CFE0FF`, `--yellow #FFC83D`, `--yellow-100 #FFE38A`, `--yellow-50 #FFF6D6`).
- Real, verifiable content only; every metric has a `sourceNote`. No invented testimonials, certifications or numbers.
- `source-content/` is never committed; `Leads/HUBSPOT LEADS DASHBOARD.png` is never imported (PII).
- Sections with no content render nothing. Blog sample posts are drafts (dev only).
- Every image has meaningful alt text; decorative SVGs are `aria-hidden`.
- Layout must work 360px → 1440px+ with no horizontal scroll; 16px minimum side gutter.
- No animation libraries in Phase 1 (GSAP/Lenis/Motion arrive in Phase 2); only CSS for the rotating badge, guarded by `prefers-reduced-motion`.
- Lighthouse ≥ 95 (performance, accessibility, best practices, SEO) on the production build.

---

### Task 1: Workspace scaffold

**Files:** `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `biome.json`, `tsconfig.base.json`, `.gitignore`, `.editorconfig`, `.nvmrc`, `README.md`

- [ ] `git init`, `.gitignore` covering `node_modules`, `.next`, `.turbo`, `coverage`, `playwright-report`, `test-results`, `.env*` (except `.env.example`), `source-content/`.
- [ ] Root scripts: `dev`, `build`, `lint` (`biome check .`), `format`, `typecheck`, `test`, `e2e` → turbo.
- [ ] `pnpm install`; `pnpm lint` passes on the empty workspace.
- [ ] Commit `chore: scaffold monorepo`.

### Task 2: Shared schemas (`packages/shared`)

**Files:** `packages/shared/src/{media,settings,sections,collections,lead,index}.ts`, `packages/shared/test/*.test.ts`

**Produces:**
- `mediaRefSchema` / `MediaRef = { path: string; alt: string }`
- `siteSettingsSchema` / `SiteSettings`
- `sectionSchemas` record keyed by `SectionKey` (`hero, ticker, funnel, expertise, results, caseStudies, brands, process, framework, tools, beforeAfter, industries, testimonials, about, blog, cta`), `SectionContent<K>`, `SectionRecord` (discriminated on `key`)
- `caseStudySchema`, `metricSchema`, `brandSchema`, `toolSchema`, `toolCategories`, `industrySchema`, `certificationSchema`, `testimonialSchema`, `categorySchema`, `postSchema` + types
- `leadInputSchema` (discriminated on `intent`: `hiring | project | other`), `leadSubmissionSchema` (`{ lead, meta: { hp, elapsedMs, turnstileToken? } }`), `leadIntents`, `serviceOptions`, `budgetRanges`, label maps

**Tests (write first, watch fail):**
- media: rejects empty alt.
- sections: every key in `sectionKeys` has a schema; hero rejects >2 stickers; `parseSection('ticker', …)` returns typed content.
- collections: case study slug must be kebab-case; metric requires `sourceNote`; post status enum.
- lead: hiring requires company; project requires ≥1 service and a budget; `website` normalizes `example.com` → `https://example.com/`; rejects invalid website; trims name; strips control characters from message; `consent` must be `true`; unknown intent rejected.

- [ ] Commit `feat(shared): content and lead schemas`.

### Task 3: Web app scaffold

**Files:** `apps/web/{package.json,next.config.ts,tsconfig.json,postcss.config.mjs,vitest.config.ts,playwright.config.ts}`, `apps/web/src/app/{layout.tsx,page.tsx,globals.css}`

- [ ] Next 16 App Router with `transpilePackages: ['@aarij/shared']`, AVIF/WebP images.
- [ ] Tailwind 4 `@theme` with the token palette, font variables (Instrument Sans via `next/font/google` as `--font-sans`, Caveat as `--font-hand`), grid-background utility, container utility.
- [ ] Vitest (jsdom for components, node for logic), Playwright (chromium, webServer on the production build, port 3100).
- [ ] Verify: `pnpm --filter web build` succeeds.
- [ ] Commit `chore(web): next app scaffold with tokens`.

### Task 4: Media pipeline

**Files:** `apps/web/scripts/{media-sources.ts,import-media.ts}`, `apps/web/src/content/{media.ts,media-manifest.json}`, `apps/web/src/content/media.test.ts`

**Produces:** `media(path: string): MediaInfo` where `MediaInfo = { src: string; width: number; height: number; bg: string | null }`; `bg` is the hex of opaque corner pixels (null when transparent).

- [ ] `media-sources.ts`: explicit list `{ from, to, kind: 'logo' | 'shot' }` (logos → max 480px wide, shots → max 1600px), WebP q82. HubSpot screenshot absent; `6.jpg` (duplicate Arena logo) absent.
- [ ] Tests: `media()` returns `/media/<path>` with manifest dims; throws for unknown path; `cornerBackground()` returns null for transparent corners and hex for opaque.
- [ ] Run `pnpm --filter web media:import`; commit generated WebPs + manifest.
- [ ] Commit `feat(web): media import pipeline`.

### Task 5: Content layer with real local data

**Files:** `apps/web/src/content/data/*.ts`, `apps/web/src/content/index.ts`, `apps/web/src/content/content.test.ts`, `docs/content-todo.md`

**Produces (all async):** `getSiteSettings()`, `getSections(): SectionRecord[]` (visible, sorted), `getSection(key)`, `getMetrics()`, `getCaseStudies({ featuredOnly? })`, `getCaseStudy(slug)`, `getBrands()`, `getTools()`, `getIndustries()`, `getCertifications()`, `getTestimonials()`, `getPosts({ categorySlug?, limit? })`, `getPost(slug)`, `getCategories()`, `getCategory(slug)`.

**Tests:** all local data parses with the shared schemas; every `MediaRef.path` exists in the manifest; `getSections` excludes hidden and sorts; `getCaseStudies` excludes unpublished; `getPosts` hides drafts when `showDrafts` is false and sorts newest first; `getTestimonials()` returns only published.

- [ ] Case studies (evidence-based): LiveBits, Vanquishe, Trendy Jacket, Mussarat Lingerie, Archentire, TimeZone.
- [ ] Metrics from GSC/Ahrefs/GA4 screenshots with `sourceNote`.
- [ ] `docs/content-todo.md` lists what Aarij must supply/confirm.
- [ ] Commit `feat(web): typed content layer with real content`.

### Task 6: UI primitives

**Files:** `apps/web/src/components/ui/*.tsx`, `apps/web/src/lib/cn.ts`

**Produces:** `Container`, `Button` (`variant: 'outline' | 'solid' | 'light'`, renders `<a>` when `href`), `Pill` (`tone: 'blue' | 'yellow' | 'grey' | 'sky' | 'white'`), `SectionHeading` (title + intro two-column Meeko layout), `HandPill` (hand-drawn highlighted word), `ScallopFrame` (portrait in scalloped clip-path with ink outline, initial-letter fallback), `LogoTile` (logo on detected background), `OutlinedStat`, `Icon` set, `GridBackground`.

**Tests:** `ScallopFrame` renders fallback initial when no image and an `<img>` with alt when given; `Button` renders anchor with href.

- [ ] Commit `feat(web): ui primitives`.

### Task 7: Page chrome + section registry

**Files:** `apps/web/src/components/layout/{Nav,MobileMenu,RotatingBadge,SkipLink,Footer}.tsx`, `apps/web/src/components/sections/registry.tsx`, `apps/web/src/app/page.tsx`

**Produces:** `renderSection(record: SectionRecord, data: HomeData)`; `HomeData` bundles collections fetched once in `page.tsx`.

- [ ] Nav: logo, anchor links, socials when present; mobile menu button with `aria-expanded`, Escape closes.
- [ ] Rotating badge links to `#contact`.
- [ ] Commit `feat(web): page chrome and section registry`.

### Task 8–10: Sections

**Files:** `apps/web/src/components/sections/*.tsx`

- [ ] Hero (split, blue grid panel, scallop portrait, stickers, HandPill, CTAs; resume CTA only if resume exists), Ticker, Funnel, Expertise.
- [ ] Results (outlined stat pills), CaseStudies (dark 2-col staggered grid → detail pages), Brands (yellow strip of logo tiles), Process (numbered stacked cards).
- [ ] Framework + outcomes, Tools (grouped logo tiles + text pills), BeforeAfter (growth snapshot cards with before/after chips), Industries + Certifications, Testimonials (hidden when empty), About, BlogPreview (featured + list; hidden when no posts).
- [ ] Each section: `<section id aria-labelledby>`; renders `null` when empty.
- [ ] Commits per group.

### Task 11: Contact CTA + adaptive form

**Files:** `apps/web/src/components/contact/{ContactSection,ContactForm,lead-client,form-state}.ts(x)` + tests

**Produces:** `submitLead(submission: LeadSubmission): Promise<{ ok: true } | { ok: false; kind: 'validation' | 'rate_limited' | 'unavailable' | 'network'; fieldErrors?: Record<string, string> }>`; POSTs to `${NEXT_PUBLIC_API_URL}/v1/leads` when configured, otherwise returns `unavailable`.

**Tests:** switching intent shows the matching fields; submitting empty shows field errors from the shared schema; honeypot value and elapsed time are sent in `meta`; `unavailable` renders the email fallback; success renders the thank-you state; `submitLead` maps 400/429/5xx.

- [ ] Commit `feat(web): adaptive contact form`.

### Task 12: Case study page

**Files:** `apps/web/src/app/case-studies/[slug]/page.tsx`, `apps/web/src/components/case-study/*.tsx`

- [ ] Static params from published case studies, `dynamicParams = false`; template sections from the brief; KPI blocks; framed gallery with captions; prev/next; `Article` + `BreadcrumbList` JSON-LD; metadata.
- [ ] Commit `feat(web): case study pages`.

### Task 13: Blog pages + RSS

**Files:** `apps/web/src/app/blog/{page.tsx,[slug]/page.tsx,category/[slug]/page.tsx}`, `apps/web/src/app/rss.xml/route.ts`, `apps/web/src/components/blog/*.tsx`

- [ ] Index (featured + grid, empty state), post (prose styles, `BlogPosting` JSON-LD), category pages, RSS 2.0.
- [ ] Commit `feat(web): blog pages and rss`.

### Task 14: SEO plumbing

**Files:** `apps/web/src/lib/{site.ts,seo.ts,jsonld.ts}`, `apps/web/src/app/{sitemap.ts,robots.ts,opengraph-image.tsx,icon.svg,apple-icon.tsx,manifest.ts,not-found.tsx,privacy/page.tsx}`, tests for builders.

**Tests:** `buildMetadata` applies title template, canonical and OG image; `personJsonLd` includes `sameAs` only when socials exist; `jsonLdScript` escapes `<`; sitemap includes every published case study and post.

- [ ] Commit `feat(web): seo plumbing`.

### Task 15: E2E, responsive and Lighthouse pass

**Files:** `apps/web/e2e/*.spec.ts`

**Tests:** home renders every visible section heading; no horizontal overflow at 360/768/1440; nav anchor scrolls to section; case study page renders and 404s for unknown slug; contact form shows validation errors and the unavailable fallback; `/sitemap.xml`, `/robots.txt`, `/rss.xml` respond; JSON-LD parses.

- [ ] Lighthouse on the production build; fix anything < 95.
- [ ] Commit `test(web): e2e coverage`.

### Task 16: CI, deploy docs, push

**Files:** `.github/workflows/ci.yml`, `docs/deploy.md`, `.env.example`

- [ ] CI: install, lint, typecheck, unit tests, build, Playwright.
- [ ] Vercel instructions (root `apps/web`, env vars).
- [ ] Push to `origin main`.
