export async function GET() {
    const dataPoints = 6; // Number of data points to generate
    
    const today = new Date();
    const dates = Array.from({ length: dataPoints }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (dataPoints - 1) + i);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });
    
    // Generate dynamic data with three series
    let visitsBase = 30;
    let viewsBase = 50;
    let salesBase = 10;
    
    const dynamicData = dates.map(date => {
        // Create slightly different trends for each metric
        visitsBase += Math.floor(Math.random() * 10) - 3;
        viewsBase += Math.floor(Math.random() * 15) - 5;
        salesBase += Math.floor(Math.random() * 5) - 2;
        
        // Ensure values don't go too low
        visitsBase = Math.max(visitsBase, 15);
        viewsBase = Math.max(viewsBase, 30);
        salesBase = Math.max(salesBase, 5);
        
        return {
            date,
            visits: visitsBase,
            views: viewsBase,
            sales: salesBase
        };
    });
    
    return new Response(JSON.stringify(dynamicData), {
        headers: { 'Content-Type': 'application/json' },
    });
}