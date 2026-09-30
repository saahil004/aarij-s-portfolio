import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const sectionHeadings = [
  "I don't just do marketing. I build growth.",
  'My numbers say it all',
  'Growth stories, measured in results.',
  'How I grow a business through digital marketing.',
  'Value-focused marketing that delivers.',
  'My marketing technology stack.',
  'Before & after.',
  'My 90-day growth framework.',
  "Industries I've worked with.",
  'About me.',
  "Let's grow something together.",
];

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('shows the hero and every visible section', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Digital Marketing Specialist',
  );
  for (const name of sectionHeadings) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeAttached();
  }
});

test('never scrolls horizontally', async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('hides the blog preview until a post is published', async ({ page }) => {
  await expect(page.locator('#blog')).toHaveCount(0);
});

test('publishes structured data for Aarij', async ({ page }) => {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const graph = blocks.map((text) => JSON.parse(text)).find((data) => data['@graph']);
  const person = graph['@graph'].find((node: { '@type': string }) => node['@type'] === 'Person');
  expect(person).toMatchObject({ name: 'Aarij', jobTitle: 'Digital Marketing Specialist' });
});

test('has no serious accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) =>
    ['serious', 'critical'].includes(v.impact ?? ''),
  );
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test('jumps to a section from the header navigation', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'Desktop navigation only');
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Process' })
    .click();
  await expect(page).toHaveURL(/#process$/);
  await expect(
    page.getByRole('heading', { name: 'How I grow a business through digital marketing.' }),
  ).toBeInViewport();
});

test('opens the mobile menu and follows a link', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile navigation only');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.getByRole('navigation', { name: 'Mobile' });
  await menu.getByRole('link', { name: 'Case Studies' }).click();
  await expect(page).toHaveURL(/#case-studies$/);
  await expect(menu).toBeHidden();
});
