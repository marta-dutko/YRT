import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage.page";
import {CourseSearchData, NothingFoundData} from "../data/courseSearchData";

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
    // private readonly previousMonth: Locator


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

    // ─── Actions ─
    async fillCourseName(courseData:CourseSearchData): Promise<void> {
        await this.courseNameInput.fill(courseData.courseName)
    }

    async selectIndustry(courseData:CourseSearchData): Promise<void> {
        await this.industryDropdown.click();
        const menuId = await this.industryDropdown.getAttribute('aria-controls');
        // menuId = "home-course-industry-menu"

        const option = this.page
            .locator(`#${menuId}`)  // шукаємо всередині div#home-course-industry-menu
            .getByRole('menuitemcheckbox', {name: courseData.courseIndustry, exact: true});

        await option.click(); // ← спочатку клікаємо опцію

        await this.industryDropdown.click(); // ← потім закриваємо dropdown

        await expect(this.industryDropdown).toContainText(courseData.courseIndustry); // ← потім перевіряємо
    }

    // ========
    async navigateToMonth(courseData:CourseSearchData):Promise<void> {
        while (!(await this.page.locator('.MuiPickersCalendarHeader-label').innerText()).includes(courseData.startDate.startMonth)) {
            await this.page.getByRole('button', { name: 'Next month' }).click()
            await this.page.waitForTimeout(100)
        }
    }
    // =====

    async fillStartDate(courseData:CourseSearchData): Promise<void> {
        await this.startDateInput.click()

        // Перемикаємо на вибір року
        await this.page.getByRole('button', { name: /calendar view is open, switch/i }).click()

        // Вибираємо рік
        await this.page.getByRole('radio', { name: courseData.startDate.startYear }).click()

        // Навігуємо до потрібного місяця
        await  this.navigateToMonth(courseData)

        // Клікаємо на день
        await this.page.getByRole('gridcell', { name: courseData.startDate.startDay, exact: true }).first().click()
    }

    async fillEndDate(courseData:CourseSearchData): Promise<void> {
        await this.endDateInput.click()

        // Перемикаємо на вибір року
        await this.page.getByRole('button', { name: /calendar view is open, switch/i }).click()

        // Вибираємо рік
        await this.page.getByRole('radio', { name: courseData.endDate.startYear }).click()

        // Навігуємо до потрібного місяця
        await  this.navigateToMonth(courseData)

        // Клікаємо на день
        await this.page.getByRole('gridcell', { name: courseData.endDate.startDay, exact: true }).first().click()
    }

    async clickFindACourse(): Promise<void> {
        await this.findCourseBtn.click();
    }

    // ─── Assertions ───

    async expectToBeOnSearchResultsPage(): Promise<void> {
        // waitForURL чекає поки адресний рядок відповідає регекспу
        // Це надійніше ніж просто waitForLoadState — редірект може бути повільним
        await this.page.waitForURL(/\/courses\?searchMode=true/);
    }

    async expectSearchPanelVisible(): Promise<void> {
        await expect(this.searchHeading).toBeVisible();
    }

    async expectItemsFoundVisible(): Promise<void> {
        await expect(this.itemsFoundCounter).toBeVisible();
    }

    async expectItemsCount(itemCount:number): Promise<void> {
        await expect(this.itemsFoundCounter).toBeVisible()
        const text = await this.itemsFoundCounter.innerText()
        expect(parseInt(text)).toBe(itemCount)
    }

    async expectNothingFound(data:NothingFoundData): Promise<void> {
        // const itemsCount=data.itemsCount
        await expect(this.nothingFoundHeading).toBeVisible()
        await this.expectItemsCount(data.itemsCount)
    }
}