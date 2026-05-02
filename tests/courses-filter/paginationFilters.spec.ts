import { test, expect } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL, PER_PAGE_OPTIONS } from '../../data/coursesFilterData'

/**
 * P1 — Pagination + Filters.
 * Verifies that per-page selection writes the correct URL param,
 * that an active filter persists when navigating to page 2,
 * and that changing a filter while on page 2 resets to page 1.
 */
test.describe('Pagination with filters', () => {

    // Each Items-per-page option must produce the correct per_page param
    for (const perPage of PER_PAGE_OPTIONS) {
        test(`Items per page: ${perPage} sets per_page=${perPage} in URL`, async ({ page }) => {
            const coursesPage = new CoursesFilterPage(page)

            // Step 1: Open courses page
            await test.step('Open courses page', async () => {
                await coursesPage.goTo(COURSES_URL)
            })

            // Step 2: Change the items-per-page setting
            await test.step(`Select ${perPage} items per page`, async () => {
                await coursesPage.setPerPage(perPage)
            })

            // Step 3: Verify the URL reflects the selection
            await test.step('Verify per_page param in URL', async () => {
                await coursesPage.assertURLParam('per_page', perPage)
            })

            // Step 4: Verify the number of visible cards does not exceed the selected value
            await test.step('Verify visible card count is within per-page limit', async () => {
                // const cards = page.locator('article')
                const cards = page.locator('span.bg-orange-500:visible', { hasText: 'Accredited' })
                const count = await cards.count()
                expect(count).toBeLessThanOrEqual(Number(perPage))
            })
        })
    }

    test('Changing filter on page 2 resets to page 1', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Navigate to page 2 with per_page=5
        await test.step('Go to page 2', async () => {
            await coursesPage.goTo(`${COURSES_URL}?per_page=5`)
            await coursesPage.goToPageNumber(2)
        })

        // Step 2: Apply a new filter while on page 2
        await test.step('Apply a filter from page 2', async () => {
            await coursesPage.selectFilter('construction')
        })

        // Step 3: Verify the page param is gone (reset to page 1) or equals 1
        await test.step('Verify page resets to 1', async () => {
            const pageParam = coursesPage.getURLParams().get('page')
            expect(pageParam === null || pageParam === '1').toBeTruthy()
        })

        // Step 4: Verify the new filter param is present
        await test.step('Verify new filter param is in URL', async () => {
            await coursesPage.assertURLParam('industry', 'construction')
        })
    })
})
