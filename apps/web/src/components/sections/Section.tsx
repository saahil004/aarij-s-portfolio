import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Standard page section: anchor id, labelled by its `${id}-title` heading, page gutter. */
export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-20 md:py-28', className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
