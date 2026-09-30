import { type SectionContent, type Tool, toolCategories, toolCategoryLabels } from '@aarij/shared';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';
import { isDarkColor } from '@/lib/color';
import { Section } from './Section';

/** Wordmark logos speak for themselves; icon-only logos get the tool name beside them. */
function ToolChip({ tool }: { tool: Tool }) {
  if (!tool.logo) {
    return (
      <span className="flex h-12 items-center rounded-xl border border-ink bg-white px-4 text-sm font-medium">
        {tool.name}
      </span>
    );
  }
  const logo = media(tool.logo.path);
  const isWordmark = logo.width / logo.height >= 1.6;
  const dark = isDarkColor(logo.bg);
  return (
    <span
      className={cn(
        'flex h-12 items-center gap-2.5 rounded-xl border border-ink px-3',
        dark ? 'text-white' : 'text-ink',
      )}
      style={{ backgroundColor: logo.bg ?? '#ffffff' }}
    >
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={isWordmark ? tool.name : ''}
        sizes="120px"
        className={cn('w-auto object-contain', isWordmark ? 'h-6 max-w-28' : 'h-7')}
      />
      {!isWordmark && <span className="pr-1 text-sm font-medium">{tool.name}</span>}
    </span>
  );
}

export function Tools({ content, tools }: { content: SectionContent<'tools'>; tools: Tool[] }) {
  const groups = toolCategories
    .map((category) => ({ category, items: tools.filter((t) => t.category === category) }))
    .filter((group) => group.items.length > 0);
  if (groups.length === 0) return null;

  return (
    <Section id="tools">
      <SectionHeading id="tools-title" title={content.title} intro={content.intro} />
      <dl className="mt-14 border-t border-ink">
        {groups.map(({ category, items }) => (
          <div
            key={category}
            className="grid gap-4 border-b border-ink/15 py-6 md:grid-cols-[13rem_1fr] md:items-center"
          >
            <dt className="text-base font-medium">{toolCategoryLabels[category]}</dt>
            <dd>
              <ul className="flex flex-wrap items-center gap-3">
                {items.map((tool) => (
                  <li key={tool.id}>
                    <ToolChip tool={tool} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
