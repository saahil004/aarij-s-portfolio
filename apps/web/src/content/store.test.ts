// @vitest-environment node
import type { CaseStudy, Post, SectionRecord, Testimonial } from '@aarij/shared';
import { describe, expect, it } from 'vitest';
import { type ContentData, createContentStore } from './store';

const cover = { path: 'evidence/ga4-livebits.webp', alt: 'GA4 dashboard' };

const caseStudy = (overrides: Partial<CaseStudy>): CaseStudy => ({
  slug: 'livebits',
  title: 'Title',
  client: 'Client',
  industry: 'Industry',
  summary: 'Summary',
  cover,
  services: ['SEO'],
  challenge: 'Challenge',
  strategy: 'Strategy',
  executed: ['Audit'],
  beforeAfter: null,
  kpis: [{ value: '#1', label: 'ranking' }],
  impact: 'Impact',
  takeaway: 'Takeaway',
  gallery: [],
  featured: false,
  isPublished: true,
  sortOrder: 1,
  ...overrides,
});

const post = (overrides: Partial<Post>): Post => ({
  slug: 'post',
  title: 'Post',
  excerpt: 'Excerpt',
  contentHtml: '<p>Body</p>',
  cover: null,
  categorySlug: 'seo',
  tags: [],
  status: 'published',
  publishedAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  readingMinutes: 3,
  author: 'Aarij',
  ...overrides,
});

const testimonial = (overrides: Partial<Testimonial>): Testimonial => ({
  id: 't1',
  quote: 'Great work.',
  author: 'Sara',
  role: 'CMO',
  company: 'Acme',
  avatar: null,
  rating: 5,
  isPublished: true,
  sortOrder: 1,
  ...overrides,
});

const sections: SectionRecord[] = [
  { key: 'ticker', isVisible: true, sortOrder: 2, content: { items: ['SEO'] } },
  { key: 'brands', isVisible: false, sortOrder: 1, content: { title: 'Brands' } },
  {
    key: 'cta',
    isVisible: true,
    sortOrder: 0,
    content: { title: 'Talk', text: 'Text', buttonLabel: 'Go', annotation: 'Now' },
  },
];

const data = {
  sections,
  caseStudies: [
    caseStudy({ slug: 'c-third', sortOrder: 3, featured: true }),
    caseStudy({ slug: 'a-first', sortOrder: 1 }),
    caseStudy({ slug: 'hidden', sortOrder: 2, isPublished: false }),
  ],
  posts: [
    post({ slug: 'old', publishedAt: '2026-01-01T00:00:00.000Z' }),
    post({ slug: 'new', publishedAt: '2026-06-01T00:00:00.000Z', categorySlug: 'analytics' }),
    post({ slug: 'draft', status: 'draft', publishedAt: null }),
  ],
  testimonials: [
    testimonial({ id: 'b', sortOrder: 2 }),
    testimonial({ id: 'a', sortOrder: 1 }),
    testimonial({ id: 'off', isPublished: false }),
  ],
} as unknown as ContentData;

const store = createContentStore(data, { showDrafts: false });
const draftStore = createContentStore(data, { showDrafts: true });

describe('sections', () => {
  it('returns visible sections sorted by sortOrder', async () => {
    const keys = (await store.getSections()).map((s) => s.key);
    expect(keys).toEqual(['cta', 'ticker']);
  });

  it('returns the content of a visible section', async () => {
    expect(await store.getSection('ticker')).toEqual({ items: ['SEO'] });
  });

  it('returns null for a hidden section', async () => {
    expect(await store.getSection('brands')).toBeNull();
  });
});

describe('case studies', () => {
  it('excludes unpublished case studies and sorts by sortOrder', async () => {
    const slugs = (await store.getCaseStudies()).map((c) => c.slug);
    expect(slugs).toEqual(['a-first', 'c-third']);
  });

  it('can return only featured case studies', async () => {
    const slugs = (await store.getCaseStudies({ featuredOnly: true })).map((c) => c.slug);
    expect(slugs).toEqual(['c-third']);
  });

  it('returns null for unknown or unpublished slugs', async () => {
    expect(await store.getCaseStudy('hidden')).toBeNull();
    expect(await store.getCaseStudy('nope')).toBeNull();
    expect((await store.getCaseStudy('a-first'))?.slug).toBe('a-first');
  });
});

describe('posts', () => {
  it('hides drafts and sorts newest first', async () => {
    const slugs = (await store.getPosts()).map((p) => p.slug);
    expect(slugs).toEqual(['new', 'old']);
  });

  it('shows drafts when enabled, after published posts', async () => {
    const slugs = (await draftStore.getPosts()).map((p) => p.slug);
    expect(slugs).toEqual(['new', 'old', 'draft']);
  });

  it('filters by category and limits the result', async () => {
    expect((await store.getPosts({ categorySlug: 'analytics' })).map((p) => p.slug)).toEqual([
      'new',
    ]);
    expect(await store.getPosts({ limit: 1 })).toHaveLength(1);
  });

  it('does not return a draft by slug unless drafts are enabled', async () => {
    expect(await store.getPost('draft')).toBeNull();
    expect((await draftStore.getPost('draft'))?.slug).toBe('draft');
  });
});

describe('testimonials', () => {
  it('returns only published testimonials in order', async () => {
    expect((await store.getTestimonials()).map((t) => t.id)).toEqual(['a', 'b']);
  });
});
