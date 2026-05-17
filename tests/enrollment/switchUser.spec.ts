import { test } from '@playwright/test';
import {EnrollmentPage} from "../../page-object/enrollment/EnrollmentPage.page";
import {RegistrationPage} from "../../page-object/enrollment/RegistrationPage.page";
import {createNewUser} from "../../data/enrollTestData";
import {courseData} from "../../data/courseData";
import {HomePage} from "../../page-object/HomePage.page";
import {BASE_URL} from '../../data/coursesFilterData'
import {AllCoursesPage} from "../../page-object/AllCoursesPage.page";
import {CoursePage} from "../../page-object/CoursePage.page";

/**
 * Verifies that clicking "Log in as a different user" after a successful registration
 * resets the enrollment flow back to the Registration step.
 *
 * Flow: Home → Course Catalog → Course Page → Booking → Register → Switch user → Registration step
 */
test('Log in as different user resets flow to Registration', async ({page}) => {
    const newUser = createNewUser()
    const homePage = new HomePage(page)
    const allCoursesPage = new AllCoursesPage(page)
    const coursePage = new CoursePage(page)
    const enrollmentPage = new EnrollmentPage(page)
    const registrationPage = new RegistrationPage(page)

    // Step 1: Open the application and navigate to the course catalog
    await test.step('Navigate to course catalog', async () => {
        await homePage.gotoCatalog(BASE_URL)
    })

    // Step 2: Find the target course by ID and click "Book" to start enrollment
    await test.step('Open course page', async () => {
        await allCoursesPage.openCourse(courseData.id)
        await coursePage.goToBooking()
    })

    // Step 3: Register a new user, then switch accounts and verify the flow resets to Registration
    await test.step('Log as a different user returns to Registration step', async () => {
        // Register the new user and confirm the success toast
        await registrationPage.fillRegistrationForm(newUser)
        await registrationPage.submitRegistration()
        await registrationPage.expectSuccessToast()

        // Click "Log in as a different user" and assert the enrollment resets to the Registration step
        await enrollmentPage.clickLogInAsDifferentUser()
        await enrollmentPage.expectStepToBeVisible('Registration')
    })

})