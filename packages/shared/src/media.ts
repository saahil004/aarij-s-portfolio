import { z } from 'zod';

/** Reference to an uploaded/optimized image. `path` is relative to the media root. */
export const mediaRefSchema = z.object({
  path: z.string().min(1).max(300),
  alt: z.string().trim().min(1, 'Alt text is required.').max(200),
});

export type MediaRef = z.infer<typeof mediaRefSchema>;
