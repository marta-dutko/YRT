import {expect, Page} from "@playwright/test";

export async function toast(page:Page, locatorName:string, toastText:string):Promise<void>{
    const toastElement = page.locator(locatorName);
    await expect(toastElement).toBeVisible({ timeout: 5000 });
    await expect(toastElement).toContainText(toastText);
}