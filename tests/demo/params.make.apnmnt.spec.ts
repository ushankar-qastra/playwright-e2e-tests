import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

const makeAppointmentTestData = TestData.makeAppointmentTestData();

for (const appData of makeAppointmentTestData) {
  test.describe("Make appointment", () => {
    test.beforeEach("Login with valid cred", async ({ page }) => {
      await page.goto("https://katalon-demo-cura.herokuapp.com/");
      await expect(page).toHaveTitle("CURA Healthcare Service");
      await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
      await page.getByRole("link", { name: "Make Appointment" }).click();
      await expect(page.getByText("Please login to make")).toBeVisible();
      await page.getByLabel("Username").fill("John Doe");
      await page.getByLabel("Password").fill("ThisIsNotAPassword");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator("h2")).toContainText("Make Appointment");
      const loginCookies = await page.context().cookies();
      process.env.LoginCookies = JSON.stringify(loginCookies);
    });
    test(`${appData.testId}: Should make an appointment with non default values`, async ({
      page,
    }) => {
      await page.getByLabel("Facility").selectOption(appData.facility);
      await page
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .check();
      await page.getByText(appData.hcp).click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .click();
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .fill(appData.visitDt);
      await page
        .getByRole("textbox", { name: "Visit Date (Required)" })
        .press("Enter");
      await page.getByRole("textbox", { name: "Comment" }).click();
      await page
        .getByRole("textbox", { name: "Comment" })
        .fill("this is playwright multi line \ncomment");
      await page.getByRole("button", { name: "Book Appointment" }).click();
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation"
      );
      await expect(
        page.getByRole("link", { name: "Go to Homepage" })
      ).toBeVisible();
    });
  });
}
