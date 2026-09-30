function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/**
 * True when white text reads better than black on this background
 * (compares WCAG contrast against white and black).
 */
export function isDarkColor(hex: string | null): boolean {
  if (!hex) return false;
  const value = Number.parseInt(hex.replace('#', ''), 16);
  const luminance =
    0.2126 * channel((value >> 16) & 255) +
    0.7152 * channel((value >> 8) & 255) +
    0.0722 * channel(value & 255);
  return 1.05 / (luminance + 0.05) > (luminance + 0.05) / 0.05;
}
