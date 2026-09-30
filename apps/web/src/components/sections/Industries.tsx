import type { Certification, Industry, SectionContent } from '@aarij/shared';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import { Pill, type PillTone } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/content/media';
import { Section } from './Section';

const pillTones: PillTone[] = ['blue', 'yellow', 'grey', 'sky'];

export function Industries({
  content,
  industries,
  certifications,
}: {
  content: SectionContent<'industries'>;
  industries: Industry[];
  certifications: Certification[];
}) {
  if (industries.length === 0 && certifications.length === 0) return null;
  return (
    <Section id="industries" className="border-t border-ink">
      <SectionHeading id="industries-title" title={content.title} intro={content.intro} />

      {industries.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-3">
          {industries.map((industry, index) => (
            <li key={industry.id}>
              <Pill tone={pillTones[index % pillTones.length]} className="px-4 py-2.5 text-sm">
                {industry.name}
              </Pill>
            </li>
          ))}
        </ul>
      )}

      {certifications.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-medium">{content.certificationsTitle}</h3>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certification) => {
              const badge = certification.badge ? media(certification.badge.path) : null;
              return (
                <li
                  key={certification.id}
                  className="flex items-center gap-4 rounded-2xl border border-ink bg-white p-4"
                >
                  {badge && certification.badge ? (
                    <Image
                      src={badge.src}
                      width={badge.width}
                      height={badge.height}
                      alt={certification.badge.alt}
                      className="size-12 object-contain"
                    />
                  ) : (
                    <BadgeCheck aria-hidden="true" className="size-8 shrink-0 text-blue" />
                  )}
                  <div>
                    <p className="font-medium">
                      {certification.credentialUrl ? (
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:underline"
                        >
                          {certification.name}
                        </a>
                      ) : (
                        certification.name
                      )}
                    </p>
                    <p className="text-sm text-grey-600">
                      {certification.issuer}
                      {certification.year ? `, ${certification.year}` : ''}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Section>
  );
}
