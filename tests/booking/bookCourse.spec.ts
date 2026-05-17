import {test} from '@playwright/test';
import {HomePage} from '../../page-object/HomePage.page';
import {AllCoursesPage} from '../../page-object/AllCoursesPage.page';
import {CoursePage} from '../../page-object/CoursePage.page';
// TestData
import {createNewUser} from '../../data/enrollTestData';
// CourseData
import {courseData} from "../../data/courseData";
import {BASE_URL} from '../../data/coursesFilterData'
// Payment
import {payment} from "../../data/paymentDetails";

// Enroll
import {EnrollmentPage} from '../../page-object/enrollment/EnrollmentPage.page';
import {RegistrationPage} from '../../page-object/enrollment/RegistrationPage.page';
import {PersonalDetailsPage} from '../../page-object/enrollment/PersonalDetailsPage.page';
import {ContactDetailsPage} from "../../page-object/enrollment/ContactDetailsPage.page";
import {AddressPage} from "../../page-object/enrollment/AddressPage.page";
import {NationalityPage} from "../../page-object/enrollment/NationalityPage.page";
import {SchoolingPage} from "../../page-object/enrollment/SchoolingPage.page";
import {AdditionalDetailsPage} from "../../page-object/enrollment/AdditionalDetailsPage.page";
import {UploadsPage} from "../../page-object/enrollment/UploadsPage.page";
import {ReviewDetailsPage} from "../../page-object/enrollment/ReviewDetailsPage.page";
import {PaymentPage} from "../../page-object/enrollment/PaymentPage.page";

/**
 * End-to-end test: full course booking flow.
 * Covers navigation - course selection - multi-step enrollment - payment.
 */
test('Book a course', async ({page}) => {
    // Extend timeout to 3 minutes to account for slow network and multi-step form
    test.setTimeout(180000)
    const newUser = createNewUser()
    // Instantiate all page objects used throughout the test
    const homePage = new HomePage(page)
    const allCoursesPage = new AllCoursesPage(page)
    const coursePage = new CoursePage(page)
    const enrollmentPage = new EnrollmentPage(page)
    const registrationPage = new RegistrationPage(page)
    const personalDetailsPage = new PersonalDetailsPage(page)
    const contactDetailPage = new ContactDetailsPage(page)
    const addressPage = new AddressPage(page)
    const nationalityPage = new NationalityPage(page)
    const schoolingPage = new SchoolingPage(page)
    const additionalDetailsPage = new AdditionalDetailsPage(page)
    const uploadsPage = new UploadsPage(page)
    const reviewDetailsPage = new ReviewDetailsPage(page)
    const paymentPage = new PaymentPage(page)

    // Step 1: Open the application and navigate to the course catalog
    await test.step('Navigate to course catalog', async () => {
        await homePage.gotoCatalog(BASE_URL)
    })
    // Step 2: Find the target course by ID and click "Book" to start enrollment
    await test.step('Open course page', async () => {
        await allCoursesPage.openCourse(courseData.id)
        await coursePage.goToBooking()
    })
    // Step 3: Create a new account by filling in and submitting the registration form
    await test.step('Registration', async () => {
        await enrollmentPage.expectStepToBeVisible('Registration')
        await registrationPage.fillRegistrationForm(newUser)
        await registrationPage.submitRegistration()
        await registrationPage.expectSuccessToast()
    })
    // Step 4: Provide personal details
    await test.step('Personal Details', async () => {
        await enrollmentPage.expectStepToBeVisible('Personal Details')
        await personalDetailsPage.fillPersonalDetailsForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 5: Provide contact details
    await test.step('Contact Details', async () => {
        await enrollmentPage.expectStepToBeVisible('Contact Details')
        await contactDetailPage.fillContactDetailsForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 6: Enter the student's residential address
    await test.step('Address', async () => {
        await enrollmentPage.expectStepToBeVisible('Usual Residential Address')
        await addressPage.fillAddressForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 7: Specify citizenship / nationality information
    await test.step('Nationality', async () => {
        await enrollmentPage.expectStepToBeVisible('Citizenship')
        await nationalityPage.fillNationalityForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 8: Fill in secondary education / schooling history
    await test.step('Schooling', async () => {
        await enrollmentPage.expectStepToBeVisible('Secondary Education')
        await schoolingPage.fillSchoolingForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 9: Provide the reason for studying and any additional required information
    await test.step('Additional details', async () => {
        await enrollmentPage.expectStepToBeVisible('Study Reason')
        await additionalDetailsPage.fillAdditionalForm(newUser)
        await enrollmentPage.clickNext()
    })
    // Step 10: Upload identity documents and wait for the Review step to load
    await test.step('Upload', async () => {
        await enrollmentPage.expectStepToBeVisible('Driver Licence')
        await uploadsPage.uploadIdentityDocuments(newUser)
        await enrollmentPage.clickNextAndWaitFor('Review Details')
    })
    // Step 11: Verify all submitted details and confirm any discount has been applied before proceeding
    await test.step('Review Details', async () => {
        await reviewDetailsPage.verifyDetails(courseData, newUser)
        await reviewDetailsPage.verifyDiscountApplied(courseData)
        // await reviewDetailsPage.clickGoToPayment()
    })
    // Step 12: Complete the payment form and submit, take a screenshot to confirm the success page
    await test.step('Payment', async () => {
        await enrollmentPage.expectStepToBeVisible('Complete payment')
        await paymentPage.fillPaymentForm(payment)
        await paymentPage.proceedToPayment()
    })
});