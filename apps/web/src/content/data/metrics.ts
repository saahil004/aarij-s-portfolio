import type { Metric } from '@aarij/shared';

/** Every number is taken from a screenshot in `source-content/`; `sourceNote` says which. */
export const metrics: Metric[] = [
  {
    id: 'search-impressions',
    value: 181,
    decimals: 0,
    prefix: '',
    suffix: 'K',
    label: 'Search impressions',
    context: 'One client site in 12 months',
    sourceNote:
      'Search Console, 12 months: 181K impressions, 8.51K clicks, avg. position 9.2 — evidence/search-console-12-months-b.webp',
    sortOrder: 1,
  },
  {
    id: 'organic-clicks',
    value: 8.5,
    decimals: 1,
    prefix: '',
    suffix: 'K',
    label: 'Organic clicks',
    context: 'Same site, average position 9.2',
    sourceNote:
      'Search Console, 12 months: 8.51K clicks — evidence/search-console-12-months-b.webp',
    sortOrder: 2,
  },
  {
    id: 'ranking-keywords',
    value: 548,
    decimals: 0,
    prefix: '',
    suffix: '',
    label: 'Ranking keywords',
    context: 'US e-commerce store (Vanquishe)',
    sourceNote: 'Ahrefs organic keywords, 29 Aug 2026 — evidence/ahrefs-vanquishe-keywords.webp',
    sortOrder: 3,
  },
  {
    id: 'lead-growth',
    value: 300,
    decimals: 0,
    prefix: '+',
    suffix: '%',
    label: 'More leads',
    context: 'UAE client, year over year',
    sourceNote:
      'Leads dashboard: 56 total leads, +300% from last year — evidence/uae-leads-dashboard.webp',
    sortOrder: 4,
  },
  {
    id: 'sales-growth',
    value: 1300,
    decimals: 0,
    prefix: '+',
    suffix: '%',
    label: 'E-commerce sales',
    context: 'Shopify store, last 365 days vs. prior period',
    sourceNote:
      'Shopify: Rs 2.71M total sales, +1.3K% vs. previous period; 314 orders — evidence/shopify-store-b-365-days.webp',
    sortOrder: 5,
  },
  {
    id: 'top-ranking',
    value: 1,
    decimals: 0,
    prefix: '#',
    suffix: '',
    label: 'Google ranking',
    context: 'for "cloud hosting" (LiveBits)',
    sourceNote:
      'Ahrefs, LiveBits keywords: "cloud hosting" position 1 — evidence/ahrefs-livebits-keywords.webp',
    sortOrder: 6,
  },
];
