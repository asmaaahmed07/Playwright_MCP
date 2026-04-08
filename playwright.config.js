// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://clarendon.omg.qa.oliver.solutions',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
    launchOptions: {
      slowMo: Number(process.env.PW_SLOWMO || 0)
    }
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.spec\.js/,
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    }
  ]
});
