import type { SectionContent } from '@aarij/shared';
import Image from 'next/image';
import { Pill, type PillTone } from '@/components/ui/Pill';
import { media } from '@/content/media';
import { Section } from './Section';

const pillTones: PillTone[] = ['blue', 'yellow', 'sky', 'grey'];

export function About({ content }: { content: SectionContent<'about'> }) {
  const photo = content.photo ? { ...media(content.photo.path), alt: content.photo.alt } : null;
  return (
    <Section id="about" className="border-t border-ink">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div>
          <h2 id="about-title" className="text-title">
            {content.title}
          </h2>
          {content.highlights.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {content.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <Pill tone={pillTones[index % pillTones.length]}>{highlight}</Pill>
                </li>
              ))}
            </ul>
          )}
          {photo && (
            <div className="relative mt-10 aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-ink">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 24rem, 92vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="space-y-5 text-lead text-grey-600 [&>p:first-child]:text-ink">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
