import type { Brand } from '@aarij/shared';

const brand = (id: string, name: string, url: string | null = null) => ({
  id,
  name,
  logo: { path: `brands/${id}.webp`, alt: `${name} logo` },
  url,
});

export const brands: Brand[] = [
  brand('livebits', 'LiveBits', 'https://livebits.pk'),
  brand('trendy-jacket', 'Trendy Jacket', 'https://www.trendyjacket.com'),
  brand('mussarat', 'Mussarat Lingerie', 'https://mussaratlingerie.com'),
  brand('archentire', 'Archentire', 'https://archentire.com'),
  brand('edhi-foundation', 'Edhi Foundation'),
  brand('charity-right', 'Charity Right Pakistan'),
  brand('timezone', 'TimeZone Pakistan', 'https://www.timezonepk.com'),
  brand('arena-multimedia', 'Arena Multimedia'),
  brand('escience-academy', 'eScience Academy'),
  brand('publishing-squad', 'Publishing Squad'),
  brand('pulp-house-publishing', 'The Pulp House Publishing'),
  brand('urban-quill', 'Urban Quill Publishing'),
  brand('rameen-naturals', 'Rameen Naturals'),
  brand('usa-leather-jackets', 'USA Leather Jackets'),
  brand('william-jacket', 'William Jacket'),
  brand('the-jacket-maker', 'The Jacket Maker'),
  brand('bullseye', 'Bullseye'),
  brand('cafe-imran', 'Café Imran'),
  brand('saltanat', 'Saltanat Restaurant'),
  brand('gfxm', 'GFXM'),
  brand('analytix', 'Analytix'),
].map((item, index) => ({ ...item, sortOrder: index + 1 }));
