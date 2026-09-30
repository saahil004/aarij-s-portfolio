import type { SiteSettings } from '@aarij/shared';
import { absoluteUrl } from './site';

type JsonLd = Record<string, unknown>;

/** Serializes JSON-LD for a <script> tag; escaping `<` prevents breaking out of it. */
export function jsonLdScriptContent(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function personJsonLd(settings: SiteSettings, url: string): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${url}/#person`,
    name: settings.fullName,
    jobTitle: settings.jobTitle,
    url,
    description: settings.seo.description,
    knowsAbout: settings.seo.keywords,
    ...(settings.email ? { email: `mailto:${settings.email}` } : {}),
    ...(settings.portrait ? { image: absoluteUrl(`/media/${settings.portrait.path}`) } : {}),
    ...(settings.socials.length > 0 ? { sameAs: settings.socials.map((s) => s.url) } : {}),
  };
}

/** Home page graph: the profile page, the website and the person it is about. */
export function homeJsonLd(settings: SiteSettings, url: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}/#profile`,
        url: `${url}/`,
        name: settings.seo.title,
        mainEntity: { '@id': `${url}/#person` },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url: `${url}/`,
        name: `${settings.name} — ${settings.jobTitle}`,
        inLanguage: 'en',
      },
      personJsonLd(settings, url),
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd & {
  itemListElement: JsonLd[];
} {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(article: {
  type: 'Article' | 'BlogPosting';
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName: string;
  siteUrl: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': article.type,
    headline: article.headline,
    description: article.description,
    mainEntityOfPage: absoluteUrl(article.path),
    ...(article.image ? { image: absoluteUrl(article.image) } : {}),
    ...(article.datePublished ? { datePublished: article.datePublished } : {}),
    ...(article.dateModified ? { dateModified: article.dateModified } : {}),
    author: { '@type': 'Person', name: article.authorName, url: `${article.siteUrl}/` },
  };
}
