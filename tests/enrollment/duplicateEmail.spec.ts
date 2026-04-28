import {test} from '@playwright/test';
import {RegistrationPage} from "../../page-object/enrollment/RegistrationPage.page";
import {existingUser} from "../../data/enrollTestData";
import {courseData} from "../../data/courseData";
import {HomePage} from "../../page-object/HomePage.page";
import {AllCoursesPage} from "../../page-object/AllCoursesPage.page";
import {CoursePage} from "../../page-object/CoursePage.page";

/**
 * Verifies that submitting a registration form with an already-registered email
 * triggers a duplicate account warning toast instead of proceeding with enrollment.
 *
 * Flow: Home → Course Catalog → Course Page → Booking → Registration form
 */
test('Existing email shows duplicate toast', async ({page}) => {
    const homePage = new HomePage(page)
    const registrationPage = new RegistrationPage(page)
    const allCoursesPage = new AllCoursesPage(page)
    const coursePage = new CoursePage(page)

    // Step 1: Open the application and navigate to the course catalog
    await test.step('Navigate to course catalog', async () => {
        await homePage.gotoCatalog('https://yrt-app-staging.vercel.app/')
    })

    // Step 2: Find the target course by ID and click "Book" to start enrollment
    await test.step('Open course page', async () => {
        await allCoursesPage.openCourse(courseData.id)
        await coursePage.goToBooking()
    })

    // Step 3: Submit the registration form with an already-registered email and assert the warning toast
    await test.step('set user', async () => {
        await registrationPage.fillRegistrationForm(existingUser) // вже існуючий
        await registrationPage.submitRegistration()
        await registrationPage.expectDuplicateEmailToast()
    })
})