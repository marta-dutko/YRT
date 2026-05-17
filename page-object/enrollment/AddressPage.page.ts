import {Locator, Page} from "@playwright/test"
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
import {BasePage} from '../BasePage.page'

/**
 * Page Object Model for the Address step of the enrollment flow.
 * Handles filling in the user's residential address, including
 * state and country selection via dropdowns.
 */
export class AddressPage extends BasePage {
    // Address text fields
    private readonly buildingName: Locator
    private readonly flatDetails: Locator
    private readonly streetNumber: Locator
    private readonly streetName: Locator
    private readonly suburbName: Locator
    private readonly postcode: Locator
    // Address dropdowns
    private readonly stateDropdown: Locator    // Dropdown trigger for selecting the residential state
    private readonly countryDropdown: Locator  // Dropdown trigger for selecting the residential country

    constructor(page: Page) {
        super(page)
        this.buildingName = page.getByPlaceholder('Input building/property name')
        this.flatDetails = page.getByPlaceholder('Input flat/unit details')
        this.streetNumber = page.getByPlaceholder('Input street or lot number')
        this.streetName = page.getByPlaceholder('Input street name')
        this.suburbName = page.getByPlaceholder('e.g. Sydney')
        this.postcode = page.getByPlaceholder('e.g. 2000')
        this.stateDropdown = page.locator('button[aria-controls="residential-state-menu"]')
        this.countryDropdown = page.locator('button[aria-controls="residential-country-menu"]')
    }

    /**
     * Fills in the entire Address form using the provided user data.
     * Text fields are filled directly; state and country are selected via dropdown helper.
     * @param addressData - Object containing all residential address fields.
     */
    async fillAddressForm(addressData: NewUser): Promise<void> {
        await this.buildingName.fill(addressData.buildingName)
        await this.flatDetails.fill(addressData.flatName)
        await this.streetNumber.fill(addressData.streetNumber)
        await this.streetName.fill(addressData.streetName)
        await this.suburbName.fill(addressData.city)
        await this.postcode.fill(addressData.postcode)
        await selectDropdownOption(this.stateDropdown, addressData.stateOption)
        await selectDropdownOption(this.countryDropdown, addressData.countryOption)
    }
}