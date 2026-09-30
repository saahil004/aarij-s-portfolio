import type {
  Brand,
  CaseStudy,
  Category,
  Certification,
  Industry,
  Metric,
  Post,
  SiteSettings,
  Testimonial,
  Tool,
} from '@aarij/shared';

/** Collections the homepage fetches once and hands to its sections. */
export type HomeData = {
  settings: SiteSettings;
  metrics: Metric[];
  featuredCaseStudies: CaseStudy[];
  brands: Brand[];
  tools: Tool[];
  industries: Industry[];
  certifications: Certification[];
  testimonials: Testimonial[];
  posts: Post[];
  categories: Category[];
};
