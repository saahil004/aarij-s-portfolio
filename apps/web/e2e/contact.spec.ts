import { expect, type Page, test } from '@playwright/test';

async function openForm(page: Page) {
  await page.goto('/');
  const contact = page.getByRole('region', { name: "Let's grow something together." });
  await contact.getByRole('button', { name: "Let's Talk" }).click();
  const form = page.getByRole('form', { name: 'Contact form' });
  await expect(form).toBeVisible();
  return form;
}

test('shows field errors for an empty submission', async ({ page }) => {
  const form = await openForm(page);
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByText('Please enter your name.')).toBeVisible();
  await expect(form.getByLabel(/^Name/)).toHaveAttribute('aria-invalid', 'true');
  await expect(form.getByLabel(/^Name/)).toBeFocused();
});

test('asks project leads for services and budget', async ({ page }) => {
  const form = await openForm(page);
  await form.getByText('Business project').click();
  await expect(form.getByRole('group', { name: /Services/ })).toBeVisible();
  await expect(form.getByLabel(/^Monthly budget/)).toBeVisible();
  await expect(form.getByLabel(/^Company/)).toHaveCount(0);
});

test('explains that messages cannot be sent until the API is connected', async ({ page }) => {
  const form = await openForm(page);
  await form.getByLabel(/^Name/).fill('Sara Khan');
  await form.getByLabel(/^Email/).fill('sara@example.com');
  await form.getByLabel(/^Company/).fill('Acme LLC');
  await form.getByLabel(/^Message/).fill('We are hiring an SEO lead for our Dubai office.');
  await form.getByRole('checkbox', { name: /agree to be contacted/ }).check();
  await form.getByRole('button', { name: 'Send message' }).click();
  await expect(form.getByRole('alert')).toContainText("can't be sent right now");
});

test("opens the form from the header's Let's Talk link", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('banner').getByRole('link', { name: "Let's Talk" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('form', { name: 'Contact form' })).toBeVisible();
});

test('opens the form when arriving on #contact', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.getByRole('form', { name: 'Contact form' })).toBeVisible();
});
