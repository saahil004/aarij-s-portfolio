import type { SectionRecord } from '@aarij/shared';

/** Homepage sections in display order. Intros support `**bold**` emphasis. */
export const sections: SectionRecord[] = [
  {
    key: 'hero',
    isVisible: true,
    sortOrder: 1,
    content: {
      eyebrow: "Hi! I'm Aarij — Digital Marketing Specialist",
      headline: 'Driving traffic, leads & business',
      highlight: 'growth',
      subheadline:
        'I build data-driven digital marketing strategies that turn search visibility and online traffic into measurable business growth.',
      stickers: ['Data-Driven', 'SEO-Led'],
      primaryCta: { label: 'View My Results', href: '#results' },
      resumeCtaLabel: 'Download Resume',
    },
  },
  {
    key: 'ticker',
    isVisible: true,
    sortOrder: 2,
    content: {
      items: [
        'SEO & Organic Growth',
        'Lead Generation',
        'Content Marketing',
        'Analytics & Tracking',
        'Conversion Optimization',
        'E-commerce Growth',
        'Google Ads & Shopping',
        'Local SEO',
        'Social & Influencer Marketing',
      ],
    },
  },
  {
    key: 'funnel',
    isVisible: true,
    sortOrder: 3,
    content: {
      title: "I don't just do marketing. I build growth.",
      intro:
        'Every channel I work on is connected to one funnel, from the first search impression to a **paying customer**, so every activity can be traced to **business results**.',
      stages: [
        {
          name: 'Traffic',
          capability: 'Attract',
          description:
            'Rank for high-intent searches and bring the right visitors in through SEO, content and paid search.',
        },
        {
          name: 'Engagement',
          capability: 'Engage',
          description:
            'Give visitors pages worth staying on: fast, useful and built around what they searched for.',
        },
        {
          name: 'Leads',
          capability: 'Convert',
          description:
            'Turn attention into enquiries and orders with clear offers, landing pages and tracked forms.',
        },
        {
          name: 'Customers',
          capability: 'Measure',
          description:
            'Track every step in GA4, Search Console and the CRM to see which channels create customers.',
        },
        {
          name: 'Growth',
          capability: 'Optimize',
          description:
            "Double down on what works, fix what doesn't and scale the channels that pay back.",
        },
      ],
    },
  },
  {
    key: 'expertise',
    isVisible: true,
    sortOrder: 4,
    content: {
      title: 'Value-focused marketing that delivers.',
      intro:
        'Every service I offer is built around a **business outcome**: more qualified traffic, more **leads** and more **customers**.',
      groups: [
        {
          label: 'SEO & Content',
          tone: 'blue',
          items: [
            'Technical SEO audits & fixes',
            'Keyword research & mapping',
            'On-page & content optimization',
            'Topic clusters & internal linking',
            'Link building strategy',
            'Local SEO & Google Business Profile',
          ],
        },
        {
          label: 'Leads & Conversion',
          tone: 'yellow',
          items: [
            'Lead generation funnels',
            'Landing page optimization',
            'Conversion rate optimization',
            'Google Ads & Shopping campaigns',
            'CRM lead tracking with HubSpot',
          ],
        },
        {
          label: 'Analytics & Growth',
          tone: 'sky',
          items: [
            'GA4 & Google Tag Manager setup',
            'Search Console insights',
            'Behavior analysis with Microsoft Clarity',
            'E-commerce growth on Shopify & WordPress',
            'Social & influencer marketing',
          ],
        },
      ],
      closingText: "Let's turn your traffic into results.",
      cta: { label: 'Start a Conversation', href: '#contact' },
    },
  },
  {
    key: 'results',
    isVisible: true,
    sortOrder: 5,
    content: {
      title: 'My numbers say it all',
      intro:
        'Real results from **Search Console**, **GA4**, **Ahrefs** and client dashboards: the traffic, rankings, leads and revenue I have helped grow.',
    },
  },
  {
    key: 'caseStudies',
    isVisible: true,
    sortOrder: 6,
    content: {
      title: 'Growth stories, measured in results.',
      intro:
        'Driven by **data and clarity**, each project connects strategy and execution to traffic, leads and revenue.',
      cta: { label: 'See All Case Studies', href: '/case-studies' },
    },
  },
  {
    key: 'brands',
    isVisible: true,
    sortOrder: 7,
    content: { title: "Brands I've worked with" },
  },
  {
    key: 'process',
    isVisible: true,
    sortOrder: 8,
    content: {
      title: 'How I grow a business through digital marketing.',
      intro:
        'My process connects research to results. It starts with understanding the **business**, its **audience** and its **competitors**, then turns those insights into a plan I execute, measure and improve.',
      cta: { label: "Let's Talk", href: '#contact' },
      steps: [
        {
          title: 'Research',
          icon: 'search',
          description:
            'Understand the business, audience, competitors and search demand so the strategy is built on real data, not assumptions.',
        },
        {
          title: 'Strategy',
          icon: 'strategy',
          description:
            'Build the acquisition plan: SEO, content, landing pages and conversion paths mapped to the keywords and channels that matter.',
        },
        {
          title: 'Execute',
          icon: 'rocket',
          description:
            'Implement campaigns and technical improvements, from on-page SEO and content to links, ads and tracking, in focused sprints.',
        },
        {
          title: 'Measure',
          icon: 'chart',
          description:
            'Track traffic, rankings, leads, conversions and the KPIs the business cares about in GA4, Search Console and the CRM.',
        },
        {
          title: 'Optimize',
          icon: 'refresh',
          description:
            'Test, analyze, improve and scale. Double down on the pages, keywords and channels that bring in customers.',
        },
      ],
    },
  },
  {
    key: 'framework',
    isVisible: true,
    sortOrder: 9,
    content: {
      title: 'My 90-day growth framework.',
      intro:
        'A clear plan for the first three months, so you know exactly **what happens when** and how progress is **measured**.',
      phases: [
        {
          range: 'Days 1–30',
          title: 'Discover & Fix',
          items: [
            'Full SEO & website audit',
            'Keyword research & mapping',
            'Technical SEO fixes',
            'Analytics & conversion tracking',
            'Conversion analysis',
          ],
        },
        {
          range: 'Days 31–60',
          title: 'Build & Grow',
          items: [
            'Content & on-page SEO',
            'Landing pages',
            'Internal linking',
            'Link building',
            'Lead generation campaigns',
          ],
        },
        {
          range: 'Days 61–90',
          title: 'Optimize & Scale',
          items: [
            'Performance analysis',
            'Ranking improvements',
            'Conversion optimization',
            'Scale what works',
          ],
        },
      ],
      outcomesTitle: 'What I would do for your business',
      outcomes: [
        'Identify your biggest growth opportunities across search, content and conversion.',
        'Build an acquisition strategy around the keywords and channels your buyers actually use.',
        'Generate qualified leads with focused landing pages and tracked conversion paths.',
        'Improve conversion rates so the traffic you already have turns into more customers.',
        'Measure performance with clear reporting tied to leads and revenue.',
        'Scale the channels that prove they pay back.',
      ],
    },
  },
  {
    key: 'tools',
    isVisible: true,
    sortOrder: 10,
    content: {
      title: 'My marketing technology stack.',
      intro:
        'The platforms I use to **research**, **execute** and **measure**, from technical SEO audits to analytics, advertising and CRM.',
    },
  },
  {
    key: 'beforeAfter',
    isVisible: true,
    sortOrder: 11,
    content: {
      title: 'Before & after.',
      intro:
        'Growth over time, straight from the analytics platforms. **No mockups**, just the charts.',
      items: [
        {
          title: 'Organic traffic from zero',
          image: {
            path: 'evidence/ahrefs-goldfish-organic-growth.webp',
            alt: 'Ahrefs chart: organic traffic and impressions rising from zero over twelve months',
          },
          before: 'Aug 2025: no organic traffic',
          after: 'Aug 2026: 451 monthly organic visits from 19 pages',
          caption: 'Content-led SEO for a niche e-commerce store, tracked in Ahrefs.',
        },
        {
          title: 'Monthly leads',
          image: {
            path: 'evidence/uae-leads-dashboard.webp',
            alt: 'Leads dashboard: 56 total leads, up 300% on last year, with a spike to about 48 leads in September',
          },
          before: 'Jan–Jul: 1–3 leads a month',
          after: 'Sep: about 48 leads in a single month',
          caption: 'Lead generation for a UAE client: 56 leads in total, +300% year over year.',
        },
        {
          title: 'Organic traffic, six months',
          image: {
            path: 'evidence/ahrefs-organic-traffic-6-months.webp',
            alt: 'Ahrefs chart: organic traffic for a client site climbing to around 900 visits over six months',
          },
          before: 'Feb 2026: about 600 monthly organic visits',
          after: 'Aug 2026: about 900 monthly organic visits',
          caption: 'Organic traffic trend for a client website, tracked in Ahrefs.',
        },
      ],
    },
  },
  {
    key: 'industries',
    isVisible: true,
    sortOrder: 12,
    content: {
      title: "Industries I've worked with.",
      intro:
        'From **e-commerce** and **publishing** to **architecture** and **non-profits**, I adapt the strategy to how each industry’s customers search and buy.',
      certificationsTitle: 'Certifications & professional development',
    },
  },
  {
    key: 'testimonials',
    isVisible: true,
    sortOrder: 13,
    content: {
      title: 'What clients say.',
      intro: 'Feedback from the teams and business owners I have worked with.',
    },
  },
  {
    key: 'about',
    isVisible: true,
    sortOrder: 14,
    content: {
      title: 'About me.',
      paragraphs: [
        "I'm Aarij, a digital marketing specialist focused on SEO, lead generation, analytics and conversion optimization. I help businesses turn search visibility and online traffic into measurable growth.",
        'I have worked with e-commerce brands, service businesses, publishers and non-profits, in markets from Pakistan to the United States. My approach is simple: understand the business, build the strategy on real data, execute it and measure everything.',
        'I am now looking to bring that approach to a growth-focused team in the UAE, Malaysia or internationally.',
      ],
      highlights: [
        'SEO-led growth',
        'Data-driven decisions',
        'Full-funnel thinking',
        'Clear reporting',
      ],
      photo: null,
    },
  },
  {
    key: 'blog',
    isVisible: true,
    sortOrder: 15,
    content: {
      title: 'Insights on search & growth.',
      intro:
        'Practical **SEO**, **content** and **analytics** lessons from real campaigns: what worked, what did not and why.',
      cta: { label: 'See All Posts', href: '/blog' },
    },
  },
  {
    key: 'cta',
    isVisible: true,
    sortOrder: 16,
    content: {
      title: "Let's grow something together.",
      text: "Have a business you want to grow? Let's identify your biggest digital growth opportunities and turn them into a measurable marketing strategy.",
      buttonLabel: "Let's Talk",
      annotation: 'and make it measurable',
    },
  },
];
