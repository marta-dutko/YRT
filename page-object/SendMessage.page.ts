import {expect, Locator, Page} from '@playwright/test';
import {ContactForm} from "../data/formTestData";

/**
 * Page Object Model for the "Contact Us" form
 * Encapsulates all locators and actions related to submitting a contact form.
 */
export class SendMessage {
    private readonly page: Page
    // Form field locators
    private readonly fullNameField: Locator
    private readonly stateField: Locator  // Dropdown trigger button
    private readonly optionField: Locator // "New South Wales" option inside the dropdown
    private readonly organisationField: Locator
    private readonly emailField: Locator
    private readonly phoneNumberField: Locator
    private readonly messageField: Locator
    private readonly sendMessageBtn: Locator
    private readonly successMessage: Locator // Confirmation text shown after successful submission

    constructor(page: Page) {
        this.page = page
        this.fullNameField = page.getByLabel('Full name')
        this.stateField = page.getByRole('button', {name: 'State'})
        this.optionField = page.getByRole('menuitemradio', {name: 'New South Wales'})
        this.organisationField = page.getByLabel('Organisation')
        this.emailField = page.getByPlaceholder('ex. james@gmail.com')
        this.phoneNumberField = page.getByLabel('Phone Number')
        this.messageField = page.getByPlaceholder('How can we help?')
        this.sendMessageBtn = page.getByRole('button', {name: 'Send Message'})
        this.successMessage = page.getByText('Thank you!')
    }

    /**
     * Fills in all fields of the contact form using the provided test data.
     * Opens the State dropdown and selects "New South Wales" by default.
     * @param userFormData - Object containing all form field values.
     */
    async fillContactUsForm(userFormData: ContactForm): Promise<void> {
        await this.fullNameField.fill(userFormData.fullNameField)
        await this.stateField.click()
        await this.optionField.click()
        await this.organisationField.fill(userFormData.organisationField)
        await this.emailField.fill(userFormData.emailField)
        await this.phoneNumberField.fill(userFormData.phoneNumberField)
        await this.messageField.fill(userFormData.messageField)
    }

    /**
     * Clicks the "Send Message" button to submit the contact form.
     */
    async submitForm(): Promise<void> {
        await this.sendMessageBtn.click();
    }

    /**
     * Takes a timestamped screenshot and asserts that the success message is visible.
     * Waits up to 10 seconds for the confirmation element to appear.
     */
    async checkSuccessMessage(): Promise<void> {
        await this.page.screenshot({path: `success-${Date.now()}.png`});
        await expect(this.successMessage).toBeVisible({timeout: 10000});
    }
}
