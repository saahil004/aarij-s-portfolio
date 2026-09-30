import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { PostGrid } from '@/components/blog/PostGrid';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { getCategories, getCategory, getPosts, getSiteSettings } from '@/content';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteName } from '@/lib/site-name';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);
  return categories
    .filter((category) => posts.some((post) => post.categorySlug === category.slug))
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [category, settings] = await Promise.all([getCategory(slug), getSiteSettings()]);
  if (!category) return {};
  return buildMetadata({
    title: `${category.name} articles`,
    description: category.description,
    path: `/blog/category/${category.slug}`,
    siteName: siteName(settings),
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, posts, categories] = await Promise.all([
    getCategory(slug),
    getPosts({ categorySlug: slug }),
    getCategories(),
  ]);
  if (!category || posts.length === 0) notFound();

  const allPosts = await getPosts();
  const usedCategories = categories.filter((c) => allPosts.some((p) => p.categorySlug === c.slug));
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: category.name, path: `/blog/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader crumbs={crumbs} title={category.name} intro={category.description}>
        <CategoryNav categories={usedCategories} activeSlug={category.slug} />
      </PageHeader>
      <section aria-label={`${category.name} articles`} className="bg-grey-100 py-16 md:py-24">
        <div className="container-page">
          <PostGrid posts={posts} categories={categories} />
        </div>
      </section>
    </>
  );
}
