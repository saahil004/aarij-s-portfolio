import { expect, test } from '@playwright/test';

test('sitemap lists the home page and case studies but no empty blog', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  expect(xml).toContain('/case-studies/livebits</loc>');
  expect(xml).toContain('/case-studies/archentire</loc>');
  expect(xml).not.toContain('/blog');
});

test('robots.txt points to the sitemap', async ({ request }) => {
  const text = await (await request.get('/robots.txt')).text();
  expect(text).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
  expect(text).toContain('Disallow: /admin');
});

test('RSS feed is served as XML', async ({ request }) => {
  const response = await request.get('/rss.xml');
  expect(response.headers()['content-type']).toContain('application/rss+xml');
  expect(await response.text()).toContain('<channel>');
});

test('home page has canonical, description and social image tags', async ({ page }) => {
  await page.goto('/');
  // Next writes the root canonical as the bare origin.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /^https?:\/\/[^/]+\/?$/,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /SEO/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /opengraph-image/,
  );
});

test('social card images render as PNG', async ({ page, request }) => {
  for (const path of ['/', '/case-studies/livebits']) {
    await page.goto(path);
    const url = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(url).toBeTruthy();
    // og:image is absolute to the production origin; fetch the same path from this server.
    const response = await request.get(new URL(url ?? '').pathname);
    expect(response.headers()['content-type']).toContain('image/png');
  }
});
