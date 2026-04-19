import {expect, Locator, Page} from '@playwright/test';
import {ContactForm} from "../data/enrollTestData";

export class SendMessage {
    private readonly page: Page
    private readonly fullNameField: Locator
    private readonly stateField: Locator
    private readonly optionField: Locator
    private readonly organisationField: Locator
    private readonly emailField: Locator
    private readonly phoneNumberField: Locator
    private readonly messageField: Locator
    private readonly sendMessegeBtn: Locator
    private readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.fullNameField = page.getByLabel('Full name')
        this.stateField = page.getByRole('button', {name: 'State'})
        this.optionField = page.getByRole('menuitemradio', {name: 'New South Wales'})
        this.organisationField = page.getByLabel('Organisation')
        this.emailField = page.getByPlaceholder('ex. james@gmail.com')
        this.phoneNumberField = page.getByLabel('Phone Number')
        this.messageField = page.getByPlaceholder('How can we help?')
        this.sendMessegeBtn = page.getByRole('button', {name: 'Send Message'})
        this.successMessage = page.getByText('Thank you!')
    }

    async fillContactUsForm(userFormData: ContactForm): Promise<void> {
        await this.fullNameField.fill(userFormData.fullNameField)
        await this.stateField.click()
        await this.optionField.click()
        await this.organisationField.fill(userFormData.organisationField)
        await this.emailField.fill(userFormData.emailField)
        await this.phoneNumberField.fill(userFormData.phoneNumberField)
        await this.messageField.fill(userFormData.messageField)
    }

    async submitForm(): Promise<void> {
        await this.sendMessegeBtn.click();
    }

    async checkSuccessMessage(): Promise<void> {
        await this.page.screenshot({path: `success-${Date.now()}.png`});
        await expect(this.successMessage).toBeVisible({timeout: 10000});
    }
}
