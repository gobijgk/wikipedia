import { test, expect } from '../src/pages';

import data from '../test-data/wikipedia-test-data.json';

const SEARCH_TERM: string = data.SEARCH_TERM;
const EXPECTED_KEYWORD: string = data.EXPECTED_KEYWORD;

test('wikipedia search and article validations', async ({ homePage, articlePage, helpers }) => {
  await homePage.openHomePage();
  await homePage.selectEnglish();
  await homePage.search(SEARCH_TERM);
  await articlePage.expectLoaded(SEARCH_TERM);
  await articlePage.expectTableOfContentsVisible();
  const text = await articlePage.getFirstParagraphText();
  await articlePage.expectContainText(text, EXPECTED_KEYWORD);
});
