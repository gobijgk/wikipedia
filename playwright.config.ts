import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  testDir: 'tests',
  outputDir: 'test-results/',
  retries: 0,
  reporter: [
  ['html', { open: 'on-failure' }]
 ],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  use: {
    baseURL: 'https://www.wikipedia.org',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
};

export default config;
