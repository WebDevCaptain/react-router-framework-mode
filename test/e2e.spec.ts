import { test, expect } from "@playwright/test";

test("has marketing hero and can navigate to dashboard and create project", async ({ page }) => {
  // Start on marketing landing page
  await page.goto("http://localhost:5173/");

  // Verify marketing site main heading is visible
  await expect(page.locator("h1")).toContainText("Simplify how you manage Projects & Tasks");

  // Click navigation action to enter dashboard
  await page.click("text=Enter Dashboard");

  // Verify dashboard url and project workspace sidebar
  await expect(page).toHaveURL(/.*\/app\/projects/);
  await expect(page.locator("aside")).toBeVisible();

  // Open creation drawer
  await page.click("text=New Project");

  // Fill project details
  await page.fill('input[name="name"]', "E2E Playwright Project");
  await page.fill('textarea[name="description"]', "Created automatically by our Playwright integration suite.");

  // Submit and verify creation revalidates automatically
  await page.click('button[type="submit"]:has-text("Create Project")');

  // Verify it exists in the active project lists grid
  await expect(page.locator("text=E2E Playwright Project")).toBeVisible();
});
