import type { SiteSettings } from '@aarij/shared';

export function siteName(settings: SiteSettings): string {
  return `${settings.name} — ${settings.jobTitle}`;
}
