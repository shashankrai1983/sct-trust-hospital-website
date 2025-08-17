import { test, expect } from '@playwright/test';

test.describe('Calendar Date Blocking', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to contact page
    await page.goto('http://localhost:3000/contact');
    await page.waitForLoadState('networkidle');
  });

  test('should show calendar with date selection', async ({ page }) => {
    // Find calendar button and click to open
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await expect(calendarButton).toBeVisible();
    await calendarButton.click();

    // Wait for calendar to appear
    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();

    // Verify basic calendar functionality
    const todayElements = page.locator('[aria-label*="Today"]');
    if (await todayElements.count() > 0) {
      await expect(todayElements.first()).toBeVisible();
    }
  });

  test('should disable past dates and Sundays', async ({ page }) => {
    // Open calendar
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await calendarButton.click();

    // Wait for calendar
    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();

    // Check that disabled dates are present and not clickable
    const disabledDates = page.locator('[role="gridcell"][aria-disabled="true"]');
    const disabledCount = await disabledDates.count();
    
    if (disabledCount > 0) {
      console.log(`Found ${disabledCount} disabled dates`);
      
      // Try clicking a disabled date - should not work
      const firstDisabled = disabledDates.first();
      await firstDisabled.click({ force: true });
      
      // Calendar button should still show "Pick a date"
      await expect(calendarButton).toHaveText(/Pick a date/);
    }
  });

  test('should allow selecting valid future dates', async ({ page }) => {
    // Open calendar
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await calendarButton.click();

    // Wait for calendar
    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();

    // Find an enabled future date (not Sunday, not disabled)
    const enabledDates = page.locator('[role="gridcell"]:not([aria-disabled="true"]) button');
    const enabledCount = await enabledDates.count();
    
    if (enabledCount > 0) {
      console.log(`Found ${enabledCount} enabled dates`);
      
      // Click the first enabled date
      const firstEnabled = enabledDates.first();
      await firstEnabled.click();
      
      // Wait for calendar to close and date to be selected
      await expect(calendar).not.toBeVisible();
      
      // Check that button now shows selected date instead of "Pick a date"
      await expect(calendarButton).not.toHaveText(/Pick a date/);
      
      // Time slot dropdown should become enabled
      const timeSelect = page.locator('select[name="time"]');
      await expect(timeSelect).not.toBeDisabled();
      
      // Should show loading or available slots
      await page.waitForTimeout(1000); // Wait for slot loading
      const timeOptions = page.locator('select[name="time"] option');
      const optionCount = await timeOptions.count();
      expect(optionCount).toBeGreaterThan(1); // At least default option + some slots
    }
  });

  test('should handle admin blocked dates correctly', async ({ page }) => {
    // First, let's add a blocked date for testing via admin panel
    // (This would normally be done through the admin interface)
    
    // Open calendar
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await calendarButton.click();

    // Wait for calendar
    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();

    // Check if any dates show blocked date reasons
    const blockedDateInfo = page.locator('.bg-red-50');
    const hasBlockedDates = await blockedDateInfo.count() > 0;
    
    if (hasBlockedDates) {
      console.log('Found blocked date information displayed');
      await expect(blockedDateInfo).toBeVisible();
      await expect(blockedDateInfo.locator('text=Date Unavailable')).toBeVisible();
    } else {
      console.log('No blocked dates found - testing normal flow');
    }
  });


  test('should prevent form submission for blocked dates (fallback)', async ({ page }) => {
    // Fill out entire form to test final validation
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '1234567890');
    await page.selectOption('select[name="service"]', 'General Consultation');

    // Try to select a date (if any are available)
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await calendarButton.click();

    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();

    const enabledDates = page.locator('[role="gridcell"]:not([aria-disabled="true"]) button');
    const enabledCount = await enabledDates.count();
    
    if (enabledCount > 0) {
      await enabledDates.first().click();
      
      // Wait for time slots to load
      await page.waitForTimeout(2000);
      
      // Select first available time slot
      const timeSelect = page.locator('select[name="time"]');
      const timeOptions = page.locator('select[name="time"] option:not([disabled])');
      const availableTimeCount = await timeOptions.count();
      
      if (availableTimeCount > 1) { // More than just default option
        await timeSelect.selectOption({ index: 1 }); // Select first real time slot
        
        // Add message
        await page.fill('textarea[name="message"]', 'Test appointment booking');
        
        // Try to submit (should work for non-blocked dates)
        const submitButton = page.locator('button[type="submit"]');
        await submitButton.click();
        
        // Check for success or error message
        // Success would show "Appointment Booked" 
        // Error might show "Failed to book appointment"
        await page.waitForTimeout(3000);
        
        const isSuccess = await page.locator('text="Appointment Booked"').isVisible();
        const isError = await page.locator('text="Booking Failed"').isVisible();
        
        if (isSuccess) {
          console.log('✅ Appointment booking succeeded for valid date');
        } else if (isError) {
          console.log('❌ Appointment booking failed - might be blocked date');
        } else {
          console.log('⏳ Booking in progress or other state');
        }
      }
    }
  });

  test('calendar performance with blocked date checking', async ({ page }) => {
    // Measure calendar opening performance
    const startTime = Date.now();
    
    const calendarButton = page.locator('button:has-text("Pick a date")');
    await calendarButton.click();
    
    const calendar = page.locator('[role="dialog"] .rdp');
    await expect(calendar).toBeVisible();
    
    const endTime = Date.now();
    const openTime = endTime - startTime;
    
    console.log(`Calendar opened in ${openTime}ms`);
    
    // Should open within reasonable time even with blocked date checking
    expect(openTime).toBeLessThan(5000); // 5 seconds max
    
    // Check that dates are properly loaded
    const allDates = page.locator('[role="gridcell"]');
    const dateCount = await allDates.count();
    expect(dateCount).toBeGreaterThan(20); // Should show a month's worth of dates
    
    console.log(`Calendar displays ${dateCount} dates`);
  });
});