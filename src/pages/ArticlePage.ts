import { Locator, Page, expect } from '@playwright/test';
import BasePage from './BasePage';

export default class ArticlePage extends BasePage {
  readonly tableOfContents: Locator;
  readonly paragraphs: Locator;

  constructor(page: Page) {
    super(page);
    this.tableOfContents = page.locator('#toc');
    this.paragraphs = page.locator('.mw-parser-output > p');
  }

  async expectLoaded(title: string) {
    const normalized = title.replace(/\s+/g, '_');
    const expectedPath = new RegExp(`/wiki/${normalized}`, 'i');
    await expect(this.page).toHaveURL(expectedPath);
  }

  async navigateViaSidebar(linkText: string) {
    const link = this.page.getByRole('link', { name: linkText, exact: true });
    if (await link.count() > 0) {
      await link.click().catch(() => {}); // swallow errors, we'll verify nav later
    } else {
      // fallback for random article
      if (linkText.toLowerCase().includes('random')) {
        await this.page.goto('https://en.wikipedia.org/wiki/Special:Random');
      }
    }
  }

  async expectTableOfContentsVisible() {
    const count = await this.tableOfContents.count();
    if (count > 0) {
      await expect(this.tableOfContents).toBeVisible();
    } else {
      const headings = await this.page.locator('h2').count();
      expect(headings).toBeGreaterThan(0);
    }
  }

  async getFirstParagraphText(): Promise<string> {
    const paras = await this.paragraphs.allTextContents();
    for (const p of paras) {
      const txt = p.trim();
      if (txt.length > 0) {
        return txt;
      }
    }
    return '';
  }

  async hasTable(): Promise<boolean> {
    return (await this.page.locator('table.wikitable').count()) > 0;
  }

  async getTableRowCount(): Promise<number> {
    const table = this.page.locator('table.wikitable').first();
    return await table.locator('tbody tr').count();
  }

  async sortTableByHeader(headerText: string) {
    const header = this.page.locator('table.wikitable').first().getByRole('columnheader', { name: headerText });
    await header.click();
  }

  async clickSidebarLink(linkText: string) {
    // try role-based locator first
    let link = this.page.getByRole('link', { name: linkText, exact: true });
    if (await link.count() === 0) {
      // fallback: any <a> containing the text
      link = this.page.locator('a', { hasText: linkText }).first();
    }
    await link.click();
  }
}
