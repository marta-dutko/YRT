import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './BasePage.page';

/**
 * Page Object Model for the Home page.
 * Extends BasePage with navigation and catalog access actions.
 */
export class HomePage extends BasePage {
    private readonly pageHeading: Locator;
    private readonly allCoursesBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.getByRole('heading', {name: 'Popular Courses', level: 2})
        this.allCoursesBtn = page.getByRole('link', {name: 'See All Courses'})
    }

    /**
     * Navigates to the Home page.
     * @param url - Full URL of the Home page.
     */
    async goToHomePage(url: string): Promise<void> {
        await this.goTo(url)
    }

    /**
     * Navigates to the Home page, waits for the "Popular Courses" heading to be visible,
     * then clicks "See All Courses" to open the course catalog.
     * @param url - Full URL of the Home page.
     */
    async gotoCatalog(url: string) {
        await this.goTo(url)
        await expect(this.pageHeading).toBeVisible()
        await this.allCoursesBtn.click()
    }
}