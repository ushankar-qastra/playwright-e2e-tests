import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import TestData from "../../data/test-data.js";
import MultiWindowPage from "../page-objects/multi.window.page.js";

test.describe("Multiple windows", () => {
  test("Should handle multiple windows flow", async ({ page, context }) => {
    const data = TestData.multiWindowData();
    const mainPage = new MultiWindowPage(page);

    await mainPage.openHome(data.homeUrl);
    await mainPage.openMultipleWindowsPage();

    const [firstWindow] = await Promise.all([
      context.waitForEvent("page"),
      mainPage.clickHere(),
    ]);
    await firstWindow.waitForLoadState();
    await expect(firstWindow).toHaveTitle(data.newWindowTitle);
    await log("info", "First child window opened and title validated");

    // Reuse the first child window to open a second child window.
    const firstWindowPage = new MultiWindowPage(firstWindow);
    await firstWindowPage.navigateTo(data.windowsUrl);

    const [secondWindow] = await Promise.all([
      context.waitForEvent("page"),
      firstWindowPage.clickHere(),
    ]);
    await secondWindow.waitForLoadState();

    const secondWindowPage = new MultiWindowPage(secondWindow);
    await secondWindowPage.assertHeader(data.newWindowHeader);
    await log("info", "Second child window opened and header validated");

    await page.bringToFront();
    await log("info", "Returned to the parent window");
  });
});
