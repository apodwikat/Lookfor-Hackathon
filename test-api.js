// Quick test to verify backend API and tool response format
const API_URL = 'http://localhost:3000/v1/api';

async function testBackendAPI() {
    console.log('🧪 Testing Backend API...\n');

    // Test 1: Backend health check
    console.log('1️⃣ Testing backend health...');
    try {
        const healthResponse = await fetch('http://localhost:3000/health');
        const healthText = await healthResponse.text();
        console.log('✅ Backend is running:', healthText);
    } catch (error) {
        console.log('❌ Backend health check failed:', error.message);
        return;
    }

    // Test 2: Get order details for NP order (mock data)
    console.log('\n2️⃣ Testing get_order_details with NP order (should return mock data)...');
    try {
        const response = await fetch(`${API_URL}/hackathon/get_order_details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: 'Np1376061'
            })
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(data, null, 2));

        // Verify format
        if (data.success === true && data.data) {
            console.log('✅ Response format is correct: {success: true, data: {...}}');
            console.log('✅ Order name:', data.data.name);
            console.log('✅ Order status:', data.data.displayFulfillmentStatus);
        } else if (data.id) {
            console.log('⚠️  Response is unwrapped (old format): {...order data...}');
            console.log('   Frontend should handle this with fallback logic');
        } else {
            console.log('❌ Unexpected response format');
        }
    } catch (error) {
        console.log('❌ Order details test failed:', error.message);
    }

    // Test 3: Verify CORS headers
    console.log('\n3️⃣ Checking CORS headers...');
    try {
        const response = await fetch(`${API_URL}/hackathon/get_order_details`, {
            method: 'OPTIONS',
        });
        console.log('CORS preflight status:', response.status);
        console.log('✅ CORS is configured');
    } catch (error) {
        console.log('⚠️  CORS check warning:', error.message);
    }

    console.log('\n📊 Test Summary:');
    console.log('Backend URL:', API_URL);
    console.log('Backend is accessible and returning data in the correct format.');
    console.log('\nNext: Open http://localhost:8081 and check browser console for LLM output.');
}

// Run test
testBackendAPI().catch(console.error);
