import type { ContentData } from '../store';
import { brands } from './brands';
import { caseStudies } from './case-studies';
import { metrics } from './metrics';
import { certifications, industries, testimonials } from './people';
import { categories, posts } from './posts';
import { sections } from './sections';
import { settings } from './settings';
import { tools } from './tools';

/** Local content until Phase 4 moves it into Supabase. */
export const contentData: ContentData = {
  settings,
  sections,
  metrics,
  caseStudies,
  brands,
  tools,
  industries,
  certifications,
  testimonials,
  categories,
  posts,
};
