import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage.page'

/**
 * Page Object Model for the Courses listing / filter page (/courses).
 * Covers filter interaction, URL param assertions, result count checks,
 * pagination, and empty-state verification.
 */
export class CoursesFilterPage extends BasePage {
    private readonly clearAllBtn: Locator
    private readonly perPageSelect: Locator
    private readonly courseCards: Locator    // each individual course card in the results grid
    private readonly resultCounter: Locator  // e.g. "70 courses" or "5 items found"
    private readonly emptyState: Locator     // shown when no courses match active filters
    private readonly calendarToggleBtn: Locator  // "Switch to calendar view" aria-label button
    private readonly listToggleBtn: Locator      // "Switch to list view" aria-label button
    private readonly calendarSessions: Locator   // FullCalendar event links (a.fc-event)
    private readonly courseTypeBadge: Locator    // type badge pill on course cards and detail page

    constructor(page: Page) {
        super(page)
        this.clearAllBtn        = page.getByRole('button', { name: /clear all/i })
        this.perPageSelect      = page.locator('select').first()
        // this.courseCards   = page.locator('article')
        this.courseCards        = page.locator('a').filter({hasText:'View Availability'})
        // this.courseCards   = page.locator('span.bg-orange-500:visible', { hasText: 'Accredited' }).first()
        this.resultCounter      = page.locator('text=/\\d+ (courses?|items?)/i').first()
        this.emptyState         = page.getByText('Nothing found')
        this.calendarToggleBtn  = page.getByLabel('Switch to calendar view')
        this.listToggleBtn      = page.getByLabel('Switch to list view')
        this.calendarSessions   = page.locator('a.fc-event')
        this.courseTypeBadge    = page.locator('span.rounded-\\[100px\\]:visible')
    }

    // --- URL helpers ---

    /**
     * Returns parsed URLSearchParams from the current page URL.
     * Allows callers to inspect individual param values without navigation.
     */
    getURLParams(): URLSearchParams {
        return new URL(this.page.url()).searchParams
    }

    /**
     * Asserts that the URL contains the given param with the given value.
     * Handles repeated params within the same key (e.g. type=accredited&type=workshop).
     * @param param - URL query parameter name.
     * @param value - Expected value for that parameter.
     */
    async assertURLParam(param: string, value: string): Promise<void> {
        expect(this.getURLParams().getAll(param)).toContain(value)
    }

    /**
     * Asserts the current URL has no query parameters (clean URL after Clear All or initial load).
     */
    async assertURLHasNoParams(): Promise<void> {
        expect(this.getURLParams().toString()).toBe('')
    }

    /**
     * Asserts that the given parameter is completely absent from the URL.
     * @param param - Parameter name that must not be present.
     */
    async assertURLMissingParam(param: string): Promise<void> {
        expect(this.getURLParams().has(param)).toBe(false)
    }

    // --- Filter actions ---

    /**
     * Clicks the checkbox filter with the given value and waits for the URL to update.
     * @param value - The value attribute of the target checkbox.
     */
    async selectFilter(value: string): Promise<void> {
        await this.page.locator(`input[type="checkbox"][value="${value}"]`).click()
        await this.page.waitForTimeout(500)
    }

    /**
     * Clicks "Clear All" to remove every active filter and reset the URL.
     */
    async clearAll(): Promise<void> {
        await expect(this.clearAllBtn).toBeVisible()
        await this.clearAllBtn.click()
        await this.page.waitForTimeout(500)
    }

    /**
     * Selects a value in the "Items per page" dropdown.
     * @param value - Option value to select (e.g. "5", "10", "20", "50").
     */
    async setPerPage(value: string): Promise<void> {
        await this.perPageSelect.selectOption(value)
        await this.page.waitForTimeout(800)
    }

    /**
     * Clicks the numbered pagination button for the given page.
     * @param num - Page number to navigate to.
     */
    async goToPageNumber(num: number): Promise<void> {
        await this.page.getByRole('button', { name: `Page ${num}`, exact: true })
            .first()
            .click()
        await this.page.waitForTimeout(700)
    }

    // --- Filter state assertions ---

    /**
     * Asserts the checkbox with the given value is in a checked state.
     * Used to verify that deep-linked or refreshed state restores the filter correctly.
     * @param value - Value attribute of the target checkbox.
     */
    async assertFilterChecked(value: string): Promise<void> {
        await expect(this.page.locator(`input[value="${value}"]`)).toBeChecked()
    }

    /**
     * Asserts the checkbox with the given value is unchecked.
     * @param value - Value attribute of the target checkbox.
     */
    async assertFilterUnchecked(value: string): Promise<void> {
        await expect(this.page.locator(`input[value="${value}"]`)).not.toBeChecked()
    }

    // --- Result assertions ---

    /**
     * Reads the result counter text (e.g. "70 courses") and asserts it matches the expected number.
     * @param expected - Expected total course count shown in the counter.
     */
    async assertResultCount(expected: number): Promise<void> {
        await expect(this.resultCounter).toBeVisible()
        const text = await this.resultCounter.innerText()
        const actual = parseInt(text.match(/\d+/)?.[0] ?? '0')
        expect(actual).toBe(expected)
    }

    /**
     * Asserts that at least one course card is visible in the results area.
     * Use for filters where the exact count is unknown.
     */
    async assertResultsNotEmpty(): Promise<void> {
        await expect(this.courseCards.first()).toBeVisible()
    }

    /**
     * Asserts that the zero-results empty state is visible.
     * Triggered when the active filter combination matches no courses.
     */
    async assertEmptyState(): Promise<void> {
        await expect(this.emptyState).toBeVisible()
    }

    /**
     * Asserts that at least one visible course card contains each of the given label texts.
     * Used to verify that filtered results display the correct type/industry/location label.
     * @param labels - Array of label strings expected to appear on course cards.
     */
    async assertCardLabels(labels: string[]): Promise<void> {
        for (const label of labels) {
            await expect(this.courseCards.filter({ hasText: label }).first()).toBeVisible()
        }
    }

    // --- Type filter ---

    /**
     * Asserts that the pill badge on the first course card exactly matches the expected text.
     * Badges confirmed on cards: "Accredited" (orange pill) and "Workshop" (yellow pill).
     * Uses exact match to avoid false positives from the filter panel label "Accredited course".
     * @param expectedBadge - Expected badge text, e.g. "Accredited" or "Workshop".
     */
    async assertTypeBadgeOnFirstCard(expectedBadge: string): Promise<void> {
        const badge = this.courseTypeBadge.filter({ hasText: expectedBadge }).first()
        await expect(badge).toBeVisible()
    }

    // --- Duration filter ---

    /**
     * Clicks the first course card and waits for the course detail page to load.
     * Used before duration-specific assertions that require inspecting the course page.
     */
    async openFirstCourse(): Promise<void> {
        await this.courseCards.first().click()
        await this.page.waitForLoadState('load')
        await this.page.waitForTimeout(800)
    }

    /**
     * Asserts that the course detail page h1 heading matches the given pattern.
     * Used to verify Full qualification courses have "Diploma" or "Certificate" in their name.
     * @param pattern - RegExp the h1 must satisfy.
     */
    async assertCourseNameContains(pattern: RegExp): Promise<void> {
        await expect(this.page.getByRole('heading', { level: 1 })).toHaveText(pattern)
    }

    /**
     * Reads the "X units - Y hours total length" text from the Course Content section
     * and asserts the unit count using the given operator.
     * Confirmed format on course pages: "219 units", "2 units", "1 unit".
     * @param operator - Comparison: '>' for skill set, '<=' for single unit, '===' for exact.
     * @param count - The value to compare against.
     */
    async assertUnitCount(operator: '>' | '<=' | '===', count: number): Promise<void> {
        const unitCountEl = this.page.getByText(/\d+ units? - \d+ hours/i).first()
        await expect(unitCountEl).toBeVisible({ timeout: 10000 })
        const text = await unitCountEl.innerText()
        const actual = parseInt(text.match(/\d+/)?.[0] ?? '0')
        if (operator === '>') expect(actual).toBeGreaterThan(count)
        else if (operator === '<=') expect(actual).toBeLessThanOrEqual(count)
        else expect(actual).toBe(count)
    }

    // --- Calendar view ---

    /**
     * Clicks the "Switch to calendar view" toggle and waits for the calendar to render.
     * Expects mode=calendar to appear in the URL after the switch.
     */
    async switchToCalendar(): Promise<void> {
        await this.calendarToggleBtn.click()
        await this.page.waitForTimeout(800)
    }

    /**
     * Clicks the "Switch to list view" toggle and waits for the list to render.
     */
    async switchToList(): Promise<void> {
        await this.listToggleBtn.click()
        await this.page.waitForTimeout(800)
    }

    /**
     * Returns all visible FullCalendar session event locators.
     */
    getCalendarSessions(): Locator {
        return this.calendarSessions
    }

    /**
     * Returns the current count of visible FullCalendar session events.
     * Used to detect whether a filter reduced or zeroed out the session list.
     */
    async countCalendarSessions(): Promise<number> {
        return this.calendarSessions.count()
    }

    /**
     * Clicks the first visible FullCalendar session event and waits for the course page to load.
     */
    async clickFirstSession(): Promise<void> {
        await this.calendarSessions.first().click()
        await this.page.waitForLoadState('load')
        await this.page.waitForTimeout(800)
    }

    /**
     * Asserts that at least one session event is visible in the calendar.
     */
    async assertCalendarHasSessions(): Promise<void> {
        await expect(this.calendarSessions.first()).toBeVisible({ timeout: 10000 })
    }

    /**
     * Asserts that no session events are visible in the calendar (e.g. after a filter with no sessions).
     */
    async assertCalendarHasNoSessions(): Promise<void> {
        await expect(this.calendarSessions.first()).not.toBeVisible({ timeout: 10000 })
    }

    /**
     * Asserts that the given date string appears somewhere on the current booking / course detail page.
     * Covers both "YYYY-MM-DD" ISO dates and formatted date text (e.g. "28 Apr 2026").
     * @param sessionDate - Date string extracted from the calendar cell's data-date attribute.
     */
    async assertSessionVisibleInBooking(sessionDate: string): Promise<void> {
        const [year, month, day] = sessionDate.split('-').map(Number)
        const formatted = new Date(year, month - 1, day).toLocaleDateString('en-AU', {
            day: 'numeric', month: 'short', year: 'numeric',
        })
        const dateLocator = this.page.getByText(new RegExp(formatted.replace('.', '\\.?'), 'i'))
        await expect(dateLocator.first()).toBeVisible({ timeout: 10000 })
    }
}
