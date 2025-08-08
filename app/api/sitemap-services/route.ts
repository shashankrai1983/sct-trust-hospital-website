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
