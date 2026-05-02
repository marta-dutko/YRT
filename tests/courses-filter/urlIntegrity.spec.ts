import { test, expect } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL } from '../../data/coursesFilterData'

/**
 * P0 — URL integrity.
 * Verifies that filter state is correctly encoded in the URL and that
 * URL-driven state (deep link, page refresh, browser back/forward) is
 * fully restored when navigating to a previously filtered URL.
 */
test.describe('URL integrity', () => {

    test('Deep link — filters are active on direct URL load', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Navigate directly to a URL with two pre-set filter params
        await test.step('Open URL with type and location params', async () => {
            await coursesPage.goTo(`${COURSES_URL}?type=accredited&location=new_south_wales`)
        })

        // Step 2: Verify the corresponding checkboxes are checked
        await test.step('Verify checkboxes reflect URL state', async () => {
            await coursesPage.assertFilterChecked('accredited')
            await coursesPage.assertFilterChecked('new_south_wales')
        })

        // // Step 3: Confirm both params remain in the URL after load
        // await test.step('Verify URL still contains both params', async () => {
        //     await coursesPage.assertURLParam('type', 'accredited')
        //     await coursesPage.assertURLParam('location', 'new_south_wales')
        // })
    })

    test('Refresh — filter state is preserved after page reload', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Open courses page and apply a single filter
        await test.step('Apply industry filter', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('construction')
        })

        // Step 2: Reload the page
        await test.step('Reload the page', async () => {
            await page.reload()
            await page.waitForLoadState('load')
            await page.waitForTimeout(800)
        })

        // Step 3: Verify the filter param and checkbox are still active
        await test.step('Verify filter survives reload', async () => {
            await coursesPage.assertURLParam('industry', 'construction')
            await coursesPage.assertFilterChecked('construction')
        })
    })

    test('Browser Back - URL reverts to pre-filter state', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Open courses page
        await test.step('Open courses page', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        // Step 2: Apply a filter to push a new history entry
        await test.step('Apply type filter', async () => {
            await coursesPage.selectFilter('accredited')
        })

        // Step 3: Go back — URL should be clean (no params)
        await test.step('Navigate back and verify clean URL', async () => {
            await page.goBack()
            await page.waitForTimeout(700)
            await coursesPage.assertURLHasNoParams()
        })
    })

    test('Browser Forward — filter state is restored', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Apply a filter, then navigate back to create history
        await test.step('Apply filter and navigate back', async () => {
            await coursesPage.goTo(COURSES_URL)
            await coursesPage.selectFilter('accredited')
            await page.goBack()
            await page.waitForTimeout(700)
        })

        // Step 2: Navigate forward and verify filter is restored
        await test.step('Navigate forward — verify filter is active', async () => {
            await page.goForward()
            await page.waitForTimeout(700)
            await coursesPage.assertURLParam('type', 'accredited')
            await coursesPage.assertFilterChecked('accredited')
        })
    })

    // test('Same-group multi-select produces repeated URL param', async ({ page }) => {
    //     const coursesPage = new CoursesFilterPage(page)
    //
    //     // Step 1: Apply two filters from the same Type group
    //     await test.step('Select both Type filters', async () => {
    //         await coursesPage.goTo(COURSES_URL)
    //         await coursesPage.selectFilter('accredited')
    //         await coursesPage.selectFilter('workshop')
    //     })
    //
    //     // Step 2: Verify URL has type param repeated for both values
    //     await test.step('Verify URL has type=accredited and type=workshop', async () => {
    //         await coursesPage.assertURLParam('type', 'accredited')
    //         await coursesPage.assertURLParam('type', 'workshop')
    //         expect(coursesPage.getURLParams().getAll('type')).toHaveLength(2)
    //     })
    // })
})
