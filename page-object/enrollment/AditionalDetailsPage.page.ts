import {expect, Locator, Page} from '@playwright/test';
import {selectDropdownOption} from "../../helpers/dropdown.helper";
import {NewUser} from "../../data/testData";
export class AditionalDetailsPage {
    private readonly page:Page
    private readonly studyReasonDropdown:Locator
    private readonly disabilityDropdown:Locator
    private readonly indigenousDropdown:Locator
    private readonly employmentDropdown:Locator

    constructor(page:Page) {
        this.page = page
        this.studyReasonDropdown = page.locator('button[aria-controls="study-reason-menu"]')
        this.disabilityDropdown = page.locator('button[aria-controls="disability-menu"]')
        this.indigenousDropdown = page.locator('button[aria-controls="indigenous-menu"]')
        this.employmentDropdown = page.locator('button[aria-controls="employment-menu"]')
    }
    
    async fillAditionalDetailsForm(data:NewUser):Promise<void> {
    await selectDropdownOption(this.studyReasonDropdown,data.studyReasonOption)
    await selectDropdownOption(this.disabilityDropdown,data.disabilityOption)
    await selectDropdownOption(this.indigenousDropdown,data.indigenousOption)
    await selectDropdownOption(this.employmentDropdown,data.employmentOption)
    }

}


//========
// import { expect } from '@playwright/test';
// export class AditionalDetailsPage {
//     constructor(page) {
//         this.page = page
//         this.pageHeading = page.getByRole('heading', {name: 'Additional details'})
//         this.studyReasonDropdown = page.locator('button', { hasText: 'Select the reason' })
//         this.studyReasonOption = page.getByRole('menuitemradio', { name: 'To get a job', exact: true })
//         //
//         this.disabilityDropdown = page.locator('button', { hasText: 'Select option' })
//         this.disabilityOption = page.getByRole('menuitemradio', { name: 'No', exact: true })
//         //
//         this.indigenousDropdown = page.locator('button', { hasText: 'Select indigenous status' })
//         this.indigenousOption = page.getByRole('menuitemradio', { name: 'Yes, Aboriginal', exact: true })
//         //
//         this.employmentDropdown = page.locator('button', { hasText: 'Select employment status' })
//         this.employmentOption = page.getByRole('menuitemradio', { name: 'Full-time employee', exact: true })
//     }
//
//     async waitForPage() {
//         // чекаємо заголовок — він з'являється одразу при завантаженні степу
//         await expect(this.pageHeading).toBeVisible({ timeout: 15000 });}
//
//
//     async fillAditionalDetailsForm() {
//         await this.waitForPage()
//         await expect(this.studyReasonDropdown).toBeVisible(); //
//
//         // await this.page.pause()
//         await this.studyReasonDropdown.click()
//         await expect(this.studyReasonOption).toBeVisible();
//         await this.studyReasonOption.click()
//         // await this.page.pause()
//
//         await this.disabilityDropdown.click()
//         await expect(this.disabilityOption).toBeVisible();
//         await this.disabilityOption.click()
//         // await this.page.pause()
//
//         await this.indigenousDropdown.click()
//         await expect(this.indigenousOption).toBeVisible();
//         await this.indigenousOption.click()
//         // await this.page.pause()
//
//         await this.employmentDropdown.click()
//         await expect(this.employmentOption).toBeVisible();
//         await this.employmentOption.click()
//         // await this.page.pause()
//     }
//
// }