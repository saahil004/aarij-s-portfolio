// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  cornerBackground,
  firstExisting,
  targetWidth,
  toHex,
  uniformBackground,
} from './media-lib';

const white = { r: 255, g: 255, b: 255, a: 255 };
const black = { r: 0, g: 0, b: 0, a: 255 };

describe('toHex', () => {
  it('formats rgb channels as a lowercase hex color', () => {
    expect(toHex({ r: 30, g: 94, b: 255 })).toBe('#1e5eff');
  });
});

describe('cornerBackground', () => {
  it('returns null when any corner is transparent', () => {
    expect(cornerBackground([white, white, white, { ...white, a: 0 }])).toBeNull();
  });

  it('returns the averaged hex color of opaque corners', () => {
    expect(cornerBackground([black, black, black, black])).toBe('#000000');
    expect(cornerBackground([white, white, black, black])).toBe('#808080');
  });
});

describe('uniformBackground', () => {
  it('returns the color when all corners match', () => {
    const nearBlack = { r: 6, g: 4, b: 2, a: 255 };
    expect(uniformBackground([black, black, nearBlack, black])).toBe('#020101');
  });

  it('returns null when corners disagree', () => {
    expect(uniformBackground([white, white, black, black])).toBeNull();
  });

  it('returns null when a corner is transparent', () => {
    expect(uniformBackground([black, black, black, { ...black, a: 0 }])).toBeNull();
  });
});

describe('firstExisting', () => {
  it('returns the first candidate that exists', () => {
    const files = new Set(['portrait/aarij.png', 'portrait/aarij.webp']);
    expect(
      firstExisting(['portrait/aarij.jpg', 'portrait/aarij.png', 'portrait/aarij.webp'], (p) =>
        files.has(p),
      ),
    ).toBe('portrait/aarij.png');
  });

  it('returns null when none exist', () => {
    expect(firstExisting(['a.jpg'], () => false)).toBeNull();
  });
});

describe('targetWidth', () => {
  it('caps logos at 480px and screenshots at 1600px', () => {
    expect(targetWidth('logo', 3840)).toBe(480);
    expect(targetWidth('shot', 1920)).toBe(1600);
  });

  it('caps portraits at 1200px', () => {
    expect(targetWidth('portrait', 4000)).toBe(1200);
  });

  it('never upscales', () => {
    expect(targetWidth('logo', 300)).toBe(300);
    expect(targetWidth('shot', 1200)).toBe(1200);
  });
});
