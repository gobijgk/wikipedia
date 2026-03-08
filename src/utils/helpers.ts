import { Page, expect } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

export function randomEmail() {
  return `user_${Date.now()}@example.com`;
}