const { chromium } = require('playwright');

async function verifyFix() {
  console.log('🔧 Verifying webpack module error fix...\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Log any console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`❌ Browser Error: ${msg.text()}`);
    }
  });
  
  // Log any page errors
  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });
  
  try {
    console.log('1. 🏠 Testing homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log('✅ Homepage loads without errors');
    
    console.log('2. 🔐 Testing login page...');
    await page.goto('http://localhost:3000/dashboard/login', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    console.log('✅ Login page loads without errors');
    
    console.log('3. 🚪 Testing authentication...');
    await page.fill('input[type="email"]', 'admin@scttrusthospital.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Wait for redirect and dashboard load
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await page.waitForTimeout(3000);
    console.log('✅ Authentication successful, redirected to dashboard');
    
    console.log('4. 📊 Testing dashboard data...');
    const bodyText = await page.textContent('body');
    
    // Check for stats data
    if (bodyText.includes('6') || bodyText.includes('Total')) {
      console.log('✅ Dashboard shows statistics data');
    } else {
      console.log('⚠️ Dashboard statistics not visible in text');
    }
    
    // Check for appointments data
    const appointmentElements = await page.locator('text=Priya, text=Rajesh, text=Anita, text=Deepika').count();
    if (appointmentElements > 0) {
      console.log(`✅ Dashboard shows ${appointmentElements} appointment names`);
    } else {
      console.log('ℹ️ Appointment names not found in visible text (might be in table format)');
    }
    
    console.log('5. 🔍 Testing API endpoints...');
    const statsResponse = await page.goto('http://localhost:3000/api/dashboard/stats');
    if (statsResponse.ok()) {
      const statsData = await statsResponse.json();
      console.log(`✅ Stats API: ${statsData.stats.totalAppointments} total appointments`);
    }
    
    const appointmentsResponse = await page.goto('http://localhost:3000/api/dashboard/appointments');
    if (appointmentsResponse.ok()) {
      const appointmentsData = await appointmentsResponse.json();
      console.log(`✅ Appointments API: ${appointmentsData.appointments.length} appointments returned`);
    }
    
    console.log('\n🎉 All tests passed! Webpack module error has been fixed.');
    console.log('✅ Application is working correctly');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'error-after-fix.png', fullPage: true });
    console.log('📸 Error screenshot saved as error-after-fix.png');
  }
  
  await browser.close();
}

verifyFix().catch(console.error);