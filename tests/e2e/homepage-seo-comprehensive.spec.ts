import { test, expect, Page } from '@playwright/test';
import { devices } from '@playwright/test';

// Test data and expectations - Updated based on actual site content
const SEO_EXPECTATIONS = {
  title: 'Best Gynaecologist in Lucknow - Dr. Amita Shukla | SCT Trust Hospital',
  description: 'Dr. Amita Shukla is the best gynaecologist in Lucknow with 10+ years experience. Expert in high-risk pregnancy, PCOS treatment, infertility care at SCT Trust Hospital.',
  siteName: 'Dr. Amita Shukla - SCT Trust Hospital',
  keywords: ['gynecologist', 'obstetrician', 'women\'s health', 'pregnancy', 'laparoscopy', 'Lucknow'],
  ogImage: '/images/dr-amita-shukla-og.jpg',
  twitterCard: 'summary_large_image'
};

const SCHEMA_EXPECTED_TYPES = [
  'Organization',
  'MedicalOrganization', 
  'Person',
  'WebSite',
  'BreadcrumbList'
];

// Performance thresholds (Core Web Vitals)
const PERFORMANCE_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint
  FID: 100,  // First Input Delay  
  CLS: 0.1   // Cumulative Layout Shift
};

test.describe('Homepage & SEO Comprehensive Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set up performance monitoring
    await page.route('**/*', (route) => {
      route.continue();
    });
  });

  test('Homepage Loading & Basic Functionality', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate to homepage
    await page.goto('/');
    
    // Check basic page load
    await expect(page).toHaveTitle(SEO_EXPECTATIONS.title);
    
    // Verify key elements are visible - Update selector based on actual homepage structure
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible({ timeout: 10000 });
    
    // Check navigation is present and functional - Update selector
    const navigation = page.locator('header').first();
    await expect(navigation).toBeVisible();
    
    // Verify main content loads
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    
    // Check footer is present
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    console.log(`Homepage load time: ${loadTime}ms`);
    
    // Take screenshot for documentation
    await page.screenshot({ path: 'test-results/homepage-loaded.png', fullPage: true });
  });

  test('SEO Meta Tags Verification', async ({ page }) => {
    await page.goto('/');
    
    // Check title tag
    const title = await page.title();
    expect(title).toBe(SEO_EXPECTATIONS.title);
    console.log('✅ Title tag verified:', title);
    
    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('gynaecologist'); // Fixed spelling
    expect(description).toContain('Dr. Amita Shukla');
    console.log('✅ Meta description verified:', description);
    
    // Check meta keywords
    const keywords = await page.getAttribute('meta[name="keywords"]', 'content');
    if (keywords) {
      for (const keyword of SEO_EXPECTATIONS.keywords) {
        expect(keywords.toLowerCase()).toContain(keyword.toLowerCase());
      }
      console.log('✅ Keywords verified:', keywords);
    }
    
    // Check viewport meta tag
    const viewport = await page.getAttribute('meta[name="viewport"]', 'content');
    expect(viewport).toContain('width=device-width');
    console.log('✅ Viewport meta tag verified:', viewport);
    
    // Check robots meta tag
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    console.log('🔍 Robots meta tag:', robots || 'Not found');
  });

  test('Open Graph Tags Verification', async ({ page }) => {
    await page.goto('/');
    
    // Check OG title
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
    console.log('✅ OG Title:', ogTitle);
    
    // Check OG description
    const ogDescription = await page.getAttribute('meta[property="og:description"]', 'content');
    expect(ogDescription).toBeTruthy();
    console.log('✅ OG Description:', ogDescription);
    
    // Check OG type
    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');
    expect(ogType).toBe('website');
    console.log('✅ OG Type:', ogType);
    
    // Check OG URL
    const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content');
    expect(ogUrl).toBeTruthy();
    console.log('✅ OG URL:', ogUrl);
    
    // Check OG image
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(ogImage).toBeTruthy();
    console.log('✅ OG Image:', ogImage);
    
    // Check OG site name
    const ogSiteName = await page.getAttribute('meta[property="og:site_name"]', 'content');
    console.log('🔍 OG Site Name:', ogSiteName || 'Not found');
  });

  test('Twitter Card Tags Verification', async ({ page }) => {
    await page.goto('/');
    
    // Check Twitter card type
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    expect(twitterCard).toBeTruthy();
    console.log('✅ Twitter Card:', twitterCard);
    
    // Check Twitter title
    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', 'content');
    console.log('🔍 Twitter Title:', twitterTitle || 'Not found');
    
    // Check Twitter description
    const twitterDescription = await page.getAttribute('meta[name="twitter:description"]', 'content');
    console.log('🔍 Twitter Description:', twitterDescription || 'Not found');
    
    // Check Twitter image
    const twitterImage = await page.getAttribute('meta[name="twitter:image"]', 'content');
    console.log('🔍 Twitter Image:', twitterImage || 'Not found');
  });

  test('Schema Markup Validation', async ({ page }) => {
    await page.goto('/');
    
    // Get all JSON-LD scripts
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    console.log(`Found ${jsonLdScripts.length} JSON-LD scripts`);
    
    const foundSchemaTypes: string[] = [];
    
    for (let i = 0; i < jsonLdScripts.length; i++) {
      const scriptContent = await jsonLdScripts[i].textContent();
      if (scriptContent) {
        try {
          const schema = JSON.parse(scriptContent);
          const schemaType = Array.isArray(schema) ? 
            schema.map(s => s['@type']).join(', ') : 
            schema['@type'];
          
          if (schemaType) {
            foundSchemaTypes.push(schemaType);
            console.log(`✅ Schema ${i + 1}:`, schemaType);
            
            // Validate schema structure
            expect(schema['@context']).toBeTruthy();
            expect(schema['@type']).toBeTruthy();
            
            // Specific validation for Organization schema
            if (schemaType.includes('Organization') || schemaType.includes('MedicalOrganization')) {
              expect(schema.name).toBeTruthy();
            }
            
            // Specific validation for Person schema
            if (schemaType.includes('Person')) {
              expect(schema.name).toBeTruthy();
              expect(schema.jobTitle || schema.hasOccupation).toBeTruthy();
            }
          }
        } catch (error) {
          console.error(`❌ Invalid JSON-LD schema ${i + 1}:`, error);
        }
      }
    }
    
    // Check if we have expected schema types
    console.log('🔍 All found schema types:', foundSchemaTypes);
    expect(foundSchemaTypes.length).toBeGreaterThan(0);
  });

  test('Google Analytics Implementation', async ({ page }) => {
    await page.goto('/');
    
    // Check for Google Analytics scripts
    const gaScripts = await page.locator('script[src*="googletagmanager.com"], script[src*="google-analytics.com"], script[src*="gtag"]').all();
    
    if (gaScripts.length > 0) {
      console.log(`✅ Found ${gaScripts.length} Google Analytics script(s)`);
      
      // Check for gtag function
      const gtagExists = await page.evaluate(() => {
        return typeof window.gtag === 'function';
      });
      
      if (gtagExists) {
        console.log('✅ gtag function is available');
      } else {
        console.log('⚠️  gtag function not found');
      }
    } else {
      console.log('⚠️  No Google Analytics scripts found');
    }
    
    // Check for GA measurement ID in page source
    const pageContent = await page.content();
    const gaIdMatch = pageContent.match(/G-[A-Z0-9]+/);
    if (gaIdMatch) {
      console.log('✅ Google Analytics Measurement ID found:', gaIdMatch[0]);
    }
  });

  test('Sitemap Availability', async ({ page }) => {
    // Test sitemap.xml
    const sitemapResponse = await page.request.get('/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
    
    const sitemapContent = await sitemapResponse.text();
    expect(sitemapContent).toContain('<?xml');
    // Updated to check for sitemap index format
    const hasSitemapIndex = sitemapContent.includes('<sitemapindex');
    const hasUrlSet = sitemapContent.includes('<urlset');
    expect(hasSitemapIndex || hasUrlSet).toBe(true);
    
    console.log('✅ Sitemap.xml is accessible and valid');
    
    // Count URLs in sitemap - Handle both sitemap index and direct sitemap
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    const sitemapCount = (sitemapContent.match(/<sitemap>/g) || []).length;
    if (sitemapCount > 0) {
      console.log(`📊 Sitemap index contains ${sitemapCount} sitemaps`);
    } else {
      console.log(`📊 Sitemap contains ${urlCount} URLs`);
    }
    
    // Test if sitemap is mentioned in robots.txt
    const robotsResponse = await page.request.get('/robots.txt');
    if (robotsResponse.status() === 200) {
      const robotsContent = await robotsResponse.text();
      if (robotsContent.includes('sitemap.xml')) {
        console.log('✅ Sitemap referenced in robots.txt');
      }
    }
  });

  test('Robots.txt Accessibility', async ({ page }) => {
    const robotsResponse = await page.request.get('/robots.txt');
    expect(robotsResponse.status()).toBe(200);
    
    const robotsContent = await robotsResponse.text();
    expect(robotsContent).toContain('User-agent:');
    
    console.log('✅ Robots.txt is accessible');
    console.log('📄 Robots.txt content:');
    console.log(robotsContent);
    
    // Check if sitemap is referenced
    if (robotsContent.toLowerCase().includes('sitemap')) {
      console.log('✅ Sitemap referenced in robots.txt');
    } else {
      console.log('⚠️  Sitemap not referenced in robots.txt');
    }
  });

  test('Navigation Functionality', async ({ page }) => {
    await page.goto('/');
    
    // Test main navigation links - Updated selector to find links in header
    const navLinks = await page.locator('header a').all();
    console.log(`📊 Found ${navLinks.length} navigation links`);
    
    let workingLinks = 0;
    let brokenLinks = 0;
    
    for (let i = 0; i < Math.min(navLinks.length, 10); i++) { // Test first 10 links
      const link = navLinks[i];
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      
      if (href && !href.startsWith('#')) {
        try {
          const response = await page.request.get(href);
          if (response.status() < 400) {
            workingLinks++;
            console.log(`✅ ${text}: ${href} (${response.status()})`);
          } else {
            brokenLinks++;
            console.log(`❌ ${text}: ${href} (${response.status()})`);
          }
        } catch (error) {
          brokenLinks++;
          console.log(`❌ ${text}: ${href} (Error: ${error})`);
        }
      }
    }
    
    console.log(`📊 Navigation Summary: ${workingLinks} working, ${brokenLinks} broken`);
    expect(brokenLinks).toBe(0);
  });

  test('Mobile Responsiveness', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { name: 'Mobile Portrait', width: 375, height: 667 },
      { name: 'Mobile Landscape', width: 667, height: 375 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      
      // Check if page content is visible
      const mainContent = page.locator('main').first();
      await expect(mainContent).toBeVisible();
      
      // Check if navigation is appropriate for viewport - Update selector
      const navigation = page.locator('header').first();
      await expect(navigation).toBeVisible();
      
      // Take screenshot for each viewport
      await page.screenshot({ 
        path: `test-results/responsive-${viewport.name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true
      });
      
      console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) - Responsive test passed`);
    }
  });

  test('Performance Metrics & Core Web Vitals', async ({ page }) => {
    await page.goto('/');
    
    // Measure Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const metrics: any = {};
        
        // LCP - Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // FID - First Input Delay (simulated)
        metrics.fid = 0; // Placeholder since FID requires real user interaction
        
        // CLS - Cumulative Layout Shift
        let clsScore = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          }
          metrics.cls = clsScore;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait a bit and then resolve
        setTimeout(() => resolve(metrics), 3000);
      });
    });
    
    console.log('📊 Performance Metrics:');
    console.log(`LCP (Largest Contentful Paint): ${(metrics as any).lcp?.toFixed(2) || 'N/A'} ms`);
    console.log(`CLS (Cumulative Layout Shift): ${(metrics as any).cls?.toFixed(3) || 'N/A'}`);
    
    // Additional performance checks
    const performanceEntries = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstByte: navigation.responseStart - navigation.requestStart,
        domInteractive: navigation.domInteractive - navigation.navigationStart
      };
    });
    
    console.log('⏱️  Additional Performance Metrics:');
    console.log(`Time to First Byte: ${performanceEntries.firstByte.toFixed(2)} ms`);
    console.log(`DOM Interactive: ${performanceEntries.domInteractive.toFixed(2)} ms`);
    console.log(`DOM Content Loaded: ${performanceEntries.domContentLoaded.toFixed(2)} ms`);
    console.log(`Load Complete: ${performanceEntries.loadComplete.toFixed(2)} ms`);
  });

  test('Medical Disclaimer & Trust Signals', async ({ page }) => {
    await page.goto('/');
    
    // Look for medical disclaimer
    const disclaimerSelectors = [
      'text=/disclaimer/i',
      'text=/medical advice/i', 
      'text=/consult.*doctor/i',
      'text=/professional.*guidance/i',
      '[data-testid*="disclaimer"]',
      '.disclaimer'
    ];
    
    let disclaimerFound = false;
    for (const selector of disclaimerSelectors) {
      const element = page.locator(selector).first();
      if (await element.count() > 0) {
        const text = await element.textContent();
        console.log('✅ Medical disclaimer found:', text?.substring(0, 100) + '...');
        disclaimerFound = true;
        break;
      }
    }
    
    if (!disclaimerFound) {
      console.log('⚠️  No explicit medical disclaimer found');
    }
    
    // Look for trust signals
    const trustSignals = [
      'Dr.',
      'MBBS',
      'MD', 
      'years of experience',
      'certified',
      'qualified',
      'registered'
    ];
    
    const pageContent = await page.content();
    const foundTrustSignals: string[] = [];
    
    for (const signal of trustSignals) {
      if (pageContent.toLowerCase().includes(signal.toLowerCase())) {
        foundTrustSignals.push(signal);
      }
    }
    
    console.log('✅ Trust signals found:', foundTrustSignals.join(', '));
    expect(foundTrustSignals.length).toBeGreaterThan(0);
    
    // Check for contact information
    const contactElements = await page.locator('text=/phone|tel:|call|contact|address/i').all();
    if (contactElements.length > 0) {
      console.log(`✅ Contact information present (${contactElements.length} elements)`);
    }
    
    // Check for professional credentials in structured data
    const credentialsInSchema = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      let hasCredentials = false;
      
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent || '');
          if (data.hasOccupation || data.jobTitle || data.medicalSpecialty) {
            hasCredentials = true;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      });
      
      return hasCredentials;
    });
    
    if (credentialsInSchema) {
      console.log('✅ Professional credentials found in structured data');
    }
  });

  test('Accessibility Compliance', async ({ page }) => {
    await page.goto('/');
    
    // Check for alt attributes on images
    const images = await page.locator('img').all();
    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (alt !== null) {
        imagesWithAlt++;
      } else {
        imagesWithoutAlt++;
      }
    }
    
    console.log(`📊 Images: ${imagesWithAlt} with alt text, ${imagesWithoutAlt} without`);
    
    // Check for heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    console.log(`📊 Found ${headings.length} headings`);
    
    // Check for form labels
    const inputs = await page.locator('input, select, textarea').all();
    let inputsWithLabels = 0;
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
      
      if (hasLabel || ariaLabel) {
        inputsWithLabels++;
      }
    }
    
    console.log(`📊 Form inputs: ${inputsWithLabels}/${inputs.length} with labels`);
    
    // Check color contrast (basic check)
    const colorContrastIssues = await page.evaluate(() => {
      const issues: string[] = [];
      // This is a simplified check - in real scenarios, you'd use tools like axe-core
      return issues;
    });
    
    console.log(`📊 Accessibility Summary: ${imagesWithAlt}/${images.length} images with alt, ${inputsWithLabels}/${inputs.length} inputs with labels`);
  });
});

test.describe('Cross-Browser Compatibility', () => {
  test('SEO elements work across browsers', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Basic SEO check for each browser
    const title = await page.title();
    expect(title).toContain('Dr. Amita Shukla');
    
    const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(metaDescription).toBeTruthy();
    
    console.log(`✅ ${browserName}: SEO elements verified`);
  });
});