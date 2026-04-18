import { Locator, Page } from "@playwright/test"
import { NewUser } from "../../data/testData"


export class RegistrationPage {
  private readonly page:Page
  private readonly givenName: Locator
  private readonly lastName: Locator
  private readonly email: Locator
  private readonly registerBtn: Locator

    constructor(page:Page) {
        this.page = page
        this.givenName = page.getByRole('textbox', { name: 'Given name' })
        this.lastName = page.getByRole('textbox', { name: 'Last name' })
        this.email = page.getByRole('textbox', { name: 'Email' })
        this.registerBtn = page.getByRole('button', { name: 'Register' })
    }

    async fillRegistrationForm(userData: NewUser):Promise<void> {
        await this.givenName.fill(userData.givenName)
        await this.lastName.fill(userData.lastName)
        await this.email.fill(userData.email)
    }
    async submitRegistration():Promise<void> {
        await this.registerBtn.click()
        // await this.page.pause()
    }
}


// ===========
// export class RegistrationPage {
//     constructor(page) {
//         this.page = page
//         this.givenName = page.getByRole('textbox', { name: 'Given name' })
//         this.lastName = page.getByRole('textbox', { name: 'Last name' })
//         this.email = page.getByRole('textbox', { name: 'Email' })
//         this.registerBtn = page.getByRole('button', { name: 'Register' })
//     }
//     async fillRegistrationForm(userData) {
//         await this.givenName.fill(userData.givenName)
//         await this.lastName.fill(userData.lastName)
//         await this.email.fill(userData.email)
//     }
//     async submitRegistration() {
//         await this.registerBtn.click()
//     }
// }