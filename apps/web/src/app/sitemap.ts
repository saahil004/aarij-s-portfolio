import type { MetadataRoute } from 'next';
import { getCaseStudies, getCategories, getPosts } from '@/content';
import { sitemapEntries } from '@/lib/sitemap-entries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, posts, categories] = await Promise.all([
    getCaseStudies(),
    getPosts(),
    getCategories(),
  ]);
  return sitemapEntries({
    caseStudies,
    // Drafts never go in the sitemap, even when previews show them.
    posts: posts.filter((post) => post.status === 'published'),
    categorySlugs: categories.map((category) => category.slug),
  });
}
