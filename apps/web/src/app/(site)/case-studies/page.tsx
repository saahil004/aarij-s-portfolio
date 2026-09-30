import type { Metadata } from 'next';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { getCaseStudies, getSiteSettings } from '@/content';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteName } from '@/lib/site-name';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Case studies', path: '/case-studies' },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: 'Case Studies: SEO, Lead Generation & E-commerce Growth',
    description:
      'Growth stories with the evidence attached: rankings, traffic, leads and revenue from Search Console, GA4, Ahrefs and client dashboards.',
    path: '/case-studies',
    siteName: siteName(settings),
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        crumbs={crumbs}
        title="Case studies"
        intro="Growth stories with the evidence attached. Every number comes from Search Console, GA4, Ahrefs or the client's own dashboards."
      />
      <section aria-label="All case studies" className="py-20 md:py-28">
        <div className="container-page">
          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {caseStudies.map((caseStudy) => (
              <li key={caseStudy.slug}>
                <CaseStudyCard caseStudy={caseStudy} tone="light" headingLevel="h2" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
