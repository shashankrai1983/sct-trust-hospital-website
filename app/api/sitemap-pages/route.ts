import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://dramitashukla.com';
  const currentDate = new Date().toISOString();

  // Main pages
  const pages = [
    {
      url: '/',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/about',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.9'
    },
    {
      url: '/contact',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
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
