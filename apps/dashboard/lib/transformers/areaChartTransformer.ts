// Area chart data transformer

// Input data type from API
type AreaChartRawData = {
  date: string;
  visits: number;
  views: number;
  sales: number;
};

// Output data type for chart component
export type AreaChartData = {
  date: string; // Using string format for amCharts
  visits: number;
  views: number;
  sales: number;
  totalEngagement: number;
  visitsPercentage: number;
};

/**
 * Transforms raw area chart data into the format expected by the chart component
 * Keeps date as strings for amCharts and adds calculated fields
 */
export const areaChartTransformer = (data: AreaChartRawData[]): AreaChartData[] => {
  const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);
  
  return data.map(item => {
    const totalEngagement = item.visits + item.views;
    
    return {
      date: item.date, // Keep as string for amCharts
      visits: item.visits,
      views: item.views,
      sales: item.sales,
      totalEngagement,
      visitsPercentage: totalVisits > 0 ? (item.visits / totalVisits) * 100 : 0,
    };
  });
};