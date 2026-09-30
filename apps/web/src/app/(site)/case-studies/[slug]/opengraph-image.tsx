import { getCaseStudies, getCaseStudy, getSiteSettings } from '@/content';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = 'Case study by Aarij, digital marketing specialist';
export const size = ogSize;
export const contentType = 'image/png';
export const dynamicParams = false;

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [caseStudy, settings] = await Promise.all([getCaseStudy(slug), getSiteSettings()]);
  // The default OG font has no ★ glyph, so spell ratings out.
  const kpis =
    caseStudy?.kpis
      .slice(0, 2)
      .map((kpi) => `${kpi.value.replace('★', ' stars')} ${kpi.label}`.replace(/\s+/g, ' ')) ?? [];
  return renderOgImage({
    eyebrow: `Case study · ${caseStudy?.client ?? settings.name}`,
    title: caseStudy?.title ?? settings.seo.title,
    footer: kpis.join('   ·   '),
    initial: settings.name.charAt(0),
  });
}
