export interface CourseData {
    id: string,
    name: string,
    date: string,
    location: string,
    fees: string,
    discountCode:string,
    discountMessage:string,
    discountPrice:string
}

export const courseData: CourseData = {
    id:'CPCCLDG3001 - Licence to',
    name: 'Licence to perform dogging',
    date: '25 - 29 May 2026',
    location: 'YRT HQ - Wetherill Park, NSW',
    fees: '$1,350',
    discountCode:'ASG95',
    discountMessage:'ASG Forklift LF LO— $95.00 off',
    discountPrice:'$1,255'
}