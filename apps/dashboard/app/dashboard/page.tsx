"use client";

import { useEffect } from 'react';

export default function DashboardPage() {
  useEffect(() => {
    // Add log to verify the page is loading correctly
    console.log('Dashboard page loaded');
  }, []);
  
  // This is just a placeholder since our main content is in parallel routes
  return null;
}