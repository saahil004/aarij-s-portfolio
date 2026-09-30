import Link from 'next/link';

/** Fallback for errors outside the site layout; most 404s render (site)/not-found.tsx. */
export default function RootNotFound() {
  return (
    <main className="container-page flex min-h-svh flex-col items-center justify-center text-center">
      <h1 className="text-title">This page doesn&apos;t exist.</h1>
      <Link href="/" className="mt-6 text-blue underline underline-offset-4">
        Go to the homepage
      </Link>
    </main>
  );
}
