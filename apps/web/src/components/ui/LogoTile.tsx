import type { MediaRef } from '@aarij/shared';
import Image from 'next/image';
import { media } from '@/content/media';
import { cn } from '@/lib/cn';

/** A logo on a bordered tile whose color matches the logo's own background. */
export function LogoTile({ logo, className }: { logo: MediaRef; className?: string }) {
  const info = media(logo.path);
  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-xl border border-ink',
        className,
      )}
      style={{ backgroundColor: info.bg ?? '#ffffff' }}
    >
      <Image
        src={info.src}
        width={info.width}
        height={info.height}
        alt={logo.alt}
        sizes="160px"
        className="h-full w-auto max-w-full object-contain"
      />
    </div>
  );
}
