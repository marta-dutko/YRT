import {Locator, Page} from "@playwright/test"
import {ExistingUser, NewUser} from "../../data/enrollTestData"
import {toast} from "../../helpers/toast.helper";

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
    // Toast locators — used to assert post-submission feedback messages
    private readonly successToast: Locator
    private readonly duplicateToast: Locator

    constructor(page: Page) {
        this.page = page
        this.givenName = page.getByRole('textbox', {name: 'Given name'})
        this.lastName = page.getByRole('textbox', {name: 'Last name'})
        this.email = page.getByRole('textbox', {name: 'Email'})
        this.registerBtn = page.getByRole('button', {name: 'Register'})
        // Green toast on successful registration; yellow toast when email is already registered
        this.successToast = page.locator('[role="alert"][class*="6D8F2B"]');
        this.duplicateToast =page.locator('[role="alert"][class*="yellow"]')

    }

    /**
     * Fills in the registration form with the provided user data.
     * @param userData - Object containing givenName, lastName, and email.
     */
    async fillRegistrationForm(userData: NewUser| ExistingUser): Promise<void> {
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

    // --- Toast assertions ---

    // Asserts a green success toast appears after successful registration
    async expectSuccessToast(): Promise<void> {
        await toast(this.page, '[role="alert"][class*="6D8F2B"]', 'You\'ve been registered successfully')
    }

    // Asserts a yellow warning toast appears when the email address is already registered
    async expectDuplicateEmailToast(): Promise<void> {
        await toast( this.page,'[role="alert"][class*="yellow"]', 'Account already exists')
    }
}