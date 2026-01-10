import { test, expect } from "@playwright/test";

test.describe("Inventory feature", () => {
  test.beforeEach("Login with valid creds", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/.*\/inventory/);
  });

  test("Should confirm all prices are below zero", async ({ page }) => {
    let productElems = page.locator(".inventory_item");
    await expect(productElems).toHaveCount(6);
    let totalProducts = await productElems.count();

    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = productElems.nth(i);
      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();
      let price = await eleNode.locator(".inventory_item_price").innerText();
      console.log(`>>>Product: ${productName}, >>>Price: ${price}`);
      priceArr.push(price);
    }
    console.log(`>>>Original Price Array: ${priceArr}`);
    let modifiedPriceArr = priceArr.map((item) =>
      parseFloat(item.replace("$", ""))
    );
    console.log(`>>>Modified Price Array: ${modifiedPriceArr}`);

    let priceArrayWithInvalidPrice = modifiedPriceArr.filter(
      (item) => item <= 0
    );
    if (priceArrayWithInvalidPrice.length > 0) {
      console.log("Error");
    } else {
      console.log("No error");
    }
    expect(priceArrayWithInvalidPrice).toHaveLength(0);
  });

  test("Should buy a product successfully", async ({ page }) => {
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .nth(0)
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText("Sauce Labs Backpackcarry.")).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("Uday");
    await page.locator('[data-test="lastName"]').fill("Shankar");
    await page.locator('[data-test="postalCode"]').fill("411047");
    await page.locator('[data-test="continue"]').click();
    await expect(
      page.locator('[data-test="payment-info-value"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-test="shipping-info-value"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-label"]')).toBeVisible();
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      "Thank you for your order!"
    );
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });
});
