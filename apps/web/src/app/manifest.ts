import type { MetadataRoute } from 'next';
import { getSiteSettings } from '@/content';
import { siteName } from '@/lib/site-name';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  return {
    name: siteName(settings),
    short_name: settings.name,
    description: settings.seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
