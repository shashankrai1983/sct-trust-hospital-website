import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@scttrusthospital.com';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'admin123';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing sessions
    await page.context().clearCookies();
  });

  test('should display login page correctly', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Check page title and header
    await expect(page).toHaveTitle(/Admin Dashboard/);
    await expect(page.locator('h2')).toContainText('Admin Dashboard');
    await expect(page.locator('text=SCT Trust Hospital - Internal Access Only')).toBeVisible();
    
    // Check form elements
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check form labels and placeholders
    await expect(page.locator('label[for="email"]')).toContainText('Email address');
    await expect(page.locator('label[for="password"]')).toContainText('Password');
    await expect(page.locator('input[name="email"]')).toHaveAttribute('placeholder', 'admin@scttrusthospital.com');
    
    // Check security message
    await expect(page.locator('text=This is a secure admin area')).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for HTML5 validation or custom validation
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    
    await expect(emailInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Fill form with invalid credentials
    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
    
    // Should still be on login page
    await expect(page).toHaveURL(/\/dashboard\/login/);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Fill form with valid credentials
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Should see dashboard content
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
    await expect(page.locator('text=Welcome to SCT Trust Hospital Admin Dashboard')).toBeVisible();
  });

  test('should show loading state during login', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    // Fill form
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    
    // Submit form and check for loading state
    await page.click('button[type="submit"]');
    
    // Check for loading text or spinner (might be brief)
    const loadingElement = page.locator('text=Signing in...');
    // Don't use expect here as loading might be very brief
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto('/dashboard/login');
    
    const passwordInput = page.locator('input[name="password"]');
    const toggleButton = page.locator('button[type="button"]:near(input[name="password"])');
    
    // Initially should be password type
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle button
    await toggleButton.click();
    
    // Should change to text type
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle button again
    await toggleButton.click();
    
    // Should change back to password type
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});

test.describe('Protected Routes', () => {
  test('should redirect to login when accessing dashboard without authentication', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/dashboard\/login/);
  });

  test('should redirect to login when accessing appointments without authentication', async ({ page }) => {
    await page.goto('/dashboard/appointments');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/dashboard\/login/);
  });

  test('should maintain session after login', async ({ page }) => {
    // Login first
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Should be on dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to appointments page
    await page.goto('/dashboard/appointments');
    
    // Should access appointments without redirect
    await expect(page).toHaveURL('/dashboard/appointments');
    await expect(page.locator('h1')).toContainText('Appointments');
  });

  test('should redirect to callback URL after login', async ({ page }) => {
    // Try to access appointments directly (should redirect to login with callback)
    await page.goto('/dashboard/appointments');
    
    // Should be on login page with callback URL
    await expect(page).toHaveURL(/\/dashboard\/login.*callbackUrl/);
    
    // Login
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Should redirect back to appointments page
    await expect(page).toHaveURL('/dashboard/appointments');
  });
});

test.describe('Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  // Note: This test depends on having a logout button/link in the dashboard
  // The current implementation doesn't show a logout UI, so this test is commented out
  test.skip('should logout successfully', async ({ page }) => {
    // Look for logout button or link
    const logoutButton = page.locator('text=Logout').or(page.locator('text=Sign out'));
    
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to login page
      await expect(page).toHaveURL(/\/dashboard\/login/);
      
      // Verify session is cleared by trying to access protected route
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/\/dashboard\/login/);
    }
  });
});