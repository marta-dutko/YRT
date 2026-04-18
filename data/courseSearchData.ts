// Interfaces
interface dataDay{
    startYear: string,
    startMonth: string,
    startDay: string,
}
export interface CourseSearchData {
    couseId: string,
    courseName: string,
    courseIndustry: string,
    startDate: dataDay,
    endDate: dataDay,
    itemsCount: number,
    itemCountFilterByName: number,
    itemCountFilterByIndustry:number
}

export interface NothingFoundData {
    itemsCount: number
}
// Data
// export const industries: string [] = [
//     'Construction', 'Transport & Logistics', 'Manufacturing', 'Environmental', 'Business & Leadership', 'Information & Technology', 'Creative Arts']

export const courseSearchValidData: CourseSearchData = {
    couseId: 'CPCCLDG3001',
    courseName: 'Licence',
    courseIndustry: 'Construction',
    // startDate: '7 Dec 2026',
    // endDate: '11 Dec 2026',
    startDate: {
        startYear:'2026' ,
        startMonth: 'December',
        startDay: '7',
    } ,
    endDate: {
        startYear:'2026' ,
        startMonth: 'December',
        startDay: '11',
    } ,
    itemsCount: 1,
    itemCountFilterByName: 19,
    itemCountFilterByIndustry: 5
}

export const courseSearchInValidData: CourseSearchData = {
    couseId: '0000000',
    courseName: 'Test',
    courseIndustry: 'Construction',
    startDate: {
        startYear:'2026' ,
        startMonth: 'April',
        startDay: '7',
    } ,
    endDate: {
        startYear:'2026' ,
        startMonth: 'December',
        startDay: '11',
    },
    itemsCount: 0,
    itemCountFilterByName:0,
    itemCountFilterByIndustry:0
}

export const nothingFound: NothingFoundData = {
    itemsCount: 0
}
