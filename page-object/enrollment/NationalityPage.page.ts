import {Locator, Page} from '@playwright/test';
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";

/**
 * Page Object Model for the Nationality step of the enrollment flow.
 * Handles filling in the user's country of birth, city of birth,
 * citizenship status, native language, and English proficiency.
 */
export class NationalityPage {
    private readonly page: Page
    private readonly countryOfBirthDropdown: Locator       // Dropdown for selecting country of birth
    private readonly cityOfBirth: Locator
    private readonly citizenshipStatusDropdown: Locator    // Dropdown for selecting citizenship/visa status
    private readonly nativeLanguageDropdown: Locator       // Dropdown for selecting first/native language
    private readonly englishProficiencyDropdown: Locator   // Dropdown for selecting English proficiency level

    constructor(page: Page) {
        this.page = page
        this.countryOfBirthDropdown = page.locator('button[aria-controls="country-of-birth-menu"]')
        this.cityOfBirth = page.getByPlaceholder('Input city of birth')
        this.citizenshipStatusDropdown = page.locator('button[aria-controls="citizenship-status-menu"]')
        this.nativeLanguageDropdown = page.locator('button[aria-controls="native-language-menu"]')
        this.englishProficiencyDropdown = page.locator('button[aria-controls="english-proficiency-menu"]')
    }

    /**
     * Fills in the entire Nationality form using the provided user data.
     * All dropdown fields are selected via the shared dropdown helper.
     * @param nationalityData - Object containing country of birth, city, citizenship status,
     * native language, and English proficiency values.
     */
    async fillNationalityForm(nationalityData: NewUser): Promise<void> {
        await selectDropdownOption(this.countryOfBirthDropdown, nationalityData.countryOfBirthOption)
        await this.cityOfBirth.fill(nationalityData.city)
        await selectDropdownOption(this.citizenshipStatusDropdown, nationalityData.citizenshipStatus)
        await selectDropdownOption(this.nativeLanguageDropdown, nationalityData.nativeLanguage)
        await selectDropdownOption(this.englishProficiencyDropdown, nationalityData.englishProficiency)
    }
}