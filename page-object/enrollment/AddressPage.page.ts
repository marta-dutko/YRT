import { Locator, Page} from "@playwright/test"
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
export class AddressPage {
  private readonly page:Page
  private readonly buildingName:Locator
  private readonly flatDetails:Locator
  private readonly streetNumber:Locator
  private readonly streetName:Locator
  private readonly suburbName:Locator
  private readonly postcode:Locator
  private readonly stateDropdown:Locator
  private readonly countryDropdown:Locator
  constructor(page:Page) {
    this.page = page
    this.buildingName = page.getByPlaceholder('Input building/property name')
    this.flatDetails = page.getByPlaceholder('Input flat/unit details')
    this.streetNumber = page.getByPlaceholder('Input street or lot number')
    this.streetName = page.getByPlaceholder('Input street name')
    this.suburbName = page.getByPlaceholder('e.g. Sydney')
    this.postcode = page.getByPlaceholder('e.g. 2000')
    // Dropdown
    this.stateDropdown = page.locator('button[aria-controls="residential-state-menu"]')
    this.countryDropdown = page.locator('button[aria-controls="residential-country-menu"]')
  }

  async fillAddressForm(addressData:NewUser):Promise<void> {
    await this.buildingName.fill(addressData.buildingName)
    await this.flatDetails.fill(addressData.flatName)
    await this.streetNumber.fill(addressData.streetNumber)
    await this.streetName.fill(addressData.streetName)
    await this.suburbName.fill(addressData.city)
    await this.postcode.fill(addressData.postcode)
    await selectDropdownOption(this.stateDropdown,addressData.stateOption)
    await selectDropdownOption(this.countryDropdown,addressData.countryOption)
  }
}