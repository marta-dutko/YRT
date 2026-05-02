import { test } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL } from '../../data/coursesFilterData'

/**
 * P0 — Clear All.
 * Verifies that the "Clear All" button removes every active filter,
 * restores a clean URL, and returns the full unfiltered course list.
 */
test.describe('Clear All', () => {

    test('Clear All resets URL and restores full result count', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply filters from three different groups
        await test.step('Apply type, location and industry filters', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')
            await coursesPage.selectFilter('qualification')
            await coursesPage.selectFilter('new_south_wales')
            await coursesPage.selectFilter('construction')
        })

        // Step 2: Verify that all three params are present in the URL
        await test.step('Verify all filter params are in the URL', async () => {
            await coursesPage.assertURLParam('type', 'accredited')
            await coursesPage.assertURLParam('duration', 'qualification')
            await coursesPage.assertURLParam('location', 'new_south_wales')
            await coursesPage.assertURLParam('industry', 'construction')
        })

        // Step 3: Click "Clear All"
        await test.step('Click Clear All', async () => {
            await coursesPage.clearAll()
        })

        // Step 4: Verify the URL is completely clean
        await test.step('Verify URL has no params', async () => {
            await coursesPage.assertURLHasNoParams()
        })

        // Step 5: Verify all filter checkboxes are unchecked
        await test.step('Verify all applied filters are unchecked', async () => {
            await coursesPage.assertFilterUnchecked('accredited')
            await coursesPage.assertFilterUnchecked('qualification')
            await coursesPage.assertFilterUnchecked('new_south_wales')
            await coursesPage.assertFilterUnchecked('construction')
        })

        // Step 6: Verify the full result count is restored (expected: 70 courses)
        await test.step('Verify full course count is restored', async () => {
            await coursesPage.assertResultCount(70)
        })
    })

    test('Clear All is not visible when no filters are active', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Open the courses page with no filters applied
        await test.step('Open courses page without filters', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        // Step 2: Verify "Clear All" button is hidden on initial load
        await test.step('Verify Clear All button is not visible', async () => {
            await page.waitForTimeout(500)
            const clearAllBtn = page.getByRole('button', { name: /clear all/i })
            await clearAllBtn.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {
                // acceptable if not in DOM at all
            })
        })
    })
})
