import {Page} from "@playwright/test";
import {DayData} from "../data/interfaces";

export async function navigateToMonth(page:Page, courseMonth: DayData, buttonName:string, locatorName:string): Promise<void> {
    while (!(await page.locator(locatorName).innerText()).includes(courseMonth.month)) {
    await page.getByRole('button', {name: buttonName}).click()
    await page.waitForTimeout(100)
}
}