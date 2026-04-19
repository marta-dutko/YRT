import {test} from "@playwright/test";
import {CourseSearchPage} from "../page-object/CourseSearchPage.page";
import {courseSearchInValidData, courseSearchValidData} from "../data/courseSearchData";

const baseUrl: string = 'https://yrt-app-staging.vercel.app/'
//  Suite 1: Empty search from homepage
test('Empty search redirects to courses with searchMode=true', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(baseUrl)
    })
    await test.step('Click Find a Course without filters', async () => {
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify redirect and search panel visible', async () => {
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
    })
})

// Suite 2: Search by course name
test('Search by course name ', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(baseUrl)
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

// Suite 3: Search by industry
    test('Search by industry', async ({page})=>{
        const courseSearchPage = new CourseSearchPage(page)
        await test.step('Navigate to homepage', async () => {
            await courseSearchPage.goTo(baseUrl)
        })
        await test.step('Select industry',async ()=>{
            await courseSearchPage.selectIndustry(courseSearchValidData)
            await courseSearchPage.clickFindACourse()
        })
        await test.step('Verify URL and results count', async () => {
            await courseSearchPage.expectToBeOnSearchResultsPage()
            await courseSearchPage.expectSearchPanelVisible()
            await courseSearchPage.expectItemsCount(courseSearchValidData.itemCountFilterByIndustry)
        })
    })

// Suite 4: Search by dates
    test('Search by dates', async ({page})=>{
        const courseSearchPage = new CourseSearchPage(page)
        await test.step('Navigate to homepage', async () => {
            await courseSearchPage.goTo(baseUrl)
        })
        await test.step('Fill start and end date and submit', async ()=>{
            await courseSearchPage.fillStartDate(courseSearchValidData)
            await courseSearchPage.fillEndDate(courseSearchValidData)
            await courseSearchPage.clickFindACourse()
        })
        await test.step('Verify date params in URL and counter visible', async ()=>{
            await courseSearchPage.expectToBeOnSearchResultsPage()
            await courseSearchPage.expectSearchPanelVisible()
            await courseSearchPage.expectItemsCount(1)
        })
    })

// Suite 5: Combined search (all filters)
test('Combined search (all filters)', async ({page})=>{
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(baseUrl)
    })
    await  test.step('Fill all filters and submit', async ()=>{
        await courseSearchPage.fillCourseName(courseSearchValidData)
        await courseSearchPage.selectIndustry(courseSearchValidData)
        await courseSearchPage.fillStartDate(courseSearchValidData)
        await courseSearchPage.fillEndDate(courseSearchValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Verify all params present in URL and results visible', async ()=>{
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectItemsCount(courseSearchValidData.itemsCount)
    })
})
// Suite 7: Nothing found state via URL
test('Nothing found state ', async ({page}) => {
    const courseSearchPage = new CourseSearchPage(page)
    await test.step('Navigate to homepage', async () => {
        await courseSearchPage.goTo(baseUrl)
    })
    await test.step('Fill all filters with invalid data and submit', async ()=>{
        await courseSearchPage.fillCourseName(courseSearchInValidData)
        await courseSearchPage.selectIndustry(courseSearchInValidData)
        await courseSearchPage.fillStartDate(courseSearchInValidData)
        await courseSearchPage.fillEndDate(courseSearchInValidData)
        await courseSearchPage.clickFindACourse()
    })
    await test.step('Nothing found, correct UI when 0 results', async ()=>{
        await courseSearchPage.expectToBeOnSearchResultsPage()
        await courseSearchPage.expectSearchPanelVisible()
        await courseSearchPage.expectNothingFound()
    })
})