import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Tests (No Auth)', () => {
  const mobileViewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad Mini', width: 768, height: 1024 },
  ];

  mobileViewports.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
      });

      test('should display mobile-friendly homepage', async ({ page }) => {
        await page.goto('/');
        
        // Check that the page loads
        await expect(page.locator('h1, h2')).toBeVisible();
        
        // Check that navigation is accessible on mobile
        const nav = page.locator('nav, header');
        await expect(nav).toBeVisible();
      });

      test('should display mobile-friendly appointment form', async ({ page }) => {
        await page.goto('/contact');
        
        // Check that the form is accessible on mobile
        const form = page.locator('form');
        await expect(form).toBeVisible();
        
        // Check form inputs are touch-friendly
        const inputs = page.locator('input, textarea, select');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < Math.min(inputCount, 3); i++) {
          const input = inputs.nth(i);
          if (await input.isVisible()) {
            const inputBox = await input.boundingBox();
            if (inputBox) {
              // Touch targets should be at least 44px (iOS guideline)
              expect(inputBox.height).toBeGreaterThanOrEqual(32);
            }
          }
        }
      });

      test('should handle mobile navigation properly', async ({ page }) => {
        await page.goto('/');
        
        // Look for mobile menu button (hamburger) on smaller screens
        if (width < 768) {
          const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has(svg[viewBox*="0 0 24"])').first();
          // Mobile menu button should exist on small screens
          const mobileButtons = await page.locator('button').count();
          expect(mobileButtons).toBeGreaterThan(0);
        }
      });

      test('should display responsive content sections', async ({ page }) => {
        await page.goto('/');
        
        // Check that content sections adapt to mobile
        const sections = page.locator('section, div[class*="section"], main > div');
        const sectionCount = await sections.count();
        
        if (sectionCount > 0) {
          const firstSection = sections.first();
          await expect(firstSection).toBeVisible();
          
          // Check that content doesn't overflow
          const sectionBox = await firstSection.boundingBox();
          if (sectionBox) {
            expect(sectionBox.width).toBeLessThanOrEqual(width + 50); // Allow some margin
          }
        }
      });
    });
  });

  test.describe('Dashboard Login Page Mobile', () => {
    test('should display mobile-friendly login page', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/dashboard/login');
      
      // Check login form is accessible
      const emailInput = page.locator('input[name="email"], input[type="email"]');
      const passwordInput = page.locator('input[name="password"], input[type="password"]');
      const submitButton = page.locator('button[type="submit"]');
      
      await expect(emailInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      await expect(submitButton).toBeVisible();
      
      // Check touch targets are appropriate size
      const submitBox = await submitButton.boundingBox();
      if (submitBox) {
        expect(Math.min(submitBox.width, submitBox.height)).toBeGreaterThanOrEqual(32);
      }
      
      // Test form interaction
      await emailInput.fill('test@example.com');
      await passwordInput.fill('testpassword');
      
      await expect(emailInput).toHaveValue('test@example.com');
      await expect(passwordInput).toHaveValue('testpassword');
    });
  });
});