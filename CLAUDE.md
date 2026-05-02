# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Playwright + TypeScript end-to-end test suite for the YRT application (staging: `https://yrt-app-staging.vercel.app/`). Tests cover course search, contact form submission, and a full multi-step course booking/enrollment flow.

## Commands

```bash
# Run all tests
npx playwright test

# Run with Playwright UI (interactive mode)
npm run tesUI

# Run in debug mode
npm run debugPl

# Run a single test file
npx playwright test tests/bookCourse.spec.ts
npx playwright test tests/courseSearch.spec.ts
npx playwright test tests/contactFormSubmission.spec.ts
npx playwright test tests/contactFormAllSubmission.spec.ts

# Run a single test by name
npx playwright test --grep "Book a course"

# Run with headed browser (overrides headless:false default)
npx playwright test --headed

# View HTML report after a run
npx playwright show-report
```

## Environment Setup

Copy `.env.example` to `.env` and fill in values before running enrollment tests:

```
CARDHOLDER=Test Test
CARDNUMBER=1111333322221111
CARDEXPIRYMONTH=12
CARDEXPIRYYEAR=29
CARDCVN=111
USI=<your USI value>
```

`USI` (Unique Student Identifier) is required by the `bookCourse` test. The value from `.env.example` (`T1ZTZXX3W3`) is a placeholder — replace it with a valid USI.

## Architecture

### Layer structure

```
tests/          → spec files (test definitions only, no locators)
page-object/    → Page Object Models, one class per page/section
  enrollment/   → step-by-step enrollment flow POMs
helpers/        → reusable Playwright utilities
data/           → test data, interfaces, faker-generated fixtures
```

### Page Object pattern

All POMs extend `BasePage` (provides `page` instance and `goTo(url)`). Locators are defined in constructors and never leak into test files. Tests instantiate POMs directly and call their methods.

`EnrollmentPage` is a shared orchestrator for the multi-step enrollment form: it owns `Next Step` / `Previous Step` navigation and the `expectStepToBeVisible()` assertion used between every step.

### Test data

- Static data (course details, search filters, payment credentials) lives in `data/*.ts` as exported constants.
- Dynamic user data (`newUser` in `data/enrollTestData.ts`) is generated fresh per test run via `@faker-js/faker`.
- `USI` is the only value pulled from `.env` at runtime (`process.env.USI`).

### Helpers

Three standalone async utility functions (not classes):

| Helper | Purpose |
|--------|---------|
| `selectDropdownOption` | Waits for status toast to clear, clicks a trigger, selects from `aria-controls` menu |
| `toast` | Asserts a toast element is visible and contains expected text |
| `navigateToMonth` | Clicks a calendar nav button until the displayed month matches target |

### Playwright config highlights

- All tests run **sequentially** (`fullyParallel: false`)
- Default browser: Chromium Desktop (headed by default — `headless: false`)
- Global timeout: 60 s; `expect` timeout: 10 s; action timeout: 15 s; navigation timeout: 30 s
- `bookCourse` overrides to 180 s via `test.setTimeout(180000)` due to the multi-step form
- Traces always recorded (`trace: 'on'`); HTML reporter enabled

### Test files

| File | What it covers |
|------|---------------|
| `contactFormSubmission.spec.ts` | Single page contact form submit + success message |
| `contactFormAllSubmission.spec.ts` | Same flow parameterized over multiple URLs from `formTestData.ts` |
| `courseSearch.spec.ts` | Six search scenarios: empty, by name, by industry, by date, combined, zero-results |
| `bookCourse.spec.ts` | Full enrollment flow: browse → select course → 10-step form → payment |
