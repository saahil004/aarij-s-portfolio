import type { CaseStudy, SectionContent } from '@aarij/shared';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Section } from './Section';

export function CaseStudies({
  content,
  caseStudies,
}: {
  content: SectionContent<'caseStudies'>;
  caseStudies: CaseStudy[];
}) {
  if (caseStudies.length === 0) return null;
  return (
    <Section id="case-studies" className="bg-night text-white">
      <SectionHeading
        id="case-studies-title"
        title={content.title}
        intro={content.intro}
        tone="dark"
      >
        <Button href={content.cta.href} variant="light">
          {content.cta.label}
        </Button>
      </SectionHeading>
      {/* Right-hand cards sit lower, like Meeko's staggered work grid. */}
      <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16 md:pb-24 md:[&>li:nth-child(even)]:translate-y-24">
        {caseStudies.map((caseStudy) => (
          <li key={caseStudy.slug}>
            <CaseStudyCard caseStudy={caseStudy} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
