import type { Metadata } from 'next';

export type PageSeo = {
  title: string;
  description: string;
  /** Path relative to the site root; resolved against `metadataBase`. */
  path: string;
  image?: string;
  /** Skip the "%s | Aarij" template (for titles that already carry the brand). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  type?: 'website' | 'article';
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata(page: PageSeo): Metadata {
  const images = page.image ? [{ url: page.image }] : undefined;
  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.path,
      type: page.type ?? 'website',
      locale: 'en_US',
      ...(page.siteName ? { siteName: page.siteName } : {}),
      ...(images ? { images } : {}),
      ...(page.publishedTime ? { publishedTime: page.publishedTime } : {}),
      ...(page.modifiedTime ? { modifiedTime: page.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
    ...(page.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
