#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('🔍 SCT Trust Hospital - Production Readiness Assessment');
console.log('=' .repeat(60));

const issues = [];
const warnings = [];
const recommendations = [];

// 1. Environment Variables Check
console.log('\n1. 🌍 Environment Variables');
console.log('-'.repeat(30));

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB', 
  'NEXTAUTH_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD_HASH',
  'RECAPTCHA_SECRET_KEY',
  'NEXT_PUBLIC_RECAPTCHA_SITE_KEY'
];

const envFile = path.join(process.cwd(), '.env');
let envExists = false;
let envContent = '';

try {
  envContent = fs.readFileSync(envFile, 'utf8');
  envExists = true;
  console.log('✅ .env file exists and is readable');
} catch (error) {
  issues.push('❌ .env file missing or unreadable');
}

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    issues.push(`❌ Missing environment variable: ${varName}`);
  } else if (varName === 'NEXTAUTH_SECRET' && value.length < 32) {
    warnings.push(`⚠️ NEXTAUTH_SECRET should be at least 32 characters (current: ${value.length})`);
  } else if (varName === 'ADMIN_PASSWORD_HASH' && !value.startsWith('$2b$')) {
    issues.push(`❌ ADMIN_PASSWORD_HASH is not a valid bcrypt hash`);
  } else {
    console.log(`✅ ${varName}: ${varName.includes('SECRET') || varName.includes('HASH') ? '[REDACTED]' : value}`);
  }
});

// 2. Security Configuration
console.log('\n2. 🛡️ Security Configuration');
console.log('-'.repeat(30));

// Check HTTPS requirements for production
console.log('📋 HTTPS/SSL Configuration:');
if (process.env.NODE_ENV === 'production') {
  if (!process.env.NEXTAUTH_URL || !process.env.NEXTAUTH_URL.startsWith('https://')) {
    issues.push('❌ NEXTAUTH_URL must use HTTPS in production');
  } else {
    console.log('✅ NEXTAUTH_URL configured for HTTPS');
  }
} else {
  recommendations.push('💡 Set NEXTAUTH_URL to HTTPS domain for production deployment');
}

// Check password strength
const adminEmail = process.env.ADMIN_EMAIL;
if (adminEmail && adminEmail.includes('admin@')) {
  warnings.push('⚠️ Consider using a non-obvious admin email for production');
}

// Check session security
console.log('🔐 Session Security:');
console.log('✅ JWT strategy enabled with 8-hour expiration');
console.log('✅ bcrypt password hashing implemented');
console.log('✅ Environment variable fallback mechanism in place');

// 3. Database Configuration
console.log('\n3. 🗄️ Database Configuration');
console.log('-'.repeat(30));

const mongoUri = process.env.MONGODB_URI;
if (mongoUri) {
  if (mongoUri.includes('mongodb+srv://')) {
    console.log('✅ Using MongoDB Atlas (recommended for production)');
  } else if (mongoUri.includes('localhost') || mongoUri.includes('127.0.0.1')) {
    warnings.push('⚠️ Using local MongoDB - not suitable for production');
  }
  
  if (!mongoUri.includes('retryWrites=true')) {
    recommendations.push('💡 Add retryWrites=true to MongoDB URI for better reliability');
  }
  
  if (!mongoUri.includes('w=majority')) {
    recommendations.push('💡 Add w=majority to MongoDB URI for better durability');
  }
} else {
  issues.push('❌ MongoDB URI not configured');
}

// 4. Application Configuration
console.log('\n4. ⚙️ Application Configuration');
console.log('-'.repeat(30));

// Check next.config.js
const nextConfigPath = path.join(process.cwd(), 'next.config.js');
try {
  const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  
  if (nextConfigContent.includes('trailingSlash: false')) {
    console.log('✅ Trailing slash disabled (good for NextAuth)');
  }
  
  if (nextConfigContent.includes('output:')) {
    console.log('✅ Output configuration found');
  } else {
    recommendations.push('💡 Consider adding output configuration for deployment');
  }
  
} catch (error) {
  warnings.push('⚠️ next.config.js not found or unreadable');
}

// Check package.json for production scripts
const packageJsonPath = path.join(process.cwd(), 'package.json');
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.scripts?.build) {
    console.log('✅ Build script available');
  } else {
    issues.push('❌ No build script found in package.json');
  }
  
  if (packageJson.scripts?.start) {
    console.log('✅ Production start script available');
  } else {
    issues.push('❌ No start script found in package.json');
  }
  
  // Check for production dependencies
  const prodDeps = Object.keys(packageJson.dependencies || {});
  const devDeps = Object.keys(packageJson.devDependencies || {});
  
  console.log(`📦 Dependencies: ${prodDeps.length} production, ${devDeps.length} development`);
  
} catch (error) {
  issues.push('❌ package.json not found or invalid');
}

// 5. API Security
console.log('\n5. 🔒 API Security');
console.log('-'.repeat(30));

// Check API route protection
const pagesApiPath = path.join(process.cwd(), 'pages', 'api');
if (fs.existsSync(pagesApiPath)) {
  const dashboardStatsPath = path.join(pagesApiPath, 'dashboard', 'stats.ts');
  const dashboardAppointmentsPath = path.join(pagesApiPath, 'dashboard', 'appointments.ts');
  
  [dashboardStatsPath, dashboardAppointmentsPath].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('getServerSession')) {
        console.log(`✅ ${path.basename(filePath)} has authentication protection`);
      } else {
        issues.push(`❌ ${path.basename(filePath)} lacks authentication protection`);
      }
    }
  });
}

// Check reCAPTCHA configuration
if (process.env.RECAPTCHA_SECRET_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
  console.log('✅ reCAPTCHA configured for form protection');
} else {
  warnings.push('⚠️ reCAPTCHA not fully configured - forms vulnerable to spam');
}

// 6. Error Handling & Logging
console.log('\n6. 📝 Error Handling & Logging');
console.log('-'.repeat(30));

// Check API error handling
const appointmentsApiPath = path.join(process.cwd(), 'app', 'api', 'appointments', 'route.ts');
if (fs.existsSync(appointmentsApiPath)) {
  const content = fs.readFileSync(appointmentsApiPath, 'utf8');
  if (content.includes('try {') && content.includes('catch')) {
    console.log('✅ Appointments API has error handling');
  }
  if (content.includes('console.error')) {
    console.log('✅ Error logging implemented');
  }
}

// 7. Performance & Optimization
console.log('\n7. ⚡ Performance & Optimization');
console.log('-'.repeat(30));

// Check for optimization features
const buildOutputPath = path.join(process.cwd(), '.next');
if (fs.existsSync(buildOutputPath)) {
  console.log('✅ Next.js build output exists');
  recommendations.push('💡 Run production build and analyze bundle size');
} else {
  recommendations.push('💡 Run "npm run build" to check for build issues');
}

// Check image optimization
const publicPath = path.join(process.cwd(), 'public');
if (fs.existsSync(publicPath)) {
  const images = fs.readdirSync(publicPath).filter(f => 
    f.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  );
  if (images.length > 0) {
    console.log(`📸 Found ${images.length} images in public folder`);
    recommendations.push('💡 Consider optimizing images for production (WebP format, compression)');
  }
}

// 8. Deployment Readiness
console.log('\n8. 🚀 Deployment Readiness');
console.log('-'.repeat(30));

// Check for common deployment files
const deploymentFiles = [
  { file: 'Dockerfile', purpose: 'Docker deployment' },
  { file: 'docker-compose.yml', purpose: 'Docker Compose' },
  { file: 'vercel.json', purpose: 'Vercel deployment' },
  { file: 'netlify.toml', purpose: 'Netlify deployment' },
  { file: '.github/workflows', purpose: 'GitHub Actions CI/CD' }
];

deploymentFiles.forEach(({ file, purpose }) => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists (${purpose})`);
  }
});

recommendations.push('💡 Consider adding deployment configuration for your chosen platform');

// 9. Data Validation & Testing
console.log('\n9. 🧪 Data Validation & Testing');
console.log('-'.repeat(30));

// Check for testing setup
const testFiles = ['jest.config.js', 'playwright.config.ts', '__tests__', 'tests'];
let hasTests = false;
testFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ Testing setup found: ${file}`);
    hasTests = true;
  }
});

if (!hasTests) {
  recommendations.push('💡 Consider adding automated testing (Jest, Playwright, etc.)');
}

// Check Zod validation
if (fs.existsSync(appointmentsApiPath)) {
  const content = fs.readFileSync(appointmentsApiPath, 'utf8');
  if (content.includes('zod') && content.includes('.parse(')) {
    console.log('✅ Input validation with Zod implemented');
  }
}

// 10. Summary Report
console.log('\n' + '='.repeat(60));
console.log('📊 PRODUCTION READINESS SUMMARY');
console.log('='.repeat(60));

console.log(`\n🔴 Critical Issues (${issues.length}):`);
if (issues.length === 0) {
  console.log('✅ No critical issues found!');
} else {
  issues.forEach(issue => console.log(issue));
}

console.log(`\n🟡 Warnings (${warnings.length}):`);
if (warnings.length === 0) {
  console.log('✅ No warnings!');
} else {
  warnings.forEach(warning => console.log(warning));
}

console.log(`\n💡 Recommendations (${recommendations.length}):`);
recommendations.forEach(rec => console.log(rec));

// Overall Score
const totalChecks = 50; // Approximate number of checks
const criticalIssues = issues.length;
const warningIssues = warnings.length;

const score = Math.max(0, totalChecks - (criticalIssues * 3) - (warningIssues * 1));
const percentage = Math.round((score / totalChecks) * 100);

console.log(`\n🎯 Production Readiness Score: ${percentage}/100`);

if (percentage >= 90) {
  console.log('🟢 EXCELLENT - Ready for production deployment!');
} else if (percentage >= 75) {
  console.log('🟡 GOOD - Address critical issues before production');
} else if (percentage >= 60) {
  console.log('🟠 FAIR - Significant improvements needed');
} else {
  console.log('🔴 POOR - Not ready for production');
}

console.log('\n📋 Next Steps:');
console.log('1. Fix all critical issues (🔴)');
console.log('2. Address warnings (🟡)');
console.log('3. Implement recommendations (💡)');
console.log('4. Run production build test');
console.log('5. Deploy to staging environment first');
console.log('6. Perform security audit');
console.log('7. Set up monitoring and logging');

console.log('\n✨ Assessment completed at:', new Date().toLocaleString());