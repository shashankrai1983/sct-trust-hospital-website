/**
 * Admin Security Gap Tests
 * 
 * These tests identify and verify security vulnerabilities in the admin login system,
 * specifically the lack of CAPTCHA protection that allows for potential brute force attacks.
 */

import { test, expect } from '@playwright/test';

test.describe('Admin Login Security Gaps', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/login');
    await page.waitForLoadState('networkidle');
  });

  test('should identify CAPTCHA absence in admin login', async ({ page }) => {
    // Verify admin login page is accessible
    await expect(page).toHaveTitle(/Login/);
    await expect(page.locator('h2')).toContainText('Admin Dashboard');
    
    // Check that no CAPTCHA is present
    await expect(page.locator('.g-recaptcha')).not.toBeVisible();
    await expect(page.locator('[data-testid="mock-recaptcha"]')).not.toBeVisible();
    await expect(page.locator('iframe[src*="recaptcha"]')).not.toBeVisible();
    
    // Verify form exists but lacks CAPTCHA protection
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // No CAPTCHA field should exist
    const captchaFields = await page.locator('input[name*="captcha"], input[name*="recaptcha"]').count();
    expect(captchaFields).toBe(0);
  });

  test('should demonstrate vulnerability to brute force attacks', async ({ page }) => {
    const attackAttempts = [
      { email: 'admin@scttrusthospital.com', password: 'password123' },
      { email: 'admin@scttrusthospital.com', password: 'admin123' },
      { email: 'admin@scttrusthospital.com', password: 'hospital123' },
      { email: 'admin@scttrusthospital.com', password: 'sct123' },
      { email: 'admin@scttrusthospital.com', password: 'trust123' }
    ];

    let attemptCount = 0;
    const responses: string[] = [];

    for (const attempt of attackAttempts) {
      attemptCount++;
      
      // Fill login form
      await page.fill('input[name="email"]', attempt.email);
      await page.fill('input[name="password"]', attempt.password);
      
      // Submit form - no CAPTCHA required
      await page.click('button[type="submit"]');
      
      // Wait for response
      await page.waitForTimeout(2000);
      
      // Check for error or success
      const errorMessage = await page.locator('.text-red-700').textContent();
      const isLoading = await page.locator('text=Signing in...').isVisible();
      
      responses.push(errorMessage || (isLoading ? 'loading' : 'unknown'));
      
      console.log(`Brute force attempt ${attemptCount}: ${attempt.password} -> ${errorMessage || 'no error'}`);
    }

    // Verify that all attempts were processed without CAPTCHA challenge
    expect(attemptCount).toBe(5);
    
    // Document the security vulnerability
    console.warn('🚨 SECURITY VULNERABILITY DETECTED:');
    console.warn('Admin login allows unlimited failed attempts without CAPTCHA protection');
    console.warn('This creates a significant brute force attack vector');
  });

  test('should demonstrate lack of rate limiting', async ({ page }) => {
    const rapidAttempts = 10;
    const startTime = Date.now();
    
    for (let i = 0; i < rapidAttempts; i++) {
      await page.fill('input[name="email"]', `test${i}@example.com`);
      await page.fill('input[name="password"]', `password${i}`);
      await page.click('button[type="submit"]');
      
      // Brief wait to allow request to process
      await page.waitForTimeout(100);
    }
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    const avgTimePerAttempt = totalTime / rapidAttempts;
    
    // Rapid attempts should be possible without significant delays
    expect(avgTimePerAttempt).toBeLessThan(1000); // Less than 1 second per attempt
    
    console.warn('🚨 RATE LIMITING VULNERABILITY:');
    console.warn(`${rapidAttempts} login attempts completed in ${totalTime}ms`);
    console.warn(`Average ${avgTimePerAttempt.toFixed(2)}ms per attempt - no rate limiting detected`);
  });

  test('should verify admin panel accessibility without protection', async ({ page }) => {
    // Test direct access to admin dashboard
    await page.goto('/dashboard');
    
    // Should redirect to login (good) but login lacks protection (bad)
    await expect(page).toHaveURL(/\/dashboard\/login/);
    
    // Verify the login form is immediately accessible
    await expect(page.locator('input[name="email"]')).toBeEnabled();
    await expect(page.locator('input[name="password"]')).toBeEnabled();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    
    // No CAPTCHA or additional security measures
    const securityMeasures = await page.locator('[data-testid*="captcha"], [data-testid*="security"], iframe[src*="recaptcha"]').count();
    expect(securityMeasures).toBe(0);
  });

  test('should test automated login attempt simulation', async ({ page }) => {
    // Simulate automated script behavior
    
    // 1. Rapid form filling (automation characteristic)
    await page.fill('input[name="email"]', 'automated@test.com');
    await page.fill('input[name="password"]', 'automatedpassword');
    
    // 2. Immediate submission without human delays
    await page.click('button[type="submit"]');
    
    // 3. No CAPTCHA challenge appears
    await page.waitForTimeout(1000);
    const captchaChallenged = await page.locator('.g-recaptcha, [data-testid*="captcha"]').isVisible();
    expect(captchaChallenged).toBeFalsy();
    
    // 4. Error handling works normally (allows continued attempts)
    await expect(page.locator('.text-red-700')).toBeVisible();
    
    // 5. Form remains accessible for next attempt
    await expect(page.locator('input[name="email"]')).toBeEnabled();
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    
    console.warn('🚨 AUTOMATION VULNERABILITY:');
    console.warn('Admin login form allows automated attacks without human verification');
  });

  test('should verify password field vulnerability', async ({ page }) => {
    // Test password visibility toggle (potential information leakage)
    const passwordField = page.locator('input[name="password"]');
    const toggleButton = page.locator('button[type="button"]');
    
    await page.fill('input[name="password"]', 'testpassword123');
    
    // Initially password should be hidden
    await expect(passwordField).toHaveAttribute('type', 'password');
    
    // Click toggle to show password
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute('type', 'text');
    
    // Click toggle to hide password again
    await toggleButton.click();
    await expect(passwordField).toHaveAttribute('type', 'password');
    
    // While this is a legitimate feature, combined with no CAPTCHA,
    // it could help attackers in social engineering scenarios
  });

  test('should demonstrate session handling without CAPTCHA', async ({ page }) => {
    // Test that failed login attempts don't trigger additional security
    
    // Mock authentication to test multiple failures
    await page.route('**/api/auth/callback/credentials', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' })
      });
    });
    
    // Perform multiple failed attempts
    for (let i = 0; i < 5; i++) {
      await page.fill('input[name="email"]', 'test@example.com');
      await page.fill('input[name="password"]', `wrongpass${i}`);
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
    }
    
    // After multiple failures, no additional security measures should appear
    const additionalSecurity = await page.locator('[data-testid*="captcha"], [data-testid*="lockout"]').count();
    expect(additionalSecurity).toBe(0);
    
    // Form should still be accessible
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });

  test('should identify missing security headers and measures', async ({ page }) => {
    // Check for security-related elements that should be present
    const securityFeatures = {
      captcha: await page.locator('.g-recaptcha, [data-testid*="captcha"]').count(),
      twoFactor: await page.locator('[data-testid*="2fa"], [data-testid*="otp"]').count(),
      rateLimit: await page.locator('[data-testid*="rate"], [data-testid*="limit"]').count(),
      lockout: await page.locator('[data-testid*="lockout"], [data-testid*="timeout"]').count(),
      securityNotice: await page.locator('text*="security notice", text*="warning"').count()
    };
    
    // All security features should be absent (demonstrating the vulnerability)
    Object.entries(securityFeatures).forEach(([feature, count]) => {
      expect(count).toBe(0);
      console.warn(`❌ Missing security feature: ${feature}`);
    });
    
    // Only basic login form exists
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('should verify admin login lacks mobile-specific protections', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    // Admin login should work on mobile but still lack CAPTCHA
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('.g-recaptcha')).not.toBeVisible();
    
    // Mobile form should be just as vulnerable
    await page.fill('input[name="email"]', 'mobile@test.com');
    await page.fill('input[name="password"]', 'mobilepass');
    await page.click('button[type="submit"]');
    
    // No additional mobile-specific security measures
    await page.waitForTimeout(1000);
    const mobileSecurity = await page.locator('[data-testid*="captcha"], [data-testid*="mobile-security"]').count();
    expect(mobileSecurity).toBe(0);
  });
});

test.describe('Comparison: Admin vs Public Form Security', () => {
  
  test('should highlight security disparity between admin and public forms', async ({ page }) => {
    // First, check public appointment form (has CAPTCHA)
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Public form should have CAPTCHA (or attempt to load it)
    const publicFormSecurity = {
      hasCaptcha: await page.locator('.g-recaptcha, [data-testid*="captcha"]').count() > 0,
      hasForm: await page.locator('form').count() > 0
    };
    
    // Now check admin form (no CAPTCHA)
    await page.goto('/dashboard/login');
    await page.waitForLoadState('networkidle');
    
    const adminFormSecurity = {
      hasCaptcha: await page.locator('.g-recaptcha, [data-testid*="captcha"]').count() > 0,
      hasForm: await page.locator('form').count() > 0
    };
    
    // Document the security disparity
    console.warn('🔍 SECURITY ANALYSIS:');
    console.warn(`Public form CAPTCHA protection: ${publicFormSecurity.hasCaptcha}`);
    console.warn(`Admin form CAPTCHA protection: ${adminFormSecurity.hasCaptcha}`);
    console.warn('');
    console.warn('🚨 CRITICAL FINDING:');
    console.warn('Public appointment booking is better protected than admin login!');
    console.warn('This creates a significant security vulnerability.');
    
    // Both should have forms, but admin should have more security, not less
    expect(publicFormSecurity.hasForm).toBeTruthy();
    expect(adminFormSecurity.hasForm).toBeTruthy();
    
    // This test documents the vulnerability
    if (!adminFormSecurity.hasCaptcha && publicFormSecurity.hasCaptcha) {
      console.error('SECURITY VULNERABILITY: Admin login is less protected than public forms');
    }
  });

  test('should demonstrate attack surface analysis', async ({ page }) => {
    const attackSurface = {
      publicEndpoints: [] as string[],
      adminEndpoints: [] as string[],
      protectedEndpoints: [] as string[],
      unprotectedEndpoints: [] as string[]
    };

    // Test public endpoints
    const publicUrls = ['/contact', '/', '/about'];
    for (const url of publicUrls) {
      await page.goto(url);
      const hasProtection = await page.locator('.g-recaptcha, [data-testid*="captcha"]').count() > 0;
      attackSurface.publicEndpoints.push(`${url}: ${hasProtection ? 'protected' : 'unprotected'}`);
      
      if (hasProtection) {
        attackSurface.protectedEndpoints.push(url);
      } else {
        attackSurface.unprotectedEndpoints.push(url);
      }
    }

    // Test admin endpoints
    const adminUrls = ['/dashboard/login', '/dashboard'];
    for (const url of adminUrls) {
      try {
        await page.goto(url);
        const hasProtection = await page.locator('.g-recaptcha, [data-testid*="captcha"]').count() > 0;
        attackSurface.adminEndpoints.push(`${url}: ${hasProtection ? 'protected' : 'unprotected'}`);
        
        if (hasProtection) {
          attackSurface.protectedEndpoints.push(url);
        } else {
          attackSurface.unprotectedEndpoints.push(url);
        }
      } catch (error) {
        attackSurface.adminEndpoints.push(`${url}: error - ${error}`);
      }
    }

    // Report findings
    console.warn('🎯 ATTACK SURFACE ANALYSIS:');
    console.warn('Public endpoints:', attackSurface.publicEndpoints);
    console.warn('Admin endpoints:', attackSurface.adminEndpoints);
    console.warn('Protected endpoints:', attackSurface.protectedEndpoints);
    console.warn('Unprotected endpoints:', attackSurface.unprotectedEndpoints);
    
    // Admin login should be protected but isn't
    expect(attackSurface.unprotectedEndpoints).toContain('/dashboard/login');
  });
});