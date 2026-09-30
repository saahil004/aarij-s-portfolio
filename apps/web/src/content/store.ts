import type {
  Brand,
  CaseStudy,
  Category,
  Certification,
  Industry,
  Metric,
  Post,
  SectionContent,
  SectionKey,
  SectionRecord,
  SiteSettings,
  Testimonial,
  Tool,
} from '@aarij/shared';

/** Everything the public site reads. Shaped like the Supabase tables (spec §5). */
export type ContentData = {
  settings: SiteSettings;
  sections: SectionRecord[];
  metrics: Metric[];
  caseStudies: CaseStudy[];
  brands: Brand[];
  tools: Tool[];
  industries: Industry[];
  certifications: Certification[];
  testimonials: Testimonial[];
  categories: Category[];
  posts: Post[];
};

export type ContentStoreOptions = {
  /** Include draft/scheduled posts (development previews). */
  showDrafts: boolean;
};

const bySortOrder = <T extends { sortOrder: number }>(a: T, b: T) => a.sortOrder - b.sortOrder;

const postTime = (post: Post) => Date.parse(post.publishedAt ?? post.updatedAt);

function comparePosts(a: Post, b: Post): number {
  const aLive = a.status === 'published';
  const bLive = b.status === 'published';
  if (aLive !== bLive) return aLive ? -1 : 1;
  return postTime(b) - postTime(a);
}

export function createContentStore(data: ContentData, options: ContentStoreOptions) {
  const visiblePosts = () =>
    data.posts.filter((post) => options.showDrafts || post.status === 'published');

  return {
    async getSiteSettings(): Promise<SiteSettings> {
      return data.settings;
    },

    async getSections(): Promise<SectionRecord[]> {
      return data.sections.filter((section) => section.isVisible).sort(bySortOrder);
    },

    async getSection<K extends SectionKey>(key: K): Promise<SectionContent<K> | null> {
      const section = data.sections.find((s) => s.key === key && s.isVisible);
      return section ? (section.content as SectionContent<K>) : null;
    },

    async getMetrics(): Promise<Metric[]> {
      return [...data.metrics].sort(bySortOrder);
    },

    async getCaseStudies(filter: { featuredOnly?: boolean } = {}): Promise<CaseStudy[]> {
      return data.caseStudies
        .filter((c) => c.isPublished && (!filter.featuredOnly || c.featured))
        .sort(bySortOrder);
    },

    async getCaseStudy(slug: string): Promise<CaseStudy | null> {
      return data.caseStudies.find((c) => c.slug === slug && c.isPublished) ?? null;
    },

    async getBrands(): Promise<Brand[]> {
      return [...data.brands].sort(bySortOrder);
    },

    async getTools(): Promise<Tool[]> {
      return [...data.tools].sort(bySortOrder);
    },

    async getIndustries(): Promise<Industry[]> {
      return [...data.industries].sort(bySortOrder);
    },

    async getCertifications(): Promise<Certification[]> {
      return [...data.certifications].sort(bySortOrder);
    },

    async getTestimonials(): Promise<Testimonial[]> {
      return data.testimonials.filter((t) => t.isPublished).sort(bySortOrder);
    },

    async getCategories(): Promise<Category[]> {
      return data.categories;
    },

    async getCategory(slug: string): Promise<Category | null> {
      return data.categories.find((c) => c.slug === slug) ?? null;
    },

    async getPosts(filter: { categorySlug?: string; limit?: number } = {}): Promise<Post[]> {
      const posts = visiblePosts()
        .filter((post) => !filter.categorySlug || post.categorySlug === filter.categorySlug)
        .sort(comparePosts);
      return filter.limit === undefined ? posts : posts.slice(0, filter.limit);
    },

    async getPost(slug: string): Promise<Post | null> {
      return visiblePosts().find((post) => post.slug === slug) ?? null;
    },
  };
}

export type ContentStore = ReturnType<typeof createContentStore>;
