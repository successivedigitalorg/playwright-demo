"use client";

import { useEffect, useState } from 'react';
import AreaChart from '../../../components/charts/AreaChart';
import { areaChartTransformer, type AreaChartData } from '../../../lib/transformers/areaChartTransformer';

export default function GrowthWidget() {
  console.log('GrowthWidget rendering');
  const [data, setData] = useState<AreaChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    console.log('GrowthWidget useEffect running');
    // Using AbortController to handle cleanup of fetch requests
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log('Fetching growth data...');
        // Add a small artificial delay to demonstrate loading state - staggered to show independent loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const response = await fetch('/api/area-chart', { signal });
        
        if (!response.ok) {
          throw new Error(`Error fetching area chart data: ${response.statusText}`);
        }
        
        const rawData = await response.json();
        console.log('Growth data received:', rawData);
        setData(areaChartTransformer(rawData));
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching area chart data:', err);
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
    return <div className="widget-loader">Loading growth metrics...</div>;
  }

  if (error) {
    return <div className="widget-error">Failed to load growth data</div>;
  }

  return <AreaChart data={data} />;
}
