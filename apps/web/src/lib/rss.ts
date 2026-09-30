import type { Post } from '@aarij/shared';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildRss({
  title,
  description,
  siteUrl,
  posts,
}: {
  title: string;
  description: string;
  siteUrl: string;
  posts: Post[];
}): string {
  const items = posts
    .map((post) => {
      const link = `${siteUrl}/blog/${post.slug}`;
      const date = post.publishedAt ?? post.updatedAt;
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        `<pubDate>${new Date(date).toUTCString()}</pubDate>`,
        '</item>',
      ].join('');
    })
    .join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>',
    `<title>${escapeXml(title)}</title>`,
    `<link>${siteUrl}/blog</link>`,
    `<description>${escapeXml(description)}</description>`,
    '<language>en</language>',
    `<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items,
    '</channel></rss>',
  ].join('');
}
