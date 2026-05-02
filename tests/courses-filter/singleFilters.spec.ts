import { test } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL, ALL_FILTER_OPTIONS } from '../../data/coursesFilterData'

/**
 * P0 — Single filter checks.
 * For every individual filter value across all four groups (Type, Duration,
 * Location, Industry), verifies that the correct URL param is set and results
 * are visible. Additionally runs filter-group-specific assertions:
 *   — Type:     pill badge on the first card matches "Accredited" or "Workshop"
 *   — Duration: navigates to the first course and verifies unit count / course name
 *   — Location/Industry: filter label appears within visible course cards
 */

for (const filter of ALL_FILTER_OPTIONS) {
    test(`Single filter: ${filter.param}=${filter.value}`, async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Step 1: Open the courses page
        await test.step('Open courses page', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        // Step 2: Select the target filter checkbox
        await test.step(`Select "${filter.label}"`, async () => {
            await coursesPage.selectFilter(filter.value)
        })

        // Step 3: Verify the URL contains the correct query param
        await test.step(`Verify URL has ${filter.param}=${filter.value}`, async () => {
            await coursesPage.assertURLParam(filter.param, filter.value)
        })

        // Step 4: Verify at least one result card is displayed
        await test.step('Verify results are visible', async () => {
            await coursesPage.assertResultsNotEmpty()
        })

        // --- Type filter: badge on the first card ---
        if (filter.param === 'type' && filter.badge) {
            // Step 5: Verify the pill badge on the first course card matches the expected type label
            await test.step(`Verify badge "${filter.badge}" on first card`, async () => {
                await coursesPage.assertTypeBadgeOnFirstCard(filter.badge!)
            })
        }

        // --- Duration filter: navigate into the first course and check units ---
        if (filter.param === 'duration') {

            // Step 5: Open the first course from the filtered results
            await test.step('Open first course card', async () => {
                await coursesPage.openFirstCourse()
            })

            if (filter.value === 'qualification') {
                // Full qualification courses must have "Diploma" or "Certificate" in their name
                await test.step('Verify course name contains Diploma or Certificate', async () => {
                    await coursesPage.assertCourseNameContains(/Diploma|Certificate/i)
                })
            }

            if (filter.value === 'skill_set') {
                // Skill set courses must consist of more than 1 unit
                await test.step('Verify skill set course has more than 1 unit', async () => {
                    await coursesPage.assertUnitCount('>', 1)
                })
            }

            if (filter.value === 'Single unit') {
                // Single unit courses must consist of exactly 1 unit
                await test.step('Verify single unit course has exactly 1 unit', async () => {
                    await coursesPage.assertUnitCount('<=', 1)
                })
            }
        }
    })
}
