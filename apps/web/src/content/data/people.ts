import type { Certification, Industry, Testimonial } from '@aarij/shared';

/** Derived from the brands Aarij has worked with (see brands.ts). */
export const industries: Industry[] = [
  'E-commerce & Retail',
  'Fashion & Lifestyle',
  'Web & IT Services',
  'Architecture & Real Estate',
  'Publishing',
  'Education',
  'Non-profit',
  'Food & Hospitality',
  'Health & Beauty',
].map((name, index) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  sortOrder: index + 1,
}));

/** Empty until Aarij supplies genuine certifications — the section hides itself. */
export const certifications: Certification[] = [];

/** Empty until Aarij supplies genuine testimonials (with permission) — the section hides itself. */
export const testimonials: Testimonial[] = [];
