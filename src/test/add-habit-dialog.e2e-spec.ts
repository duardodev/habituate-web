import { expect, test } from '@playwright/test';

test('add habit successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Novo hábito' }).click();

  await page.getByPlaceholder('Nome do hábito').fill('Correr 1KM');

  await page.getByRole('button', { name: 'Adicionar' }).click();

  await page.waitForLoadState('networkidle');

  const toast = page.getByText('Hábito adicionado com sucesso!');

  expect(toast).toBeVisible();

  await page.getByRole('button', { name: 'Cancelar' }).click();

  expect(page.getByText('Correr 1KM')).toBeVisible();
});

test('do not add habit if input title is empty', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Novo hábito' }).click();

  await page.getByRole('button', { name: 'Adicionar' }).click();

  const toast = page.getByText('Informe o nome do hábito!');

  expect(toast).toBeVisible();
});
