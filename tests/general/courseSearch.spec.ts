import {test} from "@playwright/test";
import {CourseSearchPage} from "../../page-object/CourseSearchPage.page";

// Valid data: correct filter values with expected result counts
// Invalid data: values that should return zero results
import {courseFullDataSearchValidData, courseSearchInValidData, courseSearchValidData} from "../../data/courseSearchData";

import {BASE_URL} from '../../data/coursesFilterData'

/**
 * Suite 1: Empty search — no filters applied.
 * Verifies that clicking "Find a Course" without any input
 * redirects to the search results page with the search panel visible.
 */
test('Empty search redirects to courses with searchMode=true', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Click Find a Course without filters', async () => {
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify redirect and search panel visible', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
    })
})

/**
 * Suite 2: Search by course name only.
 * Verifies that filtering by name narrows results to the expected count.
 */
test('Search by full course name ', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Fill course name and submit', async () => {
        await courseSearchPage.fillCourseName(courseFullDataSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify URL and results count', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(courseFullDataSearchValidData.itemCountFilterByName)
    })
})

test('Search by partial Course name', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Fill course name and submit', async () => {
        await courseSearchPage.fillCourseName(courseSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify URL and results count', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(courseSearchValidData.itemCountFilterByName)
    })
})

/**
 * Suite 3: Search by industry only.
 * Verifies that selecting an industry from the dropdown filters results correctly.
 */
test('Search by industry', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Select industry', async () => {
        await courseSearchPage.selectIndustry(courseSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify URL and results count', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(courseSearchValidData.itemCountFilterByIndustry)
    })
})

/**
 * Suite 4: Search by date range only.
 * Verifies that setting a start and end date filters results to the expected count (1).
 */
test('Search by dates', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Fill start and end date and submit', async () => {
        await courseSearchPage.fillStartDate(courseSearchValidData)
        await courseSearchPage.fillEndDate(courseSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify date params in URL and counter visible', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(1)
    })
})

/**
 * Suite 5: Combined search - all filters applied simultaneously.
 * Verifies that name + industry + date range work together
 * and return the expected combined result count.
 */
test('Combined search (all filters)', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Fill all filters and submit', async () => {
        await courseSearchPage.fillCourseName(courseSearchValidData)
        await courseSearchPage.selectIndustry(courseSearchValidData)
        await courseSearchPage.fillStartDate(courseSearchValidData)
        await courseSearchPage.fillEndDate(courseSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify all params present in URL and results visible', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(courseSearchValidData.itemsCount)
    })
})

/**
 * Suite 6: Zero results state — all filters filled with invalid/non-matching data.
 * Verifies that the UI correctly shows a "nothing found" state
 * instead of an empty list or an error when no courses match the query.
 */
test('Nothing found state ', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(BASE_URL)
    })
    await test.step('Fill all filters with invalid data and submit', async () => {
        await courseSearchPage.fillCourseName(courseSearchInValidData)
        await courseSearchPage.selectIndustry(courseSearchInValidData)
        await courseSearchPage.fillStartDate(courseSearchInValidData)
        await courseSearchPage.fillEndDate(courseSearchInValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Nothing found, correct UI when 0 results', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectNothingFound()
    })
})