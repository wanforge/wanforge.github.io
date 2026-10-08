import { type Page, expect, test } from '@playwright/test';
import { selectors, testRoutes } from '../fixtures/test-data';

/**
 * Theme Persistence E2E Tests
 *
 * Verifies that theme preferences are correctly toggled, persisted in localStorage,
 * and maintained across navigation and page refreshes.
 */

// Run tests in serial mode to avoid race conditions with localStorage and dev server hydration
test.describe.configure({ mode: 'serial' });

test.describe('Theme Persistence', () => {
  const THEME_STORAGE_KEY = 'theme';

  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto(testRoutes.home);
    // Wait for the page to be stable and hydrated
    await expect(page.locator(selectors.navigation.themeToggle)).toBeVisible();
    // Clear any existing theme preference to start from a clean state
    await page.evaluate((key) => localStorage.removeItem(key), THEME_STORAGE_KEY);
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  async function getTheme(page: Page) {
    return await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  }

  test('should toggle theme correctly', async ({ page }) => {
    const initialTheme = await getTheme(page);
    expect(initialTheme).toBeTruthy();

    const toggleButton = page.locator(selectors.navigation.themeToggle);

    // Toggle theme
    await toggleButton.click();

    // Verify theme changed on the html element
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', initialTheme as string);

    const toggledTheme = await getTheme(page);
    expect(toggledTheme).not.toBe(initialTheme);

    // Toggle back
    await toggleButton.click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', initialTheme as string);

    const restoredTheme = await getTheme(page);
    expect(restoredTheme).toBe(initialTheme);
  });

  test('should persist theme across navigation to all major pages', async ({ page }) => {
    const toggleButton = page.locator(selectors.navigation.themeToggle);

    // Switch theme
    await toggleButton.click();
    await page.waitForTimeout(300);
    const newTheme = await getTheme(page);

    // Iterate through all routes to verify persistence
    const routesToTest = Object.values(testRoutes);

    for (const route of routesToTest) {
      await page.goto(route);
      await expect(page.locator(selectors.navigation.themeToggle)).toBeVisible();
      const currentTheme = await getTheme(page);
      expect(currentTheme).toBe(newTheme);
    }
  });

  test('should persist theme across page refresh', async ({ page }) => {
    const toggleButton = page.locator(selectors.navigation.themeToggle);

    // Switch theme
    await toggleButton.click();
    await page.waitForTimeout(300);
    const newTheme = await getTheme(page);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.navigation.themeToggle)).toBeVisible();

    // Verify theme persists after reload
    const reloadedTheme = await getTheme(page);
    expect(reloadedTheme).toBe(newTheme);

    // Verify localStorage still has it
    const storedTheme = await page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY);
    expect(storedTheme).toBe(newTheme);
  });

  test('should respect stored theme preference on initial load', async ({ page }) => {
    // Set preference directly in localStorage
    await page.evaluate((key) => localStorage.setItem(key, 'dark'), THEME_STORAGE_KEY);

    // Reload to pick up the change
    await page.reload();
    await page.waitForLoadState('networkidle');
    await expect(page.locator(selectors.navigation.themeToggle)).toBeVisible();

    // Verify theme is dark
    const theme = await getTheme(page);
    expect(theme).toBe('dark');

    // Now set to light
    await page.evaluate((key) => localStorage.setItem(key, 'light'), THEME_STORAGE_KEY);
    await page.reload();
    await page.waitForLoadState('networkidle');

    const lightTheme = await getTheme(page);
    expect(lightTheme).toBe('light');
  });

  test('should respect system preference (dark)', async ({ page }) => {
    // Clear localStorage to ensure system preference is used
    await page.evaluate((key) => localStorage.removeItem(key), THEME_STORAGE_KEY);

    // Set system preference to dark
    await page.emulateMedia({ colorScheme: 'dark' });

    // Reload to pick up the change
    await page.reload();
    await page.waitForLoadState('networkidle');

    const theme = await getTheme(page);
    expect(theme).toBe('dark');
  });

  test('should respect system preference (light)', async ({ page }) => {
    // Clear localStorage
    await page.evaluate((key) => localStorage.removeItem(key), THEME_STORAGE_KEY);

    // Set system preference to light
    await page.emulateMedia({ colorScheme: 'light' });

    // Reload to pick up the change
    await page.reload();
    await page.waitForLoadState('networkidle');

    const theme = await getTheme(page);
    expect(theme).toBe('light');
  });
});
