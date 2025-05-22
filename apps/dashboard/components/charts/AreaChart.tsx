"use client";

import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { AreaChartData } from '../../lib/transformers/areaChartTransformer';

// Import needed chart types

type AreaChartProps = {
  data: AreaChartData[];
};

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
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
        panX: true,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
      })
    );

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "date",
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

    // Create visits series
    const visitsSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Visits",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        categoryXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Visits: {valueY}"
        }),
        stroke: am5.color(0x8B5CF6)
      })
    );

    // Add fill to the line series to make it look like an area chart
    visitsSeries.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
      fill: am5.color(0x8B5CF6)
    });

    visitsSeries.data.setAll(data);

    // Create views series
    const viewsSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Views",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "views",
        categoryXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "Views: {valueY}"
        }),
        stroke: am5.color(0x4F46E5)
      })
    );

    // Add fill to the line series to make it look like an area chart
    viewsSeries.fills.template.setAll({
      fillOpacity: 0.5,
      visible: true,
      fill: am5.color(0x4F46E5)
    });

    viewsSeries.data.setAll(data);

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    legend.data.setAll(chart.series.values);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    // Chart initialization is complete
    console.log('Area chart initialized');

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [data]);

  return <div id="area-chart-div" ref={chartDivRef} style={{ width: '100%', height: '100%' }} />;
};

export default AreaChart;