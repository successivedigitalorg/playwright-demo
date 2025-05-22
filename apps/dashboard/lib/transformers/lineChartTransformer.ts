// Line chart data transformer

// Input data type from API
type LineChartRawData = {
  date: string;
  value: number;
};

// Output data type for chart component
export type LineChartData = {
  date: string; // Using string format for amCharts
  value: number;
  formattedValue: string;
};

/**
 * Transforms raw line chart data into the format expected by the chart component
 * Formats date strings for amCharts and formats values for display
 */
export const lineChartTransformer = (data: LineChartRawData[]): LineChartData[] => {
  return data.map(item => ({
    date: item.date, // Keep as string for amCharts
    value: item.value,
    formattedValue: new Intl.NumberFormat('en-US').format(item.value),
  }));
};