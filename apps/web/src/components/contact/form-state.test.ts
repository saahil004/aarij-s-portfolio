// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { readLeadForm, validateLead } from './form-state';

function formData(entries: [string, string][]) {
  const data = new FormData();
  for (const [key, value] of entries) data.append(key, value);
  return data;
}

describe('readLeadForm', () => {
  it('reads the fields for the selected intent only', () => {
    const input = readLeadForm(
      formData([
        ['intent', 'hiring'],
        ['name', 'Sara'],
        ['email', 'sara@example.com'],
        ['message', 'We are hiring an SEO lead.'],
        ['company', 'Acme'],
        ['role', 'Head of Growth'],
        ['budget', '1k-3k'],
        ['consent', 'on'],
      ]),
    );
    expect(input).toEqual({
      intent: 'hiring',
      name: 'Sara',
      email: 'sara@example.com',
      message: 'We are hiring an SEO lead.',
      company: 'Acme',
      role: 'Head of Growth',
      location: '',
      consent: true,
    });
  });

  it('collects every checked service for project leads', () => {
    const input = readLeadForm(
      formData([
        ['intent', 'project'],
        ['services', 'seo'],
        ['services', 'ppc'],
        ['budget', 'not-sure'],
      ]),
    );
    expect(input).toMatchObject({
      intent: 'project',
      services: ['seo', 'ppc'],
      budget: 'not-sure',
    });
  });

  it('treats an unchecked consent box as false', () => {
    expect(readLeadForm(formData([['intent', 'other']]))).toMatchObject({ consent: false });
  });
});

describe('validateLead', () => {
  it('returns field errors for an empty hiring form', () => {
    const result = validateLead(readLeadForm(formData([['intent', 'hiring']])));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual([
        'company',
        'consent',
        'email',
        'message',
        'name',
      ]);
    }
  });

  it('returns the parsed lead when valid', () => {
    const result = validateLead(
      readLeadForm(
        formData([
          ['intent', 'other'],
          ['name', '  Sara  '],
          ['email', 'sara@example.com'],
          ['message', 'Hello, I have a question.'],
          ['consent', 'on'],
        ]),
      ),
    );
    expect(result).toEqual({
      ok: true,
      lead: {
        intent: 'other',
        name: 'Sara',
        email: 'sara@example.com',
        message: 'Hello, I have a question.',
        consent: true,
      },
    });
  });
});
