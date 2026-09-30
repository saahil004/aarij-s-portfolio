// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createMediaLookup } from './media-lookup';

const lookup = createMediaLookup({
  'brands/livebits.webp': { width: 480, height: 150, bg: null },
  'brands/cafe-imran.webp': { width: 400, height: 300, bg: '#000000' },
});

describe('createMediaLookup', () => {
  it('resolves a path to its public src, dimensions and tile background', () => {
    expect(lookup.media('brands/cafe-imran.webp')).toEqual({
      src: '/media/brands/cafe-imran.webp',
      width: 400,
      height: 300,
      bg: '#000000',
    });
  });

  it('reports whether a path exists', () => {
    expect(lookup.has('brands/livebits.webp')).toBe(true);
    expect(lookup.has('brands/missing.webp')).toBe(false);
  });

  it('throws a descriptive error for unknown paths', () => {
    expect(() => lookup.media('brands/missing.webp')).toThrow(/brands\/missing\.webp/);
  });
});
