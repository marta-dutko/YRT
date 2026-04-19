import { Page,Locator } from "@playwright/test"

export class CoursePage {
    private readonly page: Page
    private readonly viewBookingOptionsBtn:Locator
    private readonly enrollBtn:Locator

    constructor(page:Page) {
        this.page=page
        this.viewBookingOptionsBtn = page.getByRole('link',{name:'View Booking Options'})
        this.enrollBtn = page.getByRole('link',{name:'Enroll'}).nth(0)
    }
    async goToBooking():Promise<void>{
        await this.viewBookingOptionsBtn.click()
        await this.enrollBtn.click()
    }
}