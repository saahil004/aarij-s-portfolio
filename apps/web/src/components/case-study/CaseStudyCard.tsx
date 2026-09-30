import type { CaseStudy } from '@aarij/shared';
import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@/components/ui/Pill';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';

/** Screenshot-framed case study card; the title link covers the whole card. */
export function CaseStudyCard({
  caseStudy,
  tone = 'dark',
  headingLevel = 'h3',
}: {
  caseStudy: CaseStudy;
  tone?: 'dark' | 'light';
  headingLevel?: 'h2' | 'h3';
}) {
  const cover = media(caseStudy.cover.path);
  const Heading = headingLevel;
  const dark = tone === 'dark';

  return (
    <article data-case-card className="group relative">
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-white p-3',
          !dark && 'border border-ink',
        )}
      >
        <div data-case-card-media className="relative aspect-[16/10]">
          <Image
            src={cover.src}
            alt={caseStudy.cover.alt}
            fill
            sizes="(min-width: 1024px) 34rem, (min-width: 768px) 45vw, 92vw"
            className="object-contain"
          />
        </div>
        <span
          aria-hidden="true"
          data-case-card-cta
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-white px-4 py-2 text-xs font-medium tracking-wide text-ink uppercase opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
        >
          View case study
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Pill tone={dark ? 'sky' : 'blue'}>{caseStudy.industry}</Pill>
        <span className={cn('text-sm', dark ? 'text-white/65' : 'text-grey-600')}>
          {caseStudy.client}
        </span>
      </div>
      <Heading className={cn('mt-3 text-xl font-medium md:text-2xl', dark && 'text-white')}>
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          {caseStudy.title}
        </Link>
      </Heading>
    </article>
  );
}
