import type { Category, Post } from '@aarij/shared';

export const categories: Category[] = [
  {
    slug: 'seo',
    name: 'SEO',
    description: 'Technical, on-page and local SEO lessons from real campaigns.',
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    description: 'Planning content that ranks, earns links and turns readers into leads.',
  },
  {
    slug: 'analytics',
    name: 'Analytics',
    description: 'Measuring what matters with GA4, Search Console and CRM data.',
  },
];

const draftNote =
  '<p><em>Draft outline. Aarij will write and publish the full article from the admin panel.</em></p>';

/**
 * Draft outlines only: visible in development, never in production, so no article
 * is published under Aarij's name until he writes it.
 */
export const posts: Post[] = [
  {
    slug: 'topic-clusters-organic-traffic-from-zero',
    title: 'How topic clusters grew a new store from zero organic traffic',
    excerpt:
      'The question-led content plan behind 451 monthly organic visits from just 19 pages, and how to build one for your own site.',
    contentHtml: `${draftNote}<h2>Why small sites should answer specific questions</h2><p>Outline: search demand behind shopper questions, and why big retailers leave them unanswered.</p><h2>Building the cluster</h2><p>Outline: keyword research, choosing the pillar, mapping sub-topics.</p><h2>Internal linking that sends readers to the product</h2><p>Outline: link patterns between guides and the product page.</p><h2>Results</h2><p>Outline: 451 monthly visits, top-10 rankings for nine question searches.</p>`,
    cover: {
      path: 'evidence/topic-cluster-model.webp',
      alt: 'Diagram of a topic cluster: a main blog page linked to three sub-topic pages',
    },
    categorySlug: 'content-marketing',
    tags: ['topic clusters', 'content strategy'],
    status: 'draft',
    publishedAt: null,
    updatedAt: '2026-09-30T00:00:00.000Z',
    readingMinutes: 6,
    author: 'Aarij',
    targetKeyword: 'topic clusters',
  },
  {
    slug: 'local-seo-google-business-profile',
    title: 'Local SEO for service businesses: what moved the needle for an architecture firm',
    excerpt:
      'Profile completeness, reviews and local content: the three levers behind 1,389 Business Profile views for an Islamabad firm.',
    contentHtml: `${draftNote}<h2>The Business Profile is your real homepage</h2><p>Outline: categories, services, photos and verification.</p><h2>Earning reviews from real clients</h2><p>Outline: when and how to ask.</p><h2>Local content that ranks</h2><p>Outline: the "top architects" guide and why it works.</p>`,
    cover: {
      path: 'evidence/gbp-archentire-performance.webp',
      alt: 'Google Business Profile performance showing 1,389 profile views',
    },
    categorySlug: 'seo',
    tags: ['local SEO', 'Google Business Profile'],
    status: 'draft',
    publishedAt: null,
    updatedAt: '2026-09-29T00:00:00.000Z',
    readingMinutes: 5,
    author: 'Aarij',
    targetKeyword: 'local SEO for service businesses',
  },
  {
    slug: 'ga4-reports-i-check-every-week',
    title: 'The GA4 reports I check every week, and why',
    excerpt:
      'A short, practical routine for spotting what is growing, what is leaking and where to act next.',
    contentHtml: `${draftNote}<h2>Acquisition: which channels bring engaged users</h2><p>Outline: session source, engagement rate, new vs returning.</p><h2>Landing pages that convert</h2><p>Outline: key events by landing page.</p><h2>Turning numbers into next week’s priorities</h2><p>Outline: the weekly decision checklist.</p>`,
    cover: {
      path: 'evidence/ga4-livebits.webp',
      alt: 'GA4 home dashboard with active users, event count and traffic by country',
    },
    categorySlug: 'analytics',
    tags: ['GA4', 'reporting'],
    status: 'draft',
    publishedAt: null,
    updatedAt: '2026-09-28T00:00:00.000Z',
    readingMinutes: 4,
    author: 'Aarij',
    targetKeyword: 'GA4 reports',
  },
];
