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

/**
 * The site-wide card from app/opengraph-image.tsx. A page's `openGraph` object replaces its
 * parent's, which would drop that file-based image, so pages reference it explicitly.
 * Segments with their own opengraph-image file (case studies, posts) still override this.
 */
const defaultImage = { url: '/opengraph-image', width: 1200, height: 630 };

export function buildMetadata(page: PageSeo): Metadata {
  const images = page.image ? [{ url: page.image }] : [defaultImage];
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
      images,
      ...(page.publishedTime ? { publishedTime: page.publishedTime } : {}),
      ...(page.modifiedTime ? { modifiedTime: page.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: images.map((image) => image.url),
    },
    ...(page.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
