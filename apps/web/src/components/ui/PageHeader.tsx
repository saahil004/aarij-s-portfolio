import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { RichText } from './RichText';

/** Blue-grid page header used by inner pages (case studies, blog, privacy). */
export function PageHeader({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ink bg-grid">
      <div className="container-page py-16 md:py-24">
        <Breadcrumbs items={crumbs} />
        {children}
        <h1 className="mt-6 max-w-[20ch] text-display">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lead text-grey-600">
            <RichText text={intro} />
          </p>
        )}
      </div>
    </header>
  );
}
