// Interfaces
import {DayData} from "./interfaces";

export interface CourseSearchData {
    courseId: string,
    courseName: string,
    courseIndustry: string,
    startDate: DayData,
    endDate: DayData,
    itemsCount: number,
    itemCountFilterByName: number,
    itemCountFilterByIndustry:number
}

export const courseSearchValidData: CourseSearchData = {
    courseId: 'CPCCLDG3001',
    courseName: 'Licence',
    courseIndustry: 'Construction',
    startDate: {
        year:'2026' ,
        month: 'December',
        day: '7',
    } ,
    endDate: {
        year:'2026' ,
        month: 'December',
        day: '11',
    } ,
    itemsCount: 1,
    itemCountFilterByName: 19,
    itemCountFilterByIndustry: 5
}

export const courseSearchInValidData: CourseSearchData = {
    courseId: '0000000',
    courseName: 'Test',
    courseIndustry: 'Construction',
    startDate: {
        year:'2026' ,
        month: 'April',
        day: '7',
    } ,
    endDate: {
        year:'2026' ,
        month: 'December',
        day: '11',
    },
    itemsCount: 0,
    itemCountFilterByName:0,
    itemCountFilterByIndustry:0
}
