# Next.js Dashboard Monorepo

This project is a monorepo setup for a Next.js application that features a dashboard with various charts built using amCharts. The dashboard includes four types of visualizations: a bar chart, a line chart, an area chart, and a table. Each chart fetches data from dedicated API routes and applies specific transformations to the data before rendering.

The project also includes comprehensive end-to-end tests using Playwright to validate the dashboard's functionality, data transformations, and visual rendering.

## Project Structure

The project is organized as follows:

```
nextjs-dashboard-monorepo
├── apps
│   └── dashboard
│       ├── app
│       │   ├── api
│       │   │   ├── bar-chart
│       │   │   │   └── route.ts
│       │   │   ├── line-chart
│       │   │   │   └── route.ts
│       │   │   ├── area-chart
│       │   │   │   └── route.ts
│       │   │   └── table-data
│       │   │       └── route.ts
├── playwright                    # End-to-end testing with Playwright
│   ├── playwright.config.ts      # Dedicated Playwright config
│   ├── README.md                 # Testing documentation
│   └── tests                     # Test files
│       ├── dashboard.spec.ts     # Dashboard component tests
│       └── example.spec.ts       # Example/navigation tests
│       │   ├── dashboard
│       │   │   └── page.tsx
│       │   ├── favicon.ico
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components
│       │   ├── charts
│       │   │   ├── AreaChart.tsx
│       │   │   ├── BarChart.tsx
│       │   │   ├── LineChart.tsx
│       │   │   └── TableChart.tsx
│       │   ├── dashboard
│       │   │   ├── DashboardLayout.tsx
│       │   │   └── DashboardHeader.tsx
│       │   └── ui
│       │       ├── Button.tsx
│       │       ├── Card.tsx
│       │       └── Container.tsx
│       ├── lib
│       │   ├── transformers
│       │   │   ├── areaChartTransformer.ts
│       │   │   ├── barChartTransformer.ts
│       │   │   ├── lineChartTransformer.ts
│       │   │   └── tableTransformer.ts
│       │   └── utils.ts
│       ├── public
│       │   └── next.svg
│       ├── next.config.js
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── package.json
├── turbo.json
└── README.md
```

## Features

- **API Endpoints**: Four API routes provide raw data for each chart type.
- **Data Transformation**: Each chart has a dedicated transformer function to format the data appropriately.
- **Responsive Design**: The dashboard is designed to be responsive and user-friendly.
- **Reusable Components**: The project utilizes reusable components for charts and UI elements.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nextjs-dashboard-monorepo
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Testing

The project uses Playwright for end-to-end testing. All tests are located in the dedicated `playwright` folder to keep them separate from the application code.

### Running Tests

1. Make sure the dashboard application is running locally:

```bash
npm run dev
```

2. Run the Playwright tests:

```bash
npm run test:e2e
```

### Additional Testing Commands

- Run tests with the Playwright UI:
```bash
npm run test:e2e:ui
```

- Debug tests:
```bash
npm run test:e2e:debug
```

- View test reports:
```bash
npm run report
```

For more detailed information about the testing approach and implementation, see the [Playwright README](./playwright/README.md).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.