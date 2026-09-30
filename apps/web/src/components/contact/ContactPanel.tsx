'use client';

import { useEffect, useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ContactForm } from './ContactForm';

/** Meeko's "Get in Touch" button with its handwritten note; reveals the lead form. */
export function ContactPanel({
  buttonLabel,
  annotation,
  email,
}: {
  buttonLabel: string;
  annotation: string;
  email: string | null;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Links to #contact (nav, hero, badge) open the form directly.
  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === '#contact') setOpen(true);
    };
    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, []);

  function openForm() {
    setOpen(true);
    requestAnimationFrame(() => document.getElementById('lead-name')?.focus());
  }

  return (
    <>
      <div className="relative mt-10 inline-flex">
        <Button variant="light" aria-expanded={open} aria-controls={panelId} onClick={openForm}>
          {buttonLabel}
        </Button>
        <span
          aria-hidden="true"
          data-contact-annotation
          className="pointer-events-none absolute top-[70%] left-full hidden w-40 pl-3 text-left font-hand text-xl leading-none text-white/85 sm:block"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 60 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-1 h-6 w-9 -scale-x-100"
          >
            <path d="M4 36C14 34 34 30 46 12" />
            <path d="M38 13l8-2 1 8" />
          </svg>
          <span className="block -rotate-6">{annotation}</span>
        </span>
      </div>

      <div id={panelId} hidden={!open} className="mx-auto mt-12 w-full max-w-3xl">
        <ContactForm email={email} />
      </div>
    </>
  );
}
