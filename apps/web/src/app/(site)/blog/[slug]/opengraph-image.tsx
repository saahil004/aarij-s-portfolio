import { getPost, getPosts, getSiteSettings } from '@/content';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Article by Aarij, digital marketing specialist';
export const size = ogSize;
export const contentType = 'image/png';
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSiteSettings()]);
  return renderOgImage({
    eyebrow: `${settings.name} · Blog`,
    title: post?.title ?? settings.seo.title,
    footer: post ? `${post.readingMinutes} min read` : settings.jobTitle,
    initial: settings.name.charAt(0),
  });
}
