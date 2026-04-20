import {Locator, Page} from "@playwright/test"

/**
 * Page Object Model for the All Courses catalog page.
 * Provides access to individual course listings by name.
 */
export class AllCoursesPage {
    private readonly page: Page
    // Dynamic locator factory — returns a link locator for the given course name
    private readonly courseLink: (courseName: string) => Locator;

    constructor(page: Page) {
        this.page = page
        this.courseLink = (courseName: string) => page.getByRole('link', {name: courseName})
    }

    /**
     * Clicks the course link matching the given name to open its details page.
     * @param courseName - The visible name of the course to open.
     */
    async openCourse(courseName: string): Promise<void> {
        await this.courseLink(courseName).click()
    }
}