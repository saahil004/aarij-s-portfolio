import type { SectionContent } from '@aarij/shared';
import { cn } from '@/lib/cn';

function Row({ items, duplicate }: { items: string[]; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={cn(
        'flex shrink-0 items-center',
        duplicate ? 'motion-reduce:hidden' : 'motion-reduce:flex-wrap motion-reduce:justify-center',
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center text-lg font-medium whitespace-nowrap md:text-xl"
        >
          <span className="px-5 md:px-7">{item}</span>
          <span aria-hidden="true">—</span>
        </li>
      ))}
    </ul>
  );
}

/** Scrolling strip of services (Meeko's marquee). The duplicate row makes the loop seamless. */
export function Ticker({ content }: { content: SectionContent<'ticker'> }) {
  return (
    <div className="overflow-hidden border-b border-ink bg-yellow-50 py-4 md:py-5">
      <div data-marquee className="animate-marquee flex w-max motion-reduce:w-full">
        <Row items={content.items} />
        <Row items={content.items} duplicate />
      </div>
    </div>
  );
}
