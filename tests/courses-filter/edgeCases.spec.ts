import { test, expect } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL } from '../../data/coursesFilterData'

/**
 * P2 — Edge cases.
 * Covers invalid URL params, rapid filter toggling, and other boundary conditions
 * that must not cause visible errors or page crashes.
 */
test.describe('Edge cases', () => {

    test('Invalid query param in URL — page loads without 404 or crash', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Navigate directly to a URL with an unknown/invalid param
        await test.step('Open URL with invalid params', async () => {
            await coursesPage.goTo(`${COURSES_URL}?foo=bar&type=nonexistent_value`)
        })

        // Step 2: Verify the page has not crashed (no 404 heading, no error text)
        await test.step('Verify no error page is shown', async () => {
            await expect(page.getByText('404', { exact: true })).not.toBeVisible()
            await expect(page.getByText(/not found/i)).not.toBeVisible()
        })

        // Step 3: Verify the courses page structure is still intact
        await test.step('Verify filter panel is still visible', async () => {
            await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()
        })
    })

    test('Invalid per_page value in URL — page loads without crash', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Navigate with an out-of-range per_page value
        await test.step('Open URL with invalid per_page', async () => {
            await coursesPage.goTo(`${COURSES_URL}?per_page=9999`)
        })

        // Step 2: Verify the page renders without error
        await test.step('Verify page renders without error', async () => {
            await expect(page.getByText('404', { exact: true })).not.toBeVisible()
            await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()
        })
    })

    test('Rapid filter clicks — page does not break', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Open the courses page
        await test.step('Open courses page', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        // Step 2: Click multiple filters in quick succession without waiting
        await test.step('Rapidly select and deselect filters', async () => {
            const filters = ['accredited', 'new_south_wales', 'construction', 'workshop', 'victoria']
            for (const value of filters) {
                await page.locator(`input[type="checkbox"][value="${value}"]`).click()
            }
            await page.waitForLoadState('load')
        })

        // Step 3: Verify the page has not crashed and filter panel is still functional
        await test.step('Verify page is still functional after rapid clicks', async () => {
            await expect(page.getByText('404', { exact: true })).not.toBeVisible()
            await expect(page.locator('input[type="checkbox"]').first()).toBeVisible()
        })
    })

    test('Deselecting a filter removes only that param from the URL', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply two filters from different groups
        await test.step('Apply two filters', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')
            await coursesPage.selectFilter('construction')
        })

        // Step 2: Uncheck one of the filters
        await test.step('Deselect type filter', async () => {
            await coursesPage.selectFilter('accredited')
        })

        // Step 3: Verify removed param is gone, remaining param is still present
        await test.step('Verify only industry param remains', async () => {
            await coursesPage.assertURLMissingParam('type')
            await coursesPage.assertURLParam('industry', 'construction')
        })
    })
})
