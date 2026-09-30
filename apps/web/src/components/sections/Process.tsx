import type { SectionContent } from '@aarij/shared';
import { Button } from '@/components/ui/Button';
import { processIcons } from '@/components/ui/icons';
import { RichText } from '@/components/ui/RichText';
import { cn } from '@/lib/cn';
import { Section } from './Section';

const cardTones = ['bg-blue-50', 'bg-yellow-50', 'bg-grey-100', 'bg-sky', 'bg-yellow-100'];

/** Heading stays put while the step cards stack on top of each other (CSS sticky). */
export function Process({ content }: { content: SectionContent<'process'> }) {
  return (
    <Section id="process">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <h2 id="process-title" className="max-w-[15ch] text-title">
            {content.title}
          </h2>
          <p className="mt-5 max-w-md text-lead text-grey-600">
            <RichText text={content.intro} />
          </p>
          <div className="mt-8">
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        </div>

        <ol className="flex flex-col gap-6">
          {content.steps.map((step, index) => {
            const Icon = processIcons[step.icon];
            return (
              <li
                key={step.title}
                data-process-card
                className={cn(
                  'rounded-2xl border border-ink p-6 md:sticky md:min-h-[17rem] md:p-8',
                  cardTones[index % cardTones.length],
                )}
                style={{ top: `calc(6.5rem + ${index * 1.25}rem)` }}
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full border border-ink bg-white">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <span aria-hidden="true" className="text-sm text-grey-600 tabular-nums">
                    ({String(index + 1).padStart(2, '0')})
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-grey-600">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
