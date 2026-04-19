import {test} from '@playwright/test';
import {SendMessage} from '../page-object/SendMessage.page';
import {contactFormData} from "../data/formTestData";
import {HomePage} from "../page-object/HomePage.page";

/**
 * E2E test: Contact form submission on the home page.
 * Verifies that a user can open the site, fill in the contact form,
 * submit it, and see a success confirmation message.
 */
test('Form submission', async ({page}) => {
    // Page objects encapsulating home page navigation and contact form interactions
    const homePage = new HomePage(page)
    const sendMessage = new SendMessage(page)

    // Step 1: Navigate to the home page, fill in the contact form, and submit it
    await test.step('Send Contact form.', async () => {
        await homePage.goToHomePage('https://yrt-app-staging.vercel.app/')
        await sendMessage.fillContactUsForm(contactFormData)
        await sendMessage.submitForm()
    })

    // Step 2: Assert that a success message is displayed after form submission
    await test.step('Verify success message', async () => {
        await sendMessage.checkSuccessMessage()
    });
});

