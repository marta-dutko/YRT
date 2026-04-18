import {Locator, Page} from '@playwright/test';
import {NewUser} from "../../data/testData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";

export class NationalityPage {
    private readonly page: Page
    private readonly contryOfBirthDropdown: Locator
    private readonly cityOfBirth: Locator
    private readonly citizenshipStatusDropdown: Locator
    private readonly nativeLanguageDropdown: Locator
    private readonly englishProficiencyDropdown: Locator
    // private readonly englishProficiencyDropdown: Locator

    constructor(page: Page) {
        this.page = page
        this.contryOfBirthDropdown = page.locator('button[aria-controls="country-of-birth-menu"]')
        this.cityOfBirth = page.getByPlaceholder('Input city of birth')
        this.citizenshipStatusDropdown = page.locator('button[aria-controls="citizenship-status-menu"]')
        this.nativeLanguageDropdown = page.locator('button[aria-controls="native-language-menu"]')
        this.englishProficiencyDropdown = page.locator('button[aria-controls="english-proficiency-menu"]')

    }

    async fillNationalityForm(nationalityData: NewUser): Promise<void> {
        await selectDropdownOption(this.contryOfBirthDropdown,nationalityData.countryOfBirthOption)
        await this.cityOfBirth.fill(nationalityData.city)
        await selectDropdownOption(this.citizenshipStatusDropdown,nationalityData.citizenshipStatus)
        await selectDropdownOption(this.nativeLanguageDropdown,nationalityData.nativeLanguage)
        await selectDropdownOption(this.englishProficiencyDropdown ,nationalityData.englishProficiency)


    }
}

//=====
// import { expect } from '@playwright/test';
// export class NationalityPage {
//     constructor(page) {
//         this.page = page
//         this.pageHeading = page.getByRole('heading', { name: 'Citizenship', level: 3 })
//         this.contryOfBirthDropdown = page.locator('button', { hasText: 'Select country of birth' })
//         this.loader = page.getByRole('status').filter({ hasText: 'Loading...' })
//         this.contryOfBirthOption = page.getByRole('menuitemradio', { name: 'Kiribati' })
//         this.cityOfBirth = page.getByPlaceholder('Input city of birth')
//         this.citizenshipStatusDropdown = page.locator('button', { hasText: 'Select citizenship status' })
//         this.citizenshipStatusOption = page.getByRole('menuitemradio', { name: 'Overseas visitor' })
//         this.nativeLanguageDropdown = page.locator('button', { hasText: 'Select your native language' })
//         this.nativeLanguageOption = page.getByRole('menuitemradio', { name: 'Irish' })
//         this.englishProficiencyDropdown = page.locator('button', { hasText: 'Select English proficiency' })
//         this.englishProficiencyOption = page.getByRole('menuitemradio', { name: 'Very well' })
//     }
//     async waitForPage() {
//         // спочатку чекаємо поки лоадер зникне
//         await expect(this.loader).toBeHidden({ timeout: 15000 });
//         // чекаємо заголовок — він з'являється одразу при завантаженні степу
//         await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
//     }
//
//     async fillNationalityForm(nationalityData) {
//         await this.waitForPage()
//         await expect(this.contryOfBirthDropdown).toBeVisible(); //
//
//         await this.contryOfBirthDropdown.click()
//         await expect(this.contryOfBirthOption).toBeVisible(); //
//         await this.contryOfBirthOption.click()
//
//         await expect(this.contryOfBirthDropdown).toBeHidden()
//
//         await this.cityOfBirth.fill(nationalityData.city)
//         await this.citizenshipStatusDropdown.click()
//         await expect(this.citizenshipStatusOption).toBeVisible(); //
//         await this.citizenshipStatusOption.click()
//
//         // чекаємо поки меню State закриється і форма стабілізується
//         await expect(this.citizenshipStatusDropdown).toBeHidden()
//         // await expect(citizenshipStatusDropdown).toContainText('selected value')
//
//         await this.nativeLanguageDropdown.click()
//         await expect(this.nativeLanguageOption).toBeVisible(); //
//
//         // чекаємо поки меню State закриється і форма стабілізується
//         await expect(this.nativeLanguageDropdown).toBeHidden()
//         // await expect(nativeLanguageDropdown).toContainText('selected value')
//
//
//         await this.nativeLanguageOption.click()
//         await this.englishProficiencyDropdown.click()
//         await expect(this.englishProficiencyOption).toBeVisible(); //
//         await this.englishProficiencyOption.click()
//
//         await expect(this.englishProficiencyDropdown).toBeHidden()
//         // await expect(englishProficiencyDropdown).toContainText('selected value')
//
//     }
// }