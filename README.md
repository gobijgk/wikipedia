# Wikipedia E2E Test Framework

A Playwright + TypeScript project designed for testing Wikipedia with a
Page Object Model (POM) and data‑driven specs.

## Key Concepts

- **Page Object Model**: reusable classes such as `HomePage` and
  `ArticlePage` live under `src/pages` and are re‑exported from
  `src/pages/index.ts`.
- **Custom fixtures** extend `@playwright/test` to provide instances of
  those page objects plus a `Helpers` utility toolbox. See
  `src/pages/index.ts` for the fixture definition.
- **Utilities**: generic helpers (`waitForNetworkIdle`, etc.) are located in `src/utils/helpers.ts`.  Assertion helpers such as `expectContainText` now live on `BasePage`.
- **Selectors**: stable locator definitions are kept alongside the page
  classes; external selector file was removed in favor of inline
  locators for clarity.
- **Test data**: JSON files under `tests/` (e.g.
  `wikipedia-test-data.json`) drive the search terms and sidebar links.
- **TypeScript configuration** (`tsconfig.json`) supports JSON imports,
  ESNext modules, and includes `@playwright/test` and `node` types.
- **Playwright config** (`playwright.config.ts`) sets the base URL,
  parallel workers, timeouts, and output directories.

## Project Structure

```
/ (workspace root)
├─ src/
│  ├─ pages/           # POM classes & fixtures
│  └─ utils/           # Shared helper functions
├─ tests/              # Playwright specs + JSON data
├─ playwright.config.ts
├─ tsconfig.json
├─ package.json
└─ .eslintrc.json 
└─ .gitignore         # ignores node_modules, test-results, etc.
```

## Setup & Running

1. **Install dependencies** (Playwright, types, etc.)
   ```sh
   npm install
   npx playwright install  # browsers
   ```
2. **Compile/Type-check** (optional)
   ```sh
   npx tsc --noEmit
   ```
3. **Run tests**
   ```sh
   npm run test           # headless by default
   npm run test:headed    # show browser UI
   npm run test:debug     # open inspector
   ```

Logs, screenshots, and reports appear in `test-results/` which is
ignored by Git.

**Linting**

This project uses ESLint with Playwright and TypeScript plugins to
maintain code quality and detect common automation issues.

Linting helps catch problems such as:

Missing await on Playwright actions

Unused variables

Tests without assertions

Flaky patterns like page.waitForTimeout()

General TypeScript and JavaScript best practice violations

**Run Lintn**
npm run lint

**Example output:**

tests/Search.spec.ts
12:5 warning Avoid page.waitForTimeout() playwright/no-wait-for-timeout
15:3 error Test has no expect() playwright/expect-expect
Auto Fix Lint Issues
npm run lint:fix
ESLint Configuration

Lint rules are defined in:

.eslintrc.json

The project uses Playwright recommended rules to enforce best practices
for writing stable end-to-end tests

## Adding Tests

- Create or update JSON in `tests/wikipedia-test-data.json` for new
  search terms or navigation links.
- Write specs under `tests/` using the custom fixtures:
  ```ts
  import { test } from '../src/pages';

  test('searches and validates', async ({ homePage, articlePage }) => {
    await homePage.goto();
    await homePage.search('Playwright');
    await articlePage.waitForLoad();
    await articlePage.expectContainText(articlePage.headline, 'Playwright');
  });
  ```

## Notes

- Ensure `@types/node` is installed if you see "Cannot find type
definition" errors.
- The config and TS options are intentionally permissive for modern
  syntax and JSON imports.

Happy testing! 🧪
