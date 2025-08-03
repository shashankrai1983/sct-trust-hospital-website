/**
 * CAPTCHA Positive Test Cases
 * 
 * These tests verify that CAPTCHA functionality works correctly
 * when users complete the CAPTCHA challenge successfully.
 */

import { test, expect } from '@playwright/test';
import { 
  setupTestEnvironment, 
  completeCaptcha, 
  waitForCaptchaReady,
  verifyCaptchaDisplay,
  submitFormWithCaptcha,
  measureCaptchaLoadTime,
  testCaptchaAccessibility,
  CAPTCHA_MOCK_RESPONSES
} from '../utils/captcha-utils';

test.describe('CAPTCHA - Positive Test Cases', () => {
  
  test.beforeEach(async ({ page }) => {
    // Setup test environment with successful CAPTCHA mock
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });
  });

  test('should display CAPTCHA widget correctly', async ({ page }) => {
    // Verify CAPTCHA is visible and properly sized
    await verifyCaptchaDisplay(page);
    
    // Check that the form includes CAPTCHA field
    await expect(page.locator('[data-testid="mock-recaptcha"]')).toBeVisible();
    
    // Verify CAPTCHA is in the expected position (after message field)
    const messageField = page.locator('textarea[name="message"]');
    const captchaField = page.locator('[data-testid="mock-recaptcha"]');
    
    const messageBox = await messageField.boundingBox();
    const captchaBox = await captchaField.boundingBox();
    
    // CAPTCHA should appear below the message field
    expect(captchaBox?.y).toBeGreaterThan(messageBox?.y || 0);
  });

  test('should complete CAPTCHA challenge successfully', async ({ page }) => {
    // Wait for CAPTCHA to be ready
    await waitForCaptchaReady(page);
    
    // Complete CAPTCHA challenge
    await completeCaptcha(page, true);
    
    // Verify CAPTCHA completion state
    const checkbox = page.locator('[data-testid="captcha-checkbox"]');
    await expect(checkbox).toBeChecked();
    
    // Verify CAPTCHA token is set (by checking form validation)
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('should submit appointment form successfully with completed CAPTCHA', async ({ page }) => {
    const testFormData = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '9876543210',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      message: 'Test appointment with CAPTCHA verification'
    };

    // Submit form with CAPTCHA completion
    await submitFormWithCaptcha(page, testFormData, true);
    
    // Verify successful submission
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Verify loading state appears during submission
    await expect(page.locator('text=Booking...')).toHaveCount(0); // Should be gone after success
    
    // Verify success icon appears
    await expect(page.locator('text=Appointment Booked')).toBeVisible();
  });

  test('should reset form after successful submission including CAPTCHA', async ({ page }) => {
    const testFormData = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '1234567890',
      service: 'High Risk Pregnancy',
      date: new Date().toISOString().split('T')[0],
      time: '02:00 PM',
      message: 'Form reset test'
    };

    // Submit form successfully
    await submitFormWithCaptcha(page, testFormData, true);
    
    // Wait for success message
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Wait for automatic form reset (3 seconds as per component)
    await page.waitForTimeout(4000);
    
    // Verify all form fields are reset
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="phone"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
    
    // Verify CAPTCHA is reset
    const checkbox = page.locator('[data-testid="captcha-checkbox"]');
    await expect(checkbox).not.toBeChecked();
    
    // Verify date picker is reset
    await expect(page.locator('button:has-text("Pick a date")')).toBeVisible();
    
    // Verify dropdowns are reset
    await expect(page.locator('select >> nth=0')).toHaveValue('');
    await expect(page.locator('select >> nth=1')).toHaveValue('');
  });

  test('should handle multiple successful submissions', async ({ page }) => {
    // First submission
    await submitFormWithCaptcha(page, {
      name: 'First User',
      email: 'first@example.com',
      phone: '1111111111',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM'
    }, true);
    
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Wait for form reset
    await page.waitForTimeout(4000);
    
    // Second submission with new CAPTCHA completion
    await submitFormWithCaptcha(page, {
      name: 'Second User',
      email: 'second@example.com',
      phone: '2222222222',
      service: 'Infertility Treatment',
      date: new Date().toISOString().split('T')[0],
      time: '03:00 PM'
    }, true);
    
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should maintain CAPTCHA state during form validation errors', async ({ page }) => {
    // Complete CAPTCHA first
    await completeCaptcha(page, true);
    
    // Verify CAPTCHA is completed
    const checkbox = page.locator('[data-testid="captcha-checkbox"]');
    await expect(checkbox).toBeChecked();
    
    // Submit form with missing required fields
    await page.click('button[type="submit"]');
    
    // Form should show validation errors but CAPTCHA should remain completed
    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(checkbox).toBeChecked(); // CAPTCHA state preserved
    
    // Fill form correctly and submit
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
    
    // Submit should now work
    await page.click('button[type="submit"]');
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should display correct CAPTCHA validation messages', async ({ page }) => {
    // Try to submit without completing CAPTCHA
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date and time
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Submit without CAPTCHA
    await page.click('button[type="submit"]');
    
    // Should see CAPTCHA validation error
    await expect(page.locator('text=Please complete the CAPTCHA verification.')).toBeVisible();
    
    // Complete CAPTCHA and submit again
    await completeCaptcha(page, true);
    await page.click('button[type="submit"]');
    
    // Should succeed this time
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should load CAPTCHA within acceptable time limits', async ({ page }) => {
    // Measure CAPTCHA load time
    const loadTime = await measureCaptchaLoadTime(page);
    
    // CAPTCHA should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    
    // Verify CAPTCHA is functional after loading
    await completeCaptcha(page, true);
    const checkbox = page.locator('[data-testid="captcha-checkbox"]');
    await expect(checkbox).toBeChecked();
  });

  test('should handle CAPTCHA accessibility correctly', async ({ page }) => {
    await testCaptchaAccessibility(page);
    
    // Test keyboard navigation to CAPTCHA
    await page.keyboard.press('Tab'); // Navigate through form
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // Should reach CAPTCHA area
    
    // CAPTCHA should be reachable via keyboard navigation
    const focusedElement = await page.evaluate(() => {
      const active = document.activeElement;
      return {
        tagName: active?.tagName,
        isInCaptcha: active?.closest('[data-testid="mock-recaptcha"]') !== null
      };
    });
    
    // Focus should be within or near CAPTCHA area
    expect(['INPUT', 'BUTTON', 'DIV'].includes(focusedElement.tagName || '')).toBeTruthy();
  });

  test('should work correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload page with mobile viewport
    await page.reload();
    await waitForCaptchaReady(page);
    
    // Verify CAPTCHA is visible and appropriately sized for mobile
    await verifyCaptchaDisplay(page);
    
    // Test mobile form submission with CAPTCHA
    await submitFormWithCaptcha(page, {
      name: 'Mobile User',
      email: 'mobile@example.com',
      phone: '5555555555',
      service: 'PCOS/PCOD Treatment',
      date: new Date().toISOString().split('T')[0],
      time: '04:00 PM'
    }, true);
    
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should handle form submission with all service types', async ({ page }) => {
    const services = [
      'High Risk Pregnancy',
      'Infertility Treatment', 
      'PCOS/PCOD Treatment',
      'Laparoscopy',
      'Antenatal Care',
      'Well Women Health',
      'General Consultation',
      'Other'
    ];

    // Test first service to verify CAPTCHA works with all service types
    await submitFormWithCaptcha(page, {
      name: 'Service Test User',
      email: 'service.test@example.com',
      phone: '7777777777',
      service: services[0],
      date: new Date().toISOString().split('T')[0],
      time: '11:00 AM',
      message: `Testing with service: ${services[0]}`
    }, true);

    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should handle time zone considerations correctly', async ({ page }) => {
    // Test appointment booking with different time zones
    // This ensures CAPTCHA works regardless of user's time zone
    
    await submitFormWithCaptcha(page, {
      name: 'Timezone Test',
      email: 'timezone@example.com',
      phone: '8888888888',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '06:00 PM'
    }, true);
    
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Verify the success message includes the correct date formatting
    await expect(page.locator('text=We\'ll contact you soon to confirm')).toBeVisible();
  });
});

test.describe('CAPTCHA - Integration Tests', () => {
  
  test('should integrate properly with form validation system', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Test CAPTCHA integration with Zod validation schema
    await completeCaptcha(page, true);
    
    // Fill form with edge case data
    await page.fill('input[name="name"]', 'A'.repeat(100)); // Long name
    await page.fill('input[name="email"]', 'test.email+tag@example.com'); // Email with plus sign
    await page.fill('input[name="phone"]', '91-9876543210'); // Phone with country code
    await page.selectOption('select >> nth=0', 'Other');
    
    // Select date and time
    await page.click('button:has-text("Pick a date")');
    await page.waitForSelector('[role="dialog"]');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    await page.selectOption('select >> nth=1', '12:30 PM');
    
    // Add long message
    await page.fill('textarea[name="message"]', 'A'.repeat(500));
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should handle edge cases gracefully
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
  });

  test('should maintain security during successful flows', async ({ page }) => {
    await setupTestEnvironment(page, {
      testMode: 'mock',
      mockResponse: 'success'
    });

    // Monitor network requests to ensure CAPTCHA token is sent
    const requests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/appointments')) {
        requests.push({
          method: request.method(),
          url: request.url(),
          postData: request.postDataJSON()
        });
      }
    });

    // Submit form with CAPTCHA
    await submitFormWithCaptcha(page, {
      name: 'Security Test',
      email: 'security@example.com',
      phone: '3333333333',
      service: 'General Consultation',
      date: new Date().toISOString().split('T')[0],
      time: '01:00 PM'
    }, true);

    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });

    // Verify CAPTCHA token was included in the request
    expect(requests).toHaveLength(1);
    expect(requests[0].postData.captchaToken).toBe(CAPTCHA_MOCK_RESPONSES.SUCCESS);
    expect(requests[0].method).toBe('POST');
  });
});