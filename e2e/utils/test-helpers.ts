import { type Page, test as baseTest, expect } from '@playwright/test';

/**
 * E2E Test Fixtures and Utilities
 *
 * Extends the base Playwright test with custom fixtures
 * and utility functions for ModernSaaS testing.
 */

// Extended test fixture with custom utilities
export const test = baseTest.extend<{
  /** Navigate to a page and wait for it to be ready */
  gotoAndWait: (path: string) => Promise<void>;

  /** Check if element has expected text */
  expectToHaveText: (selector: string, text: string) => Promise<void>;

  /** Toggle between light and dark mode */
  toggleTheme: () => Promise<void>;

  /** Get current theme mode */
  getTheme: () => Promise<'light' | 'dark'>;
}>({
  gotoAndWait: async ({ page }, use) => {
    await use(async (path: string) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded');
    });
  },

  expectToHaveText: async ({ page }, use) => {
    await use(async (selector: string, text: string) => {
      const element = page.locator(selector);
      await expect(element).toContainText(text);
    });
  },

  toggleTheme: async ({ page }, use) => {
    await use(async () => {
      const themeToggle = page
        .locator('[data-testid="theme-toggle"]')
        .or(page.locator('button[aria-label*="theme"], button[aria-label*="mode"]'));

      if (await themeToggle.isVisible().catch(() => false)) {
        await themeToggle.click();
        await page.waitForTimeout(300);
      }
    });
  },

  getTheme: async ({ page }, use) => {
    await use(async () => {
      const html = page.locator('html');
      const className = await html.getAttribute('class');
      return className?.includes('dark') ? 'dark' : 'light';
    });
  },
});

export { expect };

/**
 * Responsive viewport sizes for testing
 * Matches the breakpoints in the design system
 */
export const viewports = {
  xs: { width: 320, height: 568 },
  sm: { width: 375, height: 667 },
  md: { width: 768, height: 1024 },
  lg: { width: 1024, height: 768 },
  xl: { width: 1280, height: 720 },
  '2xl': { width: 1920, height: 1080 },
} as const;

/**
 * Wait for animations to complete
 */
export async function waitForAnimation(page: Page, duration = 500): Promise<void> {
  await page.waitForTimeout(duration);
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Get all accessibility violations using axe-core
 * Note: Requires @axe-core/playwright to be installed
 */
export async function checkAccessibility(_page: Page): Promise<unknown[]> {
  // Placeholder for axe-core integration
  // Import and use: import AxeBuilder from '@axe-core/playwright';
  // return await new AxeBuilder({ page }).analyze();
  return [];
}
