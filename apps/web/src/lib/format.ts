import type { Metric } from '@aarij/shared';

export function formatMetric(metric: Pick<Metric, 'value' | 'decimals' | 'prefix' | 'suffix'>) {
  const number = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: metric.decimals,
    maximumFractionDigits: metric.decimals,
  }).format(metric.value);
  return `${metric.prefix}${number}${metric.suffix}`;
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** `2026-02-07T10:00:00Z` → `Feb 7, 2026` (UTC so server and client agree). */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}
