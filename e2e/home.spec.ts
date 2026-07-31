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
  await expect(page.getByRole("heading", { name: /Book a stay/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Choose your cat's royal room/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /Previous room/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Next room/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Book this suite/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Cats for sale/i }),
  ).toBeVisible();
  await expect(page.getByText(/Coming soon/i).first()).toBeVisible();
});

test("contact page shows validated form", async ({ page }) => {
  await page.goto("/contact");

  await expect(
    page.getByRole("heading", { name: /We'd love to hear from you/i }),
  ).toBeVisible();
  await expect(page.getByLabel("Full name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByRole("button", { name: /Send message/i })).toBeVisible();
});
