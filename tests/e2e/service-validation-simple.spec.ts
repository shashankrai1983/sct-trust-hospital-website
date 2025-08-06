import { test, expect } from '@playwright/test';

// Service pages to test - simplified for manual validation
const SERVICE_PAGES = [
  { path: '/services/high-risk-pregnancy', name: 'High Risk Pregnancy' },
  { path: '/services/pcos-pcod-treatment', name: 'PCOS PCOD Treatment' },
  { path: '/services/infertility-treatment', name: 'Infertility Treatment' },
  { path: '/services/laparoscopy', name: 'Laparoscopy' },
  { path: '/services/antenatal-care', name: 'Antenatal Care' },
  { path: '/services/pregnancy-complications', name: 'Pregnancy Complications' },
  { path: '/services/well-women-health', name: 'Well Women Health' }
];

test.describe('Service Pages Validation', () => {
  
  SERVICE_PAGES.forEach((service) => {
    test.describe(`${service.name} - ${service.path}`, () => {
      
      test('should load with 200 status', async ({ page }) => {
        const response = await page.goto(`http://localhost:3000${service.path}`);
        expect(response?.status()).toBe(200);
        
        // Wait for page load
        await page.waitForLoadState('domcontentloaded');
        
        // Take a screenshot for manual validation
        await page.screenshot({
          path: `test-results/${service.name.replace(/\s+/g, '-').toLowerCase()}-desktop.png`,
          fullPage: true
        });
      });

      test('should have SEO meta tags', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('domcontentloaded');
        
        // Check title exists and is meaningful
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(10);
        
        // Check meta description exists
        const description = await page.getAttribute('meta[name="description"]', 'content');
        expect(description).toBeTruthy();
        expect(description.length).toBeGreaterThan(50);
        
        // Log for manual validation
        console.log(`${service.name}:`);
        console.log(`  Title: ${title}`);
        console.log(`  Description: ${description}`);
        console.log('---');
      });

      test('should have main heading', async ({ page }) => {
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('domcontentloaded');
        
        // Check for h1 element
        const h1 = await page.locator('h1').first();
        await expect(h1).toBeVisible();
        
        const h1Text = await h1.textContent();
        expect(h1Text).toBeTruthy();
        
        console.log(`${service.name} H1: ${h1Text}`);
      });

      test('should be mobile responsive', async ({ page }) => {
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(`http://localhost:3000${service.path}`);
        await page.waitForLoadState('domcontentloaded');
        
        // Check no horizontal scroll
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(385); // 10px tolerance
        
        // Take mobile screenshot
        await page.screenshot({
          path: `test-results/${service.name.replace(/\s+/g, '-').toLowerCase()}-mobile.png`,
          fullPage: true
        });
      });
    });
  });

  test('should have sitemap with all services', async ({ page }) => {
    const response = await page.goto('http://localhost:3000/sitemap.xml');
    expect(response?.status()).toBe(200);
    
    const content = await page.textContent('body');
    
    // Check each service is in sitemap
    SERVICE_PAGES.forEach((service) => {
      expect(content).toContain(service.path);
    });
    
    console.log('Sitemap includes all service pages ✓');
  });
});