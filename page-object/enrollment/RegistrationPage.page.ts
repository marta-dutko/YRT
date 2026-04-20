import {Locator, Page} from "@playwright/test"
import {NewUser} from "../../data/enrollTestData"

/**
 * Page Object Model for the Registration page.
 * Handles filling in new user details and submitting the registration form.
 */
export class RegistrationPage {
    private readonly page: Page
    private readonly givenName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly registerBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.givenName = page.getByRole('textbox', {name: 'Given name'})
        this.lastName = page.getByRole('textbox', {name: 'Last name'})
        this.email = page.getByRole('textbox', {name: 'Email'})
        this.registerBtn = page.getByRole('button', {name: 'Register'})
    }

    /**
     * Fills in the registration form with the provided user data.
     * @param userData - Object containing givenName, lastName, and email.
     */
    async fillRegistrationForm(userData: NewUser): Promise<void> {
        await this.givenName.fill(userData.givenName)
        await this.lastName.fill(userData.lastName)
        await this.email.fill(userData.email)
    }

    /**
     * Clicks the "Register" button to submit the registration form.
     */
    async submitRegistration(): Promise<void> {
        await this.registerBtn.click()
    }
}