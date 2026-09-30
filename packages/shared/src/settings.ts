import { z } from 'zod';
import { mediaRefSchema } from './media';
import { text } from './text';

export const socialPlatforms = [
  'linkedin',
  'x',
  'instagram',
  'facebook',
  'youtube',
  'github',
  'behance',
  'upwork',
  'fiverr',
] as const;

export type SocialPlatform = (typeof socialPlatforms)[number];

export const socialLinkSchema = z.object({
  platform: z.enum(socialPlatforms),
  url: z.url({ protocol: /^https$/ }),
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

export const siteSettingsSchema = z.object({
  /** Short display name used in the logo and greetings. */
  name: text(60),
  /** Full name for structured data; equals `name` until Aarij provides it. */
  fullName: text(120),
  jobTitle: text(120),
  email: z.email().nullable(),
  phone: z.string().trim().max(40).nullable(),
  location: z.string().trim().max(120).nullable(),
  socials: z.array(socialLinkSchema).max(9),
  resume: z.object({ path: z.string().min(1), fileName: z.string().min(1) }).nullable(),
  portrait: mediaRefSchema.nullable(),
  /** Text on the rotating badge. */
  availability: text(60),
  seo: z.object({
    title: text(70),
    titleTemplate: z.string().includes('%s'),
    description: z.string().trim().min(50).max(170),
    keywords: z.array(text(60)).max(20),
  }),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
