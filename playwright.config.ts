import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  testDir: 'tests',
  outputDir: 'test-results/',
  retries: 0,
  workers: process.env.CI ? 2 : undefined, // allow parallel execution by default
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
};

export default config;
