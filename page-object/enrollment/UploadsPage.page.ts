import {expect, Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";

export class UploadsPage {
    private readonly page: Page
    private readonly driverLicenceSection: Locator
    private readonly passportSection: Locator

    constructor(page: Page) {
        this.page = page
        this.driverLicenceSection = page.getByRole('heading', {name: 'Driver Licence'}).locator('..')
        this.passportSection = page.getByRole('heading', {name: 'Passport'}).locator('..')

    }
    async uploadIdentityDocuments(uploadData: NewUser): Promise<void> {
        await this.driverLicenceSection.locator('input[type="file"]').setInputFiles(uploadData.licencePath)
        await expect(this.driverLicenceSection.getByText('Uploading file')).toBeHidden({ timeout: 30000 })
        await expect(this.driverLicenceSection.getByRole('heading', { name: 'File added' })).toBeVisible({ timeout: 15000 })

        await this.passportSection.locator('input[type="file"]').setInputFiles(uploadData.passportPath)
        await expect(this.passportSection.getByText('Uploading file')).toBeHidden({ timeout: 30000 })
        await expect(this.passportSection.getByRole('heading', { name: 'File added' })).toBeVisible({ timeout: 15000 })
    }
}


