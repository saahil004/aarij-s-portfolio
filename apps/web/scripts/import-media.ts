/**
 * Optimizes images from `source-content/` into `public/media/` and writes
 * `src/content/media-manifest.json` (dimensions + logo tile background).
 *
 * Run: pnpm --filter web media:import
 */
import { existsSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {
  cornerBackground,
  firstExisting,
  type Rgba,
  targetWidth,
  uniformBackground,
} from './media-lib.ts';
import { type MediaSource, mediaSources, optionalSources } from './media-sources.ts';

/** Portraits are cropped to the hero frame's 4:5, centred on the most interesting region. */
const PORTRAIT = { width: 960, height: 1200 };

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

  if (source.kind === 'portrait') {
    const info = await sharp(input)
      .rotate() // respect EXIF orientation from phone cameras
      .resize({ ...PORTRAIT, fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: 82, effort: 6 })
      .toFile(output);
    return { width: info.width, height: info.height, bg: null };
  }

  let buffer = await sharp(input).toBuffer();
  let bg: string | null = null;

  if (source.kind === 'logo') {
    // Crop surrounding padding so every mark sits at a consistent size, then pick the
    // tile color from the cropped corners (e.g. a gold logo on a black box → black tile).
    let canvasBg = cornerBackground(await readCorners(input));
    if (canvasBg) {
      // Opaque canvases sometimes carry a 1px frame (e.g. klaviyo.png) that blocks trimming.
      const { width = 0, height = 0 } = await sharp(buffer).metadata();
      buffer = await sharp(buffer)
        .extract({ left: 2, top: 2, width: width - 4, height: height - 4 })
        .png()
        .toBuffer();
      canvasBg = cornerBackground(await readCorners(buffer));
    }
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
  for (const optional of optionalSources) {
    const from = firstExisting(optional.candidates, (candidate) =>
      existsSync(path.join(sourceRoot, candidate)),
    );
    if (!from) {
      console.log(`– ${optional.to} skipped (add source-content/${optional.candidates[0]})`);
      continue;
    }
    manifest[optional.to] = await processOne({ from, to: optional.to, kind: optional.kind });
    console.log(`✓ ${optional.to} (from ${from})`);
  }
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`\n${Object.keys(sorted).length} images → public/media, manifest updated.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
