import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration
 *
 * Configured for:
 * - Cross-browser testing (Chromium, Firefox, WebKit/Safari)
 * - Responsive testing across multiple viewport sizes
 * - GitHub Pages deployment compatibility
 * - CI/CD integration support
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Test directory structure
  testDir: './e2e',

  // Run all tests in files matching this pattern
  testMatch: '**/*.spec.ts',

  // Run files matching this pattern for global setup
  // globalSetup: require.resolve('./e2e/setup/global-setup'),

  // Run files matching this pattern for global teardown
  // globalTeardown: require.resolve('./e2e/setup/global-teardown'),

  // Timeout for each test (30 seconds)
  timeout: 30000,

  // Timeout for each expect assertion (5 seconds)
  expect: {
    timeout: 5000,
    // Visual regression threshold - allow 2.5% pixel difference
    // to account for font rendering variations across platforms
    toHaveScreenshot: {
      maxDiffPixels: 250,
      threshold: 0.25,
      animations: 'disabled',
    },
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : 4,

  // Reporter to use
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'e2e/test-results/results.json' }],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for all tests
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321/',

    // Collect trace when retrying failed tests
    trace: 'on-first-retry',

    // Capture screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on retry
    video: 'on-first-retry',

    // Run browser in headless mode on CI
    headless: !!process.env.CI,

    // Viewport size (will be overridden by project-specific settings)
    viewport: { width: 1280, height: 720 },

    // Action timeout
    actionTimeout: 15000,

    // Navigation timeout
    navigationTimeout: 15000,
  },

  // Configure projects for major browsers and viewport sizes
  projects: [
    // ============================================
    // DESKTOP BROWSERS
    // ============================================

    // Chromium (Chrome, Edge)
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Firefox
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // WebKit (Safari)
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Branded Browsers
    {
      name: 'google-chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1280, height: 720 },
      },
    },

    {
      name: 'microsoft-edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1280, height: 720 },
      },
    },

    // ============================================
    // RESPONSIVE VIEWPORT SIZES
    // ============================================

    // Large Desktop (1920x1080)
    {
      name: 'chromium-large-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // Standard Desktop (1280x720)
    {
      name: 'chromium-standard-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },

    // Small Desktop / Large Tablet (1024x768)
    {
      name: 'chromium-small-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },

    // Tablet (768x1024)
    {
      name: 'chromium-tablet',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 },
      },
    },

    // Mobile Large (414x896) - iPhone 11 Pro Max, XS Max
    {
      name: 'chromium-mobile-large',
      use: {
        ...devices['iPhone 11 Pro Max'],
        viewport: { width: 414, height: 896 },
      },
    },

    // Mobile Medium (390x844) - iPhone 12/13/14
    {
      name: 'chromium-mobile-medium',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 },
      },
    },

    // Mobile Small (375x667) - iPhone SE, 6/7/8
    {
      name: 'chromium-mobile-small',
      use: {
        ...devices['iPhone SE'],
        viewport: { width: 375, height: 667 },
      },
    },

    // Mobile Extra Small (320x568) - Smallest phones
    {
      name: 'chromium-mobile-xs',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
      },
    },

    // ============================================
    // DARK MODE TESTING
    // ============================================

    {
      name: 'chromium-dark-mode',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        colorScheme: 'dark',
      },
    },

    // ============================================
    // HIGH CONTRAST / ACCESSIBILITY TESTING
    // ============================================

    {
      name: 'chromium-high-contrast',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        contextOptions: {
          forcedColors: 'active',
        },
      },
    },

    // ============================================
    // PRODUCTION SMOKE TESTS
    // ============================================

    {
      name: 'production-smoke',
      testMatch: '**/smoke.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        // Ensure we use the production URL if provided, otherwise fallback
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321/',
      },
    },
  ],

  // ============================================
  // LOCAL DEVELOPMENT SERVER CONFIGURATION
  // ============================================

  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  // ============================================
  // OUTPUT DIRECTORIES
  // ============================================

  outputDir: 'e2e/test-results',

  // Snapshot comparison directory
  snapshotDir: 'e2e/snapshots',
});
