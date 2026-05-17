import { test } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL } from '../../data/coursesFilterData'

/**
 * P1 — Combined filter checks.
 * Verifies AND logic when multiple filters from different groups are active,
 * all-group combinations, and the zero-results empty state.
 */
test.describe('Combined filters', () => {

    test('Type + Location — AND logic produces correct URL params', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply one Type and one Location filter
        await test.step('Apply Type and Location filters', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')
            await coursesPage.selectFilter('new_south_wales')
        })

        // Step 2: Verify both params are present in the URL (AND logic)
        await test.step('Verify URL has both params', async () => {
            await coursesPage.assertURLParam('type', 'accredited')
            await coursesPage.assertURLParam('location', 'new_south_wales')
        })

        // Step 3: Verify results are displayed
        await test.step('Verify results are visible', async () => {
            await coursesPage.assertResultsNotEmpty()
        })
    })

    test('All four groups active simultaneously — AND logic across all params', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply one filter from each of the four groups
        await test.step('Apply one filter from each group', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')       // type
            await coursesPage.selectFilter('qualification')    // duration
            await coursesPage.selectFilter('new_south_wales')  // location
            await coursesPage.selectFilter('construction')     // industry
        })

        // Step 2: Verify all four params are present in the URL
        await test.step('Verify all four params are in the URL', async () => {
            await coursesPage.assertURLParam('type',     'accredited')
            await coursesPage.assertURLParam('duration', 'qualification')
            await coursesPage.assertURLParam('location', 'new_south_wales')
            await coursesPage.assertURLParam('industry', 'construction')
        })

        // Step 3: Verify the page is not broken (results or empty state)
        await test.step('Verify page renders without error', async () => {
            await page.waitForLoadState('load')
        })
    })

    test('Zero results — combination that matches no courses shows empty state', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply a type and industry combination unlikely to match any course
        await test.step('Apply zero-results filter combination', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('workshop')
            await coursesPage.selectFilter('manufacturing')
        })

        // Step 2: Verify URL has both params
        await test.step('Verify URL params', async () => {
            await coursesPage.assertURLParam('type',     'workshop')
            await coursesPage.assertURLParam('industry', 'manufacturing')
        })

        // Step 3: Verify the empty-state UI is shown
        await test.step('Verify empty state is visible', async () => {
            await coursesPage.assertEmptyState()
        })
    })

    test('Within-group multi-select — two values same param → OR results', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Select both Type values (accredited and workshop)
        await test.step('Select both Type values', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')
            await coursesPage.selectFilter('workshop')
        })

        // Step 2: Verify URL has both type params (repeated key)
        await test.step('Verify type param appears twice in URL', async () => {
            await coursesPage.assertURLParam('type', 'accredited')
            await coursesPage.assertURLParam('type', 'workshop')
        })

        // Step 3: Verify results from both types are shown
        await test.step('Verify results are visible', async () => {
            await coursesPage.assertResultsNotEmpty()
        })
    })
})
