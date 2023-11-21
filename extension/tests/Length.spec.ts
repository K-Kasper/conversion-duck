import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.getByRole("tab", { name: "Length" }).click();
});

test("should be able to do basic conversion", async ({ page }) => {
	await page.getByLabel("Number").fill("2");
	await page.getByLabel("Length").first().click();
	await page.getByRole("option", { name: "Kilometre (km)" }).click();
	await page.getByLabel("Length").nth(1).click();
	await page.getByRole("option", { name: "Metre (m)" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("2,000");
	await page.getByRole("button", { name: "Reverse" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("0.002");
});
