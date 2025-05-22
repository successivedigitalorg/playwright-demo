// Bar chart data transformer

// Input data type from API
type BarChartRawData = {
  category: string;
  value1: number;
  value2: number;
};

// Output data type for chart component
export type BarChartData = {
  category: string;
  budget: number;
  actual: number;
  difference: number;
};

/**
 * Transforms raw bar chart data into the format expected by the chart component
 * Maps value1 to budget, value2 to actual, and calculates the difference
 */
export const barChartTransformer = (data: BarChartRawData[]): BarChartData[] => {
  return data.map(item => ({
    category: item.category,
    budget: item.value1,
    actual: item.value2,
    difference: item.value1 - item.value2,
  }));
};