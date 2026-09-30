export type Rgb = { r: number; g: number; b: number };
export type Rgba = Rgb & { a: number };
export type MediaKind = 'logo' | 'shot' | 'portrait';

const MAX_WIDTH: Record<MediaKind, number> = { logo: 480, shot: 1600, portrait: 1200 };

/** First path for which `exists` is true, e.g. the portrait in whichever format was dropped in. */
export function firstExisting(candidates: string[], exists: (path: string) => boolean) {
  return candidates.find(exists) ?? null;
}

export function toHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Background color a logo tile should use so the logo sits seamlessly on it:
 * null when the logo has transparent corners, otherwise the average corner color.
 */
export function cornerBackground(corners: Rgba[]): string | null {
  if (corners.length === 0 || corners.some((c) => c.a < 250)) return null;
  const average = (key: keyof Rgb) => corners.reduce((sum, c) => sum + c[key], 0) / corners.length;
  return toHex({ r: average('r'), g: average('g'), b: average('b') });
}

/** Like `cornerBackground`, but only when all corners are (nearly) the same color. */
export function uniformBackground(corners: Rgba[], tolerance = 24): string | null {
  const keys: (keyof Rgb)[] = ['r', 'g', 'b'];
  const spread = (key: keyof Rgb) =>
    Math.max(...corners.map((c) => c[key])) - Math.min(...corners.map((c) => c[key]));
  if (keys.some((key) => spread(key) > tolerance)) return null;
  return cornerBackground(corners);
}

export function targetWidth(kind: MediaKind, width: number): number {
  return Math.min(width, MAX_WIDTH[kind]);
}
