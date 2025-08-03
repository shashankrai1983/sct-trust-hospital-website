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
 * Setup CAPTCHA mocking for tests
 * This intercepts Google's reCAPTCHA API calls and returns mock responses
 */
export async function setupCaptchaMocking(page: Page, config: CaptchaTestConfig = defaultCaptchaConfig) {
  // Mock the reCAPTCHA script loading
  await page.route('https://www.google.com/recaptcha/api.js*', async (route) => {
    const mockScript = `
      window.grecaptcha = {
        ready: function(callback) { 
          setTimeout(callback, 100); 
        },
        render: function(container, options) {
          const element = document.querySelector(container) || document.getElementById(container);
          if (element) {
            element.innerHTML = '<div data-testid="mock-recaptcha" style="width:304px;height:78px;border:1px solid #ccc;background:#f9f9f9;display:flex;align-items:center;justify-content:center;">Mock reCAPTCHA</div>';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.setAttribute('data-testid', 'captcha-checkbox');
            checkbox.style.margin = '10px';
            checkbox.onchange = function() {
              if (this.checked && options.callback) {
                const mockToken = '${config.mockResponse === 'success' ? CAPTCHA_MOCK_RESPONSES.SUCCESS : ''}';
                setTimeout(() => options.callback(mockToken), 500);
              }
            };
            element.querySelector('[data-testid="mock-recaptcha"]').appendChild(checkbox);
          }
          return 'mock-widget-id';
        },
        reset: function(widgetId) {
          const checkbox = document.querySelector('[data-testid="captcha-checkbox"]');
          if (checkbox) {
            checkbox.checked = false;
          }
        },
        getResponse: function(widgetId) {
          const checkbox = document.querySelector('[data-testid="captcha-checkbox"]');
          return checkbox && checkbox.checked ? '${CAPTCHA_MOCK_RESPONSES.SUCCESS}' : '';
        }
      };
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
 * Wait for CAPTCHA to be loaded and ready
 */
export async function waitForCaptchaReady(page: Page, timeout: number = 10000) {
  await page.waitForFunction(
    () => window.grecaptcha && window.grecaptcha.ready,
    { timeout }
  );
  
  // Wait for the CAPTCHA element to be visible
  await page.waitForSelector('[data-testid="mock-recaptcha"], .g-recaptcha', { 
    timeout,
    state: 'visible' 
  });
}

/**
 * Complete CAPTCHA challenge (for mocked tests)
 */
export async function completeCaptcha(page: Page, success: boolean = true) {
  // For mocked CAPTCHA, click the checkbox
  const mockCheckbox = page.locator('[data-testid="captcha-checkbox"]');
  
  if (await mockCheckbox.isVisible()) {
    if (success) {
      await mockCheckbox.check();
      // Wait for the token to be set
      await page.waitForTimeout(600);
    }
    return;
  }

  // For real CAPTCHA (if testing in real mode), we can't complete it automatically
  // This would require manual intervention or special test keys from Google
  if (success) {
    console.warn('Real CAPTCHA detected - cannot complete automatically in tests');
  }
}

/**
 * Reset CAPTCHA state
 */
export async function resetCaptcha(page: Page) {
  const mockCheckbox = page.locator('[data-testid="captcha-checkbox"]');
  
  if (await mockCheckbox.isVisible()) {
    await mockCheckbox.uncheck();
    return;
  }

  // For real CAPTCHA, call the reset function
  await page.evaluate(() => {
    if (window.grecaptcha && window.grecaptcha.reset) {
      window.grecaptcha.reset();
    }
  });
}

/**
 * Verify CAPTCHA visual elements are present
 */
export async function verifyCaptchaDisplay(page: Page) {
  // Check if CAPTCHA container is visible
  const captchaContainer = page.locator('[data-testid="mock-recaptcha"], .g-recaptcha');
  await expect(captchaContainer).toBeVisible();

  // Check CAPTCHA dimensions (should be standard Google reCAPTCHA size)
  const boundingBox = await captchaContainer.boundingBox();
  expect(boundingBox?.width).toBeGreaterThan(300);
  expect(boundingBox?.height).toBeGreaterThan(70);
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
 * Validate form submission with CAPTCHA
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
  
  // Complete CAPTCHA if requested
  if (completeCaptchaFirst) {
    await completeCaptcha(page, true);
  }
  
  // Submit form
  await page.click('button[type="submit"]');
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

// Type declarations for global grecaptcha object
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: string | Element, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'expired-callback'?: () => void;
        'error-callback'?: () => void;
      }) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}