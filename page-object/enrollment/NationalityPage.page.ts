import {Locator, Page} from '@playwright/test';
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";

export class NationalityPage {
    private readonly page: Page
    private readonly contryOfBirthDropdown: Locator
    private readonly cityOfBirth: Locator
    private readonly citizenshipStatusDropdown: Locator
    private readonly nativeLanguageDropdown: Locator
    private readonly englishProficiencyDropdown: Locator

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