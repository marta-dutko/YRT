import { Locator, Page } from "@playwright/test"

export class AllCoursesPage{
  private readonly page:Page
  private readonly courseLink:(courseName: string) => Locator;
    constructor(page:Page){
        this.page = page
        this.courseLink = (courseName:string) => page.getByRole('link', { name: courseName })
    }

  async openCourse(courseName:string): Promise<void> {
    await this.courseLink(courseName).click()   
  }
}