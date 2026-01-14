import BasePage from "./base.page";
import { expect, type Page } from "@playwright/test";
import { log } from "../helpers/logger";

class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /* Elements */
  get usernameInputBox() {
    return this.page.getByRole("textbox", { name: "Email:" });
  }
  get passwordInputBox() {
    return this.page.getByRole("textbox", { name: "Password:" });
  }
  get loginBtn() {
    return this.page.getByRole("button", { name: "Log in" });
  }

  /* Page Actions */
  async loginTonopCommerceWeb(url: string, username: string, password: string) {
    try {
      await log("info", `Login to :${url} with ${username}`);
      await this.navigateTo(url);
      await this.typeInto(this.usernameInputBox, username);
      await this.typeInto(this.passwordInputBox, password);
      await this.click(this.loginBtn);
      await this.page.waitForTimeout(10_000);
      await expect(this.page).toHaveTitle(
        "Dashboard / nopCommerce administration"
      );
      await log("info", "Home page is launched successfully...");
    } catch (err) {
      (
        err as Error
      ).message = `Failed login to nopcommerce web: ${url}, with username: ${username}`;
      throw err;
    }
  }
}

export default HomePage;
