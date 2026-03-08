import { test as base, expect, Page } from '@playwright/test';
import BasePageClass from './BasePage';
import HomePageClass from './HomePage';
import ArticlePageClass from './ArticlePage';
import * as Helpers from '../utils/helpers';

export const BasePage = BasePageClass;
export const HomePage = HomePageClass;
export const ArticlePage = ArticlePageClass;

export type CustomFixtures = {
  homePage: HomePageClass;
  articlePage: ArticlePageClass;
  helpers: typeof Helpers;
};

export const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePageClass(page));
  },

  articlePage: async ({ page }, use) => {
    await use(new ArticlePageClass(page));
  },

  helpers: async ({}, use) => {
    await use(Helpers);
  },
});

export { expect };


