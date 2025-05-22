import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  // Simple test to verify test discovery
  await page.goto('http://localhost:3000');
  console.log('Basic test running - verifying test discovery');
  expect(1).toBe(1);
});
