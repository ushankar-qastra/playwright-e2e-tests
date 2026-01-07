import { test, expect } from "@playwright/test";

test("Should load home page with correct title", async ({ page }) => {
  // Go to the home page
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Assert if the title is correct
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Assert header text
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testinfo) => {
  await page.locator("//h1").click();
});
