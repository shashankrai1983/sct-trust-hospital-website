/**
 * End-to-End Appointment Booking Tests  
 * Tests the complete appointment booking workflow from user perspective
 */

const { MongoClient } = require('mongodb');

// Load environment variables
require('dotenv').config();

// Use built-in fetch for Node.js 18+
const fetch = globalThis.fetch;

// Test Configuration
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const TEST_TIMEOUT = 30000;

console.log('📅 Appointment Booking E2E Test Suite');
console.log('======================================\n');

// Test utilities
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: [],
  testAppointments: []
};

function logTest(testName, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${testName}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${testName}`);
    if (details) console.log(`   ${details}`);
  }
  testResults.details.push({ testName, passed, details });
}

// Generate test appointment data
function generateTestAppointment(suffix = '') {
  const timestamp = Date.now();
  return {
    name: `Test Patient ${suffix}${timestamp}`,
    email: `test${suffix}${timestamp}@example.com`,
    phone: `98765${timestamp.toString().slice(-5)}`,
    service: 'General Consultation',
    date: '2025-02-15', // Future date
    time: '10:00 AM',
    message: `E2E test appointment ${suffix} - ${new Date().toISOString()}`
  };
}

// Database cleanup utility
async function cleanupTestAppointments() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('appointments');
    
    // Remove test appointments
    const result = await collection.deleteMany({
      $or: [
        { message: { $regex: /E2E test appointment/ } },
        { email: { $regex: /test.*@example\.com/ } },
        { status: 'test' }
      ]
    });
    
    console.log(`🧹 Cleaned up ${result.deletedCount} test appointments`);
    await client.close();
  } catch (error) {
    console.log('⚠️  Cleanup failed:', error.message);
  }
}

// Test 1: API Endpoint Validation
async function testAppointmentAPI() {
  console.log('1. Appointment API Tests');
  console.log('------------------------');

  // Test API endpoint exists
  try {
    const response = await fetch(`${BASE_URL}/api/appointments`);
    logTest('Appointments API endpoint accessible', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      logTest('API returns valid JSON response', !!data.message);
    }
  } catch (error) {
    logTest('Appointments API endpoint accessible', false, error.message);
    return false;
  }

  console.log('');
  return true;
}

// Test 2: Valid Appointment Submission
async function testValidAppointmentSubmission() {
  console.log('2. Valid Appointment Submission Tests');
  console.log('------------------------------------');

  const testAppointment = generateTestAppointment('valid');
  testResults.testAppointments.push(testAppointment);

  try {
    const response = await fetch(`${BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testAppointment),
    });

    logTest('Valid appointment submission returns 201', response.status === 201);

    if (response.ok) {
      const result = await response.json();
      logTest('Response contains success flag', result.success === true);
      logTest('Response contains appointment ID', !!result.appointmentId);
      logTest('Response contains appointment data', !!result.appointment);
      
      if (result.appointment) {
        logTest('Appointment has pending status', result.appointment.status === 'pending');
        logTest('Appointment has timestamps', !!result.appointment.createdAt && !!result.appointment.updatedAt);
      }
    } else {
      const errorData = await response.json();
      logTest('Valid appointment submission returns 201', false, `Status: ${response.status}, Error: ${errorData.message}`);
    }

  } catch (error) {
    logTest('Valid appointment submission successful', false, error.message);
  }

  console.log('');
}

// Test 3: Invalid Data Validation
async function testInvalidDataValidation() {
  console.log('3. Invalid Data Validation Tests');
  console.log('--------------------------------');

  // Test missing required fields
  const invalidCases = [
    { name: 'Missing name', data: { email: 'test@example.com', phone: '1234567890', service: 'General', date: '2025-02-15', time: '10:00 AM' } },
    { name: 'Invalid email', data: { name: 'Test', email: 'invalid-email', phone: '1234567890', service: 'General', date: '2025-02-15', time: '10:00 AM' } },
    { name: 'Short phone number', data: { name: 'Test', email: 'test@example.com', phone: '123', service: 'General', date: '2025-02-15', time: '10:00 AM' } },
    { name: 'Missing service', data: { name: 'Test', email: 'test@example.com', phone: '1234567890', date: '2025-02-15', time: '10:00 AM' } },
    { name: 'Missing date', data: { name: 'Test', email: 'test@example.com', phone: '1234567890', service: 'General', time: '10:00 AM' } },
    { name: 'Missing time', data: { name: 'Test', email: 'test@example.com', phone: '1234567890', service: 'General', date: '2025-02-15' } }
  ];

  for (const testCase of invalidCases) {
    try {
      const response = await fetch(`${BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data),
      });

      const isValidationError = response.status === 400;
      logTest(`${testCase.name} returns 400 error`, isValidationError);

      if (isValidationError) {
        const errorData = await response.json();
        logTest(`${testCase.name} includes validation errors`, !!errorData.errors);
      }

    } catch (error) {
      logTest(`${testCase.name} validation`, false, error.message);
    }
  }

  console.log('');
}

// Test 4: Database Storage Verification
async function testDatabaseStorage() {
  console.log('4. Database Storage Verification');
  console.log('--------------------------------');

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('appointments');

    // Find test appointments
    const testAppointments = await collection.find({
      message: { $regex: /E2E test appointment/ }
    }).toArray();

    logTest('Test appointments stored in database', testAppointments.length > 0);

    if (testAppointments.length > 0) {
      const appointment = testAppointments[0];
      logTest('Stored appointment has required fields', 
        !!(appointment.name && appointment.email && appointment.phone && appointment.service));
      logTest('Stored appointment has status field', !!appointment.status);
      logTest('Stored appointment has timestamps', 
        !!(appointment.createdAt && appointment.updatedAt));
      logTest('Stored appointment has MongoDB ObjectId', !!appointment._id);
    }

    await client.close();

  } catch (error) {
    logTest('Database storage verification', false, error.message);
  }

  console.log('');
}

// Test 5: Edge Cases and Stress Tests
async function testEdgeCases() {
  console.log('5. Edge Cases and Stress Tests');
  console.log('------------------------------');

  // Test very long strings
  const longStringTest = generateTestAppointment('long');
  longStringTest.message = 'A'.repeat(1000); // Very long message

  try {
    const response = await fetch(`${BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(longStringTest),
    });

    logTest('Handles long message strings', response.ok);
    testResults.testAppointments.push(longStringTest);
  } catch (error) {
    logTest('Handles long message strings', false, error.message);
  }

  // Test special characters
  const specialCharsTest = generateTestAppointment('special');
  specialCharsTest.name = 'Test User (Special) & Co.';
  specialCharsTest.message = 'Special chars: @#$%^&*()_+{}|:"<>?[]\\;\',./';

  try {
    const response = await fetch(`${BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(specialCharsTest),
    });

    logTest('Handles special characters', response.ok);
    testResults.testAppointments.push(specialCharsTest);
  } catch (error) {
    logTest('Handles special characters', false, error.message);
  }

  // Test concurrent requests
  console.log('Testing concurrent requests...');
  const concurrentPromises = [];
  for (let i = 0; i < 5; i++) {
    const concurrentTest = generateTestAppointment(`concurrent${i}`);
    testResults.testAppointments.push(concurrentTest);
    
    concurrentPromises.push(
      fetch(`${BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(concurrentTest),
      })
    );
  }

  try {
    const responses = await Promise.all(concurrentPromises);
    const allSuccessful = responses.every(r => r.ok);
    logTest('Handles concurrent requests', allSuccessful);
  } catch (error) {
    logTest('Handles concurrent requests', false, error.message);
  }

  console.log('');
}

// Test 6: Form Validation Scenarios
async function testFormValidationScenarios() {
  console.log('6. Form Validation Scenarios');
  console.log('----------------------------');

  // Test various email formats
  const emailTests = [
    { email: 'valid@example.com', shouldPass: true },
    { email: 'user.name@example.com', shouldPass: true },
    { email: 'user+tag@example.co.uk', shouldPass: true },
    { email: 'invalid.email', shouldPass: false },
    { email: '@example.com', shouldPass: false },
    { email: 'user@', shouldPass: false }
  ];

  for (const emailTest of emailTests) {
    const testData = generateTestAppointment('email');
    testData.email = emailTest.email;

    try {
      const response = await fetch(`${BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const passed = emailTest.shouldPass ? response.ok : !response.ok;
      logTest(`Email validation: ${emailTest.email}`, passed);

      if (emailTest.shouldPass && response.ok) {
        testResults.testAppointments.push(testData);
      }
    } catch (error) {
      logTest(`Email validation: ${emailTest.email}`, false, error.message);
    }
  }

  console.log('');
}

// Generate comprehensive test report
function generateTestReport() {
  console.log('📊 E2E Test Results Summary');
  console.log('===========================');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`Passed: ${testResults.passed} ✅`);
  console.log(`Failed: ${testResults.failed} ${testResults.failed > 0 ? '❌' : ''}`);
  console.log(`Success Rate: ${Math.round((testResults.passed / testResults.total) * 100)}%`);
  console.log(`Test Appointments Created: ${testResults.testAppointments.length}`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ Failed Tests:');
    testResults.details
      .filter(test => !test.passed)
      .forEach(test => {
        console.log(`  • ${test.testName}`);
        if (test.details) console.log(`    ${test.details}`);
      });
  }

  console.log('\n🔍 Test Coverage Areas:');
  console.log('✅ API endpoint accessibility');
  console.log('✅ Valid data submission');
  console.log('✅ Input validation and error handling');
  console.log('✅ Database storage verification');
  console.log('✅ Edge cases and stress testing');
  console.log('✅ Form validation scenarios');

  console.log('\n🎯 Recommendations:');
  if (testResults.failed === 0) {
    console.log('✅ All E2E tests passed! Appointment booking is working correctly.');
    console.log('✅ System handles both valid and invalid data appropriately.');
    console.log('✅ Database integration is functioning properly.');
  } else {
    console.log('⚠️  Address failing tests to ensure robust appointment booking.');
    console.log('⚠️  Check API validation and database connectivity.');
  }
}

// Main test execution
async function runE2ETests() {
  try {
    // Cleanup any existing test data
    await cleanupTestAppointments();

    const apiOk = await testAppointmentAPI();
    if (!apiOk) {
      console.log('❌ Cannot proceed without API access');
      process.exit(1);
    }

    await testValidAppointmentSubmission();
    await testInvalidDataValidation();
    await testDatabaseStorage();
    await testEdgeCases();
    await testFormValidationScenarios();
    
    generateTestReport();
    
    // Final cleanup
    console.log('\n🧹 Cleaning up test data...');
    await cleanupTestAppointments();
    
    // Exit with appropriate code
    process.exit(testResults.failed > 0 ? 1 : 0);
    
  } catch (error) {
    console.error('❌ E2E test suite execution failed:', error);
    process.exit(1);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runE2ETests();
}

module.exports = { runE2ETests, testResults };