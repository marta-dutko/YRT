import { Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/testData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
export class SchoolingPage {
    private readonly page:Page
    private readonly schoolLeveDropdown:Locator

    constructor(page:Page) {
        this.page = page
        this.schoolLeveDropdown = page.locator('button[aria-controls="school-level-menu"]')
        // this.yearSchoolCompleted = page.getByPlaceholder('e.g. 2022')
    }
    async fillSchoolingForm(schoolingData:NewUser):Promise<void> {
    await selectDropdownOption(this.schoolLeveDropdown,schoolingData.schoolLeveOption )
    }
}

//====
// import { expect } from "@playwright/test";
// export class SchoolingPage {
//     constructor(page) {
//         this.page = page
//         this.loader = page.getByRole('status').filter({ hasText: 'Loading...' })
//         this.pageHeading = page.getByRole('heading', { name: 'Secondary Education', level: 3 })
//         this.schoolLeveDropdown = page.locator('button', { hasText: 'Select highest completed school level' })
//         this.schoolLeveOption = page.getByRole('menuitemradio', { name: 'Year 12 or equivalent' })
//         // this.yearSchoolCompleted = page.getByPlaceholder('e.g. 2022')
//     }
//
//     async waitForPage() {
//         // спочатку чекаємо поки лоадер зникне
//         await expect(this.loader).toBeHidden({ timeout: 15000 });
//         // чекаємо заголовок — він з'являється одразу при завантаженні степу
//         await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
//     }
//
//
//     // async waitForPage() {
//     //     // чекаємо заголовок — він з'являється одразу при завантаженні степу
//     //     await expect(this.pageHeading).toBeVisible({ timeout: 15000 });}
//
//     //  async fillSchoolingForm(schoolingData) {
//     async fillSchoolingForm() {
//         await this.waitForPage()
//         await expect(this.schoolLeveDropdown).toBeVisible(); //
//
//         await this.schoolLeveDropdown.click()
//         // await expect(this.schoolLeveOption).toBeVisible(); //
//         await this.schoolLeveOption.click()
//         // await this.yearSchoolCompleted.fill(schoolingData.year)
//
//
//         // чекаємо поки меню State закриється і форма стабілізується
//         await expect(this.schoolLeveDropdown).toBeHidden()
//     }
// }