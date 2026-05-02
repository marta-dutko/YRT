import { Page, Response, expect } from '@playwright/test'
import { BasePage } from './BasePage.page'

/**
 * Page Object Model for navigation smoke checks.
 * Provides methods to open a page and verify it loaded without errors.
 */
export class NavigationPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    /**
     * Navigates to the given URL and returns the server response.
     * Returning the Response allows the caller to assert the HTTP status code.
     * @param url - Full URL to navigate to.
     */
    async openPage(url: string): Promise<Response | null> {
        return this.page.goto(url)
    }

    /**
     * Asserts that the page returned a 200 status and contains no error indicators.
     * Checks both the HTTP status and the absence of "404" / "not found" text in the DOM.
     * @param response - The Response object returned by openPage.
     */
    async expectPageLoaded(response: Response | null): Promise<void> {
        expect(response?.status()).toBe(200)
        await expect(this.page.getByText('404', { exact: true })).not.toBeVisible()
        await expect(this.page.getByText(/not found/i)).not.toBeVisible()
    }
}
