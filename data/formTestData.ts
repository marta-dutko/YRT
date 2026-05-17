import {faker} from "@faker-js/faker";
import {ContactFormUrls} from "./enrollTestData";
import {BASE_URL} from './coursesFilterData'

export interface ContactForm {
    fullNameField: string,
    organisationField: string,
    emailField: string,
    phoneNumberField: string,
    messageField: string
}

export const contactFormData: ContactForm = {
    fullNameField: faker.person.firstName().slice(0, 2) + ' ' + faker.person.lastName().slice(0, 2),
    organisationField: faker.string.alpha(5),
    emailField: faker.internet.email({provider: 'test.co'}),
    phoneNumberField: faker.string.numeric(10),
    messageField: faker.string.alpha(10)
}

// url contact us form
export const contactFormUrls:ContactFormUrls[]=[
    {name:'home-page',                url:`${BASE_URL}/`},
    {name:'course-page',              url:`${BASE_URL}/courses/76602`},
    {name:'for-students-page',        url:`${BASE_URL}/for-students`},
    {name:'for-business-page',        url:`${BASE_URL}/for-business`},
    {name:'training-trailer',         url:`${BASE_URL}/training-trailer`},
    {name:'about-us-page',            url:`${BASE_URL}/about-us`},
    {name:'contact-ua-page',          url:`${BASE_URL}/contact-us`},
    {name:'location-NSW-page',        url:`${BASE_URL}/contact-us/new-south-wales`},
    {name:'location-WA-page',         url:`${BASE_URL}/contact-us/western-australia`},
    {name:'location-VIC-page',        url:`${BASE_URL}/contact-us/victoria`},
    {name:'location-QUE-page',        url:`${BASE_URL}/contact-us/queensland`},
    {name:'resources-page',           url:`${BASE_URL}/resources/unique-student-identifier`},
    {name:'resources-NSW-page',       url:`${BASE_URL}/resources/smart-skilled-nsw`},
    {name:'resources-training-WA-page', url:`${BASE_URL}/resources/construction-training-fund-wa`},
    {name:'resources-jobs-WA-page',   url:`${BASE_URL}/resources/jobs-and-skills-wa`},
]