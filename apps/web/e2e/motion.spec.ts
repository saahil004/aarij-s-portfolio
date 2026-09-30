import { expect, test } from '@playwright/test';

test('reduced motion gets the static page with no smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/motion-ok/);
  await expect(html).not.toHaveClass(/lenis/);
  for (const element of await page.locator('[data-hero-anim]').all()) {
    await expect(element).toHaveCSS('opacity', '1');
  }
  await expect(page.locator('[data-scallop-curtain]')).toBeHidden();
});

test('the hero intro ends with everything visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/motion-ok/);
  for (const element of await page.locator('[data-hero-copy]').all()) {
    await expect(element).toHaveCSS('opacity', '1');
  }
});

test('result counters finish on the real values', async ({ page }) => {
  await page.goto('/');
  await page.locator('#results').scrollIntoViewIfNeeded();
  const values = page.locator('[data-metric-value]');
  await expect(values).toHaveText(['181K', '8.5K', '548', '+300%', '+1,300%', '#1'], {
    timeout: 8000,
  });
});
