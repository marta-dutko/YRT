import {expect, Locator, Page} from "@playwright/test";
import { Payment } from "../../data/paymentDetails";

export class PaymentPage {
    private readonly page: Page
    private readonly cardHolder: Locator
    private readonly cardNumber: Locator
    private readonly cardExpirityMonth: Locator
    private readonly cardExpirityYear: Locator
    private readonly cardCVN: Locator

    constructor(page: Page) {
        this.page = page
        this.cardHolder = page.getByRole('textbox', { name: 'Card Holder' })
        this.cardNumber = page.getByRole('textbox', { name: 'Card Number' })
        this.cardExpirityMonth = page.locator('#EWAY_CARDEXPIRYMONTH')
        this.cardExpirityYear = page.locator('#EWAY_CARDEXPIRYYEAR')
        this.cardCVN = page.getByRole('textbox', { name: 'CVN' })
    }

    async fillPaymentForm(paymentData: Payment): Promise<void> {
        await this.cardHolder.fill(paymentData.cardHolder)
        await this.cardNumber.fill(paymentData.cardNumber)
        await this.cardExpirityMonth.selectOption(paymentData.cardExpiryMonth)
        await this.cardExpirityYear.selectOption(paymentData.cardExpiryYear)
        await this.cardCVN.fill(paymentData.cardCVN)
    }

    async proceedToPayment(): Promise<void> {
        await this.page.evaluate(() => {
            const form = document.querySelector('form.payment-form') as HTMLFormElement
            form?.submit()
        })
        await expect(this.page).toHaveURL(/.*success/, { timeout: 30000 })
        await this.page.screenshot({ path: 'after-payment-click.png' })

    }}


