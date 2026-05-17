import {Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
import {BasePage} from '../BasePage.page'

/**
 * Page Object Model for the Schooling step of the enrollment flow.
 * Handles selection of the user's highest completed school education level.
 */
export class SchoolingPage extends BasePage {
    private readonly schoolLevelDropdown: Locator // Dropdown for selecting the highest school level completed

    constructor(page: Page) {
        super(page)
        this.schoolLevelDropdown = page.locator('button[aria-controls="school-level-menu"]')
    }

    /**
     * Selects the school education level from the dropdown using the provided user data.
     * @param schoolingData - Object containing the school level option to select.
     */
    async fillSchoolingForm(schoolingData: NewUser): Promise<void> {
        await selectDropdownOption(this.schoolLevelDropdown, schoolingData.schoolLeveOption)
    }
}