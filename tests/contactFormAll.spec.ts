import {test} from '@playwright/test';
import {SendMessage} from '../page-object/SendMessage.page';
import {contactFormData, contactFormUrls} from "../data/testData";

for (const form of contactFormUrls) {

    test(`Contact form submission - ${form.url}`, async ({page}) => {
        const sendMessage = new SendMessage(page);

        await test.step('Open page', async () => {
            await page.goto(form.url);
        });

        await test.step('Fill and submit form', async () => {
            await sendMessage.fillContactUsForm(contactFormData);
            await sendMessage.submitForm();
            await page.pause()
        });

        await test.step('Verify success message', async () => {
            await sendMessage.checkSuccessMessage()
        });
    });

}