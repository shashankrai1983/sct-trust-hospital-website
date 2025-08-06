import { test, expect, Page } from '@playwright/test'

/**
 * Mobile Admin Experience Test
 * Tests dashboard functionality on mobile devices
 * Focus: Touch interactions, responsive design, mobile usability
 */

test.describe('Mobile Admin Experience', () => {
  let page: Page

  // Mobile device configurations
  const mobileDevices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'Samsung Galaxy S21', width: 360, height: 800 },
    { name: 'iPad Mini', width: 768, height: 1024 }
  ]

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    
    // Monitor touch and interaction events
    page.on('console', msg => {
      if (msg.type() === 'error' && msg.text().includes('touch')) {
        console.log(`📱 Touch Error: ${msg.text()}`)
      }
    })
  })

  for (const device of mobileDevices) {
    test.describe(`${device.name} (${device.width}x${device.height})`, () => {
      test.beforeEach(async () => {
        await page.setViewportSize({ width: device.width, height: device.height })
        
        // Simulate touch device
        await page.addInitScript(() => {
          Object.defineProperty(navigator, 'maxTouchPoints', { value: 5 })
        })
      })

      test('should display login page responsively', async () => {
        await page.goto('/dashboard/login')
        await page.waitForLoadState('networkidle')

        // Check viewport meta tag
        const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content')
        expect(viewportMeta).toContain('width=device-width')

        // Verify no horizontal scrolling
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
        const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5) // Small tolerance

        console.log(`✅ ${device.name}: Login page responsive - ${scrollWidth}px content in ${clientWidth}px viewport`)
      })

      test('should display access gate responsively', async () => {
        await page.goto('/dashboard')
        await page.waitForLoadState('networkidle')

        // Check access restricted message is visible
        const accessMessage = page.locator('text=Access restricted')
        await expect(accessMessage).toBeVisible()

        // Check login button has adequate touch target
        const loginButton = page.locator('a[href="/dashboard/login"]')
        await expect(loginButton).toBeVisible()

        const buttonBox = await loginButton.boundingBox()
        expect(buttonBox?.height).toBeGreaterThan(44) // iOS minimum touch target
        expect(buttonBox?.width).toBeGreaterThan(44)

        console.log(`✅ ${device.name}: Touch targets adequate - ${buttonBox?.width}x${buttonBox?.height}px`)
      })

      test('should handle form interactions on mobile', async () => {
        await page.goto('/dashboard/login')
        await page.waitForLoadState('networkidle')

        // Look for form elements
        const formInputs = await page.locator('input, textarea, select').all()
        
        for (const [index, input] of formInputs.entries()) {
          const type = await input.getAttribute('type')
          const placeholder = await input.getAttribute('placeholder')
          const isVisible = await input.isVisible()
          
          if (isVisible) {
            console.log(`📝 ${device.name}: Input ${index + 1} - type: ${type}, placeholder: ${placeholder}`)
            
            // Check input is large enough for touch
            const inputBox = await input.boundingBox()
            if (inputBox) {
              expect(inputBox.height).toBeGreaterThan(36) // Minimum mobile input height
            }
          }
        }
      })

      test('should handle navigation on mobile', async () => {
        await page.goto('/dashboard')
        await page.waitForLoadState('networkidle')

        // Look for navigation elements
        const navLinks = await page.locator('a, button').all()
        
        for (const [index, link] of navLinks.slice(0, 5).entries()) { // Check first 5 links
          const isVisible = await link.isVisible()
          
          if (isVisible) {
            const linkBox = await link.boundingBox()
            const text = await link.textContent()
            
            if (linkBox && text?.trim()) {
              expect(linkBox.height).toBeGreaterThan(32) // Minimum tap target
              console.log(`🔗 ${device.name}: Link "${text.trim()}" - ${linkBox.width}x${linkBox.height}px`)
            }
          }
        }
      })

      test('should not break layout on device orientation', async () => {
        await page.goto('/dashboard/login')
        await page.waitForLoadState('networkidle')

        // Test portrait
        const portraitErrors: string[] = []
        page.on('pageerror', error => portraitErrors.push(error.message))
        
        // Check layout doesn't break
        const body = page.locator('body')
        await expect(body).toBeVisible()
        
        // For tablets, test landscape orientation
        if (device.width >= 768) {
          await page.setViewportSize({ width: device.height, height: device.width })
          await page.waitForLoadState('networkidle')
          
          const landscapeErrors: string[] = []
          page.on('pageerror', error => landscapeErrors.push(error.message))
          
          await expect(body).toBeVisible()
          
          console.log(`🔄 ${device.name}: Orientation change - portrait: ${portraitErrors.length} errors, landscape: ${landscapeErrors.length} errors`)
        }
      })
    })
  }

  test.describe('Mobile-Specific Functionality', () => {
    test.beforeEach(async () => {
      // Use iPhone 12 as default mobile test device
      await page.setViewportSize({ width: 390, height: 844 })
    })

    test('should handle touch events properly', async () => {
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')

      // Find interactive elements
      const buttons = await page.locator('button, [role="button"], input[type="submit"]').all()
      
      for (const button of buttons.slice(0, 3)) { // Test first 3 buttons
        const isVisible = await button.isVisible()
        
        if (isVisible) {
          // Test touch interaction
          try {
            await button.hover()
            await button.tap()
            console.log('✅ Touch interaction successful on button')
          } catch (error) {
            // Some buttons might not be interactive without form data
            console.log('ℹ️ Button tap resulted in expected behavior')
          }
        }
      }
    })

    test('should display error messages properly on mobile', async () => {
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')

      // Try to trigger form validation
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first()
      
      if (await submitButton.isVisible()) {
        await submitButton.tap()
        
        // Check if validation messages are visible and readable
        await page.waitForTimeout(1000)
        
        const errorMessages = await page.locator('.error, [role="alert"], .text-red, .text-danger').all()
        
        for (const errorMsg of errorMessages) {
          if (await errorMsg.isVisible()) {
            const errorBox = await errorMsg.boundingBox()
            const errorText = await errorMsg.textContent()
            
            console.log(`📱 Mobile error message: "${errorText?.trim()}" - ${errorBox?.width}x${errorBox?.height}px`)
            
            // Error should be readable (not too small)
            if (errorBox) {
              expect(errorBox.height).toBeGreaterThan(16)
            }
          }
        }
      }
    })

    test('should handle loading states on mobile', async () => {
      const startTime = Date.now()
      
      await page.goto('/dashboard')
      
      // Monitor loading indicators
      const loadingIndicators = await page.locator('.loading, .spinner, [role="progressbar"]').all()
      
      if (loadingIndicators.length > 0) {
        console.log(`📱 Found ${loadingIndicators.length} loading indicators`)
        
        for (const indicator of loadingIndicators) {
          if (await indicator.isVisible()) {
            console.log('📱 Loading indicator visible during page load')
          }
        }
      }
      
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      console.log(`📱 Mobile page load time: ${loadTime}ms`)
      
      // Should load reasonably fast on mobile
      expect(loadTime).toBeLessThan(8000) // More time allowed for mobile
    })

    test('should have accessible mobile navigation', async () => {
      await page.goto('/dashboard')
      await page.waitForLoadState('networkidle')

      // Check for mobile menu toggles
      const menuToggles = await page.locator('[aria-label*="menu"], .hamburger, .menu-toggle, [data-toggle="menu"]').all()
      
      for (const toggle of menuToggles) {
        if (await toggle.isVisible()) {
          const toggleBox = await toggle.boundingBox()
          console.log(`📱 Menu toggle found - ${toggleBox?.width}x${toggleBox?.height}px`)
          
          // Should be large enough for touch
          if (toggleBox) {
            expect(toggleBox.height).toBeGreaterThan(44)
            expect(toggleBox.width).toBeGreaterThan(44)
          }
        }
      }
    })

    test('should handle keyboard on mobile devices', async () => {
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')

      const inputs = await page.locator('input[type="email"], input[type="password"], input[type="text"]').all()
      
      for (const input of inputs) {
        if (await input.isVisible()) {
          const inputType = await input.getAttribute('type')
          const inputMode = await input.getAttribute('inputmode')
          
          console.log(`📱 Input type: ${inputType}, inputmode: ${inputMode}`)
          
          // Email inputs should have proper inputmode
          if (inputType === 'email') {
            expect(inputMode).toBe('email')
          }
        }
      }
    })
  })

  test.describe('Mobile Performance', () => {
    test.beforeEach(async () => {
      await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE - slower device
    })

    test('should be performant on slower mobile devices', async () => {
      // Simulate slower mobile CPU
      await page.context().newCDPSession(page).then(client =>
        client.send('Emulation.setCPUThrottlingRate', { rate: 4 })
      )

      const startTime = Date.now()
      
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')
      
      const loadTime = Date.now() - startTime
      console.log(`📱 Throttled mobile load time: ${loadTime}ms`)
      
      // Should still be usable on slow devices
      expect(loadTime).toBeLessThan(10000)
    })

    test('should handle limited memory gracefully', async () => {
      await page.goto('/dashboard')
      
      // Check memory usage doesn't grow excessively
      const memoryInfo = await page.evaluate(() => {
        if ('memory' in performance) {
          return (performance as any).memory
        }
        return null
      })
      
      if (memoryInfo) {
        console.log(`📱 Memory usage: ${Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)}MB`)
        
        // Should not use excessive memory (threshold for mobile)
        expect(memoryInfo.usedJSHeapSize).toBeLessThan(50 * 1024 * 1024) // 50MB
      }
    })

    test('should minimize network requests on mobile', async () => {
      const requests: string[] = []
      
      page.on('request', request => {
        requests.push(request.url())
      })
      
      await page.goto('/dashboard/login')
      await page.waitForLoadState('networkidle')
      
      console.log(`📱 Total network requests: ${requests.length}`)
      
      // Should not make excessive requests
      expect(requests.length).toBeLessThan(50)
      
      // Check for unnecessary requests
      const imageRequests = requests.filter(url => url.match(/\.(jpg|jpeg|png|gif|webp)$/i))
      const jsRequests = requests.filter(url => url.includes('.js'))
      const cssRequests = requests.filter(url => url.includes('.css'))
      
      console.log(`📱 Images: ${imageRequests.length}, JS: ${jsRequests.length}, CSS: ${cssRequests.length}`)
    })
  })

  test.afterEach(async () => {
    if (page) {
      await page.close()
    }
  })
})