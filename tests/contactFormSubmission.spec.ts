import {test} from '@playwright/test';
import {SendMessage} from '../page-object/SendMessage.page';
import {contactFormData} from "../data/formTestData";
import {HomePage} from "../page-object/HomePage.page";

test('Form submission', async ({page}) => {
    const homePage = new HomePage(page)
    const sendMessage = new SendMessage(page)

    await test.step('Send Contact form.', async () => {
        await homePage.goToHomePage('https://yrt-app-staging.vercel.app/')
        await sendMessage.fillContactUsForm(contactFormData)
        await sendMessage.submitForm()
    })
    await test.step('Verify success message', async () => {
        await sendMessage.checkSuccessMessage()
    });
});

