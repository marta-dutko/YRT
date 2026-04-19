import {expect, Locator, Page} from '@playwright/test';
import {selectDropdownOption} from "../../helpers/dropdown.helper";
import {NewUser} from "../../data/enrollTestData";
export class AdditionalDetailsPage {
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
    
    async fillAdditionalForm(data:NewUser):Promise<void> {
    await selectDropdownOption(this.studyReasonDropdown,data.studyReasonOption)
    await selectDropdownOption(this.disabilityDropdown,data.disabilityOption)
    await selectDropdownOption(this.indigenousDropdown,data.indigenousOption)
    await selectDropdownOption(this.employmentDropdown,data.employmentOption)
    }
}