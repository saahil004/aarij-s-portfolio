import { z } from 'zod';
import { mediaRefSchema } from './media';
import { text } from './text';

export const tones = ['blue', 'yellow', 'grey', 'sky'] as const;
export const toneSchema = z.enum(tones);
export type Tone = z.infer<typeof toneSchema>;

export const processIcons = ['search', 'strategy', 'rocket', 'chart', 'refresh'] as const;
export type ProcessIcon = (typeof processIcons)[number];

export const ctaSchema = z.object({ label: text(40), href: text(300) });
export type Cta = z.infer<typeof ctaSchema>;

/** Title + intro pair used by most sections. Intros support `**bold**` emphasis. */
const heading = { title: text(140), intro: text(400) };

export const sectionSchemas = {
  hero: z.object({
    eyebrow: text(60),
    headline: text(120),
    highlight: text(30),
    subheadline: text(300),
    stickers: z.array(text(30)).max(2),
    /** Metric ids shown as floating proof badges around the portrait. */
    proofMetricIds: z.array(text(64)).max(2),
    primaryCta: ctaSchema,
    resumeCtaLabel: text(40),
  }),
  ticker: z.object({ items: z.array(text(40)).min(1).max(20) }),
  funnel: z.object({
    ...heading,
    stages: z
      .array(z.object({ name: text(30), capability: text(30), description: text(200) }))
      .min(3)
      .max(6),
  }),
  expertise: z.object({
    ...heading,
    groups: z
      .array(
        z.object({ label: text(40), tone: toneSchema, items: z.array(text(80)).min(1).max(8) }),
      )
      .min(1)
      .max(6),
    closingText: text(120),
    cta: ctaSchema,
  }),
  results: z.object({ ...heading }),
  caseStudies: z.object({ ...heading, cta: ctaSchema }),
  brands: z.object({ title: text(80) }),
  process: z.object({
    ...heading,
    cta: ctaSchema,
    steps: z
      .array(z.object({ title: text(40), description: text(260), icon: z.enum(processIcons) }))
      .min(3)
      .max(6),
  }),
  framework: z.object({
    ...heading,
    phases: z
      .array(z.object({ range: text(30), title: text(40), items: z.array(text(80)).min(1).max(8) }))
      .min(1)
      .max(4),
    outcomesTitle: text(80),
    outcomes: z.array(text(160)).min(1).max(8),
  }),
  tools: z.object({ ...heading }),
  beforeAfter: z.object({
    ...heading,
    items: z
      .array(
        z.object({
          title: text(80),
          image: mediaRefSchema,
          before: text(120),
          after: text(120),
          caption: text(200),
        }),
      )
      .max(6),
  }),
  industries: z.object({ ...heading, certificationsTitle: text(80) }),
  testimonials: z.object({ ...heading }),
  about: z.object({
    title: text(120),
    paragraphs: z.array(text(600)).min(1).max(4),
    highlights: z.array(text(60)).max(8),
    photo: mediaRefSchema.nullable(),
  }),
  blog: z.object({ ...heading, cta: ctaSchema }),
  cta: z.object({
    title: text(80),
    text: text(240),
    buttonLabel: text(30),
    annotation: text(40),
  }),
} as const;

export type SectionKey = keyof typeof sectionSchemas;
export const sectionKeys = Object.keys(sectionSchemas) as SectionKey[];
export type SectionContent<K extends SectionKey> = z.infer<(typeof sectionSchemas)[K]>;

export type SectionRecord = {
  [K in SectionKey]: { key: K; isVisible: boolean; sortOrder: number; content: SectionContent<K> };
}[SectionKey];

export function parseSection<K extends SectionKey>(key: K, content: unknown): SectionContent<K> {
  return sectionSchemas[key].parse(content) as SectionContent<K>;
}
