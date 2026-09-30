import type { Post } from '@aarij/shared';
import Image from 'next/image';
import Link from 'next/link';
import { Pill } from '@/components/ui/Pill';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/format';

function PostMeta({ post, categoryName }: { post: Post; categoryName: string }) {
  return (
    <p className="flex flex-wrap items-center gap-2 text-[0.6875rem] font-medium tracking-[0.08em] text-grey-600 uppercase">
      {post.status === 'published' && post.publishedAt ? (
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      ) : (
        <Pill tone="sun" className="py-1 tracking-normal normal-case">
          Draft
        </Pill>
      )}
      <span aria-hidden="true">·</span>
      <span>{categoryName}</span>
    </p>
  );
}

/** Meeko blog card. `featured`: image on top; `compact`: image on the left. */
export function PostCard({
  post,
  categoryName,
  variant = 'compact',
  headingLevel = 'h3',
}: {
  post: Post;
  categoryName: string;
  variant?: 'featured' | 'compact';
  headingLevel?: 'h2' | 'h3';
}) {
  const cover = post.cover ? { ...media(post.cover.path), alt: post.cover.alt } : null;
  const Heading = headingLevel;
  const featured = variant === 'featured';

  return (
    <article
      data-post-card
      className={cn(
        'group relative flex h-full overflow-hidden rounded-2xl border border-ink bg-white transition-transform duration-300 hover:-translate-y-1',
        featured ? 'flex-col' : 'flex-row',
      )}
    >
      <div
        className={cn(
          'relative shrink-0 overflow-hidden bg-sky',
          featured ? 'aspect-[16/10] w-full border-b border-ink' : 'w-[38%] border-r border-ink',
        )}
      >
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes={featured ? '(min-width: 1024px) 34rem, 92vw' : '(min-width: 1024px) 13rem, 38vw'}
            className="object-cover object-top"
          />
        )}
      </div>
      <div
        className={cn('flex flex-1 flex-col gap-3', featured ? 'p-6 md:p-7' : 'justify-center p-5')}
      >
        {!featured && <PostMeta post={post} categoryName={categoryName} />}
        <Heading
          className={cn(
            'font-medium tracking-[-0.01em]',
            featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
          )}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </Heading>
        {featured && (
          <>
            <p className="text-sm leading-relaxed text-grey-600">{post.excerpt}</p>
            <div className="mt-auto border-t border-ink pt-4">
              <PostMeta post={post} categoryName={categoryName} />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
