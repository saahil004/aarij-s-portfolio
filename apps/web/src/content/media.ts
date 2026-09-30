import { createMediaLookup, type MediaManifest } from './media-lookup';
import manifest from './media-manifest.json';

export type { MediaInfo } from './media-lookup';

const lookup = createMediaLookup(manifest as MediaManifest);

/** Resolves a media path (e.g. `brands/livebits.webp`) to src, size and tile background. */
export const media = lookup.media;
export const hasMedia = lookup.has;
