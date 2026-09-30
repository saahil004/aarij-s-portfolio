import { z } from 'zod';
import { stripControlChars } from './text';

export const leadIntents = ['hiring', 'project', 'other'] as const;
export type LeadIntent = (typeof leadIntents)[number];
export const leadIntentLabels: Record<LeadIntent, string> = {
  hiring: "I'm hiring",
  project: 'Business project',
  other: 'Something else',
};

export const serviceOptions = [
  'seo',
  'lead-generation',
  'content',
  'analytics',
  'cro',
  'ppc',
  'social',
  'ecommerce',
] as const;
export type ServiceOption = (typeof serviceOptions)[number];
export const serviceLabels: Record<ServiceOption, string> = {
  seo: 'SEO',
  'lead-generation': 'Lead generation',
  content: 'Content marketing',
  analytics: 'Analytics & tracking',
  cro: 'Conversion optimization',
  ppc: 'Google Ads / PPC',
  social: 'Social media',
  ecommerce: 'E-commerce growth',
};

export const budgetRanges = ['under-1k', '1k-3k', '3k-10k', '10k-plus', 'not-sure'] as const;
export type BudgetRange = (typeof budgetRanges)[number];
export const budgetLabels: Record<BudgetRange, string> = {
  'under-1k': 'Under $1k / month',
  '1k-3k': '$1k – $3k / month',
  '3k-10k': '$3k – $10k / month',
  '10k-plus': '$10k+ / month',
  'not-sure': 'Not sure yet',
};

const cleanText = (min: number, max: number, message: string) =>
  z
    .string({ error: message })
    .transform(stripControlChars)
    .pipe(
      z.string().trim().min(min, message).max(max, `Please keep this under ${max} characters.`),
    );

const optionalText = (max: number) =>
  z
    .string()
    .transform(stripControlChars)
    .pipe(z.string().trim().max(max, `Please keep this under ${max} characters.`))
    .optional()
    .transform((value) => value || undefined);

const optionalWebsite = z
  .string()
  .trim()
  .max(300, 'Please keep this under 300 characters.')
  .optional()
  .transform((value, ctx) => {
    if (!value) return undefined;
    const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    try {
      const url = new URL(candidate);
      if (!/^[^.\s]+(\.[^.\s]+)+$/.test(url.hostname)) throw new Error('Invalid hostname');
      return url.toString();
    } catch {
      ctx.addIssue({ code: 'custom', message: 'Please enter a valid website address.' });
      return z.NEVER;
    }
  });

const baseFields = {
  name: cleanText(2, 100, 'Please enter your name.'),
  email: z
    .string({ error: 'Please enter a valid email address.' })
    .trim()
    .pipe(z.email({ error: 'Please enter a valid email address.' }).max(254)),
  message: cleanText(10, 3000, 'Please add a short message (at least 10 characters).'),
  consent: z.literal(true, { error: 'Please confirm you agree to be contacted.' }),
};

export const leadInputSchema = z.discriminatedUnion(
  'intent',
  [
    z.object({
      intent: z.literal('hiring'),
      ...baseFields,
      company: cleanText(1, 120, 'Please enter your company.'),
      role: optionalText(120),
      location: optionalText(120),
    }),
    z.object({
      intent: z.literal('project'),
      ...baseFields,
      website: optionalWebsite,
      services: z
        .array(z.enum(serviceOptions), { error: 'Please choose at least one service.' })
        .min(1, 'Please choose at least one service.')
        .max(serviceOptions.length),
      budget: z.enum(budgetRanges, { error: 'Please choose a budget range.' }),
    }),
    z.object({ intent: z.literal('other'), ...baseFields }),
  ],
  { error: 'Please choose what brings you here.' },
);

export type LeadInput = z.infer<typeof leadInputSchema>;
export type LeadFormInput = z.input<typeof leadInputSchema>;

/** What the browser sends to the API: the lead plus anti-spam signals. */
export const leadSubmissionSchema = z.object({
  lead: leadInputSchema,
  meta: z.object({
    /** Honeypot: real users leave it empty. */
    hp: z.string().max(200),
    /** Milliseconds between form render and submit. */
    elapsedMs: z.number().int().nonnegative().max(86_400_000),
    turnstileToken: z.string().max(2048).optional(),
  }),
});

export type LeadSubmission = z.input<typeof leadSubmissionSchema>;

/** First error message per top-level field, e.g. `{ email: 'Please enter…' }`. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? String(issue.path[0]) : '_form';
    if (!(key in errors)) errors[key] = issue.message;
  }
  return errors;
}
