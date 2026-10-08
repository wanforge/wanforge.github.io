import { expect, test } from '../utils/test-helpers';
import { selectors, testRoutes } from '../fixtures/test-data';

test.describe.configure({ mode: 'serial' });

/**
 * Demo Link Modal E2E Tests
 *
 * Verifies that demo/placeholder links correctly trigger the informative modal
 * and that the modal functions as expected (category-specific messaging, close, copy).
 */
test.describe('Demo Link Modal', () => {
  test.beforeEach(async ({ gotoAndWait }) => {
    // Start from the homepage for most tests
    await gotoAndWait(testRoutes.home);
  });

  test('should trigger modal for social media links in footer', async ({ page }) => {
    // Find a social link in the footer
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await expect(socialLink).toBeVisible();

    // Click it and verify modal appears
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(selectors.modal.content)).toBeVisible();

    // Verify social-specific messaging
    await expect(page.locator(selectors.modal.content)).toContainText('Social Media Link');
    await expect(page.locator(selectors.modal.demoMessage)).toBeVisible();
  });

  test('should trigger modal for integration logos', async ({ page, gotoAndWait }) => {
    // Go to home where integrations are
    await gotoAndWait(testRoutes.home);

    // Scroll down to the integrations section to trigger hydration
    const integrationSection = page.locator('[data-testid="integrations-section"]');
    await integrationSection.scrollIntoViewIfNeeded();

    // Find an integration logo in the section
    const integrationLogo = integrationSection.locator('[data-testid="integration-logo"]').first();

    // Wait for it to be visible and stable
    await expect(integrationLogo).toBeVisible({ timeout: 10000 });
    await integrationLogo.scrollIntoViewIfNeeded();

    // Click it and verify modal appears
    await integrationLogo.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Verify integration-specific messaging
    await expect(page.locator(selectors.modal.content)).toContainText('External Integration');
  });

  test('should trigger modal for auth buttons in login/signup pages', async ({
    page,
    gotoAndWait,
  }) => {
    // Go to login page
    await gotoAndWait(testRoutes.login);

    // Find GitHub auth button
    const githubAuth = page.locator(selectors.forms.githubAuth);
    await githubAuth.scrollIntoViewIfNeeded();
    await expect(githubAuth).toBeVisible();

    // Click it and verify modal appears
    await githubAuth.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Verify auth-specific messaging
    await expect(page.locator(selectors.modal.content)).toContainText('Authentication Required');
  });

  test('should trigger modal for external CTAs in footer', async ({ page }) => {
    // Find "Status" link in the footer resources column
    // It's a button role because it triggers a modal
    const statusLink = page.getByRole('button', { name: 'Status' });
    await statusLink.scrollIntoViewIfNeeded();
    await expect(statusLink).toBeVisible();

    // Click it and verify modal appears
    await statusLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Verify external-specific messaging
    await expect(page.locator(selectors.modal.content)).toContainText('External Link');
  });

  test('should display correctly in both themes', async ({ page, toggleTheme, getTheme }) => {
    // Trigger modal in default theme (light)
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Verify modal content visibility and basic styles in light mode
    const modalContent = page.locator(selectors.modal.content);
    await expect(modalContent).toBeVisible();

    // The actual background is on the inner div
    const modalInner = modalContent.locator('> div').first();
    await expect(modalInner).toHaveCSS('background-color', 'rgb(249, 250, 251)'); // --token-bg-primary (gray-50)

    // Close modal
    await page.keyboard.press('Escape');
    await expect(page.locator(selectors.modal.overlay)).not.toBeVisible();

    // Switch to dark theme
    await toggleTheme();
    const currentTheme = await getTheme();
    expect(currentTheme).toBe('dark');

    // Trigger modal again in dark mode
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Verify modal content visibility and basic styles in dark mode
    await expect(modalContent).toBeVisible();
    // Verify it matches dark mode token (gray-950: #030712)
    await expect(modalInner).toHaveCSS('background-color', 'rgb(3, 7, 18)');
  });

  test('should be able to close the modal using close button', async ({ page }) => {
    // Trigger modal
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Click close button
    const closeButton = page.locator(selectors.modal.closeButton);
    await closeButton.waitFor({ state: 'visible' });
    await closeButton.click();

    // Verify modal is gone
    await expect(page.locator(selectors.modal.overlay)).not.toBeVisible();
  });

  test('should be able to close the modal by clicking the overlay', async ({ page }) => {
    // Trigger modal
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Click overlay (backdrop)
    // We click at a point on the overlay that is likely outside the content
    await page.locator(selectors.modal.overlay).click({ position: { x: 10, y: 10 } });

    // Verify modal is gone
    await expect(page.locator(selectors.modal.overlay)).not.toBeVisible();
  });

  test('should be able to close the modal using Escape key', async ({ page }) => {
    // Trigger modal
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Press Escape
    await page.keyboard.press('Escape');

    // Verify modal is gone
    await expect(page.locator(selectors.modal.overlay)).not.toBeVisible();
  });

  test('should show visual feedback when copying URL', async ({ page }) => {
    // Trigger modal
    const socialLink = page.locator(selectors.footer.socialLinks).first();
    await socialLink.scrollIntoViewIfNeeded();
    await socialLink.click({ force: true });
    await expect(page.locator(selectors.modal.overlay)).toBeVisible({ timeout: 10000 });

    // Find copy button (it's the primary action button in the modal)
    const copyButton = page
      .locator(selectors.modal.content)
      .locator('button')
      .filter({ hasText: 'Copy Link URL' });
    await expect(copyButton).toBeVisible();

    // Click copy button
    await copyButton.click({ force: true });

    // Verify feedback (button text changes or icon changes - we'll check for "Copied!" or similar)
    // Based on src/components/ui/DemoLinkModal.tsx implementation
    await expect(page.getByText('Copied!', { exact: false })).toBeVisible();
  });
});
