import type { Metric, SectionContent, SiteSettings } from '@aarij/shared';
import { MousePointer2, Sparkle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { HandPill } from '@/components/ui/HandPill';
import { ScallopFrame } from '@/components/ui/ScallopFrame';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';
import { formatMetric } from '@/lib/format';

function Sticker({
  children,
  doodle,
  className,
}: {
  children: ReactNode;
  doodle: ReactNode;
  className: string;
}) {
  return (
    <span
      data-hero-anim
      data-hero-float
      className={cn(
        'absolute z-10 inline-flex items-center rounded-full border border-ink px-3.5 py-1.5 text-xs font-medium whitespace-nowrap',
        className,
      )}
    >
      {doodle}
      {children}
    </span>
  );
}

/** A real result pinned beside the portrait like a sticker, with a hard ink shadow. */
function ProofBadge({ metric, className }: { metric: Metric; className: string }) {
  return (
    <span
      data-hero-anim
      data-hero-float
      data-parallax="1.6"
      className={cn(
        'absolute z-20 flex items-center gap-2.5 rounded-2xl border border-ink bg-white py-2 pr-3.5 pl-3 shadow-[3px_3px_0_0_var(--color-ink)] md:py-2.5 md:pr-4',
        className,
      )}
    >
      <span className="text-outline text-2xl leading-none font-medium tracking-[-0.04em] [--outline-color:var(--color-blue)] md:text-3xl">
        {formatMetric(metric)}
      </span>
      <span className="flex max-w-[7.5rem] flex-col text-left leading-tight">
        <span className="text-[0.6875rem] font-semibold md:text-xs">{metric.label}</span>
        <span className="text-[0.625rem] text-grey-600 md:text-[0.6875rem]">{metric.context}</span>
      </span>
    </span>
  );
}

export function Hero({
  content,
  settings,
  metrics,
}: {
  content: SectionContent<'hero'>;
  settings: SiteSettings;
  metrics: Metric[];
}) {
  const portrait = settings.portrait
    ? { ...media(settings.portrait.path), alt: settings.portrait.alt }
    : null;
  const [firstSticker, secondSticker] = content.stickers;
  const [firstProof, secondProof] = content.proofMetricIds
    .map((id) => metrics.find((metric) => metric.id === id))
    .filter((metric): metric is Metric => Boolean(metric));

  return (
    <section data-hero aria-labelledby="hero-title" className="border-b border-ink">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center border-b border-ink px-4 py-16 text-center sm:px-8 md:py-24 lg:border-r lg:border-b-0 lg:py-28">
          <h1 id="hero-title" className="max-w-[14ch] text-display">
            <span className="mb-6 block text-xs font-medium tracking-[0.12em] uppercase">
              {content.eyebrow}
            </span>
            {content.headline} <HandPill>{content.highlight}</HandPill>
          </h1>
          <p data-hero-anim data-hero-copy className="mt-8 max-w-md text-lead text-grey-600">
            {content.subheadline}
          </p>
          <div
            data-hero-anim
            data-hero-copy
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button href={content.primaryCta.href} variant="solid" magnetic>
              {content.primaryCta.label}
            </Button>
            {settings.resume && (
              <Button href={settings.resume.path} download={settings.resume.fileName} magnetic>
                {content.resumeCtaLabel}
              </Button>
            )}
          </div>
        </div>

        <div
          data-hero-stage
          className="relative flex items-center justify-center overflow-hidden bg-grid px-6 py-16 md:py-20"
        >
          <div data-hero-portrait className="relative w-[min(64%,22rem)]">
            <div data-parallax="0.6">
              <ScallopFrame
                image={portrait}
                fallbackLabel={settings.name}
                clipId="hero-portrait"
                priority
                curtain
              />
            </div>
            {firstSticker && (
              <Sticker
                className="top-2 -left-8 -rotate-12 bg-blue-50 sm:-left-12"
                doodle={
                  <Sparkle
                    aria-hidden="true"
                    className="absolute -top-5 -left-4 size-5 fill-yellow"
                    strokeWidth={1.5}
                  />
                }
              >
                {firstSticker}
              </Sticker>
            )}
            {secondSticker && (
              <Sticker
                className="top-[44%] -right-6 rotate-[10deg] bg-yellow-50 sm:-right-12"
                doodle={
                  <MousePointer2
                    aria-hidden="true"
                    className="absolute -top-5 left-1 size-5 fill-white"
                    strokeWidth={1.5}
                  />
                }
              >
                {secondSticker}
              </Sticker>
            )}
            {firstProof && (
              <ProofBadge
                metric={firstProof}
                className="-top-6 -right-6 rotate-[4deg] sm:-right-16"
              />
            )}
            {secondProof && (
              <ProofBadge
                metric={secondProof}
                className="-bottom-5 -left-6 -rotate-[3deg] sm:-left-16"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
