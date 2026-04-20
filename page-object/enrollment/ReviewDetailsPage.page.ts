import {expect, Locator, Page} from "@playwright/test";
import {CourseData} from "../../data/courseData";
import {NewUser} from "../../data/enrollTestData";

/**
 * Page Object Model for the Review Details step of the enrollment flow.
 * Displays a summary of the selected course and user details for verification,
 * and allows applying a discount code before proceeding to payment.
 */
export class ReviewDetailsPage {
    private readonly page: Page
    // Read-only summary fields - values are rendered as placeholder attributes
    private readonly courseInstance: Locator
    private readonly userFullName: Locator
    private readonly courseDate: Locator
    private readonly courseLocation: Locator
    private readonly courseFees: Locator // Updates to reflect discounted price after a valid code is applied
    // Discount code controls
    private readonly discountCode: Locator
    private readonly discountCodeBtn: Locator
    private readonly discountSuccessMessage: Locator // Green text confirming the discount amount applied
    // Navigation
    private readonly goToPaymentBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.courseInstance = page.locator('#input-review_course')
        this.userFullName = page.locator('#input-review_name')
        this.courseDate = page.locator('#input-review_date')
        this.courseLocation = page.locator('#input-review_location')
        this.courseFees = page.locator('#input-review_fee')
        this.discountCode = page.locator('#input-discount')
        this.discountCodeBtn = page.getByRole('button', {name: 'Apply'})
        // Targets green-colored text containing "off" to confirm discount was applied
        this.discountSuccessMessage = page.locator('.text-green-700').filter({hasText: 'off'})
        this.goToPaymentBtn = page.getByRole('button', {name: 'Go to Payment'})
    }

    /**
     * Asserts that all summary fields match the expected course and user data.
     * Values are compared against the placeholder attribute, as fields are read-only.
     * @param course - Object containing expected course name, date, location, and fees.
     * @param user - Object containing the user's given name and last name.
     */
    async verifyDetails(course: CourseData, user: NewUser): Promise<void> {
        await expect(this.courseInstance).toHaveAttribute('placeholder', course.name)
        await expect(this.userFullName).toHaveAttribute('placeholder', `${user.givenName} ${user.lastName}`)
        await expect(this.courseDate).toHaveAttribute('placeholder', course.date)
        await expect(this.courseLocation).toHaveAttribute('placeholder', course.location)
        await expect(this.courseFees).toHaveAttribute('placeholder', course.fees)
    }

    /**
     * Enters a discount code, clicks "Apply", and verifies the discount was accepted.
     * Asserts that the success message is visible and contains the expected discount text,
     * then confirms the fees field updated to the discounted price.
     * @param course - Object containing the discount code, expected message, and discounted price.
     */
    async verifyDiscountApplied(course: CourseData): Promise<void> {
        await this.discountCode.fill(course.discountCode)
        await this.discountCodeBtn.click()
        await expect(this.discountSuccessMessage).toBeVisible()
        await expect(this.discountSuccessMessage).toContainText(course.discountMessage)
        await expect(this.courseFees).toHaveAttribute('placeholder', course.discountPrice)
    }

    /**
     * Clicks the "Go to Payment" button to proceed to the payment step.
     */
    async clickGoToPayment(): Promise<void> {
        await this.goToPaymentBtn.click()
    }
}