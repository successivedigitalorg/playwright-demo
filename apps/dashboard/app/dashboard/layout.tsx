"use client";

import React from 'react';
import Container from '../../components/ui/Container';

// Define the layout types correctly for parallel routes
interface DashboardLayoutProps {
  children: React.ReactNode;
  revenue: React.ReactNode;
  trend: React.ReactNode;
  growth: React.ReactNode;
  stats: React.ReactNode;
}

export default function DashboardLayout({
  children,
  revenue,
  trend,
  growth,
  stats
}: DashboardLayoutProps) {
  // Console log to verify that the slots are being recognized
  console.log('Dashboard layout rendering with slots:', {
    hasRevenueSlot: !!revenue,
    hasTrendSlot: !!trend,
    hasGrowthSlot: !!growth,
    hasStatsSlot: !!stats
  });
  
  return (
    <Container>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Analytics Dashboard</h1>
        <p className="dashboard-subtitle">Track your key performance metrics in real-time</p>
      </div>
      
      <div className="dashboard-layout">
        <div className="card revenue-card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Revenue Overview</h2>
          <div className="chart-container">
            {revenue}
          </div>
        </div>
        <div className="card trend-card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Trend Analysis</h2>
          <div className="chart-container">
            {trend}
          </div>
        </div>
        <div className="card growth-card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Growth Metrics</h2>
          <div className="chart-container">
            {growth}
          </div>
        </div>
        <div className="card stats-card">
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Detailed Statistics</h2>
          <div className="chart-container">
            {stats}
          </div>
        </div>
      </div>
      
      {children}
    </Container>
  );
}
