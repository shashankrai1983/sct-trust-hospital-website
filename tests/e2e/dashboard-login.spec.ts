import { test, expect } from '@playwright/test';

test.describe('Dashboard Login Flow', () => {
  const LOGIN_URL = '/dashboard/login';
  const DASHBOARD_URL = '/dashboard';
  const VALID_EMAIL = 'admin@scttrusthospital.com';
  const VALID_PASSWORD = 'admin123';

  test.beforeEach(async ({ page }) => {
    // Start fresh for each test
    await page.context().clearCookies();
  });

  test('should display login page correctly', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Check page title and heading
    await expect(page).toHaveTitle(/SCT Trust Hospital/);
    await expect(page.locator('h2')).toContainText('Admin Dashboard');
    await expect(page.locator('text=SCT Trust Hospital - Internal Access Only')).toBeVisible();
    
    // Check form elements are present
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check placeholders
    await expect(page.locator('#email')).toHaveAttribute('placeholder', 'admin@scttrusthospital.com');
    await expect(page.locator('#password')).toHaveAttribute('placeholder', 'Enter admin password');
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Should show email validation error
    await expect(page.locator('text=Please enter your email address')).toBeVisible();
    
    // Fill email, leave password empty
    await page.fill('#email', VALID_EMAIL);
    await page.click('button[type="submit"]');
    
    // Should show password validation error
    await expect(page.locator('text=Please enter your password')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Fill with invalid credentials
    await page.fill('#email', 'wrong@email.com');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show authentication error
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    const passwordInput = page.locator('#password');
    const toggleButton = page.locator('button[type="button"]');
    
    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Click toggle to show password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Click toggle to hide password again
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Fill with valid credentials
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should show loading state
    await expect(page.locator('text=Signing in...')).toBeVisible();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(DASHBOARD_URL);
    
    // Should show dashboard content
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
    await expect(page.locator('text=Welcome to SCT Trust Hospital Admin Dashboard')).toBeVisible();
  });

  test('should display dashboard stats after login', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(DASHBOARD_URL);
    
    // Check stats cards are present
    await expect(page.locator('text=Total Appointments')).toBeVisible();
    await expect(page.locator('text=Today\'s Appointments')).toBeVisible();
    await expect(page.locator('text=This Week')).toBeVisible();
    await expect(page.locator('text=This Month')).toBeVisible();
    
    // Check for appointments table/data
    await expect(page.locator('table')).toBeVisible();
  });

  test('should display appointments data correctly', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(DASHBOARD_URL);
    
    // Wait for data to load (remove loading spinner)
    await expect(page.locator('.animate-spin')).not.toBeVisible();
    
    // Check if appointments table has headers
    await expect(page.locator('th')).toContainText(['Patient Details', 'Contact', 'Appointment', 'Service', 'Status']);
    
    // Check if there's appointment data or empty state
    const hasAppointments = await page.locator('tbody tr').count() > 0;
    
    if (hasAppointments) {
      // If there are appointments, check table structure
      await expect(page.locator('tbody tr')).toHaveCount(6); // Should show 6 sample appointments
    } else {
      // If no appointments, should show empty state
      await expect(page.locator('text=No appointments have been scheduled yet')).toBeVisible();
    }
  });

  test('should handle calendar view toggle', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(DASHBOARD_URL);
    
    // Check dashboard view is active by default
    await expect(page.locator('button:has-text("Dashboard")')).toHaveClass(/bg-white/);
    
    // Click calendar view
    await page.click('button:has-text("Calendar")');
    await expect(page.locator('button:has-text("Calendar")')).toHaveClass(/bg-white/);
    
    // Switch back to dashboard view
    await page.click('button:has-text("Dashboard")');
    await expect(page.locator('button:has-text("Dashboard")')).toHaveClass(/bg-white/);
  });

  test('should handle search and filter functionality', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(DASHBOARD_URL);
    await expect(page.locator('.animate-spin')).not.toBeVisible();
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder*="Search by name"]');
    await expect(searchInput).toBeVisible();
    
    // Test filter buttons
    await expect(page.locator('button:has-text("All")')).toBeVisible();
    await expect(page.locator('button:has-text("Pending")')).toBeVisible();
    await expect(page.locator('button:has-text("Confirmed")')).toBeVisible();
    
    // Test clear all button
    await expect(page.locator('button:has-text("Clear All")')).toBeVisible();
  });

  test('should persist session on page refresh', async ({ page }) => {
    // Login first
    await page.goto(LOGIN_URL);
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    
    // Wait for dashboard to load
    await expect(page).toHaveURL(DASHBOARD_URL);
    
    // Refresh the page
    await page.reload();
    
    // Should still be on dashboard (session persisted)
    await expect(page).toHaveURL(DASHBOARD_URL);
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
  });

  test('should redirect to login when accessing dashboard without auth', async ({ page }) => {
    // Try to access dashboard directly without login
    await page.goto(DASHBOARD_URL);
    
    // Should be redirected to login page
    await expect(page).toHaveURL(new RegExp(`${LOGIN_URL}`));
    await expect(page.locator('h2')).toContainText('Admin Dashboard');
  });

  test('should show loading state during authentication', async ({ page }) => {
    await page.goto(LOGIN_URL);
    
    // Fill credentials
    await page.fill('#email', VALID_EMAIL);
    await page.fill('#password', VALID_PASSWORD);
    
    // Submit and immediately check for loading state
    await page.click('button[type="submit"]');
    
    // Should show loading spinner and text
    await expect(page.locator('.animate-spin')).toBeVisible();
    await expect(page.locator('text=Signing in...')).toBeVisible();
    
    // Button should be disabled during loading
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
  });
});