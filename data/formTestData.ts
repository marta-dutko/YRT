import {faker} from "@faker-js/faker";
import {ContactForm, ContactFormUrls} from "./enrollTestData";

export const contactFormData: ContactForm = {
    fullNameField: faker.person.fullName(),
    organisationField: faker.string.alpha(5),
    emailField: faker.internet.email({provider: 'test.co'}),
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