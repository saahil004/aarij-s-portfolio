// @vitest-environment node
import type { LeadSubmission } from '@aarij/shared';
import { describe, expect, it } from 'vitest';
import { submitLead } from './lead-client';

const submission: LeadSubmission = {
  lead: {
    intent: 'other',
    name: 'Sara',
    email: 'sara@example.com',
    message: 'Hello, I have a question.',
    consent: true,
  },
  meta: { hp: '', elapsedMs: 4200 },
};

/** A fake transport that records the request and answers with a fixed response. */
function fakeFetch(response: Response | Error) {
  const calls: { url: string; init: RequestInit | undefined }[] = [];
  const fetchImpl = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    if (response instanceof Error) throw response;
    return response;
  };
  return { calls, fetchImpl: fetchImpl as typeof fetch };
}

describe('submitLead', () => {
  it('reports the form as unavailable when no API is configured', async () => {
    expect(await submitLead(submission, { apiUrl: undefined })).toEqual({
      ok: false,
      kind: 'unavailable',
    });
  });

  it('posts the submission as JSON to the leads endpoint', async () => {
    const { calls, fetchImpl } = fakeFetch(new Response(null, { status: 201 }));
    const result = await submitLead(submission, { apiUrl: 'https://api.example.com/', fetchImpl });
    expect(result).toEqual({ ok: true });
    expect(calls[0]?.url).toBe('https://api.example.com/v1/leads');
    expect(calls[0]?.init?.method).toBe('POST');
    expect(JSON.parse(String(calls[0]?.init?.body))).toEqual(submission);
  });

  it('maps validation errors to field errors', async () => {
    const body = JSON.stringify({
      error: { code: 'validation', message: 'Invalid', fields: { email: 'Bad email.' } },
    });
    const { fetchImpl } = fakeFetch(new Response(body, { status: 400 }));
    expect(await submitLead(submission, { apiUrl: 'https://api.example.com', fetchImpl })).toEqual({
      ok: false,
      kind: 'validation',
      fieldErrors: { email: 'Bad email.' },
    });
  });

  it('maps 429 to rate limited with the retry delay', async () => {
    const { fetchImpl } = fakeFetch(
      new Response(null, { status: 429, headers: { 'Retry-After': '120' } }),
    );
    expect(await submitLead(submission, { apiUrl: 'https://api.example.com', fetchImpl })).toEqual({
      ok: false,
      kind: 'rate_limited',
      retryAfterSeconds: 120,
    });
  });

  it('maps 403 to rejected', async () => {
    const { fetchImpl } = fakeFetch(new Response(null, { status: 403 }));
    expect(await submitLead(submission, { apiUrl: 'https://api.example.com', fetchImpl })).toEqual({
      ok: false,
      kind: 'rejected',
    });
  });

  it('maps server errors to unavailable', async () => {
    const { fetchImpl } = fakeFetch(new Response(null, { status: 503 }));
    expect(await submitLead(submission, { apiUrl: 'https://api.example.com', fetchImpl })).toEqual({
      ok: false,
      kind: 'unavailable',
    });
  });

  it('maps a failed request to a network error', async () => {
    const { fetchImpl } = fakeFetch(new TypeError('Failed to fetch'));
    expect(await submitLead(submission, { apiUrl: 'https://api.example.com', fetchImpl })).toEqual({
      ok: false,
      kind: 'network',
    });
  });
});
