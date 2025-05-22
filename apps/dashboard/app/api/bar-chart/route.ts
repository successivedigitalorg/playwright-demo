
export async function GET() {
    const limit = 5;
    
    // Categories that will remain constant
    const categories = ['Research', 'Marketing', 'Sales', 'Development', 'Support', 'HR', 'Finance', 'Operations'];
    
    // Generate dynamic data that changes with each request
    const dynamicData = categories
        .slice(0, Math.min(limit, categories.length))
        .map(category => ({
            category,
            value1: Math.floor(Math.random() * 900) + 100, // Budget: Random value between 100-1000
            value2: Math.floor(Math.random() * 800) + 100, // Actual: Random value between 100-900
        }));
    
    return new Response(JSON.stringify(dynamicData), {
        headers: { 'Content-Type': 'application/json' },
    });
}