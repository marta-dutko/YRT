import {expect, Locator, Page} from "@playwright/test";
import {Payment} from "../../data/paymentDetails";
import {BasePage} from '../BasePage.page'

/**
 * Page Object Model for the Payment page (eWay payment gateway).
 * Handles filling in credit card details and submitting the payment form.
 */
export class PaymentPage extends BasePage {
    private readonly cardHolder: Locator
    private readonly cardNumber: Locator
    private readonly cardExpiryMonth: Locator  // Native <select> element for expiry month
    private readonly cardExpiryYear: Locator   // Native <select> element for expiry year
    private readonly cardCVN: Locator

    constructor(page: Page) {
        super(page)
        this.cardHolder = page.getByRole('textbox', {name: 'Card Holder'})
        this.cardNumber = page.getByRole('textbox', {name: 'Card Number'})
        this.cardExpiryMonth = page.locator('#EWAY_CARDEXPIRYMONTH')
        this.cardExpiryYear = page.locator('#EWAY_CARDEXPIRYYEAR')
        this.cardCVN = page.getByRole('textbox', {name: 'CVN'})
    }

    /**
     * Fills in all payment form fields with the provided card details.
     * Expiry month and year are set via selectOption on native <select> elements.
     * @param paymentData - Object containing card holder name, number, expiry, and CVN.
     */
    async fillPaymentForm(paymentData: Payment): Promise<void> {
        await this.cardHolder.fill(paymentData.cardHolder)
        await this.cardNumber.fill(paymentData.cardNumber)
        await this.cardExpiryMonth.selectOption(paymentData.cardExpiryMonth)
        await this.cardExpiryYear.selectOption(paymentData.cardExpiryYear)
        await this.cardCVN.fill(paymentData.cardCVN)
    }

    /**
     * Submits the payment form via JavaScript (bypassing a standard button click),
     * waits for the page to redirect to a URL matching /.*success/,
     * and takes a screenshot to capture the post-payment state.
     * Note: form.submit() is used because the gateway may not expose a clickable submit button.
     */
    async proceedToPayment(): Promise<void> {
        await this.page.evaluate(() => {
            const form = document.querySelector('form.payment-form') as HTMLFormElement
            form?.submit()  // Programmatically submit the eWay payment form
        })
        await expect(this.page).toHaveURL(/.*success/, {timeout: 30000})
        await this.page.screenshot({path: 'after-payment-click.png'})
    }
}