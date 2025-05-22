"use client";

import { useEffect, useState } from 'react';
import BarChart from '../../../components/charts/BarChart';
import { barChartTransformer, type BarChartData } from '../../../lib/transformers/barChartTransformer';

export default function RevenueWidget() {
  console.log('RevenueWidget rendering');
  const [data, setData] = useState<BarChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    console.log('RevenueWidget useEffect running');
    // Using AbortController to handle cleanup of fetch requests
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log('Fetching revenue data...');
        // Add a small artificial delay to demonstrate loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const response = await fetch('/api/bar-chart', { signal });
        
        if (!response.ok) {
          throw new Error(`Error fetching bar chart data: ${response.statusText}`);
        }
        
        const rawData = await response.json();
        console.log('Revenue data received:', rawData);
        setData(barChartTransformer(rawData));
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching bar chart data:', err);
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
    
    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) {
    return <div className="widget-loader">Loading revenue data...</div>;
  }

  if (error) {
    return <div className="widget-error">Failed to load revenue data</div>;
  }

  return <BarChart data={data} />;
}
