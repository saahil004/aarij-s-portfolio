// @vitest-environment node
import {
  brandSchema,
  caseStudySchema,
  categorySchema,
  certificationSchema,
  industrySchema,
  metricSchema,
  postSchema,
  sectionSchemas,
  siteSettingsSchema,
  testimonialSchema,
  toolSchema,
} from '@aarij/shared';
import { describe, expect, it } from 'vitest';
import { contentData } from './data';
import { hasMedia } from './media';

/** Collects every `{ path, alt }` media reference anywhere in a value. */
function mediaPaths(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) {
    for (const item of value) mediaPaths(item, found);
  } else if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if (typeof record.path === 'string' && typeof record.alt === 'string') found.push(record.path);
    for (const child of Object.values(record)) mediaPaths(child, found);
  }
  return found;
}

describe('local content data', () => {
  it('has valid site settings', () => {
    expect(() => siteSettingsSchema.parse(contentData.settings)).not.toThrow();
  });

  it('has content matching each section schema', () => {
    for (const section of contentData.sections) {
      const result = sectionSchemas[section.key].safeParse(section.content);
      expect(result.error?.issues ?? [], section.key).toEqual([]);
    }
  });

  it('has valid collection items', () => {
    const checks = [
      [metricSchema, contentData.metrics],
      [caseStudySchema, contentData.caseStudies],
      [brandSchema, contentData.brands],
      [toolSchema, contentData.tools],
      [industrySchema, contentData.industries],
      [certificationSchema, contentData.certifications],
      [testimonialSchema, contentData.testimonials],
      [categorySchema, contentData.categories],
      [postSchema, contentData.posts],
    ] as const;
    for (const [schema, items] of checks) {
      for (const item of items) {
        const result = schema.safeParse(item);
        expect(result.error?.issues ?? [], JSON.stringify(item).slice(0, 80)).toEqual([]);
      }
    }
  });

  it('only references media that exists', () => {
    const missing = mediaPaths(contentData).filter((path) => !hasMedia(path));
    expect(missing).toEqual([]);
  });

  it('uses unique case study and post slugs', () => {
    const slugs = contentData.caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const postSlugs = contentData.posts.map((p) => p.slug);
    expect(new Set(postSlugs).size).toBe(postSlugs.length);
  });

  it('assigns every post to an existing category', () => {
    const categories = new Set(contentData.categories.map((c) => c.slug));
    for (const post of contentData.posts) expect(categories.has(post.categorySlug)).toBe(true);
  });

  it('includes every section key exactly once', () => {
    const keys = contentData.sections.map((s) => s.key).sort();
    expect(keys).toEqual(Object.keys(sectionSchemas).sort());
  });
});
