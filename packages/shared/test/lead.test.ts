import { describe, expect, it } from 'vitest';
import { leadInputSchema, leadSubmissionSchema, toFieldErrors } from '../src/lead';

const base = {
  name: 'Sara Khan',
  email: 'sara@example.com',
  message: 'We are hiring an SEO lead for our Dubai office.',
  consent: true,
};

const project = { ...base, intent: 'project', services: ['seo'], budget: '1k-3k' };

describe('leadInputSchema', () => {
  it('accepts a hiring lead with a company', () => {
    const result = leadInputSchema.safeParse({ ...base, intent: 'hiring', company: 'Acme LLC' });
    expect(result.success).toBe(true);
  });

  it('requires a company for hiring leads', () => {
    const result = leadInputSchema.safeParse({ ...base, intent: 'hiring', company: '   ' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['company']);
  });

  it('requires at least one service for project leads', () => {
    const result = leadInputSchema.safeParse({ ...project, services: [] });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['services']);
  });

  it('requires a budget for project leads', () => {
    const { budget: _omit, ...withoutBudget } = project;
    const result = leadInputSchema.safeParse(withoutBudget);
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['budget']);
  });

  it('normalizes a bare domain website to https', () => {
    const lead = leadInputSchema.parse({ ...project, website: 'example.com' });
    expect(lead.intent === 'project' ? lead.website : null).toBe('https://example.com/');
  });

  it('treats an empty website as absent', () => {
    const lead = leadInputSchema.parse({ ...project, website: '' });
    expect(lead.intent === 'project' ? lead.website : 'wrong-intent').toBeUndefined();
  });

  it('rejects an invalid website', () => {
    const result = leadInputSchema.safeParse({ ...project, website: 'not a website' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['website']);
  });

  it('trims the name', () => {
    const lead = leadInputSchema.parse({ ...base, intent: 'other', name: '  Sara Khan  ' });
    expect(lead.name).toBe('Sara Khan');
  });

  it('strips control characters from the message', () => {
    const lead = leadInputSchema.parse({
      ...base,
      intent: 'other',
      message: 'Hello\u0000 there\u0007, we need SEO help',
    });
    expect(lead.message).toBe('Hello there, we need SEO help');
  });

  it('keeps line breaks in the message', () => {
    const lead = leadInputSchema.parse({
      ...base,
      intent: 'other',
      message: 'Line one\nLine two here',
    });
    expect(lead.message).toBe('Line one\nLine two here');
  });

  it('requires consent', () => {
    const result = leadInputSchema.safeParse({ ...base, intent: 'other', consent: false });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['consent']);
  });

  it('rejects an invalid email', () => {
    const result = leadInputSchema.safeParse({ ...base, intent: 'other', email: 'sara@' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(['email']);
  });

  it('rejects an unknown intent', () => {
    const result = leadInputSchema.safeParse({ ...base, intent: 'partnership' });
    expect(result.success).toBe(false);
  });
});

describe('leadSubmissionSchema', () => {
  it('accepts a lead with anti-spam metadata', () => {
    const result = leadSubmissionSchema.safeParse({
      lead: { ...base, intent: 'other' },
      meta: { hp: '', elapsedMs: 5400 },
    });
    expect(result.success).toBe(true);
  });

  it('rejects a negative elapsed time', () => {
    const result = leadSubmissionSchema.safeParse({
      lead: { ...base, intent: 'other' },
      meta: { hp: '', elapsedMs: -1 },
    });
    expect(result.success).toBe(false);
  });
});

describe('toFieldErrors', () => {
  it('maps the first message of each field', () => {
    const result = leadInputSchema.safeParse({ intent: 'hiring', consent: true });
    if (result.success) throw new Error('expected failure');
    const errors = toFieldErrors(result.error);
    expect(Object.keys(errors).sort()).toEqual(['company', 'email', 'message', 'name']);
    expect(errors.name).toBe('Please enter your name.');
  });
});
