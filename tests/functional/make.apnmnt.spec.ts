import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger";

test.describe("Make appointment", () => {
  test.beforeEach("Login with valid cred", async ({ page }, testInfo) => {
    const envConfig = testInfo.project.use as any;
    await log("info", `Launching the web app in ${envConfig.envName}`);

    await page.goto(envConfig.appURL);
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
    await page.getByRole("link", { name: "Make Appointment" }).click();
    await expect(page.getByText("Please login to make")).toBeVisible();
    await page.getByLabel("Username").fill(process.env.TEST_USER_NAME);
    await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("h2")).toContainText("Make Appointment");
    await log("info", "The login is successful...");
  });
  test("Should make an appointment with non default values", async ({
    page,
  }) => {
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByText("Medicaid").click();
    await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .fill("31/01/2026");
    await page
      .getByRole("textbox", { name: "Visit Date (Required)" })
      .press("Enter");
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("this is playwright multi line \ncomment");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(
      page.getByRole("link", { name: "Go to Homepage" })
    ).toBeVisible();
  });
});
