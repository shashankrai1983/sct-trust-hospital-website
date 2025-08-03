# Login Troubleshooting Guide

## Issue: "Invalid email or password" Error

If you're still experiencing login issues after the fixes, follow these steps:

### 1. Clear Browser Cache
- Clear cookies and site data for localhost:3000
- Try incognito/private browsing mode
- Disable browser extensions temporarily

### 2. Verify Server is Running Fresh
```bash
# Kill all Next.js processes
pkill -f "next dev"

# Clear all caches
rm -rf .next node_modules/.cache

# Start fresh
npm run dev
```

### 3. Verify Correct Credentials
- **URL**: http://localhost:3000/dashboard/login
- **Email**: admin@scttrusthospital.com
- **Password**: admin123

### 4. Check Environment Variables
Ensure your `.env` file has:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=4e3de64aaa6d533c42ddf4866a7ca8ccefb9ebea94770a3b8dab7de5d4f8149a
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$oM38fW1HyxFmnLpx9iWQ1OhnK/eFlGs0nJvkEtkDnItGKq3KOSXXm
```

### 5. Test Authentication Directly
Run this command to verify the password hash:
```bash
node -e "require('bcryptjs').compare('admin123', '$2b$12$oM38fW1HyxFmnLpx9iWQ1OhnK/eFlGs0nJvkEtkDnItGKq3KOSXXm').then(r => console.log('Password valid:', r))"
```

### 6. Check Browser Console
Open DevTools (F12) and check:
- Network tab for failed requests
- Console for JavaScript errors
- Application tab > Cookies for session issues

### 7. Common Issues and Solutions

#### Issue: Old session cookies
**Solution**: Clear all cookies for localhost:3000

#### Issue: Port mismatch
**Solution**: Ensure you're using the correct port shown in terminal

#### Issue: Build cache
**Solution**: Delete `.next` folder and restart

#### Issue: Environment variables not loading
**Solution**: Restart server after changing `.env`

### 8. Debug Mode
The authentication is set to debug mode in development. Check server console for detailed logs:
- "Authentication successful for admin user" - Login succeeded
- "Authentication failed: Invalid password" - Wrong password
- "Authentication failed: Email mismatch" - Wrong email

### 9. If Still Not Working
1. Check if any security software is blocking requests
2. Try a different browser
3. Ensure no proxy/VPN is interfering
4. Check if localhost is properly resolving

### 10. Generate New Password
If needed, generate a new password:
```bash
node scripts/generate-admin-hash.js YourNewPassword
```
Then update the `ADMIN_PASSWORD_HASH` in `.env` and restart.

## Verification Complete
All authentication components have been tested and are working correctly:
- ✅ Environment variables loaded
- ✅ Password hash validation successful
- ✅ Email comparison working
- ✅ NextAuth configuration correct
- ✅ Middleware properly configured

The issue is likely related to browser cache, old sessions, or the server not picking up changes. Following the steps above should resolve it.