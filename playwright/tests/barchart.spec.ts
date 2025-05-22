import { test, expect } from '@playwright/test';

// Test for the bar chart visualization with visual regression testing
test('should render bar chart correctly', async ({ page }) => {
  // Set up route interception with consistent mock data
  await page.route('**/api/bar-chart', async (route) => {
    const mockData = [
      { category: 'Research', value1: 800, value2: 800 },
      { category: 'Marketing', value1: 150, value2: 150 },
      { category: 'Sales', value1: 200, value2: 650 },
      { category: 'Development', value1: 800, value2: 700 },
      { category: 'Support', value1: 400, value2: 350 },
    ];

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockData),
    });
  });
  
  // Navigate to the dashboard page
  await page.goto('http://localhost:3000/dashboard', { timeout: 60000 });
  await page.waitForLoadState('networkidle');
  
  // Wait for the bar chart container to be ready
  await page.waitForSelector('#bar-chart-div', {
    state: 'attached',
    timeout: 30000,
  });
  
  // Give time for chart to fully render
  await page.waitForTimeout(5000);
  
  // Wait for chart rendering to complete (either canvas or SVG)
  await page.waitForFunction(() => {
    const chartDiv = document.querySelector('#bar-chart-div');
    if (!chartDiv) return false;
    
    const htmlDiv = chartDiv as HTMLElement;
    const hasCanvas = chartDiv.querySelectorAll('canvas').length > 0;
    const hasSvg = chartDiv.querySelectorAll('svg').length > 0;
    const hasSize = htmlDiv.offsetWidth > 0 && htmlDiv.offsetHeight > 0;
    
    return (hasCanvas || hasSvg) && hasSize;
  }, { timeout: 15000 });

  // Take a screenshot and compare with baseline
  try {
    // Ensure element is visible
    const isVisible = await page.locator('#bar-chart-div').isVisible();
    if (!isVisible) {
      await page.locator('#bar-chart-div').scrollIntoViewIfNeeded();
    }

    // Stabilize the chart by disabling animations
    await page.evaluate(() => {
      const root = document.querySelector('#bar-chart-div');
      if (root) {
        const style = document.createElement('style');
        style.innerHTML = `
          #bar-chart-div * {
            animation: none !important;
            transition: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    });
    
    // Save debug screenshot
    await page.locator('#bar-chart-div').screenshot({
      path: 'test-results/bar-chart-debug.png',
      timeout: 5000
    });
    
    // Verify chart has rendered properly
    const hasRendered = await page.evaluate(() => {
      const chartDiv = document.querySelector('#bar-chart-div');
      return chartDiv && chartDiv.querySelectorAll('canvas').length > 0;
    });
    
    if (hasRendered) {
      // Compare with baseline using strict settings
      await expect(page.locator('#bar-chart-div')).toHaveScreenshot('charts/bar-chart.png', {
        timeout: 10000,
        maxDiffPixels: 0,
        threshold: 0.01,
        animations: 'disabled'
      });
    } else {
      throw new Error('Chart has not rendered properly with canvas elements');
    }
  } catch (error) {
    // Save current state for debugging
    await page.locator('#bar-chart-div').screenshot({
      path: 'test-results/bar-chart-current.png',
    });
    throw error;
  }
});
