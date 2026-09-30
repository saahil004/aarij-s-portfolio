// @vitest-environment node
import type { CaseStudy, Post, SiteSettings } from '@aarij/shared';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { breadcrumbJsonLd, jsonLdScriptContent, personJsonLd } from './jsonld';
import { buildRss } from './rss';
import { buildMetadata } from './seo';
import { absoluteUrl, siteUrl } from './site';
import { sitemapEntries } from './sitemap-entries';

afterEach(() => {
  vi.unstubAllEnvs();
});

const settings = {
  name: 'Aarij',
  fullName: 'Aarij',
  jobTitle: 'Digital Marketing Specialist',
  email: null,
  phone: null,
  location: null,
  socials: [],
  resume: null,
  portrait: null,
  availability: 'Open to new roles',
  seo: {
    title: 'Aarij',
    titleTemplate: '%s | Aarij',
    description: 'Digital marketing specialist driving organic traffic, leads and growth.',
    keywords: ['SEO'],
  },
} satisfies SiteSettings;

describe('siteUrl', () => {
  it('prefers NEXT_PUBLIC_SITE_URL without a trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://aarij.com/');
    expect(siteUrl()).toBe('https://aarij.com');
  });

  it('falls back to the Vercel production domain', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    vi.stubEnv('VERCEL_PROJECT_PRODUCTION_URL', 'aarij.vercel.app');
    expect(siteUrl()).toBe('https://aarij.vercel.app');
  });

  it('builds absolute URLs from paths', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://aarij.com');
    expect(absoluteUrl('/case-studies/livebits')).toBe('https://aarij.com/case-studies/livebits');
  });
});

describe('buildMetadata', () => {
  it('sets the canonical URL, Open Graph and Twitter fields', () => {
    const metadata = buildMetadata({
      title: 'Case studies',
      description: 'Growth stories.',
      path: '/case-studies',
      image: '/media/evidence/ga4-livebits.webp',
    });
    expect(metadata.alternates?.canonical).toBe('/case-studies');
    expect(metadata.openGraph).toMatchObject({
      title: 'Case studies',
      url: '/case-studies',
      images: [{ url: '/media/evidence/ga4-livebits.webp' }],
    });
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('falls back to the site social card when a page has no image', () => {
    const metadata = buildMetadata({ title: 'Privacy', description: 'd', path: '/privacy' });
    expect(metadata.openGraph).toMatchObject({
      images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({ images: ['/opengraph-image'] });
  });

  it('can bypass the title template', () => {
    expect(
      buildMetadata({ title: 'Full title', description: 'd', path: '/', absoluteTitle: true })
        .title,
    ).toEqual({
      absolute: 'Full title',
    });
  });

  it('marks pages as noindex when asked', () => {
    expect(
      buildMetadata({ title: 't', description: 'd', path: '/blog', noindex: true }).robots,
    ).toEqual({
      index: false,
      follow: true,
    });
  });
});

describe('JSON-LD', () => {
  it('escapes < so content cannot close the script tag', () => {
    expect(jsonLdScriptContent({ name: '</script><script>' })).not.toContain('</script>');
  });

  it('omits sameAs and email for a person without socials or email', () => {
    const person = personJsonLd(settings, 'https://aarij.com');
    expect(person).not.toHaveProperty('sameAs');
    expect(person).not.toHaveProperty('email');
    expect(person).toMatchObject({
      '@type': 'Person',
      name: 'Aarij',
      jobTitle: 'Digital Marketing Specialist',
    });
  });

  it('lists social profiles as sameAs', () => {
    const person = personJsonLd(
      { ...settings, socials: [{ platform: 'linkedin', url: 'https://linkedin.com/in/aarij' }] },
      'https://aarij.com',
    );
    expect(person.sameAs).toEqual(['https://linkedin.com/in/aarij']);
  });

  it('numbers breadcrumb items from 1 with absolute URLs', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://aarij.com');
    expect(
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Case studies', path: '/case-studies' },
      ]).itemListElement,
    ).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://aarij.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case studies',
        item: 'https://aarij.com/case-studies',
      },
    ]);
  });
});

const post = {
  slug: 'topic-clusters',
  title: 'Topic clusters & <growth>',
  excerpt: 'How clusters work.',
  contentHtml: '<p>Body</p>',
  cover: null,
  categorySlug: 'seo',
  tags: [],
  status: 'published',
  publishedAt: '2026-05-01T00:00:00.000Z',
  updatedAt: '2026-05-02T00:00:00.000Z',
  readingMinutes: 4,
  author: 'Aarij',
} satisfies Post;

describe('sitemapEntries', () => {
  it('includes the home page, case studies, posts and categories', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://aarij.com');
    const urls = sitemapEntries({
      caseStudies: [{ slug: 'livebits' } as CaseStudy],
      posts: [post],
      categorySlugs: ['seo'],
    }).map((entry) => entry.url);
    expect(urls).toEqual([
      'https://aarij.com/',
      'https://aarij.com/case-studies',
      'https://aarij.com/case-studies/livebits',
      'https://aarij.com/privacy',
      'https://aarij.com/blog',
      'https://aarij.com/blog/topic-clusters',
      'https://aarij.com/blog/category/seo',
    ]);
  });

  it('leaves the blog out when there are no posts', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://aarij.com');
    const urls = sitemapEntries({ caseStudies: [], posts: [], categorySlugs: ['seo'] }).map(
      (e) => e.url,
    );
    expect(urls.some((url) => url.includes('/blog'))).toBe(false);
  });
});

describe('buildRss', () => {
  it('renders escaped items with absolute links', () => {
    const xml = buildRss({
      title: 'Aarij — Blog',
      description: 'Insights',
      siteUrl: 'https://aarij.com',
      posts: [post],
    });
    expect(xml).toContain('<title>Topic clusters &amp; &lt;growth&gt;</title>');
    expect(xml).toContain('<link>https://aarij.com/blog/topic-clusters</link>');
    expect(xml).toContain('<pubDate>Fri, 01 May 2026 00:00:00 GMT</pubDate>');
  });
});
