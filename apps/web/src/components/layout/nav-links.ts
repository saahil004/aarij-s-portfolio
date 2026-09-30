export type NavLink = { href: string; label: string };

export function navLinks({ showBlog }: { showBlog: boolean }): NavLink[] {
  return [
    { href: '/#results', label: 'Results' },
    { href: '/#case-studies', label: 'Case Studies' },
    { href: '/#process', label: 'Process' },
    { href: '/#expertise', label: 'Expertise' },
    ...(showBlog ? [{ href: '/blog', label: 'Blog' }] : []),
    { href: '/#contact', label: 'Contact' },
  ];
}
