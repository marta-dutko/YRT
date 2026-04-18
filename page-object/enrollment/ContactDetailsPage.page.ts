// import { Locator, Page } from "@playwright/test"
// import { selectDropdownOption } from '../../helpers/dropdown.helper';
// import { NewUser } from "../../data/testData"



import {expect, Locator, Page} from '@playwright/test';
import {NewUser} from "../../data/testData";
export class ContactDetailsPage {
    private readonly page:Page
    // private readonly pageHeading:Locator
    private readonly organisation:Locator
    private readonly position:Locator
    private readonly mobilePhone:Locator
    private readonly homePhone:Locator
    private readonly workPhone:Locator
    private readonly emergencyContactName:Locator
    private readonly emergencyContactRelationship:Locator
    private readonly emergencyPhoneNumber:Locator


    constructor(page:Page) {
        this.page = page
        // this.pageHeading = page.getByRole('heading', {name: 'Contact Details'})
        this.organisation = page.getByPlaceholder('Input your organisation name')
        this.position = page.getByPlaceholder('Input your job position')
        this.mobilePhone = page.getByPlaceholder('10-digit number').first()
        this.homePhone = page.getByPlaceholder('Input your home phone number')
        this.workPhone = page.getByPlaceholder('Input your work phone number')
        this.emergencyContactName = page.getByPlaceholder('e.g. John Smith')
        this.emergencyContactRelationship = page.getByPlaceholder('e.g. Parent')
        this.emergencyPhoneNumber = page.getByPlaceholder('10-digit number').last()
    }
// async waitForPage() {
//     // чекаємо заголовок — він з'являється одразу при завантаженні степу
//     await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
// }
    async fillContactDetailsForm(contactData:NewUser):Promise<void> {
         // await this.waitForPage()
        await this.organisation.fill(contactData.organisation)
        await this.position.fill(contactData.position)
        await this.mobilePhone.fill(contactData.phoneNumber)
        await this.homePhone.fill(contactData.phoneNumber)
        await this.workPhone.fill(contactData.phoneNumber)
        await this.emergencyContactName.fill(contactData.emergencyContactName)
        await this.emergencyContactRelationship.fill(contactData.emergencyContactRelationship)
        await this.emergencyPhoneNumber.fill(contactData.phoneNumber)
        // await this.page.pause()
    }
}


//===
// import { expect } from '@playwright/test';
// export class ContactDetailsPage {
//     constructor(page) {
//         this.page = page
//         this.pageHeading = page.getByRole('heading', {name: 'Contact Details'})
//         this.organisation = page.getByPlaceholder('Input your organisation name')
//         this.position = page.getByPlaceholder('Input your job position')
//         this.mobilePhone = page.getByPlaceholder('10-digit number').first()
//         this.homePhone = page.getByPlaceholder('Input your home phone number')
//         this.workPhone = page.getByPlaceholder('Input your work phone number')
//         this.emergencyContactName = page.getByPlaceholder('e.g. John Smith')
//         this.emergencyContactRelationship = page.getByPlaceholder('e.g. Parent')
//         this.emergencyPhoneNumber = page.getByPlaceholder('10-digit number').last()
//     }
//     async waitForPage() {
//         // чекаємо заголовок — він з'являється одразу при завантаженні степу
//         await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
//     }
//     async fillContactDetailsForm(contactData){
//         await this.waitForPage()
//         await this.organisation.fill(contactData.organisation)
//         await this.position.fill(contactData.position)
//         await this.mobilePhone.fill(contactData.phoneNumber)
//         await this.homePhone.fill(contactData.phoneNumber)
//         await this.workPhone.fill(contactData.phoneNumber)
//         await this.emergencyContactName.fill(contactData.emergencyContactName)
//         await this.emergencyContactRelationship.fill(contactData.emergencyContactRelationship)
//         await this.emergencyPhoneNumber.fill(contactData.phoneNumber)
//         // await this.page.pause()
//     }
// }