import {Locator, Page} from '@playwright/test';
import {selectDropdownOption} from "../../helpers/dropdown.helper";
import {NewUser} from "../../data/enrollTestData";
import {BasePage} from '../BasePage.page'

/**
 * Page Object Model for the Additional Details step of the enrollment flow.
 * Handles selection of supplementary demographic and employment information
 * required for enrollment compliance.
 */
export class AdditionalDetailsPage extends BasePage {
    private readonly studyReasonDropdown: Locator   // Dropdown for selecting the reason for studying
    private readonly disabilityDropdown: Locator    // Dropdown for disclosing any disability status
    private readonly indigenousDropdown: Locator    // Dropdown for selecting indigenous identity status
    private readonly employmentDropdown: Locator    // Dropdown for selecting current employment status

    constructor(page: Page) {
        super(page)
        this.studyReasonDropdown = page.locator('button[aria-controls="study-reason-menu"]')
        this.disabilityDropdown = page.locator('button[aria-controls="disability-menu"]')
        this.indigenousDropdown = page.locator('button[aria-controls="indigenous-menu"]')
        this.employmentDropdown = page.locator('button[aria-controls="employment-menu"]')
    }

    /**
     * Fills in the Additional Details form by selecting all dropdown options
     * using the provided user data.
     * @param data - Object containing study reason, disability, indigenous,
     * and employment status options.
     */
    async fillAdditionalForm(data: NewUser): Promise<void> {
        await selectDropdownOption(this.studyReasonDropdown, data.studyReasonOption)
        await selectDropdownOption(this.disabilityDropdown, data.disabilityOption)
        await selectDropdownOption(this.indigenousDropdown, data.indigenousOption)
        await selectDropdownOption(this.employmentDropdown, data.employmentOption)
    }
}
