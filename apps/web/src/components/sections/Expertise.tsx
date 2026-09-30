import type { SectionContent } from '@aarij/shared';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from './Section';

export function Expertise({ content }: { content: SectionContent<'expertise'> }) {
  return (
    <Section id="expertise" className="bg-blue-50">
      <SectionHeading id="expertise-title" title={content.title} intro={content.intro} />
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {content.groups.map((group) => (
          <li
            key={group.label}
            data-expertise-card
            className="rounded-2xl border border-ink bg-white p-6 md:p-8"
          >
            <h3>
              <Pill tone={group.tone}>{group.label}</Pill>
            </h3>
            <ul className="mt-7 space-y-3.5">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-[0.5em] size-1.5 shrink-0 rotate-45 bg-ink"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex flex-col items-center gap-5 text-center">
        <p className="text-lead">{content.closingText}</p>
        <Button href={content.cta.href}>{content.cta.label}</Button>
      </div>
    </Section>
  );
}
