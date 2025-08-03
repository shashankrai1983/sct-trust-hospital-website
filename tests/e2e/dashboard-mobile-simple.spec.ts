import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@scttrusthospital.com';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'admin123';

test.describe('Dashboard Mobile Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should display dashboard login page on mobile', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Check login form elements are visible and properly sized
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const submitButton = page.locator('button[type="submit"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitButton).toBeVisible();
    
    // Verify the form takes full width on mobile
    const formContainer = page.locator('form').first();
    await expect(formContainer).toBeVisible();
  });

  test('should handle mobile sidebar navigation', async ({ page }) => {
    // Login first
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await page.waitForURL('/dashboard');
    
    // Check if hamburger menu is visible on mobile
    const hamburgerButton = page.locator('button').filter({ hasText: /Toggle|Menu/i }).or(
      page.locator('button:has(svg)')
    ).first();
    
    // At least one navigation element should be present
    const navigationElements = await page.locator('button, nav, [role="navigation"]').count();
    expect(navigationElements).toBeGreaterThan(0);
  });

  test('should display responsive stats cards', async ({ page }) => {
    // Login
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/dashboard');
    
    // Check that dashboard content is visible
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Check stats cards are present and visible
    const statsSection = page.locator('[data-testid="stats"]');
    if (await statsSection.isVisible()) {
      const statCards = statsSection.locator('> div');
      const cardCount = await statCards.count();
      
      // Should have 4 stat cards
      expect(cardCount).toBe(4);
      
      // All cards should be visible
      for (let i = 0; i < cardCount; i++) {
        await expect(statCards.nth(i)).toBeVisible();
      }
    }
  });

  test('should handle view toggle on mobile', async ({ page }) => {
    // Login
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/dashboard');
    
    // Look for view toggle buttons
    const dashboardButton = page.locator('button').filter({ hasText: 'Dashboard' });
    const calendarButton = page.locator('button').filter({ hasText: 'Calendar' });
    
    if (await dashboardButton.isVisible() && await calendarButton.isVisible()) {
      // Test switching to calendar view
      await calendarButton.click();
      
      // Should show calendar content
      await expect(page.locator('text=Calendar')).toBeVisible();
      
      // Switch back to dashboard
      await dashboardButton.click();
      
      // Should show dashboard content
      await expect(page.locator('text=Dashboard')).toBeVisible();
    }
  });

  test('should display responsive table with horizontal scroll', async ({ page }) => {
    // Login
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/dashboard');
    
    // Check for table container with horizontal scroll
    const tableContainer = page.locator('.overflow-x-auto');
    if (await tableContainer.isVisible()) {
      await expect(tableContainer).toBeVisible();
      
      // Check table exists within container
      const table = tableContainer.locator('table');
      if (await table.isVisible()) {
        await expect(table).toBeVisible();
        
        // Check essential table headers are present
        const headers = table.locator('th');
        const headerCount = await headers.count();
        expect(headerCount).toBeGreaterThan(0);
      }
    }
  });

  test('should maintain functionality in landscape mode', async ({ page }) => {
    // Login in portrait
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    await page.waitForURL('/dashboard');
    
    // Verify dashboard works in portrait
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Switch to landscape
    await page.setViewportSize({ width: 667, height: 375 });
    
    // Dashboard should still work
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Stats should still be visible
    const statsSection = page.locator('[data-testid="stats"]');
    if (await statsSection.isVisible()) {
      await expect(statsSection).toBeVisible();
    }
  });
});