import type { Tool, ToolCategory } from '@aarij/shared';

const tool = (name: string, category: ToolCategory, logo: string | null = null) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  category,
  logo: logo ? { path: `tools/${logo}.webp`, alt: `${name} logo` } : null,
});

/** From the brief's tech stack plus the tool logos Aarij supplied. */
export const tools: Tool[] = [
  tool('Ahrefs', 'seo', 'ahrefs'),
  tool('Semrush', 'seo', 'semrush'),
  tool('Screaming Frog', 'seo', 'screaming-frog'),
  tool('Google Search Console', 'seo', 'google-search-console'),
  tool('Surfer SEO', 'seo', 'surfer-seo'),
  tool('Rank Math', 'seo'),
  tool('Yoast SEO', 'seo'),
  tool('Google Analytics 4', 'analytics', 'google-analytics'),
  tool('Google Tag Manager', 'analytics'),
  tool('Microsoft Clarity', 'analytics', 'microsoft-clarity'),
  tool('Google Ads', 'ads', 'google-ads'),
  tool('Meta Ads', 'ads', 'meta'),
  tool('TikTok Shop', 'ads', 'tiktok-shop'),
  tool('HubSpot', 'crm'),
  tool('Klaviyo', 'crm', 'klaviyo'),
  tool('WordPress', 'platform'),
  tool('Shopify', 'platform'),
  tool('Next.js', 'platform'),
  tool('Canva', 'content', 'canva'),
  tool('ChatGPT', 'ai', 'chatgpt'),
  tool('Claude', 'ai', 'claude'),
].map((item, index) => ({ ...item, sortOrder: index + 1 }));
