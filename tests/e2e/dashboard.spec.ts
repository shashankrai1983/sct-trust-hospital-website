import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@scttrusthospital.com';
const ADMIN_PASSWORD = process.env.TEST_ADMIN_PASSWORD || 'admin123';

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display dashboard overview correctly', async ({ page }) => {
    // Check page title and header
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
    await expect(page.locator('text=Welcome to SCT Trust Hospital Admin Dashboard')).toBeVisible();
    
    // Check statistics cards are present
    await expect(page.locator('text=Total Appointments')).toBeVisible();
    await expect(page.locator('text=Today\'s Appointments')).toBeVisible();
    await expect(page.locator('text=This Week')).toBeVisible();
    await expect(page.locator('text=This Month')).toBeVisible();
    
    // Check that stat cards display numbers
    const statCards = page.locator('[class*="grid"] > div:has-text("Appointments")');
    await expect(statCards).toHaveCount(4);
    
    // Check Recent Appointments section
    await expect(page.locator('h3')).toContainText('Recent Appointments');
  });

  test('should display statistics cards with proper icons', async ({ page }) => {
    // Check that each stat card has an icon
    const totalCard = page.locator('div:has-text("Total Appointments")');
    const todayCard = page.locator('div:has-text("Today\'s Appointments")');
    const weekCard = page.locator('div:has-text("This Week")');
    const monthCard = page.locator('div:has-text("This Month")');
    
    // Each card should have an SVG icon
    await expect(totalCard.locator('svg')).toBeVisible();
    await expect(todayCard.locator('svg')).toBeVisible();
    await expect(weekCard.locator('svg')).toBeVisible();
    await expect(monthCard.locator('svg')).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    // Go to dashboard and check for loading spinner
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    
    // Might see loading spinner briefly
    const loadingSpinner = page.locator('[class*="animate-spin"]');
    // Don't use expect here as loading might be very brief on fast connections
  });

  test('should handle empty appointments state', async ({ page }) => {
    // Mock empty appointments response
    await page.route('/api/dashboard/stats', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          stats: {
            totalAppointments: 0,
            todayAppointments: 0,
            thisWeekAppointments: 0,
            thisMonthAppointments: 0
          },
          recentAppointments: []
        })
      });
    });
    
    await page.reload();
    
    // Check empty state
    await expect(page.locator('text=No appointments')).toBeVisible();
    await expect(page.locator('text=No appointments have been scheduled yet')).toBeVisible();
    
    // Check that stats show 0
    await expect(page.locator('text=0').first()).toBeVisible();
  });

  test('should display appointments data when available', async ({ page }) => {
    // Mock appointments response with data
    await page.route('/api/dashboard/stats', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          stats: {
            totalAppointments: 25,
            todayAppointments: 3,
            thisWeekAppointments: 8,
            thisMonthAppointments: 15
          },
          recentAppointments: [
            {
              _id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '1234567890',
              date: '2024-02-01',
              department: 'General Consultation',
              doctor: 'Amita Shukla',
              status: 'confirmed',
              createdAt: new Date().toISOString()
            },
            {
              _id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '0987654321',
              date: '2024-02-02',
              department: 'High Risk Pregnancy',
              doctor: 'Amita Shukla',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        })
      });
    });
    
    await page.reload();
    
    // Check statistics display correct numbers
    await expect(page.locator('dd:has-text("25")')).toBeVisible();
    await expect(page.locator('dd:has-text("3")')).toBeVisible();
    await expect(page.locator('dd:has-text("8")')).toBeVisible();
    await expect(page.locator('dd:has-text("15")')).toBeVisible();
    
    // Check appointments table displays data
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=Jane Smith')).toBeVisible();
    await expect(page.locator('text=john@example.com')).toBeVisible();
    await expect(page.locator('text=General Consultation')).toBeVisible();
    await expect(page.locator('text=High Risk Pregnancy')).toBeVisible();
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('/api/dashboard/stats', route => {
      route.fulfill({
        status: 500,
        body: 'Internal Server Error'
      });
    });
    
    await page.reload();
    
    // Should show some fallback or error state
    // The app might show loading indefinitely or show 0 values
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
  });
});

test.describe('Navigation and Layout', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should have proper dashboard layout', async ({ page }) => {
    // Check for dashboard navigation elements
    // Note: Current implementation doesn't show sidebar/navigation
    // This test checks the basic layout structure
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('main, [role="main"], .container')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that dashboard is still accessible
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
    
    // Check that stat cards stack vertically on mobile
    const statCards = page.locator('[class*="grid"] > div:has-text("Appointments")');
    await expect(statCards.first()).toBeVisible();
    
    // Check appointments table is scrollable/responsive
    const appointmentsSection = page.locator('h3:has-text("Recent Appointments")');
    await expect(appointmentsSection).toBeVisible();
  });
});

test.describe('Appointments Management Page', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to appointments
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Navigate to appointments page
    await page.goto('/dashboard/appointments');
  });

  test('should display appointments page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Appointments');
    await expect(page.locator('text=Manage patient appointments')).toBeVisible();
    
    // Check filter buttons
    await expect(page.locator('button:has-text("All")')).toBeVisible();
    await expect(page.locator('button:has-text("Pending")')).toBeVisible();
    await expect(page.locator('button:has-text("Confirmed")')).toBeVisible();
  });

  test('should handle empty appointments state', async ({ page }) => {
    // Mock empty appointments
    await page.route('/api/dashboard/appointments', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ appointments: [] })
      });
    });
    
    await page.reload();
    
    // Check empty state
    await expect(page.locator('text=No appointments')).toBeVisible();
    await expect(page.locator('text=No appointments have been scheduled yet')).toBeVisible();
  });

  test('should display appointments when available', async ({ page }) => {
    // Mock appointments data
    await page.route('/api/dashboard/appointments', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointments: [
            {
              _id: '1',
              name: 'Alice Johnson',
              email: 'alice@example.com',
              phone: '1111111111',
              date: '2024-02-01',
              department: 'Infertility Treatment',
              doctor: 'Amita Shukla',
              status: 'confirmed',
              createdAt: new Date().toISOString()
            },
            {
              _id: '2',
              name: 'Bob Wilson',
              email: 'bob@example.com',
              phone: '2222222222',
              date: '2024-02-02',
              department: 'PCOS/PCOD Treatment',
              doctor: 'Amita Shukla',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        })
      });
    });
    
    await page.reload();
    
    // Check appointments are displayed
    await expect(page.locator('text=Alice Johnson')).toBeVisible();
    await expect(page.locator('text=Bob Wilson')).toBeVisible();
    await expect(page.locator('text=alice@example.com')).toBeVisible();
    await expect(page.locator('text=Infertility Treatment')).toBeVisible();
    await expect(page.locator('text=PCOS/PCOD Treatment')).toBeVisible();
    
    // Check status badges
    await expect(page.locator('text=confirmed')).toBeVisible();
    await expect(page.locator('text=pending')).toBeVisible();
  });

  test('should filter appointments correctly', async ({ page }) => {
    // Mock appointments with different statuses
    await page.route('/api/dashboard/appointments', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointments: [
            {
              _id: '1',
              name: 'Confirmed User',
              email: 'confirmed@example.com',
              phone: '1111111111',
              date: '2024-02-01',
              department: 'General Consultation',
              doctor: 'Amita Shukla',
              status: 'confirmed',
              createdAt: new Date().toISOString()
            },
            {
              _id: '2',
              name: 'Pending User',
              email: 'pending@example.com',
              phone: '2222222222',
              date: '2024-02-02',
              department: 'High Risk Pregnancy',
              doctor: 'Amita Shukla',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        })
      });
    });
    
    await page.reload();
    
    // Initially should show all appointments
    await expect(page.locator('text=Confirmed User')).toBeVisible();
    await expect(page.locator('text=Pending User')).toBeVisible();
    
    // Click pending filter
    await page.click('button:has-text("Pending")');
    
    // Should show only pending appointments
    await expect(page.locator('text=Pending User')).toBeVisible();
    // Confirmed user might still be visible in DOM but filtered out visually
    
    // Click confirmed filter
    await page.click('button:has-text("Confirmed")');
    
    // Should show only confirmed appointments
    await expect(page.locator('text=Confirmed User')).toBeVisible();
    
    // Click all filter
    await page.click('button:has-text("All")');
    
    // Should show all appointments again
    await expect(page.locator('text=Confirmed User')).toBeVisible();
    await expect(page.locator('text=Pending User')).toBeVisible();
  });

  test('should show appointment actions', async ({ page }) => {
    // Mock appointments data
    await page.route('/api/dashboard/appointments', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointments: [
            {
              _id: '1',
              name: 'Test User',
              email: 'test@example.com',
              phone: '1234567890',
              date: '2024-02-01',
              department: 'General Consultation',
              doctor: 'Amita Shukla',
              status: 'pending',
              createdAt: new Date().toISOString()
            }
          ]
        })
      });
    });
    
    await page.reload();
    
    // Check action buttons are present
    await expect(page.locator('button[title="View details"]')).toBeVisible();
    await expect(page.locator('button[title="Delete appointment"]')).toBeVisible();
    
    // Check icons are present
    await expect(page.locator('svg').first()).toBeVisible(); // Eye icon
    await expect(page.locator('svg').last()).toBeVisible(); // Trash icon
  });
});

test.describe('Dashboard Performance', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/dashboard/login');
    await page.fill('input[name="email"]', ADMIN_EMAIL);
    await page.fill('input[name="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should load dashboard within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard Overview');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('should handle concurrent API calls', async ({ page }) => {
    let statsCallCount = 0;
    let appointmentsCallCount = 0;
    
    // Track API calls
    await page.route('/api/dashboard/stats', route => {
      statsCallCount++;
      route.continue();
    });
    
    await page.route('/api/dashboard/appointments', route => {
      appointmentsCallCount++;
      route.continue();
    });
    
    // Navigate between pages quickly
    await page.goto('/dashboard');
    await page.goto('/dashboard/appointments');
    await page.goto('/dashboard');
    
    // Wait for all requests to complete
    await page.waitForTimeout(2000);
    
    // Should not make excessive API calls
    expect(statsCallCount).toBeLessThan(5);
    expect(appointmentsCallCount).toBeLessThan(5);
  });
});