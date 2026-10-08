import { expect, test } from '@playwright/test';
import { selectors, testRoutes } from '../fixtures/test-data';

test.describe.configure({ mode: 'serial' });

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Add a small delay to ensure hydration
    await page.waitForTimeout(500);
  });

  test.describe('Contact Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(testRoutes.contact);
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.click(selectors.forms.contactSubmit, { force: true });

      await expect(page.getByText(/name is required/i)).toBeVisible({ timeout: 10000 });
      await expect(page.getByText(/email is required/i)).toBeVisible();
      await expect(page.getByText(/please select an inquiry type/i)).toBeVisible();
      await expect(page.getByText(/message is required/i)).toBeVisible();
    });

    test('should show validation error for invalid email', async ({ page }) => {
      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="email"]', 'invalid-email');
      await page.selectOption('select[name="inquiryType"]', 'general');
      await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

      await page.click(selectors.forms.contactSubmit, { force: true });

      const errors = page.locator(selectors.forms.error);
      await expect(errors).toHaveCount(1, { timeout: 10000 });
      await expect(errors).toHaveText(/please enter a valid email address/i);
    });

    test('should show validation error for short message', async ({ page }) => {
      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.selectOption('select[name="inquiryType"]', 'general');
      await page.fill('textarea[name="message"]', 'Short');

      await page.click(selectors.forms.contactSubmit);

      const errors = page.locator(selectors.forms.error);
      await expect(errors).toHaveCount(1);
      await expect(errors).toHaveText(/message must be at least 10 characters/i);
    });

    test('should show success state after valid submission', async ({ page }) => {
      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.selectOption('select[name="inquiryType"]', 'general');
      await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

      await page.click(selectors.forms.contactSubmit);

      // Should show loading state (aria-busy="true")
      await expect(page.locator(selectors.forms.contactSubmit)).toHaveAttribute(
        'aria-busy',
        'true',
      );

      // Should show success message
      await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 10000 });
      await expect(page.getByText(/message has been sent successfully/i)).toBeVisible();
    });
  });

  test.describe('Newsletter Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(testRoutes.blog);
      // Scroll to newsletter form to trigger hydration
      await page.locator(selectors.forms.newsletter).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
    });

    test('should show validation error for empty email', async ({ page }) => {
      const form = page.locator(selectors.forms.newsletter).first();
      await form.locator(selectors.forms.newsletterSubmit).click({ force: true });

      const error = form.locator(selectors.forms.error);
      await expect(error).toBeVisible({ timeout: 10000 });
      await expect(error).toHaveText(/email is required/i);
    });

    test('should show validation error for invalid email', async ({ page }) => {
      const form = page.locator(selectors.forms.newsletter).first();
      await form.locator(selectors.forms.emailInput).fill('invalid-email');
      await form.locator(selectors.forms.newsletterSubmit).click({ force: true });

      const error = form.locator(selectors.forms.error);
      await expect(error).toBeVisible({ timeout: 10000 });
      await expect(error).toHaveText(/please enter a valid email address/i);
    });

    test('should show success state after valid subscription', async ({ page }) => {
      const form = page.locator(selectors.forms.newsletter).first();
      await form.locator(selectors.forms.emailInput).fill('john@example.com');
      await form.locator(selectors.forms.newsletterSubmit).click({ force: true });

      // Should show success message
      await expect(page.getByText(/thanks for subscribing/i)).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Login Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(testRoutes.login);
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.click(selectors.forms.loginSubmit, { force: true });

      const errors = page.locator(selectors.forms.error);
      await expect(errors).toHaveCount(2, { timeout: 10000 }); // Email, Password
      await expect(errors.nth(0)).toHaveText(/email is required/i);
      await expect(errors.nth(1)).toHaveText(/password is required/i);
    });

    test('should show validation error for invalid email', async ({ page }) => {
      await page.fill('input[name="email"]', 'invalid-email');
      await page.fill('input[name="password"]', 'password123');
      await page.click(selectors.forms.loginSubmit);

      const error = page.locator(selectors.forms.error);
      await expect(error).toHaveCount(1);
      await expect(error).toHaveText(/please enter a valid email address/i);
    });

    test('should show validation error for short password', async ({ page }) => {
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="password"]', 'short');
      await page.click(selectors.forms.loginSubmit);

      const error = page.locator(selectors.forms.error);
      await expect(error).toHaveCount(1);
      await expect(error).toHaveText(/password must be at least 8 characters/i);
    });
  });

  test.describe('Signup Form', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(testRoutes.signup);
    });

    test('should show validation errors for empty fields', async ({ page }) => {
      await page.click(selectors.forms.signupSubmit, { force: true });

      const errors = page.locator(selectors.forms.error);
      // Name, Email, Password, Terms
      await expect(errors).toHaveCount(4, { timeout: 10000 });
      await expect(errors.nth(0)).toHaveText(/full name is required/i);
      await expect(errors.nth(1)).toHaveText(/email is required/i);
      await expect(errors.nth(2)).toHaveText(/password is required/i);
      await expect(errors.nth(3)).toHaveText(/you must accept the terms/i);
    });

    test('should show validation error for short password', async ({ page }) => {
      await page.fill('input[name="name"]', 'John Doe');
      await page.fill('input[name="email"]', 'john@example.com');
      await page.fill('input[name="password"]', 'short');
      await page.check('input[name="acceptTerms"]');
      await page.click(selectors.forms.signupSubmit);

      const error = page.locator(selectors.forms.error);
      await expect(error).toHaveCount(1);
      await expect(error).toHaveText(/password must be at least 8 characters/i);
    });
  });
});
