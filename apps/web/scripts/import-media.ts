/**
 * Optimizes images from `source-content/` into `public/media/` and writes
 * `src/content/media-manifest.json` (dimensions + logo tile background).
 *
 * Run: pnpm --filter web media:import
 */
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { cornerBackground, type Rgba, targetWidth, uniformBackground } from './media-lib.ts';
import { type MediaSource, mediaSources } from './media-sources.ts';

const webRoot = path.resolve(import.meta.dirname, '..');
const sourceRoot = path.resolve(webRoot, '../../source-content');
const outRoot = path.join(webRoot, 'public', 'media');
const manifestPath = path.join(webRoot, 'src', 'content', 'media-manifest.json');

type ManifestEntry = { width: number; height: number; bg: string | null };

async function readCorners(input: string | Buffer): Promise<Rgba[]> {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixel = (x: number, y: number): Rgba => {
    const i = (y * info.width + x) * 4;
    return { r: data[i] ?? 0, g: data[i + 1] ?? 0, b: data[i + 2] ?? 0, a: data[i + 3] ?? 0 };
  };
  const right = info.width - 1;
  const bottom = info.height - 1;
  return [pixel(0, 0), pixel(right, 0), pixel(0, bottom), pixel(right, bottom)];
}

async function processOne(source: MediaSource): Promise<ManifestEntry> {
  const input = path.join(sourceRoot, source.from);
  const output = path.join(outRoot, ...source.to.split('/'));
  await mkdir(path.dirname(output), { recursive: true });

  let buffer = await sharp(input).toBuffer();
  let bg: string | null = null;

  if (source.kind === 'logo') {
    // Crop surrounding padding so every mark sits at a consistent size, then pick the
    // tile color from the cropped corners (e.g. a gold logo on a black box → black tile).
    const canvasBg = cornerBackground(await readCorners(input));
    try {
      buffer = await sharp(buffer)
        .trim({ ...(canvasBg ? { background: canvasBg } : {}), threshold: 18 })
        .png()
        .toBuffer();
    } catch {
      // Uniform images can't be trimmed; keep the original.
    }
    bg = uniformBackground(await readCorners(buffer)) ?? canvasBg;
  }

  const meta = await sharp(buffer).metadata();
  const info = await sharp(buffer)
    .resize({ width: targetWidth(source.kind, meta.width ?? 0), withoutEnlargement: true })
    .webp({ quality: source.kind === 'logo' ? 88 : 80, alphaQuality: 90, effort: 6 })
    .toFile(output);

  return { width: info.width, height: info.height, bg };
}

async function main() {
  await rm(outRoot, { recursive: true, force: true });
  const manifest: Record<string, ManifestEntry> = {};
  for (const source of mediaSources) {
    manifest[source.to] = await processOne(source);
    console.log(`✓ ${source.to}`);
  }
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`\n${mediaSources.length} images → public/media, manifest updated.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
