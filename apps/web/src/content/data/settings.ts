import type { SiteSettings } from '@aarij/shared';

/**
 * Contact details, socials, resume and portrait are intentionally empty until Aarij
 * supplies them (see docs/content-todo.md). The UI hides anything that is missing.
 */
export const settings: SiteSettings = {
  name: 'Aarij',
  fullName: 'Aarij',
  jobTitle: 'Digital Marketing Specialist',
  email: null,
  phone: null,
  location: null,
  socials: [],
  resume: null,
  portrait: null,
  availability: "Open to new roles · Let's talk",
  seo: {
    title: 'Aarij — Digital Marketing Specialist | SEO, Leads & Growth',
    titleTemplate: '%s | Aarij, Digital Marketing Specialist',
    description:
      'Digital marketing specialist driving organic traffic, qualified leads and measurable growth through SEO, content, analytics and conversion optimization.',
    keywords: [
      'digital marketing specialist',
      'SEO specialist',
      'lead generation',
      'technical SEO',
      'content marketing',
      'Google Analytics 4',
      'conversion rate optimization',
      'e-commerce SEO',
      'local SEO',
      'Google Ads',
    ],
  },
};
