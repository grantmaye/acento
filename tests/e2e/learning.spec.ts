import { test, expect } from "@playwright/test";

test("read, compare, practice, save, search and explain session limits", async ({ page }, info) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Learn this well. Then move on." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Audio unavailable" })).toBeDisabled();
  await page.screenshot({ path: `test-results/${info.project.name}-home.png`, fullPage: false });
  await page.getByRole("button", { name: "Compare phrases", exact: true }).click();
  await expect(page.getByText("Standard Spanish", { exact: true })).toBeVisible();
  await page.locator("#today").getByRole("button", { name: "Save phrase", exact: true }).click();
  await expect(page.locator("#saved")).toContainText("Hola");
  await page.getByRole("button", { name: "Learn why", exact: true }).click();
  await expect(page.getByText("everyone", { exact: true })).toBeVisible();
  await page.locator("#practice").getByRole("button", { name: "KLK", exact: true }).click();
  await expect(page.locator("#practice").getByRole("status")).toContainText("Try another answer.");
  await page.locator("#practice").getByRole("button", { name: "Buenos días", exact: true }).click();
  await expect(page.locator("#practice").getByRole("status")).toContainText("Good fit.");
  await expect(page.locator("#practice").getByRole("status")).toContainText(
    "Formal contexts need standard Spanish.",
  );
  await page.getByRole("button", { name: "I understand", exact: true }).click();
  await expect(page.getByText("1 phrases understood", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Compare phrases", exact: true })).toBeVisible();
  await page.getByRole("textbox", { name: "Search dictionary" }).fill("guagua");
  await page
    .locator("#dictionary")
    .getByRole("button", { name: "guagua bus", exact: true })
    .click();
  await expect(
    page.locator("#dictionary").getByRole("heading", { name: "guagua", exact: true }),
  ).toBeVisible();
  await page
    .locator("#dictionary")
    .evaluate((element) => element.scrollIntoView({ block: "center", behavior: "instant" }));
  await page
    .locator("#dictionary")
    .screenshot({ path: `test-results/${info.project.name}-dictionary.png` });
  await page.getByRole("textbox", { name: "Search dictionary" }).fill("zzzzzz");
  await expect(page.locator("#dictionary").getByRole("status")).toContainText("No matching terms");
  await page.reload();
  await expect(page.getByText("0 phrases understood", { exact: true })).toBeVisible();
  await expect(page.locator("#saved")).toContainText("Save only the phrases");
  await expect(
    page.getByText("Prototype session: saved phrases and progress reset when you reload."),
  ).toBeVisible();
});
