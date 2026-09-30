import type { SectionContent } from '@aarij/shared';
import Image from 'next/image';
import { Pill } from '@/components/ui/Pill';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { media } from '@/content/media';
import { Section } from './Section';

export function BeforeAfter({ content }: { content: SectionContent<'beforeAfter'> }) {
  if (content.items.length === 0) return null;
  return (
    <Section id="before-after" className="bg-yellow-50">
      <SectionHeading id="before-after-title" title={content.title} intro={content.intro} />
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {content.items.map((item) => {
          const image = media(item.image.path);
          return (
            <li
              key={item.title}
              data-before-after-card
              className="flex flex-col overflow-hidden rounded-2xl border border-ink bg-white"
            >
              <div className="border-b border-ink p-3">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23rem, 92vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <dl className="grid gap-3 text-sm">
                  <div className="grid grid-cols-[4.75rem_1fr] items-start gap-3">
                    <dt>
                      <Pill tone="grey">Before</Pill>
                    </dt>
                    <dd className="pt-1 text-grey-600">{item.before}</dd>
                  </div>
                  <div className="grid grid-cols-[4.75rem_1fr] items-start gap-3">
                    <dt>
                      <Pill tone="sun">After</Pill>
                    </dt>
                    <dd className="pt-1 font-medium">{item.after}</dd>
                  </div>
                </dl>
                <p className="mt-auto text-xs leading-relaxed text-grey-600">{item.caption}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
