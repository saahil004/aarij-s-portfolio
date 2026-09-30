import type { Metadata } from 'next';
import { Fragment } from 'react';
import { renderSection } from '@/components/sections/registry';
import type { HomeData } from '@/components/sections/types';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  getBrands,
  getCaseStudies,
  getCategories,
  getCertifications,
  getIndustries,
  getMetrics,
  getPosts,
  getSections,
  getSiteSettings,
  getTestimonials,
  getTools,
} from '@/content';
import { homeJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteUrl } from '@/lib/site';
import { siteName } from '@/lib/site-name';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: settings.seo.title,
    description: settings.seo.description,
    path: '/',
    absoluteTitle: true,
    siteName: siteName(settings),
  });
}

export default async function HomePage() {
  const [
    sections,
    settings,
    metrics,
    featuredCaseStudies,
    brands,
    tools,
    industries,
    certifications,
    testimonials,
    posts,
    categories,
  ] = await Promise.all([
    getSections(),
    getSiteSettings(),
    getMetrics(),
    getCaseStudies({ featuredOnly: true }),
    getBrands(),
    getTools(),
    getIndustries(),
    getCertifications(),
    getTestimonials(),
    getPosts({ limit: 4 }),
    getCategories(),
  ]);

  const data: HomeData = {
    settings,
    metrics,
    featuredCaseStudies,
    brands,
    tools,
    industries,
    certifications,
    testimonials,
    posts,
    categories,
  };

  return (
    <>
      <JsonLd data={homeJsonLd(settings, siteUrl())} />
      {sections.map((section) => (
        <Fragment key={section.key}>{renderSection(section, data)}</Fragment>
      ))}
    </>
  );
}
