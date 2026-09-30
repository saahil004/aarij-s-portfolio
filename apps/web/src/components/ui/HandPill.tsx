import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** A word wrapped in a slightly tilted, hand-drawn pill with motion marks (Meeko hero). */
export function HandPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('relative inline-block whitespace-nowrap', className)}>
      <span
        data-hand-pill
        className="relative inline-block -rotate-3 rounded-full border-[1.5px] border-ink bg-yellow-100 px-[0.3em] pb-[0.07em] leading-[1.05]"
      >
        {children}
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="absolute -right-[0.5em] -bottom-[0.18em] h-[0.55em] w-[0.55em] text-ink"
      >
        <path d="M6 28c9-2 16-8 20-18" />
        <path d="M14 36c9-2 15-7 19-15" />
      </svg>
    </span>
  );
}
