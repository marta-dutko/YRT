import { Locator, Page } from "@playwright/test"

export class AllCoursesPage{
  private readonly page:Page
  private readonly pageHeading:Locator
  private readonly courseLink:(courseName: string) => Locator;
    constructor(page:Page){
        this.page = page
        this.pageHeading = page.getByRole('heading', { name: 'All Courses', level: 1 })

        this.courseLink = (courseName:string) => page.getByRole('link', { name: courseName })
    }

  
  async openCourse(courseName:string): Promise<void> {
    await this.courseLink(courseName).click()   
  }
}


// ==========
// export class AllCoursesPage{
//     constructor(page){
//         this.page = page
//         this.courseLink = (courseName) => page.getByRole('link', { name: courseName })
//     }

  
//   async openCourse(courseName) {
//     await this.courseLink(courseName).click()  
//   }
// }