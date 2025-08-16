import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://dramitashukla.com';
  const currentDate = new Date().toISOString();

  // Blog categories only (removed non-existent blog posts)
  const blogPages = [
    // Category pages
    {
      url: '/blog/category/pregnancy-care',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/blog/category/pcos-treatment',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/blog/category/fertility-care',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/blog/category/womens-health',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    }
    // Note: Removed 5 blog post URLs that return 404:
    // - /blog/signs-symptoms-pcos-when-to-see-gynecologist
    // - /blog/high-risk-pregnancy-complete-guide-lucknow
    // - /blog/fertility-treatment-options-success-rates
    // - /blog/laparoscopy-surgery-benefits-recovery-time
    // - /blog/choosing-best-gynecologist-lucknow-checklist
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${blogPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  });
}