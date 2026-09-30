// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { isDarkColor } from './color';

describe('isDarkColor', () => {
  it('treats black and the brand blue as dark', () => {
    expect(isDarkColor('#000000')).toBe(true);
    expect(isDarkColor('#181e15')).toBe(true);
  });

  it('treats white and the yellows as light', () => {
    expect(isDarkColor('#ffffff')).toBe(false);
    expect(isDarkColor('#ffc83d')).toBe(false);
  });

  it('treats a missing color as light (logos default to a white tile)', () => {
    expect(isDarkColor(null)).toBe(false);
  });
});
