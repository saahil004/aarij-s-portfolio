import type { SectionContent, SiteSettings } from '@aarij/shared';
import { MousePointer2, Sparkle } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { HandPill } from '@/components/ui/HandPill';
import { ScallopFrame } from '@/components/ui/ScallopFrame';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';

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
      data-hero-sticker
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

export function Hero({
  content,
  settings,
}: {
  content: SectionContent<'hero'>;
  settings: SiteSettings;
}) {
  const portrait = settings.portrait
    ? { ...media(settings.portrait.path), alt: settings.portrait.alt }
    : null;
  const [firstSticker, secondSticker] = content.stickers;

  return (
    <section aria-labelledby="hero-title" className="border-b border-ink">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center border-b border-ink px-4 py-16 text-center sm:px-8 md:py-24 lg:border-r lg:border-b-0 lg:py-28">
          <h1 id="hero-title" data-hero-title className="max-w-[14ch] text-display">
            <span className="mb-6 block text-xs font-medium tracking-[0.12em] uppercase">
              {content.eyebrow}
            </span>
            {content.headline} <HandPill>{content.highlight}</HandPill>
          </h1>
          <p data-hero-copy className="mt-8 max-w-md text-lead text-grey-600">
            {content.subheadline}
          </p>
          <div data-hero-copy className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={content.primaryCta.href} variant="solid">
              {content.primaryCta.label}
            </Button>
            {settings.resume && (
              <Button href={settings.resume.path} download={settings.resume.fileName}>
                {content.resumeCtaLabel}
              </Button>
            )}
          </div>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-grid px-6 py-16 md:py-20">
          <div data-hero-portrait className="relative w-[min(68%,22rem)]">
            <ScallopFrame
              image={portrait}
              fallbackLabel={settings.name}
              clipId="hero-portrait"
              priority
            />
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
                className="top-[46%] -right-6 rotate-[10deg] bg-yellow-50 sm:-right-12"
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
          </div>
        </div>
      </div>
    </section>
  );
}
