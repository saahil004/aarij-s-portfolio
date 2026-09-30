'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { samePageHash } from '@/lib/anchors';
import {
  cardBatches,
  caseStudies,
  contact,
  framework,
  funnel,
  heroIntro,
  magnetic,
  processDeck,
  results,
  titleReveals,
} from './choreography';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Sticky header height plus breathing room, matching `scroll-margin-top` in CSS. */
const SECTION_OFFSET = -88;

let lenis: Lenis | null = null;

function scrollToSection(hash: string) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: SECTION_OFFSET, duration: 1.3 });
  else target.scrollIntoView({ block: 'start' });
}

/** Loop animations (marquees, badge ring) speed up and reverse with scroll velocity. */
function loopAnimations(): Animation[] {
  return Array.from(document.querySelectorAll('[data-marquee], [data-badge-ring]')).flatMap(
    (element) => element.getAnimations(),
  );
}

/**
 * The site's motion layer (renders nothing). Owns Lenis smooth scrolling, same-page anchor
 * links, the hero intro and every ScrollTrigger. Reduced-motion visitors get native scrolling
 * and the static page.
 */
export function MotionLayer() {
  const pathname = usePathname();

  // Same-page #links: scroll smoothly and announce the hash (Next.js updates the URL without
  // firing `hashchange`, which the contact form listens for). Active even without Lenis.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank') return;
      const hash = samePageHash(link.href, window.location.href);
      if (!hash || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      scrollToSection(hash);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Lenis, the auto-hiding header and velocity-linked loops.
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const instance = new Lenis({ lerp: 0.1, autoRaf: false });
    lenis = instance;
    instance.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const header = document.querySelector<HTMLElement>('[data-site-header]');
    let headerHidden = false;
    const setHeader = (hide: boolean) => {
      if (!header || hide === headerHidden) return;
      headerHidden = hide;
      gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.35, ease: 'power2.out' });
    };
    instance.on('scroll', ({ scroll, direction }: Lenis) => {
      if (direction === 1 && scroll > 160) setHeader(true);
      else if (direction === -1 || scroll <= 160) setHeader(false);
    });
    const showHeader = () => setHeader(false);
    header?.addEventListener('focusin', showHeader);

    let rate = 1;
    let heading = 1;
    const loops = { list: loopAnimations(), age: 0 };
    const tick = () => {
      if (++loops.age > 120) {
        loops.list = loopAnimations(); // pick up loops on newly rendered pages
        loops.age = 0;
      }
      const velocity = instance.velocity;
      if (Math.abs(velocity) > 0.4) heading = velocity > 0 ? 1 : -1;
      const target = heading * (1 + Math.min(Math.abs(velocity) / 5, 6));
      rate += (target - rate) * 0.08;
      for (const animation of loops.list) animation.playbackRate = rate;
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.remove(tick);
      header?.removeEventListener('focusin', showHeader);
      instance.destroy();
      lenis = null;
    };
  }, []);

  // New page: start at the top (or at its #section) and re-measure.
  useEffect(() => {
    lenis?.resize();
    // Arriving on /page#section: glide to it once the new page is in.
    if (pathname && window.location.hash) scrollToSection(window.location.hash);
  }, [pathname]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 768px)',
          fine: '(hover: hover) and (pointer: fine)',
        },
        (context) => {
          const {
            motion = false,
            desktop = false,
            fine = false,
          } = context.conditions as Record<string, boolean | undefined>;
          if (!motion) return;
          const cleanups: (() => void)[] = [];
          heroIntro({ fine }, cleanups);
          titleReveals();
          funnel();
          results();
          caseStudies({ desktop, fine }, cleanups);
          if (desktop) processDeck();
          framework();
          cardBatches();
          contact();
          if (fine) magnetic(cleanups);
          return () => {
            for (const cleanup of cleanups) cleanup();
          };
        },
      );
      // Fonts change line breaks and heights; re-measure once they are in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
