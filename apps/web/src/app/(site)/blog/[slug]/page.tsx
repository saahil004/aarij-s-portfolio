import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Pill } from '@/components/ui/Pill';
import { getCategory, getPost, getPosts, getSiteSettings, media } from '@/content';
import { formatDate } from '@/lib/format';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteUrl } from '@/lib/site';
import { siteName } from '@/lib/site-name';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()]);
  if (!post) return {};
  return buildMetadata({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    siteName: siteName(settings),
    noindex: post.status !== 'published',
    ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()]);
  if (!post) notFound();

  const category = await getCategory(post.categorySlug);
  const cover = post.cover ? { ...media(post.cover.path), alt: post.cover.alt } : null;
  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ];

  return (
    <article>
      <JsonLd
        data={articleJsonLd({
          type: 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          path,
          ...(cover ? { image: cover.src } : {}),
          ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
          dateModified: post.updatedAt,
          authorName: settings.fullName,
          siteUrl: siteUrl(),
        })}
      />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <header className="border-b border-ink bg-grid">
        <div className="container-page py-16 md:py-24">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-grey-600">
            {category && <Pill tone="sky">{category.name}</Pill>}
            {post.status === 'published' && post.publishedAt ? (
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            ) : (
              <Pill tone="sun">Draft</Pill>
            )}
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-5 max-w-[22ch] text-display">{post.title}</h1>
          <p className="mt-6 max-w-2xl text-lead text-grey-600">{post.excerpt}</p>
        </div>
      </header>

      {cover && (
        <figure className="container-page mt-14">
          <div className="mx-auto max-w-4xl rounded-2xl border border-ink bg-white p-3">
            <Image
              src={cover.src}
              width={cover.width}
              height={cover.height}
              alt={cover.alt}
              sizes="(min-width: 1024px) 56rem, 100vw"
              priority
              className="h-auto w-full rounded-lg"
            />
          </div>
        </figure>
      )}

      <div className="container-page py-14 md:py-20">
        <div
          className="prose-content mx-auto max-w-2xl"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: post HTML is sanitized when saved
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <footer className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-between gap-4 border-t border-ink pt-6">
          <p className="text-sm text-grey-600">
            Written by <span className="font-medium text-ink">{post.author}</span>,{' '}
            {settings.jobTitle}
          </p>
          {post.tags.length > 0 && (
            <ul aria-label="Tags" className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Pill tone="grey">{tag}</Pill>
                </li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    </article>
  );
}
