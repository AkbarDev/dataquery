import { test, expect } from "@playwright/test";

/**
 * End-to-End User Flow Test
 * Journey: Sign Up -> Upload Sample Dataset -> Automate Recipe -> Pin to Dashboard -> Export
 */
test.describe("DataQuery E2E User Journey", () => {
  test("complete flow: signup -> upload -> automate -> pin -> export", async ({ page }) => {
    // 1. Visit homepage
    await page.goto("/");
    await expect(page).toHaveTitle(/DataQuery AI/);

    // 2. Navigate to signup
    await page.click("text=Start free");
    await expect(page).toHaveURL(/.*signup/);

    // 3. Fill signup form
    await page.fill('input[placeholder="Jane Doe"]', "Alex Mercer");
    await page.fill('input[placeholder="analyst@company.com"]', "alex@mercer.data");
    await page.fill('input[placeholder="••••••••••••"]', "SecureDataPass2026!");
    await page.click('button:has-text("Start Free Workspace")');

    // 4. Arrive at Visual Playground
    await expect(page).toHaveURL(/.*playground/);
    await expect(page.locator("text=Global E-Commerce Sales & Margin 2026")).toBeVisible();

    // 5. Switch to Automate Mode
    await page.click('button:has-text("Automate")');
    await expect(page.locator("text=Automated Intelligence Recipes")).toBeVisible();

    // 6. Select "Executive Sales Summary" Preset & Run Automate
    await page.click("text=Executive Sales Summary");
    await page.click('button:has-text("Automate Recipe")');

    // 7. Verify pipeline completion and output matrix
    await expect(page.locator("text=Execution Stages Progress")).toBeVisible();
    await expect(page.locator("text=Output Matrix").or(page.locator("text=RECORDS"))).toBeVisible();

    // 8. Pin Chart to Dashboard
    await page.click('button[title="Pin to Dashboard"]');
    await expect(page.locator("text=Pinned to Dashboard")).toBeVisible();

    // 9. Navigate to Dashboards
    await page.click("text=Dashboards");
    await expect(page).toHaveURL(/.*dashboards/);
    await expect(page.locator("text=Executive Sales & Margin Dashboard")).toBeVisible();

    // 10. Trigger Export
    await page.click('button:has-text("Export PDF")');
    await expect(page.locator("text=Generating PDF")).toBeVisible();
  });
});
