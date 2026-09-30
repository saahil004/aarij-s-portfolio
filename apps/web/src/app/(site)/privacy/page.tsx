import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { getSiteSettings } from '@/content';
import { buildMetadata } from '@/lib/seo';
import { siteName } from '@/lib/site-name';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: 'Privacy notice',
    description: `How ${settings.name} handles the information you share through this website's contact form.`,
    path: '/privacy',
    siteName: siteName(settings),
  });
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const contact = settings.email ? (
    <a href={`mailto:${settings.email}`}>{settings.email}</a>
  ) : (
    <a href="/#contact">the contact form</a>
  );

  return (
    <>
      <PageHeader
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Privacy', path: '/privacy' },
        ]}
        title="Privacy notice"
        intro="What this website collects, why, and what you can ask me to do with it."
      />
      <div className="container-page py-16 md:py-24">
        <div className="prose-content max-w-2xl">
          <h2>What the contact form collects</h2>
          <p>
            When you send a message, the form collects what you type: your name, email address and
            message, plus the optional details for your enquiry (company, role, location, website,
            services of interest and budget range).
          </p>
          <p>
            To stop spam, the server also records a one-way hash of your IP address (never the
            address itself), your browser’s user agent and the page you came from.
          </p>
          <h2>Why it is collected</h2>
          <p>
            Only to reply to your enquiry and follow up on it. Your details are not sold, shared
            with advertisers or added to a mailing list.
          </p>
          <h2>How long it is kept</h2>
          <p>
            Enquiries are kept only as long as they are useful for responding and following up, and
            are deleted on request.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            This website does not set advertising cookies. If analytics are added, this notice will
            be updated first.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask to see, correct or delete the information you have sent at any time by
            getting in touch through {contact}.
          </p>
        </div>
      </div>
    </>
  );
}
