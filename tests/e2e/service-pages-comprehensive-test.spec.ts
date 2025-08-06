import { test, expect, Page } from '@playwright/test';

// Service pages to test
const SERVICE_PAGES = [
  {
    path: '/services/high-risk-pregnancy',
    title: 'High Risk Pregnancy Management',
    expectedH1: 'High Risk Pregnancy Management',
    metaDescription: /pregnancy.*management.*specialist.*care/i
  },
  {
    path: '/services/pcos-pcod-treatment',
    title: 'PCOS PCOD Treatment',
    expectedH1: 'PCOS PCOD Treatment',
    metaDescription: /PCOS.*PCOD.*treatment.*hormonal/i
  },
  {
    path: '/services/infertility-treatment',
    title: 'Infertility Treatment',
    expectedH1: 'Infertility Treatment',
    metaDescription: /infertility.*treatment.*fertility.*specialist/i
  },
  {
    path: '/services/laparoscopy',
    title: 'Laparoscopy Surgery',
    expectedH1: 'Laparoscopy Surgery',
    metaDescription: /laparoscopy.*minimally.*invasive.*surgery/i
  },
  {
    path: '/services/antenatal-care',
    title: 'Antenatal Care',
    expectedH1: 'Antenatal Care',
    metaDescription: /antenatal.*prenatal.*care.*pregnancy/i
  },
  {
    path: '/services/pregnancy-complications',
    title: 'Pregnancy Complications Management',
    expectedH1: 'Pregnancy Complications Management',
    metaDescription: /pregnancy.*complications.*management.*specialist/i
  },
  {
    path: '/services/well-women-health',
    title: 'Well Women Health',
    expectedH1: 'Well Women Health',
    metaDescription: /women.*health.*wellness.*preventive.*care/i
  }
];

// Helper function to capture full page screenshot
async function captureFullPageScreenshot(page: Page, filename: string) {
  await page.screenshot({
    path: `test-results/${filename}`,
    fullPage: true
  });
}

// Helper function to check console errors
async function checkConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  return errors;
}

// Helper function to check page performance
async function getPageMetrics(page: Page) {
  const performanceMetrics = await page.evaluate(() => {
    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
      loadComplete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
      firstContentfulPaint: 0, // Will need to be measured differently
      totalLoadTime: Math.round(perfData.loadEventEnd - perfData.navigationStart)
    };
  });
  return performanceMetrics;
}

test.describe('Service Pages Comprehensive Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set up error tracking
    await checkConsoleErrors(page);
  });

  SERVICE_PAGES.forEach((service, index) => {
    test.describe(`${service.title} - ${service.path}`, () => {
      
      test('should load successfully with correct status', async ({ page }) => {
        const response = await page.goto(`http://localhost:3000${service.path}`);
        expect(response?.status()).toBe(200);
        
        // Wait for page to fully load
        await page.waitForLoadState('networkidle');
        
        // Capture screenshot for documentation
        await captureFullPageScreenshot(page, `service-${index + 1}-${service.path.split('/').pop()}-desktop.png`);
      });

      test('should have correct page title and meta tags', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Check page title
        const pageTitle = await page.title();
        expect(pageTitle).toContain(service.title);
        
        // Check meta description
        const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
        expect(metaDescription).toMatch(service.metaDescription);
        
        // Check canonical URL
        const canonicalUrl = await page.getAttribute('link[rel="canonical"]', 'href');
        expect(canonicalUrl).toContain(service.path);
        
        // Check Open Graph tags
        const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
        const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
        const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content');
        
        expect(ogTitle).toContain(service.title);
        expect(ogDescription).toMatch(service.metaDescription);
        expect(ogUrl).toContain(service.path);
      });

      test('should render main content components correctly', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Check main heading
        const h1Element = await page.locator('h1').first();
        await expect(h1Element).toBeVisible();
        await expect(h1Element).toContainText(service.expectedH1);
        
        // Check hero section exists
        const heroSection = page.locator('[data-testid="hero-section"], .hero-section, section:first-of-type');
        await expect(heroSection).toBeVisible();
        
        // Check overview section exists
        const overviewSection = page.locator('[data-testid="overview-section"], .overview-section');
        await expect(overviewSection).toBeVisible();
        
        // Check warning section exists if applicable
        const warningSection = page.locator('[data-testid="warning-section"], .warning-section');
        if (await warningSection.count() > 0) {
          await expect(warningSection).toBeVisible();
        }
      });

      test('should load all images properly', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Get all images
        const images = await page.locator('img').all();
        
        for (const img of images) {
          // Check if image is visible
          await expect(img).toBeVisible();
          
          // Check if image has loaded (not broken)
          const naturalWidth = await img.evaluate((el) => (el as HTMLImageElement).naturalWidth);
          expect(naturalWidth).toBeGreaterThan(0);
        }
      });

      test('should be mobile responsive', async ({ page }) => {
        // Test on mobile viewport
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Capture mobile screenshot
        await captureFullPageScreenshot(page, `service-${index + 1}-${service.path.split('/').pop()}-mobile.png`);
        
        // Check that content is visible and not overflowing
        const body = page.locator('body');
        const bodyWidth = await body.evaluate((el) => el.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(375 + 10); // Allow 10px tolerance
        
        // Check mobile navigation if it exists
        const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, button[aria-label*="menu"]');
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu).toBeVisible();
        }
      });

      test('should have no console errors', async ({ page }) => {
        const errors: string[] = [];
        
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        page.on('pageerror', (error) => {
          errors.push(error.message);
        });
        
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Filter out known acceptable errors (if any)
        const filteredErrors = errors.filter(error => 
          !error.includes('favicon.ico') && 
          !error.includes('net::ERR_INTERNET_DISCONNECTED')
        );
        
        expect(filteredErrors).toHaveLength(0);
      });

      test('should have good performance metrics', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        const metrics = await getPageMetrics(page);
        
        // Performance thresholds (in milliseconds)
        expect(metrics.totalLoadTime).toBeLessThan(5000); // 5 seconds
        expect(metrics.domContentLoaded).toBeLessThan(2000); // 2 seconds
      });
    });
  });

  test.describe('Service Navigation and Interlinking', () => {
    
    test('should have working navigation between service pages', async ({ page }) => {
      await page.goto('http://localhost:3000/services/high-risk-pregnancy');
      await page.waitForLoadState('networkidle');
      
      // Check if there are links to other services
      const serviceLinks = page.locator('a[href*="/services/"]');
      const linkCount = await serviceLinks.count();
      
      if (linkCount > 0) {
        // Test clicking on a service link
        const firstServiceLink = serviceLinks.first();
        const href = await firstServiceLink.getAttribute('href');
        
        await firstServiceLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify navigation worked
        expect(page.url()).toContain(href || '');
      }
    });

    test('should have breadcrumb navigation if implemented', async ({ page }) => {
      await page.goto('http://localhost:3000/services/high-risk-pregnancy');
      await page.waitForLoadState('networkidle');
      
      // Check for breadcrumbs
      const breadcrumbs = page.locator('[data-testid="breadcrumbs"], .breadcrumbs, nav[aria-label="breadcrumb"]');
      
      if (await breadcrumbs.count() > 0) {
        await expect(breadcrumbs).toBeVisible();
        
        // Check if breadcrumbs contain service name
        const breadcrumbText = await breadcrumbs.textContent();
        expect(breadcrumbText).toContain('Services');
      }
    });
  });

  test.describe('Forms Functionality', () => {
    
    SERVICE_PAGES.forEach((service, index) => {
      test(`should have functional forms on ${service.title}`, async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('networkidle');
        
        // Look for any forms on the page
        const forms = await page.locator('form').all();
        
        for (const form of forms) {
          // Check if form is visible
          await expect(form).toBeVisible();
          
          // Look for input fields
          const inputs = await form.locator('input, textarea, select').all();
          
          for (const input of inputs) {
            // Check if input is accessible
            await expect(input).toBeVisible();
            
            // Test that required inputs have proper attributes
            const isRequired = await input.getAttribute('required');
            const inputType = await input.getAttribute('type');
            const inputName = await input.getAttribute('name');
            
            if (isRequired !== null) {
              expect(inputName).toBeTruthy(); // Required fields should have names
            }
          }
          
          // Look for submit button
          const submitButton = form.locator('button[type="submit"], input[type="submit"]');
          if (await submitButton.count() > 0) {
            await expect(submitButton).toBeVisible();
          }
        }
      });
    });
  });

  test.describe('Sitemap Verification', () => {
    
    test('should include all service pages in sitemap', async ({ page }) => {
      const response = await page.goto('http://localhost:3000/sitemap.xml');
      expect(response?.status()).toBe(200);
      
      const sitemapContent = await page.textContent('body');
      
      // Check that all service pages are included in sitemap
      SERVICE_PAGES.forEach((service) => {
        expect(sitemapContent).toContain(service.path);
      });
    });
  });
});

// Test report generation helper
test.describe('Test Report Generation', () => {
  test('should generate test report summary', async ({ page }) => {
    // This will be captured in the test results
    console.log('=== SERVICE PAGES TEST SUMMARY ===');
    console.log(`Total service pages tested: ${SERVICE_PAGES.length}`);
    console.log('Service pages:');
    SERVICE_PAGES.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title} - ${service.path}`);
    });
    console.log('=== END SUMMARY ===');
  });
});