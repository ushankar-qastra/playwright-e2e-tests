import { expect, type Page } from "@playwright/test";
import BasePage from "./base.page.js";
import { log } from "../helpers/logger.js";

export default class MultiWindowPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Elements */
  get multipleWindowsLink() {
    return this.page.getByRole("link", { name: "Multiple Windows" });
  }

  get clickHereLink() {
    return this.page.getByRole("link", { name: "Click Here" });
  }

  get headerText() {
    return this.page.getByRole("heading", { level: 3 });
  }

  /* Page Actions */
  async openHome(url: string) {
    await log("info", `Opening the home page: ${url}`);
    await this.navigateTo(url);
  }

  async openMultipleWindowsPage() {
    await log("info", "Navigating to the Multiple Windows page");
    await this.click(this.multipleWindowsLink);
  }

  async clickHere() {
    await log("info", "Clicking the 'Click Here' link to open a new window");
    await this.click(this.clickHereLink);
  }

  async assertHeader(expectedText: string) {
    await expect(this.headerText).toHaveText(expectedText);
  }
}
