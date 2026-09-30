import type { SectionContent } from '@aarij/shared';
import { Check } from 'lucide-react';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from './Section';

export function Framework({ content }: { content: SectionContent<'framework'> }) {
  return (
    <Section id="framework">
      <SectionHeading id="framework-title" title={content.title} intro={content.intro} />

      <div className="relative mt-14">
        <span
          aria-hidden="true"
          data-framework-line
          className="absolute top-[1.125rem] right-0 left-0 hidden h-px origin-left bg-ink md:block"
        />
        <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {content.phases.map((phase) => (
            <li key={phase.range} data-framework-phase>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-full border border-ink bg-yellow"
                >
                  <span className="size-2 rounded-full bg-ink" />
                </span>
                <Pill>{phase.range}</Pill>
              </div>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.02em]">{phase.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-grey-600">
                {phase.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 rounded-2xl border border-ink bg-blue-50 p-6 md:p-10">
        <h3 className="text-2xl font-medium tracking-[-0.02em] md:text-3xl">
          {content.outcomesTitle}
        </h3>
        <ul className="mt-8 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {content.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-ink bg-white"
              >
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
