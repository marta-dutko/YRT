import { Locator, Page } from "@playwright/test"
import { selectDropdownOption } from '../../helpers/dropdown.helper';
import { NewUser } from "../../data/enrollTestData"

export class PersonalDetailsPage {
  private readonly page:Page
  private readonly titleDropdown:Locator
  private readonly preferredName:Locator
  private readonly middleName:Locator
//   aria
  private readonly dateOfBirth:Locator
  private readonly calendarViewSwitcher:Locator
  private readonly previousMonth:Locator
  private readonly calendarContainer:Locator
  private readonly calendarDateCell:(day: string) => Locator
  private readonly genderDropdown:Locator

    constructor(page: Page) {
        this.page = page
        this.titleDropdown =page.locator('button[aria-controls="title-menu"]')
        this.preferredName = page.getByPlaceholder('Input preferred name')
        this.middleName = page.getByPlaceholder('Input middle name')
        // aria
        this.dateOfBirth = page.getByRole('button', { name: 'Date of birth, date picker' })
        this.calendarViewSwitcher = page.getByRole('button', { name: 'calendar view is open, switch' })
        this.previousMonth = page.getByRole('button', { name: 'Previous month' })
        this.calendarContainer = page.locator('div.border-monochrome-200.bg-white')
        this.calendarDateCell = (day:string) => page.getByRole('gridcell', { name: day.toString(), exact: true }).first()
        this.genderDropdown = page.locator('button[aria-controls="gender-menu"]')
    }

    async navigateToMonth(targetMonth:string):Promise<void> {
        while (!(await this.calendarContainer.innerText()).includes(targetMonth)) {
            await this.previousMonth.click()
            await this.page.waitForTimeout(100)
        }
    }

    async selectBirthDate(year:string, month:string, day:string):Promise<void> {
        await this.dateOfBirth.click()
        await this.calendarViewSwitcher.click()
        await this.page.getByRole('radio', { name: year}).click()
        await this.navigateToMonth(month)
        await this.calendarDateCell(day).click()
    }

    async fillPersonalDetailsForm(personalData:NewUser):Promise<void> {
        await selectDropdownOption(this.titleDropdown, personalData.personalDetailsTitle)
        await this.preferredName.fill(personalData.preferredName)
        await this.middleName.fill(personalData.middleName)
        await this.selectBirthDate(personalData.dayData.year, personalData.dayData.month, personalData.dayData.day)
        await selectDropdownOption(this.genderDropdown, personalData.genderOption)
    }
}