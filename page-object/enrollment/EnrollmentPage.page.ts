import {Locator, Page} from "@playwright/test"
import {expect} from "@playwright/test"

export class EnrollmentPage {
    private readonly page: Page
    private readonly nextBtn: Locator
    private readonly previosBtn: Locator
    private readonly logInAsDiferentUserBtn: Locator
    private readonly stepTitle: (stepName: string) => Locator

    constructor(page: Page) {
        this.page = page
        this.nextBtn = page.getByRole('button', {name: 'Next Step'})
        this.previosBtn = page.getByRole('button', {name: 'Previous Step'})
        this.logInAsDiferentUserBtn = page.getByRole('button', {name: 'Log in as a different user'})
        this.stepTitle = (stepName: string) => page.getByRole('heading', {name: stepName})
    }

    async clickNext(): Promise<void> {
        const currentHeading = this.page.getByRole('heading', {level: 3}).first()
        const currentText = await currentHeading.textContent()
        await this.safeClick(this.nextBtn)
        await expect(this.page.getByRole('heading', {level: 3, name: currentText!}))
            .toBeHidden({timeout: 10000})
    }

    async clickNextAndWaitFor(nextStepName: string, timeout = 30000): Promise<void> {
        await this.safeClick(this.nextBtn)
        await expect(this.stepTitle(nextStepName)).toBeVisible({timeout})
    }

    async expectStepToBeVisible(stepName: string, timeout = 120000): Promise<void> {
        await expect(this.stepTitle(stepName)).toBeVisible({timeout});
    }

    // Click previous btn
    async clickPrevious(): Promise<void> {
        await this.safeClick(this.previosBtn)
    }

    // Click LogIn As A Different User btn
    async clickLogInAsDifferentUser(): Promise<void> {
        await this.safeClick(this.logInAsDiferentUserBtn)
    }

    // Function for stability
    async safeClick(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible({timeout: 10000});
        await locator.click({timeout: 10000});
    }
}