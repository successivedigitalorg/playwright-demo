# Dashboard Testing with Playwright

This project demonstrates how to use Playwright to test a dashboard application with multiple charts. The tests showcase how to:

1. Intercept API calls and provide mock data
2. Transform data using the same transformers as the application
3. Verify chart rendering
4. Compare expected data with what's displayed on the UI

This testing setup is maintained in a dedicated `/playwright` folder to keep it separate from the application code.

## Test Overview

The tests cover four main components of the dashboard:

1. **Area Chart**: Tests the area chart component by intercepting the API call to `/api/area-chart` and providing mock visit/view data.
2. **Bar Chart**: Tests the bar chart component by intercepting the API call to `/api/bar-chart` and providing mock budget data.
3. **Line Chart**: Tests the line chart component by intercepting the API call to `/api/line-chart` and providing mock time-series data.
4. **Data Table**: Tests the table component by intercepting the API call to `/api/table-data` and providing mock product data.

For each test, we:
- Intercept the API call and provide consistent mock data
- Wait for the component to render
- Take a screenshot for visual comparison
- Verify the data transformation is correct
- Verify the component has rendered (by checking for SVG elements or table rows)

## Running the Tests

Before running the tests, make sure the dashboard application is running locally:

```bash
# From the project root
npm run dev
```

Then run the Playwright tests:

```bash
# From the project root
npm run test:e2e
```

To run tests with the Playwright UI:

```bash
npm run test:e2e:ui
```

To debug tests:

```bash
npm run test:e2e:debug
```

To see test results with screenshots:

```bash
npm run report
```

## Testing Strategy

### Data Interception

The tests intercept API calls using Playwright's route interception capabilities:

```typescript
await page.route('**/api/area-chart', async route => {
  const mockData = [
    // Mock data matching the expected API response format
  ];
  
  await route.fulfill({ 
    status: 200, 
    contentType: 'application/json',
    body: JSON.stringify(mockData)
  });
});
```

### Data Transformation Verification

The tests import and use the same transformer functions that the application uses:

```typescript
const transformedData = areaChartTransformer(mockData);
expect(transformedData[0].totalEngagement).toBe(250); // 100 visits + 150 views
```

### Visual Verification

Each test captures a screenshot for visual comparison:

```typescript
await page.screenshot({ path: 'test-results/area-chart.png', fullPage: false });
```

### Chart Rendering Verification

For charts rendered using amCharts, we verify that SVG elements have been created:

```typescript
const svgExists = await page.evaluate(() => {
  const chartDiv = document.querySelector('#area-chart-div');
  return chartDiv && chartDiv.querySelector('svg') !== null;
});
expect(svgExists).toBeTruthy();
```

## Customizing the Tests

To customize the tests:

1. Update the mock data in each test case to match your expected scenarios
2. Adjust the selectors if your dashboard uses different IDs or data-testid attributes
3. Modify the assertions based on your specific business rules

## Folder Structure

```
playwright/
├── playwright.config.ts     # Dedicated Playwright config for e2e tests
├── README.md                # This file
└── tests/
    ├── dashboard.spec.ts    # Dashboard component tests
    └── example.spec.ts      # Example/navigation tests
```

## License

This project is licensed under the MIT License.