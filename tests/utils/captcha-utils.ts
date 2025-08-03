/**
 * CAPTCHA Testing Utilities for Playwright Tests
 * 
 * This module provides utilities for testing reCAPTCHA integration in Playwright tests.
 * It includes mock strategies, test helpers, and validation utilities.
 */

import { Page, expect } from '@playwright/test';

export interface CaptchaTestConfig {
  siteKey: string;
  testMode: 'mock' | 'real' | 'bypass';
  mockResponse?: 'success' | 'failure' | 'timeout';
  waitTimeout?: number;
}

/**
 * Default CAPTCHA configuration for tests
 */
export const defaultCaptchaConfig: CaptchaTestConfig = {
  siteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // Google's test site key
  testMode: 'mock',
  mockResponse: 'success',
  waitTimeout: 10000,
};

/**
 * Mock CAPTCHA responses for testing different scenarios
 */
export const CAPTCHA_MOCK_RESPONSES = {
  SUCCESS: 'mock-captcha-success-token-12345',
  FAILURE: null,
  TIMEOUT: 'timeout',
  INVALID: 'invalid-token',
  EXPIRED: 'expired-token',
} as const;

/**
 * Setup CAPTCHA V3 mocking for tests
 * This intercepts Google's reCAPTCHA V3 API calls and returns mock responses
 */
export async function setupCaptchaMocking(page: Page, config: CaptchaTestConfig = defaultCaptchaConfig) {
  // Mock the reCAPTCHA V3 script loading
  await page.route('https://www.google.com/recaptcha/api.js*', async (route) => {
    const mockScript = `
      window.grecaptcha = {
        ready: function(callback) { 
          setTimeout(callback, 100); 
        },
        execute: function(siteKey, options) {
          return new Promise((resolve) => {
            // Simulate reCAPTCHA V3 execution
            setTimeout(() => {
              const mockToken = '${config.mockResponse === 'success' ? CAPTCHA_MOCK_RESPONSES.SUCCESS : ''}';
              resolve(mockToken);
              
              // Add visual indicator for testing
              const indicator = document.createElement('div');
              indicator.setAttribute('data-testid', 'recaptcha-v3-indicator');
              indicator.textContent = 'reCAPTCHA V3 executed (action: ' + (options?.action || 'default') + ')';
              indicator.style.cssText = 'position:fixed;top:10px;right:10px;background:#4CAF50;color:white;padding:8px;border-radius:4px;z-index:9999;font-size:12px;';
              document.body.appendChild(indicator);
              
              // Remove indicator after 2 seconds
              setTimeout(() => {
                if (indicator.parentNode) {
                  indicator.parentNode.removeChild(indicator);
                }
              }, 2000);
            }, 300);
          });
        }
      };
      
      // Mock the script loaded state
      window.recaptchaV3Loaded = true;
    `;
    
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: mockScript,
    });
  });

  // Mock the server-side verification endpoint
  await page.route('/api/appointments', async (route) => {
    const request = route.request();
    
    if (request.method() === 'POST') {
      const postData = request.postDataJSON();
      
      // Simulate CAPTCHA verification based on test config
      if (config.testMode === 'mock') {
        if (config.mockResponse === 'success' && postData?.captchaToken === CAPTCHA_MOCK_RESPONSES.SUCCESS) {
          await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
              success: true,
              message: 'Appointment booked successfully',
              appointmentId: 'mock-appointment-id-' + Date.now(),
            }),
          });
        } else if (config.mockResponse === 'failure' || !postData?.captchaToken) {
          await route.fulfill({
            status: 400,
            contentType: 'application/json',
            body: JSON.stringify({
              success: false,
              message: 'Invalid CAPTCHA verification. Please try again.',
            }),
          });
        } else {
          await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({
              success: false,
              message: 'Server error during CAPTCHA verification',
            }),
          });
        }
      } else {
        // Let real requests through for integration testing
        await route.continue();
      }
    } else {
      await route.continue();
    }
  });

  // Mock network timeouts if configured
  if (config.mockResponse === 'timeout') {
    await page.route('https://www.google.com/recaptcha/api/siteverify', async (route) => {
      // Simulate timeout by not responding
      await new Promise(resolve => setTimeout(resolve, config.waitTimeout || 10000));
      await route.abort('timedout');
    });
  }
}

/**
 * Wait for reCAPTCHA V3 to be loaded and ready
 */
export async function waitForCaptchaReady(page: Page, timeout: number = 10000) {
  await page.waitForFunction(
    () => window.grecaptcha && window.grecaptcha.ready && window.grecaptcha.execute,
    { timeout }
  );
  
  // Wait for the script to be fully loaded
  await page.waitForFunction(
    () => window.recaptchaV3Loaded === true,
    { timeout }
  );
}

/**
 * Complete reCAPTCHA V3 challenge (automatic execution simulation)
 */
export async function completeCaptcha(page: Page, success: boolean = true) {
  // reCAPTCHA V3 is invisible and executes automatically on form submission
  // We just need to wait for the execution indicator to appear
  if (success) {
    // Check if the reCAPTCHA V3 indicator appears (means execution was triggered)
    await page.waitForSelector('[data-testid="recaptcha-v3-indicator"]', { 
      timeout: 5000,
      state: 'visible' 
    });
    
    // Wait for the indicator to disappear (execution complete)
    await page.waitForSelector('[data-testid="recaptcha-v3-indicator"]', { 
      timeout: 3000,
      state: 'hidden' 
    });
  }
}

/**
 * Reset reCAPTCHA V3 state (not applicable for V3, but kept for compatibility)
 */
export async function resetCaptcha(page: Page) {
  // reCAPTCHA V3 doesn't have a reset state like V2
  // Each execution generates a new token automatically
  console.log('reCAPTCHA V3 reset - tokens are automatically regenerated on each execution');
}

/**
 * Verify reCAPTCHA V3 elements are present (privacy policy text)
 */
export async function verifyCaptchaDisplay(page: Page) {
  // Check if reCAPTCHA V3 privacy policy text is visible
  const privacyText = page.locator('text=This site is protected by reCAPTCHA');
  await expect(privacyText).toBeVisible();
  
  // Check for Google Privacy Policy and Terms links
  const privacyLink = page.locator('a[href="https://policies.google.com/privacy"]');
  const termsLink = page.locator('a[href="https://policies.google.com/terms"]');
  
  await expect(privacyLink).toBeVisible();
  await expect(termsLink).toBeVisible();
}

/**
 * Test CAPTCHA accessibility
 */
export async function testCaptchaAccessibility(page: Page) {
  // Check if CAPTCHA is keyboard accessible
  await page.keyboard.press('Tab');
  
  const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
  expect(['INPUT', 'BUTTON', 'DIV'].includes(focusedElement || '')).toBeTruthy();

  // Check for aria labels or roles
  const captchaElement = page.locator('[data-testid="mock-recaptcha"], .g-recaptcha');
  
  // reCAPTCHA should have proper accessibility attributes
  const hasAriaLabel = await captchaElement.getAttribute('aria-label');
  const hasRole = await captchaElement.getAttribute('role');
  
  // At least one accessibility attribute should be present
  expect(hasAriaLabel || hasRole).toBeTruthy();
}

/**
 * Simulate CAPTCHA network errors
 */
export async function simulateCaptchaNetworkError(page: Page, errorType: 'timeout' | 'failure' | 'offline') {
  switch (errorType) {
    case 'timeout':
      await page.route('https://www.google.com/recaptcha/**', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 30000));
        await route.abort('timedout');
      });
      break;
      
    case 'failure':
      await page.route('https://www.google.com/recaptcha/**', async (route) => {
        await route.fulfill({ status: 500, body: 'Server Error' });
      });
      break;
      
    case 'offline':
      await page.route('https://www.google.com/recaptcha/**', async (route) => {
        await route.abort('internetdisconnected');
      });
      break;
  }
}

/**
 * Performance testing utilities for CAPTCHA
 */
export async function measureCaptchaLoadTime(page: Page): Promise<number> {
  const startTime = Date.now();
  
  await waitForCaptchaReady(page);
  
  const endTime = Date.now();
  return endTime - startTime;
}

/**
 * Validate form submission with reCAPTCHA V3
 */
export async function submitFormWithCaptcha(
  page: Page, 
  formData: {
    name: string;
    email: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    message?: string;
  },
  completeCaptchaFirst: boolean = true
) {
  // Fill form fields
  await page.fill('input[name="name"]', formData.name);
  await page.fill('input[name="email"]', formData.email);
  await page.fill('input[name="phone"]', formData.phone);
  await page.selectOption('select >> nth=0', formData.service);
  
  // Select date
  await page.click('button:has-text("Pick a date")');
  await page.waitForSelector('[role="dialog"]');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  await page.click(`button:has-text("${tomorrow.getDate()}")`);
  
  // Select time
  await page.selectOption('select >> nth=1', formData.time);
  
  // Fill optional message
  if (formData.message) {
    await page.fill('textarea[name="message"]', formData.message);
  }
  
  // Submit form (reCAPTCHA V3 executes automatically on submission)
  await page.click('button[type="submit"]');
  
  // Wait for reCAPTCHA V3 execution if successful completion is expected
  if (completeCaptchaFirst) {
    await completeCaptcha(page, true);
  }
}

/**
 * Environment setup for CAPTCHA tests
 */
export async function setupTestEnvironment(page: Page, testConfig?: Partial<CaptchaTestConfig>) {
  const config = { ...defaultCaptchaConfig, ...testConfig };
  
  // Set up CAPTCHA mocking
  await setupCaptchaMocking(page, config);
  
  // Navigate to the contact page where the form is located
  await page.goto('/contact');
  
  // Wait for page to load and CAPTCHA to be ready
  await waitForCaptchaReady(page);
  
  return config;
}

// Type declarations for global grecaptcha V3 object
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    recaptchaV3Loaded?: boolean;
  }
}