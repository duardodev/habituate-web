import { expect, test } from '@playwright/test';

test('display the habit title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(page.getByText('Correr 1KM')).toBeVisible();
});

test('edit the habit title', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByText('Correr 1KM').click();

  await page.getByRole('menuitem', { name: 'Renomear' }).click();

  const input = page.locator('input[type="text"]');
  await input.fill('Correr 5KM');
  await input.press('Enter');

  await expect(page.getByText('Correr 5KM')).toBeVisible();
});

test('toggle the habit', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const habitTitle = page.getByText('Correr 5KM');
  await expect(habitTitle).toBeVisible();

  const habitContainer = habitTitle.locator('xpath=ancestor::li');
  await expect(habitContainer).toBeVisible();

  const checkboxes = habitContainer.getByRole('checkbox');
  await expect(checkboxes).toHaveCount(7);

  const firstCheckbox = checkboxes.first();
  await expect(firstCheckbox).not.toBeChecked();

  await firstCheckbox.click();
  await page.waitForTimeout(500);
  await expect(firstCheckbox).toBeChecked();

  await firstCheckbox.click();
  await page.waitForTimeout(500);
  await expect(firstCheckbox).not.toBeChecked();
});

test('remove the habit', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByText('Correr 5KM').click();

  await page.getByRole('menuitem', { name: 'Remover' }).click();

  await expect(page.getByText('Correr 5KM')).not.toBeVisible();
});
