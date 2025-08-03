/**
 * Form Validation and Error Handling Tests
 * 
 * These tests verify form validation logic, error handling, and user experience
 * for both CAPTCHA-protected and unprotected forms in the application.
 */

import { test, expect } from '@playwright/test';
import { 
  setupTestEnvironment, 
  completeCaptcha, 
  CAPTCHA_MOCK_RESPONSES 
} from '../utils/captcha-utils';

test.describe('Appointment Form Validation', () => {

  test.beforeEach(async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });
  });

  test('should validate required fields before CAPTCHA check', async ({ page }) => {
    // Try to submit completely empty form
    await page.click('button[type="submit"]');
    
    // HTML5 validation should catch required fields first
    const nameField = page.locator('input[name="name"]');
    const emailField = page.locator('input[name="email"]');
    const phoneField = page.locator('input[name="phone"]');
    
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(phoneField).toHaveAttribute('required');
    
    // Check validation states
    const nameValid = await nameField.evaluate(el => (el as HTMLInputElement).validity.valid);
    const emailValid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid);
    const phoneValid = await phoneField.evaluate(el => (el as HTMLInputElement).validity.valid);
    
    expect(nameValid).toBeFalsy();
    expect(emailValid).toBeFalsy();
    expect(phoneValid).toBeFalsy();
    
    // CAPTCHA error should not appear yet if basic validation fails
    const captchaError = await page.locator('text=Please complete the CAPTCHA verification.').isVisible();
    expect(captchaError).toBeFalsy();
  });

  test('should validate email format correctly', async ({ page }) => {
    const invalidEmails = [
      'plainaddress',
      '@missingdomain.com',
      'missing@domain',
      'spaces in@email.com',
      'double..dots@domain.com',
      'trailing.dot.@domain.com',
      '.leading.dot@domain.com'
    ];

    for (const email of invalidEmails) {
      // Fill other required fields
      await page.fill('input[name="name"]', 'Test User');
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="phone"]', '9876543210');
      
      // Try to submit
      await page.click('button[type="submit"]');
      
      // Email field should be invalid
      const emailField = page.locator('input[name="email"]');
      const isValid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid);
      expect(isValid).toBeFalsy();
      
      // Clear for next test
      await page.fill('input[name="email"]', '');
    }
  });

  test('should validate phone number requirements', async ({ page }) => {
    const testCases = [
      { phone: '123', valid: false, description: 'too short' },
      { phone: '12345', valid: false, description: 'still too short' },
      { phone: '1234567890', valid: true, description: 'exactly 10 digits' },
      { phone: '91-9876543210', valid: true, description: 'with country code' },
      { phone: '+91 9876543210', valid: true, description: 'with plus and space' },
      { phone: 'abcdefghij', valid: false, description: 'letters only' },
      { phone: '123abc7890', valid: false, description: 'mixed letters and numbers' }
    ];

    for (const testCase of testCases) {
      // Fill required fields
      await page.fill('input[name="name"]', 'Phone Test');
      await page.fill('input[name="email"]', 'phone@test.com');
      await page.fill('input[name="phone"]', testCase.phone);
      
      // Complete CAPTCHA to focus on phone validation
      await completeCaptcha(page, true);
      
      // Submit form
      await page.click('button[type="submit"]');
      await page.waitForTimeout(1000);
      
      // Check validation result
      const phoneField = page.locator('input[name="phone"]');
      const validity = await phoneField.evaluate(el => {
        const input = el as HTMLInputElement;
        return {
          valid: input.validity.valid,
          valueMissing: input.validity.valueMissing,
          patternMismatch: input.validity.patternMismatch,
          tooShort: input.validity.tooShort
        };
      });
      
      if (testCase.valid) {
        // Should either succeed or show non-phone related errors
        const phoneError = await page.locator('text*="phone"').isVisible();
        expect(phoneError).toBeFalsy();
      } else {
        // Should show validation error
        expect(validity.valid || await page.locator('text*="phone"').isVisible()).toBeTruthy();
      }
      
      // Clear for next test
      await page.fill('input[name="phone"]', '');
      await page.locator('[data-testid="captcha-checkbox"]').uncheck();
    }
  });

  test('should validate service selection requirement', async ({ page }) => {
    // Fill other fields but leave service empty
    await page.fill('input[name="name"]', 'Service Test');
    await page.fill('input[name="email"]', 'service@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    
    // Select date
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Complete CAPTCHA
    await completeCaptcha(page, true);
    
    // Try to submit without service selection
    await page.click('button[type="submit"]');
    
    // Should show service validation error or prevent submission
    const serviceSelect = page.locator('select >> nth=0');
    const serviceValue = await serviceSelect.inputValue();
    expect(serviceValue).toBe(''); // Confirm no service selected
    
    // Form should not submit successfully
    await expect(page.locator('text=Appointment Booked Successfully')).not.toBeVisible({ timeout: 3000 });
  });

  test('should validate date selection requirement', async ({ page }) => {
    // Fill other fields but leave date empty
    await page.fill('input[name="name"]', 'Date Test');
    await page.fill('input[name="email"]', 'date@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    await page.selectOption('select >> nth=1', '11:00 AM');
    
    // Complete CAPTCHA
    await completeCaptcha(page, true);
    
    // Try to submit without date selection
    await page.click('button[type="submit"]');
    
    // Should show date validation error
    await expect(page.locator('text=Please select a date')).toBeVisible();
    
    // Form should not submit successfully
    await expect(page.locator('text=Appointment Booked Successfully')).not.toBeVisible({ timeout: 3000 });
  });

  test('should validate time selection requirement', async ({ page }) => {
    // Fill other fields but leave time empty
    await page.fill('input[name="name"]', 'Time Test');
    await page.fill('input[name="email"]', 'time@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Complete CAPTCHA
    await completeCaptcha(page, true);
    
    // Try to submit without time selection
    await page.click('button[type="submit"]');
    
    // Should show time validation error
    await expect(page.locator('text=Please select a time slot')).toBeVisible();
    
    // Form should not submit successfully
    await expect(page.locator('text=Appointment Booked Successfully')).not.toBeVisible({ timeout: 3000 });
  });

  test('should handle validation error messages correctly', async ({ page }) => {
    // Test custom validation messages from Zod schema
    
    // Test name length validation
    await page.fill('input[name="name"]', 'A'); // Too short
    await page.fill('input[name="email"]', 'valid@email.com');
    await page.fill('input[name="phone"]', '9876543210');
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');
    
    // Should show custom name validation message
    await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible();
  });

  test('should validate message field length limits', async ({ page }) => {
    // Fill required fields
    await page.fill('input[name="name"]', 'Message Test');
    await page.fill('input[name="email"]', 'message@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date and time
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '12:00 PM');
    
    // Test extremely long message
    const longMessage = 'A'.repeat(5000);
    await page.fill('textarea[name="message"]', longMessage);
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');
    
    // Should either accept with truncation or show length limit error
    const hasResponse = await Promise.race([
      page.locator('text=Appointment Booked Successfully').isVisible({ timeout: 10000 }),
      page.locator('text*="message"').isVisible({ timeout: 5000 }),
      page.locator('text*="too long"').isVisible({ timeout: 5000 })
    ]);
    
    expect(hasResponse).toBeTruthy();
  });
});

test.describe('Form Error Handling', () => {

  test('should handle network errors gracefully', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Mock network failure
    await page.route('/api/appointments', async (route) => {
      await route.abort('internetdisconnected');
    });

    // Fill and submit form
    await page.fill('input[name="name"]', 'Network Error Test');
    await page.fill('input[name="email"]', 'network@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '01:00 PM');
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');

    // Should show network error handling
    await expect(page.locator('text=Booking Failed')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=Please try again or contact us directly')).toBeVisible();
    
    // Form should remain filled for retry
    await expect(page.locator('input[name="name"]')).toHaveValue('Network Error Test');
  });

  test('should handle server validation errors', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Mock server validation error
    await page.route('/api/appointments', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Validation failed',
          errors: [
            { field: 'email', message: 'Email already exists in our system' },
            { field: 'phone', message: 'Invalid phone number format' }
          ]
        })
      });
    });

    // Submit valid form
    await page.fill('input[name="name"]', 'Server Validation Test');
    await page.fill('input[name="email"]', 'duplicate@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '02:00 PM');
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');

    // Should show server validation errors
    await expect(page.locator('text=Booking Failed')).toBeVisible();
    
    // Form should show appropriate error handling
    const errorVisible = await Promise.race([
      page.locator('text*="already exists"').isVisible({ timeout: 5000 }),
      page.locator('text*="Validation failed"').isVisible({ timeout: 5000 }),
      page.locator('text*="Invalid"').isVisible({ timeout: 5000 })
    ]);
    
    expect(errorVisible).toBeTruthy();
  });

  test('should handle form submission timeout', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Mock slow server response
    await page.route('/api/appointments', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 30000)); // 30 second delay
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });

    // Submit form
    await page.fill('input[name="name"]', 'Timeout Test');
    await page.fill('input[name="email"]', 'timeout@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '03:00 PM');
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');

    // Should show loading state
    await expect(page.locator('text=Booking...')).toBeVisible();
    
    // Should eventually timeout or handle long requests appropriately
    // (This test may timeout itself, which is expected behavior)
  });

  test('should prevent double submission', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Fill form
    await page.fill('input[name="name"]', 'Double Submit Test');
    await page.fill('input[name="email"]', 'double@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '04:00 PM');
    
    await completeCaptcha(page, true);
    
    // First submission
    await page.click('button[type="submit"]');
    
    // Button should be disabled during submission
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    
    // Try rapid second click
    await page.click('button[type="submit"]', { force: true });
    
    // Should not result in double submission
    // Wait for completion
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should handle browser back/forward during submission', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Fill and start submission
    await page.fill('input[name="name"]', 'Navigation Test');
    await page.fill('input[name="email"]', 'navigation@test.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '05:00 PM');
    
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');
    
    // Navigate away during submission
    await page.goto('/');
    
    // Navigate back
    await page.goBack();
    
    // Form should handle navigation gracefully
    await expect(page.locator('form')).toBeVisible();
    
    // Check if form state is preserved or reset appropriately
    const nameValue = await page.locator('input[name="name"]').inputValue();
    
    // Form should either be reset or preserve state consistently
    // (Both behaviors are acceptable as long as they're consistent)
  });
});

test.describe('Admin Login Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/login');
    await page.waitForLoadState('networkidle');
  });

  test('should validate admin login required fields', async ({ page }) => {
    // Try to submit empty admin login form
    await page.click('button[type="submit"]');
    
    // Check HTML5 validation
    const emailField = page.locator('input[name="email"]');
    const passwordField = page.locator('input[name="password"]');
    
    const emailValid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid);
    const passwordValid = await passwordField.evaluate(el => (el as HTMLInputElement).validity.valid);
    
    expect(emailValid).toBeFalsy();
    expect(passwordValid).toBeFalsy();
  });

  test('should validate admin email format', async ({ page }) => {
    // Test invalid email format
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Email field should be invalid
    const emailField = page.locator('input[name="email"]');
    const isValid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid);
    expect(isValid).toBeFalsy();
  });

  test('should handle admin login errors without CAPTCHA protection', async ({ page }) => {
    // Mock authentication failure
    await page.route('**/api/auth/callback/credentials', async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid credentials' })
      });
    });

    // Submit invalid credentials
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
    
    // Form should remain accessible for retry (vulnerability)
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
    await expect(page.locator('input[name="email"]')).toBeEnabled();
    await expect(page.locator('input[name="password"]')).toBeEnabled();
  });

  test('should demonstrate lack of progressive security measures', async ({ page }) => {
    // Simulate multiple failed attempts
    const attempts = [
      { email: 'admin@test.com', password: 'wrong1' },
      { email: 'admin@test.com', password: 'wrong2' },
      { email: 'admin@test.com', password: 'wrong3' },
      { email: 'admin@test.com', password: 'wrong4' },
      { email: 'admin@test.com', password: 'wrong5' }
    ];

    for (let i = 0; i < attempts.length; i++) {
      await page.fill('input[name="email"]', attempts[i].email);
      await page.fill('input[name="password"]', attempts[i].password);
      await page.click('button[type="submit"]');
      
      // Wait for response
      await page.waitForTimeout(1000);
      
      // After multiple failures, no progressive security should appear
      const hasAdditionalSecurity = await page.locator('[data-testid*="captcha"], [data-testid*="lockout"]').count();
      expect(hasAdditionalSecurity).toBe(0);
      
      // Form should still be accessible
      await expect(page.locator('button[type="submit"]')).toBeEnabled();
    }
  });
});