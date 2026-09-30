import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PillTone = 'blue' | 'yellow' | 'grey' | 'sky' | 'white' | 'sun';

const tones: Record<PillTone, string> = {
  blue: 'bg-blue-50',
  yellow: 'bg-yellow-50',
  grey: 'bg-grey-100',
  sky: 'bg-sky',
  white: 'bg-white',
  sun: 'bg-yellow-100',
};

export function Pill({
  tone = 'white',
  className,
  children,
}: {
  tone?: PillTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-ink px-3 py-1.5 text-xs leading-none font-medium text-ink',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
