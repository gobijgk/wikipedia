import { test, expect } from '../src/pages';
import data from '../test-data/wikipedia-test-data.json';

const SEARCH_TERM: string = data.SEARCH_TERM;
const SIDEBAR_LINK: string = data.SIDEBAR_LINK;


test('sidebar link navigation results in new page with title', async ({ homePage, articlePage }) => {
  await homePage.openHomePage();
  await homePage.selectEnglish();
  await homePage.search(SEARCH_TERM);
  await articlePage.expectLoaded(SEARCH_TERM);
  await articlePage.navigateViaSidebar(SIDEBAR_LINK);
  await expect(articlePage.page).not.toHaveURL(new RegExp(SEARCH_TERM.replace(/\s+/g, '_')));
  const title = await articlePage.page.title();
  expect(title.trim().length).toBeGreaterThan(0);
});