import { z } from 'zod';

/** Required, trimmed single-purpose text with a length cap. */
export const text = (max: number) => z.string().trim().min(1).max(max);

/** Removes ASCII control characters except tab, line feed and carriage return. */
export function stripControlChars(value: string): string {
  let out = '';
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)) out += char;
  }
  return out;
}

export const slugSchema = z
  .string()
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens.');

export const seoFieldsSchema = z.object({
  title: z.string().trim().max(70).optional(),
  description: z.string().trim().max(170).optional(),
});

export type SeoFields = z.infer<typeof seoFieldsSchema>;
