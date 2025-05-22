"use client";

import React, { useLayoutEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { LineChartData } from '../../lib/transformers/lineChartTransformer';

type LineChartProps = {
  data: LineChartData[];
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
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

    // Create series
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );
    
    series.strokes.template.setAll({
      strokeWidth: 3,
      stroke: am5.color(0x4F46E5)
    });

    // Add bullet
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(0x4F46E5)
        })
      });
    });

    // Set data
    series.data.setAll(data);

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    
    // Chart initialization is complete
    console.log('Line chart initialized');

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [data]);

  return <div id="line-chart-div" ref={chartDivRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineChart;