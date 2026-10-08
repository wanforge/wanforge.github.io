import { expect, test, viewports } from '../utils/test-helpers';
import { testRoutes } from '../fixtures/test-data';

/**
 * Contact Page E2E Tests
 *
 * Comprehensive tests for the Contact page covering:
 * - Section visibility
 * - Form validation and submission
 * - Contact info and demo modal integration
 * - FAQ accordion interaction
 * - Responsive behavior
 *
 * @group contact
 */
test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testRoutes.contact);
    await page.waitForLoadState('networkidle');
  });

  test.describe('Section Visibility', () => {
    test('displays hero section with correct title', async ({ page }) => {
      const headline = page.locator('main h1').first();
      await expect(headline).toBeVisible();
      await expect(headline).toContainText(/Get in touch/i);
    });

    test('displays contact form', async ({ page }) => {
      const contactForm = page.locator('[data-testid="contact-form"]');
      await expect(contactForm).toBeVisible();
      await expect(contactForm.getByLabel(/Full Name/i)).toBeVisible();
      await expect(contactForm.getByLabel(/Email Address/i)).toBeVisible();
      await expect(contactForm.getByLabel(/Inquiry Type/i)).toBeVisible();
      await expect(contactForm.getByLabel(/Message/i)).toBeVisible();
    });

    test('displays contact information section', async ({ page }) => {
      const infoSection = page.locator('section#contact-info');
      await expect(infoSection).toBeVisible();
      await expect(infoSection.getByText(/Email Us/i)).toBeVisible();
      await expect(infoSection.getByText(/Sales Inquiries/i)).toBeVisible();
      await expect(infoSection.getByText(/Office/i)).toBeVisible();
    });

    test('displays FAQ section', async ({ page }) => {
      const faqSection = page.locator('section#faq');
      await expect(faqSection).toBeVisible();
    });

    test('displays map placeholder', async ({ page }) => {
      const mapPlaceholder = page.locator('section#location-map');
      await expect(mapPlaceholder).toBeVisible();
    });
  });

  test.describe('Form Validation and Submission', () => {
    test('shows validation errors for empty required fields', async ({ page }) => {
      const contactForm = page.locator('[data-testid="contact-form"]');
      await page.click('[data-testid="contact-submit"]');

      await expect(contactForm.getByText(/Name is required/i)).toBeVisible();
      await expect(contactForm.getByText(/Email is required/i)).toBeVisible();
      await expect(contactForm.getByText(/Please select an inquiry type/i)).toBeVisible();
      await expect(contactForm.getByText(/Message is required/i)).toBeVisible();
    });

    test('shows error for invalid email format', async ({ page }) => {
      const contactForm = page.locator('[data-testid="contact-form"]');
      await contactForm.locator('input[name="email"]').fill('not-an-email');
      await page.click('[data-testid="contact-submit"]');

      await expect(contactForm.getByText(/Please enter a valid email address/i)).toBeVisible();
    });

    test('successfully submits form and shows success state', async ({ page }) => {
      const contactForm = page.locator('[data-testid="contact-form"]');
      await contactForm.locator('input[name="name"]').fill('John Doe');
      await contactForm.locator('input[name="email"]').fill('john@example.com');
      await contactForm.locator('select[name="inquiryType"]').selectOption('general');
      await contactForm
        .locator('textarea[name="message"]')
        .fill('This is a test message for E2E verification.');

      await page.click('[data-testid="contact-submit"]');

      // Wait for success message (loading state might be too fast to catch reliably)
      await expect(page.getByText(/Thank you!/i)).toBeVisible({ timeout: 5000 });
      await expect(page.getByText(/Your message has been sent successfully/i)).toBeVisible();

      // Test reset
      await page.getByRole('button', { name: /Send another message/i }).click();
      await expect(page.locator('[data-testid="contact-form"]')).toBeVisible();
      await expect(
        page.locator('[data-testid="contact-form"]').getByLabel(/Full Name/i),
      ).toHaveValue('');
    });
  });

  test.describe('Contact Info and Demo Modal', () => {
    test('triggers demo modal when clicking contact cards', async ({ page }) => {
      const infoSection = page.locator('section#contact-info');
      await infoSection.getByText('Sales Inquiries').click();

      const modal = page.locator('[data-testid="modal-content"]');
      await expect(modal).toBeVisible();
      // It currently matches "External Link" category for mailto
      await expect(modal).toContainText(/External Link/i);

      await page.click('[data-testid="modal-close"]');
      await expect(modal).not.toBeVisible();
    });

    test('triggers demo modal when clicking social links', async ({ page }) => {
      const infoSection = page.locator('section#contact-info');
      const twitter = infoSection.getByLabel('Follow us on Twitter');
      await twitter.click();

      const modal = page.locator('[data-testid="modal-content"]');
      await expect(modal).toBeVisible();
      await expect(modal).toContainText(/Social Media Profile/i);
    });
  });

  test.describe('Responsive Behavior', () => {
    test('displays correctly on mobile', async ({ page }) => {
      await page.setViewportSize(viewports.sm);
      await page.reload();
      await page.waitForLoadState('networkidle');

      await expect(page.locator('main h1').first()).toBeVisible();

      // Form should be full width
      const form = page.locator('[data-testid="contact-form"]');

      const boundingBox = await form.boundingBox();
      expect(boundingBox?.width).toBeLessThan(viewports.sm.width);
      expect(boundingBox?.width).toBeGreaterThan(viewports.sm.width * 0.8);
    });
  });
});
