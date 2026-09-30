import type { MediaKind } from './media-lib.ts';

export type MediaSource = { from: string; to: string; kind: MediaKind };

const portraitCandidates = (name: string) =>
  ['jpg', 'jpeg', 'png', 'webp'].map((extension) => `portrait/${name}.${extension}`);

/**
 * Photos of Aarij. Drop `source-content/portrait/aarij.jpg` (or .jpeg/.png/.webp) in and
 * re-run the import; the site picks it up automatically. `aarij-about` is an optional
 * second photo for the About section. Missing files are skipped.
 */
export const optionalSources: { candidates: string[]; to: string; kind: MediaKind }[] = [
  { candidates: portraitCandidates('aarij'), to: 'portrait/aarij.webp', kind: 'portrait' },
  {
    candidates: portraitCandidates('aarij-about'),
    to: 'portrait/aarij-about.webp',
    kind: 'portrait',
  },
];

const logo = (from: string, to: string): MediaSource => ({ from, to, kind: 'logo' });
const shot = (from: string, to: string): MediaSource => ({ from, to, kind: 'shot' });

const BRANDS = 'brands logo there i work';
const TOOLS = 'Tools Logos of Digital Marketing';
const PREVIEWS = 'Portfolio Images';

/**
 * Every image the site may publish, relative to `source-content/`.
 *
 * Deliberately NOT imported — do not add:
 * - `Leads/HUBSPOT LEADS DASHBOARD.png` — real contacts' names, emails and phone numbers
 * - `Backlinks/High Authority Backlinks Sheet.png` — site logins and plaintext passwords
 * - `Backlinks/paid backlinks.png` — a link vendor's sales page (paid links break Google guidelines)
 * - `brands logo there i work/6.jpg` — duplicate of the Arena Multimedia logo
 */
export const mediaSources: MediaSource[] = [
  // Brands Aarij has worked with
  logo(`${BRANDS}/livebits.png`, 'brands/livebits.webp'),
  logo(`${BRANDS}/trendy-jacket.png`, 'brands/trendy-jacket.webp'),
  logo(`${BRANDS}/mussarat.png`, 'brands/mussarat.webp'),
  logo(`${BRANDS}/archentire.png`, 'brands/archentire.webp'),
  logo(`${BRANDS}/edhi.png`, 'brands/edhi-foundation.webp'),
  logo(`${BRANDS}/12.jpg`, 'brands/charity-right.webp'),
  logo(`${BRANDS}/timezone.png`, 'brands/timezone.webp'),
  logo(`${BRANDS}/arena-multimedia.png`, 'brands/arena-multimedia.webp'),
  logo(`${BRANDS}/imgi_1_default.png`, 'brands/escience-academy.webp'),
  logo(`${BRANDS}/publishingsquad.png`, 'brands/publishing-squad.webp'),
  logo(`${BRANDS}/the-pulp-house-publishing.png`, 'brands/pulp-house-publishing.webp'),
  logo(`${BRANDS}/urabanquill.png`, 'brands/urban-quill.webp'),
  logo(`${BRANDS}/rameen-naturals.png`, 'brands/rameen-naturals.webp'),
  logo(`${BRANDS}/usa-leather-jacket.png`, 'brands/usa-leather-jackets.webp'),
  logo(`${BRANDS}/imgi_1_William-Jacket-Logo.png`, 'brands/william-jacket.webp'),
  logo(`${BRANDS}/the-jacket-maker.png`, 'brands/the-jacket-maker.webp'),
  logo(`${BRANDS}/10.jpg`, 'brands/bullseye.webp'),
  logo(`${BRANDS}/11.jpg`, 'brands/cafe-imran.webp'),
  logo(`${BRANDS}/39.jpg`, 'brands/saltanat.webp'),
  logo(`${BRANDS}/24.jpg`, 'brands/gfxm.webp'),
  logo(`${BRANDS}/analytix.png`, 'brands/analytix.webp'),

  // Marketing tools
  logo(`${TOOLS}/ahrefs.png`, 'tools/ahrefs.webp'),
  logo(`${TOOLS}/semrush.png`, 'tools/semrush.webp'),
  logo(`${TOOLS}/screming-frog.jpeg`, 'tools/screaming-frog.webp'),
  logo(`${TOOLS}/google-search-console.png`, 'tools/google-search-console.webp'),
  logo(`${TOOLS}/surfer-seo.png`, 'tools/surfer-seo.webp'),
  logo(`${TOOLS}/ga4.png`, 'tools/google-analytics.webp'),
  logo(`${TOOLS}/logo-microsoft-clarity.jpg`, 'tools/microsoft-clarity.webp'),
  logo(`${TOOLS}/google-ads.png`, 'tools/google-ads.webp'),
  logo(`${TOOLS}/Meta-Logo.png`, 'tools/meta.webp'),
  logo(`${TOOLS}/tik-tok-shop.jpeg`, 'tools/tiktok-shop.webp'),
  logo(`${TOOLS}/klaviyo.png`, 'tools/klaviyo.webp'),
  logo(`${TOOLS}/canva.png`, 'tools/canva.webp'),
  logo(`${TOOLS}/chatgpt.jpg`, 'tools/chatgpt.webp'),
  logo(`${TOOLS}/claude.png`, 'tools/claude.webp'),

  // Search Console
  shot(
    'Search Console Data/search console performance 1.png',
    'evidence/search-console-12-months-a.webp',
  ),
  shot(
    'Search Console Data/search console performance 2.png',
    'evidence/search-console-12-months-b.webp',
  ),
  shot(
    'Search Console Data/search console performance 3.png',
    'evidence/search-console-12-months-c.webp',
  ),
  shot(`${PREVIEWS}/preview (2).webp`, 'evidence/search-console-6-months-a.webp'),
  shot(`${PREVIEWS}/preview (3).webp`, 'evidence/search-console-6-months-b.webp'),
  shot(`${PREVIEWS}/preview (4).webp`, 'evidence/search-console-3-months-a.webp'),
  shot(`${PREVIEWS}/preview (5).webp`, 'evidence/search-console-3-months-b.webp'),

  // Analytics, commerce and leads
  shot('Google Analytics/google analytics livebits.png', 'evidence/ga4-livebits.webp'),
  shot('Google Analytics/mussarat lingerie.png', 'evidence/ga4-mussarat-lingerie.webp'),
  shot(`${PREVIEWS}/preview.webp`, 'evidence/shopify-store-a-365-days.webp'),
  shot(`${PREVIEWS}/preview (1).webp`, 'evidence/shopify-store-b-365-days.webp'),
  shot(`${PREVIEWS}/preview (6).webp`, 'evidence/uae-leads-dashboard.webp'),

  // Rankings, traffic and authority (Ahrefs / Semrush)
  shot('Rankings/livebits keywords.png', 'evidence/ahrefs-livebits-keywords.webp'),
  shot('Rankings/VANQUISHE KEYWORDS.png', 'evidence/ahrefs-vanquishe-keywords.webp'),
  shot('traffic/TRAFFIC.png', 'evidence/ahrefs-organic-traffic-6-months.webp'),
  shot('traffic/goldfish cracker traffic.png', 'evidence/ahrefs-goldfish-organic-growth.webp'),
  shot('traffic/Screenshot 2026-09-15 192648.png', 'evidence/ahrefs-growth-2-years.webp'),
  shot('Blog Clusters/Blogs.png', 'evidence/ahrefs-goldfish-top-pages.webp'),
  shot(`${PREVIEWS}/preview (7).webp`, 'evidence/semrush-authority-overview.webp'),
  shot(`${PREVIEWS}/preview (10).webp`, 'evidence/semrush-paragon-jackets.webp'),

  // Google results
  shot(`${PREVIEWS}/preview (11).webp`, 'evidence/serp-livebits-custom-web-development.webp'),
  shot(`${PREVIEWS}/preview (12).webp`, 'evidence/serp-livebits-influencer-marketing.webp'),
  shot(`${PREVIEWS}/preview (13).webp`, 'evidence/serp-livebits-b2b-web-design.webp'),
  shot(`${PREVIEWS}/preview (15).webp`, 'evidence/serp-livebits-founder-snippet.webp'),
  shot(`${PREVIEWS}/preview (17).webp`, 'evidence/serp-livebits-short-video-ads.webp'),
  shot(`${PREVIEWS}/preview (14).webp`, 'evidence/serp-mussarat-shapewear.webp'),
  shot(`${PREVIEWS}/preview (16).webp`, 'evidence/serp-archentire-architects.webp'),

  // Performance
  shot('Website Speed/page speed.png', 'evidence/pagespeed-livebits.webp'),
  shot('Website Speed/page speed evoltciti.png', 'evidence/pagespeed-evoltciti.webp'),
  shot(`${PREVIEWS}/preview (8).webp`, 'evidence/pagespeed-scores.webp'),
  shot(`${PREVIEWS}/preview (9).webp`, 'evidence/core-web-vitals-passed.webp'),

  // Paid, social and influencer
  shot('Google Ads PPC/ads rankings.png', 'evidence/google-shopping-red-biker-jacket.webp'),
  shot('Google Ads PPC/TRENDY JACKET ADS.png', 'evidence/google-shopping-trendy-jacket.webp'),
  shot('Google Ads PPC/PAY PER CLICK ADS.png', 'evidence/trendy-jacket-brand-serp.webp'),
  shot('Social media marketing/social media.png', 'evidence/instagram-trendy-jacket.webp'),
  shot(
    'influencer marketing/influencer-marketing-trendy.png',
    'evidence/influencer-trendy-jacket-women.webp',
  ),
  shot(
    'influencer marketing/influencer-marketing-trendy-men.png',
    'evidence/influencer-trendy-jacket-men.webp',
  ),
  shot('Social media marketing/SOCIAL MEDIA Timze Zone.png', 'evidence/instagram-timezone.webp'),

  // Local SEO
  shot('Local SEO/gmbp profile.png', 'evidence/gbp-archentire-profile.webp'),
  shot('Local SEO/gmbp.png', 'evidence/gbp-archentire-performance.webp'),

  // Content strategy
  shot('Blog Clusters/blog cluster.png', 'evidence/topic-cluster-model.webp'),
  shot(
    'Blog Clusters/blog page for converting leads.png',
    'evidence/lead-converting-blog-page.webp',
  ),
  shot('Backlinks/BACKLINKS TRATEGY.png', 'evidence/backlink-strategy-map.webp'),
];
