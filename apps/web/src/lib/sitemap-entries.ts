import type { CaseStudy, Post } from '@aarij/shared';
import type { MetadataRoute } from 'next';
import { absoluteUrl } from './site';

export function sitemapEntries({
  caseStudies,
  posts,
  categorySlugs,
}: {
  caseStudies: Pick<CaseStudy, 'slug'>[];
  posts: Post[];
  categorySlugs: string[];
}): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/case-studies'), changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((caseStudy) => ({
      url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: absoluteUrl('/privacy'), changeFrequency: 'yearly', priority: 0.2 },
  ];

  if (posts.length === 0) return entries;

  const usedCategories = new Set(posts.map((post) => post.categorySlug));
  return [
    ...entries,
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.7 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...categorySlugs
      .filter((slug) => usedCategories.has(slug))
      .map((slug) => ({
        url: absoluteUrl(`/blog/category/${slug}`),
        changeFrequency: 'weekly' as const,
        priority: 0.4,
      })),
  ];
}
