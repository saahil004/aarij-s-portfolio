import type { Category } from '@aarij/shared';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export function CategoryNav({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  const items = [
    { key: 'all', name: 'All posts', href: '/blog', active: activeSlug === undefined },
    ...categories.map((category) => ({
      key: category.slug,
      name: category.name,
      href: `/blog/category/${category.slug}`,
      active: category.slug === activeSlug,
    })),
  ];
  return (
    <nav aria-label="Blog categories" className="mt-8">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'inline-flex rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors',
                item.active ? 'bg-ink text-white' : 'bg-white hover:bg-yellow-50',
              )}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
