import type { CaseStudy } from '@aarij/shared';

/**
 * Case studies follow the brief's template. Facts and numbers come from the evidence
 * screenshots; narrative wording should be confirmed by Aarij (docs/content-todo.md).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'livebits',
    title: 'Ranking a digital agency for high-intent service searches',
    client: 'LiveBits',
    industry: 'Web & Digital Services',
    summary:
      'SEO and content for a web, hosting and digital agency: a citation in Google’s AI Overview, page-one rankings for core services and a #1 position for "cloud hosting".',
    cover: {
      path: 'evidence/serp-livebits-custom-web-development.webp',
      alt: 'Google results for "custom web development" with LiveBits cited in the AI Overview and listed in the organic results',
    },
    services: [
      'Technical SEO',
      'Keyword mapping',
      'Service page optimization',
      'Topic clusters',
      'GA4 tracking',
      'HubSpot CRM',
    ],
    challenge:
      'LiveBits sells web development, hosting and digital marketing services in a crowded market where freelance marketplaces and large agencies dominate the results. Its service pages needed to rank for the searches buyers actually use, and enquiries needed to be tracked from the first click to a lead in the CRM.',
    strategy:
      'Map every core service to a primary keyword and search intent, rebuild the service pages around those intents, support them with helpful content and internal links, and connect GA4 with HubSpot so rankings could be tied to real enquiries.',
    executed: [
      'Keyword research and intent mapping for each service line',
      'On-page optimization of service pages: titles, headings, copy and FAQs',
      'Topic clusters with internal links pointing to the money pages',
      'Technical fixes for speed and crawlability',
      'GA4 and HubSpot tracking so every enquiry is attributed to its channel',
    ],
    beforeAfter: null,
    kpis: [
      { value: '#1', label: 'Google position for "cloud hosting"' },
      { value: 'AI Overview', label: 'citation for "custom web development"' },
      { value: '34', label: 'ranking keywords tracked in Ahrefs' },
      { value: '1.4K', label: 'active users in 60 days (GA4)' },
    ],
    impact:
      'LiveBits now appears for high-intent searches such as "custom web development", "b2b web design", "influencer marketing services" and "short video ads", including a citation in Google’s AI Overview. Organic visitors arrive from Pakistan, Singapore and the United States, and each enquiry is tracked into the CRM.',
    takeaway:
      'Ranking for intent beats ranking for volume: service pages built around what buyers search for bring enquiries, not just visits.',
    gallery: [
      {
        path: 'evidence/serp-livebits-b2b-web-design.webp',
        alt: 'Google results for "b2b web design" with LiveBits in the top three organic results',
        caption: '"b2b web design": LiveBits ranks in the top three organic results.',
      },
      {
        path: 'evidence/ahrefs-livebits-keywords.webp',
        alt: 'Ahrefs keyword table for LiveBits listing 34 keywords, including position 1 for "cloud hosting"',
        caption:
          'Ahrefs: 34 ranking keywords, including #1 for "cloud hosting" and "logo animation services" (US).',
      },
      {
        path: 'evidence/serp-livebits-influencer-marketing.webp',
        alt: 'Google results for "influencer marketing services" in Karachi with LiveBits on page one',
        caption: 'Page-one visibility for "influencer marketing services" in Karachi.',
      },
      {
        path: 'evidence/serp-livebits-founder-snippet.webp',
        alt: 'Google featured snippet about the LiveBits founder, sourced from livebits.pk',
        caption:
          'A featured snippet for the founder’s personal-brand search, sourced from livebits.pk.',
      },
      {
        path: 'evidence/ga4-livebits.webp',
        alt: 'GA4 home dashboard for LiveBits showing 1.4K active users and 7.3K events over 60 days',
        caption:
          'GA4: 1.4K active users over 60 days, with Pakistan, Singapore and the US as the top countries.',
      },
      {
        path: 'evidence/pagespeed-livebits.webp',
        alt: 'PageSpeed Insights for LiveBits: performance 88, accessibility 86, best practices 100, SEO 92',
        caption: 'PageSpeed Insights: 100 for Best Practices and 92 for SEO.',
      },
    ],
    featured: true,
    isPublished: true,
    sortOrder: 1,
    seo: {
      title: 'LiveBits SEO Case Study: AI Overview Citation & #1 Rankings',
      description:
        'How service-page SEO earned LiveBits an AI Overview citation, page-one rankings for core services and a #1 Google position for "cloud hosting".',
    },
  },
  {
    slug: 'mussarat-lingerie',
    title: 'Growing a lingerie brand through category SEO and social',
    client: 'Mussarat Lingerie',
    industry: 'E-commerce & Fashion',
    summary:
      'Collection-page SEO and social-led growth for a Pakistani lingerie brand: a top-three Google ranking for "shapewear in pakistan" and +120% weekly active users.',
    cover: {
      path: 'evidence/serp-mussarat-shapewear.webp',
      alt: 'Google results for "shapewear in pakistan" with Mussarat Lingerie ranking third',
    },
    services: [
      'E-commerce SEO',
      'Collection page optimization',
      'Social media marketing',
      'GA4 analytics',
    ],
    challenge:
      'Mussarat Lingerie competes with marketplaces and larger fashion retailers for category searches. The brand needed traffic that converts: shoppers searching for specific product types, not only people who already knew its name.',
    strategy:
      'Optimize collection pages for category keywords with local intent, and pair search with social campaigns that send shoppers straight to the best-selling collections, all measured in GA4.',
    executed: [
      'Category keyword research with local intent, such as "shapewear in pakistan"',
      'Collection page titles, meta descriptions and on-page copy',
      'Social media campaigns linking to the top collections',
      'GA4 reporting on channels, landing pages and new users',
    ],
    beforeAfter: null,
    kpis: [
      { value: 'Top 3', label: 'on Google for "shapewear in pakistan"' },
      { value: '+120%', label: 'weekly active users (1.9K)' },
      { value: '+202%', label: 'sessions from organic social' },
      { value: '+147.8%', label: 'events week over week (18K)' },
    ],
    impact:
      'The shapewear collection ranks in the top three for its main category search. In a single week the store reached 1.9K active users and 1.8K new users, organic social sessions rose 202%, and collection pages such as seamless bras and shapewear each drew more than a thousand views.',
    takeaway:
      'Category pages are the money pages of e-commerce SEO. Optimizing them for how shoppers search locally brings buyers, not browsers.',
    gallery: [
      {
        path: 'evidence/ga4-mussarat-lingerie.webp',
        alt: 'GA4 dashboard for Mussarat Lingerie: 1.9K active users (+120%), 18K events (+147.8%), 1.8K new users (+124%)',
        caption:
          'GA4, last 7 days: 1.9K active users (+120%), 18K events (+147.8%) and organic social sessions up 202%.',
      },
    ],
    featured: true,
    isPublished: true,
    sortOrder: 2,
    seo: {
      title: 'Mussarat Lingerie: E-commerce SEO & Social Growth Case Study',
      description:
        'Collection-page SEO and social campaigns that took Mussarat Lingerie into Google’s top three for "shapewear in pakistan" and grew weekly users 120%.',
    },
  },
  {
    slug: 'archentire',
    title: 'Local SEO for an Islamabad architecture firm',
    client: 'Archentire',
    industry: 'Architecture & Real Estate',
    summary:
      'Google Business Profile optimization and local content for an architecture, interiors and town-planning firm: 1,389 profile views and a 4.7★ rating from 55 reviews.',
    cover: {
      path: 'evidence/gbp-archentire-performance.webp',
      alt: 'Google Business Profile performance for Archentire: 1,389 people viewed the profile',
    },
    services: ['Local SEO', 'Google Business Profile', 'Review strategy', 'Local content'],
    challenge:
      'People choose architects locally, and most of them start on Google Search and Maps. Archentire needed to show up when people in Islamabad search for architects, and to look trustworthy when they do.',
    strategy:
      'Build a complete, verified Google Business Profile, earn reviews from real clients, and publish local content that targets the searches prospective clients make, such as "top architects in Islamabad".',
    executed: [
      'Google Business Profile verification and optimization',
      'Categories, services, photos and business information',
      'Review generation from past clients',
      'A local guide: "Top 10 Architects in Islamabad"',
    ],
    beforeAfter: null,
    kpis: [
      { value: '1,389', label: 'people viewed the Business Profile' },
      { value: '4.7★', label: 'rating from 55 Google reviews' },
      { value: '61%', label: 'of profile views came from Google Search' },
      { value: 'Page 1', label: 'for "top 10 architects in islamabad"' },
    ],
    impact:
      '1,389 people viewed Archentire’s Business Profile across Google Search and Maps in the reporting period. The verified profile holds a 4.7★ rating from 55 reviews, and the firm’s local guide ranks on page one for "top 10 architects in islamabad".',
    takeaway:
      'For local businesses the Business Profile is the real homepage. Completeness, reviews and local content compound over time.',
    gallery: [
      {
        path: 'evidence/gbp-archentire-profile.webp',
        alt: 'Archentire’s verified Google Business Profile with a 4.7 star rating from 55 reviews',
        caption: 'The verified Business Profile: 4.7★ from 55 Google reviews.',
      },
      {
        path: 'evidence/serp-archentire-architects.webp',
        alt: 'Google results for "top 10 architects in islamabad" with Archentire’s guide on page one',
        caption: 'Archentire’s local guide ranking for "top 10 architects in islamabad".',
      },
    ],
    featured: true,
    isPublished: true,
    sortOrder: 3,
    seo: {
      title: 'Archentire Local SEO Case Study: Google Business Profile Growth',
      description:
        'How Google Business Profile optimization, reviews and local content earned an Islamabad architecture firm 1,389 profile views and a 4.7★ rating.',
    },
  },
  {
    slug: 'goldfish-content-seo',
    title: 'Building organic traffic from zero with topic clusters',
    client: 'Buy Strawberry Shortcake Goldfish',
    industry: 'E-commerce & Content',
    summary:
      'A new niche store grew from no organic traffic to 451 monthly visits with 19 pages, with guides ranking in Google’s top 10 for the questions shoppers ask.',
    cover: {
      path: 'evidence/ahrefs-goldfish-organic-growth.webp',
      alt: 'Ahrefs performance chart: organic traffic and impressions rising from zero over twelve months',
    },
    services: ['Content strategy', 'Topic clusters', 'On-page SEO', 'Internal linking'],
    challenge:
      'A brand-new store with no authority and no organic traffic, competing for product and informational searches against big retailers and established food websites.',
    strategy:
      'Answer the specific questions shoppers ask about the product, from shelf life to ingredients and dietary needs, with a cluster of helpful guides that link to each other and to the product page.',
    executed: [
      'Question-based keyword research, e.g. "do goldfish expire" and "are goldfish crackers halal"',
      'A topic cluster of guides and FAQ articles',
      'Internal links from every guide to the product listing',
      'On-page optimization with clear, structured headings',
    ],
    beforeAfter: {
      before: 'August 2025: no organic traffic.',
      after: 'August 2026: 451 monthly organic visits from 19 pages.',
    },
    kpis: [
      { value: '451', label: 'monthly organic visits (Ahrefs)' },
      { value: '19', label: 'pages driving that traffic' },
      { value: 'Top 10', label: 'for 9 question-based searches' },
      { value: '474', label: 'referring domains to the homepage' },
    ],
    impact:
      'Starting from zero, the site now draws 451 organic visits a month. Its guides rank in the top 10 for searches such as "do goldfish expire" (#4), "are goldfish kosher" (#5) and "does goldfish have dairy" (#6), sending shoppers on to the product page.',
    takeaway:
      'Small sites win by answering specific questions better than anyone else. A tight topic cluster builds relevance faster than scattered posts.',
    gallery: [
      {
        path: 'evidence/ahrefs-goldfish-top-pages.webp',
        alt: 'Ahrefs top pages report: 19 pages and 451 total monthly traffic, with guides ranking in positions 4 to 10',
        caption:
          'Ahrefs top pages: 19 pages, 451 monthly visits, guides ranking in positions 4–10.',
      },
      {
        path: 'evidence/topic-cluster-model.webp',
        alt: 'Diagram of a topic cluster: a main blog page linked to three sub-topic pages',
        caption: 'The topic-cluster model behind the content plan.',
      },
    ],
    featured: true,
    isPublished: true,
    sortOrder: 4,
    seo: {
      title: 'Content SEO Case Study: 0 to 451 Monthly Organic Visits',
      description:
        'How a topic cluster of question-led guides grew a new niche store from zero to 451 monthly organic visits, with top-10 rankings for shopper questions.',
    },
  },
  {
    slug: 'trendy-jacket',
    title: 'Google Shopping, social and influencers for a leather apparel brand',
    client: 'Trendy Jacket',
    industry: 'E-commerce & Fashion',
    summary:
      'Shopping campaigns, a strong branded search presence and influencer collaborations for a US-facing leather jacket store.',
    cover: {
      path: 'evidence/google-shopping-red-biker-jacket.webp',
      alt: 'Google Shopping sponsored products for "red leather biker jacket" with a Trendy Jacket listing highlighted',
    },
    services: [
      'Google Ads & Shopping',
      'Branded search',
      'Instagram marketing',
      'Influencer marketing',
    ],
    challenge:
      'Leather apparel is a crowded, price-sensitive category where marketplaces and fast-fashion brands dominate the shopping results. Trendy Jacket needed product visibility at the moment of purchase, and social proof that builds trust.',
    strategy:
      'Put products in front of high-intent shoppers with Google Shopping campaigns, own the branded search results, and build social proof through Instagram content and influencer collaborations.',
    executed: [
      'Google Shopping campaigns for product-level searches',
      'Branded search presence: sponsored store, sitelinks and a knowledge panel',
      'Instagram content and profile management',
      'Influencer collaborations with product seeding',
    ],
    beforeAfter: null,
    kpis: [
      { value: 'Shopping', label: 'sponsored placements for product searches' },
      { value: '9,488', label: 'Instagram followers (@trendy_jacket_us)' },
      { value: 'Sitelinks', label: 'plus a knowledge panel on branded search' },
    ],
    impact:
      'Trendy Jacket products appear in Google Shopping’s sponsored results for purchase-ready searches such as "red leather biker jacket". The brand owns its search results page with a sponsored store, sitelinks and a knowledge panel, and its Instagram audience has reached 9,488 followers, with creator content that shows shoppers how the jackets look when worn.',
    takeaway:
      'In fashion e-commerce, paid shopping captures demand while social and influencer content creates it. They work best together.',
    gallery: [
      {
        path: 'evidence/trendy-jacket-brand-serp.webp',
        alt: 'Google results for "Trendy Jacket": sponsored stores, the website with sitelinks and a knowledge panel',
        caption: 'Branded search: a sponsored store, sitelinks and a knowledge panel.',
      },
      {
        path: 'evidence/google-shopping-trendy-jacket.webp',
        alt: 'Google Shopping results for "Trendy Jacket" with a Trendy Jacket product first in the sponsored row',
        caption: 'Google Shopping: a Trendy Jacket product leading the sponsored row.',
      },
      {
        path: 'evidence/instagram-trendy-jacket.webp',
        alt: 'Trendy Jacket Instagram profile with 9,488 followers',
        caption: 'Instagram: 9,488 followers.',
      },
      {
        path: 'evidence/influencer-trendy-jacket-men.webp',
        alt: 'Instagram post by Trendy Jacket featuring a creator in a brown hooded leather jacket',
        caption: 'An influencer collaboration featuring the brown hooded leather jacket.',
      },
      {
        path: 'evidence/influencer-trendy-jacket-women.webp',
        alt: 'Creator Instagram post wearing a Trendy Jacket leather jacket, tagged @trendy_jacket_us',
        caption: 'Creator content that sparks product questions in the comments.',
      },
    ],
    featured: false,
    isPublished: true,
    sortOrder: 5,
    seo: {
      title: 'Trendy Jacket: Google Shopping, Social & Influencer Case Study',
      description:
        'How Shopping campaigns, branded search and influencer content gave a leather apparel brand visibility at the moment of purchase.',
    },
  },
  {
    slug: 'vanquishe',
    title: 'Ranking a celebrity-outfit store for 548 keywords',
    client: 'Vanquishe',
    industry: 'E-commerce & Fashion',
    summary:
      'Product-level SEO for a US-focused store selling celebrity and film-inspired outfits, now ranking for 548 keywords including high-volume character searches.',
    cover: {
      path: 'evidence/ahrefs-vanquishe-keywords.webp',
      alt: 'Ahrefs keyword table for Vanquishe showing 548 ranking keywords',
    },
    services: ['E-commerce SEO', 'Product page optimization', 'Keyword research', 'US market'],
    challenge:
      'Searches for celebrity and movie outfits are high-volume but fiercely competitive, and each product targets one very specific search, like "the weeknd red suit" or "miles morales jacket".',
    strategy:
      'Match every product page to the exact character or celebrity search it serves, strengthen those pages with detailed on-page content, and build topical depth across related outfits.',
    executed: [
      'Product-level keyword mapping for character and celebrity searches',
      'Optimized product titles, descriptions and headings',
      'Internal links between related outfits and collections',
      'Rank tracking for priority US keywords',
    ],
    beforeAfter: null,
    kpis: [
      { value: '548', label: 'ranking keywords (Ahrefs)' },
      { value: '6.8', label: 'average position for "the weeknd red suit" (2.5K searches/mo)' },
      { value: '9', label: 'countries where that page ranks' },
    ],
    impact:
      'Vanquishe ranks for 548 keywords, with product pages competing for high-volume US searches such as "the weeknd red suit" (average position 6.8 across nine countries), "eddie murphy red suit" and "supreme spider man jacket".',
    takeaway: 'In product-led SEO, precision wins: one page, one intent, one exact search.',
    gallery: [],
    featured: false,
    isPublished: true,
    sortOrder: 6,
    seo: {
      title: 'Vanquishe E-commerce SEO Case Study: 548 Ranking Keywords',
      description:
        'Product-level SEO that ranks a US celebrity-outfit store for 548 keywords, including high-volume searches like "the weeknd red suit".',
    },
  },
];
