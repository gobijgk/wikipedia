import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class HomePage extends BasePage {
  readonly englishLink: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.englishLink = page.getByRole('link', { name: 'English'})
    this.searchInput = page.getByRole('searchbox', { name: 'Search Wikipedia' });
  }

  async selectEnglish() {
    await this.click(this.englishLink);
  }

  async search(term: string) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(term);
    await this.page.keyboard.press('Enter')
  }
  
  async openHomePage() {
    await this.navigate('/');
  }

}