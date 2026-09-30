import type { SiteSettings } from '@aarij/shared';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SocialIcon, socialLabels } from '@/components/ui/icons';
import { MobileMenu } from './MobileMenu';
import type { NavLink } from './nav-links';

export function Header({ settings, links }: { settings: SiteSettings; links: NavLink[] }) {
  return (
    <header data-site-header className="sticky top-0 z-40 border-b border-ink bg-white">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-medium tracking-tight">
          {settings.name}
          <span className="sr-only">, {settings.jobTitle} — home</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.8125rem]">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {settings.socials.map((social) => (
            <a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`${socialLabels[social.platform]} (opens in a new tab)`}
              className="hidden size-8 items-center justify-center rounded-md border border-ink transition-colors hover:bg-yellow-50 sm:flex"
            >
              <SocialIcon platform={social.platform} className="size-4" />
            </a>
          ))}
          {settings.socials.length === 0 && (
            <Button href="/#contact" className="min-h-9 px-3.5 py-2" magnetic>
              Let&apos;s Talk
            </Button>
          )}
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
