import { NextResponse } from 'next/server';
import { getActiveLocations } from '@/data/locations/registry';

export async function GET() {
  const baseUrl = 'https://dramitashukla.com';
  const currentDate = new Date().toISOString();

  // Get all active locations
  const activeLocations = getActiveLocations();

  // Generate location pages
  const locationPages = activeLocations.map(location => {
    // Determine priority based on location priority and search volume
    let priority = '0.8';
    if (location.priority === 'high' && location.searchVolume === 'high') {
      priority = '0.9';
    } else if (location.priority === 'medium' || location.searchVolume === 'medium') {
      priority = '0.8';
    } else {
      priority = '0.7';
    }

    return {
      url: `/gynecologist-in/${location.slug}`,
      lastmod: location.lastUpdated ? new Date(location.lastUpdated).toISOString() : currentDate,
      changefreq: 'weekly',
      priority
    };
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${locationPages.map(page => `
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