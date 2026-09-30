import { contentData } from './data';
import { createContentStore } from './store';

/**
 * The only way pages read content. Phase 4 swaps the data source to Supabase
 * behind these same functions.
 */
const store = createContentStore(contentData, {
  showDrafts: process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === '1',
});

export const {
  getSiteSettings,
  getSections,
  getSection,
  getMetrics,
  getCaseStudies,
  getCaseStudy,
  getBrands,
  getTools,
  getIndustries,
  getCertifications,
  getTestimonials,
  getCategories,
  getCategory,
  getPosts,
  getPost,
} = store;

export { hasMedia, type MediaInfo, media } from './media';
