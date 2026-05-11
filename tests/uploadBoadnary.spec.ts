import {test} from '@playwright/test'
import { HomePage} from "../page-object/HomePage.page";
import {AllCoursesPage} from '../page-object/AllCoursesPage.page'
import {CoursePage} from '../page-object/CoursePage.page'
import {EnrollmentPage} from '../page-object/enrollment/EnrollmentPage.page'
import {RegistrationPage} from '../page-object/enrollment/RegistrationPage.page'
import {UploadsPage} from '../page-object/enrollment/UploadsPage.page'
import {createNewUser} from '../data/enrollTestData'
import {courseData} from '../data/courseData'
import {generateTestFile, deleteTestFile} from '../helpers/generateTestFile.helper'
import {BASE_URL} from '../data/coursesFilterData'

const MB = 1024 * 1024
const FILES = {
    empty:      'data/test-files/boundary-0bytes.jpg',
    maxAllowed: 'data/test-files/boundary-4mb.jpg',
    overLimit:  'data/test-files/boundary-4-01mb.jpg',
}

test.describe('File upload — boundary values (max 4 MB)', () => {
    test.beforeAll(() => {
        generateTestFile(FILES.empty,      0)
        generateTestFile(FILES.maxAllowed, 4 * MB)
        generateTestFile(FILES.overLimit,  Math.ceil(4.01 * MB))
    })

    test.afterAll(() => {
        Object.values(FILES).forEach(deleteTestFile)
    })

    let uploadsPage: UploadsPage

    test.beforeEach(async ({page}) => {
        test.setTimeout(120000)

        const user = createNewUser()

        const homePage         = new HomePage(page)
        const allCoursesPage   = new AllCoursesPage(page)
        const coursePage       = new CoursePage(page)
        const enrollmentPage   = new EnrollmentPage(page)
        const registrationPage = new RegistrationPage(page)
        uploadsPage            = new UploadsPage(page)

        await homePage.gotoCatalog(BASE_URL)
        await allCoursesPage.openCourse(courseData.id)
        await coursePage.goToBooking()

        await enrollmentPage.expectStepToBeVisible('Registration')
        await registrationPage.fillRegistrationForm(user)
        await registrationPage.submitRegistration()
        await registrationPage.expectSuccessToast()

        await enrollmentPage.clickSidebarStep('Uploads', 'Driver Licence')
    })

    test('0 bytes — upload is rejected', async () => {
        await uploadsPage.uploadFileToDriverLicence(FILES.empty)
        await uploadsPage.expectUploadRejected('File is empty. Please upload a valid file.')
    })

    test('4 MB — upload is accepted', async () => {
        await uploadsPage.uploadFileToDriverLicence(FILES.maxAllowed)
        await uploadsPage.expectUploadSuccess()
    })

    test('4.01 MB — upload is rejected', async () => {
        await uploadsPage.uploadFileToDriverLicence(FILES.overLimit)
        await uploadsPage.expectUploadRejected('File size should be less than 4MB')
    })
})
