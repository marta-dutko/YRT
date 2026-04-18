import {expect, Locator, Page} from "@playwright/test";
import {CourseData} from "../../data/courseData";
import {NewUser} from "../../data/testData";

export class ReviewDetailsPage {
    private readonly page: Page
    private readonly courseInstance: Locator
    private readonly userFullName: Locator
    private readonly courseDate: Locator
    private readonly courseLocation: Locator
    private readonly courseFees: Locator
    private readonly discountCode: Locator
    private readonly discountCodeBtn: Locator
    private readonly goToPaymentBtn: Locator
    private readonly discountSuccessMessage: Locator
    // private readonly discountedPrice: Locator

    constructor(page: Page) {
        this.page = page
        this.courseInstance = page.locator('#input-review_course')
        this.userFullName = page.locator('#input-review_name')
        this.courseDate = page.locator('#input-review_date')
        this.courseLocation = page.locator('#input-review_location')
        this.courseFees = page.locator('#input-review_fee')
        this.discountCode = page.locator('#input-discount')
        this.discountCodeBtn = page.getByRole('button', {name: 'Apply'})
        this.discountSuccessMessage = this.discountSuccessMessage = page.locator('.text-green-700').filter({
            hasText: 'off'
        })
        this.goToPaymentBtn = page.getByRole('button', {name: 'Go to Payment'})
    }

    async verifyDetails(course: CourseData, user: NewUser): Promise<void> {
        await expect(this.courseInstance).toHaveAttribute('placeholder', course.name)
        await expect(this.userFullName).toHaveAttribute('placeholder', `${user.givenName} ${user.lastName}`)
        await expect(this.courseDate).toHaveAttribute('placeholder', course.date)
        await expect(this.courseLocation).toHaveAttribute('placeholder', course.location)
        await expect(this.courseFees).toHaveAttribute('placeholder', course.fees)
    }

    async verifyDiscountApplied(course: CourseData): Promise<void> {
        await this.discountCode.fill(course.discountCode)
        await this.discountCodeBtn.click()
        await expect(this.discountSuccessMessage).toBeVisible()
        await expect(this.discountSuccessMessage).toContainText(course.discountMessage)
        await expect(this.courseFees).toHaveAttribute('placeholder', course.discountPrice)
    }

    async clickGoToPayment(): Promise<void> {
        await this.goToPaymentBtn.click()
    }
}