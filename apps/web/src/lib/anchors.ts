/**
 * The decoded `#hash` a link points to when it targets a section of the page at
 * `currentHref`; null for links to other pages, other sites, or without a hash.
 */
export function samePageHash(href: string, currentHref: string): string | null {
  const current = new URL(currentHref);
  const target = new URL(href, current);
  if (target.origin !== current.origin || target.pathname !== current.pathname) return null;
  if (!target.hash || target.hash === '#') return null;
  return decodeURIComponent(target.hash);
}
