import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="border-b border-ink bg-grid">
      <div className="container-page flex flex-col items-center py-28 text-center md:py-36">
        <p
          aria-hidden="true"
          className="text-outline text-[7rem] leading-none font-medium tracking-[-0.05em] [--outline-color:var(--color-blue)] [--outline-fill:var(--color-blue-50)] md:text-[9rem]"
        >
          404
        </p>
        <h1 id="not-found-title" className="mt-6 text-title">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-4 max-w-md text-lead text-grey-600">
          The link may be out of date, or the page may have moved. These are good places to start.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="solid">
            Go to the homepage
          </Button>
          <Button href="/case-studies">Browse case studies</Button>
        </div>
      </div>
    </section>
  );
}
