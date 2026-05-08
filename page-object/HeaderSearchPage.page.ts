import { Locator, Page, expect } from '@playwright/test'
import { BasePage } from './BasePage.page'

/**
 * Page Object Model for the global header search (typeahead).
 * Covers the "Open search" toggle, query input, and suggestion dropdown.
 * This component is present on all pages, so it lives in its own POM
 * rather than inside any page-specific class.
 */
export class HeaderSearchPage extends BasePage {
    private readonly openSearchBtn: Locator  // button[aria-label="Open search"] in the header
    private readonly searchInput: Locator    // input[placeholder="Search"] revealed after toggle
    private readonly suggestions: Locator    // suggestion <a> items: a.rounded-lg[href^="/courses/"]

    constructor(page: Page) {
        super(page)
        this.openSearchBtn = page.getByRole('button', { name: 'Open search' })
        this.searchInput   = page.getByPlaceholder('Search')
        this.suggestions   = page.locator('a.rounded-lg[href^="/courses/"]')
    }

    /**
     * Clicks the search toggle and waits for the input to become visible.
     */
    async openSearch(): Promise<void> {
        await this.openSearchBtn.click()
        await expect(this.searchInput).toBeVisible()
    }

    /**
     * Types a query into the search input and waits for the debounce to fire.
     * @param query - The search string to type.
     */
    async typeQuery(query: string): Promise<void> {
        await this.searchInput.fill(query)
        await this.page.waitForTimeout(400)
    }

    /**
     * Asserts that at least one suggestion is visible in the dropdown.
     */
    async assertSuggestionsVisible(): Promise<void> {
        await expect(this.suggestions.first()).toBeVisible({ timeout: 5000 })
    }

    /**
     * Asserts that the first suggestion in the dropdown contains the expected text.
     * Used for exact-match scenarios where the top result must be a specific course.
     * @param text - Expected substring in the first suggestion.
     */
    async assertFirstSuggestionContains(text: string): Promise<void> {
        await expect(this.suggestions.first()).toContainText(text, { ignoreCase: true })
    }

    /**
     * Asserts that at least one suggestion in the dropdown contains the expected text.
     * Used for multi-result scenarios where the relevant course can be anywhere in the list.
     * @param text - Expected substring present in any suggestion.
     */
    async assertAnySuggestionContains(text: string): Promise<void> {
        await expect(
            this.suggestions.filter({ hasText: new RegExp(text, 'i') }).first()
        ).toBeVisible({ timeout: 5000 })
    }
}
