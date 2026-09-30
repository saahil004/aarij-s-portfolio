# Phase 2 — Motion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add the Meeko-style motion layer — Lenis smooth scroll, GSAP scroll choreography and a single hero load sequence, Motion for component enter/exit — without regressing Core Web Vitals or accessibility.

**Architecture:** Motion is progressive enhancement over the finished Phase 1 markup. One client component (`MotionLayer`, mounted in the site layout) owns Lenis and every GSAP ScrollTrigger, finding targets through the `data-*` hooks Phase 1 already renders. Motion (`motion/react`, `LazyMotion` + `m`) is used only inside the components that open and close: the mobile menu and the contact form panel. Everything runs inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`, so reduced-motion users get the static Phase 1 page.

**Tech Stack:** gsap 3.15 (+ ScrollTrigger), @gsap/react, lenis 1.3, motion 13.

**Spec:** `docs/superpowers/specs/2026-09-30-aarij-portfolio-design.md` (§4.5 motion rules, §4.2 table)

## Global Constraints

- Animate `transform`, `opacity` and `clip-path` only. No layout properties.
- LCP < 2.0s and CLS < 0.05 on throttled mobile (Phase 1 baseline: LCP 1.12s, CLS 0.00).
- The hero `<h1>` is the LCP element: it is never hidden or delayed by animation.
- `prefers-reduced-motion: reduce` → no Lenis, no ScrollTriggers, no hero sequence, CSS marquee/badge stop.
- Content must be visible if JavaScript fails: the only CSS-gated initial state is the hero's secondary elements, and it has a 2.5s CSS fallback reveal.
- One orchestrated moment (the hero). Scroll effects must communicate something (sequence, growth, progress), not decorate every section.
- All GSAP inside `useGSAP` with scope; `ScrollTrigger.refresh()` after fonts load.

---

### Task 1: Smooth scroll

**Files:** `apps/web/src/components/motion/MotionLayer.tsx`, `apps/web/src/components/motion/lenis.ts`, `apps/web/src/app/(site)/layout.tsx`, `apps/web/src/app/globals.css`

- [ ] Lenis driven by `gsap.ticker`, `lenis.on('scroll', ScrollTrigger.update)`, `lagSmoothing(0)`.
- [ ] Anchor links (`/#section` on the home page) scroll through Lenis with the sticky-header offset; hash updates.
- [ ] `html.lenis` disables CSS smooth scrolling.
- [ ] Header hides on scroll down and returns on scroll up (transform only).
- [ ] Marquee playback rate follows scroll velocity and direction (Web Animations API on the existing CSS animation).
- [ ] Rotating badge fades out while the contact section is in view.

### Task 2: Hero load sequence

**Files:** `MotionLayer.tsx`, `apps/web/src/app/layout.tsx` (inline motion-class script), `globals.css`

- [ ] Inline head script adds `motion-ok` to `<html>` when reduced motion is off.
- [ ] CSS: `.motion-ok [data-hero-anim]` starts hidden, with a 2.5s fallback animation to visible.
- [ ] Timeline: hand-drawn pill pops (scale + rotate), subheadline and CTAs rise, portrait reveals (clip-path), stickers drop with a slight overshoot, then float on a slow yoyo. The `<h1>` text itself is untouched.

### Task 3: Scroll choreography

**Files:** `MotionLayer.tsx`

- [ ] Funnel: stages light up left to right in sequence as the section enters (communicates the flow).
- [ ] Results: numbers count up from 0 to their real value once, preserving prefix/suffix/decimals; SSR text stays the final value.
- [ ] Case studies: screenshot media parallax (scrubbed, `ease: 'none'`); cursor-following "View case study" pill on fine pointers (`quickTo`).
- [ ] Framework: the timeline line draws with scroll (scaleX scrub) and each phase marker pops as the line reaches it.
- [ ] Contact: the handwritten arrow draws in when the section enters.

### Task 4: Motion components

**Files:** `apps/web/src/components/layout/MobileMenu.tsx`, `apps/web/src/components/contact/ContactPanel.tsx`, `apps/web/src/components/motion/MotionProvider.tsx`

- [ ] `LazyMotion` with `domAnimation` features, `m` components, `MotionConfig reducedMotion="user"`.
- [ ] Mobile menu panel: fade + slide in/out with `AnimatePresence`.
- [ ] Contact form: height/opacity reveal when opened.
- [ ] Existing unit tests keep passing (jsdom renders final state).

### Task 5: Verification

- [ ] Unit tests, lint, typecheck, build.
- [ ] Playwright suite green; add a reduced-motion run asserting content is visible and no transforms are applied to hero elements.
- [ ] Performance trace on throttled mobile: LCP < 2.0s, CLS < 0.05; Lighthouse accessibility/SEO/best practices stay at 100.
- [ ] Commit and push.
