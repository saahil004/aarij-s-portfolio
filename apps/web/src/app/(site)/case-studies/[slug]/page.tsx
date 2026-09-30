import { Check } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { getCaseStudies, getCaseStudy, getSiteSettings, media } from '@/content';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteUrl } from '@/lib/site';
import { siteName } from '@/lib/site-name';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [caseStudy, settings] = await Promise.all([getCaseStudy(slug), getSiteSettings()]);
  if (!caseStudy) return {};
  return buildMetadata({
    title: caseStudy.seo?.title ?? `${caseStudy.client} case study: ${caseStudy.title}`,
    description: caseStudy.seo?.description ?? caseStudy.summary,
    path: `/case-studies/${caseStudy.slug}`,
    absoluteTitle: Boolean(caseStudy.seo?.title),
    type: 'article',
    siteName: siteName(settings),
  });
}

function ReportSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 text-lead text-grey-600">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const [caseStudy, all, settings] = await Promise.all([
    getCaseStudy(slug),
    getCaseStudies(),
    getSiteSettings(),
  ]);
  if (!caseStudy) notFound();

  const index = all.findIndex((c) => c.slug === caseStudy.slug);
  const next = all.length > 1 ? all[(index + 1) % all.length] : undefined;
  const cover = media(caseStudy.cover.path);
  const path = `/case-studies/${caseStudy.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Case studies', path: '/case-studies' },
    { name: caseStudy.client, path },
  ];

  const toc = [
    { id: 'challenge', title: 'The challenge' },
    { id: 'strategy', title: 'The strategy' },
    { id: 'executed', title: 'What I executed' },
    ...(caseStudy.beforeAfter ? [{ id: 'before-after', title: 'Before vs after' }] : []),
    { id: 'impact', title: 'Business impact' },
    ...(caseStudy.gallery.length > 0 ? [{ id: 'evidence', title: 'The evidence' }] : []),
    { id: 'takeaway', title: 'Key takeaway' },
  ];

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          type: 'Article',
          headline: caseStudy.title,
          description: caseStudy.summary,
          path,
          image: cover.src,
          authorName: settings.fullName,
          siteUrl: siteUrl(),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <header className="border-b border-ink bg-grid">
        <div className="container-page py-16 md:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Pill tone="sky">{caseStudy.industry}</Pill>
            <span className="text-sm text-grey-600">{caseStudy.client}</span>
          </div>
          <h1 className="mt-5 max-w-[22ch] text-display">{caseStudy.title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-grey-600">{caseStudy.summary}</p>
          <ul aria-label="Services" className="mt-8 flex flex-wrap gap-2">
            {caseStudy.services.map((service) => (
              <li key={service}>
                <Pill>{service}</Pill>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-labelledby="kpis-title" className="border-b border-ink">
        <div className="container-page py-12 md:py-14">
          <h2 id="kpis-title" className="text-sm font-medium text-grey-600">
            Results &amp; KPIs
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-4">
            {caseStudy.kpis.map((kpi) => (
              <div key={kpi.label} className="flex flex-col-reverse gap-2 border-t border-ink pt-5">
                <dt className="text-sm text-grey-600">{kpi.label}</dt>
                <dd className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">{kpi.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <figure className="container-page mt-14 md:mt-20">
        <div className="rounded-2xl border border-ink bg-white p-3 md:p-4">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            alt={caseStudy.cover.alt}
            sizes="(min-width: 1280px) 70rem, 100vw"
            priority
            className="h-auto w-full rounded-lg"
          />
        </div>
      </figure>

      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[13rem_1fr] lg:gap-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-sm font-medium">On this page</p>
            <ul className="mt-4 space-y-2.5 border-l border-ink/20 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-grey-600 transition-colors hover:border-ink hover:text-ink"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-2xl space-y-16">
          <ReportSection id="challenge" title="The challenge">
            <p>{caseStudy.challenge}</p>
          </ReportSection>
          <ReportSection id="strategy" title="The strategy">
            <p>{caseStudy.strategy}</p>
          </ReportSection>
          <ReportSection id="executed" title="What I executed">
            <ul className="space-y-3">
              {caseStudy.executed.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-ink bg-yellow-100"
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </ReportSection>
          {caseStudy.beforeAfter && (
            <ReportSection id="before-after" title="Before vs after">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-ink bg-grey-100 p-6">
                  <Pill tone="white">Before</Pill>
                  <p className="mt-4 text-base">{caseStudy.beforeAfter.before}</p>
                </div>
                <div className="rounded-2xl border border-ink bg-yellow-50 p-6">
                  <Pill tone="sun">After</Pill>
                  <p className="mt-4 text-base font-medium text-ink">
                    {caseStudy.beforeAfter.after}
                  </p>
                </div>
              </div>
            </ReportSection>
          )}
          <ReportSection id="impact" title="Business impact">
            <p className="text-ink">{caseStudy.impact}</p>
          </ReportSection>
          {caseStudy.gallery.length > 0 && (
            <ReportSection id="evidence" title="The evidence">
              <div className="space-y-10">
                {caseStudy.gallery.map((item) => {
                  const image = media(item.path);
                  return (
                    <figure key={item.path}>
                      <div className="rounded-2xl border border-ink bg-white p-3">
                        <Image
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt={item.alt}
                          sizes="(min-width: 768px) 42rem, 100vw"
                          className="h-auto w-full rounded-lg"
                        />
                      </div>
                      <figcaption className="mt-3 text-sm">{item.caption}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </ReportSection>
          )}
          <ReportSection id="takeaway" title="Key takeaway">
            <blockquote className="rounded-2xl border border-ink bg-yellow-100 p-6 text-xl leading-snug font-medium text-ink md:p-8 md:text-2xl">
              {caseStudy.takeaway}
            </blockquote>
          </ReportSection>
        </div>
      </div>

      {next && (
        <aside aria-labelledby="next-case-title" className="border-t border-ink bg-blue-50">
          <div className="container-page flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm text-grey-600">Next case study · {next.client}</p>
              <p id="next-case-title" className="mt-2 max-w-[24ch] text-title">
                {next.title}
              </p>
            </div>
            <Button href={`/case-studies/${next.slug}`} variant="solid">
              Read the case study
            </Button>
          </div>
        </aside>
      )}
    </article>
  );
}
