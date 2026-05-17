import {faker} from "@faker-js/faker"
import {DayData} from "./interfaces";

export interface NewUser {
    name: string,
    givenName: string,
    lastName: string,
    email: string,
    personalDetailsTitle: string,
    genderOption: string,
    preferredName: string,
    middleName: string,
    dayData: DayData,
    usi:string,
    organisation: string,
    phoneNumber: string,
    position: string,
    emergencyContactName: string,
    emergencyContactRelationship: string,
    stateOption: string,
    countryOption: string,
    buildingName: string,
    flatName: string,
    streetNumber: string,
    streetName: string,
    city: string,
    postcode: string,
    year: string,
    licencePath: string,
    passportPath: string
    countryOfBirthOption: string,
    citizenshipStatus: string,
    nativeLanguage: string,
    englishProficiency: string
    schoolLeveOption: string
    studyReasonOption: string,
    disabilityOption: string,
    indigenousOption: string,
    employmentOption: string
}

export interface ContactFormUrls {
    name:string,
    url:string
}

export interface ExistingUser{
    givenName: string,
    lastName: string,
    email: string,
}
export const existingUser:ExistingUser={
    givenName: 'test',
    lastName: 'test',
    email: 'test@tt.co',
}

// Dynamic data
export function createNewUser(): NewUser {
    return {
        name: faker.person.fullName(),
        givenName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email({provider: 'test.co'}),
        personalDetailsTitle: faker.helpers.arrayElement(['Mr', 'Ms', 'Mrs', 'Other']),
        genderOption: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
        preferredName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        dayData: {
            year: String(faker.number.int({min: 1970, max: 2000})),
            month: String(faker.number.int({min: 1, max: 12})),
            day: String(faker.number.int({min: 1, max: 28})),
        },
        usi: process.env.USI!,
        organisation: faker.company.name(),
        phoneNumber: faker.string.numeric(10),
        position: faker.person.jobTitle(),
        emergencyContactName: faker.person.firstName().slice(0, 2) + ' ' + faker.person.lastName().slice(0, 2),
        emergencyContactRelationship: faker.helpers.arrayElement(['Colleague', 'Friend', 'Parent', 'Sibling']),
        stateOption: faker.helpers.arrayElement(['NSW', 'VIC', 'QLD']),
        countryOption: faker.helpers.arrayElement(['Fiji', 'Australia', 'Palau']),
        buildingName: faker.company.name(),
        flatName: `Unit ${faker.number.int({min: 1, max: 50})}`,
        streetNumber: String(faker.number.int({min: 1, max: 999})),
        streetName: faker.location.street(),
        city: faker.location.city(),
        postcode: faker.string.numeric(4),
        year: String(faker.number.int({min: 2020, max: 2024})),
        licencePath: 'data/test-files/testDriverLicense.jpg',
        passportPath: 'data/test-files/testPassport.jpg',
        countryOfBirthOption: faker.helpers.arrayElement(['Norfolk Island', 'Guam']),
        citizenshipStatus: faker.helpers.arrayElement(['Overseas visitor', 'Temporary resident']),
        nativeLanguage: faker.helpers.arrayElement(['Irish', 'English', 'Letzeburgish']),
        englishProficiency: faker.helpers.arrayElement(['Very well', 'Well', 'Not well', 'Not at all']),
        schoolLeveOption: faker.helpers.arrayElement([
            'Year 12 or equivalent',
            'Year 11 or equivalent',
            'Year 10 or equivalent',
            'Never attended school',
        ]),
        studyReasonOption: faker.helpers.arrayElement([
            'Other reasons',
            'I wanted extra skills for my job'
        ]),
        disabilityOption: faker.helpers.arrayElement(['Yes', 'No']),
        indigenousOption: faker.helpers.arrayElement([
            'No, Neither Aboriginal nor Torres Strait Islander',
            'Yes, Torres Strait Islander'
        ]),
        employmentOption: faker.helpers.arrayElement([
            'Full-time employee',
            'Not Employed - Not Seeking Employment'
        ]),
    }
}

