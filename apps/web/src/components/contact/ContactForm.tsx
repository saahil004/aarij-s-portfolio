'use client';

import {
  budgetLabels,
  budgetRanges,
  type LeadIntent,
  type LeadSubmission,
  leadIntentLabels,
  leadIntents,
  serviceLabels,
  serviceOptions,
} from '@aarij/shared';
import { Check, CircleAlert, Send } from 'lucide-react';
import Link from 'next/link';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { readLeadForm, validateLead } from './form-state';
import { type SubmitResult, submitLead } from './lead-client';

type ContactFormProps = {
  /** Shown as a fallback when the form can't send. */
  email: string | null;
  /** Injected in tests; defaults to posting to the Hono API. */
  onSubmitLead?: (submission: LeadSubmission) => Promise<SubmitResult>;
};

type Failure = Exclude<SubmitResult, { ok: true }>;

const defaultSubmit = (submission: LeadSubmission) =>
  submitLead(submission, { apiUrl: process.env.NEXT_PUBLIC_API_URL });

function failureMessage(result: Failure, email: string | null): string {
  switch (result.kind) {
    case 'validation':
      return 'Please check the highlighted fields.';
    case 'rate_limited':
      return 'You have sent several messages in a short time. Please wait a few minutes and try again.';
    case 'rejected':
      return 'Your message could not be verified. Refresh the page and try again.';
    case 'network':
      return 'The message could not reach the server. Check your connection and try again.';
    case 'unavailable':
      return email
        ? `Messages can't be sent right now. Please email me at ${email} instead.`
        : "Messages can't be sent right now. Please try again later.";
  }
}

const inputClass =
  'w-full rounded-lg border border-ink bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-grey-600 aria-[invalid=true]:border-2 aria-[invalid=true]:bg-yellow-50';

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-ink">
      <CircleAlert aria-hidden="true" className="size-3.5 shrink-0 text-blue" />
      {message}
    </p>
  );
}

type TextFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'url';
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
};

function TextField({
  name,
  label,
  required,
  error,
  type = 'text',
  autoComplete,
  placeholder,
  multiline,
}: TextFieldProps) {
  const id = `lead-${name}`;
  const errorId = `${id}-error`;
  const common = {
    id,
    name,
    placeholder,
    autoComplete,
    'aria-required': required || undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: inputClass,
  };
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-grey-600"> (optional)</span>
        )}
      </label>
      {multiline ? <textarea rows={5} {...common} /> : <input type={type} {...common} />}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function focusFirstInvalid(form: HTMLFormElement, errors: Record<string, string>) {
  for (const element of Array.from(form.elements)) {
    const name = (element as HTMLInputElement).name;
    if (name && errors[name] && element instanceof HTMLElement) {
      element.focus();
      return;
    }
  }
}

const choicePill =
  'inline-flex rounded-full border border-ink px-4 py-2 text-sm font-medium transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue';

export function ContactForm({ email, onSubmitLead = defaultSubmit }: ContactFormProps) {
  const [intent, setIntent] = useState<LeadIntent>('hiring');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sender, setSender] = useState({ firstName: '', email: '' });
  const renderedAt = useRef<number | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function chooseIntent(value: LeadIntent) {
    setIntent(value);
    setFieldErrors({});
    setFormError(null);
  }

  function clearFieldError(name: string) {
    if (!fieldErrors[name]) return;
    setFieldErrors(({ [name]: _removed, ...rest }) => rest);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const validation = validateLead(readLeadForm(data));

    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setFormError(null);
      focusFirstInvalid(form, validation.fieldErrors);
      return;
    }

    setFieldErrors({});
    setFormError(null);
    setStatus('submitting');
    const honeypot = data.get('fax');
    const result = await onSubmitLead({
      lead: validation.lead,
      meta: {
        hp: typeof honeypot === 'string' ? honeypot : '',
        elapsedMs: renderedAt.current === null ? 0 : Math.max(0, Date.now() - renderedAt.current),
      },
    });

    if (result.ok) {
      setSender({
        firstName: validation.lead.name.split(/\s+/)[0] ?? validation.lead.name,
        email: validation.lead.email,
      });
      setStatus('success');
      return;
    }

    setStatus('idle');
    if (result.kind === 'validation') setFieldErrors(result.fieldErrors);
    setFormError(failureMessage(result, email));
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-ink bg-white p-8 text-center text-ink md:p-12"
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-ink bg-yellow">
          <Check aria-hidden="true" className="size-5" strokeWidth={2} />
        </span>
        <p className="mt-6 text-2xl font-medium">Thanks, {sender.firstName}!</p>
        <p className="mx-auto mt-3 max-w-sm text-sm text-grey-600">
          Your message is on its way. I&apos;ll get back to you at {sender.email} soon.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={(event) => {
        const target: EventTarget = event.target;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          clearFieldError(target.name);
        }
      }}
      aria-label="Contact form"
      className="relative grid gap-6 rounded-2xl border border-ink bg-white p-6 text-left text-ink md:p-10"
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium">What brings you here?</legend>
        <div className="flex flex-wrap gap-2">
          {leadIntents.map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="intent"
                value={value}
                checked={intent === value}
                onChange={() => chooseIntent(value)}
                className="peer sr-only"
              />
              <span className={choicePill}>{leadIntentLabels[value]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <TextField name="name" label="Name" required autoComplete="name" error={fieldErrors.name} />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={fieldErrors.email}
        />
      </div>

      {intent === 'hiring' && (
        <div className="grid gap-5 md:grid-cols-3">
          <TextField
            name="company"
            label="Company"
            required
            autoComplete="organization"
            error={fieldErrors.company}
          />
          <TextField
            name="role"
            label="Role"
            autoComplete="organization-title"
            placeholder="e.g. SEO Manager"
            error={fieldErrors.role}
          />
          <TextField
            name="location"
            label="Location"
            placeholder="e.g. Dubai, UAE"
            error={fieldErrors.location}
          />
        </div>
      )}

      {intent === 'project' && (
        <>
          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              name="website"
              label="Website"
              type="url"
              autoComplete="url"
              placeholder="example.com"
              error={fieldErrors.website}
            />
            <div>
              <label htmlFor="lead-budget" className="mb-1.5 block text-sm font-medium">
                Monthly budget<span aria-hidden="true"> *</span>
              </label>
              <select
                id="lead-budget"
                name="budget"
                defaultValue=""
                aria-required
                aria-invalid={fieldErrors.budget ? true : undefined}
                aria-describedby={fieldErrors.budget ? 'lead-budget-error' : undefined}
                className={inputClass}
              >
                <option value="" disabled>
                  Choose a range
                </option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {budgetLabels[range]}
                  </option>
                ))}
              </select>
              <FieldError id="lead-budget-error" message={fieldErrors.budget} />
            </div>
          </div>
          <fieldset aria-describedby={fieldErrors.services ? 'lead-services-error' : undefined}>
            <legend className="mb-3 text-sm font-medium">
              Services you&apos;re interested in<span aria-hidden="true"> *</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <label key={service} className="cursor-pointer">
                  <input type="checkbox" name="services" value={service} className="peer sr-only" />
                  <span className={choicePill}>{serviceLabels[service]}</span>
                </label>
              ))}
            </div>
            <FieldError id="lead-services-error" message={fieldErrors.services} />
          </fieldset>
        </>
      )}

      <TextField
        name="message"
        label="Message"
        required
        multiline
        placeholder={
          intent === 'hiring'
            ? 'Tell me about the role and your team.'
            : 'What would you like to grow, and by when?'
        }
        error={fieldErrors.message}
      />

      {/* Honeypot: hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-fax">Fax</label>
        <input id="lead-fax" type="text" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="lead-consent"
            type="checkbox"
            name="consent"
            aria-invalid={fieldErrors.consent ? true : undefined}
            aria-describedby={fieldErrors.consent ? 'lead-consent-error' : undefined}
            className="mt-0.5 size-4 shrink-0 accent-blue"
          />
          <label htmlFor="lead-consent" className="text-sm text-grey-600">
            I agree to be contacted about this enquiry. See the{' '}
            <Link href="/privacy" className="text-ink underline underline-offset-2">
              privacy notice
            </Link>
            .
          </label>
        </div>
        <FieldError id="lead-consent-error" message={fieldErrors.consent} />
      </div>

      {formError && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-ink bg-yellow-50 px-4 py-3 text-sm"
        >
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-blue" />
          {formError}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-grey-600">Fields marked * are required.</p>
        <Button type="submit" variant="solid" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            'Sending…'
          ) : (
            <>
              Send message
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
