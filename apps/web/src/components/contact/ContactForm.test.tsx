import type { LeadSubmission } from '@aarij/shared';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ContactForm } from './ContactForm';
import type { SubmitResult } from './lead-client';

function setup(result: SubmitResult = { ok: true }) {
  const submissions: LeadSubmission[] = [];
  const onSubmitLead = async (submission: LeadSubmission) => {
    submissions.push(submission);
    return result;
  };
  const user = userEvent.setup();
  render(<ContactForm email={null} onSubmitLead={onSubmitLead} />);
  return { user, submissions };
}

async function fillCommonFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name/i), 'Sara Khan');
  await user.type(screen.getByLabelText(/^email/i), 'sara@example.com');
  await user.type(screen.getByLabelText(/^message/i), 'We are hiring an SEO lead in Dubai.');
  await user.click(screen.getByRole('checkbox', { name: /agree to be contacted/i }));
}

describe('ContactForm', () => {
  it('shows hiring fields by default and project fields when switching intent', async () => {
    const { user } = setup();
    expect(screen.getByLabelText(/^company/i)).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: /services/i })).not.toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: 'Business project' }));
    expect(screen.getByRole('group', { name: /services/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/^company/i)).not.toBeInTheDocument();
  });

  it('shows field errors instead of submitting an incomplete form', async () => {
    const { user, submissions } = setup();
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(submissions).toHaveLength(0);
    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('submits the lead with anti-spam metadata and confirms success', async () => {
    const { user, submissions } = setup();
    await fillCommonFields(user);
    await user.type(screen.getByLabelText(/^company/i), 'Acme LLC');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(submissions).toHaveLength(1);
    expect(submissions[0]?.lead).toMatchObject({
      intent: 'hiring',
      name: 'Sara Khan',
      company: 'Acme LLC',
    });
    expect(submissions[0]?.meta.hp).toBe('');
    expect(submissions[0]?.meta.elapsedMs).toBeGreaterThanOrEqual(0);
    expect(await screen.findByRole('status')).toHaveTextContent(/thanks, sara/i);
  });

  it('explains when the form cannot send yet', async () => {
    const { user } = setup({ ok: false, kind: 'unavailable' });
    await fillCommonFields(user);
    await user.type(screen.getByLabelText(/^company/i), 'Acme LLC');
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/can.t be sent right now/i);
  });
});
