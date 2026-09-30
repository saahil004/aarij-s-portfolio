import { notFound } from 'next/navigation';

/** Sends unknown URLs to the site's own 404 page, so it keeps the header and footer. */
export default function CatchAll() {
  notFound();
}
