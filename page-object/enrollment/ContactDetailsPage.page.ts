import {Locator, Page} from '@playwright/test';
import {NewUser} from "../../data/enrollTestData";

/**
 * Page Object Model for the Contact Details step of the enrollment flow.
 * Handles filling in professional information, phone numbers,
 * and emergency contact details.
 */
export class ContactDetailsPage {
    private readonly page: Page
    // Professional info
    private readonly organisation: Locator
    private readonly position: Locator
    // Phone numbers - all share the same placeholder, disambiguated by .first() / .last()
    private readonly mobilePhone: Locator   // First "10-digit number" input on the page
    private readonly homePhone: Locator
    private readonly workPhone: Locator
    // Emergency contact
    private readonly emergencyContactName: Locator
    private readonly emergencyContactRelationship: Locator
    private readonly emergencyPhoneNumber: Locator  // Last "10-digit number" input on the page

    constructor(page: Page) {
        this.page = page
        this.organisation = page.getByPlaceholder('Input your organisation name')
        this.position = page.getByPlaceholder('Input your job position')
        this.mobilePhone = page.getByPlaceholder('10-digit number').first()
        this.homePhone = page.getByPlaceholder('Input your home phone number')
        this.workPhone = page.getByPlaceholder('Input your work phone number')
        this.emergencyContactName = page.getByPlaceholder('e.g. John Smith')
        this.emergencyContactRelationship = page.getByPlaceholder('e.g. Parent')
        this.emergencyPhoneNumber = page.getByPlaceholder('10-digit number').last()
    }

    /**
     * Fills in the entire Contact Details form using the provided user data.
     * The same phone number is reused for mobile, home, work, and emergency fields.
     * @param contactData - Object containing organisation, position, phone number,
     * and emergency contact details.
     */
    async fillContactDetailsForm(contactData: NewUser): Promise<void> {
        await this.organisation.fill(contactData.organisation)
        await this.position.fill(contactData.position)
        await this.mobilePhone.fill(contactData.phoneNumber)
        await this.homePhone.fill(contactData.phoneNumber)
        await this.workPhone.fill(contactData.phoneNumber)
        await this.emergencyContactName.fill(contactData.emergencyContactName)
        await this.emergencyContactRelationship.fill(contactData.emergencyContactRelationship)
        await this.emergencyPhoneNumber.fill(contactData.phoneNumber)
    }
}