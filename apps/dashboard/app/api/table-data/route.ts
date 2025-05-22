
export async function GET() {
    // Product categories
    const categories = ['Electronics', 'Clothing', 'Home Goods', 'Food', 'Books', 'Toys'];
    
    // Product name prefixes
    const productNames = ['Premium', 'Super', 'Ultra', 'Mega', 'Essential', 'Pro', 'Elite'];
    
    // Generate dynamic table data
    const dynamicData = Array.from({ length: 10 }, (_, i) => {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const namePrefix = productNames[Math.floor(Math.random() * productNames.length)];
        const price = Math.floor(Math.random() * 900) + 100; // Between 100 and 999
        const stock = Math.floor(Math.random() * 200); // Between 0 and 199
        const rating = (Math.random() * 3 + 2).toFixed(1); // Between 2.0 and 5.0
        
        return {
            id: i + 1,
            name: `${namePrefix} ${category} Item`,
            category,
            price,
            stock,
            rating,
            status: stock > 50 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'
        };
    });
    
    return new Response(JSON.stringify(dynamicData), {
        headers: { 'Content-Type': 'application/json' },
    });
}