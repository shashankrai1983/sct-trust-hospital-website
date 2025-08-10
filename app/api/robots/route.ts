import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://dramitashukla.com';

  const robots = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /out/

# Medical content crawl delay for accuracy
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-pages.xml
Sitemap: ${baseUrl}/sitemap-services.xml

# Block AI scrapers for medical content protection
User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /`;

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
    },
  });
}