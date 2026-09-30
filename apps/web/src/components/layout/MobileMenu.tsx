'use client';

import { Menu, X } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import type { NavLink } from './nav-links';

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 items-center justify-center rounded-lg border border-ink bg-white"
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease }}
            className="absolute inset-x-0 top-16 border-b border-ink bg-white"
          >
            <nav aria-label="Mobile">
              <m.ul
                className="container-page flex flex-col py-3"
                initial="hidden"
                animate="shown"
                variants={{ shown: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
              >
                {links.map((link) => (
                  <m.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, x: -12 }, shown: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.3, ease }}
                    className="border-b border-ink/10 last:border-b-0"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-3.5 text-lg font-medium"
                    >
                      {link.label}
                    </Link>
                  </m.li>
                ))}
              </m.ul>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
