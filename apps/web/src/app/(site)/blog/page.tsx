import type { Metadata } from 'next';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { PostGrid } from '@/components/blog/PostGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { getCategories, getPosts, getSection, getSiteSettings } from '@/content';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteName } from '@/lib/site-name';

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

export async function generateMetadata(): Promise<Metadata> {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  return buildMetadata({
    title: 'Blog: SEO, Content & Analytics Insights',
    description:
      'Practical SEO, content marketing and analytics lessons from real campaigns: what worked, what did not and why.',
    path: '/blog',
    siteName: siteName(settings),
    // An empty blog is thin content; keep it out of the index until the first post.
    noindex: posts.length === 0,
  });
}

export default async function BlogPage() {
  const [posts, categories, section] = await Promise.all([
    getPosts(),
    getCategories(),
    getSection('blog'),
  ]);
  const usedCategories = categories.filter((c) => posts.some((p) => p.categorySlug === c.slug));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title={section?.title ?? 'Blog'} intro={section?.intro}>
        {usedCategories.length > 1 && <CategoryNav categories={usedCategories} />}
      </PageHeader>
      <section aria-label="Articles" className="bg-grey-100 py-16 md:py-24">
        <div className="container-page">
          {posts.length > 0 ? (
            <PostGrid posts={posts} categories={categories} />
          ) : (
            <div className="mx-auto max-w-lg rounded-2xl border border-ink bg-white p-8 text-center md:p-12">
              <h2 className="text-2xl font-medium">Articles are on the way.</h2>
              <p className="mt-3 text-grey-600">
                In the meantime, the case studies show the work in detail, with the evidence
                attached.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/case-studies" variant="solid">
                  Browse case studies
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
