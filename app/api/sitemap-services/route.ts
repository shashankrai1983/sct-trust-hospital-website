import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.dramitashukla.com';
  const currentDate = new Date().toISOString();

  // Service pages
  const services = [
    {
      url: '/services/high-risk-pregnancy',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/services/pcos-pcod-treatment',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/services/infertility-treatment',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/services/laparoscopy',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/services/antenatal-care',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/services/pregnancy-complications',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      url: '/services/well-women-health',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    // Location-based service pages
    {
      url: '/location/gomti-nagar-gynecologist',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/location/lda-colony-gynecologist',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/location/charbagh-gynecologist',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/location/hazratganj-gynecologist',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    // Condition-specific pages
    {
      url: '/conditions/pcos-treatment-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/conditions/fertility-treatment-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/conditions/menopause-care-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/conditions/pregnancy-complications-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    // Procedure-specific pages
    {
      url: '/procedures/laparoscopy-surgery-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/procedures/hysteroscopy-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: '/procedures/ivf-treatment-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/procedures/normal-delivery-lucknow',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${services.map(service => `
  <url>
    <loc>${baseUrl}${service.url}</loc>
    <lastmod>${service.lastmod}</lastmod>
    <changefreq>${service.changefreq}</changefreq>
    <priority>${service.priority}</priority>
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