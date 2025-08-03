# SCT Trust Hospital - Staging Environment Setup Guide

Complete staging workflow documentation for safe testing and deployment of all updates including reCAPTCHA V3 migration.

## Table of Contents
1. [Overview](#overview)
2. [MongoDB Database Strategy](#mongodb-database-strategy)
3. [Git Branch Workflow](#git-branch-workflow)
4. [Netlify Dual Deployment](#netlify-dual-deployment)
5. [Environment Configuration](#environment-configuration)
6. [reCAPTCHA V3 Setup](#recaptcha-v3-setup)
7. [Development Workflow](#development-workflow)
8. [Testing Strategy](#testing-strategy)
9. [Node.js Compliance](#nodejs-compliance)
10. [Implementation Timeline](#implementation-timeline)
11. [Troubleshooting](#troubleshooting)

## Overview

This staging environment provides:
- ✅ **Safe testing** of all changes before production
- ✅ **Separate database** for isolated testing
- ✅ **Real reCAPTCHA V3** integration testing
- ✅ **Professional development workflow**
- ✅ **Zero production risk** during development

### Architecture
```
Production: dramitashukla.com → master branch → sct_hospital DB
    ↑
Staging: staging-dramitashukla.netlify.app → staging branch → sct_hospital_staging DB
    ↑
Development: localhost → feature/* branches → sct_hospital_staging DB
```

## MongoDB Database Strategy

### Database Configuration
- **Production Database**: `sct_hospital` (existing)
- **Staging Database**: `sct_hospital_staging` (new)
- **Cluster**: Same MongoDB Atlas cluster (cost-efficient)

### Connection Strings
```env
# Production
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority
MONGODB_DB=sct_hospital

# Staging
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority
MONGODB_DB=sct_hospital_staging
```

### Benefits
- **Cost Efficient**: Same cluster, no additional infrastructure costs
- **Data Isolation**: Complete separation from production data
- **Safe Testing**: Full CRUD operations without production risk
- **Realistic Environment**: Complete application functionality testing

## Git Branch Workflow

### Branch Structure
```
master (production)
  ↑ merge after staging validation
staging (testing)
  ↑ merge completed features
feature/feature-name (development)
```

### Branch Commands
```bash
# Create staging branch (one-time setup)
git checkout -b staging
git push -u origin staging

# Feature development workflow
git checkout -b feature/new-feature
# ... develop and test
git checkout staging
git merge feature/new-feature
git push origin staging
# ... test on staging environment
git checkout master
git merge staging
git push origin master
```

## Netlify Dual Deployment

### Production Site (Existing)
- **Site Name**: SCT Trust Hospital
- **Domain**: dramitashukla.com
- **Branch**: master
- **Database**: sct_hospital
- **reCAPTCHA**: Production V3 keys

### Staging Site (New Setup)
- **Site Name**: SCT Hospital Staging
- **Domain**: staging-dramitashukla.netlify.app
- **Branch**: staging
- **Database**: sct_hospital_staging
- **reCAPTCHA**: Staging V3 keys

### Netlify Setup Steps
1. **Create New Site** in Netlify dashboard
2. **Connect to GitHub**: Same repository, `staging` branch
3. **Configure Build Settings**:
   - Build command: `npm install --legacy-peer-deps && NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS='--openssl-legacy-provider --max-old-space-size=4096' npm run build`
   - Publish directory: `.next`
   - Branch: `staging`
4. **Set Custom Domain**: staging-dramitashukla.netlify.app

## Environment Configuration

### Production Environment Variables (.env)
```env
# NextAuth.js Configuration
NEXTAUTH_URL=https://dramitashukla.com
NEXTAUTH_SECRET=4e3de64aaa6d533c42ddf4866a7ca8ccefb9ebea94770a3b8dab7de5d4f8149a

# Admin Dashboard Credentials
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=7twhx4c8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority
MONGODB_DB=sct_hospital

# reCAPTCHA V3 Configuration (Production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6
```

### Staging Environment Variables (Netlify)
```env
# NextAuth.js Configuration
NEXTAUTH_URL=https://staging-dramitashukla.netlify.app
NEXTAUTH_SECRET=/s7Z+DKttBCAs7lmk+Vg7S/zdMafQDYT+1Dk+knu+UI=

# Admin Dashboard Credentials (Same as Production)
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW

# Sanity CMS Configuration (Same content)
NEXT_PUBLIC_SANITY_PROJECT_ID=7twhx4c8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03

# MongoDB Atlas Configuration (Staging Database)
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority
MONGODB_DB=sct_hospital_staging

# reCAPTCHA V3 Configuration (Same as Production)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6

# Build Configuration
NODE_VERSION=18.19.0
NPM_VERSION=10
NODE_OPTIONS=--openssl-legacy-provider --max-old-space-size=4096
NEXT_TELEMETRY_DISABLED=1
NETLIFY_USE_YARN=false
NPM_FLAGS=--legacy-peer-deps
```

### Local Development Environment (.env.local)
```env
# Use staging database for local development
MONGODB_URI=mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority
MONGODB_DB=sct_hospital_staging

# Use same reCAPTCHA keys as production (includes localhost domain)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
RECAPTCHA_SECRET_KEY=6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6

# Local NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=STz/OnplF55lDoy6WcCJTzMcsx/fldSEqz+2kVpfCdQ=

# Same Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=7twhx4c8
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03

# Same admin credentials as production
ADMIN_EMAIL=admin@scttrusthospital.com
ADMIN_PASSWORD_HASH=$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW
```

## reCAPTCHA V3 Setup

### Production Keys (Existing)
- **Site**: dramitashukla.com
- **Site Key**: 6LdT9JgrAAAAAIYozDQQ_OU4J4PZnu95ZiEi2xgP
- **Secret Key**: 6LdT9JgrAAAAAGYn6vIdliEXOimDScJKxoeBY1W6

### Unified reCAPTCHA Configuration
**Decision**: Using same reCAPTCHA keys for all environments (Production, Staging, Local)

**Current Setup**:
- Production domain: `dramitashukla.com` ✅
- Staging domain: `staging-dramitashukla.netlify.app` (needs to be added to existing reCAPTCHA site)
- Local domain: `localhost` (needs to be added to existing reCAPTCHA site)

**Action Required**:
1. **Go to Google reCAPTCHA Admin**: https://www.google.com/recaptcha/admin
2. **Edit existing site** (SCT Trust Hospital)
3. **Add domains to existing site**:
   - `staging-dramitashukla.netlify.app`
   - `localhost`
4. **No new keys needed** - using production keys across all environments

### reCAPTCHA V3 Migration Status
- ✅ **Frontend**: Migrated from V2 checkbox to V3 invisible
- ✅ **Backend**: Updated to handle V3 scoring (≥0.5 threshold)
- ✅ **Action Verification**: Validates "appointment_booking" action
- ✅ **Error Handling**: Improved error messages with score feedback
- ✅ **Dependencies**: Removed react-google-recaptcha package

## Development Workflow

### Current reCAPTCHA V3 Migration Deployment

#### Step 1: Create Staging Branch
```bash
# Ensure you're on master with latest changes
git checkout master
git pull origin master

# Create staging branch
git checkout -b staging

# Add Node 18 engine specification to package.json
# (Manually add this to package.json)
"engines": {
  "node": "18.19.0",
  "npm": ">=9.0.0"
}
```

#### Step 2: Commit reCAPTCHA V3 Changes
```bash
# Stage all migration files
git add components/contact/appointment-form.tsx
git add app/api/appointments/route.ts
git add package.json package-lock.json
git add types/recaptcha.d.ts
git add tests/utils/captcha-utils.ts

# Commit with comprehensive message
git commit -m "🚀 Complete staging environment with reCAPTCHA V3 migration

Features:
- Migrate reCAPTCHA V2 → V3 invisible verification
- Enhanced security with score-based validation (≥0.5)
- Action verification for 'appointment_booking'
- Remove react-google-recaptcha dependencies
- Add TypeScript declarations for V3 API
- Update test utilities for V3 compatibility
- Separate staging database (sct_hospital_staging)
- Node 18.19.0 compatibility
- Complete staging infrastructure

Migration Details:
- Frontend: Invisible V3 execution on form submission
- Backend: V3 score and action validation
- Environment: Staging keys for safe testing
- Database: Isolated staging data

Ready for staging validation before production deployment"

# Push staging branch
git push -u origin staging
```

#### Step 3: Set Up Staging Infrastructure
1. **Create Netlify staging project** (manual setup)
2. **Configure staging environment variables** (see Environment Configuration)
3. **Create staging reCAPTCHA V3 keys** (see reCAPTCHA V3 Setup)
4. **Initialize staging database** with test data

#### Step 4: Test on Staging
- Visit `staging-dramitashukla.netlify.app`
- Complete full testing checklist (see Testing Strategy)
- Validate reCAPTCHA V3 functionality

#### Step 5: Deploy to Production
```bash
# After successful staging validation
git checkout master
git merge staging
git push origin master

# Monitor production deployment
# Visit dramitashukla.com to verify
```

### Future Feature Development

#### Creating New Features
```bash
# Start new feature
git checkout staging
git pull origin staging
git checkout -b feature/feature-name

# Develop feature locally (uses staging database)
npm run dev

# Test locally with staging reCAPTCHA keys
# Complete feature development

# Commit feature
git add .
git commit -m "feat: implement new feature"
git push origin feature/feature-name
```

#### Staging Testing
```bash
# Merge to staging for testing
git checkout staging
git merge feature/feature-name
git push origin staging

# Test on staging-dramitashukla.netlify.app
# Validate all functionality
# Check database operations in sct_hospital_staging
```

#### Production Deployment
```bash
# After staging validation passes
git checkout master
git merge staging
git push origin master

# Monitor production deployment
# Verify on dramitashukla.com
```

## Testing Strategy

### Staging Validation Checklist

#### Core Functionality
- [ ] **Contact Form**: Submit appointment with reCAPTCHA V3
- [ ] **Database Operations**: Verify appointment saved to `sct_hospital_staging`
- [ ] **Admin Dashboard**: Login with staging credentials
- [ ] **Admin Functionality**: View appointments, manage data
- [ ] **Sanity CMS**: Blog content loading correctly
- [ ] **Authentication**: NextAuth sessions working
- [ ] **API Endpoints**: All backend functionality operational

#### reCAPTCHA V3 Specific Testing
- [ ] **Invisible Execution**: No checkbox visible, automatic execution
- [ ] **Form Submission**: Successful appointment booking
- [ ] **Score Validation**: Backend properly validates score ≥0.5
- [ ] **Action Verification**: "appointment_booking" action confirmed
- [ ] **Error Handling**: Appropriate messages for low scores
- [ ] **Network Inspector**: Verify V3 API calls in browser dev tools
- [ ] **Privacy Policy Links**: Google Privacy Policy and Terms visible

#### Cross-Platform Testing
- [ ] **Desktop Browsers**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile Devices**: iOS Safari, Android Chrome
- [ ] **Responsive Design**: All viewport sizes
- [ ] **Touch Interactions**: Mobile form interactions
- [ ] **Accessibility**: Keyboard navigation, screen readers

#### Performance Testing
- [ ] **Load Times**: Page load under 3 seconds
- [ ] **Core Web Vitals**: LCP, FID, CLS within thresholds
- [ ] **reCAPTCHA Load**: V3 script loads quickly
- [ ] **Form Submission**: Smooth user experience
- [ ] **Database Response**: Quick save operations

#### Data Validation
- [ ] **Form Validation**: Client-side validation working
- [ ] **Server Validation**: Backend Zod schema validation
- [ ] **Data Persistence**: Appointments saved correctly
- [ ] **Data Integrity**: No data corruption or loss
- [ ] **Test Data Identification**: Clear staging data markers

### Test Data Strategy

#### Sample Staging Data
```json
{
  "name": "John Doe (STAGING TEST)",
  "email": "test@example.com",
  "phone": "9999999999",
  "service": "General Consultation", 
  "date": "2025-08-04",
  "time": "10:00 AM",
  "message": "Staging environment test appointment",
  "status": "pending",
  "createdAt": "2025-08-03T10:00:00Z"
}
```

#### Admin Test Account
- **Email**: `admin@scttrusthospital.com` (same as production)
- **Password**: Same as production (admin123)
- **Password Hash**: `$2b$12$FamNDeVSdSzliUicRncc6u7geRQ1yiD5zlYT1vhuXPgeethWIufoW`
- **Access**: Full admin dashboard functionality

## Node.js Compliance

### Version Requirements
- **Node.js**: 18.19.0 (locked for compatibility)
- **NPM**: 10+ (for security and performance)
- **Next.js**: 13.5.1 (requires Node 18 for optimal performance)

### Package.json Configuration
```json
{
  "engines": {
    "node": "18.19.0",
    "npm": ">=9.0.0"
  },
  "scripts": {
    "dev": "NEXT_TELEMETRY_DISABLED=1 next dev",
    "build": "NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=\"--openssl-legacy-provider --max-old-space-size=4096\" next build",
    "start": "NEXT_TELEMETRY_DISABLED=1 next start"
  }
}
```

### Local Development Setup
```bash
# Install and use Node 18
nvm install 18.19.0
nvm use 18.19.0
nvm alias default 18.19.0

# Verify version
node --version  # Should output v18.19.0
npm --version   # Should output 10.x

# Install dependencies
npm install --legacy-peer-deps
```

### Netlify Configuration
```toml
[build.environment]
  NODE_VERSION = "18.19.0"
  NPM_VERSION = "10"
  NODE_OPTIONS = "--openssl-legacy-provider --max-old-space-size=4096"
  NEXT_TELEMETRY_DISABLED = "1"
  NPM_FLAGS = "--legacy-peer-deps"
  NETLIFY_USE_YARN = "false"
```

## Implementation Timeline

### Phase 1: Infrastructure Setup (Day 1)
1. **Create staging branch** with current reCAPTCHA V3 changes ✅
2. **Set up Netlify staging project** and domain
3. **Create staging reCAPTCHA V3 keys** in Google Admin
4. **Configure staging environment variables** in Netlify
5. **Initialize staging database** in MongoDB cluster

### Phase 2: Deployment & Initial Testing (Day 2)
1. **Deploy staging branch** to Netlify (automatic)
2. **Populate staging database** with test data
3. **Create staging admin account** and credentials
4. **Initial functionality testing** on staging environment
5. **Verify reCAPTCHA V3 integration** with real keys

### Phase 3: Comprehensive Testing (Day 3)
1. **Complete testing checklist** across all browsers/devices
2. **Performance validation** and optimization
3. **Security testing** and vulnerability checks
4. **User experience testing** and feedback collection
5. **Documentation updates** and team training

### Phase 4: Production Deployment (Day 4)
1. **Final staging validation** and approval
2. **Merge staging to master** branch
3. **Production deployment** via Netlify
4. **Production monitoring** and verification
5. **Post-deployment testing** and issue resolution

## Troubleshooting

### Common Issues and Solutions

#### Staging Site Not Loading
**Symptoms**: 404 errors, build failures, blank pages
**Solutions**:
1. Check Netlify build logs for errors
2. Verify branch configuration (should be `staging`)
3. Confirm environment variables are set correctly
4. Check Node.js version compatibility (18.19.0)

#### reCAPTCHA V3 Not Working
**Symptoms**: Form submission fails, CAPTCHA errors
**Solutions**:
1. Verify staging reCAPTCHA keys are configured
2. Check domain whitelist includes staging domain
3. Confirm V3 script loading in browser network tab
4. Validate action name matches "appointment_booking"

#### Database Connection Issues
**Symptoms**: Appointment submissions fail, database errors
**Solutions**:
1. Verify MongoDB URI includes correct database name
2. Check network access and IP whitelist in Atlas
3. Confirm credentials and connection string format
4. Test database connection with MongoDB Compass

#### Build Failures
**Symptoms**: Netlify build fails, dependency errors
**Solutions**:
1. Ensure Node 18.19.0 is specified in environment
2. Use `--legacy-peer-deps` for npm install
3. Check for memory limits and increase if needed
4. Verify all required environment variables are set

#### Environment Variable Issues
**Symptoms**: Features not working, authentication failures
**Solutions**:
1. Double-check all environment variables in Netlify
2. Ensure no trailing spaces or special characters
3. Verify staging-specific values (URLs, keys, credentials)
4. Restart Netlify deployment after variable changes

### Emergency Procedures

#### Staging Site Down
1. Check Netlify status and build logs
2. Verify GitHub repository and branch status
3. Test local development environment
4. Contact Netlify support if platform issue

#### Production Deployment Issues
1. **Immediate rollback**: Revert master branch to previous commit
2. **Force redeploy**: Trigger new Netlify deployment
3. **Environment validation**: Check production environment variables
4. **Database verification**: Confirm production database connectivity

#### Data Loss Prevention
1. **Regular backups**: MongoDB Atlas automatic backups enabled
2. **Staging data isolation**: No production data at risk
3. **Version control**: All code changes tracked in Git
4. **Environment separation**: Clear boundaries prevent cross-contamination

### Contact Information

#### Technical Support
- **GitHub Repository**: [Repository URL]
- **Netlify Dashboard**: [Staging Project URL]
- **MongoDB Atlas**: [Cluster Dashboard URL]
- **Google reCAPTCHA Admin**: [reCAPTCHA Console URL]

#### Team Contacts
- **Primary Developer**: [Contact Information]
- **DevOps Lead**: [Contact Information]
- **Project Manager**: [Contact Information]

---

## Summary

This staging environment provides enterprise-grade testing capabilities while maintaining cost efficiency and data safety. The separate database approach ensures complete isolation between staging and production while using the same MongoDB cluster for cost optimization.

Key benefits:
- ✅ **Zero production risk** during development and testing
- ✅ **Real reCAPTCHA V3 integration** testing with staging keys
- ✅ **Professional development workflow** with proper branching
- ✅ **Cost-effective infrastructure** using shared MongoDB cluster
- ✅ **Comprehensive testing** capabilities with realistic data
- ✅ **Node 18 compliance** for optimal performance and security

The staging environment is now ready to support ongoing development, testing, and deployment of the reCAPTCHA V3 migration and all future updates.