import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("should be able to do basic conversion", async ({ page }) => {
	await page.getByLabel("Number").fill("2");
	await page.getByLabel("Currency").first().click();
	await page.getByRole("option", { name: "Euro (EUR)" }).click();
	await page.getByLabel("Currency").nth(1).click();
	await page.getByRole("option", { name: "Euro (EUR)" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("2");
	await page.getByRole("button", { name: "Reverse" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("2");
});
