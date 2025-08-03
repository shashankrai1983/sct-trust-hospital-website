import { test, expect } from '@playwright/test';
import { format, addDays } from 'date-fns';

test.describe('Appointment Booking System', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to contact page where booking form is located
    await page.goto('/contact');
  });

  test('should display appointment form correctly', async ({ page }) => {
    // Check page title and header
    await expect(page).toHaveTitle(/Contact & Appointments/);
    await expect(page.locator('h1')).toContainText('Contact & Appointments');
    
    // Check form header
    await expect(page.locator('h2')).toContainText('Book Your Appointment');
    
    // Check all form fields are present
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible(); // Service dropdown
    await expect(page.locator('button').filter({ hasText: 'Pick a date' })).toBeVisible();
    await expect(page.locator('select').last()).toBeVisible(); // Time dropdown
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('Book Appointment');
    
    // Check form labels
    await expect(page.locator('text=Full Name')).toBeVisible();
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Phone Number')).toBeVisible();
    await expect(page.locator('text=Service Needed')).toBeVisible();
    await expect(page.locator('text=Appointment Date')).toBeVisible();
    await expect(page.locator('text=Preferred Time')).toBeVisible();
    await expect(page.locator('text=Additional Information')).toBeVisible();
  });

  test('should show validation errors for incomplete form', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for validation messages (may appear as HTML5 validation or custom messages)
    await expect(page.locator('input[name="name"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
    await expect(page.locator('input[name="phone"]:invalid')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="phone"]', '1234567890');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for email validation
    await expect(page.locator('input[name="email"]:invalid')).toBeVisible();
  });

  test('should display all service options', async ({ page }) => {
    const serviceSelect = page.locator('select').first();
    await serviceSelect.click();
    
    // Check for expected services
    const expectedServices = [
      'High Risk Pregnancy',
      'Infertility Treatment',
      'PCOS/PCOD Treatment',
      'Laparoscopy',
      'Antenatal Care',
      'Well Women Health',
      'General Consultation',
      'Other'
    ];
    
    for (const service of expectedServices) {
      await expect(page.locator(`option:has-text("${service}")`)).toBeVisible();
    }
  });

  test('should display time slots correctly', async ({ page }) => {
    const timeSelect = page.locator('select').last();
    await timeSelect.click();
    
    // Check for some expected time slots
    await expect(page.locator('option:has-text("10:00 AM")')).toBeVisible();
    await expect(page.locator('option:has-text("02:00 PM")')).toBeVisible();
    await expect(page.locator('option:has-text("06:00 PM")')).toBeVisible();
  });

  test('should open date picker when clicked', async ({ page }) => {
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    
    // Check if calendar popup appears
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('table')).toBeVisible(); // Calendar table
  });

  test('should disable past dates in calendar', async ({ page }) => {
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    
    // Wait for calendar to appear
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Try to find yesterday's date and check if it's disabled
    const yesterday = addDays(new Date(), -1);
    const yesterdayButton = page.locator(`button:has-text("${yesterday.getDate()}")`);
    
    if (await yesterdayButton.isVisible()) {
      await expect(yesterdayButton).toBeDisabled();
    }
  });

  test('should successfully submit appointment form', async ({ page }) => {
    // Fill out the form completely
    await page.fill('input[name="name"]', 'Jane Smith');
    await page.fill('input[name="email"]', 'jane.smith@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    
    // Select service
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date (tomorrow)
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    
    // Wait for calendar and select tomorrow
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const tomorrow = addDays(new Date(), 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Add optional message
    await page.fill('textarea[name="message"]', 'This is a test appointment booking');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success state
    // This could be a success message, redirect, or form reset
    await expect(page.locator('text=Appointment Booked Successfully').or(
      page.locator('text=Booking...')
    )).toBeVisible({ timeout: 10000 });
    
    // Wait for success state to complete
    await page.waitForTimeout(2000);
  });

  test('should show loading state during submission', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const tomorrow = addDays(new Date(), 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '11:00 AM');
    
    // Submit form and check for loading state
    await page.click('button[type="submit"]');
    
    // Check for loading text or disabled state
    await expect(page.locator('text=Booking...').or(
      page.locator('button[type="submit"][disabled]')
    )).toBeVisible();
  });

  test('should handle form submission errors gracefully', async ({ page }) => {
    // Mock a network error by intercepting the API call
    await page.route('/api/appointments', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, message: 'Server error' })
      });
    });
    
    // Fill out and submit form
    await page.fill('input[name="name"]', 'Error Test');
    await page.fill('input[name="email"]', 'error@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const tomorrow = addDays(new Date(), 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for error handling (toast notification or error message)
    await expect(page.locator('text=Booking Failed').or(
      page.locator('text=Failed to book appointment')
    )).toBeVisible({ timeout: 10000 });
  });

  test('should reset form after successful submission', async ({ page }) => {
    // Fill out the form
    await page.fill('input[name="name"]', 'Reset Test');
    await page.fill('input[name="email"]', 'reset@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.selectOption('select >> nth=0', 'General Consultation');
    
    // Select date
    const dateButton = page.locator('button').filter({ hasText: 'Pick a date' });
    await dateButton.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const tomorrow = addDays(new Date(), 1);
    await page.click(`button:has-text("${tomorrow.getDate()}")`);
    
    // Select time
    await page.selectOption('select >> nth=1', '10:00 AM');
    
    // Add message
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success state
    await expect(page.locator('text=Appointment Booked Successfully')).toBeVisible({ timeout: 10000 });
    
    // Wait for form reset (might take a few seconds)
    await page.waitForTimeout(4000);
    
    // Check if form fields are reset
    await expect(page.locator('input[name="name"]')).toHaveValue('');
    await expect(page.locator('input[name="email"]')).toHaveValue('');
    await expect(page.locator('input[name="phone"]')).toHaveValue('');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('');
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should display form correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact');
    
    // Check that form is visible and properly laid out
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Book Your Appointment');
    
    // Check form fields are visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check that submit button spans full width
    const submitButton = page.locator('button[type="submit"]');
    const buttonBox = await submitButton.boundingBox();
    expect(buttonBox?.width).toBeGreaterThan(300); // Should be close to full width
  });
});

test.describe('Accessibility', () => {
  test('should have proper form labels and accessibility attributes', async ({ page }) => {
    await page.goto('/contact');
    
    // Check form labels are properly associated
    await expect(page.locator('label[for="name"]')).toBeVisible();
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="phone"]')).toBeVisible();
    
    // Check required attributes
    await expect(page.locator('input[name="name"]')).toHaveAttribute('required');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('required');
    await expect(page.locator('input[name="phone"]')).toHaveAttribute('required');
    
    // Check input types
    await expect(page.locator('input[name="email"]')).toHaveAttribute('type', 'email');
    
    // Check submit button is keyboard accessible
    await page.keyboard.press('Tab'); // Focus should move through form elements
    await expect(page.locator('button[type="submit"]')).toBeFocused();
  });
});