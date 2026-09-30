// @vitest-environment node
import type { Metric } from '@aarij/shared';
import { describe, expect, it } from 'vitest';
import { formatDate, formatMetric } from './format';

const metric = (overrides: Partial<Metric>): Metric => ({
  id: 'm',
  value: 0,
  decimals: 0,
  prefix: '',
  suffix: '',
  label: 'Label',
  context: 'Context',
  sourceNote: 'Source',
  sortOrder: 1,
  ...overrides,
});

describe('formatMetric', () => {
  it('combines prefix, grouped value and suffix', () => {
    expect(formatMetric(metric({ value: 1300, prefix: '+', suffix: '%' }))).toBe('+1,300%');
  });

  it('keeps the configured number of decimals', () => {
    expect(formatMetric(metric({ value: 8.5, decimals: 1, suffix: 'K' }))).toBe('8.5K');
  });

  it('formats rank-style metrics', () => {
    expect(formatMetric(metric({ value: 1, prefix: '#' }))).toBe('#1');
  });
});

describe('formatDate', () => {
  it('formats ISO dates in a short, readable form', () => {
    expect(formatDate('2026-02-07T10:00:00.000Z')).toBe('Feb 7, 2026');
  });
});
