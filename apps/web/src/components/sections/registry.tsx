import type { SectionRecord } from '@aarij/shared';
import type { ReactNode } from 'react';
import { About } from './About';
import { BeforeAfter } from './BeforeAfter';
import { BlogPreview } from './BlogPreview';
import { Brands } from './Brands';
import { CaseStudies } from './CaseStudies';
import { Expertise } from './Expertise';
import { Framework } from './Framework';
import { Funnel } from './Funnel';
import { Hero } from './Hero';
import { Industries } from './Industries';
import { Process } from './Process';
import { Results } from './Results';
import { Testimonials } from './Testimonials';
import { Ticker } from './Ticker';
import { Tools } from './Tools';
import type { HomeData } from './types';

/** Maps an admin-ordered section record to its component. */
export function renderSection(section: SectionRecord, data: HomeData): ReactNode {
  switch (section.key) {
    case 'hero':
      return <Hero content={section.content} settings={data.settings} metrics={data.metrics} />;
    case 'ticker':
      return <Ticker content={section.content} />;
    case 'funnel':
      return <Funnel content={section.content} />;
    case 'results':
      return <Results content={section.content} metrics={data.metrics} />;
    case 'caseStudies':
      return <CaseStudies content={section.content} caseStudies={data.featuredCaseStudies} />;
    case 'brands':
      return <Brands content={section.content} brands={data.brands} />;
    case 'process':
      return <Process content={section.content} />;
    case 'expertise':
      return <Expertise content={section.content} />;
    case 'tools':
      return <Tools content={section.content} tools={data.tools} />;
    case 'beforeAfter':
      return <BeforeAfter content={section.content} />;
    case 'framework':
      return <Framework content={section.content} />;
    case 'industries':
      return (
        <Industries
          content={section.content}
          industries={data.industries}
          certifications={data.certifications}
        />
      );
    case 'testimonials':
      return <Testimonials content={section.content} testimonials={data.testimonials} />;
    case 'about':
      return <About content={section.content} />;
    case 'blog':
      return (
        <BlogPreview content={section.content} posts={data.posts} categories={data.categories} />
      );
    case 'cta':
      // Rendered by the site layout so every page ends with it.
      return null;
  }
}
