// Table data transformer

// Input data type from API
type TableRawData = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: string | number;
  status?: string;
};

// Output data type for table component
export type TableData = {
  id: number;
  product: string; // renamed from 'name' for amCharts
  category: string;
  price: string;
  quantity: number; // added for amCharts display
  stock: number;
  rating: string;
  status: string;
};

/**
 * Transforms raw table data into the format expected by the table component
 * Formats price as currency, ensures rating has consistent format
 * and adds status based on stock level if not already present
 */
export const tableTransformer = (data: TableRawData[]): TableData[] => {
  return data.map(item => {
    // Format the price as currency
    const formattedPrice = `$${item.price.toFixed(2)}`;
    
    // Ensure rating is formatted as a string with /5
    const formattedRating = typeof item.rating === 'number'
      ? `${item.rating}/5`
      : item.rating.toString();
    
    // Determine status based on stock if not already provided
    const status = item.status || (
      item.stock > 50 ? 'In Stock' : item.stock > 0 ? 'Low Stock' : 'Out of Stock'
    );
    
    return {
      id: item.id,
      product: item.name, // renamed for amCharts
      category: item.category,
      price: formattedPrice,
      quantity: item.stock, // for chart display
      stock: item.stock,
      rating: formattedRating,
      status
    };
  });
};