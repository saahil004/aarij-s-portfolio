import type { Metadata, Viewport } from 'next';
import { Caveat, Instrument_Sans } from 'next/font/google';
import type { ReactNode } from 'react';
import { getPosts, getSiteSettings } from '@/content';
import { siteUrl } from '@/lib/site';
import { siteName } from '@/lib/site-name';
import './globals.css';

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  weight: ['500', '600'],
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export async function generateMetadata(): Promise<Metadata> {
  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts({ limit: 1 })]);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: settings.seo.title, template: settings.seo.titleTemplate },
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    applicationName: siteName(settings),
    authors: [{ name: settings.fullName }],
    creator: settings.fullName,
    openGraph: { type: 'website', siteName: siteName(settings), locale: 'en_US' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
    ...(posts.length > 0 ? { alternates: { types: { 'application/rss+xml': '/rss.xml' } } } : {}),
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${hand.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
