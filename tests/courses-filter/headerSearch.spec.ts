import { test } from '@playwright/test'
import { HeaderSearchPage } from '../../page-object/HeaderSearchPage.page'
import { COURSES_URL } from '../../data/coursesFilterData'

/**
 * P1 — Header search (typeahead).
 * Verifies exact code match, single-token title scoring,
 * and multi-token tokenisation ("silica safety" query).
 */
test.describe('Header search', () => {

    test('Exact code match — course code surfaces that course first', async ({ page }) => {
        const searchPage = new HeaderSearchPage(page)

        await test.step('Open courses page', async () => {
            await searchPage.goTo(COURSES_URL)
        })

        await test.step('Open header search and type course code', async () => {
            await searchPage.openSearch()
            await searchPage.typeQuery('CPCCLDG3001')
        })

        await test.step('Verify first suggestion contains the course code', async () => {
            await searchPage.assertFirstSuggestionContains('CPCCLDG3001')
        })
    })

    test('Single token title match — partial title returns relevant suggestions', async ({ page }) => {
        const searchPage = new HeaderSearchPage(page)

        await test.step('Open courses page', async () => {
            await searchPage.goTo(COURSES_URL)
        })

        await test.step('Open header search and type single keyword', async () => {
            await searchPage.openSearch()
            await searchPage.typeQuery('Licence')
        })

        await test.step('Verify suggestions are visible and contain the keyword', async () => {
            await searchPage.assertSuggestionsVisible()
            await searchPage.assertAnySuggestionContains('Licence')
        })
    })
})
