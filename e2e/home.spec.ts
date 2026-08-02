import { expect, test } from "@playwright/test";

test("homepage loads with brand and key sections", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Royal Puffy Purrs/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Royal comfort for your purrfect companion/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", {
      name: "Book a stay",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Choose your cat's royal room/i }),
  ).toBeVisible();
  await expect(page.getByText(/£30–£35 per day/i)).toBeVisible();
  await expect(page.getByRole("button", { name: /Previous (room|photo)/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Next (room|photo)/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Book this suite/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Cats for sale/i }),
  ).toBeVisible();
  await expect(page.getByText(/Coming soon/i).first()).toBeVisible();
});

test("garden suite photo carousel cycles through images", async ({ page }) => {
  await page.goto("/#cat-hotel");

  await expect(page.getByText("1 / 4")).toBeVisible();
  await page.getByRole("button", { name: /Next photo/i }).click();
  await expect(page.getByText("2 / 4")).toBeVisible();
});

test("contact page shows Essex address and validated form", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("main")).toContainText("SS13, Basildon");
  await expect(
    page.getByRole("heading", { name: /We'd love to hear from you/i }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
});
