import {faker} from "@faker-js/faker"

export interface DayData {
    year: string,
    month: string,
    day: string
}

// For forms object
export interface ContactForm {
    fullNameField: string,
    organisationField: string,
    emailField: string,
    phoneNumberField: string,
    messageField: string
}

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
    // usi: string,
    organisation: string,
    phoneNumber: string,
    position: string,
    emergencyContactName: string,
    emergencyContactRelationship: string,
    stateOption: string,
    contryOption: string,
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

export interface ContactFormUrls{
    name:string,
    url:string
}

// Dynamic data
export const newUser: NewUser = {
    name: faker.person.fullName(),
    // Registration
    givenName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({provider: 'test.co'}),
    // Personal details
    personalDetailsTitle: faker.helpers.arrayElement(['Mr', 'Ms', 'Mrs', 'Other']),
    genderOption: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
    preferredName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    dayData: {
        year: String(faker.number.int({min: 1970, max: 2000})),
        month: String(faker.number.int({min: 1, max: 12})),
        day: String(faker.number.int({min: 1, max: 28})),
    },
    // ========!!!!!!
    // usi:process.env.USI!,
    // ============!!!!!!!!
    // Contact Details
    organisation: faker.company.name(),
    phoneNumber: faker.string.numeric(10),
    position: faker.person.jobTitle(),
    emergencyContactName: faker.person.fullName(),
    emergencyContactRelationship: faker.helpers.arrayElement(['Colleague', 'Friend', 'Parent', 'Sibling']),
    // Address
    stateOption: faker.helpers.arrayElement(['NSW', 'VIC', 'QLD']),
    contryOption: faker.helpers.arrayElement(['Fiji', 'Australia', 'Palau']),
    buildingName: faker.company.name(),
    flatName: `Unit ${faker.number.int({min: 1, max: 50})}`,
    streetNumber: String(faker.number.int({min: 1, max: 999})),
    streetName: faker.location.street(),
    city: faker.location.city(),
    postcode: faker.string.numeric(4),
    year: String(faker.number.int({min: 2020, max: 2024})),
    licencePath: 'data/test-files/testDriverLicense.jpg',
    passportPath: 'data/test-files/testPassport.jpg',
    // Nationality
    countryOfBirthOption: faker.helpers.arrayElement(['Norfolk Island', 'Guam']),
    citizenshipStatus: faker.helpers.arrayElement(['Overseas visitor', 'Temporary resident']),
    nativeLanguage: faker.helpers.arrayElement(['Irish', 'English', 'Letzeburgish']),
    // Schooling
    englishProficiency: faker.helpers.arrayElement(['Very well', 'Well', 'Not well', 'Not at all']),
    schoolLeveOption: faker.helpers.arrayElement([
        'Year 12 or equivalent',
        'Year 11 or equivalent',
        'Year 10 or equivalent',
        'Never attended school',
    ]),
    // Additional details
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

// For forms object
export const contactFormData: ContactForm = {
    fullNameField: faker.person.fullName(),
    organisationField: faker.string.alpha(5),
    // Need change email
    emailField: 'marta.dutko@techmagic.co',
    // =====!!!!!!!!!!
    phoneNumberField: faker.string.numeric(10),
    messageField: faker.string.alpha(10)
}

// url contact us form
export const contactFormUrls:ContactFormUrls[]=[
    {name:'home-page', url:'https://yrt-app-staging.vercel.app/'},
    {name:'course-page', url:'https://yrt-app-staging.vercel.app/courses/76602'},
    {name:'for-students-page', url:'https://yrt-app-staging.vercel.app/for-students'},
    {name:'for-business-page', url:'https://yrt-app-staging.vercel.app/for-business'},
    {name:'training-trailer', url:'https://yrt-app-staging.vercel.app/training-trailer'},
    {name:'about-us-page', url:'https://yrt-app-staging.vercel.app/about-us'},
    {name:'contact-ua-page', url:'https://yrt-app-staging.vercel.app/contact-us'},
    {name:'location-NSW-page', url:'https://yrt-app-staging.vercel.app/contact-us/new-south-wales'},
    {name:'location-WA-page', url:'https://yrt-app-staging.vercel.app/contact-us/western-australia'},
    {name:'location-VIC-page', url:'https://yrt-app-staging.vercel.app/contact-us/victoria'},
    {name:'location-QUE-page', url:'https://yrt-app-staging.vercel.app/contact-us/queensland'},
    {name:'resources-page', url:'https://yrt-app-staging.vercel.app/resources/unique-student-identifier'},
    {name:'resources-NSW-page', url:'https://yrt-app-staging.vercel.app/resources/smart-skilled-nsw'},
    {name:'resources-training-WA-page', url:'https://yrt-app-staging.vercel.app/resources/construction-training-fund-wa'},
    {name:'resources-jobs-WA-page', url:'https://yrt-app-staging.vercel.app/resources/jobs-and-skills-wa'},
]

// // Data for all Contacts form
// export const contactForms: ContactForm[] = [
//     {
//         fullNameField: faker.person.fullName(),
//         organisationField: faker.company.name(),
//         // Need change email
//         emailField: 'marta.dutko@techmagic.co',
//         // =====!!!!!!!!!!
//         phoneNumberField: faker.string.numeric(10),
//         messageField: faker.string.alpha(10)
//     }
// ]


