import { type LeadInput, leadInputSchema, toFieldErrors } from '@aarij/shared';

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === 'string' ? value : '';
};

/** Reads only the fields that belong to the selected intent. */
export function readLeadForm(data: FormData): Record<string, unknown> {
  const intent = text(data, 'intent');
  const common = {
    intent,
    name: text(data, 'name'),
    email: text(data, 'email'),
    message: text(data, 'message'),
    consent: data.get('consent') === 'on',
  };
  if (intent === 'hiring') {
    return {
      ...common,
      company: text(data, 'company'),
      role: text(data, 'role'),
      location: text(data, 'location'),
    };
  }
  if (intent === 'project') {
    return {
      ...common,
      website: text(data, 'website'),
      services: data.getAll('services').filter((value) => typeof value === 'string'),
      budget: text(data, 'budget'),
    };
  }
  return common;
}

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; fieldErrors: Record<string, string> };

export function validateLead(input: unknown): ValidationResult {
  const result = leadInputSchema.safeParse(input);
  return result.success
    ? { ok: true, lead: result.data }
    : { ok: false, fieldErrors: toFieldErrors(result.error) };
}
