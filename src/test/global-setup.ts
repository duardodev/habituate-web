import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await context.addCookies([
    {
      name: 'token',
      value: process.env.JWT_TOKEN!,
      domain: 'localhost',
      path: '/',
    },
  ]);

  await page.goto('http://localhost:3000');
  await context.storageState({ path: 'storage-state.json' });
  await browser.close();
}

export default globalSetup;
