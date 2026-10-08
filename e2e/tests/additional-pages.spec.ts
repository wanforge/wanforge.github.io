import { expect, test } from '@playwright/test';
import { selectors, testRoutes } from '../fixtures/test-data';

test.describe('Additional Pages', () => {
  test('Changelog page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.changelog);
    await expect(page).toHaveTitle(/Changelog/i);
    await expect(page.getByRole('heading', { name: /Changelog/i })).toBeVisible();
    await expect(page.getByText(/Stay up to date with the latest features/i)).toBeVisible();

    // Verify timeline entries exist
    const versions = page.locator('text=v1.');
    await expect(versions.first()).toBeVisible();
  });

  test('Roadmap page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.roadmap);
    await expect(page).toHaveTitle(/Roadmap/i);
    await expect(page.getByRole('heading', { name: /Product Roadmap/i })).toBeVisible();

    // Verify roadmap sections exist
    await expect(page.getByText(/In Progress/i).first()).toBeVisible();
    await expect(page.getByText(/Planned/i).first()).toBeVisible();
  });

  test('Privacy Policy page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.privacy);
    await expect(page).toHaveTitle(/Privacy Policy/i);
    await expect(page.getByRole('heading', { name: /Privacy Policy/i })).toBeVisible();
    await expect(page.getByText(/Last Updated:/i)).toBeVisible();

    // Check for Table of Contents
    await expect(page.getByText(/Table of Contents/i)).toBeVisible();
  });

  test('Terms of Service page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.terms);
    await expect(page).toHaveTitle(/Terms of Service/i);
    await expect(page.getByRole('heading', { name: /Terms of Service/i })).toBeVisible();
    await expect(page.getByText(/Last Updated:/i)).toBeVisible();

    // Check for Table of Contents
    await expect(page.getByText(/Table of Contents/i)).toBeVisible();
  });

  test('404 page renders correctly', async ({ page }) => {
    // Go to 404 page explicitly to ensure it renders
    await page.goto('404/');

    await expect(page.getByText('404')).toBeVisible();
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to Home/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Search our site/i)).toBeVisible();
  });

  test('Login mockup page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.login);
    await expect(page).toHaveTitle(/Log In/i);
    await expect(page.getByRole('heading', { name: /Welcome back/i })).toBeVisible();

    // Check for form fields
    await expect(page.locator(selectors.forms.emailInput)).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign in/i })).toBeVisible();

    // Check for social buttons
    await expect(page.getByRole('button', { name: /GitHub/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Google/i })).toBeVisible();
  });

  test('Signup mockup page renders correctly', async ({ page }) => {
    await page.goto(testRoutes.signup);
    await expect(page).toHaveTitle(/Sign Up/i);
    await expect(page.getByRole('heading', { name: /Create an account/i })).toBeVisible();

    // Check for form fields
    await expect(page.locator(selectors.forms.nameInput)).toBeVisible();
    await expect(page.locator(selectors.forms.emailInput)).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();

    // Check for social buttons
    await expect(page.getByRole('button', { name: /GitHub/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Google/i })).toBeVisible();
  });
});
