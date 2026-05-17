import { test, Response } from '@playwright/test'
import { NavigationPage } from '../../page-object/NavigationPage.page'
import { navigationPages } from '../../data/navigationData'

/**
 * Navigation smoke test suite.
 * Verifies that every public-facing page loads successfully:
 * HTTP status 200 and no "404" or "not found" text in the DOM.
 */
for (const navPage of navigationPages) {
    // Each iteration creates a separate test named after the page label
    test(`Page loads without errors - ${navPage.name}`, async ({ page }) => {
        const navigationPage = new NavigationPage(page)
        let response: Response | null = null

        // Step 1: Navigate to the target page and capture the server response
        await test.step('Open page', async () => {
            response = await navigationPage.openPage(navPage.url)
        })

        // Step 2: Assert HTTP 200 and no error content in the DOM
        await test.step('Verify page loaded without errors', async () => {
            await navigationPage.expectPageLoaded(response)
        })
    })
}
