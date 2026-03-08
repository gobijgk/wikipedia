# WIki Project

This repository is set up for Playwright-based end-to-end tests using a Page Object Model (POM).

## Features

- **Page Object Model** with reusable page classes
- **Stable selectors** centralized in `src/utils/selectors.ts`
- **Reusable utilities** in `src/utils/helpers.ts`
- **Proper waits** and abstractions in `src/pages/BasePage.ts`
- **Meaningful assertions** in tests
- **Parallel execution** configured through `playwright.config.ts`
- **Clean folder structure**: `src/pages`, `src/utils`, `tests`

## Running tests

```sh
npm install
npm run test
```

Configure additional options in `playwright.config.ts`.
