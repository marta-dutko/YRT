import {Locator, Page} from "@playwright/test"
import {expect} from "@playwright/test"

/**
 * Page Object Model for the multi-step Enrollment page.
 * Manages step navigation (Next / Previous), step visibility assertions,
 * and provides a safe click utility to prevent flaky interactions.
 */
export class EnrollmentPage {
    private readonly page: Page
    private readonly nextBtn: Locator
    private readonly previousBtn: Locator
    private readonly logInAsDifferentUserBtn: Locator
    // Dynamic locator factory - returns the step heading matching the given step name
    private readonly stepTitle: (stepName: string) => Locator

    constructor(page: Page) {
        this.page = page
        this.nextBtn = page.getByRole('button', {name: 'Next Step'})
        this.previousBtn = page.getByRole('button', {name: 'Previous Step'})
        this.logInAsDifferentUserBtn = page.getByRole('button', {
            name: 'Log in as a different user',
            exact: true
        }).filter({ hasNot: page.locator('[disabled]') })
        this.stepTitle = (stepName: string) => page.getByRole('heading', {name: stepName})
    }

    /**
     * Clicks "Next Step" and waits for the current step heading to disappear,
     * confirming the page has transitioned away from the current step.
     * Reads the active heading before clicking to use it as the disappearance anchor.
     */
    async clickNext(): Promise<void> {
        const currentHeading = this.page.getByRole('heading', {level: 3}).first()
        const currentText = await currentHeading.textContent()
        await this.safeClick(this.nextBtn)
        // Wait until the previous step heading is no longer visible
        await expect(this.page.getByRole('heading', {level: 3, name: currentText!}))
            .toBeHidden({timeout: 10000})
    }

    /**
     * Clicks "Next Step" and waits for the specified next step heading to become visible.
     * Use when the exact name of the upcoming step is known.
     * @param nextStepName - The heading text of the step expected to appear.
     * @param timeout - Maximum time to wait for the next step to appear (default: 30s).
     */
    async clickNextAndWaitFor(nextStepName: string, timeout = 30000): Promise<void> {
        await this.safeClick(this.nextBtn)
        await expect(this.stepTitle(nextStepName)).toBeVisible({timeout})
    }

    /**
     * Asserts that the specified step heading is visible on the page.
     * Uses a longer timeout to accommodate async or slow-loading steps.
     * @param stepName - The heading text of the step to verify.
     * @param timeout - Maximum time to wait for the step to appear (default: 120s).
     */
    async expectStepToBeVisible(stepName: string, timeout = 120000): Promise<void> {
        await expect(this.stepTitle(stepName)).toBeVisible({timeout});
    }

    /**
     * Clicks the "Previous Step" button to navigate back to the prior step.
     */
    async clickPrevious(): Promise<void> {
        await this.safeClick(this.previousBtn)
    }

    /**
     * Clicks the "Log in as a different user" button,
     * used to switch accounts mid-flow without restarting enrollment.
     */
    async clickLogInAsDifferentUser(): Promise<void> {
        await this.safeClick(this.logInAsDifferentUserBtn)
    }

    /**
     * Clicks a step button in the left sidebar, then waits for the step heading to appear.
     * @param buttonName - The accessible name of the sidebar button (e.g. 'Uploads').
     * @param headingName - The step heading to wait for after navigation; defaults to buttonName.
     */
    async clickSidebarStep(buttonName: string, headingName: string = buttonName): Promise<void> {
        await this.page.getByRole('button', {name: buttonName}).click()
        await this.expectStepToBeVisible(headingName)
    }

    /**
     * Waits for the element to be visible, then clicks it.
     * Guards against race conditions where the element exists in the DOM but is not yet interactable.
     * @param locator - The element to wait for and click.
     */
    async safeClick(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible({timeout: 10000});
        await locator.click({timeout: 10000});
    }
}