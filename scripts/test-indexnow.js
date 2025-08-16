#!/usr/bin/env node

/**
 * IndexNow Integration Test Script
 * Tests the IndexNow API endpoints and verifies proper setup
 */

const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://dramitashukla.com' 
  : 'http://localhost:3000';

console.log('🧪 Testing IndexNow Integration');
console.log('===============================');

async function testKeyFile() {
  console.log('\n1. Testing key file accessibility...');
  try {
    const response = await fetch(`${BASE_URL}/55a5521d0a6846b693720dc0c7ba3e4e.txt`);
    const content = await response.text();
    
    if (response.ok && content.trim() === '55a5521d0a6846b693720dc0c7ba3e4e') {
      console.log('✅ Key file is accessible and contains correct key');
      return true;
    } else {
      console.log('❌ Key file issue:', { status: response.status, content });
      return false;
    }
  } catch (error) {
    console.log('❌ Key file test failed:', error.message);
    return false;
  }
}

async function testApiStatus() {
  console.log('\n2. Testing IndexNow API status...');
  try {
    const response = await fetch(`${BASE_URL}/api/indexnow`);
    const data = await response.json();
    
    if (response.ok && data.service === 'IndexNow Integration') {
      console.log('✅ IndexNow API is operational');
      console.log('   Domain:', data.domain);
      console.log('   Key Location:', data.keyLocation);
      return true;
    } else {
      console.log('❌ API status check failed:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ API status test failed:', error.message);
    return false;
  }
}

async function testUrlSubmission() {
  console.log('\n3. Testing URL submission...');
  try {
    // Use production URL for testing even in development
    const testUrl = 'https://dramitashukla.com/';
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: [testUrl]
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ URL submission successful');
      console.log('   Submitted:', data.submitted, 'URLs');
      console.log('   URLs:', data.urls);
      return true;
    } else {
      console.log('❌ URL submission failed:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ URL submission test failed:', error.message);
    return false;
  }
}

async function testBulkSubmission() {
  console.log('\n4. Testing bulk URL submission...');
  try {
    // Use production URLs for testing even in development
    const testUrls = [
      'https://dramitashukla.com/',
      'https://dramitashukla.com/about',
      'https://dramitashukla.com/contact',
      'https://dramitashukla.com/services'
    ];
    
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: testUrls
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log('✅ Bulk URL submission successful');
      console.log('   Submitted:', data.submitted, 'URLs');
      return true;
    } else {
      console.log('❌ Bulk URL submission failed:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Bulk URL submission test failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('Target URL:', BASE_URL);
  
  const results = await Promise.all([
    testKeyFile(),
    testApiStatus(),
    testUrlSubmission(),
    testBulkSubmission()
  ]);
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log('\n📊 Test Results');
  console.log('================');
  console.log(`Passed: ${passed}/${total}`);
  console.log(`Status: ${passed === total ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (passed === total) {
    console.log('\n🎉 IndexNow integration is working correctly!');
    console.log('Next steps:');
    console.log('1. Add your domain to Bing Webmaster Tools');
    console.log('2. Verify the IndexNow key file in Bing Webmaster Tools');
    console.log('3. Monitor submission results in the admin dashboard');
  } else {
    console.log('\n🔧 Some tests failed. Please check the error messages above.');
  }
  
  process.exit(passed === total ? 0 : 1);
}

runTests().catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});