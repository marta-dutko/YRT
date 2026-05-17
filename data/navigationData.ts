import {BASE_URL} from './coursesFilterData'

export interface NavPage {
    name: string  // Human-readable label used in the test name
    url: string   // Full URL of the page to verify
}

// All public-facing pages verified in the navigation smoke test
export const navigationPages: NavPage[] = [
    { name: 'Home',                        url: `${BASE_URL}/` },
    { name: 'Courses',                     url: `${BASE_URL}/courses` },
    { name: 'Courses - industry filter',   url: `${BASE_URL}/courses?industry=construction` },
    { name: 'Course page',                 url: `${BASE_URL}/courses/72488` },
    { name: 'Courses - search mode',       url: `${BASE_URL}/courses?searchMode=true` },
    { name: 'For Students',                url: `${BASE_URL}/for-students` },
    { name: 'USI resource',                url: `${BASE_URL}/resources/unique-student-identifier` },
    { name: 'Student Handbook',            url: `${BASE_URL}/student-handbook` },
    { name: 'For Business',                url: `${BASE_URL}/for-business` },
    { name: 'For Business - clients',      url: `${BASE_URL}/for-business#clients` },
    { name: 'For Business - bespoke',      url: `${BASE_URL}/for-business#bespoke-training` },
    { name: 'For Business - traineeships', url: `${BASE_URL}/for-business#industry-traineeships` },
    { name: 'Training Trailer',            url: `${BASE_URL}/training-trailer` },
    { name: 'About Us',                    url: `${BASE_URL}/about-us` },
    { name: 'Good Reads',                  url: `${BASE_URL}/good-reads` },
    { name: 'Good Reads - article',        url: `${BASE_URL}/good-reads/licence-to-operate-a-forklift-truck-more-text` },
    { name: 'Contact Us',                  url: `${BASE_URL}/contact-us` },
    { name: 'Contact - NSW',               url: `${BASE_URL}/contact-us/new-south-wales` },
    { name: 'Contact - VIC',               url: `${BASE_URL}/contact-us/victoria` },
    { name: 'Contact - WA',                url: `${BASE_URL}/contact-us/western-australia` },
    { name: 'Contact - QLD',               url: `${BASE_URL}/contact-us/queensland` },
]
