import { expect, test } from "@playwright/test";

const adminEmail = "cattery@royalpuffypurrs.com";
const adminPassword = process.env.ADMIN_PASSWORD;

test.describe("Admin", () => {
  test("redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/admin");

    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: /Seller login/i })).toBeVisible();
  });

  test("rejects invalid credentials", async ({ page }) => {
    await page.goto("/admin/login");

    await page.getByLabel("Email").fill(adminEmail);
    await page.getByLabel("Password").fill("wrong-password");
    await page.getByRole("button", { name: /Sign in/i }).click();

    await expect(page.getByText(/Invalid email or password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("logs in and loads picture manager", async ({ page }) => {
    test.skip(!adminPassword, "ADMIN_PASSWORD is not set for e2e tests");

    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(adminEmail);
    await page.getByLabel("Password").fill(adminPassword!);
    await page.getByRole("button", { name: /Sign in/i }).click();

    await expect(page).toHaveURL(/\/admin$/);
    await expect(
      page.getByRole("heading", { name: /Picture manager/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Brand images/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Hotel suites/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sign out/i })).toBeVisible();
  });

  test("protects admin API without a session", async ({ request }) => {
    const response = await request.get("/api/admin/hotel");
    expect(response.status()).toBe(401);
  });
});
