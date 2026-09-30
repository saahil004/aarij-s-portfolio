import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { formatMetric } from '@/lib/format';

/**
 * Scroll and entrance effects. Each function finds its targets through the data-* hooks the
 * server components render, does nothing when they are absent, and registers any DOM
 * listeners it adds in `cleanups`. All of them run inside a gsap.matchMedia context that only
 * matches when the visitor allows motion, so reverting the context undoes everything.
 */
type Cleanups = (() => void)[];

const all = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T & Element>(selector)) as T[];

/** The one orchestrated moment: curtain reveal, pill pop, stickers and proof badges drop in. */
export function heroIntro({ fine }: { fine: boolean }, cleanups: Cleanups) {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const badge = document.querySelector<HTMLElement>('[data-rotating-badge]');
  if (badge) gsap.set(badge, { animation: 'none' });
  if (!hero) {
    if (badge) gsap.fromTo(badge, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 });
    return;
  }

  const gated = all('[data-hero-anim], [data-hand-pill], [data-scallop-curtain]', hero);
  gsap.set(gated, { animation: 'none' }); // the JS intro replaces the CSS fallback

  const floats = all('[data-hero-float]', hero);
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.05 });
  tl.fromTo(
    all('[data-scallop-curtain]', hero),
    { yPercent: 0 },
    { yPercent: -101, duration: 1.1, ease: 'expo.inOut' },
    0,
  )
    .fromTo(
      all('[data-scallop]', hero),
      { scale: 0.9, rotation: -3 },
      { scale: 1, rotation: 0, duration: 1.4, ease: 'expo.out' },
      0,
    )
    .fromTo(
      all('[data-hand-pill]', hero),
      { autoAlpha: 0, scale: 0.35, rotation: -14 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(2.4)' },
      0.25,
    )
    .fromTo(
      all('[data-hero-copy]', hero),
      { autoAlpha: 0, y: 26 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 },
      0.35,
    )
    .fromTo(
      floats,
      { autoAlpha: 0, y: -28, scale: 0.6 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'back.out(2.2)' },
      0.75,
    )
    .to(
      floats,
      {
        y: '+=7',
        duration: 2.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.45, from: 'random' },
      },
      '>',
    );
  if (badge) {
    tl.fromTo(
      badge,
      { autoAlpha: 0, scale: 0.3, rotation: -120 },
      { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.8)' },
      1.1,
    );
  }

  // Layers drift against the pointer; depth comes from each element's data-parallax.
  const stage = hero.querySelector<HTMLElement>('[data-hero-stage]');
  if (!fine || !stage) return;
  for (const layer of all('[data-parallax]', hero)) {
    layer.style.setProperty('--depth', layer.dataset.parallax ?? '1');
  }
  const xTo = gsap.quickTo(stage, '--hero-px', { duration: 0.8, ease: 'power3' });
  const yTo = gsap.quickTo(stage, '--hero-py', { duration: 0.8, ease: 'power3' });
  const onMove = (event: PointerEvent) => {
    const rect = hero.getBoundingClientRect();
    xTo(((event.clientX - rect.left) / rect.width - 0.5) * 28);
    yTo(((event.clientY - rect.top) / rect.height - 0.5) * 22);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);
  cleanups.push(() => {
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
  });
}

/** Section titles rise line by line out of a mask as they enter. */
export function titleReveals() {
  for (const title of all('[data-reveal-title]')) {
    SplitText.create(title, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (split) =>
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.05,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: title, start: 'top 88%', once: true },
        }),
    });
  }
}

/**
 * The funnel fills left to right: stages arrive in order once, then a progress bar sweeps
 * across with scroll. Stages never rest half-faded, so text keeps full contrast.
 */
export function funnel() {
  const wrap = document.querySelector<HTMLElement>('[data-funnel-wrap]');
  if (!wrap) return;
  gsap.fromTo(
    all('[data-funnel-stage]', wrap),
    { autoAlpha: 0, y: 40 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: wrap, start: 'top 82%', once: true },
    },
  );
  gsap.fromTo(
    wrap.querySelector('[data-funnel-progress]'),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 45%', scrub: 0.7 },
    },
  );
}

/** Results pills pop in and each number counts up from zero to its real value. */
export function results() {
  const pills = all('[data-metric]');
  if (pills.length === 0) return;
  // One timeline, so pills appear and counters start together. The server-rendered HTML
  // (what crawlers read) always holds the real values.
  const tl = gsap.timeline({
    scrollTrigger: { trigger: pills[0], start: 'top 88%', once: true },
  });
  tl.fromTo(
    pills,
    { autoAlpha: 0, y: 30, scale: 0.88 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.08 },
    0,
  );

  for (const number of all('[data-metric-value]')) {
    const value = Number(number.dataset.metricValue);
    if (!Number.isFinite(value) || value <= 10) continue; // "#1" shouldn't count up
    const format = {
      decimals: Number(number.dataset.metricDecimals ?? 0),
      prefix: number.dataset.metricPrefix ?? '',
      suffix: number.dataset.metricSuffix ?? '',
    };
    const finalText = number.textContent;
    const counter = { value: 0 };
    tl.call(
      () => {
        number.style.minWidth = `${number.offsetWidth}px`; // no reflow while digits change
        number.textContent = formatMetric({ ...format, value: 0 });
      },
      [],
      0,
    ).to(
      counter,
      {
        value,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          number.textContent = formatMetric({ ...format, value: counter.value });
        },
        onComplete: () => {
          number.textContent = finalText;
        },
      },
      0.1,
    );
  }
}

/** Case study cards drift at two speeds; a "View case study" pill follows the pointer. */
export function caseStudies(
  { desktop, fine }: { desktop: boolean; fine: boolean },
  cleanups: Cleanups,
) {
  const cards = all('#case-studies [data-case-card]');
  if (desktop) {
    cards.forEach((card, index) => {
      const depth = index % 2 === 1 ? 70 : 26;
      gsap.fromTo(
        card,
        { y: depth },
        {
          y: -depth,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      );
    });
  }
  if (!fine) return;
  for (const card of all('[data-case-card]')) {
    const frame = card.firstElementChild as HTMLElement | null;
    const pill = card.querySelector<HTMLElement>('[data-case-card-cta]');
    if (!frame || !pill) continue;
    const xTo = gsap.quickTo(pill, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(pill, 'y', { duration: 0.45, ease: 'power3' });
    const onMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      xTo(event.clientX - (rect.left + rect.width / 2));
      yTo(event.clientY - (rect.top + rect.height / 2));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    frame.addEventListener('pointermove', onMove);
    frame.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
    });
  }
}

/** Process cards stack like a deck: each one sinks back as the next slides over it. */
export function processDeck() {
  const cards = all('[data-process-card]');
  cards.forEach((card, index) => {
    const next = cards[index + 1];
    if (!next) return;
    const stickyTop = (6.5 + (index + 1) * 1.25) * 16;
    gsap.to(card, {
      scale: 0.93,
      transformOrigin: '50% 0%',
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: `top ${stickyTop}px`, scrub: true },
    });
  });
}

/**
 * The 90-day line draws with scroll; phases arrive in order once (never resting half-faded,
 * so their text keeps full contrast).
 */
export function framework() {
  const line = document.querySelector<HTMLElement>('[data-framework-line]');
  const phases = all('[data-framework-phase]');
  if (!line || phases.length === 0) return;
  gsap.fromTo(
    line,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: line.parentElement,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: 0.8,
      },
    },
  );
  gsap.fromTo(
    phases,
    { autoAlpha: 0, y: 30 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: { trigger: line.parentElement, start: 'top 78%', once: true },
    },
  );
}

/** Grids of cards rise in batches as they enter. */
export function cardBatches() {
  const selector =
    '[data-expertise-card], [data-before-after-card], [data-post-card], [data-reveal-item]';
  const items = all(selector);
  if (items.length === 0) return;
  gsap.set(items, { autoAlpha: 0, y: 48 });
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
        overwrite: true,
      }),
  });
}

/** Closing section: the handwritten arrow draws itself and the badge steps aside. */
export function contact() {
  const section = document.getElementById('contact');
  if (!section) return;
  const annotation = section.querySelector('[data-contact-annotation]');
  if (annotation) {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 55%', once: true },
    });
    tl.from(annotation.querySelectorAll('path'), {
      drawSVG: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.inOut',
    }).from(
      annotation.querySelectorAll('span'),
      { autoAlpha: 0, rotation: -18, y: 10, duration: 0.5, ease: 'back.out(2)' },
      '-=0.3',
    );
  }

  const badge = document.querySelector<HTMLElement>('[data-rotating-badge]');
  if (badge) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      end: 'bottom top',
      onToggle: (self) =>
        gsap.to(badge, {
          autoAlpha: self.isActive ? 0 : 1,
          scale: self.isActive ? 0.5 : 1,
          duration: 0.35,
          overwrite: 'auto',
        }),
    });
  }
}

/** Buttons marked `magnetic` lean toward the pointer and spring back. */
export function magnetic(cleanups: Cleanups) {
  for (const element of all('[data-magnetic]')) {
    const xTo = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3' });
    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * 0.3);
      yTo((event.clientY - (rect.top + rect.height / 2)) * 0.4);
    };
    const onLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' });
    };
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    });
  }
}
