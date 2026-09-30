import { getSection, getSiteSettings } from '@/content';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt =
  'Aarij — Digital Marketing Specialist driving traffic, leads and business growth';
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image() {
  const [settings, hero] = await Promise.all([getSiteSettings(), getSection('hero')]);
  return renderOgImage({
    eyebrow: `${settings.name} · ${settings.jobTitle}`,
    title: hero ? `${hero.headline} ${hero.highlight}` : settings.seo.title,
    footer: 'SEO · Lead generation · Analytics · Conversion optimization',
    initial: settings.name.charAt(0),
  });
}
