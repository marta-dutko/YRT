import {Page} from '@playwright/test';

export class BasePage {
protected readonly page: Page;
  constructor(page: Page) {
    this.page = page
  }

  async goTo(url:string): Promise<void> {
   await this.page.goto(url)
  }

}