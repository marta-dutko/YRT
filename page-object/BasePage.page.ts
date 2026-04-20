import {Page} from '@playwright/test';

/**
 * Base class for all Page Object Models.
 * Provides shared page instance and common navigation method
 * to be inherited by all page-specific classes.
 */
export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Navigates the browser to the specified URL.
     * @param url - The full URL to navigate to.
     */
    async goTo(url: string): Promise<void> {
        await this.page.goto(url)
    }
}