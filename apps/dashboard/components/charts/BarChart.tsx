"use client";

import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { BarChartData } from '../../lib/transformers/barChartTransformer';

type BarChartProps = {
  data: BarChartData[];
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<am5.Root | null>(null);
  const chartDivRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Only create chart if we have data and the div is available
    if (!data?.length || !chartDivRef.current) return;
    
    // Dispose of old chart if it exists
    if (chartRef.current) {
      chartRef.current.dispose();
    }

    // Create new chart
    const root = am5.Root.new(chartDivRef.current);
    chartRef.current = root;

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        paddingRight: 20
      })
    );
    
    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );
    
    xAxis.data.setAll(data);
    
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    // Create budget series
    const budgetSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Budget",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "budget",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Budget: {valueY}"
        })
      })
    );
    
    budgetSeries.columns.template.setAll({
      fillOpacity: 0.8,
      strokeOpacity: 0,
      fill: am5.color(0x2b70e4)
    });
    
    budgetSeries.data.setAll(data);
    
    // Create actual series
    const actualSeries = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Actual",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "actual",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Actual: {valueY}"
        })
      })
    );
    
    actualSeries.columns.template.setAll({
      fillOpacity: 0.8,
      strokeOpacity: 0,
      fill: am5.color(0x65b7f3)
    });
    
    actualSeries.data.setAll(data);
    
    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    
    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, [data]);

  return <div id="bar-chart-div" ref={chartDivRef} style={{ width: "100%", height: "400px" }} />;
};

export default BarChart;