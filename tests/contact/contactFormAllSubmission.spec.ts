import {test} from '@playwright/test';
import {SendMessage} from '../../page-object/SendMessage.page';
import {contactFormData, contactFormUrls} from "../../data/formTestData";

/**
 * Parameterized test suite: Contact form submission.
 * Runs the same scenario for every URL defined in contactFormUrls,
 * so a single broken form on any page is caught independently.
 */
for (const form of contactFormUrls) {

    // Each iteration creates a separate test named after the target URL
    test(`Contact form submission - ${form.url}`, async ({page}) => {
        // Page object that encapsulates all contact form interactions
        const sendMessage = new SendMessage(page);

        // Step 1: Navigate to the page that contains the contact form
        await test.step('Open page', async () => {
            await sendMessage.goTo(form.url);
        });

        // Step 2: Fill in all required fields with test data and submit the form
        await test.step('Fill and submit form', async () => {
            await sendMessage.fillContactUsForm(contactFormData);
            await sendMessage.submitForm();
        });

        // Step 3: Assert that a success message is displayed after submission
        await test.step('Verify success message', async () => {
            await sendMessage.checkSuccessMessage()
        });
    });

}