import { test, expect, Page } from '@playwright/test'

/**
 * Comprehensive Dashboard Functionality Test Suite
 * Tests admin functionality after SEO optimizations
 * Focus: Authentication, Protected Routes, API Routes, Mobile Experience
 */

test.describe('Dashboard Post-SEO Validation', () => {
  let page: Page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    
    // Set up console logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`❌ Console Error: ${msg.text()}`)
      }
    })
    
    // Set up network monitoring
    page.on('response', response => {
      if (!response.ok() && !response.url().includes('favicon')) {
        console.log(`❌ Network Error: ${response.status()} - ${response.url()}`)
      }
    })
  })

  test.describe('Authentication Flow', () => {
    test('should redirect unauthenticated users from protected dashboard routes', async () => {
      // Test main dashboard redirect
      await page.goto('/dashboard')
      
      // Should show access restricted message
      await expect(page.locator('h2')).toContainText('Access restricted')
      await expect(page.locator('text=Please sign in to access the dashboard')).toBeVisible()
      
      // Check login link is present
      const loginLink = page.locator('a[href="/dashboard/login"]')
      await expect(loginLink).toBeVisible()
      await expect(loginLink).toContainText('Go to Login')
    })

    test('should redirect from appointments page when unauthenticated', async () => {
      await page.goto('/dashboard/appointments')
      
      // Should show access restricted message
      await expect(page.locator('h2')).toContainText('Access restricted')
      await expect(page.locator('text=Please sign in to access the dashboard')).toBeVisible()
    })

    test('should load login page without authentication', async () => {
      await page.goto('/dashboard/login')
      
      // Login page should be accessible
      await expect(page.locator('h1, h2')).toContainText(/sign in|login/i)
      
      // Should not show access restricted message
      await expect(page.locator('text=Access restricted')).not.toBeVisible()
    })

    test('should have proper NextAuth configuration', async () => {
      // Test NextAuth API routes exist
      const response = await page.request.get('/api/auth/providers')
      expect(response.ok()).toBeTruthy()
      
      // Check if providers are properly configured
      const providers = await response.json()
      expect(providers).toBeDefined()
    })
  })

  test.describe('Dashboard Layout and Components', () => {
    test('should load dashboard layout without errors', async () => {
      await page.goto('/dashboard/login')
      
      // Check if page loads without JavaScript errors
      const errors: string[] = []
      page.on('pageerror', error => {
        errors.push(error.message)
      })
      
      await page.waitForLoadState('networkidle')
      expect(errors).toEqual([])
    })

    test('should have responsive design on mobile', async () => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/dashboard/login')
      
      await page.waitForLoadState('networkidle')
      
      // Check if page is responsive
      const body = page.locator('body')
      const viewport = await body.boundingBox()
      expect(viewport?.width).toBeLessThanOrEqual(375)
    })
  })

  test.describe('API Routes Functionality', () => {
    test('should respond to appointments API route', async () => {
      const response = await page.request.get('/api/appointments')
      
      // Should return 401 or proper response (not 404/500)
      expect([200, 401, 403]).toContain(response.status())
      
      if (response.status() === 401 || response.status() === 403) {
        console.log('✅ API properly protected - returns auth error')
      }
    })

    test('should have dashboard stats API available', async () => {
      const response = await page.request.get('/api/dashboard/stats')
      
      // Should not return 404 or 500
      expect(response.status()).not.toBe(404)
      expect(response.status()).not.toBe(500)
      
      // Should return 401/403 (protected) or 200 (accessible)
      expect([200, 401, 403]).toContain(response.status())
    })

    test('should have dashboard appointments API available', async () => {
      const response = await page.request.get('/api/dashboard/appointments')
      
      // Should not return 404 or 500
      expect(response.status()).not.toBe(404)
      expect(response.status()).not.toBe(500)
      
      // Should return 401/403 (protected) or 200 (accessible)
      expect([200, 401, 403]).toContain(response.status())
    })
  })

  test.describe('Database Connectivity', () => {
    test('should not expose database errors to unauthorized users', async () => {
      const response = await page.request.post('/api/appointments', {
        data: { test: 'data' }
      })
      
      // Should not return database connection errors
      const responseText = await response.text()
      expect(responseText).not.toContain('MongoDB')
      expect(responseText).not.toContain('connection')
      expect(responseText).not.toContain('database')
      
      // Should return proper HTTP status
      expect([200, 400, 401, 403, 422]).toContain(response.status())
    })

    test('should handle API requests gracefully', async () => {
      // Test various API endpoints for proper error handling
      const endpoints = [
        '/api/appointments',
        '/api/dashboard/stats',
        '/api/dashboard/appointments'
      ]
      
      for (const endpoint of endpoints) {
        const response = await page.request.get(endpoint)
        
        // Should not return 500 (server error)
        expect(response.status()).not.toBe(500)
        
        // Should have proper error handling
        if (!response.ok()) {
          const contentType = response.headers()['content-type'] || ''
          expect(contentType).toMatch(/json|html/)
        }
      }
    })
  })

  test.describe('Security and Access Control', () => {
    test('should not expose sensitive configuration', async () => {
      // Check if sensitive files are not accessible
      const sensitiveUrls = [
        '/.env',
        '/.env.local',
        '/next.config.js',
        '/package.json',
        '/server.log'
      ]
      
      for (const url of sensitiveUrls) {
        const response = await page.request.get(url)
        expect(response.status()).toBe(404)
      }
    })

    test('should have proper security headers', async () => {
      const response = await page.request.get('/dashboard/login')
      const headers = response.headers()
      
      // Check for security headers from next.config.js
      expect(headers['x-dns-prefetch-control']).toBe('on')
      expect(headers['x-frame-options']).toBe('SAMEORIGIN')
    })

    test('should not have NextAuth secrets exposed', async () => {
      await page.goto('/dashboard/login')
      
      // Check page source for exposed secrets
      const content = await page.content()
      expect(content).not.toContain('NEXTAUTH_SECRET')
      expect(content).not.toContain('MONGODB_URI')
      expect(content).not.toContain('mongodb+srv://')
    })
  })

  test.describe('Mobile Dashboard Experience', () => {
    test.beforeEach(async () => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 })
    })

    test('should have mobile-friendly login page', async () => {
      await page.goto('/dashboard/login')
      
      await page.waitForLoadState('networkidle')
      
      // Check if login form is visible and properly sized
      const loginForm = page.locator('form, [role="main"], .login')
      await expect(loginForm.first()).toBeVisible()
      
      // Verify no horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5) // Allow small tolerance
    })

    test('should have responsive dashboard access gate', async () => {
      await page.goto('/dashboard')
      
      await page.waitForLoadState('networkidle')
      
      // Check access restricted message is properly displayed
      const accessMessage = page.locator('text=Access restricted')
      await expect(accessMessage).toBeVisible()
      
      // Check login button is accessible
      const loginButton = page.locator('a[href="/dashboard/login"]')
      await expect(loginButton).toBeVisible()
      
      const buttonBox = await loginButton.boundingBox()
      expect(buttonBox?.height).toBeGreaterThan(30) // Sufficient touch target
    })

    test('should handle mobile navigation properly', async () => {
      await page.goto('/dashboard')
      
      // Check if page doesn't break on mobile
      const errors: string[] = []
      page.on('pageerror', error => {
        errors.push(error.message)
      })
      
      await page.waitForLoadState('networkidle')
      expect(errors).toEqual([])
    })
  })

  test.describe('Performance and Loading', () => {
    test('should load dashboard pages efficiently', async () => {
      const startTime = Date.now()
      
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      
      // Should load within reasonable time (5 seconds)
      expect(loadTime).toBeLessThan(5000)
      console.log(`⏱️ Login page load time: ${loadTime}ms`)
    })

    test('should handle resource loading gracefully', async () => {
      await page.goto('/dashboard')
      
      // Wait for all resources to load
      await page.waitForLoadState('networkidle')
      
      // Check for broken images or missing resources
      const images = await page.locator('img').all()
      for (const img of images) {
        const src = await img.getAttribute('src')
        if (src && !src.startsWith('data:')) {
          const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
          if (naturalWidth === 0) {
            console.warn(`⚠️ Potentially broken image: ${src}`)
          }
        }
      }
    })

    test('should not block on slow network conditions', async () => {
      // Simulate slow 3G
      await page.route('**/*', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 100))
        await route.continue()
      })
      
      const startTime = Date.now()
      await page.goto('/dashboard/login')
      
      // Should still be responsive
      await expect(page.locator('body')).toBeVisible({ timeout: 10000 })
      
      const loadTime = Date.now() - startTime
      console.log(`⏱️ Slow network load time: ${loadTime}ms`)
    })
  })

  test.describe('SEO Changes Impact Assessment', () => {
    test('should not break NextAuth with new rewrites', async () => {
      // Test that NextAuth callback URLs still work
      const callbackResponse = await page.request.get('/api/auth/callback/credentials')
      
      // Should not return 404 (rewrite conflict)
      expect(callbackResponse.status()).not.toBe(404)
    })

    test('should not interfere with dashboard API routes', async () => {
      // Test that new sitemap rewrites don't affect dashboard APIs
      const dashboardApiResponse = await page.request.get('/api/dashboard/stats')
      const appointmentsApiResponse = await page.request.get('/api/appointments')
      
      // APIs should still be reachable
      expect(dashboardApiResponse.status()).not.toBe(404)
      expect(appointmentsApiResponse.status()).not.toBe(404)
    })

    test('should maintain dashboard-specific assets', async () => {
      await page.goto('/dashboard/login')
      
      // Check that dashboard styles and scripts load
      const stylesheets = await page.locator('link[rel="stylesheet"]').count()
      expect(stylesheets).toBeGreaterThan(0)
      
      // Check for Next.js chunks
      const scripts = await page.locator('script[src*="/_next/"]').count()
      expect(scripts).toBeGreaterThan(0)
    })
  })

  test.afterEach(async () => {
    if (page) {
      await page.close()
    }
  })
})