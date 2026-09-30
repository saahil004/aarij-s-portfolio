import { Mail } from 'lucide-react';
import Link from 'next/link';

/** Meeko's circular "available" badge, fixed bottom-right. The text ring rotates. */
export function RotatingBadge({ text }: { text: string }) {
  const ring = `${text.toUpperCase()} · `;
  return (
    <Link
      href="/#contact"
      data-rotating-badge
      aria-label="Get in touch"
      className="fixed right-3 bottom-3 z-40 flex size-17 items-center justify-center rounded-full border border-ink bg-yellow transition-transform duration-300 hover:scale-105 md:right-6 md:bottom-6 md:size-24"
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        focusable="false"
        className="animate-badge-spin absolute inset-0 size-full"
      >
        <defs>
          <path id="badge-ring" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <text className="fill-ink text-[8.5px] font-semibold tracking-[0.08em]">
          <textPath href="#badge-ring" textLength="230" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="relative flex size-7 items-center justify-center rounded-full border border-ink bg-white md:size-9">
        <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </span>
    </Link>
  );
}
