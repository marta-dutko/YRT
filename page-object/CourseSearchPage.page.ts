import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage.page";
import {CourseSearchData} from "../data/courseSearchData";
import {navigateToMonth} from "../helpers/navigateToMonthCalendar.helper";

/**
 * Page Object Model for the Course Search page.
 * Handles search form interactions, date picker navigation, and result assertions.
 */
export class CourseSearchPage extends BasePage {
    protected readonly page: Page
    // Search form
    private readonly courseNameInput: Locator
    private readonly industryDropdown: Locator  // Dropdown trigger for filtering by industry
    private readonly startDateInput: Locator    // Date picker button for the start date
    private readonly endDateInput: Locator      // Date picker button for the end date
    private readonly findCourseBtn: Locator
    // Results area
    private readonly itemsFoundCounter: Locator     // Matches text like "3 items found"
    private readonly nothingFoundHeading: Locator   // Shown when search returns no results
    private readonly searchHeading: Locator         // Heading that confirms the search panel is visible

    constructor(page: Page) {
        super(page)
        this.page = page
        this.courseNameInput = page.getByPlaceholder('Search by course name')
        this.industryDropdown = page.locator('button[aria-controls="home-course-industry-menu"]')
        this.startDateInput = page.getByRole('button', {name: 'Start Date, date picker'})
        this.endDateInput = page.getByRole('button', {name: 'End Date, date picker'})
        this.findCourseBtn = page.getByRole('button', {name: 'Find a Course'})

        this.itemsFoundCounter = page.locator('text=/\\d+ items? found/i');
        this.nothingFoundHeading = page.getByText('Nothing found');
        this.searchHeading = page.getByRole('heading', {name: 'Search your Course'});
    }

    /**
     * Types the course name from test data into the search input.
     * @param courseData - Object containing search parameters.
     */
    async fillCourseName(courseData: CourseSearchData): Promise<void> {
        await this.courseNameInput.fill(courseData.courseName)
    }

    /**
     * Opens the industry dropdown, selects the matching option by exact name,
     * closes the dropdown, and asserts the selected value is reflected on the button.
     * @param courseData - Object containing the industry name to select.
     */
    async selectIndustry(courseData: CourseSearchData): Promise<void> {
        await this.industryDropdown.click();
        const menuId = await this.industryDropdown.getAttribute('aria-controls');
        const option = this.page
            .locator(`#${menuId}`)  // шукаємо всередині div#home-course-industry-menu
            .getByRole('menuitemcheckbox', {name: courseData.courseIndustry, exact: true});
        await option.click();
        await this.industryDropdown.click();
        await expect(this.industryDropdown).toContainText(courseData.courseIndustry);
    }

    /**
     * Opens the start date picker, switches to year/month view,
     * selects the target year, navigates to the correct month, and picks the day.
     * @param courseData - Object containing the start date (year, month, day).
     */
    async fillStartDate(courseData: CourseSearchData): Promise<void> {
        // Calendar navigation config - shared with fillEndDate
        const calendarBtn:string='Next month'
        const locatorName:string='.MuiPickersCalendarHeader-label'
        await this.startDateInput.click()
        await this.page.getByRole('button', {name: /calendar view is open, switch/i}).click()
        await this.page.getByRole('radio', {name: courseData.startDate.year}).click()
        await navigateToMonth(this.page,courseData.startDate,calendarBtn, locatorName)
        await this.page.getByRole('gridcell', {name: courseData.startDate.day, exact: true}).first().click()
    }

    /**
     * Opens the end date picker, switches to year/month view,
     * selects the target year, navigates to the correct month, and picks the day.
     * Note: uses courseData.startDate for month navigation — update to endDate if test data diverges.
     * @param courseData - Object containing the end date (year, month, day).
     */
    async fillEndDate(courseData: CourseSearchData): Promise<void> {
        const calendarBtn:string='Next month'
        const locatorName:string='.MuiPickersCalendarHeader-label'
        await this.endDateInput.click()
        await this.page.getByRole('button', {name: /calendar view is open, switch/i}).click()
        await this.page.getByRole('radio', {name: courseData.endDate.year}).click()
        await navigateToMonth(this.page,courseData.endDate,calendarBtn, locatorName)
        await this.page.getByRole('gridcell', {name: courseData.endDate.day, exact: true}).first().click()
    }

    /**
     * Clicks the "Find a Course" button to submit the search form.
     */
    async clickFindACourse(): Promise<void> {
        await this.findCourseBtn.click();
    }

    /**
     * Waits for the URL to match the search results pattern,
     * confirming the page transitioned to results view.
     */
    async expectToBeOnSearchResultsPage(): Promise<void> {
        await this.page.waitForURL(/\/courses\?searchMode=true/);
    }

    /**
     * Asserts that the "Search your Course" heading is visible on the page.
     */
    async expectSearchPanelVisible(): Promise<void> {
        await expect(this.searchHeading).toBeVisible();
    }

    /**
     * Asserts that the items counter is visible and matches the expected count.
     * Parses the leading number from text like "5 items found".
     * @param itemCount - Expected number of search results.
     */
    async expectItemsCount(itemCount: number): Promise<void> {
        await expect(this.itemsFoundCounter).toBeVisible()
        const text = await this.itemsFoundCounter.innerText()
        expect(parseInt(text)).toBe(itemCount)
    }

    /**
     * Asserts that the "Nothing found" message is visible
     * and that the items counter shows 0.
     */
    async expectNothingFound(): Promise<void> {
        const zeroNumber: number = 0
        await expect(this.nothingFoundHeading).toBeVisible()
        await this.expectItemsCount(zeroNumber)
    }
}