import {Locator, Page} from "@playwright/test"
import {selectDropdownOption} from '../../helpers/dropdown.helper';
import {NewUser} from "../../data/enrollTestData"
import {DayData} from "../../data/interfaces";

/**
 * Page Object Model for the Personal Details step of the enrollment flow.
 * Handles filling in personal information including title, name fields,
 * date of birth via a calendar picker, and gender.
 */
export class PersonalDetailsPage {
    private readonly page: Page
    private readonly titleDropdown: Locator         // Dropdown trigger for selecting title (Mr, Ms, etc.)
    private readonly preferredName: Locator
    private readonly middleName: Locator
    // Date of birth calendar locators
    private readonly dateOfBirth: Locator           // Button that opens the date of birth picker
    private readonly calendarViewSwitcher: Locator  // Switches calendar to year/month selection view
    private readonly previousMonth: Locator         // Arrow button to navigate to the previous month
    private readonly calendarContainer: Locator     // Wrapper used to read the currently displayed month/year
    private readonly calendarDateCell: (day: string) => Locator  // Dynamic locator for a specific day cell
    private readonly genderDropdown: Locator        // Dropdown trigger for selecting gender

    constructor(page: Page) {
        this.page = page
        this.titleDropdown = page.locator('button[aria-controls="title-menu"]')
        this.preferredName = page.getByPlaceholder('Input preferred name')
        this.middleName = page.getByPlaceholder('Input middle name')
        // Date of birth calendar
        this.dateOfBirth = page.getByRole('button', {name: 'Date of birth, date picker'})
        this.calendarViewSwitcher = page.getByRole('button', {name: 'calendar view is open, switch'})
        this.previousMonth = page.getByRole('button', {name: 'Previous month'})
        this.calendarContainer = page.locator('div.border-monochrome-200.bg-white')
        this.calendarDateCell = (day: string) => page.getByRole('gridcell', {name: day.toString(), exact: true}).first()
        this.genderDropdown = page.locator('button[aria-controls="gender-menu"]')
    }

    /**
     * Clicks "Previous month" in the calendar until the displayed month
     * matches the target month. Used internally by selectBirthDate.
     * @param targetMonth - Month name to navigate to (e.g. "March").
     */
    async navigateToMonth(targetMonth: string): Promise<void> {
        while (!(await this.calendarContainer.innerText()).includes(targetMonth)) {
            await this.previousMonth.click()
            await this.page.waitForTimeout(100) // Brief pause to allow calendar re-render
        }
    }

    /**
     * Opens the date of birth picker, switches to year view, selects the target year,
     * navigates to the correct month, and clicks the target day cell.
     * @param date
     */
    async selectBirthDate(date: DayData): Promise<void> {
        await this.dateOfBirth.click()
        await this.calendarViewSwitcher.click() // Switch to year selection view
        await this.page.getByRole('radio', {name: date.year}).click()
        await this.navigateToMonth(date.month)
        await this.calendarDateCell(date.day).click()
    }

    /**
     * Fills in the entire Personal Details form using the provided user data.
     * Selects title and gender via dropdowns, fills text fields,
     * and sets the date of birth through the calendar picker.
     * @param personalData - Object containing all personal detail fields.
     */
    async fillPersonalDetailsForm(personalData: NewUser): Promise<void> {
        await selectDropdownOption(this.titleDropdown, personalData.personalDetailsTitle)
        await this.preferredName.fill(personalData.preferredName)
        await this.middleName.fill(personalData.middleName)
        await this.selectBirthDate(personalData.dayData)
        await selectDropdownOption(this.genderDropdown, personalData.genderOption)
    }
}