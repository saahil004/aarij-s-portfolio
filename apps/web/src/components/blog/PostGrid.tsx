import type { Category, Post } from '@aarij/shared';
import { PostCard } from './PostCard';

export function PostGrid({ posts, categories }: { posts: Post[]; categories: Category[] }) {
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard
            post={post}
            categoryName={categoryName(post.categorySlug)}
            variant="featured"
            headingLevel="h2"
          />
        </li>
      ))}
    </ul>
  );
}
