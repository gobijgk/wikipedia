import { Locator, Page, expect } from '@playwright/test';

export default class BasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await locator.fill('');
    await locator.type(text);
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }
  async expectContainText(actual: string, keyword: string) {
    expect(actual).toContain(keyword);
  }

}