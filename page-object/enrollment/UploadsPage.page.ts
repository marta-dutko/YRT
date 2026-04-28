import {expect, Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";
import {toast} from "../../helpers/toast.helper";

/**
 * Page Object Model for the Uploads step in the enrollment flow.
 * Manages uploading of identity documents (driver's license and passport),
 * verifies each file is processed successfully, and confirms upload via toast notification.
 */
export class UploadsPage {
    private readonly page: Page
    // Section locators — each scoped to the parent element of its heading,
    // ensuring file inputs are targeted within the correct section only
    private readonly driverLicenceSection: Locator
    private readonly passportSection: Locator

    constructor(page: Page) {
        this.page = page
        this.driverLicenceSection = page.getByRole('heading', {name: 'Driver Licence'}).locator('..')
        this.passportSection = page.getByRole('heading', {name: 'Passport'}).locator('..')
    }

    /**
     * Uploads the driver's license and passport files and waits for each to finish processing.
     * For each document:
     *  - Sets the file path on the hidden file input within the relevant section
     *  - Waits for the "Uploading file" spinner to disappear (timeout: 30s)
     *  - Asserts the "File added" confirmation heading becomes visible (timeout: 15s)
     *  - Verifies a success toast notification is shown
     * @param uploadData - Object containing file paths for the license and passport.
     */
    async uploadIdentityDocuments(uploadData: NewUser): Promise<void> {
        // Upload driver's license and confirm success
        await this.driverLicenceSection.locator('input[type="file"]').setInputFiles(uploadData.licencePath)
        await expect(this.driverLicenceSection.getByText('Uploading file')).toBeHidden({timeout: 30000})
        await expect(this.driverLicenceSection.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})
        await this.expectSuccessToast()

        // Upload passport and confirm success
        await this.passportSection.locator('input[type="file"]').setInputFiles(uploadData.passportPath)
        await expect(this.passportSection.getByText('Uploading file')).toBeHidden({timeout: 30000})
        await expect(this.passportSection.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})
        await this.expectSuccessToast()
    }

    // Asserts that a green success toast containing the upload confirmation message is displayed
    async expectSuccessToast(): Promise<void> {
        await toast(this.page, '[role="alert"][class*="6D8F2B"]:last-of-type', 'File has been uploaded successfully')
    }
}