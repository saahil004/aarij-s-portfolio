import type { SectionContent, SiteSettings } from '@aarij/shared';
import { MessageCircleMore } from 'lucide-react';
import { ContactPanel } from './ContactPanel';

/** Closing call to action on every page (Meeko's dark "Let's talk" block). */
export function ContactSection({
  content,
  settings,
}: {
  content: SectionContent<'cta'>;
  settings: SiteSettings;
}) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-24 pb-24 md:pt-32 md:pb-28">
      <div className="container-page flex flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="flex h-11 w-14 items-center justify-center rounded-xl border border-white/80 bg-white text-ink"
        >
          <MessageCircleMore className="size-5" strokeWidth={1.5} />
        </span>
        <h2
          id="contact-title"
          data-reveal-title
          className="mt-8 max-w-[13ch] text-display text-white"
        >
          {content.title}
        </h2>
        <p className="mt-6 max-w-lg text-lead text-white/75">{content.text}</p>
        <ContactPanel
          buttonLabel={content.buttonLabel}
          annotation={content.annotation}
          email={settings.email}
        />
      </div>
    </section>
  );
}
