/**
 * Master Test Runner
 * Executes all test suites and generates comprehensive report
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 SCT Trust Hospital - Complete Test Suite');
console.log('============================================\n');

const testSuites = [
  {
    name: 'Authentication & Dashboard Tests',
    file: 'auth-dashboard.test.js',
    description: 'Tests login functionality, session management, and dashboard protection'
  },
  {
    name: 'Appointment Booking E2E Tests', 
    file: 'appointment-e2e.test.js',
    description: 'Tests complete appointment booking workflow and data validation'
  }
];

const overallResults = {
  totalSuites: testSuites.length,
  passedSuites: 0,
  failedSuites: 0,
  suiteResults: []
};

function runTestSuite(suite) {
  return new Promise((resolve) => {
    console.log(`\n🏃 Running: ${suite.name}`);
    console.log(`📝 ${suite.description}`);
    console.log('─'.repeat(60));

    const testProcess = spawn('node', [path.join(__dirname, suite.file)], {
      stdio: 'inherit',
      env: { ...process.env }
    });

    testProcess.on('close', (code) => {
      const passed = code === 0;
      overallResults.suiteResults.push({
        name: suite.name,
        file: suite.file,
        passed,
        exitCode: code
      });

      if (passed) {
        overallResults.passedSuites++;
        console.log(`\n✅ ${suite.name} - PASSED\n`);
      } else {
        overallResults.failedSuites++;
        console.log(`\n❌ ${suite.name} - FAILED (Exit code: ${code})\n`);
      }

      resolve();
    });

    testProcess.on('error', (error) => {
      console.error(`\n❌ Error running ${suite.name}:`, error.message);
      overallResults.failedSuites++;
      overallResults.suiteResults.push({
        name: suite.name,
        file: suite.file,
        passed: false,
        error: error.message
      });
      resolve();
    });
  });
}

function generateOverallReport() {
  console.log('=' .repeat(60));
  console.log('📊 FINAL TEST REPORT - SCT Trust Hospital');
  console.log('=' .repeat(60));
  
  console.log(`\n📈 Overall Test Results:`);
  console.log(`Total Test Suites: ${overallResults.totalSuites}`);
  console.log(`Passed: ${overallResults.passedSuites} ✅`);
  console.log(`Failed: ${overallResults.failedSuites} ${overallResults.failedSuites > 0 ? '❌' : ''}`);
  console.log(`Success Rate: ${Math.round((overallResults.passedSuites / overallResults.totalSuites) * 100)}%`);

  console.log(`\n📋 Suite Details:`);
  overallResults.suiteResults.forEach(result => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`  • ${result.name}: ${status}`);
    if (!result.passed && result.error) {
      console.log(`    Error: ${result.error}`);
    }
  });

  console.log(`\n🎯 System Status Assessment:`);
  
  if (overallResults.failedSuites === 0) {
    console.log('🟢 SYSTEM READY FOR PRODUCTION');
    console.log('   ✅ Authentication system is secure and functional');
    console.log('   ✅ Appointment booking system works end-to-end');
    console.log('   ✅ Database integration is stable');
    console.log('   ✅ Input validation is comprehensive');
    console.log('   ✅ Error handling is appropriate');
  } else {
    console.log('🟡 SYSTEM NEEDS ATTENTION');
    console.log('   ⚠️  Some test failures detected');
    console.log('   ⚠️  Review failed tests before production deployment');
    
    const authFailed = overallResults.suiteResults.find(r => r.file === 'auth-dashboard.test.js' && !r.passed);
    const e2eFailed = overallResults.suiteResults.find(r => r.file === 'appointment-e2e.test.js' && !r.passed);
    
    if (authFailed) {
      console.log('   🔐 Authentication issues detected - CRITICAL');
    }
    if (e2eFailed) {
      console.log('   📅 Appointment booking issues detected - HIGH PRIORITY');
    }
  }

  console.log(`\n🛠️  Recommended Actions:`);
  if (overallResults.failedSuites === 0) {
    console.log('✅ No immediate actions required');
    console.log('✅ Consider setting up automated testing for CI/CD');
    console.log('✅ Schedule regular test runs for ongoing quality assurance');
  } else {
    console.log('1. Fix all failing tests before deployment');
    console.log('2. Verify environment configuration');
    console.log('3. Check database connectivity and permissions');
    console.log('4. Validate all required environment variables');
    console.log('5. Re-run tests after fixes to ensure stability');
  }

  console.log(`\n📞 Support Information:`);
  console.log('   • Review test output above for specific failure details');
  console.log('   • Check server logs for additional error information');
  console.log('   • Ensure development server is running before testing');
  console.log('   • Verify all environment variables are properly configured');

  console.log('\n' + '=' .repeat(60));
}

async function runAllTests() {
  const startTime = Date.now();
  
  console.log('🚀 Starting comprehensive test execution...');
  console.log(`📍 Test directory: ${__dirname}`);
  console.log(`⏰ Started at: ${new Date().toLocaleString()}\n`);

  // Check if server should be running
  console.log('⚠️  IMPORTANT: Make sure your development server is running!');
  console.log('   Run: npm run dev (in a separate terminal)');
  console.log('   The tests will connect to http://localhost:3000\n');

  // Wait a moment for user to read
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Run all test suites sequentially
  for (const suite of testSuites) {
    await runTestSuite(suite);
  }

  const duration = Math.round((Date.now() - startTime) / 1000);
  
  generateOverallReport();
  
  console.log(`\n⏱️  Total execution time: ${duration} seconds`);
  console.log(`🏁 Test run completed at: ${new Date().toLocaleString()}`);

  // Exit with overall result
  process.exit(overallResults.failedSuites > 0 ? 1 : 0);
}

// Run if executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ Fatal error in test runner:', error);
    process.exit(1);
  });
}

module.exports = { runAllTests, overallResults };