# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 healthcare website for Dr. Amita Shukla, a gynecologist at SCT Trust Hospital in Lucknow. The application features appointment booking, admin dashboard, blog content management, and comprehensive medical service information.

## Common Development Commands

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Testing
```bash
# Run all tests
npm run test:all

# Run individual test suites
npm run test:auth              # Authentication tests only
npm run test:e2e              # Playwright E2E tests
npm run test:e2e:headed       # E2E tests with browser UI
npm run test:e2e:debug        # E2E tests in debug mode
npm run test:e2e:ui           # E2E tests with Playwright UI

# Run specific test files
npm run test:auth-only        # Auth flow tests
npm run test:booking-only     # Appointment booking tests
npm run test:dashboard-only   # Admin dashboard tests
```

### Environment & Node.js Requirements
- **Node.js**: 18.19.0 (locked for compatibility with Next.js 13.5.1)
- **Package Manager**: npm (not yarn)
- **Installation**: Always use `npm install --legacy-peer-deps`

## Architecture Overview

### Technology Stack
- **Frontend**: Next.js 13 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom healthcare theme
- **UI Components**: Radix UI + shadcn/ui component library
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas
- **CMS**: Sanity for blog content
- **Authentication**: NextAuth.js with credentials provider
- **Security**: reCAPTCHA V3 for form protection
- **Deployment**: Netlify with CI/CD

### Project Structure

#### Core Application (`/app`)
```
app/
├── layout.tsx              # Root layout with providers
├── page.tsx               # Homepage
├── globals.css            # Global styles
├── providers.tsx          # Theme and context providers
├── api/
│   └── appointments/      # Appointment booking API
├── dashboard/             # Admin dashboard (protected)
│   ├── login/            # Authentication pages
│   ├── appointments/     # Appointment management
│   └── components/       # Dashboard-specific components
├── blog/                 # Sanity CMS blog
├── services/             # Medical service pages
└── contact/              # Contact and appointment forms
```

#### Component Architecture (`/components`)
```
components/
├── ui/                   # shadcn/ui base components
├── layout/               # Navigation, footer, conditional layouts
├── home/                 # Homepage-specific components
├── contact/              # Forms and contact components
├── services/             # Medical service components
├── blog/                 # Blog-related components
├── sops/                 # Standard Operating Procedures
└── theme-provider.tsx    # Theme management
```

#### Core Libraries (`/lib`)
```
lib/
├── mongodb.ts            # MongoDB connection and helpers
├── sanity.ts            # Sanity CMS client configuration
├── utils.ts             # Utility functions
└── sanity/schemas/      # Sanity schema definitions
```

### Database Architecture

#### MongoDB Collections
- **appointments**: Patient appointment bookings with reCAPTCHA V3 verification
- **Environment-specific databases**: 
  - Production: `sct_hospital`
  - Staging: `sct_hospital_staging`

#### Key Database Patterns
- Connection pooling with global client reuse in development
- Structured appointment documents with status tracking
- Environment-specific database separation for safe testing

### Authentication System

#### NextAuth.js Configuration
- **Provider**: Credentials-based authentication
- **Admin Account**: Single admin user with bcrypt-hashed password
- **Session**: JWT-based with 8-hour expiration
- **Protected Routes**: `/dashboard/*` requires authentication
- **Environment Variables**: Secure credential storage

### Content Management

#### Sanity CMS Integration
- **Blog Management**: Posts, categories, authors
- **Image Handling**: Optimized with Sanity image URLs
- **Environment**: Shared production dataset across environments
- **Content Types**: Blog posts with rich text and metadata

### Security Implementation

#### reCAPTCHA V3 Integration
- **Invisible Protection**: V3 implementation on appointment forms
- **Score Validation**: Minimum threshold of 0.5 for human verification
- **Action Verification**: Validates specific form actions
- **Environment Support**: Same keys across all environments

#### Security Headers (Netlify)
- HIPAA-compliant security headers for healthcare compliance
- Content Security Policy with specific allowlists
- Frame protection, XSS protection, HSTS enforcement
- Restrictive permissions policy for sensitive APIs

### Deployment Architecture

#### Multi-Environment Setup
- **Production**: https://dramitashukla.com (master branch)
- **Staging**: staging-dramitashukla.netlify.app (staging branch)
- **Local**: localhost:3000 (feature branches)

#### Netlify Configuration
- **Build Command**: Node 18 with legacy OpenSSL support
- **Memory Optimization**: 4GB heap size for build process
- **Package Manager**: Forced npm usage (no yarn)
- **Environment Variables**: Separate configs per environment

## Development Patterns

### Component Patterns
- **shadcn/ui**: Consistent UI component library usage
- **Conditional Rendering**: Layout components adapt to route context
- **TypeScript**: Strict typing with Zod validation
- **Responsive Design**: Mobile-first with Tailwind CSS

### API Patterns
- **Route Handlers**: App Router API routes in `/api` directories
- **Validation**: Zod schemas for request validation
- **Error Handling**: Structured error responses with proper HTTP status codes
- **Database Access**: Async/await patterns with proper connection management

### Testing Patterns
- **E2E Testing**: Playwright with cross-browser support
- **Authentication Testing**: Dedicated auth flow validation
- **Form Testing**: reCAPTCHA V3 integration testing
- **Mobile Testing**: Device emulation for responsive validation

### Styling Patterns
- **Custom Theme**: Healthcare-focused color palette (primary-green, accent-cream)
- **Font System**: Inter and Lato font families with CSS variables
- **Component Variants**: Class Variance Authority for component styling
- **Grid System**: Custom grid pattern background component

## Environment Configuration

### Required Environment Variables
```bash
# NextAuth.js
NEXTAUTH_SECRET=          # 32-byte random string
NEXTAUTH_URL=            # Application URL

# Admin Authentication
ADMIN_EMAIL=             # Admin login email
ADMIN_PASSWORD_HASH=     # bcrypt hash of admin password

# MongoDB
MONGODB_URI=             # MongoDB Atlas connection string
MONGODB_DB=              # Database name (environment-specific)

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=

# reCAPTCHA V3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```

### Development Workflow

#### Git Branch Strategy
```
master (production) ← merge after staging validation
  ↑
staging (testing) ← merge from feature branch
  ↑
feature/development (active development) ← all new work
```

#### Development Process
1. **Feature Development**: Work on `feature/development` branch, use staging database
2. **Local Testing**: Full application functionality with staging data
3. **Staging Deployment**: Merge `feature/development` to `staging` branch for testing
4. **Production Deployment**: Merge `staging` to `master` after validation

#### Git Commands for Feature Development
```bash
# Switch to feature branch (already created)
git checkout feature/development

# Pull latest changes
git pull origin feature/development

# Work on your features, then commit
git add .
git commit -m "feat: your feature description"
git push origin feature/development

# When ready for staging testing
git checkout staging
git pull origin staging
git merge feature/development
git push origin staging

# After staging validation, deploy to production
git checkout master
git pull origin master
git merge staging
git push origin master
```

## Key Implementation Notes

### MongoDB Connection Management
- Global connection reuse in development to prevent connection exhaustion
- Production uses fresh connections with proper pooling
- Environment-specific database isolation for safe testing

### TypeScript Configuration
- Path aliases for clean imports (`@/`, `@/components`, etc.)
- Strict mode enabled with build error handling
- Custom type definitions for reCAPTCHA and application-specific types

### Performance Optimizations
- Image optimization with Sanity and Next.js Image component
- Font optimization with next/font
- Bundle optimization with webpack configuration
- Static asset caching with appropriate headers

### Healthcare Compliance
- HIPAA-compliant security headers
- Secure form handling with CAPTCHA protection
- Audit trail for appointment submissions
- Secure session management with appropriate timeouts

## Troubleshooting Common Issues

### Build Issues
- Use Node.js 18.19.0 specifically
- Install with `--legacy-peer-deps` flag
- Ensure all environment variables are set
- Check Netlify build logs for specific errors

### Database Connection Issues
- Verify MongoDB Atlas network access settings
- Check connection string format and credentials
- Ensure database name matches environment
- Monitor connection pool limits

### Authentication Issues
- Verify NextAuth configuration and secret
- Check admin credentials and bcrypt hash
- Ensure session callback configuration
- Test with proper environment URLs

## Important Security Considerations

- Never commit real environment variables to repository
- Use staging environment for all testing
- Regularly rotate authentication secrets
- Monitor reCAPTCHA scores and adjust thresholds as needed
- Keep security headers updated for healthcare compliance