const { chromium, devices } = require('@playwright/test');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
  const page = await context.newPage();
  await page.goto('https://clarendon.omg.qa.oliver.solutions/projects/create');
  await page.waitForLoadState('networkidle');
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  for (const text of ['Select Business Area', 'Business area', 'Business Area', 'Business area', 'Title', 'Billing Entity', 'Billing Contact', 'External Deadline']) {
    const count = await page.locator(`text="${text}"`).count();
    console.log(text, 'count=', count);
  }
  const buttons = await page.locator('button').allInnerTexts();
  console.log('Buttons:', buttons.slice(0, 30));
  const labels = await page.locator('label').allInnerTexts();
  console.log('Labels:', labels.slice(0, 40));
  await page.screenshot({ path: 'debug_project_create.png', fullPage: true });
  await browser.close();
})();