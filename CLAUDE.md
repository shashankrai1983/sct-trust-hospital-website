# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Medical Content Guidelines

- When creating medical content, always provide a clear disclaimer that the information is for informational purposes only
- Remain factual and evidence-based, avoiding assumptions or speculative statements
- Do not provide direct medical advice
- Always recommend consulting with a qualified healthcare professional for personalized medical guidance
- Maintain a professional, informative tone without being overly sales-oriented
- Prioritize patient safety and accurate medical information

## Development Commands

### Core Development
- `npm run dev` - Start development server (telemetry disabled)
- `npm run build` - Production build with memory optimization (4GB heap, legacy OpenSSL support)
- `npm run start` - Start production server
- `npm run lint` - ESLint validation for app/, components/, lib/, src/

### Testing Suite
- `npm run test:e2e` - Full Playwright end-to-end tests
- `npm run test:e2e:headed` - E2E tests with browser UI
- `npm run test:e2e:debug` - Debug mode for E2E tests
- `npm run test:e2e:ui` - Playwright test runner UI
- `npm run test:auth` - Authentication system tests
- `npm run test:all` - Complete test suite (auth + e2e)

### Specific Test Commands
- `npm run test:auth-only` - Authentication flow tests
- `npm run test:booking-only` - Appointment booking tests
- `npm run test:dashboard-only` - Admin dashboard tests

### SEO & Performance Tools
- `node scripts/test-indexnow.js` - Test IndexNow API integration
- Static sitemap available at `/sitemap.xml`
- Dynamic sitemaps: `/sitemap-pages.xml`, `/sitemap-services.xml`, `/sitemap-locations.xml`, `/sitemap-blog.xml`

## Architecture Overview

### Next.js 13 App Router Structure
- **App Directory**: Modern Next.js 13+ file-based routing in `/app`
- **Pages API**: Legacy API routes in `/pages/api` for NextAuth and dashboard
- **Components**: Organized by feature (layout, seo, services, ui, templates)
- **Modular Backend**: Service-based architecture in `/src/modules`

### Key Architectural Patterns

#### Hybrid Routing Architecture
- **App Router**: Main website routes (`/app`)
- **Pages Router**: Authentication API (`/pages/api/auth`) and dashboard APIs
- **Middleware**: Route protection and authentication in `middleware.ts`

#### Database Layer (Modular Monolith)
- **Base Service**: Abstract CRUD operations (`/src/modules/shared/database/base.service.ts`)
- **MongoDB Integration**: Centralized connection management (`/lib/mongodb.ts`)
- **Type Safety**: Shared TypeScript types in `/src/modules/shared/types/`

#### SEO & Performance Architecture
- **Schema Markup**: Modular structured data components (`/components/seo/`)
- **Dynamic Sitemaps**: API-generated sitemaps with proper caching
- **Core Web Vitals**: Preloading, lazy loading, and optimization strategies
- **IndexNow Integration**: Instant search engine indexing (`/lib/indexnow.ts`)

### Location-Based Content System
- **Template-Driven**: Shared LocationPageTemplate for consistency
- **Data Registry**: Centralized location data in `/data/locations/`
- **Dynamic Routing**: `/gynecologist-in/[location]` for local SEO
- **Schema Integration**: Location-specific structured data

### Service Pages Architecture
- **Template System**: ServicePageTemplate with shared components
- **Modular Sections**: Reusable service page sections (`/components/services/sections/`)
- **Content Strategy**: Structured service data in `/data/services/`
- **SEO Optimization**: Service-specific schema and metadata

## Security & Performance Configuration

### Content Security Policy (CSP)
- **reCAPTCHA Compatible**: Google domains whitelisted for form protection
- **Analytics Enabled**: Google Analytics and Microsoft Clarity support
- **Font Optimization**: Google Fonts with proper CSP headers
- **Image Security**: Restricted to trusted domains (Sanity, Pexels, ibb.co)

### Build Optimizations
- **Memory Management**: 4GB heap allocation for large builds
- **Legacy Support**: OpenSSL legacy provider for compatibility
- **Code Splitting**: Package imports optimization for lucide-react, Radix UI
- **Image Optimization**: WebP/AVIF formats with responsive sizing

### Production Readiness
- **Error Handling**: Comprehensive error boundaries and middleware
- **TypeScript**: Build error tolerance for complex generics (temporary)
- **Webpack**: Browser polyfills for Node.js dependencies
- **Caching**: Proper cache headers for static assets

## Critical Integrations

### Authentication (NextAuth.js)
- **Dashboard Protection**: Middleware-based route protection
- **Session Management**: Secure session handling for admin dashboard
- **Login Flow**: Custom login pages with proper error handling

### Database (MongoDB)
- **Connection Pooling**: Optimized MongoDB connections
- **Base Service Pattern**: Consistent CRUD operations across modules
- **Appointment System**: Full booking workflow with validation

### SEO Optimization
- **Technical SEO**: Comprehensive optimization in `technicalseo.md`
- **Schema Markup**: FAQ, Review, Local Business, Breadcrumb schemas
- **IndexNow API**: Real-time search engine notification system
- **Core Web Vitals**: Resource preloading and optimization strategies

## Important Implementation Notes

### reCAPTCHA Integration
- Forms include Google reCAPTCHA v2 protection
- CSP headers configured for Google services compatibility
- Test functionality after security or SEO changes
- Does not work on localhost (production only)

### Location Pages System
- Automatic generation via LocationPageTemplate
- Centralized data management in location registry
- SEO-optimized URLs with local keyword targeting
- Dynamic schema markup for local search optimization

### Appointment Booking Flow
- Multi-step form with validation
- reCAPTCHA protection on submission
- Real-time availability checking
- Admin dashboard integration for management

### Testing Strategy
- Playwright for comprehensive E2E testing
- Authentication flow validation
- Mobile responsiveness testing
- Security and accessibility compliance testing

## SEO Optimization Reference

Refer to `technicalseo.md` for complete SEO implementation checklist including:
- Technical SEO fixes and optimizations
- Schema markup implementation status
- Core Web Vitals improvements
- Local SEO enhancements
- Progress tracking and completion status