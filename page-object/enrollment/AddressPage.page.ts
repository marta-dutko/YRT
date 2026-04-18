import {expect, Locator, Page} from "@playwright/test"
import {NewUser} from "../../data/testData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
export class AddressPage {
  private readonly page:Page
  // private readonly pageHeading:Locator
  private readonly buildingName:Locator
  private readonly flatDetails:Locator
  private readonly streetNumber:Locator
  private readonly streetName:Locator
  private readonly suburbName:Locator
  private readonly postcode:Locator
  private readonly stateDropdown:Locator
  // private readonly stateOption:Locator
  private readonly countryDropdown:Locator
  // private readonly countryOptionOther:Locator
  constructor(page:Page) {
    this.page = page
    // this.pageHeading = page.getByRole('heading', { name: 'Address' })
    this.buildingName = page.getByPlaceholder('Input building/property name')
    this.flatDetails = page.getByPlaceholder('Input flat/unit details')
    this.streetNumber = page.getByPlaceholder('Input street or lot number')
    this.streetName = page.getByPlaceholder('Input street name')
    this.suburbName = page.getByPlaceholder('e.g. Sydney')
    this.postcode = page.getByPlaceholder('e.g. 2000')
    // Dropdown
    this.stateDropdown = page.locator('button[aria-controls="residential-state-menu"]')
    this.countryDropdown = page.locator('button[aria-controls="residential-country-menu"]')
    // this.countryOptionOther = page.getByRole('menuitemradio', { name: 'Guam' })
  }
  //
  // async waitForPage() {
  //   // чекаємо заголовок — він з'являється одразу при завантаженні степу
  //   await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
  // }

  async fillAddressForm(addressData:NewUser):Promise<void> {
    // await this.waitForPage()
    // await expect(this.buildName).toBeVisible(); //

    await this.buildingName.fill(addressData.buildingName)
    await this.flatDetails.fill(addressData.flatName)
    await this.streetNumber.fill(addressData.streetNumber)
    await this.streetName.fill(addressData.streetName)
    await this.suburbName.fill(addressData.city)
    await this.postcode.fill(addressData.postcode)
    //
    // await this.stateDropdown.click()
    // await expect(this.stateOption).toBeVisible();
    // await this.stateOption.click()
    // await this.countryDropdown.click()

    await selectDropdownOption(this.stateDropdown,addressData.stateOption)
    await selectDropdownOption(this.countryDropdown,addressData.contryOption)


    // // чекаємо поки меню State закриється і форма стабілізується
    // await expect(this.countryDropdown).toBeHidden()
    //
    // await expect(this.countryOptionOther).toBeVisible(); //
    // await this.countryOptionOther.click()
    // await this.page.pause()
  }
}


//=====
// import { expect } from "@playwright/test"
// export class AdressPage {
//   constructor(page) {
//     this.page = page
//     this.pageHeading = page.getByRole('heading', { name: 'Address' })
//     this.buildName = page.getByPlaceholder('Input building/property name')
//     this.flatDetails = page.getByPlaceholder('Input flat/unit details')
//     this.streetNumber = page.getByPlaceholder('Input street or lot number')
//     this.streetName = page.getByPlaceholder('Input street name')
//     this.suburbName = page.getByPlaceholder('e.g. Sydney')
//     this.postcode = page.getByPlaceholder('e.g. 2000')
//     // Dropdown
//     this.stateDropdown = page.locator('button', { hasText: 'Select state/territory' })
//     this.stateOption = page.getByRole('menuitemradio', { name: 'NSW' })
//     this.countryDropdown = page.locator('button', { hasText: 'Select country' })
//     this.countryOptionOther = page.getByRole('menuitemradio', { name: 'Guam' })
//   }
//   async waitForPage() {
//     // чекаємо заголовок — він з'являється одразу при завантаженні степу
//     await expect(this.pageHeading).toBeVisible({ timeout: 15000 });
//   }
//
//   async fillAdressForm(adressData) {
//     await this.waitForPage()
//     await expect(this.buildName).toBeVisible(); //
//
//     await this.buildName.fill(adressData.buildName)
//     await this.flatDetails.fill(adressData.flatName)
//     await this.streetNumber.fill(adressData.streetNumber)
//     await this.streetName.fill(adressData.streetName)
//     await this.suburbName.fill(adressData.city)
//     await this.postcode.fill(adressData.postcode)
//     await this.stateDropdown.click()
//     await expect(this.stateOption).toBeVisible(); //
//     await this.stateOption.click()
//     await this.countryDropdown.click()
//
//     // чекаємо поки меню State закриється і форма стабілізується
//     await expect(this.countryDropdown).toBeHidden()
//
//     await expect(this.countryOptionOther).toBeVisible(); //
//     await this.countryOptionOther.click()
//     // await this.page.pause()
//   }
// }