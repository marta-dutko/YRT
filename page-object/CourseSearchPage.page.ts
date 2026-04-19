import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage.page";
import {CourseSearchData} from "../data/courseSearchData";

export class CourseSearchPage extends BasePage {
    protected readonly page: Page
    // Search form
    private readonly courseNameInput: Locator
    private readonly industryDropdown: Locator
    private readonly startDateInput: Locator
    private readonly endDateInput: Locator
    private readonly findCourseBtn: Locator
    // Results area
    private readonly itemsFoundCounter: Locator
    private readonly nothingFoundHeading: Locator
    private readonly searchHeading: Locator
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

    // Actions
    async fillCourseName(courseData:CourseSearchData): Promise<void> {
        await this.courseNameInput.fill(courseData.courseName)
    }

    async selectIndustry(courseData:CourseSearchData): Promise<void> {
        await this.industryDropdown.click();
        const menuId = await this.industryDropdown.getAttribute('aria-controls');
        const option = this.page
            .locator(`#${menuId}`)  // шукаємо всередині div#home-course-industry-menu
            .getByRole('menuitemcheckbox', {name: courseData.courseIndustry, exact: true});
        await option.click();
        await this.industryDropdown.click();
        await expect(this.industryDropdown).toContainText(courseData.courseIndustry);
    }

    async navigateToMonth(courseData:CourseSearchData):Promise<void> {
        while (!(await this.page.locator('.MuiPickersCalendarHeader-label').innerText()).includes(courseData.startDate.month)) {
            await this.page.getByRole('button', { name: 'Next month' }).click()
            await this.page.waitForTimeout(100)
        }
    }

    async fillStartDate(courseData:CourseSearchData): Promise<void> {
        await this.startDateInput.click()
        await this.page.getByRole('button', { name: /calendar view is open, switch/i }).click()
        await this.page.getByRole('radio', { name: courseData.startDate.year }).click()
        await  this.navigateToMonth(courseData)
        await this.page.getByRole('gridcell', { name: courseData.startDate.day, exact: true }).first().click()
    }

    async fillEndDate(courseData:CourseSearchData): Promise<void> {
        await this.endDateInput.click()
        await this.page.getByRole('button', { name: /calendar view is open, switch/i }).click()
        await this.page.getByRole('radio', { name: courseData.endDate.year }).click()
        await  this.navigateToMonth(courseData)
        await this.page.getByRole('gridcell', { name: courseData.endDate.day, exact: true }).first().click()
    }

    async clickFindACourse(): Promise<void> {
        await this.findCourseBtn.click();
    }

    // Assertions
    async expectToBeOnSearchResultsPage(): Promise<void> {
        await this.page.waitForURL(/\/courses\?searchMode=true/);
    }

    async expectSearchPanelVisible(): Promise<void> {
        await expect(this.searchHeading).toBeVisible();
    }

    async expectItemsCount(itemCount:number): Promise<void> {
        await expect(this.itemsFoundCounter).toBeVisible()
        const text = await this.itemsFoundCounter.innerText()
        expect(parseInt(text)).toBe(itemCount)
    }

    async expectNothingFound(): Promise<void> {
        const zeroNumber:number= 0
        await expect(this.nothingFoundHeading).toBeVisible()
        await this.expectItemsCount(zeroNumber)
    }
}