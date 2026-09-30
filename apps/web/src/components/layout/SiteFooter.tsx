import type { SiteSettings } from '@aarij/shared';
import Link from 'next/link';
import { SocialIcon, socialLabels } from '@/components/ui/icons';

export function SiteFooter({ settings, showBlog }: { settings: SiteSettings; showBlog: boolean }) {
  const links = [
    { href: '/case-studies', label: 'Case Studies' },
    ...(showBlog ? [{ href: '/blog', label: 'Blog' }] : []),
    { href: '/privacy', label: 'Privacy' },
  ];
  return (
    <footer className="container-page">
      <div className="flex flex-col gap-5 border-t border-white/25 py-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {settings.fullName}. {settings.jobTitle}.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-white"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
            </ul>
          </nav>
          {settings.socials.length > 0 && (
            <ul className="flex gap-2">
              {settings.socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    aria-label={`${socialLabels[social.platform]} (opens in a new tab)`}
                    className="flex size-8 items-center justify-center rounded-md border border-white/40 transition-colors hover:border-white hover:text-white"
                  >
                    <SocialIcon platform={social.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
