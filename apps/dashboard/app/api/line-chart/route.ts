// filepath: /Users/anilchauhan/Documents/projects/gen-ai-testing/playwright-demo/nextjs-dashboard-monorepo/apps/dashboard/app/api/line-chart/route.ts

export async function GET() {
    const dataPoints = 7;
    
    const today = new Date();
    const labels = Array.from({ length: dataPoints }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - (dataPoints - 1) + i);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    });
    
    // Generate dynamic data with a realistic trend
    let baseValue = Math.floor(Math.random() * 50) + 30; // Start between 30-80
    const dynamicData = labels.map(date => {
        // Add some random variation to create a natural-looking trend
        baseValue += Math.floor(Math.random() * 20) - 8; // Random change between -8 and +12
        baseValue = Math.max(baseValue, 10); // Don't go below 10
        
        return {
            date,
            value: baseValue
        };
    });
    
    return new Response(JSON.stringify(dynamicData), {
        headers: { 'Content-Type': 'application/json' },
    });
}