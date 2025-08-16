# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Content Creation Guidelines

- When creating medical content, always provide a clear disclaimer that the information is for informational purposes only
- Remain factual and evidence-based, avoiding assumptions or speculative statements
- Do not provide direct medical advice
- Always recommend consulting with a qualified healthcare professional for personalized medical guidance
- Maintain a professional, informative tone without being overly sales-oriented
- Prioritize patient safety and accurate medical information

## SEO Optimization Reference

For comprehensive SEO improvements and technical optimization checklist, refer to:
- **`technicalseo.md`** - Complete SEO audit and implementation checklist for improving "Best Gyneacologist in Lucknow" rankings
- Includes technical SEO, on-page optimization, schema markup, Core Web Vitals, and local SEO improvements
- Updated in real-time with progress tracking and completion status

## Development Commands

### Testing
- `npm run test:e2e` - Run end-to-end tests including reCAPTCHA functionality
- `npm run test:auth` - Test authentication and form security
- `npm run lint` - Code quality and standards validation
- `npm run build` - Production build with SEO optimizations

### SEO and Performance
- Sitemap auto-generation: `/sitemap.xml`, `/sitemap-pages.xml`, `/sitemap-services.xml`
- IndexNow integration for instant search engine indexing
- Core Web Vitals optimization with preloading and lazy loading
- Comprehensive schema markup for rich results

## Important File References

### SEO Components
- `/components/seo/faq-schema.tsx` - FAQ structured data
- `/components/seo/breadcrumb-schema.tsx` - Navigation breadcrumbs
- `/components/seo/review-schema.tsx` - Patient reviews and ratings
- `/components/seo/local-business-schema.tsx` - Local business information

### Configuration
- `/next.config.js` - SEO headers, security, and performance settings
- `/public/sitemap.xml` - Static sitemap for search engines
- `/lib/indexnow.ts` - IndexNow API integration for instant indexing

## reCAPTCHA Integration
- All contact forms include Google reCAPTCHA protection
- CSP headers configured to allow necessary Google domains
- Test functionality after any SEO or security changes