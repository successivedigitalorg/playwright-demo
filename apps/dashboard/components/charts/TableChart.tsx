"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { TableData } from '../../lib/transformers/tableTransformer';

type TableChartProps = {
  data: TableData[];
};

const TableChart: React.FC<TableChartProps> = ({ data }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!data?.length || !tableRef.current) return;
    
    // Get headers from the first data item
    const headers = Object.keys(data[0]).filter(key => !['id', 'quantity'].includes(key));
    
    const tableHTML = `
      <div class="table-header">
        <h3>Product Data</h3>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              ${headers.map(header => `
                <th>
                  ${header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${headers.map(header => `
                  <td>
                    ${header === 'status' ? `
                      <span class="status-badge ${row.status.toLowerCase().replace(/\s+/g, '-')}">
                        ${row.status}
                      </span>
                    ` : String(row[header as keyof typeof row])}
                  </td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    tableRef.current.innerHTML = tableHTML;
    
    // Table initialization is complete
    console.log('Table chart initialized');
    
    return () => {
      if (tableRef.current) {
        tableRef.current.innerHTML = '';
      }
    };
  }, [data]);

  return <div id="table-chart" ref={tableRef} className="table-chart" />;
};

export default TableChart;