// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { samePageHash } from './anchors';

const here = 'https://aarij.com/';

describe('samePageHash', () => {
  it('returns the hash for a link to a section of the current page', () => {
    expect(samePageHash('/#contact', here)).toBe('#contact');
    expect(samePageHash('#results', here)).toBe('#results');
  });

  it('ignores links to other pages', () => {
    expect(samePageHash('/case-studies#top', here)).toBeNull();
    expect(samePageHash('/#contact', 'https://aarij.com/blog')).toBeNull();
  });

  it('ignores links without a hash or to another site', () => {
    expect(samePageHash('/', here)).toBeNull();
    expect(samePageHash('https://example.com/#contact', here)).toBeNull();
  });

  it('decodes encoded hashes', () => {
    expect(samePageHash('/#before%20after', here)).toBe('#before after');
  });
});
