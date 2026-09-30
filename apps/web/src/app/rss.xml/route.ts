import { getPosts, getSection, getSiteSettings } from '@/content';
import { buildRss } from '@/lib/rss';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export async function GET() {
  const [settings, posts, blog] = await Promise.all([
    getSiteSettings(),
    getPosts(),
    getSection('blog'),
  ]);
  const xml = buildRss({
    title: `${settings.name} — ${blog?.title ?? 'Blog'}`,
    description: settings.seo.description,
    siteUrl: siteUrl(),
    posts: posts.filter((post) => post.status === 'published'),
  });
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
