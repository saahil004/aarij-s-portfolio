import type { Brand, SectionContent } from '@aarij/shared';
import { LogoTile } from '@/components/ui/LogoTile';
import { cn } from '@/lib/cn';

function Row({ brands, duplicate }: { brands: Brand[]; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        'flex shrink-0 items-center gap-4 pr-4',
        duplicate ? 'motion-reduce:hidden' : 'motion-reduce:flex-wrap motion-reduce:justify-center',
      )}
    >
      {brands.map((brand) => (
        <li key={brand.id}>
          <LogoTile logo={brand.logo} className="h-16 w-36 p-3" />
        </li>
      ))}
    </ul>
  );
}

export function Brands({
  content,
  brands,
}: {
  content: SectionContent<'brands'>;
  brands: Brand[];
}) {
  if (brands.length === 0) return null;
  return (
    <section
      aria-labelledby="brands-title"
      className="overflow-hidden border-y border-ink bg-yellow-100 py-6"
    >
      <h2 id="brands-title" className="sr-only">
        {content.title}
      </h2>
      <div data-marquee className="animate-marquee-slow flex w-max motion-reduce:w-full">
        <Row brands={brands} />
        <Row brands={brands} duplicate />
      </div>
    </section>
  );
}
