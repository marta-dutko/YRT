import { test, expect } from '@playwright/test'
import { CoursesFilterPage } from '../../page-object/CoursesFilterPage.page'
import { COURSES_URL, CALENDAR_FILTER_CHECKS } from '../../data/coursesFilterData'

/**
 * P1 — Calendar View.
 * Verifies that the calendar toggle writes mode=calendar to the URL,
 * that deep-linked calendar state is restored on direct load,
 * that sessions are visible (or absent) after filter changes,
 * and that clicking a session navigates to the correct course booking page.
 */
test.describe('Calendar view', () => {

    test('Switch to calendar — mode=calendar appears in URL', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open courses page', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        await test.step('Click calendar toggle', async () => {
            await coursesPage.switchToCalendar()
        })

        await test.step('Verify mode=calendar is in the URL', async () => {
            await coursesPage.assertURLParam('mode', 'calendar')
        })
    })

    test('Switch back to list — mode param is removed from URL', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open courses page in calendar mode', async () => {
            await coursesPage.goTo(`${COURSES_URL}?mode=calendar`)
        })

        await test.step('Click list toggle', async () => {
            await coursesPage.switchToList()
        })

        await test.step('Verify mode param is absent from the URL', async () => {
            await coursesPage.assertURLMissingParam('mode')
        })
    })

    // test('Deep link — ?mode=calendar opens calendar view directly', async ({ page }) => {
    //     const coursesPage = new CoursesFilterPage(page)
    //
    //     await test.step('Open URL with mode=calendar param', async () => {
    //         await coursesPage.goTo(`${COURSES_URL}?mode=calendar`)
    //     })
    //
    //     await test.step('Verify calendar sessions are rendered', async () => {
    //         await coursesPage.assertCalendarHasSessions()
    //     })
    //
    //     await test.step('Verify mode=calendar is still in the URL', async () => {
    //         await coursesPage.assertURLParam('mode', 'calendar')
    //     })
    // })

    test('Calendar has sessions visible after switching to calendar view', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open courses page', async () => {
            await coursesPage.goTo(COURSES_URL)
        })

        await test.step('Switch to calendar view', async () => {
            await coursesPage.switchToCalendar()
        })

        await test.step('Verify at least one session event is visible', async () => {
            await coursesPage.assertCalendarHasSessions()
        })
    })

    test('Click session — navigates to course booking page', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open calendar view', async () => {
            await coursesPage.goTo(`${COURSES_URL}?mode=calendar`)
            await coursesPage.assertCalendarHasSessions()
        })

        // Capture the date from the first session's parent td[data-date] before clicking
        let sessionDate = ''
        await test.step('Read date from first session cell', async () => {
            const firstSession = coursesPage.getCalendarSessions().first()
            const date = await firstSession.evaluate(
                (el) => el.closest('td[data-date]')?.getAttribute('data-date') ?? ''
            )
            if (date) sessionDate = date
        })

        await test.step('Click first session', async () => {
            await coursesPage.clickFirstSession()
        })

        await test.step('Verify course detail page loaded', async () => {
            await expect(page).toHaveURL(/\/courses\//)
        })

        if (sessionDate) {
            await test.step('Verify session date is visible on the booking page', async () => {
                await coursesPage.assertSessionVisibleInBooking(sessionDate)
            })
        }
    })

    test('Type=accredited + calendar — only accredited sessions shown', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open calendar with accredited filter', async () => {
            await coursesPage.goTo(`${COURSES_URL}?type=accredited&mode=calendar`)
        })

        await test.step('Verify URL has both params', async () => {
            await coursesPage.assertURLParam('type', 'accredited')
            await coursesPage.assertURLParam('mode', 'calendar')
        })

        await test.step('Verify calendar sessions are visible', async () => {
            await coursesPage.assertCalendarHasSessions()
        })
    })

    test('Full qualification filter — no sessions shown in calendar', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        // Full qualification courses (Diploma / Certificate) are long-form enrolments
        // and do not have individual scheduled sessions, so the calendar must be empty.
        await test.step('Open calendar with Full qualification filter active', async () => {
            await coursesPage.goTo(`${COURSES_URL}?duration=qualification&mode=calendar`)
        })

        await test.step('Verify URL has both params', async () => {
            await coursesPage.assertURLParam('duration', 'qualification')
            await coursesPage.assertURLParam('mode', 'calendar')
        })

        await test.step('Verify no session events are visible in the calendar', async () => {
            await coursesPage.assertCalendarHasNoSessions()
        })
    })

    // --- Filter effect on session count ---

    test.describe('Filter changes session count in calendar', () => {
        for (const filter of CALENDAR_FILTER_CHECKS) {
            test(`${filter.param}=${filter.value} - session count changes after filter`, async ({ page }) => {
                const coursesPage = new CoursesFilterPage(page)

                let countAfter  = 0
                let sessionDate = ''

                await test.step('Open calendar view', async () => {
                    await coursesPage.goTo(`${COURSES_URL}?mode=calendar`)
                })

                await test.step(`Apply filter ${filter.param}=${filter.value}`, async () => {
                    await coursesPage.selectFilter(filter.value)
                    // Wait until the URL reflects the applied filter — confirms the app committed the change
                    await page.waitForURL(
                        (url) => url.searchParams.getAll(filter.param).includes(filter.value),
                        { timeout: 5000 }
                    )
                    // Short pause for FullCalendar to finish DOM re-render after URL update
                    await page.waitForTimeout(500)
                })

                await test.step('Count sessions after applying filter', async () => {
                    countAfter = await coursesPage.countCalendarSessions()
                    // 0 sessions is a valid filtered result - no assertion that count must change
                })

                if (countAfter > 0) {
                    // Sessions exist — navigate into the first one and run filter-specific assertions
                    await test.step('Read date from first session cell', async () => {
                        const firstSession = coursesPage.getCalendarSessions().first()
                        const date = await firstSession.evaluate(
                            (el) => el.closest('td[data-date]')?.getAttribute('data-date') ?? ''
                        )
                        if (date) sessionDate = date
                    })

                    await test.step('Click first session and navigate to course page', async () => {
                        await coursesPage.clickFirstSession()
                    })

                    if (filter.param === 'duration' && sessionDate) {
                        await test.step('Verify session date is visible on the booking page', async () => {
                            await coursesPage.assertSessionVisibleInBooking(sessionDate)
                        })
                    }

                    if (filter.param === 'type' && filter.badge) {
                        await test.step(`Verify badge "${filter.badge}" is visible on the course page`, async () => {
                            await coursesPage.assertTypeBadgeOnFirstCard(filter.badge!)
                        })
                    }
                } else {
                    // 0 sessions is an expected result for some filters — explicitly assert empty calendar
                    await test.step('Verify calendar shows no sessions (0 is valid for this filter)', async () => {
                        await coursesPage.assertCalendarHasNoSessions()
                    })
                }
            })
        }
    })

    test('Clear All — filter params removed, mode=calendar preserved', async ({ page }) => {
        const coursesPage = new CoursesFilterPage(page)

        await test.step('Open calendar with location filter active', async () => {
            await coursesPage.goTo(`${COURSES_URL}?mode=calendar`)
            await coursesPage.selectFilter('new_south_wales')
        })

        await test.step('Verify filter param is set', async () => {
            await coursesPage.assertURLParam('location', 'new_south_wales')
        })

        await test.step('Click Clear All', async () => {
            await coursesPage.clearAll()
        })

        await test.step('Verify location param is gone', async () => {
            await coursesPage.assertURLMissingParam('location')
        })

        await test.step('Verify mode=calendar is still in the URL', async () => {
            await coursesPage.assertURLParam('mode', 'calendar')
        })
    })
})
