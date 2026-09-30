import type { Category, Post, SectionContent } from '@aarij/shared';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from './Section';

export function BlogPreview({
  content,
  posts,
  categories,
}: {
  content: SectionContent<'blog'>;
  posts: Post[];
  categories: Category[];
}) {
  const [featured, ...rest] = posts;
  if (!featured) return null;
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <Section id="blog" className="bg-grey-100">
      <SectionHeading id="blog-title" title={content.title} intro={content.intro} />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <PostCard
          post={featured}
          categoryName={categoryName(featured.categorySlug)}
          variant="featured"
        />
        {rest.length > 0 && (
          <ul className="flex flex-col gap-6">
            {rest.slice(0, 3).map((post) => (
              <li key={post.slug} className="flex-1">
                <PostCard post={post} categoryName={categoryName(post.categorySlug)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-12 flex justify-center">
        <Button href={content.cta.href}>{content.cta.label}</Button>
      </div>
    </Section>
  );
}
