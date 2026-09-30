import type { SectionContent } from '@aarij/shared';
import { ChevronRight } from 'lucide-react';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { Section } from './Section';

/** Tints deepen along the funnel, ending on yellow for "Growth". */
const stageTones = ['bg-white', 'bg-blue-50', 'bg-sky', 'bg-yellow-50', 'bg-yellow-100'];

export function Funnel({ content }: { content: SectionContent<'funnel'> }) {
  const lastIndex = content.stages.length - 1;
  return (
    <Section id="growth">
      <SectionHeading id="growth-title" title={content.title} intro={content.intro} />
      <div data-funnel-wrap className="relative mt-14 overflow-hidden rounded-2xl">
        {/* Sweeps across the stages as the section scrolls by (motion layer). */}
        <span
          aria-hidden="true"
          data-funnel-progress
          className="absolute inset-x-0 top-0 z-10 h-1.5 origin-left bg-blue motion-reduce:hidden"
        />
        <ol
          data-funnel
          className="grid overflow-hidden rounded-2xl border border-ink md:grid-cols-5"
        >
          {content.stages.map((stage, index) => (
            <li
              key={stage.name}
              data-funnel-stage
              className={cn(
                'relative flex flex-col gap-5 p-6 md:min-h-72 lg:p-7',
                index > 0 && 'border-t border-ink md:border-t-0 md:border-l',
                stageTones[index % stageTones.length],
              )}
            >
              <div className="flex items-center justify-between">
                <Pill tone="white">{stage.capability}</Pill>
                {index < lastIndex && (
                  <ChevronRight aria-hidden="true" className="size-5 text-ink/60" />
                )}
              </div>
              <p className="text-3xl font-medium tracking-[-0.03em]">{stage.name}</p>
              <p className="mt-auto text-sm leading-relaxed text-grey-600">{stage.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
