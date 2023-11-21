import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("currency page should load", async ({ page }) => {
	await expect(page).toHaveTitle(/Conversion Duck/);
	await page.getByRole("button", { name: "conversion duck logo" }).click();
	await expect(await page.getByRole("heading", { name: "Conversion Duck" })).toBeVisible();
	await expect(await page.getByText("Made by BeePuu.org")).toBeVisible();
	await expect(await page.getByRole("tab", { name: "Length" })).toBeDisabled;
	await page.getByRole("button", { name: "close" }).click();
	await page.getByRole("tab", { name: "Length" }).click();
	await page.getByLabel("Length").first().click();
	await expect(await page.getByRole("option", { name: "Kilometre (km)" })).toBeVisible();
});
