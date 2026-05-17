import {expect, Page} from "@playwright/test";
import {DayData} from "../data/interfaces";

export async function navigateToMonth(page: Page, courseMonth: DayData, buttonName: string, locatorName: string): Promise<void> {
    const MAX_CLICKS = 24
    const label = page.locator(locatorName).first()
    let clicks = 0
    while (!(await label.innerText()).includes(courseMonth.month)) {
        if (clicks++ >= MAX_CLICKS) {
            throw new Error(`Month "${courseMonth.month}" not reached after ${MAX_CLICKS} clicks on "${buttonName}"`)
        }
        const currentText = await label.innerText()
        await page.getByRole('button', {name: buttonName}).click()
        await expect(label).not.toHaveText(currentText, { timeout: 5000 })
    }
}