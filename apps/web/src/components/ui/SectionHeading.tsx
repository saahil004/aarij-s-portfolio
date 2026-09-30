import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { RichText } from './RichText';

type SectionHeadingProps = {
  id: string;
  title: string;
  intro?: string;
  /** `split`: title left, intro right (Meeko default). `center`: stacked and centered. */
  align?: 'split' | 'center';
  tone?: 'light' | 'dark';
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  intro,
  align = 'split',
  tone = 'light',
  children,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  const introText = intro ? (
    <p className={cn('text-lead', dark ? 'text-white/75' : 'text-grey-600')}>
      <RichText text={intro} strongClassName={dark ? 'text-white' : undefined} />
    </p>
  ) : null;

  if (align === 'center') {
    return (
      <div className={cn('mx-auto max-w-2xl text-center', className)}>
        <h2 id={id} data-reveal-title className={cn('text-title', dark && 'text-white')}>
          {title}
        </h2>
        {introText && <div className="mx-auto mt-4 max-w-xl">{introText}</div>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-5 md:grid-cols-2 md:gap-12 lg:gap-24', className)}>
      <h2 id={id} data-reveal-title className={cn('max-w-[15ch] text-title', dark && 'text-white')}>
        {title}
      </h2>
      {(introText || children) && (
        <div className="max-w-md md:pt-2">
          {introText}
          {children && <div className="mt-6">{children}</div>}
        </div>
      )}
    </div>
  );
}
