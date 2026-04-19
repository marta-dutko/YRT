import {Locator, Page} from "@playwright/test";
import {NewUser} from "../../data/enrollTestData";
import {selectDropdownOption} from "../../helpers/dropdown.helper";
export class SchoolingPage {
    private readonly page:Page
    private readonly schoolLeveDropdown:Locator

    constructor(page:Page) {
        this.page = page
        this.schoolLeveDropdown = page.locator('button[aria-controls="school-level-menu"]')
    }
    async fillSchoolingForm(schoolingData:NewUser):Promise<void> {
    await selectDropdownOption(this.schoolLeveDropdown,schoolingData.schoolLeveOption )
    }
}