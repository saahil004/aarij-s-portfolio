import type { ReactNode } from 'react';
import { ContactSection } from '@/components/contact/ContactSection';
import { Header } from '@/components/layout/Header';
import { navLinks } from '@/components/layout/nav-links';
import { RotatingBadge } from '@/components/layout/RotatingBadge';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SkipLink } from '@/components/layout/SkipLink';
import { MotionLayer } from '@/components/motion/MotionLayer';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { getPosts, getSection, getSiteSettings } from '@/content';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, cta, posts] = await Promise.all([
    getSiteSettings(),
    getSection('cta'),
    getPosts({ limit: 1 }),
  ]);
  const showBlog = posts.length > 0;

  return (
    <MotionProvider>
      <SkipLink />
      <Header settings={settings} links={navLinks({ showBlog })} />
      <main id="main">{children}</main>
      <div className="bg-night text-white">
        {cta && <ContactSection content={cta} settings={settings} />}
        <SiteFooter settings={settings} showBlog={showBlog} />
      </div>
      <RotatingBadge text={settings.availability} />
      <MotionLayer />
    </MotionProvider>
  );
}
