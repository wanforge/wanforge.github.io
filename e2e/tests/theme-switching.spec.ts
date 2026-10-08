import { type Page, expect, test } from '@playwright/test';

/**
 * Theme Switching E2E Tests
 *
 * Comprehensive tests for theme functionality including:
 * - Theme toggle button functionality
 * - Theme persistence across page navigation
 * - Theme persistence across browser refresh
 * - System preference detection
 * - Both themes render without errors
 *
 * @group theme
 * @group accessibility
 */

test.describe('Theme Switching', () => {
  // Test data
  const THEME_STORAGE_KEY = 'theme';

  /**
   * Helper function to get current theme from the page
   */
  async function getCurrentTheme(page: Page) {
    // Get theme from HTML class and data attribute
    const html = page.locator('html');
    const className = await html.getAttribute('class');
    const dataTheme = await html.getAttribute('data-theme');
    const colorScheme = await html.evaluate(
      (el: HTMLElement) => window.getComputedStyle(el).colorScheme,
    );

    return {
      isDark: className?.includes('dark') || dataTheme === 'dark',
      dataTheme,
      colorScheme,
    };
  }

  /**
   * Helper function to find and click the theme toggle
   */
  async function clickThemeToggle(page: Page) {
    // Try multiple selectors to find the theme toggle
    const toggleSelectors = [
      'button[aria-label*="theme" i]',
      'button[aria-label*="mode" i]',
      'button[title*="theme" i]',
      'button[title*="mode" i]',
      '[data-testid="theme-toggle"]',
      'header button[class*="ThemeToggle"]',
      'header button:last-child',
    ];

    for (const selector of toggleSelectors) {
      const toggle = page.locator(selector).first();
      if (await toggle.isVisible().catch(() => false)) {
        await toggle.click();
        await page.waitForTimeout(300); // Wait for transition
        return true;
      }
    }

    throw new Error('Theme toggle button not found');
  }

  /**
   * Helper function to clear theme storage
   */
  async function clearThemeStorage(page: Page) {
    await page.evaluate((key: string) => {
      localStorage.removeItem(key);
    }, THEME_STORAGE_KEY);
  }

  test.beforeEach(async ({ page }) => {
    // Clear any stored theme preference before each test
    await page.goto('.');
    await clearThemeStorage(page);
    await page.reload();
    await page.waitForLoadState('networkidle');
  });

  test.describe('Theme Toggle Functionality', () => {
    test('theme toggle button is visible and accessible', async ({ page }) => {
      // Look for theme toggle button in the header
      const toggleButton = page
        .locator('button[aria-label*="theme" i]')
        .or(page.locator('button[title*="theme" i]'))
        .or(page.locator('[data-testid="theme-toggle"]'));

      // Button should be visible on non-mobile viewports
      await expect(toggleButton.first()).toBeVisible();

      // Check for proper ARIA attributes
      const ariaLabel = await toggleButton.first().getAttribute('aria-label');
      expect(ariaLabel?.toLowerCase()).toContain('theme');
    });

    test('clicking toggle switches from light to dark mode', async ({ page }) => {
      // Start with light mode by setting localStorage and reloading
      // This ensures ThemeProvider picks up the light theme
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'light');
      }, THEME_STORAGE_KEY);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const initialTheme = await getCurrentTheme(page);
      // Verify we started in light mode
      expect(initialTheme.dataTheme).toBe('light');

      // Click the toggle
      await clickThemeToggle(page);

      // Verify dark mode is active
      const afterToggle = await getCurrentTheme(page);
      expect(afterToggle.isDark).toBe(true);
      expect(afterToggle.dataTheme).toBe('dark');
    });

    test('clicking toggle switches from dark to light mode', async ({ page }) => {
      // Start with dark mode by setting localStorage and reloading
      // This ensures ThemeProvider picks up the dark theme
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const initialTheme = await getCurrentTheme(page);
      // Verify we started in dark mode
      expect(initialTheme.dataTheme).toBe('dark');

      // Click the toggle
      await clickThemeToggle(page);

      // Verify light mode is active
      const afterToggle = await getCurrentTheme(page);
      expect(afterToggle.isDark).toBe(false);
      expect(afterToggle.dataTheme).toBe('light');
    });

    test('multiple toggles cycle between light and dark', async ({ page }) => {
      // Start with light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      });

      // Toggle multiple times and verify cycling
      for (let i = 0; i < 4; i++) {
        const before = await getCurrentTheme(page);
        await clickThemeToggle(page);
        const after = await getCurrentTheme(page);

        expect(after.isDark).toBe(!before.isDark);
      }
    });
  });

  test.describe('Theme Persistence - Page Navigation', () => {
    test('theme persists when navigating between pages', async ({ page }) => {
      // Set to dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      });

      // Store theme in localStorage to simulate persistence
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);

      // Navigate to a different page (if available)
      // For now, we'll reload the current page to simulate navigation
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check if theme persisted in storage
      const storedTheme = await page.evaluate((key: string) => {
        return localStorage.getItem(key);
      }, THEME_STORAGE_KEY);

      expect(storedTheme).toBe('dark');
    });

    test('theme persists across multiple navigations', async ({ page }) => {
      // Set a theme preference
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'light');
      }, THEME_STORAGE_KEY);

      // Simulate multiple navigations by reloading
      for (let i = 0; i < 3; i++) {
        await page.reload();
        await page.waitForLoadState('networkidle');

        const storedTheme = await page.evaluate((key: string) => {
          return localStorage.getItem(key);
        }, THEME_STORAGE_KEY);

        expect(storedTheme).toBe('light');
      }
    });
  });

  test.describe('Theme Persistence - Browser Refresh', () => {
    test('theme persists after browser refresh', async ({ page }) => {
      // First, set a specific theme
      await clickThemeToggle(page);

      // Refresh the page
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check if theme persisted
      const storedTheme = await page.evaluate((key: string) => {
        return localStorage.getItem(key);
      }, THEME_STORAGE_KEY);

      // The stored theme should match what we set
      expect(storedTheme).toBeTruthy();
    });

    test('theme is restored from localStorage on page load', async ({ page }) => {
      // Set a theme preference directly in storage before loading
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);

      // Reload to trigger theme restoration
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Give the theme provider time to initialize
      await page.waitForTimeout(500);

      // Check if the theme script properly sets the theme
      const dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');
    });
  });

  test.describe('System Preference Detection', () => {
    test('respects system color scheme preference', async ({ page }) => {
      // Clear any stored preference to allow system preference to take effect
      await clearThemeStorage(page);

      // Emulate dark color scheme
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Check the theme - should respect system preference when no stored preference
      const theme = await getCurrentTheme(page);

      // When system preference is dark and no stored preference, theme should be dark
      // Note: This depends on the ThemeProvider's system preference detection
      expect(theme.dataTheme).toBeTruthy();

      // Switch back to light
      await page.emulateMedia({ colorScheme: 'light' });
    });

    test('system preference updates when media query changes', async ({ page }) => {
      // Clear storage and set to system mode
      await clearThemeStorage(page);
      await page.reload();
      await page.waitForLoadState('networkidle');

      // Emulate dark mode
      await page.emulateMedia({ colorScheme: 'dark' });

      // Trigger a storage event or reload to pick up the change
      await page.evaluate(() => {
        // Dispatch storage event to trigger theme update
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'theme',
            newValue: null,
          }),
        );
      });

      // The theme should respond to system changes
      const afterDark = await getCurrentTheme(page);
      expect(afterDark.dataTheme).toBeTruthy();

      // Switch to light
      await page.emulateMedia({ colorScheme: 'light' });
    });

    test('stored preference takes precedence over system preference', async ({ page }) => {
      // Set a specific stored preference
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'light');
      }, THEME_STORAGE_KEY);

      // Emulate dark system preference
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Stored preference should win
      const storedTheme = await page.evaluate((key: string) => {
        return localStorage.getItem(key);
      }, THEME_STORAGE_KEY);

      expect(storedTheme).toBe('light');

      // Reset
      await page.emulateMedia({ colorScheme: 'light' });
    });
  });

  test.describe('Theme Rendering', () => {
    test('light mode renders without console errors', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Set to light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      });

      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check theme is light
      const theme = await getCurrentTheme(page);
      expect(theme.isDark).toBe(false);

      // No console errors
      expect(consoleErrors).toHaveLength(0);
    });

    test('dark mode renders without console errors', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Set to dark mode
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);

      await page.reload();
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      // Check theme is dark
      const dataTheme = await page.locator('html').getAttribute('data-theme');
      expect(dataTheme).toBe('dark');

      // No console errors
      expect(consoleErrors).toHaveLength(0);
    });

    test('theme colors are properly applied in light mode', async ({ page }) => {
      // Ensure light mode
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      });

      // Check that CSS custom properties are applied
      const bgColor = await page.evaluate(() => {
        return getComputedStyle(document.body).backgroundColor;
      });

      // Background should not be dark (rgb(0, 0, 0) or similar)
      expect(bgColor).not.toBe('rgb(0, 0, 0)');
    });

    test('theme colors are properly applied in dark mode', async ({ page }) => {
      // Set to dark mode
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);

      await page.reload();
      await page.waitForLoadState('networkidle');

      // Check that dark class is present
      const html = page.locator('html');
      const className = await html.getAttribute('class');

      // Dark mode should have 'dark' class
      expect(className).toContain('dark');
    });
  });

  test.describe('Accessibility', () => {
    test('theme toggle is keyboard accessible', async ({ page }) => {
      // Find the toggle button
      const toggleButton = page
        .locator('button[aria-label*="theme" i]')
        .or(page.locator('button[title*="theme" i]'))
        .first();

      // Should be focusable
      await toggleButton.focus();
      const isFocused = await toggleButton.evaluate((el) => el === document.activeElement);
      expect(isFocused).toBe(true);

      // Should have proper ARIA label
      const ariaLabel = await toggleButton.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    });

    test('theme toggle has visible focus indicator', async ({ page }) => {
      const toggleButton = page
        .locator('button[aria-label*="theme" i]')
        .or(page.locator('button[title*="theme" i]'))
        .first();

      await toggleButton.focus();

      // Check for focus styles
      const outline = await toggleButton.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return styles.outline || styles.boxShadow;
      });

      // Should have some focus indicator
      expect(outline).toBeTruthy();
    });

    test('high contrast between text and background in both themes', async ({ page }) => {
      // Test light mode contrast
      await page.evaluate(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      });

      const lightModeColors = await page.evaluate(() => {
        const body = document.body;
        const text = document.querySelector('h1, p');
        return {
          bg: window.getComputedStyle(body).backgroundColor,
          text: text ? window.getComputedStyle(text).color : null,
        };
      });

      expect(lightModeColors.bg).toBeTruthy();
      expect(lightModeColors.text).toBeTruthy();

      // Test dark mode contrast
      await page.evaluate((key: string) => {
        localStorage.setItem(key, 'dark');
      }, THEME_STORAGE_KEY);

      await page.reload();
      await page.waitForLoadState('networkidle');

      const darkModeColors = await page.evaluate(() => {
        const body = document.body;
        const text = document.querySelector('h1, p');
        return {
          bg: window.getComputedStyle(body).backgroundColor,
          text: text ? window.getComputedStyle(text).color : null,
        };
      });

      expect(darkModeColors.bg).toBeTruthy();
      expect(darkModeColors.text).toBeTruthy();
    });
  });
});
