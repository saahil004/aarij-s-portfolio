import { z } from 'zod';
import { mediaRefSchema } from './media';
import { seoFieldsSchema, slugSchema, text } from './text';

const id = z.string().min(1).max(64);
const sortOrder = z.number().int();

export const kpiSchema = z.object({ value: text(24), label: text(120) });
export type Kpi = z.infer<typeof kpiSchema>;

export const galleryItemSchema = mediaRefSchema.extend({ caption: text(200) });
export type GalleryItem = z.infer<typeof galleryItemSchema>;

/** Follows the brief's case study template (§4 of the designer brief). */
export const caseStudySchema = z.object({
  slug: slugSchema,
  title: text(120),
  client: text(80),
  industry: text(60),
  summary: text(280),
  cover: mediaRefSchema,
  services: z.array(text(40)).min(1).max(10),
  challenge: text(1500),
  strategy: text(1500),
  executed: z.array(text(200)).min(1).max(12),
  beforeAfter: z.object({ before: text(300), after: text(300) }).nullable(),
  kpis: z.array(kpiSchema).min(1).max(6),
  impact: text(1200),
  takeaway: text(400),
  gallery: z.array(galleryItemSchema).max(12),
  featured: z.boolean(),
  isPublished: z.boolean(),
  sortOrder,
  seo: seoFieldsSchema.optional(),
});
export type CaseStudy = z.infer<typeof caseStudySchema>;

export const metricSchema = z.object({
  id,
  value: z.number().nonnegative(),
  decimals: z.number().int().min(0).max(2),
  prefix: z.string().max(4),
  suffix: z.string().max(6),
  label: text(40),
  context: text(120),
  /** Internal: which evidence the number came from, so it can be verified. */
  sourceNote: text(200),
  sortOrder,
});
export type Metric = z.infer<typeof metricSchema>;

export const brandSchema = z.object({
  id,
  name: text(80),
  logo: mediaRefSchema,
  url: z.url().nullable(),
  sortOrder,
});
export type Brand = z.infer<typeof brandSchema>;

export const toolCategories = [
  'seo',
  'analytics',
  'ads',
  'crm',
  'platform',
  'content',
  'ai',
] as const;
export type ToolCategory = (typeof toolCategories)[number];
export const toolCategoryLabels: Record<ToolCategory, string> = {
  seo: 'SEO',
  analytics: 'Analytics & Tracking',
  ads: 'Paid & Social',
  crm: 'CRM & Email',
  platform: 'Platforms',
  content: 'Content & Design',
  ai: 'AI Assistants',
};

export const toolSchema = z.object({
  id,
  name: text(60),
  category: z.enum(toolCategories),
  logo: mediaRefSchema.nullable(),
  sortOrder,
});
export type Tool = z.infer<typeof toolSchema>;

export const industrySchema = z.object({ id, name: text(60), sortOrder });
export type Industry = z.infer<typeof industrySchema>;

export const certificationSchema = z.object({
  id,
  name: text(120),
  issuer: text(80),
  year: z.number().int().min(2000).max(2100).nullable(),
  credentialUrl: z.url().nullable(),
  badge: mediaRefSchema.nullable(),
  sortOrder,
});
export type Certification = z.infer<typeof certificationSchema>;

export const testimonialSchema = z.object({
  id,
  quote: text(600),
  author: text(80),
  role: text(80),
  company: text(80),
  avatar: mediaRefSchema.nullable(),
  rating: z.number().int().min(1).max(5),
  isPublished: z.boolean(),
  sortOrder,
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const categorySchema = z.object({
  slug: slugSchema,
  name: text(60),
  description: text(300),
});
export type Category = z.infer<typeof categorySchema>;

export const postStatuses = ['draft', 'scheduled', 'published'] as const;
export type PostStatus = (typeof postStatuses)[number];

export const postSchema = z.object({
  slug: slugSchema,
  title: text(120),
  excerpt: text(300),
  /** Sanitized HTML rendered from the editor. */
  contentHtml: z.string().min(1),
  cover: mediaRefSchema.nullable(),
  categorySlug: slugSchema,
  tags: z.array(text(40)).max(10),
  status: z.enum(postStatuses),
  publishedAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime(),
  readingMinutes: z.number().int().min(1).max(120),
  author: text(80),
  targetKeyword: z.string().trim().max(80).optional(),
  seo: seoFieldsSchema.optional(),
});
export type Post = z.infer<typeof postSchema>;
