import {test} from '@playwright/test';
import {HomePage} from '../page-object/HomePage.page';
import {AllCoursesPage} from '../page-object/AllCoursesPage.page';
import {CoursePage} from '../page-object/CoursePage.page';
// TestData
import {newUser} from '../data/testData';
// CourseData
import {courseData} from "../data/courseData";
// Payment
import {payment} from "../data/paymentDetails";

// Enroll
import {EnrollmentPage} from '../page-object/enrollment/EnrollmentPage.page';
import {RegistrationPage} from '../page-object/enrollment/RegistrationPage.page';
import {PersonalDetailsPage} from '../page-object/enrollment/PersonalDetailsPage.page';
import {ContactDetailsPage} from "../page-object/enrollment/ContactDetailsPage.page";
import {AddressPage} from "../page-object/enrollment/AddressPage.page";
import {NationalityPage} from "../page-object/enrollment/NationalityPage.page";
import {SchoolingPage} from "../page-object/enrollment/SchoolingPage.page";
import {AditionalDetailsPage} from "../page-object/enrollment/AditionalDetailsPage.page";
import {UploadsPage} from "../page-object/enrollment/UploadsPage.page";
import {ReviewDetailsPage} from "../page-object/enrollment/ReviewDetailsPage.page";
import {PaymentPage} from "../page-object/enrollment/PaymentPage.page";

test('Book a course', async ({page}) => {
    test.setTimeout(180000)

    const homePage = new HomePage(page)
    const allCoursesPage = new AllCoursesPage(page)
    const coursePage = new CoursePage(page)
    const enrollmentPage = new EnrollmentPage(page)
    const registrationPage = new RegistrationPage(page)
    const personalDetailsPage = new PersonalDetailsPage(page)
    const contactDitailPage = new ContactDetailsPage(page)
    const addressPage = new AddressPage(page)
    const nationalityPage = new NationalityPage(page)
    const schoolingPage = new SchoolingPage(page)
    const aditionalDetailsPage = new AditionalDetailsPage(page)
    const uploadsPage = new UploadsPage(page)
    const reviewDetailsPage = new ReviewDetailsPage(page)
    const paymentPage = new PaymentPage(page)

    await test.step('Navigate to course catalog', async () => {
        await homePage.gotoCatalog('https://yrt-app-staging.vercel.app/')
    })

    await test.step('Open course page', async () => {
        await allCoursesPage.openCourse(courseData.id)
        await coursePage.goToBooking()
    })

    await test.step('Registration', async () => {
        await enrollmentPage.expectStepToBeVisible('Registration')
        await registrationPage.fillRegistrationForm(newUser)
        await registrationPage.submitRegistration()
    })
    await test.step('Personal Details', async () => {
        await enrollmentPage.expectStepToBeVisible('Personal Details')
        await personalDetailsPage.fillPersonalDetailsForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Contact Details', async () => {
        await enrollmentPage.expectStepToBeVisible('Contact Details')
        await contactDitailPage.fillContactDetailsForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Address', async () => {
        await enrollmentPage.expectStepToBeVisible('Usual Residential Address')
        await addressPage.fillAddressForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Nationality', async () => {
        await enrollmentPage.expectStepToBeVisible('Citizenship')
        await nationalityPage.fillNationalityForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Schooling', async () => {
        await enrollmentPage.expectStepToBeVisible('Secondary Education')
        await schoolingPage.fillSchoolingForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Additional details', async () => {
        await enrollmentPage.expectStepToBeVisible('Study Reason')
        await aditionalDetailsPage.fillAditionalDetailsForm(newUser)
        await enrollmentPage.clickNext()
    })
    await test.step('Upload', async () => {
        await enrollmentPage.expectStepToBeVisible('Driver Licence')
        await uploadsPage.uploadIdentityDocuments(newUser)
        await enrollmentPage.clickNextAndWaitFor('Review Details')
    })
    await test.step('Review Details', async () => {
        await reviewDetailsPage.verifyDetails(courseData, newUser)
        await reviewDetailsPage.verifyDiscountApplied(courseData)
        await reviewDetailsPage.clickGoToPayment()
    })
    await test.step('Payment', async () => {
        await enrollmentPage.expectStepToBeVisible('Complete payment')
        await paymentPage.fillPaymentForm(payment)
        await paymentPage.proceedToPayment()
        await page.screenshot({path: 'success-page.png'})
    })

});