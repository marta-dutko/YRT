export interface NavPage {
    name: string  // Human-readable label used in the test name
    url: string   // Full URL of the page to verify
}

// All public-facing pages verified in the navigation smoke test
export const navigationPages: NavPage[] = [
    { name: 'Home',                        url: 'https://yrt-app-staging.vercel.app/' },
    { name: 'Courses',                     url: 'https://yrt-app-staging.vercel.app/courses' },
    { name: 'Courses - industry filter',   url: 'https://yrt-app-staging.vercel.app/courses?industry=construction' },
    { name: 'Course page',                 url: 'https://yrt-app-staging.vercel.app/courses/72488' },
    { name: 'Courses - search mode',       url: 'https://yrt-app-staging.vercel.app/courses?searchMode=true' },
    { name: 'For Students',                url: 'https://yrt-app-staging.vercel.app/for-students' },
    { name: 'USI resource',                url: 'https://yrt-app-staging.vercel.app/resources/unique-student-identifier' },
    { name: 'Student Handbook',            url: 'https://yrt-app-staging.vercel.app/student-handbook' },
    { name: 'For Business',                url: 'https://yrt-app-staging.vercel.app/for-business' },
    { name: 'For Business - clients',      url: 'https://yrt-app-staging.vercel.app/for-business#clients' },
    { name: 'For Business - bespoke',      url: 'https://yrt-app-staging.vercel.app/for-business#bespoke-training' },
    { name: 'For Business - traineeships', url: 'https://yrt-app-staging.vercel.app/for-business#industry-traineeships' },
    { name: 'Training Trailer',            url: 'https://yrt-app-staging.vercel.app/training-trailer' },
    { name: 'About Us',                    url: 'https://yrt-app-staging.vercel.app/about-us' },
    { name: 'Good Reads',                  url: 'https://yrt-app-staging.vercel.app/good-reads' },
    { name: 'Good Reads - article',        url: 'https://yrt-app-staging.vercel.app/good-reads/licence-to-operate-a-forklift-truck-more-text' },
    { name: 'Contact Us',                  url: 'https://yrt-app-staging.vercel.app/contact-us' },
    { name: 'Contact - NSW',               url: 'https://yrt-app-staging.vercel.app/contact-us/new-south-wales' },
    { name: 'Contact - VIC',               url: 'https://yrt-app-staging.vercel.app/contact-us/victoria' },
    { name: 'Contact - WA',                url: 'https://yrt-app-staging.vercel.app/contact-us/western-australia' },
    { name: 'Contact - QLD',               url: 'https://yrt-app-staging.vercel.app/contact-us/queensland' },
]
