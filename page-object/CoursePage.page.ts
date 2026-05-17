import {Page, Locator} from "@playwright/test"
import {BasePage} from './BasePage.page'

/**
 * Page Object Model for an individual Course page.
 * Handles navigation from a course details page to the booking/enrollment flow.
 */
export class CoursePage extends BasePage {
    private readonly viewBookingOptionsBtn: Locator  // Link that opens the list of available booking options
    private readonly enrollBtn: Locator              // First "Enroll" link on the booking options page

    constructor(page: Page) {
        super(page)
        this.viewBookingOptionsBtn = page.getByRole('link', {name: 'View Booking Options'})
        this.enrollBtn = page.getByRole('link', {name: 'Enroll'}).nth(0)
    }

    /**
     * Navigates through the enrollment flow by clicking "View Booking Options"
     * and then clicking the first available "Enroll" link.
     */
    async goToBooking(): Promise<void> {
        await this.viewBookingOptionsBtn.click()
        await this.enrollBtn.click()
    }
}