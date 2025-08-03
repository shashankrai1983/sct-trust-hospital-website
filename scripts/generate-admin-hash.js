/**
 * Admin Password Hash Generator
 * 
 * This script generates a secure bcrypt hash for the admin password.
 * Usage: node scripts/generate-admin-hash.js [password]
 * 
 * If no password is provided, it will use a secure default.
 * The generated hash should be added to your .env file as ADMIN_PASSWORD_HASH
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function generateAdminHash() {
  // Get password from command line argument or generate a secure one
  const password = process.argv[2] || generateSecurePassword();
  
  if (!process.argv[2]) {
    console.log('🔐 No password provided. Generated secure password:', password);
    console.log('⚠️  IMPORTANT: Save this password securely!');
    console.log('');
  }

  try {
    // Generate hash with salt rounds of 12 for security
    const hash = await bcrypt.hash(password, 12);
    
    console.log('✅ Password Hash Generated Successfully!');
    console.log('');
    console.log('Add this to your .env file:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('');
    console.log('Login credentials:');
    console.log(`Email: admin@scttrusthospital.com`);
    console.log(`Password: ${password}`);
    console.log('');
    console.log('🔒 Keep these credentials secure and change the default password!');
    
  } catch (error) {
    console.error('❌ Error generating hash:', error);
  }
}

function generateSecurePassword() {
  // Generate a secure random password
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}

// Run the generator
generateAdminHash().catch(console.error);