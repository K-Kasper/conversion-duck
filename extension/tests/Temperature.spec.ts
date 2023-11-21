import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.getByRole("tab", { name: "Temperature" }).click();
});

test("should be able to do basic conversion", async ({ page }) => {
	await page.getByLabel("Number").fill("2");
	await page.getByLabel("Temperature").first().click();
	await page.getByRole("option", { name: "Celsius (°C)" }).click();
	await page.getByLabel("Temperature").nth(1).click();
	await page.getByRole("option", { name: "Fahrenheit (°F)" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("35.6");
	await page.getByRole("button", { name: "Reverse" }).click();
	await expect(await page.getByLabel("Result")).toHaveValue("-16.6667");
});
