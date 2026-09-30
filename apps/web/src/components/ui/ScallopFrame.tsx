import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * Meeko's hero frame: three stacked, scalloped lobes (drawn in a 240×300 box).
 * Used both as a clip path for the photo and as the ink outline on top of it.
 */
const SCALLOP_PATH =
  'M64 0H176C212 0 240 22 240 52C240 80 222 94 214 100C236 110 240 128 240 150C240 172 236 190 214 200C222 206 240 220 240 248C240 278 212 300 176 300H64C28 300 0 278 0 248C0 220 18 206 26 200C4 190 0 172 0 150C0 128 4 110 26 100C18 94 0 80 0 52C0 22 28 0 64 0Z';

export type FrameImage = { src: string; width: number; height: number; alt: string };

type ScallopFrameProps = {
  image: FrameImage | null;
  /** Name used for the monogram fallback and its accessible label. */
  fallbackLabel: string;
  clipId?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Adds a color panel the motion layer slides away to reveal the photo. */
  curtain?: boolean;
};

export function ScallopFrame({
  image,
  fallbackLabel,
  clipId = 'scallop-frame',
  priority = false,
  sizes = '(min-width: 1024px) 26rem, 70vw',
  className,
  curtain = false,
}: ScallopFrameProps) {
  return (
    <div data-scallop className={cn('relative aspect-4/5 w-full', className)}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={SCALLOP_PATH} transform="scale(0.0041667 0.0033333)" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0 bg-sky" style={{ clipPath: `url(#${clipId})` }}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`${fallbackLabel} — portrait coming soon`}
            className="flex h-full w-full items-center justify-center"
          >
            <span
              aria-hidden="true"
              className="text-[clamp(6rem,14vw,11rem)] leading-none font-medium tracking-[-0.06em] text-blue"
            >
              {fallbackLabel.charAt(0)}
            </span>
          </div>
        )}
        {curtain && (
          <div
            aria-hidden="true"
            data-scallop-curtain
            className="absolute inset-0 hidden bg-yellow"
          />
        )}
      </div>

      <svg
        viewBox="0 0 240 300"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-ink"
      >
        <path
          d={SCALLOP_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
