// import { expect } from '@playwright/test';
import { Locator, Page } from "@playwright/test"
import { selectDropdownOption } from '../../helpers/dropdown.helper';
import { NewUser } from "../../data/testData"


export class PersonalDetailsPage {
  private readonly page:Page
  private readonly pageHeading:Locator
  private readonly titleDropdown:Locator
//   private readonly titleOptionOther:Locator
  private readonly preferredName:Locator
  private readonly middleName:Locator
//   aria
  private readonly dateOfBirth:Locator
  private readonly calendarViewSwicher:Locator
  private readonly previousMonth:Locator
  private readonly calendarContainer:Locator
  private readonly calendarDateCell:(day: string) => Locator
  private readonly usiField:Locator
  private readonly genderDropdown:Locator
//   private readonly genderOptionOther:Locator


    constructor(page: Page) {
        this.page = page
        this.pageHeading = page.getByRole('heading', {name: 'Personal Details'})
        this.titleDropdown =page.locator('button[aria-controls="title-menu"]')

        this.preferredName = page.getByPlaceholder('Input preferred name')
        this.middleName = page.getByPlaceholder('Input middle name')
        // aria
        this.dateOfBirth = page.getByRole('button', { name: 'Date of birth, date picker' })
        this.calendarViewSwicher = page.getByRole('button', { name: 'calendar view is open, switch' })
        this.previousMonth = page.getByRole('button', { name: 'Previous month' })
        this.calendarContainer = page.locator('div.border-monochrome-200.bg-white')
        this.calendarDateCell = (day:string) => page.getByRole('gridcell', { name: day.toString(), exact: true }).first()
        this.usiField = page.getByPlaceholder('Input student identifier')
        this.genderDropdown = page.locator('button[aria-controls="gender-menu"]')
        // this.genderOptionOther = page.getByRole('menuitemradio', { name: 'Other' })
    }

    async navigateToMonth(targetMonth:string):Promise<void> {
        while (!(await this.calendarContainer.innerText()).includes(targetMonth)) {
            await this.previousMonth.click()
            await this.page.waitForTimeout(100)
        }
    }
    async selectBirthDate(year:string, month:string, day:string):Promise<void> {
        await this.dateOfBirth.click()
        await this.calendarViewSwicher.click()
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


// ======
// import { expect } from '@playwright/test';
// export class PersonalDetailsPage {
//     constructor(page) {
//         this.page = page
//         this.pageHeading = page.getByRole('heading', {name: 'Personal Details'})
//         this.titleDropdown = page.locator('button', { hasText: 'Select title' })
//         this.titleOptionOther = page.locator('button', { hasText: 'Other' })
//         this.preferredName = page.getByPlaceholder('Input preferred name')
//         this.middleName = page.getByPlaceholder('Input middle name')
//         // aria
//         this.dateOfBirth = page.getByRole('button', { name: 'Date of birth, date picker' })
//         this.calendarViewSwicher = page.getByRole('button', { name: 'calendar view is open, switch' })
//         this.previousMonth = page.getByRole('button', { name: 'Previous month' })
//         this.calendarContainer = page.locator('div.border-monochrome-200.bg-white')
//         this.calendarDateCell = (day) => page.getByRole('gridcell', { name: day.toString(), exact: true }).first()
//         this.usiField = page.getByPlaceholder('Input student identifier')
//         this.genderDropdown = page.locator('button', { hasText: 'Select an option' })
//         this.genderOptionOther = page.getByRole('menuitemradio', { name: 'Other' })
//     }
// async waitForPage() {
//     // чекаємо заголовок — він з'являється одразу при завантаженні степу
//     await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
// }

//     async navigateToMonth(targetMonth) {
//         while (!(await this.calendarContainer.innerText()).includes(targetMonth)) {
//             await this.previousMonth.click()
//             await this.page.waitForTimeout(100)
//         }
//     }
//     async selectBirthDate(year, month, day) {
//         await this.dateOfBirth.click()
//         await this.calendarViewSwicher.click()
//         await this.page.getByRole('radio', { name: year.toString() }).click()
//         await this.navigateToMonth(month)
//         await this.calendarDateCell(day).click()
//     }

//     async fillPersonalDetailsForm(personalData) {
//          await this.waitForPage()
//         await this.titleDropdown.click()
//         await this.titleOptionOther.click()
//         await this.preferredName.fill(personalData.preferredName)
//         await this.middleName.fill(personalData.middleName)
//         await this.selectBirthDate(personalData.dayData.year, personalData.dayData.month, personalData.dayData.day)
//         // await this.usiField.fill(personalData.usi) - optional
//         await this.genderDropdown.click()
//         await this.genderOptionOther.click()
//         // await this.page.pause()
//     }

// }