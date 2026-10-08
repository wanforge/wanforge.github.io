import { expect, test } from '@playwright/test';

test('Indonesian and English landing pages expose WanForge services', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sistem digital yang siap bekerja.' })).toBeVisible();
  await expect(page.getByText('AI & Otomasi')).toBeVisible();

  await page.goto('/en/');
  await expect(page.getByRole('heading', { name: 'Digital systems ready to work.' })).toBeVisible();
  await expect(page.getByText('AI & Automation')).toBeVisible();
});
