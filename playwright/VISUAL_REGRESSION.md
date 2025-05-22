# Visual Regression Testing with Playwright

This project implements visual regression testing with Playwright to ensure UI components remain consistent across test runs.

## How It Works

1. **Screenshot Capture**: During test runs, screenshots of UI components are captured.
2. **Baseline Comparison**: These screenshots are compared against baseline images stored in the `playwright/snapshots/` directory.
3. **Visual Difference Detection**: Any visual differences between current screenshots and baselines will cause tests to fail.
4. **Debugging Information**: All screenshots are also saved to `test-results/` for debugging purposes.

## Directory Structure

- `playwright/snapshots/`: Contains baseline screenshots for comparison
  - `charts/`: Component-specific screenshots (bar chart, line chart, table)
  - `/`: Full page screenshots
- `playwright/test-results/`: Contains screenshots from the current test run

## Managing Baseline Images

### Creating Initial Baselines

The first time you run the tests, baseline images will be automatically created if they don't exist. 
You should verify these images look correct before committing them.

### Updating Baselines

When UI changes are intentional, you need to update the baseline images:

1. Run the tests which will fail due to visual differences
2. Verify that the changes are expected by examining the images in `test-results/`
3. Run the snapshot saving script to update baselines:

```bash
./save-snapshots.sh
```

### Customizing Visual Comparison

You can customize the visual comparison settings in `playwright.config.ts`:

```typescript
expect: {
  toHaveScreenshot: {
    maxDiffPixels: 100, // Allow up to 100 pixels to be different
    threshold: 0.2,     // Pixel RGB difference threshold (0-1)
  }
}
```

## Running Tests

```bash
cd playwright
npx playwright test
```

## Best Practices

1. **Consistent Test Data**: Use API mocking to ensure consistent data in charts
2. **Stable Elements**: Wait for elements to be fully rendered before capturing screenshots
3. **Platform Consistency**: Run visual comparison tests in the same environment (OS, browser)
4. **Small Comparisons**: Prefer comparing individual components rather than full pages
5. **Commit Baselines**: Baseline images should be committed to your version control system
