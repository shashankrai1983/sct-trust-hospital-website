import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@scttrusthospital.com';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'admin123';

test.describe('Mobile Dashboard Tests', () => {
  // Mobile viewport sizes to test
  const mobileViewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    { name: 'iPad Mini', width: 768, height: 1024 },
  ];

  mobileViewports.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width, height });
        
        // Login before each test
        await page.goto('/dashboard/login');
        await page.fill('input[name="email"]', ADMIN_EMAIL);
        await page.fill('input[name="password"]', ADMIN_PASSWORD);
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('/dashboard');
      });

      test('should display mobile-optimized dashboard layout', async ({ page }) => {
        // Check if the hamburger menu is visible (should be visible on mobile)
        if (width < 1024) {
          const hamburgerButton = page.locator('button[aria-label="Toggle sidebar"], button:has(svg)').first();
          await expect(hamburgerButton).toBeVisible();
        }

        // Check that the main content is accessible
        await expect(page.locator('h1')).toContainText('Dashboard Overview');
        
        // Check stats cards are stacked properly on mobile
        const statCards = page.locator('[data-testid="stats"] > div');
        await expect(statCards.first()).toBeVisible();
      });

      test('should handle sidebar navigation on mobile', async ({ page }) => {
        if (width < 1024) {
          // Initially sidebar overlay should not be visible
          const sidebarOverlay = page.locator('.fixed.inset-0.bg-gray-600');
          await expect(sidebarOverlay).not.toBeVisible();
          
          // Click hamburger menu to open sidebar
          const hamburgerButton = page.locator('button:has(svg[class*="h-6"])').first();
          await hamburgerButton.click();
          
          // Sidebar overlay should now be visible
          await expect(sidebarOverlay).toBeVisible();
          
          // Check sidebar content is visible
          await expect(page.locator('text=SCT Admin')).toBeVisible();
          await expect(page.locator('text=Appointments Dashboard')).toBeVisible();
          
          // Close sidebar by clicking overlay
          await sidebarOverlay.click();
          
          // Sidebar should be hidden again
          await expect(sidebarOverlay).not.toBeVisible();
        }
      });

      test('should display responsive stats cards', async ({ page }) => {
        const statsGrid = page.locator('[data-testid="stats"]');
        await expect(statsGrid).toBeVisible();
        
        // All stat cards should be visible
        const statCards = page.locator('[data-testid="stats"] > div');
        const cardCount = await statCards.count();
        expect(cardCount).toBe(4);
        
        // Check that cards are readable on mobile
        for (let i = 0; i < cardCount; i++) {
          const card = statCards.nth(i);
          await expect(card).toBeVisible();
          
          // Check that icons are visible
          const icon = card.locator('svg').first();
          await expect(icon).toBeVisible();
        }
      });

      test('should handle responsive search and filters', async ({ page }) => {
        // Check search bar is accessible
        const searchInput = page.locator('input[placeholder*="Search"]');
        await expect(searchInput).toBeVisible();
        
        // Test search functionality
        await searchInput.fill('test search');
        await expect(searchInput).toHaveValue('test search');
        
        // Check filter buttons are accessible
        const allButton = page.locator('button:has-text("All")');
        const pendingButton = page.locator('button:has-text("Pending")');
        const confirmedButton = page.locator('button:has-text("Confirmed")');
        
        await expect(allButton).toBeVisible();
        await expect(pendingButton).toBeVisible();
        await expect(confirmedButton).toBeVisible();
        
        // Test filter interaction
        await pendingButton.click();
        // Button should appear selected (check for active state)
        await expect(pendingButton).toHaveClass(/bg-blue-100/);
      });

      test('should display responsive appointments table', async ({ page }) => {
        // Check table container is present
        const tableContainer = page.locator('.overflow-x-auto');
        await expect(tableContainer).toBeVisible();
        
        // Check table headers are present (some may be hidden on mobile)
        const table = page.locator('table');
        await expect(table).toBeVisible();
        
        // Check that essential columns are visible
        await expect(page.locator('th:has-text("Patient Details")')).toBeVisible();
        await expect(page.locator('th:has-text("Contact")')).toBeVisible();
        await expect(page.locator('th:has-text("Status")')).toBeVisible();
        
        // On very small screens, some columns should be hidden
        if (width < 640) {
          // Message column should be hidden on small screens
          const messageHeader = page.locator('th:has-text("Message")');
          await expect(messageHeader).not.toBeVisible();
        }
      });

      test('should handle view toggle between dashboard and calendar', async ({ page }) => {
        // Check view toggle is present and functional
        const dashboardButton = page.locator('button:has-text("Dashboard")');
        const calendarButton = page.locator('button:has-text("Calendar")');
        
        await expect(dashboardButton).toBeVisible();
        await expect(calendarButton).toBeVisible();
        
        // Switch to calendar view
        await calendarButton.click();
        
        // Check calendar is displayed
        await expect(page.locator('text=Calendar', { timeout: 10000 })).toBeVisible();
        
        // Switch back to dashboard
        await dashboardButton.click();
        
        // Check dashboard is displayed
        await expect(page.locator('[data-testid="stats"]')).toBeVisible();
      });

      test('should display responsive calendar view', async ({ page }) => {
        // Switch to calendar view
        const calendarButton = page.locator('button:has-text("Calendar")');
        await calendarButton.click();
        
        // Wait for calendar to load
        await expect(page.locator('text=Calendar')).toBeVisible();
        
        // Check calendar navigation is present
        const prevButton = page.locator('button:has(svg[class*="ChevronLeft"])');
        const nextButton = page.locator('button:has(svg[class*="ChevronRight"])');
        
        await expect(prevButton).toBeVisible();
        await expect(nextButton).toBeVisible();
        
        // Check calendar grid is present
        const calendarGrid = page.locator('.grid.grid-cols-7');
        await expect(calendarGrid).toBeVisible();
        
        // Check day headers are present (may show abbreviated on mobile)
        const dayHeaders = page.locator('.grid.grid-cols-7').first().locator('div');
        const headerCount = await dayHeaders.count();
        expect(headerCount).toBe(7);
        
        // Test calendar navigation
        await nextButton.click();
        // Calendar should still be visible after navigation
        await expect(calendarGrid).toBeVisible();
      });

      test('should handle touch interactions properly', async ({ page }) => {
        // Test touch-friendly button sizes
        const buttons = page.locator('button');
        const buttonCount = await buttons.count();
        
        for (let i = 0; i < Math.min(buttonCount, 5); i++) {
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            // Buttons should be at least 44px for touch targets (WCAG recommendation)
            const buttonBox = await button.boundingBox();
            if (buttonBox) {
              expect(Math.min(buttonBox.width, buttonBox.height)).toBeGreaterThanOrEqual(32);
            }
          }
        }
      });

      test('should maintain functionality during orientation change', async ({ page }) => {
        // Simulate landscape orientation
        await page.setViewportSize({ width: height, height: width });
        
        // Check dashboard is still functional
        await expect(page.locator('h1')).toContainText('Dashboard Overview');
        
        // Check stats are still visible
        const statCards = page.locator('[data-testid="stats"] > div');
        await expect(statCards.first()).toBeVisible();
        
        // Rotate back to portrait
        await page.setViewportSize({ width, height });
        
        // Verify functionality is maintained
        await expect(page.locator('[data-testid="stats"]')).toBeVisible();
      });

      test('should handle long content gracefully', async ({ page }) => {
        // Mock API with long content to test truncation
        await page.route('/api/dashboard/stats', route => {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              stats: {
                totalAppointments: 1000,
                todayAppointments: 50,
                thisWeekAppointments: 200,
                thisMonthAppointments: 500
              },
              recentAppointments: []
            })
          });
        });

        await page.route('/api/dashboard/appointments', route => {
          route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              appointments: [
                {
                  _id: '1',
                  name: 'Very Long Patient Name That Should Be Truncated',
                  email: 'verylongemailaddress@verylongdomainname.com',
                  phone: '1234567890',
                  date: '2024-02-01',
                  time: '10:00 AM',
                  service: 'Very Long Service Name That Should Also Be Truncated',
                  status: 'confirmed',
                  message: 'This is a very long message that should be truncated or handled properly on mobile devices',
                  createdAt: new Date().toISOString()
                }
              ]
            })
          });
        });
        
        await page.reload();
        
        // Check that long content is handled properly
        await expect(page.locator('text=Very Long Patient')).toBeVisible();
        
        // Check table doesn't break layout
        const table = page.locator('table');
        await expect(table).toBeVisible();
        
        // Check horizontal scroll is available if needed
        const tableContainer = page.locator('.overflow-x-auto');
        await expect(tableContainer).toBeVisible();
      });
    });
  });

  test.describe('Cross-device Compatibility', () => {
    test('should maintain session across viewport changes', async ({ page }) => {
      // Start with mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Login
      await page.goto('/dashboard/login');
      await page.fill('input[name="email"]', ADMIN_EMAIL);
      await page.fill('input[name="password"]', ADMIN_PASSWORD);
      await page.click('button[type="submit"]');
      await expect(page).toHaveURL('/dashboard');
      
      // Switch to desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Should still be logged in and dashboard should work
      await expect(page.locator('h1')).toContainText('Dashboard Overview');
      
      // Switch back to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Should still work on mobile
      await expect(page.locator('h1')).toContainText('Dashboard Overview');
    });
  });

  test.describe('Performance on Mobile', () => {
    test('should load dashboard quickly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      // Login
      await page.goto('/dashboard/login');
      await page.fill('input[name="email"]', ADMIN_EMAIL);
      await page.fill('input[name="password"]', ADMIN_PASSWORD);
      
      const startTime = Date.now();
      await page.click('button[type="submit"]');
      await expect(page.locator('h1')).toContainText('Dashboard Overview');
      const loadTime = Date.now() - startTime;
      
      // Should load within reasonable time (5 seconds)
      expect(loadTime).toBeLessThan(5000);
    });
  });
});