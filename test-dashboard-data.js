const { chromium } = require('playwright');

async function testDashboardData() {
  console.log('🚀 Starting dashboard data verification test...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Enable console logging
  page.on('console', msg => {
    console.log(`🌐 Browser Console [${msg.type()}]:`, msg.text());
  });
  
  // Log network requests
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log(`📡 API Request: ${request.method()} ${request.url()}`);
    }
  });
  
  page.on('response', response => {
    if (response.url().includes('/api/')) {
      console.log(`📨 API Response: ${response.status()} ${response.url()}`);
    }
  });
  
  try {
    // Navigate to login page
    console.log('1. 🏠 Navigating to login page...');
    await page.goto('http://localhost:3000/dashboard/login');
    await page.waitForSelector('form', { timeout: 10000 });
    
    // Login
    console.log('2. 🔐 Attempting login...');
    await page.fill('input[type="email"]', 'admin@scttrusthospital.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard redirect and load
    console.log('3. 📊 Waiting for dashboard to load...');
    await page.waitForURL('**/dashboard', { timeout: 15000 });
    await page.waitForSelector('[data-testid="stats"], .stats, .grid', { timeout: 10000 });
    
    // Wait for API calls to complete
    await page.waitForTimeout(3000);
    
    // Check for stats cards
    console.log('4. 📈 Checking dashboard statistics...');
    const statsCards = await page.locator('[data-testid="total-appointments"], .stat-card, .stats > div').count();
    console.log(`   Found ${statsCards} stats cards`);
    
    // Get stats values
    const statsText = await page.textContent('body');
    const totalMatch = statsText.match(/(\d+).*[Tt]otal.*[Aa]ppointments?|[Tt]otal.*[Aa]ppointments?.*?(\d+)/);
    const todayMatch = statsText.match(/(\d+).*[Tt]oday|[Tt]oday.*?(\d+)/);
    
    if (totalMatch) {
      const total = totalMatch[1] || totalMatch[2];
      console.log(`   📊 Total appointments: ${total}`);
    }
    
    if (todayMatch) {
      const today = todayMatch[1] || todayMatch[2];
      console.log(`   📅 Today's appointments: ${today}`);
    }
    
    // Check for appointments table/list
    console.log('5. 📋 Checking appointments data...');
    const appointmentRows = await page.locator('tr, .appointment-item, .appointment-card').count();
    console.log(`   Found ${appointmentRows} appointment rows/items`);
    
    // Look for specific appointment data
    const appointmentNames = await page.locator('text=Priya Sharma, text=Rajesh Kumar, text=Anita Patel').count();
    console.log(`   Found ${appointmentNames} sample appointment names`);
    
    // Check API responses in network tab
    console.log('6. 🔍 Checking API endpoints...');
    
    // Test stats API directly
    const statsResponse = await page.goto('http://localhost:3000/api/dashboard/stats');
    const statsData = await statsResponse.json();
    console.log('   Stats API Response:', JSON.stringify(statsData, null, 2));
    
    // Test appointments API directly
    await page.goto('http://localhost:3000/dashboard');
    await page.waitForTimeout(2000);
    
    const appointmentsResponse = await page.goto('http://localhost:3000/api/dashboard/appointments');
    const appointmentsData = await appointmentsResponse.json();
    console.log('   Appointments API Response (first 2):');
    if (appointmentsData.appointments) {
      appointmentsData.appointments.slice(0, 2).forEach((apt, i) => {
        console.log(`     ${i+1}. ${apt.name} - ${apt.service} (${apt.status})`);
      });
    }
    
    // Final verification
    console.log('\n✅ Dashboard data test completed!');
    console.log(`   - Stats cards: ${statsCards}`);
    console.log(`   - Appointment rows: ${appointmentRows}`);
    console.log(`   - Sample names found: ${appointmentNames}`);
    
    if (appointmentsData?.appointments?.length > 0) {
      console.log(`   - API returned ${appointmentsData.appointments.length} appointments`);
      console.log('   ✅ Dashboard should be showing data now!');
    } else {
      console.log('   ❌ No appointments returned from API');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Capture screenshot on error
    await page.screenshot({ 
      path: 'dashboard-error.png', 
      fullPage: true 
    });
    console.log('📸 Error screenshot saved as dashboard-error.png');
  }
  
  await browser.close();
}

testDashboardData().catch(console.error);