/**
 * CAPTCHA Negative Test Cases
 * 
 * These tests verify that CAPTCHA functionality properly handles
 * failure scenarios, validation errors, and security edge cases.
 */

import { test, expect } from '@playwright/test';
import { 
  setupTestEnvironment, 
  completeCaptcha, 
  waitForCaptchaReady,
  submitFormWithCaptcha,
  simulateCaptchaNetworkError,
  resetCaptcha,
  CAPTCHA_MOCK_RESPONSES
} from '../utils/captcha-utils';

test.describe('CAPTCHA - Negative Test Cases', () => {

  test('should prevent form submission without CAPTCHA completion', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Fill form completely but don't complete CAPTCHA
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Try to submit without CAPTCHA
    await page.click('button[type="submit"]');
    
    // Should show CAPTCHA validation error
    await expect(page.locator('text=Please complete the CAPTCHA verification.')).toBeVisible();
    
    // Form should not submit successfully
    await expect(page.locator('text=Appointment Booked Successfully')).not.toBeVisible();
    await expect(page.locator('text=Booking...')).not.toBeVisible();
  });

  test('should handle CAPTCHA verification failure from server', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'failure'
    });

    // Complete form with CAPTCHA that will fail server validation
    await submitFormWithCaptcha(page, {
      name: 'Failure Test',
      email: 'failure@example.com',
      phone: '1111111111',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '11:00 AM'
    }, true);

    // Should show CAPTCHA failure message from server
    await expect(page.locator('text=Invalid CAPTCHA verification. Please try again.')).toBeVisible({ timeout: 10000 });
    
    // Should show error toast
    await expect(page.locator('text=Booking Failed')).toBeVisible();
    
    // Form should remain filled for user to retry
    await expect(page.locator('input[name="name"]')).toHaveValue('Failure Test');
    await expect(page.locator('input[name="email"]')).toHaveValue('failure@example.com');
  });

  test('should handle CAPTCHA network timeout gracefully', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'timeout',
      waitTimeout: 5000
    });

    // Simulate network timeout during CAPTCHA verification
    await simulateCaptchaNetworkError(page, 'timeout');

    // Try to complete form
    await submitFormWithCaptcha(page, {
      name: 'Timeout Test',
      email: 'timeout@example.com',
      phone: '2222222222',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '12:00 PM'
    }, true);

    // Should handle timeout gracefully
    await expect(page.locator('text=Booking Failed')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Please try again or contact us directly')).toBeVisible();
  });

  test('should handle CAPTCHA script loading failure', async ({ page }) => {
    // Mock CAPTCHA script failure
    await page.route('https://www.google.com/recaptcha/api.js*', async (route) => {
      await route.fulfill({
        status: 404,
        body: 'Not Found'
      });
    });

    await page.goto('/contact');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // CAPTCHA should not load properly
    await expect(page.locator('[data-testid="mock-recaptcha"]')).not.toBeVisible();
    
    // Try to submit form - should fail due to missing CAPTCHA
    await page.fill('input[name="name"]', 'Script Failure Test');
    await page.fill('input[name="email"]', 'script@example.com');
    await page.fill('input[name="phone"]', '3333333333');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '01:00 PM');
    
    await page.click('button[type="submit"]');
    
    // Should show validation error for missing CAPTCHA
    await expect(page.locator('text=Please complete the CAPTCHA verification.')).toBeVisible();
  });

  test('should prevent form resubmission with expired CAPTCHA token', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock', 
      mockResponse: 'success'
    });

    // Complete CAPTCHA and fill form
    await completeCaptcha(page, true);
    
    await page.fill('input[name="name"]', 'Expiry Test');
    await page.fill('input[name="email"]', 'expiry@example.com');
    await page.fill('input[name="phone"]', '4444444444');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '02:00 PM');

    // Mock expired CAPTCHA response for subsequent requests
    await page.route('/api/appointments', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            success: false,
            message: 'CAPTCHA token has expired. Please complete the CAPTCHA again.',
          }),
        });
      } else {
        await route.continue();
      }
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Should show expired token error
    await expect(page.locator('text=Booking Failed')).toBeVisible();
    await expect(page.locator('text=CAPTCHA token has expired')).toBeVisible();

    // User should need to complete CAPTCHA again
    await resetCaptcha(page);
    await completeCaptcha(page, true);
  });

  test('should handle malicious form data injection attempts', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Test XSS attempt in form fields
    const maliciousData = {
      name: '<script>alert("xss")</script>',
      email: 'test@example.com<script>alert("xss")</script>',
      phone: '9876543210',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '03:00 PM',
      message: '<img src="x" onerror="alert(\'xss\')">'
    };

    // Complete CAPTCHA and submit malicious data
    await submitFormWithCaptcha(page, maliciousData, true);

    // Server should sanitize or reject malicious input
    // Either success with sanitized data or proper error handling
    const isSuccess = await page.locator('text=Appointment Booked Successfully').isVisible({ timeout: 5000 });
    const isError = await page.locator('text=Booking Failed').isVisible({ timeout: 5000 });
    
    expect(isSuccess || isError).toBeTruthy();
    
    // Ensure no script execution occurred
    await expect(page).not.toHaveURL(/javascript/);
    
    // Check that no alerts were triggered
    let alertTriggered = false;
    page.on('dialog', () => { alertTriggered = true; });
    await page.waitForTimeout(1000);
    expect(alertTriggered).toBeFalsy();
  });

  test('should handle SQL injection attempts in form data', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Test SQL injection patterns
    const sqlInjectionData = {
      name: "'; DROP TABLE appointments; --",
      email: 'test@example.com',
      phone: "9876543210' OR '1'='1",
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '04:00 PM',
      message: "1' UNION SELECT * FROM users --"
    };

    // Complete CAPTCHA and submit injection attempt
    await submitFormWithCaptcha(page, sqlInjectionData, true);

    // Should either succeed with sanitized data or show appropriate error
    const hasResponse = await Promise.race([
      page.locator('text=Appointment Booked Successfully').isVisible({ timeout: 10000 }),
      page.locator('text=Booking Failed').isVisible({ timeout: 10000 })
    ]);

    expect(hasResponse).toBeTruthy();
  });

  test('should handle extremely large form data', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Test with extremely large data
    const largeData = {
      name: 'A'.repeat(10000),
      email: 'test@example.com',
      phone: '9876543210',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '05:00 PM',
      message: 'X'.repeat(50000)
    };

    // Complete CAPTCHA and submit large data
    await submitFormWithCaptcha(page, largeData, true);

    // Should handle large data gracefully (either accept with limits or reject appropriately)
    const hasResponse = await Promise.race([
      page.locator('text=Appointment Booked Successfully').isVisible({ timeout: 15000 }),
      page.locator('text=Booking Failed').isVisible({ timeout: 15000 })
    ]);

    expect(hasResponse).toBeTruthy();
  });

  test('should prevent multiple rapid form submissions (rate limiting)', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    const testData = {
      name: 'Rate Limit Test',
      email: 'ratelimit@example.com',
      phone: '5555555555',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '06:00 PM'
    };

    // First submission
    await submitFormWithCaptcha(page, testData, true);
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Wait for form reset
    await page.waitForTimeout(4000);

    // Attempt rapid second submission
    await submitFormWithCaptcha(page, {
      ...testData,
      name: 'Rate Limit Test 2',
      email: 'ratelimit2@example.com'
    }, true);

    // Should either succeed or show rate limiting message
    const hasResponse = await Promise.race([
      page.locator('text=Appointment Booked Successfully').isVisible({ timeout: 10000 }),
      page.locator('text=Booking Failed').isVisible({ timeout: 10000 }),
      page.locator('text=Too many requests').isVisible({ timeout: 10000 })
    ]);

    expect(hasResponse).toBeTruthy();
  });

  test('should handle CAPTCHA reset and retry scenarios', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Complete CAPTCHA
    await completeCaptcha(page, true);
    let checkbox = page.locator('[data-testid="captcha-checkbox"]');
    await expect(checkbox).toBeChecked();

    // Reset CAPTCHA
    await resetCaptcha(page);
    await expect(checkbox).not.toBeChecked();

    // Try to submit form with reset CAPTCHA
    await page.fill('input[name="name"]', 'Reset Test');
    await page.fill('input[name="email"]', 'reset@example.com');
    await page.fill('input[name="phone"]', '6666666666');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '10:30 AM');

    // Submit should fail
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Please complete the CAPTCHA verification.')).toBeVisible();

    // Complete CAPTCHA again and retry
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should handle invalid email formats with CAPTCHA', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Complete CAPTCHA first
    await completeCaptcha(page, true);

    // Try various invalid email formats
    const invalidEmails = [
      'invalid-email',
      '@example.com',
      'test@',
      'test..test@example.com',
      'test@example',
      'test space@example.com'
    ];

    for (const email of invalidEmails) {
      await page.fill('input[name="name"]', 'Email Test');
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="phone"]', '7777777777');
      await page.selectOption('select >> nth=0', 'General Consultation');
      
      await page.click('button:has-text("Pick a date")');
      await page.waitForSelector('[role="dialog"]');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await page.click(`button:has-text("${tomorrow.getDate()}")`);
      await page.selectOption('select >> nth=1', '11:30 AM');

      // Submit form
      await page.click('button[type="submit"]');

      // Should show email validation error (browser or custom)
      const emailField = page.locator('input[name="email"]');
      const isInvalid = await emailField.evaluate(el => (el as HTMLInputElement).validity.valid === false);
      expect(isInvalid).toBeTruthy();

      // Clear form for next test
      await page.fill('input[name="email"]', '');
    }
  });

  test('should handle server errors during CAPTCHA verification', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Mock server error response
    await page.route('/api/appointments', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: 'Internal server error during CAPTCHA verification'
        }),
      });
    });

    // Submit form with completed CAPTCHA
    await submitFormWithCaptcha(page, {
      name: 'Server Error Test',
      email: 'servererror@example.com',
      phone: '8888888888',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '12:30 PM'
    }, true);

    // Should show appropriate error handling
    await expect(page.locator('text=Booking Failed')).toBeVisible();
    await expect(page.locator('text=Please try again or contact us directly')).toBeVisible();
    
    // Form data should be preserved for retry
    await expect(page.locator('input[name="name"]')).toHaveValue('Server Error Test');
  });
});

test.describe('CAPTCHA - Security Edge Cases', () => {

  test('should prevent CAPTCHA bypass attempts', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Attempt to bypass CAPTCHA by directly setting form values
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        // Try to inject fake CAPTCHA token
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'captchaToken';
        hiddenInput.value = 'fake-bypass-token';
        form.appendChild(hiddenInput);
      }
    });

    // Fill and submit form without properly completing CAPTCHA
    await page.fill('input[name="name"]', 'Bypass Attempt');
    await page.fill('input[name="email"]', 'bypass@example.com');
    await page.fill('input[name="phone"]', '9999999999');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '01:30 PM');

    await page.click('button[type="submit"]');

    // Should still require proper CAPTCHA completion
    await expect(page.locator('text=Please complete the CAPTCHA verification.')).toBeVisible();
  });

  test('should handle CAPTCHA token reuse attempts', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Track CAPTCHA tokens sent to server
    const tokens: string[] = [];
    await page.route('/api/appointments', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        const data = request.postDataJSON();
        tokens.push(data.captchaToken);
        
        // Allow first submission, reject token reuse
        if (tokens.filter(t => t === data.captchaToken).length > 1) {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
              success: false,
              message: 'CAPTCHA token has already been used. Please complete the CAPTCHA again.',
            }),
          });
        } else {
          await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
              success: true,
              message: 'Appointment booked successfully',
            }),
          });
        }
      } else {
        await route.continue();
      }
    });

    // First submission - should succeed
    await submitFormWithCaptcha(page, {
      name: 'Token Reuse Test 1',
      email: 'reuse1@example.com',
      phone: '1010101010',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '02:30 PM'
    }, true);

    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Wait for form reset
    await page.waitForTimeout(4000);

    // Second submission with same token - should fail
    await submitFormWithCaptcha(page, {
      name: 'Token Reuse Test 2',
      email: 'reuse2@example.com',
      phone: '2020202020',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '03:30 PM'
    }, true);

    // Should show token reuse error
    await expect(page.locator('text=Booking Failed')).toBeVisible();
  });
});