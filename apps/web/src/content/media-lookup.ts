export type MediaEntry = { width: number; height: number; bg: string | null };
export type MediaManifest = Record<string, MediaEntry>;
export type MediaInfo = MediaEntry & { src: string };

export function createMediaLookup(manifest: MediaManifest) {
  return {
    has(path: string): boolean {
      return Object.hasOwn(manifest, path);
    },
    media(path: string): MediaInfo {
      const entry = manifest[path];
      if (!entry) {
        throw new Error(`Unknown media path "${path}". Run \`pnpm --filter web media:import\`.`);
      }
      return { src: `/media/${path}`, ...entry };
    },
  };
}
