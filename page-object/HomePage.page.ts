import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.page';

export class HomePage extends BasePage {
    private readonly pageHeading: Locator;
    private readonly allCoursesBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.pageHeading = page.getByRole('heading', { name: 'Popular Courses', level: 2 })
        this.allCoursesBtn = page.getByRole('link', { name: 'See All Courses' })
    }

    async goToHomePage(url:string):Promise<void>{
        await this.goTo(url)
    }

    async gotoCatalog(url:string) {
        await this.goTo(url)
        await expect(this.pageHeading).toBeVisible()
        await this.allCoursesBtn.click()
    }
}