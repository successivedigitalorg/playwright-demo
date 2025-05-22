"use client";

import { useEffect, useState } from 'react';
import LineChart from '../../../components/charts/LineChart';
import { lineChartTransformer, type LineChartData } from '../../../lib/transformers/lineChartTransformer';

export default function TrendWidget() {
  console.log('TrendWidget rendering');
  const [data, setData] = useState<LineChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    console.log('TrendWidget useEffect running');
    // Using AbortController to handle cleanup of fetch requests
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log('Fetching trend data...');
        // Add a small artificial delay to demonstrate loading state - staggered to show independent loading
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const response = await fetch('/api/line-chart', { signal });
        
        if (!response.ok) {
          throw new Error(`Error fetching line chart data: ${response.statusText}`);
        }
        
        const rawData = await response.json();
        console.log('Trend data received:', rawData);
        setData(lineChartTransformer(rawData));
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching line chart data:', err);
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
    return <div className="widget-loader">Loading trend analysis...</div>;
  }

  if (error) {
    return <div className="widget-error">Failed to load trend data</div>;
  }

  return <LineChart data={data} />;
}
