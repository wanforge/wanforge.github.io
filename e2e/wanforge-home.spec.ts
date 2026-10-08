import { expect, test } from '@playwright/test';

test('Indonesian and English landing pages expose WanForge services', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Sistem digital yang siap bekerja.' }),
  ).toBeVisible();
  await expect(page.getByText('AI & Otomasi')).toBeVisible();
  await page.screenshot({ path: 'e2e/test-results/desktop-id.png' });

  await page.goto('/en/');
  await expect(
    page.getByRole('heading', { name: 'Digital systems ready to work.' }),
  ).toBeVisible();
  await expect(page.getByText('AI & Automation')).toBeVisible();
  await page.screenshot({ path: 'e2e/test-results/desktop-en.png' });
});

test('Mobile viewport captures WanForge landing', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Sistem digital yang siap bekerja.' }),
  ).toBeVisible();
  await page.screenshot({ path: 'e2e/test-results/mobile-id.png' });
});
