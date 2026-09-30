import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('lists every case study and opens one', async ({ page }) => {
  await page.goto('/case-studies');
  const titles = page.getByRole('list').getByRole('heading', { level: 2 });
  await expect(titles).toHaveCount(6);

  await page
    .getByRole('link', { name: 'Ranking a digital agency for high-intent service searches' })
    .click();
  await expect(page).toHaveURL(/\/case-studies\/livebits$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Ranking a digital agency for high-intent service searches',
  );
});

test('shows KPIs and loads every evidence image', async ({ page }) => {
  await page.goto('/case-studies/livebits');
  const kpis = page.getByRole('region', { name: 'Results & KPIs' });
  await expect(kpis.getByRole('definition').first()).toHaveText('#1');

  // Scroll through so lazily loaded screenshots are requested.
  for (const image of await page.locator('article img').all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await page.waitForLoadState('networkidle');
  const broken = await page
    .locator('article img')
    .evaluateAll((images) =>
      (images as HTMLImageElement[])
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.alt),
    );
  expect(broken).toEqual([]);
});

test('returns a 404 page for an unknown case study', async ({ page }) => {
  const response = await page.goto('/case-studies/does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: "This page doesn't exist." })).toBeVisible();
});

test('case study page has no serious accessibility violations', async ({ page }) => {
  await page.goto('/case-studies/archentire');
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) =>
    ['serious', 'critical'].includes(v.impact ?? ''),
  );
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
