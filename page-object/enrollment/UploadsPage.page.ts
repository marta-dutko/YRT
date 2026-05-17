import {expect, Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";
import {toast} from "../../helpers/toast.helper";
import {BasePage} from '../BasePage.page'

/**
 * Page Object Model for the Uploads step in the enrollment flow.
 * Manages uploading of identity documents (driver's license and passport),
 * verifies each file is processed successfully, and confirms upload via toast notification.
 */
export class UploadsPage extends BasePage {
    // Section locators — each scoped to the parent element of its heading,
    // ensuring file inputs are targeted within the correct section only
    private readonly driverLicenceSection: Locator
    private readonly passportSection: Locator

    constructor(page: Page) {
        super(page)
        this.driverLicenceSection = page.locator('div')
            .filter({has: page.getByRole('heading', {name: 'Driver Licence', exact: true})})
            .filter({hasNot: page.getByRole('heading', {name: 'Passport', exact: true})})
        this.passportSection = page.locator('div')
            .filter({has: page.getByRole('heading', {name: 'Passport', exact: true})})
            .filter({hasNot: page.getByRole('heading', {name: 'Driver Licence', exact: true})})
    }

    /**
     * Uploads the driver's license and passport files and waits for each to finish processing.
     * @param uploadData - Object containing file paths for the license and passport.
     */
    async uploadIdentityDocuments(uploadData: NewUser): Promise<void> {
        await this.uploadToSection(this.driverLicenceSection, uploadData.licencePath)
        await this.uploadToSection(this.passportSection, uploadData.passportPath)
    }

    /**
     * Uploads a file to the driver licence section and waits for the spinner to disappear.
     * Does not assert the outcome — use expectUploadSuccess or expectUploadRejected after.
     * @param filePath - Path to the file to upload.
     */
    async uploadFileToDriverLicence(filePath: string): Promise<void> {
        await this.driverLicenceSection.locator('input[type="file"]').setInputFiles(filePath)
        await expect(this.driverLicenceSection.getByText('Uploading file')).toBeHidden({timeout: 30000})
    }

    /**
     * Asserts that the driver licence upload was accepted by the application.
     */
    async expectUploadSuccess(): Promise<void> {
        await expect(this.driverLicenceSection.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})
        await this.expectSuccessToast()
    }

    /**
     * Asserts that the driver licence upload was rejected:
     * "File added" heading must not appear, and an alert with the expected error text must be visible.
     * @param errorText - The exact error message expected in the alert.
     */
    async expectUploadRejected(errorText: string): Promise<void> {
        await expect(this.driverLicenceSection.getByRole('heading', {name: 'File added'})).toBeHidden({timeout: 5000})
        await expect(this.page.getByRole('alert').filter({hasText: errorText})).toBeVisible()
    }

    // Asserts that a green success toast containing the upload confirmation message is displayed
    async expectSuccessToast(): Promise<void> {
        await toast(this.page, '[role="alert"][class*="6D8F2B"]:last-of-type', 'File has been uploaded successfully')
    }

    /**
     * Uploads a file to the given section, waits for the spinner to disappear,
     * asserts the "File added" heading, and confirms via success toast.
     */
    private async uploadToSection(section: Locator, filePath: string): Promise<void> {
        await section.locator('input[type="file"]').setInputFiles(filePath)
        await expect(section.getByText('Uploading file')).toBeHidden({timeout: 30000})
        await expect(section.getByRole('heading', {name: 'File added'})).toBeVisible({timeout: 15000})
        await this.expectSuccessToast()
    }
}
