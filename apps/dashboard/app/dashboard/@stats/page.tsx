"use client";

import { useEffect, useState } from 'react';
import TableChart from '../../../components/charts/TableChart';
import { tableTransformer, type TableData } from '../../../lib/transformers/tableTransformer';

export default function StatsWidget() {
  console.log('StatsWidget rendering');
  const [data, setData] = useState<TableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    console.log('StatsWidget useEffect running');
    // Using AbortController to handle cleanup of fetch requests
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log('Fetching stats data...');
        // Add a small artificial delay to demonstrate loading state - staggered to show independent loading
        await new Promise((resolve) => setTimeout(resolve, 2500));
        
        const response = await fetch('/api/table-data', { signal });
        
        if (!response.ok) {
          throw new Error(`Error fetching table data: ${response.statusText}`);
        }
        
        const rawData = await response.json();
        console.log('Stats data received:', rawData);
        setData(tableTransformer(rawData));
        setError(null);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error fetching table data:', err);
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
    return <div className="widget-loader">Loading detailed statistics...</div>;
  }

  if (error) {
    return <div className="widget-error">Failed to load statistics data</div>;
  }

  return <TableChart data={data} />;
}
