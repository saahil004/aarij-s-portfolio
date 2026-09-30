import { describe, expect, it } from 'vitest';
import { caseStudySchema, metricSchema, postSchema, testimonialSchema } from '../src/collections';
import { mediaRefSchema } from '../src/media';
import { parseSection, sectionKeys, sectionSchemas } from '../src/sections';
import { siteSettingsSchema } from '../src/settings';

const cover = { path: 'evidence/gsc-performance-1.webp', alt: 'Search Console performance' };

const caseStudy = {
  slug: 'livebits',
  title: 'Ranking a hosting brand for high-intent keywords',
  client: 'LiveBits',
  industry: 'Web hosting',
  summary: 'SEO growth for a hosting company.',
  cover,
  services: ['Technical SEO'],
  challenge: 'Low visibility.',
  strategy: 'Keyword mapping.',
  executed: ['Audit'],
  beforeAfter: null,
  kpis: [{ value: '#1', label: 'for "cloud hosting"' }],
  impact: 'More qualified traffic.',
  takeaway: 'Intent beats volume.',
  gallery: [],
  featured: true,
  isPublished: true,
  sortOrder: 1,
};

describe('mediaRefSchema', () => {
  it('rejects an empty alt text', () => {
    expect(mediaRefSchema.safeParse({ path: 'a.webp', alt: '' }).success).toBe(false);
  });
});

describe('siteSettingsSchema', () => {
  it('rejects a social link without a valid url', () => {
    const result = siteSettingsSchema.shape.socials.safeParse([
      { platform: 'linkedin', url: 'linkedin' },
    ]);
    expect(result.success).toBe(false);
  });
});

describe('sections', () => {
  it('defines a schema for every section key', () => {
    for (const key of sectionKeys) expect(sectionSchemas[key]).toBeDefined();
  });

  it('parses ticker content', () => {
    expect(parseSection('ticker', { items: ['SEO', 'CRO'] })).toEqual({ items: ['SEO', 'CRO'] });
  });

  it('rejects content that does not match the section', () => {
    expect(() => parseSection('ticker', { items: [] })).toThrow();
  });

  it('limits hero proof metrics to two', () => {
    const result = sectionSchemas.hero.shape.proofMetricIds.safeParse(['a', 'b', 'c']);
    expect(result.success).toBe(false);
  });

  it('limits hero stickers to two', () => {
    const result = sectionSchemas.hero.shape.stickers.safeParse(['a', 'b', 'c']);
    expect(result.success).toBe(false);
  });
});

describe('collections', () => {
  it('accepts a complete case study', () => {
    expect(caseStudySchema.safeParse(caseStudy).success).toBe(true);
  });

  it('requires kebab-case case study slugs', () => {
    expect(caseStudySchema.safeParse({ ...caseStudy, slug: 'Live Bits' }).success).toBe(false);
  });

  it('requires a source note on metrics', () => {
    const metric = {
      id: 'm1',
      value: 181,
      decimals: 0,
      prefix: '',
      suffix: 'K',
      label: 'x',
      context: 'y',
      sortOrder: 1,
    };
    expect(metricSchema.safeParse(metric).success).toBe(false);
    expect(metricSchema.safeParse({ ...metric, sourceNote: 'GSC' }).success).toBe(true);
  });

  it('restricts post status', () => {
    expect(postSchema.shape.status.safeParse('archived').success).toBe(false);
    expect(postSchema.shape.status.safeParse('scheduled').success).toBe(true);
  });

  it('limits testimonial ratings to 1-5', () => {
    expect(testimonialSchema.shape.rating.safeParse(6).success).toBe(false);
    expect(testimonialSchema.shape.rating.safeParse(5).success).toBe(true);
  });
});
