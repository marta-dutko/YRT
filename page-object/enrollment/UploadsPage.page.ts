import {expect, Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";

/**
 * Page Object Model for the Uploads step of the enrollment flow.
 * Handles uploading identity documents (driver licence and passport)
 * and verifies each file is successfully processed before proceeding.
 */
export class UploadsPage {
    private readonly page: Page
    // Section containers - scoped to the parent of each heading to target inputs within that section only
    private readonly driverLicenceSection: Locator
    private readonly passportSection: Locator

    constructor(page: Page) {
        this.page = page
        this.driverLicenceSection = page.getByRole('heading', {name: 'Driver Licence'}).locator('..')
        this.passportSection = page.getByRole('heading', {name: 'Passport'}).locator('..')
    }

    /**
     * Uploads the driver licence and passport files, then waits for each
     * upload to complete before moving on.
     * For each document:
     *  - Sets the file on the hidden file input within the section
     *  - Waits for the "Uploading file" indicator to disappear (up to 30s)
     *  - Asserts that the "File added" confirmation heading is visible (up to 15s)
     * @param uploadData - Object containing file paths for the licence and passport.
     */
    async uploadIdentityDocuments(uploadData: NewUser): Promise<void> {
        // Upload driver licence
        await this.driverLicenceSection.locator('input[type="file"]').setInputFiles(uploadData.licencePath)
        await expect(this.driverLicenceSection.getByText('Uploading file')).toBeHidden({timeout: 30000})
        await expect(this.driverLicenceSection.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})

        // Upload passport
        await this.passportSection.locator('input[type="file"]').setInputFiles(uploadData.passportPath)
        await expect(this.passportSection.getByText('Uploading file')).toBeHidden({timeout: 30000})
        await expect(this.passportSection.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})
    }
}