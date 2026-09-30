import type { ProcessIcon, SocialPlatform } from '@aarij/shared';
import {
  ChartColumn,
  Compass,
  Globe,
  type LucideIcon,
  RefreshCw,
  Rocket,
  Search,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const processIcons: Record<ProcessIcon, LucideIcon> = {
  search: Search,
  strategy: Compass,
  rocket: Rocket,
  chart: ChartColumn,
  refresh: RefreshCw,
};

export const socialLabels: Record<SocialPlatform, string> = {
  linkedin: 'LinkedIn',
  x: 'X',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
  github: 'GitHub',
  behance: 'Behance',
  upwork: 'Upwork',
  fiverr: 'Fiverr',
};

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Simple line glyphs for social profiles (lucide no longer ships brand icons). */
export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const svg = (children: ReactNode) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className} {...stroke}>
      {children}
    </svg>
  );
  switch (platform) {
    case 'linkedin':
      return svg(<path d="M7 10v7M7 7v.01M11 17v-7M11 13.5a3 3 0 0 1 6 0V17" />);
    case 'x':
      return svg(<path d="M5 5l14 14M19 5L5 19" />);
    case 'instagram':
      return svg(
        <>
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M16.5 7.5v.01" />
        </>,
      );
    case 'facebook':
      return svg(<path d="M15 5h-2a3 3 0 0 0-3 3v12M7.5 11.5h7" />);
    case 'youtube':
      return svg(
        <>
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="M10.5 9.5v5l4-2.5z" />
        </>,
      );
    default: {
      return (
        <Globe aria-hidden="true" focusable="false" className={className} strokeWidth={1.75} />
      );
    }
  }
}
