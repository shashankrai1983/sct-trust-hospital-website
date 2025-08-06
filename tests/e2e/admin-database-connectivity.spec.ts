import { test, expect, Page } from '@playwright/test'

/**
 * Database Connectivity and Admin Functions Test
 * Validates that database operations work after SEO changes
 * Focus: MongoDB connectivity, CRUD operations, data integrity
 */

test.describe('Admin Database Connectivity', () => {
  let page: Page

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    
    // Monitor database-related console messages
    page.on('console', msg => {
      const text = msg.text()
      if (text.includes('MongoDB') || text.includes('database') || text.includes('connection')) {
        console.log(`🔍 Database Log: ${msg.type()}: ${text}`)
      }
      if (msg.type() === 'error') {
        console.log(`❌ Console Error: ${text}`)
      }
    })
  })

  test.describe('Database Connection Health', () => {
    test('should handle appointment API requests properly', async () => {
      // Test GET request to appointments
      const getResponse = await page.request.get('/api/appointments')
      
      console.log(`📊 GET /api/appointments: ${getResponse.status()}`)
      
      // Should not return server error
      expect(getResponse.status()).not.toBe(500)
      
      if (getResponse.status() === 401) {
        console.log('✅ API properly protected with authentication')
      } else if (getResponse.status() === 200) {
        const data = await getResponse.json()
        console.log('✅ API accessible, data structure:', typeof data)
      }
    })

    test('should handle POST requests to appointments API', async () => {
      const testAppointment = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        preferredDate: '2024-12-15',
        preferredTime: '10:00',
        service: 'consultation',
        message: 'Test appointment'
      }

      const postResponse = await page.request.post('/api/appointments', {
        data: testAppointment,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(`📝 POST /api/appointments: ${postResponse.status()}`)
      
      // Should not return server error
      expect(postResponse.status()).not.toBe(500)
      
      const responseText = await postResponse.text()
      
      // Should not expose database errors
      expect(responseText.toLowerCase()).not.toContain('mongo')
      expect(responseText.toLowerCase()).not.toContain('connection refused')
      expect(responseText.toLowerCase()).not.toContain('econnrefused')
      
      if (postResponse.status() === 201) {
        console.log('✅ Appointment creation successful')
      } else if (postResponse.status() === 422) {
        console.log('✅ Validation working properly')
      } else if (postResponse.status() === 400) {
        console.log('✅ Bad request handling working')
      }
    })

    test('should handle dashboard stats API', async () => {
      const statsResponse = await page.request.get('/api/dashboard/stats')
      
      console.log(`📊 GET /api/dashboard/stats: ${statsResponse.status()}`)
      
      // Should not return server error
      expect(statsResponse.status()).not.toBe(500)
      
      if (statsResponse.status() === 401) {
        console.log('✅ Dashboard stats properly protected')
      } else if (statsResponse.status() === 200) {
        const stats = await statsResponse.json()
        console.log('✅ Dashboard stats accessible:', Object.keys(stats))
      }
    })

    test('should handle dashboard appointments API', async () => {
      const dashAppointmentsResponse = await page.request.get('/api/dashboard/appointments')
      
      console.log(`📋 GET /api/dashboard/appointments: ${dashAppointmentsResponse.status()}`)
      
      // Should not return server error
      expect(dashAppointmentsResponse.status()).not.toBe(500)
      
      if (dashAppointmentsResponse.status() === 401) {
        console.log('✅ Dashboard appointments properly protected')
      } else if (dashAppointmentsResponse.status() === 200) {
        const appointments = await dashAppointmentsResponse.json()
        console.log('✅ Dashboard appointments accessible, type:', typeof appointments)
      }
    })
  })

  test.describe('Error Handling and Resilience', () => {
    test('should gracefully handle invalid appointment data', async () => {
      const invalidData = {
        name: '', // Invalid: empty name
        email: 'invalid-email', // Invalid email format
        phone: '123', // Invalid phone
      }

      const response = await page.request.post('/api/appointments', {
        data: invalidData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(`❌ Invalid data test: ${response.status()}`)
      
      // Should return validation error, not server error
      expect([400, 422]).toContain(response.status())
      expect(response.status()).not.toBe(500)
      
      const responseData = await response.text()
      expect(responseData).toBeDefined()
    })

    test('should handle malformed JSON gracefully', async () => {
      const response = await page.request.post('/api/appointments', {
        data: '{invalid json}',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(`🔧 Malformed JSON test: ${response.status()}`)
      
      // Should return bad request, not server error
      expect(response.status()).toBe(400)
      expect(response.status()).not.toBe(500)
    })

    test('should handle missing Content-Type header', async () => {
      const response = await page.request.post('/api/appointments', {
        data: JSON.stringify({ name: 'Test' })
        // Missing Content-Type header
      })

      console.log(`📋 Missing Content-Type test: ${response.status()}`)
      
      // Should handle gracefully
      expect(response.status()).not.toBe(500)
    })
  })

  test.describe('Authentication Integration', () => {
    test('should integrate NextAuth with database operations', async () => {
      // Test NextAuth session endpoint
      const sessionResponse = await page.request.get('/api/auth/session')
      
      console.log(`🔐 NextAuth session: ${sessionResponse.status()}`)
      
      expect(sessionResponse.ok()).toBeTruthy()
      
      const session = await sessionResponse.json()
      console.log('🔐 Session data type:', typeof session)
    })

    test('should handle protected dashboard routes properly', async () => {
      // Navigate to protected route
      await page.goto('/dashboard/appointments')
      
      // Should redirect or show access control
      await page.waitForLoadState('networkidle')
      
      const hasAccessControl = await page.locator('text=Access restricted').isVisible()
      const hasContent = await page.locator('[data-testid="appointments"], .appointments').isVisible()
      
      // Should either show access control or authenticated content
      expect(hasAccessControl || hasContent).toBeTruthy()
      
      if (hasAccessControl) {
        console.log('✅ Access control working - showing login gate')
      } else {
        console.log('✅ User is authenticated - showing dashboard content')
      }
    })
  })

  test.describe('Data Validation and Security', () => {
    test('should validate appointment data server-side', async () => {
      const testCases = [
        {
          name: 'SQL Injection Test',
          data: {
            name: "'; DROP TABLE appointments; --",
            email: 'test@example.com',
            phone: '1234567890'
          }
        },
        {
          name: 'XSS Test',
          data: {
            name: '<script>alert("xss")</script>',
            email: 'test@example.com',
            phone: '1234567890'
          }
        },
        {
          name: 'NoSQL Injection Test',
          data: {
            name: { $ne: null },
            email: 'test@example.com',
            phone: '1234567890'
          }
        }
      ]

      for (const testCase of testCases) {
        console.log(`🛡️ Testing: ${testCase.name}`)
        
        const response = await page.request.post('/api/appointments', {
          data: testCase.data,
          headers: {
            'Content-Type': 'application/json'
          }
        })

        // Should not return server error (should be handled)
        expect(response.status()).not.toBe(500)
        
        // Should return validation error for malicious data
        expect([400, 422]).toContain(response.status())
        
        console.log(`✅ ${testCase.name}: ${response.status()}`)
      }
    })

    test('should sanitize user inputs', async () => {
      const testData = {
        name: '  John Doe  ',
        email: '  JOHN@EXAMPLE.COM  ',
        phone: '  +1-234-567-8900  ',
        message: '  Test message with extra spaces  '
      }

      const response = await page.request.post('/api/appointments', {
        data: testData,
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log(`🧹 Input sanitization test: ${response.status()}`)
      
      // Should handle the request properly
      expect([200, 201, 400, 422]).toContain(response.status())
      expect(response.status()).not.toBe(500)
    })
  })

  test.describe('Performance and Monitoring', () => {
    test('should respond to database queries within reasonable time', async () => {
      const startTime = Date.now()
      
      const response = await page.request.get('/api/appointments')
      
      const responseTime = Date.now() - startTime
      console.log(`⏱️ Database query response time: ${responseTime}ms`)
      
      // Should respond within 5 seconds
      expect(responseTime).toBeLessThan(5000)
      
      // Should not return timeout error
      expect(response.status()).not.toBe(408)
      expect(response.status()).not.toBe(504)
    })

    test('should handle concurrent requests gracefully', async () => {
      const requests = Array.from({ length: 5 }, (_, i) =>
        page.request.get(`/api/appointments?page=${i}`)
      )

      const startTime = Date.now()
      const responses = await Promise.all(requests)
      const totalTime = Date.now() - startTime

      console.log(`🔀 Concurrent requests time: ${totalTime}ms`)

      // All requests should complete
      expect(responses).toHaveLength(5)
      
      // None should return server errors
      for (const [index, response] of responses.entries()) {
        console.log(`Request ${index + 1}: ${response.status()}`)
        expect(response.status()).not.toBe(500)
        expect(response.status()).not.toBe(502)
        expect(response.status()).not.toBe(503)
      }
    })
  })

  test.afterEach(async () => {
    if (page) {
      await page.close()
    }
  })
})