import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.getByRole("tab", { name: "Mass" }).click();
});

test("should be able to do basic conversion", async ({ page }) => {
	await page.getByLabel("Number").fill("2");
	await page.getByLabel("Mass").first().click();
	await page.getByRole("option", { name: "Tonne / Metric ton (t)" }).click();
	await page.getByLabel("Number").fill("2");
	await page.getByLabel("Mass").nth(1).click();
	await page.getByRole("option", { name: "Kilogram (kg)" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("2,000");
	await page.getByRole("button", { name: "Reverse" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("0.002");
});
