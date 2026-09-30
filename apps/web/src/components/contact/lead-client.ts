import type { LeadSubmission } from '@aarij/shared';

export type SubmitResult =
  | { ok: true }
  | { ok: false; kind: 'validation'; fieldErrors: Record<string, string> }
  | { ok: false; kind: 'rate_limited'; retryAfterSeconds: number | null }
  | { ok: false; kind: 'rejected' | 'unavailable' | 'network' };

type SubmitOptions = {
  /** Base URL of the Hono API; the form reports "unavailable" until it is configured. */
  apiUrl: string | undefined;
  fetchImpl?: typeof fetch;
};

async function readFieldErrors(response: Response): Promise<Record<string, string>> {
  try {
    const body = (await response.json()) as { error?: { fields?: Record<string, unknown> } };
    const fields = body.error?.fields ?? {};
    return Object.fromEntries(
      Object.entries(fields).filter(
        (entry): entry is [string, string] => typeof entry[1] === 'string',
      ),
    );
  } catch {
    return {};
  }
}

export async function submitLead(
  submission: LeadSubmission,
  { apiUrl, fetchImpl }: SubmitOptions,
): Promise<SubmitResult> {
  if (!apiUrl) return { ok: false, kind: 'unavailable' };
  const doFetch = fetchImpl ?? ((input, init) => fetch(input, init));

  let response: Response;
  try {
    response = await doFetch(`${apiUrl.replace(/\/+$/, '')}/v1/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
  } catch {
    return { ok: false, kind: 'network' };
  }

  if (response.ok) return { ok: true };
  if (response.status === 400 || response.status === 422) {
    return { ok: false, kind: 'validation', fieldErrors: await readFieldErrors(response) };
  }
  if (response.status === 429) {
    const retryAfter = Number(response.headers.get('Retry-After'));
    return {
      ok: false,
      kind: 'rate_limited',
      retryAfterSeconds: Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
    };
  }
  if (response.status === 403) return { ok: false, kind: 'rejected' };
  return { ok: false, kind: 'unavailable' };
}
