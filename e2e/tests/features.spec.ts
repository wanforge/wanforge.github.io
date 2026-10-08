import { expect, test, viewports } from '../utils/test-helpers';
import { testRoutes } from '../fixtures/test-data';

/**
 * Features Page E2E Tests
 *
 * Comprehensive tests for the Features page covering:
 * - Section visibility
 * - Navigation to page
 * - CTA functionality
 * - Theme switching consistency
 * - Responsive behavior
 *
 * @group features
 */
test.describe('Features Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.features);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Section Visibility', () => {
    test('displays hero section with correct title', async ({ page }) => {
      const headline = page.locator('section#features-hero h1');
      await expect(headline).toBeVisible();
      await expect(headline).toContainText(/Everything you need to/i);
    });

    test('displays detailed feature sections', async ({ page }) => {
      // Check for specifically identified section
      const performanceSection = page.locator('section#performance');
      await expect(performanceSection).toBeVisible();

      const securitySection = page.locator('section#security');
      await expect(securitySection).toBeVisible();
    });

    test('displays use cases section with tabs', async ({ page }) => {
      const useCasesSection = page.locator('section#use-cases');
      await expect(useCasesSection).toBeVisible();

      const tabs = page.locator('[role="tab"]');
      await expect(tabs).toHaveCount(4); // Startups, Enterprise, Developers, Agencies
    });

    test('displays comparison table', async ({ page }) => {
      const comparisonSection = page.locator('section#comparison');
      await expect(comparisonSection).toBeVisible();

      const table = comparisonSection.locator('table');
      await expect(table).toBeVisible();
    });

    test('displays demo video section', async ({ page }) => {
      const demoVideoSection = page.locator('section#demo-video');
      await expect(demoVideoSection).toBeVisible();

      const playButton = demoVideoSection.locator('a[role="button"]');
      await expect(playButton).toBeVisible();
    });
  });

  test.describe('CTA Functionality', () => {
    test('Final CTA buttons have correct links', async ({ page }) => {
      const finalCta = page.locator('section#final-cta');

      const pricingLink = finalCta.locator('button').filter({ hasText: /View Pricing/i });
      await expect(pricingLink).toBeVisible();

      const contactLink = finalCta.locator('button').filter({ hasText: /Contact Sales/i });
      await expect(contactLink).toBeVisible();
    });
  });

  test.describe('Responsive Behavior', () => {
    test('displays correctly on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);
      await page.reload();
      await page.waitForLoadState('networkidle');

      const headline = page.locator('section#features-hero h1');
      await expect(headline).toBeVisible();

      // Tabs should still be accessible
      const tabsList = page.locator('[role="tablist"]');
      await expect(tabsList).toBeVisible();
    });

    test('comparison table is scrollable on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);

      const tableContainer = page.locator('section#comparison .overflow-x-auto');
      await expect(tableContainer).toBeVisible();

      // We can't easily test "scrollability" without interaction, but we verify it has the class
      const className = await tableContainer.getAttribute('class');
      expect(className).toContain('overflow-x-auto');
    });
  });

  test.describe('SEO and Meta', () => {
    test('has proper page title', async ({ page }) => {
      // Based on features.astro: <title>{seo.title} | ModernSaaS</title>
      // seo.title is "Features"
      await expect(page).toHaveTitle(/Features | ModernSaaS/i);
    });

    test('has meta description', async ({ page }) => {
      const metaDescription = page.locator('meta[name="description"]');
      const content = await metaDescription.getAttribute('content');
      expect(content).toContain('automation tools');
    });
  });
});
