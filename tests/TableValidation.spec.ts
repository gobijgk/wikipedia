import { test, expect } from '../src/pages';
import data from '../test-data/wikipedia-test-data.json';

const TABLE_TERM: string = data.TABLE_TERM;

test('table validation on article', async ({ homePage, articlePage }) => {
  await homePage.openHomePage();
  await homePage.selectEnglish();
  await homePage.search(TABLE_TERM);
  await articlePage.expectLoaded(TABLE_TERM);
  expect(await articlePage.hasTable()).toBeTruthy();
  const beforeCount = await articlePage.getTableRowCount();
  expect(beforeCount).toBeGreaterThan(0);
  const headerLocator = articlePage.page.locator('table.wikitable').first().locator('th').first();
  const headerText = await headerLocator.textContent();
  if (headerText) {
    await articlePage.sortTableByHeader(headerText.trim());
    const afterCount = await articlePage.getTableRowCount();
    expect(afterCount).toBeGreaterThan(0);
  }
});
